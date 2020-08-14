<?php

namespace App\Http\Controllers\API;

use App\Company;
use App\Http\Controllers\Controller;
use App\Level;
use App\C2g_countries;
use App\UserLevel;
use App\UserLevelPermission;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class LevelController extends Controller
{


    public function __construct()
    {
    }

    private function buildLevelsTree($user_levels, $user_id)
    {
        return $user_levels->map(function ($item) use ($user_id) {

            $child_levels = UserLevel::where("user_id", $user_id)
                ->where("parent_id", $item->id)
                ->get();

            return ["id" => $item->id, "parent_id" => $item->parent_id, "level_id" => $item->level_id, "title" => $item->value, "children" => $this->buildLevelsTree($child_levels, $user_id)];
        });
    }

    public function index(Request $request)
    {

        $levels = Level::select(["id", "name", "order"])->orderBy("order")->get();
        $counties = C2g_countries::select(["id", "code", "country"])->orderBy("id")->get();

        $user_id = $request->user()->id;
        $user_levels = UserLevel::where("user_id", $user_id)
            ->where("parent_id", 0)
            ->limit(1)
            ->get();
        $user_levels = $this->buildLevelsTree($user_levels, $user_id);

        $roles = Role::where("name", "!=", "scale_campaign")->get();

        $roles = $roles->map(function ($role) {
            return [
                "value" => $role->name,
                "label" => ucfirst($role->name)
            ];
        });

        return [
            "status" => "success",
            "roles" => $roles,
            "levels" => $levels,
            "countries"=>$counties,
            "user_levels" => $user_levels
        ];
    }

    public function add(Request $request)
    {
        $request->validate([
            'parent_id' => 'required',
            'level_id' => 'required',
            'level_value' => 'required'
        ]);

        $parent_user_level = UserLevel::selectRaw("company_id, id as parent_id")->where("id", $request->parent_id)->first();
        if (empty($parent_user_level)) {
            return [
                "status" => "fail"
            ];
        }

        if (!$this->hasPermission($request->user()->id, $parent_user_level)) {
            return [
                "status" => "warning",
                "msg" => "You do not have permission to perform this action!"
            ];
        }

        if ($this->checkReservedName($request->level_value)) {
            return [
                "status" => "warning",
                "msg" => "The value is reserved and cannot be used!"
            ];
        }


        if ($this->checkUniqueLevelValue($parent_user_level->company_id, $request->parent_id, $request->level_id, $request->level_value)) {
            $user_level = new UserLevel();
            $user_level->company_id = $parent_user_level->company_id;
            $user_level->parent_id = $request->parent_id;
            $user_level->user_id = $request->user()->id;
            $user_level->level_id = $request->level_id;
            $user_level->value = $request->level_value;
            $user_level->save();
            return [
                "status" => "success",
                "user_level" => $user_level
            ];
        } else {
            return [
                "status" => "warning",
                "msg" => "Same value on current level already exists!"
            ];
        }
    }

    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'value' => 'required'
        ]);


        if ($this->checkReservedName($request->value)) {
            return [
                "status" => "warning",
                "msg" => "The value is reserved and cannot be used!"
            ];
        }

        $user_level = UserLevel::where("id", $request->id)->first();
        if (empty($user_level)) {
            return [
                "status" => "fail"
            ];
        }

        if (!$this->hasPermission($request->user()->id, $user_level)) {
            return [
                "status" => "warning",
                "msg" => "You do not have permission to perform this action!"
            ];
        }

        if ($this->checkUniqueLevelValue($user_level->company_id, $user_level->parent_id, $user_level->level_id, $request->value, $request->id)) {

            UserLevel::where("id", $request->id)->update(["value" => $request->value]);

            return [
                "status" => "success",
            ];
        } else {
            return [
                "status" => "warning",
                "msg" => "Same value on current level already exists!"
            ];
        }
    }

    public function delete(Request $request)
    {
        $request->validate([
            'id' => 'required'
        ]);

        $user_level = UserLevel::where("id", $request->id);
        if (empty($user_level->first())) {
            return [
                "status" => "fail"
            ];
        }

        if (!$this->hasPermission($request->user()->id, $user_level->first())) {
            return [
                "status" => "warning",
                "msg" => "You do not have permission to perform this action!"
            ];
        }

        $user_level->delete();

        return [
            "status" => "success"
        ];
    }

    private function checkUniqueLevelValue($company_id, $parent_id, $level_id, $level_value, $id = null)
    {
        $user_level_exist = UserLevel::where("company_id", $company_id)
            ->where("parent_id", $parent_id)
            ->where("level_id", $level_id)
            ->where("value", $level_value)
            ->where("id", "!=", $id)
            ->first();

        return empty($user_level_exist);
    }

    private function checkReservedName($level_value)
    {
        $level_exist = Level::where("name", $level_value)
            ->first();
        return !empty($level_exist);
    }

    private function hasPermission($user_id, $user_level)
    {
        $user_company = Company::where("id", $user_level->company_id)->where("user_id", $user_id)->first();
        //owner of company have all permissions
        if (!empty($user_company)) {
            return true;
        }

        $user_level_ids = UserLevelPermission::where("user_id", $user_id)->pluck("user_level_id")->toArray();
        if (empty($user_level_ids)) {
            //user not have permission
            return false;
        }

        //permission for action on level with parent_id
        return in_array($user_level->parent_id, $user_level_ids);
    }

}
