<?php

namespace Abs\RsaCasePkg\Api;
use Abs\RsaCasePkg\Activity;
use App\Asp;
use App\Http\Controllers\Controller;
use App\Invoices;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use URL;
use Validator;

class InvoiceController extends Controller {
	private $successStatus = 200;

	public function createInvoice(Request $request) {
		DB::beginTransaction();
		try {
			$validator = Validator::make($request->all(), [
				'activity_id.*' => 'required|numeric|exists:activities,crm_activity_id',
				'asp_code' => 'required|string|exists:asps,asp_code',
				'invoice_number' => 'nullable|string',
				'invoice_date' => 'nullable|string|date_format:"Y-m-d"',
				'invoice_copy' => 'nullable',
			]);
			if ($validator->fails()) {
				return response()->json([
					'success' => false,
					'message' => 'Validation Error',
					'errors' => $validator->errors()->all(),
				], $this->successStatus);
			}

			if (!isset($request->activity_id)) {
				return response()->json([
					'success' => false,
					'message' => 'Validation Error',
					'errors' => 'Activity ID is required',
				], $this->successStatus);
			}

			//CHECK IF INVOICE ALREADY CREATED FOR ACTIVITY
			$activities = Activity::select('invoice_id', 'crm_activity_id')->whereIn('crm_activity_id', $request->activity_id)->get();
			if (!empty($activities)) {
				foreach ($activities as $key => $activity) {
					if (!empty($activity->invoice_id)) {
						return response()->json([
							'success' => false,
							'message' => 'Validation Error',
							'errors' => 'Invoice already created for activity ID ' . $activity->crm_activity_id,
						], $this->successStatus);
					}
				}
			}

			//CHECK ACTIVITY IS ACCEPTED OR NOT
			$activities_with_accepted = Activity::select('crm_activity_id', 'status_id')->whereIn('crm_activity_id', $request->activity_id)->get();
			if (!empty($activities_with_accepted)) {
				foreach ($activities_with_accepted as $key => $activity_accepted) {
					if ($activity_accepted->status_id != 1) {
						return response()->json([
							'success' => false,
							'message' => 'Validation Error',
							'errors' => 'ASP not accepted for activity ID ' . $activity_accepted->crm_activity_id,
						], $this->successStatus);
					}
				}
			}

			//GET ASP
			$asp = ASP::where('asp_code', $request->asp_code)->first();
			//SELF INVOICE
			if (!$asp->is_auto_invoice) {
				if (!$request->invoice_number) {
					return response()->json([
						'success' => false,
						'message' => 'Validation Error',
						'errors' => 'Invoice number is required',
					], $this->successStatus);
				}
				if (!$request->invoice_date) {
					return response()->json([
						'success' => false,
						'message' => 'Validation Error',
						'errors' => 'Invoice date is required',
					], $this->successStatus);
				}

				$invoice_no = $request->invoice_number;
				$invoice_date = date('Y-m-d H:i:s', strtotime($request->invoice_date));
			} else {
				//SYSTEM

				//GENERATE INVOICE NUMBER
				$invoice_no = generateInvoiceNumber();
				$invoice_date = new Carbon();
			}
			$invoice_c = Invoices::createInvoice($asp, $request->activity_id, $invoice_no, $invoice_date);

			DB::commit();
			if ($invoice_c) {
				return response()->json([
					'success' => true,
					'message' => 'Invoice created successfully',
				], $this->successStatus);
			} else {
				return response()->json([
					'success' => false,
					'message' => 'Invoice not created',
				], $this->successStatus);

			}

		} catch (\Exception $e) {
			DB::rollBack();
			return response()->json(['success' => false, 'errors' => ['Exception Error' => $e->getMessage()]]);
		}
	}

	public function getList(Request $request) {
		DB::beginTransaction();
		try {
			$validator = Validator::make($request->all(), [
				'asp_code' => 'required|string|exists:asps,asp_code',
				'offset' => 'nullable|numeric',
				'limit' => 'nullable|numeric',
			]);

			if ($validator->fails()) {
				return response()->json(['success' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()->all()], $this->successStatus);
			}

			//GET ASP
			$asp = Asp::where('asp_code', $request->asp_code)->first();

			$invoices = Invoices::
				select(
				'Invoices.id',
				DB::raw("CONCAT(Invoices.invoice_no,'-',Invoices.id) as invoice_no"),
				DB::raw("date_format(Invoices.created_at,'%d-%m-%Y') as invoice_date"),
				DB::raw("COUNT(activities.id) as no_of_tickets"),
				// DB::raw("ROUND(SUM(activities.bo_invoice_amount),2) as invoice_amount"),
				DB::raw("ROUND(Invoices.invoice_amount,2) as invoice_amount"),
				'asps.workshop_name as workshop_name',
				'asps.asp_code as asp_code'
			)
				->where('activities.asp_id', '=', $asp->id)
				->where('Invoices.flow_current_status', 'Waiting for Batch Generation')
				->join('asps', 'Invoices.asp_id', '=', 'asps.id')
				->join('activities', 'Invoices.id', '=', 'activities.invoice_id');

			if ($request->offset && $request->limit) {
				$invoices->offset($request->offset);
			}
			if ($request->limit) {
				$invoices->limit($request->limit);
			}

			$invoices = $invoices->groupBy('Invoices.id')->get();

			if (count($invoices) > 0) {
				foreach ($invoices as $key => $invoice) {
					$invoice->invoice_copy = URL::asset('storage/app/public/invoices/' . $invoice->id . '.pdf');
				}
			}

			DB::commit();
			return response()->json(['success' => true, 'invoices' => $invoices], $this->successStatus);
		} catch (\Exception $e) {
			DB::rollBack();
			return response()->json(['success' => false, 'errors' => [$e->getMessage() . ' Line:' . $e->getLine()]], $this->successStatus);
		}
	}

	public function getDetails(Request $request) {
		DB::beginTransaction();
		try {
			$validator = Validator::make($request->all(), [
				'asp_code' => 'required|string|exists:asps,asp_code',
				'invoice_no' => 'required|string',
			]);

			if ($validator->fails()) {
				return response()->json([
					'success' => false,
					'message' => 'Validation Error',
					'errors' => $validator->errors()->all(),
				], $this->successStatus);
			}

			$invoice = Invoices::whereRaw("CONCAT(invoice_no,'-',id) like ?", ["%$request->invoice_no%"])->first();

			if (!$invoice) {
				return response()->json([
					'success' => false,
					'message' => 'Validation Error',
					'errors' => [
						'Selected invoice no is invalid',
					],
				], $this->successStatus);

			}

			//GET ASP
			$asp = Asp::where('asp_code', $request->asp_code)->first();

			//GET INVOICE DETAIL
			$invoices = Invoices::select(
				'Invoices.*',
				DB::raw("CONCAT(invoice_no,'-',id) as invoice_no")
			)
				->whereRaw("CONCAT(invoice_no,'-',id) like ?", ["%$request->invoice_no%"])
				->where('asp_id', $asp->id)
				->where('flow_current_status', 'Waiting for Batch Generation')
				->first();

			$invoices->asp = $asp;
			DB::commit();
			return response()->json(['success' => true, 'invoices' => $invoices], $this->successStatus);
		} catch (\Exception $e) {
			DB::rollBack();
			return response()->json(['success' => false, 'errors' => [$e->getMessage() . ' Line:' . $e->getLine()]], $this->successStatus);
		}
	}
}
