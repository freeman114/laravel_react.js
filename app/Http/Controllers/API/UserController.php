<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\User;
use App\UserLevel;
use App\UserLevelPermission;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{

    public function grant_access(Request $request)
    {
        $request->validate([
            "user_ids" => "required",
            "role" => "required",
            "user_level_ids" => "required",
        ]);

        $user_level_ids = UserLevel::whereIn("id", $request->user_level_ids)->pluck("id")->toArray();
        if (empty($user_level_ids)) {
            return [
                "status" => "warning",
                "msg" => "Incorrect level permission."
            ];
        }

        $role = Role::where("name", $request->role)->first();
        if (empty($role) || $request->role == "scale_campaign") {
            return [
                "status" => "warning",
                "msg" => "Such role not exists or can not be selected."
            ];
        }


        $users = User::with('roles')->whereIn("id", $request->user_ids)->get();

        foreach ($users as $user) {
            foreach ($user_level_ids as $user_level_id) {
                UserLevelPermission::firstOrCreate([
                    "user_id" => $user->id,
                    "user_level_id" => $user_level_id
                ]);
            }

            $user_role = $user->roles->first();
            if (!empty($user_role)) {
                $user->removeRole($user_role);
            }

            $user->assignRole($role->name);
        }

        return [
            "status" => "success",
            "msg" => "Access granted successfully"
        ];
    }

    public function permissions(Request $request)
    {
        $user_id = empty($request->user_id) ? $request->user()->id : $request->user_id;
        $user_level_permissions = UserLevel::selectRaw("user_levels.id as user_level_id, levels.name as level_name, user_levels.value as level_value")
            ->leftJoin("user_has_level_permissions as ulp", "ulp.user_level_id", "=", "user_levels.id")
            ->leftJoin("levels", "levels.id", "=", "user_levels.level_id")
            ->where("ulp.user_id", $user_id)->get();

        $user = User::with("roles")->where("id", $user_id)->first();
        if (!empty($user)) {
            $user_role = $user->roles->first();
        }

        return [
            "status" => "success",
            "permissions" => $user_level_permissions,
            "role" => !empty($user_role) ? $user_role->name : null
        ];
    }

    public function add_permission(Request $request)
    {
        $request->validate([
            "user_id" => "required",
            "user_level_id" => "required"
        ]);

        $user_level = UserLevel::where("id", $request->user_level_id)->first();
        if (empty($user_level)) {
            return [
                "status" => "warning",
                "msg" => "Incorrect level permission."
            ];
        }

        $user_level_permission = UserLevelPermission::where("user_id", $request->user_id)
            ->where("user_level_id", $user_level->id)
            ->first();
        if (!empty($user_level_permission)) {
            return [
                "status" => "warning",
                "msg" => "User already has this permission."
            ];
        }

        UserLevelPermission::create([
            "user_id" => $request->user_id,
            "user_level_id" => $user_level->id
        ]);

        return [
            "status" => "success"
        ];
    }

    public function delete_permission(Request $request)
    {
        $request->validate([
            "user_id" => "required",
            "user_level_id" => "required"
        ]);

        UserLevelPermission::where("user_id", $request->user_id)
            ->where("user_level_id", $request->user_level_id)
            ->delete();

        return [
            "status" => "success"
        ];
    }


    public function search(Request $request)
    {
        $user = $request->user();

        if (!empty($user->company_id) && !empty($request->text)) {
            $query = User::selectRaw("users.id, users.email, users.name, users.first_name, users.last_name")
                ->leftJoin("staff", "staff.user_id", "=", "users.id")
                ->where("users.company_id", $user->company_id)
                ->whereNotNull("staff.id");

            if (!empty($request->user_level_id)) {
                $query->leftJoin("user_has_level_permissions", "user_has_level_permissions.user_id", "=", "users.id");
                $query->where("user_has_level_permissions.user_level_id", $request->user_level_id);
            }

            $users = $query->where(function ($query) use ($request) {
                $query->where("staff.email", "LIKE", \DB::raw("'%$request->text%'"))
                    ->orWhere("staff.first_name", "LIKE", \DB::raw("'%$request->text%'"))
                    ->orWhere("staff.last_name", "LIKE", \DB::raw("'%$request->text%'"));
            })->limit(10)->get();

            return [
                "status" => "success",
                "users" => $users,
            ];
        } else {
            return [
                "status" => "success",
                "users" => [],
            ];
        }
    }

    public function get_all(Request $request)
    {
        $users = User::with("roles")
            ->selectRaw("users.*, companies.name as organization, companies.id as company_id")
            ->leftJoin("companies", "companies.id", "=", "users.company_id")
            ->get();

        $users = $users->map(function ($user) {
            return [
                "id" => $user->id,
                "first_name" => $user->first_name,
                "last_name" => $user->last_name,
                "email" => $user->email,
                "roles" => implode(", ", $user->roles->pluck("name")->toArray()),
                "organization" => $user->organization,
                "is_creator" => $user->hasRole("creator"),
                "created_at" => $user->created_at
            ];
        });

        return [
            "status" => "success",
            "users" => $users,
        ];
    }

    public function get_all_search(Request $request)
    {
        $query = User::with("roles")
            ->selectRaw("users.*, companies.name as organization, companies.id as company_id")
            ->leftJoin("companies", "companies.id", "=", "users.company_id");

        if (!empty($request->text)) {
            $query->where(function ($query) use ($request) {
                $query->where("users.email", "LIKE", \DB::raw("'%$request->text%'"))
                    ->orWhere("users.first_name", "LIKE", \DB::raw("'%$request->text%'"))
                    ->orWhere("users.last_name", "LIKE", \DB::raw("'%$request->text%'"));
            });
        }
        $paginate_users = $query->paginate(10);

        $users = $paginate_users->map(function ($user) {
            return [
                "id" => $user->id,
                "first_name" => $user->first_name,
                "last_name" => $user->last_name,
                "email" => $user->email,
                "roles" => implode(", ", $user->roles->pluck("name")->toArray()),
                "organization" => $user->organization,
                "is_creator" => $user->hasRole("creator"),
                "created_at" => $user->created_at
            ];
        });


        return [
            "status" => "success",
            "users" => $users,
            "pagination" => [
                "currentPage" => $paginate_users->currentPage(),
                "lastPage" => $paginate_users->lastPage(),
                "perPage" => $paginate_users->perPage(),
                "hasMorePages" => $paginate_users->hasMorePages(),
                "nextPageUrl" => $paginate_users->nextPageUrl(),
                "previousPageUrl" => $paginate_users->previousPageUrl(),
                "url" => $paginate_users->url($paginate_users->currentPage()),
                "total" => $paginate_users->total(),
            ]
        ];
    }

    public function go_to_account(Request $request)
    {

        if ($request->user()->hasRole('scale_campaign') && !empty($request->id)) {
            $user = User::find($request->id);
            if (empty($user)) {
                return [
                    "status" => "fail",
                    "msg" => "User not found!"
                ];
            }
            $user->tokens()->delete();
        } else {
            return [
                "status" => "fail",
                "msg" => "Current user not have permission for this action!"
            ];
        }

        return [
            "status" => "success",
            "user" => [
                "id" => $user->id,
                "first_name" => $user->first_name,
                "last_name" => $user->last_name,
                "email" => $user->email,
                "role" => $user->getRoleNames()[0] ?? "user",
                "token" => $user->createToken("admin_panel")->plainTextToken,
                "admin_token" => $request->user()->createToken("admin_panel_goto")->plainTextToken
            ]
        ];
    }
}
