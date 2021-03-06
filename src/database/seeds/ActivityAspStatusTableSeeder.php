<?php
namespace Abs\RsaCasePkg\Database\Seeds;

use Abs\RsaCasePkg\ActivityAspStatus;
use Illuminate\Database\Seeder;

class ActivityAspStatusTableSeeder extends Seeder {
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run() {
		$activity_asp_statuses = [
			1 => [
				'name' => 'Accepted',
				'company_id' => 1,
			],
			2 => [
				'name' => 'Activity Started',
				'company_id' => 1,
			],
			3 => [
				'name' => 'Started To BD',
				'company_id' => 1,
			],
			4 => [
				'name' => 'Reached BD',
				'company_id' => 1,
			],
			5 => [
				'name' => 'Started To Dealer',
				'company_id' => 1,
			],
			6 => [
				'name' => 'Reached Dealer',
				'company_id' => 1,
			],
			7 => [
				'name' => 'Started To Garage',
				'company_id' => 1,
			],
			8 => [
				'name' => 'Reached Garage',
				'company_id' => 1,
			],
			9 => [
				'name' => 'Activity Ended',
				'company_id' => 1,
			],
			10 => [
				'name' => 'Cancel',
				'company_id' => 1,
			],
			11 => [
				'name' => 'Rejected',
				'company_id' => 1,
			],
			12 => [
				'name' => 'Returned Empty',
				'company_id' => 1,
			],
			13 => [
				'name' => 'End trip',
				'company_id' => 1,
			],
		];

		foreach ($activity_asp_statuses as $key => $activity_asp_status_val) {
			$activity_asp_status = ActivityAspStatus::firstOrNew([
				'company_id' => $activity_asp_status_val['company_id'],
				'name' => $activity_asp_status_val['name'],
			]);
			$activity_asp_status->fill($activity_asp_status_val);
			$activity_asp_status->created_by_id = 72;
			$activity_asp_status->updated_by_id = 72;
			$activity_asp_status->save();
		}
	}
}
