<?php

namespace Abs\RsaCasePkg;
use Abs\RsaCasePkg\Activity;
use App\CallCenter;
use App\Http\Controllers\Controller;
use App\ServiceType;
use Auth;
use DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Yajra\Datatables\Datatables;

class ActivityReportController extends Controller {

	public function getExceptionalReportFilterData() {
		$this->data['extras'] = [
			'finance_status_list' => collect(ActivityFinanceStatus::select('name', 'id')->where('company_id', 1)->get())->prepend(['id' => '', 'name' => 'Select Finance Status Type']),
			'call_center_list' => collect(CallCenter::select('name', 'id')->get())->prepend(['id' => '', 'name' => 'Select Call Center Name']),
			'service_type_list' => collect(ServiceType::select('name', 'id')->get())->prepend(['id' => '', 'name' => 'Select Service Type']),
		];
		return response()->json($this->data);
	}

	public function getExceptionalReportList(Request $request) {
		$activities = Activity::select(
			'activities.id',
			DB::raw('DATE_FORMAT(cases.date,"%d-%m-%Y %H:%i:%s") as case_date'),
			'cases.number',
			'asps.asp_code',
			'asps.name as asp_name',
			'asps.is_self',
			'service_types.name as sub_service',
			'bo_km_travelled.value as bo_km',
			DB::raw('COALESCE(activities.exceptional_reason,"--") as deviation_reason'),
			'bo_paid_amt.value as bo_paid_amount'
		)
			->join('cases', 'cases.id', 'activities.case_id')
			->join('asps', 'asps.id', 'activities.asp_id')
			->join('service_types', 'service_types.id', 'activities.service_type_id')
			->leftJoin('activity_details as bo_km_travelled', function ($join) {
				$join->on('bo_km_travelled.activity_id', 'activities.id')
					->where('bo_km_travelled.key_id', 158);
			})
			->leftJoin('activity_details as bo_paid_amt', function ($join) {
				$join->on('bo_paid_amt.activity_id', 'activities.id')
					->where('bo_paid_amt.key_id', 182);
			})
			->join('Invoices as invoice', function ($join) {
				$join->on('Invoice.id', 'activities.invoice_id')
					->where('invoice.status_id', 2);
			})
			->where('activities.is_exceptional_check', 0)
			->where('cases.company_id', Auth::user()->company_id)
			->orderBy('cases.date', 'DESC')
		;

		if ($request->get('ticket_date')) {
			$activities->whereRaw('DATE_FORMAT(cases.date,"%d-%m-%Y") =  "' . $request->get('ticket_date') . '"');
		}
		if ($request->get('case_number')) {
			$activities->where('cases.number', 'LIKE', '%' . $request->get('case_number') . '%');
		}
		if ($request->get('call_center_id')) {
			$activities->where('cases.call_center_id', $request->get('call_center_id'));
		}
		if ($request->get('service_type_id')) {
			$activities->where('activities.service_type_id', $request->get('service_type_id'));
		}
		if ($request->get('finance_status_id')) {
			$activities->where('activities.finance_status_id', $request->get('finance_status_id'));
		}

		return Datatables::of($activities)
			->addColumn('asp_type', function ($activity) {
				return ($activity->is_self) ? 'Self' : 'Non Self';
			})
			->setRowAttr([
				'id' => function ($activity) {
					return route('angular') . '/#!/rsa-case-pkg/activity-status/3/view/' . $activity->id;
				},
			])
			->make(true);
	}

	public function getReconciliationReport() {
		$user_id = Auth::user()->id;
		$total_amount_submit_in_year = Activity::select(
			DB::raw('IF(sum(activity_details.value) IS NULL or sum(activity_details.value) = "", 0, sum(activity_details.value)) as total'),
			DB::raw('DATE_FORMAT(logs.updated_at,"%b") month'))
			->join('asps', 'activities.asp_id', 'asps.id')
		// ->join('logs', function ($join) {
		// 	$join->on('activities.id', 'logs.entity_id')
		// 		->whereYear('logs.updated_at', date('Y'));
		// })
		// ->join('activity_details', function ($join) {
		// 	$join->on('activity_details.activity_id', 'activities.id')
		// 		->where('activity_details.key_id', 182);
		// })
		// ->join('Invoices as invoice', function ($join) {
		// 	$join->on('Invoice.id', 'activities.invoice_id')
		// 		->where('invoice.status_id', 2) //FOR PAID
		// 		->orWhere('invoice.status_id', 3); //FOR INPROGRESS
		// })
			->join('activity_details', 'activity_details.activity_id', 'activities.id')
			->join('logs', 'logs.entity_id', 'activities.id')
			->join('Invoices as invoice', 'invoice.id', 'activities.invoice_id')
			->where(function ($query1) {
				$query1->where('activity_details.key_id', 182)
					->where('invoice.status_id', 2)
					->orWhere('invoice.status_id', 3)
					->whereYear('logs.updated_at', date('Y'));
			})
			->groupby('month')
			->pluck('total', 'month')->toArray()
		// ->get()
		;

		dd($total_amount_submit_in_year);
		$this->data['total_amount_submit_in_year_chart'] = $total_amount_submit_in_year;

	}

	public function getProvisionalReport() {
		dd('provisional report');
	}

	public function getGeneralReport() {
		dd('general report');
	}

}