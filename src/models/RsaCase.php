<?php

namespace Abs\RsaCasePkg;

use Abs\HelperPkg\Traits\SeederTrait;
use App\Company;
use App\Config;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class RsaCase extends Model {
	use SeederTrait;
	use SoftDeletes;
	protected $table = 'cases';
	protected $fillable = [
		'company_id',
		'number',
		'date',
		'call_center_id',
		'client_id',
		'customer_name',
		'customer_contact_number',
		'contact_name',
		'contact_number',
		'cancel_reason',
		'data_filled_date',
		'vehicle_registration_number',
		'vin_no',
		'eligibility_type_id',
		'vehicle_model_id',
		'subject_id',
		'policy_id',
		'status_id',
		'bd_lat',
		'bd_long',
		'bd_location',
		'bd_city_id',
		'bd_state_id',
		'created_by_id',
		'updated_by_id',
		'deleted_by_id',
	];

	public function company() {
		return $this->belongsTo('App\Company', 'company_id');
	}

	public function callcenter() {
		return $this->belongsTo('App\CallCenter', 'call_center_id');
	}

	public function client() {
		return $this->belongsTo('App\Client', 'client_id');
	}

	public function eligibilityType() {
		return $this->belongsTo('App\Entity', 'eligibility_type_id');
	}

	public function vehicleModel() {
		return $this->belongsTo('App\VehicleModel', 'vehicle_model_id');
	}

	public function subject() {
		return $this->belongsTo('App\Subject', 'subject_id');
	}

	public function policy() {
		return $this->belongsTo('App\Policy', 'policy_id');
	}

	public function status() {
		return $this->belongsTo('App\CaseStatus', 'status_id');
	}

	public function city() {
		return $this->belongsTo('App\District', 'bd_city_id');
	}

	public function state() {
		return $this->belongsTo('App\State', 'bd_state_id');
	}

	public function createdBy() {
		return $this->belongsTo('App\User', 'created_by_id');
	}

	public function updatedBy() {
		return $this->belongsTo('App\User', 'updated_by_id');
	}

	public function deletedBy() {
		return $this->belongsTo('App\User', 'deleted_by_id');
	}

	public static function createFromObject($record_data) {

		$errors = [];
		$company = Company::where('code', $record_data->company)->first();
		if (!$company) {
			dump('Invalid Company : ' . $record_data->company);
			return;
		}

		$admin = $company->admin();
		if (!$admin) {
			dump('Default Admin user not found');
			return;
		}

		$type = Config::where('name', $record_data->type)->where('config_type_id', 89)->first();
		if (!$type) {
			$errors[] = 'Invalid Tax Type : ' . $record_data->type;
		}

		if (count($errors) > 0) {
			dump($errors);
			return;
		}

		$record = self::firstOrNew([
			'company_id' => $company->id,
			'name' => $record_data->tax_name,
		]);
		$record->type_id = $type->id;
		$record->created_by_id = $admin->id;
		$record->save();
		return $record;
	}

}