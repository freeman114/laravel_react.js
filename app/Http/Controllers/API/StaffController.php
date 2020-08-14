<?php

namespace App\Http\Controllers\API;

use App\Actions\CreateUser;
use App\Exceptions\ImportStaffDataException;
use App\Http\Controllers\Controller;
use App\Imports\StaffImport;
use App\Staff;
use App\User;
use Artisan;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Maatwebsite\Excel\Facades\Excel;

class StaffController extends Controller
{
    /** @var CreateUser $createUser */
    private $createUser;

    /**
     * StaffController constructor.
     * @param CreateUser $createUser
     */
    public function __construct(CreateUser $createUser)
    {
        $this->createUser = $createUser;
    }

    private function getStaffListInfo($company_id)
    {
        return Staff::selectRaw("staff.*")
            ->leftJoin("users", "staff.user_id", "=", "users.id")
            ->where("users.company_id", $company_id)
            ->get()
            ->map(function ($item) {
                $item = collect($item);
                $staff_info = $item->except(['user_id']);
                $staff_info = $staff_info->merge(['user_status_text' => Staff::USER_STATUSES[$item["user_status"]]]);
                return $staff_info;
            });
    }


    public function index(Request $request)
    {
        $user = $request->user();

        if (empty($user->company_id)) {
            $staff = [];
        } else {
            $staff = $this->getStaffListInfo($user->company_id);
        }

        return [
            "status" => "success",
            "staff" => $staff,
            "statuses" => Staff::STATUSES,
            "types" => Staff::TYPES
        ];
    }

    public function import(Request $request)
    {
        $user = $request->user();
        if (empty($user->company_id)) {
            return [
                "status" => "warning",
                "msg" => "To upload staff, you must first create an organization."
            ];
        }

        try {
            Excel::import(new StaffImport, $request->file('file'));
        } catch (ImportStaffDataException $e) {
            return [
                "status" => "warning",
                "msg" => $e->getMessage()
            ];
        } catch (Exception $e) {
            return [
                "status" => "warning",
                "msg" => "Received data that contains an error, maybe extra columns or missing column names. Please check and try again."
            ];
        }

        Artisan::queue('create:users', ["company_id" => $user->company_id]);

        $staff = $this->getStaffListInfo($user->company_id);

        return [
            "status" => "success",
            "staff" => $staff
        ];
    }

    public function add(Request $request)
    {
        $user = $request->user();
        if (empty($user->company_id)) {
            return [
                "status" => "warning",
                "msg" => "To upload staff, you must first create an organization."
            ];
        }

        $request->merge([
            "user_status" => Staff::CREATED
        ]);
        $employee = Staff::create($request->all());
        $this->createUser->forEmployee($employee, $user->company_id);

        return [
            "status" => "success",
            "employee" => $employee
        ];
    }

    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required',
            'title' => 'required',
            'status' => 'required',
            'type' => 'required',
        ]);
        $employee = Staff::where("id", $request->id)->first();
        if ($employee->email != $request->email) {
            $user = User::where("email", $request->email)->first();
            if (empty($user)) {
                User::where("id", $employee->user_id)->update(["email" => $request->email]);
                Staff::where("id", $request->id)->update(["email" => $request->email]);
            } else {
                return [
                    "status" => "warning",
                    "msg" => "Another user has the same email [{$request->email}], please change the email to the previous one to complete editing."
                ];
            }
        }

        Staff::where("id", $request->id)->update($request->except(["id", "email", "created_at", "updated_at"]));
        User::where("id", $employee->user_id)->update([
            "name" => $request->first_name . " " . $request->last_name,
            "first_name" => $request->first_name,
            "last_name" => $request->last_name
        ]);

        return [
            "status" => "success",
        ];
    }

    public function delete(Request $request)
    {
        $request->validate([
            'id' => 'required'
        ]);

        $employee = Staff::where("id", $request->id)->first();

        if (empty($employee)) {
            return [
                "status" => "fail"
            ];
        }

        User::where("id", $employee->user_id)->delete();
        Staff::where("id", $request->id)->delete();

        return [
            "status" => "success"
        ];
    }

    public function resend_invite(Request $request)
    {
        $request->validate([
            'staff_id' => 'required',
        ]);
        $employee = Staff::where("id", $request->staff_id)->first();

        if (!empty($employee)) {
            //Email
            Password::broker()->sendResetLink(["email" => $employee->email]);
        }

        return [
            "status" => "success"
        ];
    }
}
