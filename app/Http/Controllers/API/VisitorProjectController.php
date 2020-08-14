<?php

namespace App\Http\Controllers\API;

use App\Company;
use App\Http\Controllers\Controller;
use App\User;
use App\UserLevel;
use App\VisitorProject;
use App\Team;
use Exception;
use Illuminate\Http\Request;

class VisitorProjectController extends Controller
{

    private function getUserCompanyId($user_id) {
        $company_ids = Company::selectRaw("companies.id")
            ->leftJoin("user_levels", "user_levels.company_id", "=", "companies.id")
            ->leftJoin("user_has_level_permissions as ulp", "ulp.user_level_id", "=", "user_levels.id")
            ->where(function($query) use ($user_id) {
                $query->where("ulp.user_id", $user_id); //if user have permisssion
                $query->orWhere("companies.user_id",$user_id); //if user is company owner
            })
            ->groupBy("companies.id")->pluck("id")->toArray();

        if (!empty($company_ids) && count($company_ids) > 1) {
            throw new Exception("The user is registered with more  one company");
        }

        return $company_ids[0] ?? null;
    }

    /**
     * @param Request $request
     * @return array
     * @throws Exception
     */
    public function index(Request $request)
    {
        $user_id = $request->user()->id;

        $company_id = $this->getUserCompanyId($user_id);


        $user = User::with("roles")->where("id", $user_id)->first();
        if (!empty($user)) {
            $user_role = $user->roles->first();
        }

        if (empty($company_id)) {  //empty($user_role) ||
            return [
                "status" => "success",
                "projects" => [],
                "msg" => "User not have permissions to view projects"
            ];
        }



        $query = VisitorProject::with("media")->with("team")
            ->where("company_id", $company_id);

        if (isset($request->status)) {
            $query->where("status", $request->status);
        }

        $projects = $query->get();

        $projects = $projects->map(function ($project) {

            return [
                "id" => $project->id,
                "name" => $project->name,
                "overview" => $project->overview,
                "start_date" => $project->start_date,
                "due_date" => $project->due_date,
                "team" => $project->team->map(function ($user) {
                    return [
                        "id" => $user->id,
                        "name" => $user->name,
                        "first_name" => $user->first_name,
                        "last_name" => $user->last_name,
                        "email" => $user->email
                    ];
                }),
                "config" => $project->config,
                "avatar" => count($project->media) > 0 ? $project->media[0]->getUrl() : [],
                "status" => $project->status

            ];
        });

        return [
            "status" => "success",
            "projects" => $projects
        ];
    }

    /**
     * @param Request $request
     * @return string[]
     * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist
     * @throws \Spatie\MediaLibrary\MediaCollections\Exceptions\FileIsTooBig
     * @throws Exception
     */
    public function create(Request $request)
    {
        $request->validate([
            "name" => "required",
            "overview" => "required",
            "start_date" => "required",
            "due_date" => "required",
        ]);

        $project_params = ["name", "overview", "start_date", "due_date", "config", "status", "company_id"];

        $user_id = $request->user()->id;
        $company_id = $this->getUserCompanyId($user_id);

        $request->merge(["company_id" => $company_id]);
        $project = VisitorProject::create($request->only($project_params));

        if (!empty($request->user_ids) && is_array($request->user_ids)) {
            foreach ($request->user_ids as $user_id) {
                Team::create([
                    "user_id" => $user_id,
                    "project_id" => $project->id
                ]);
            }
        }

        if ($request->hasFile("avatar")) {
            $project
                ->addMedia($request->file("avatar"))
                ->toMediaCollection();
        }

        return [
            "status" => "success"
        ];
    }

    public function update(Request $request)
    {
        $request->validate([
            "project_id" => "required",
        ]);

        $project_params = ["name", "overview", "start_date", "due_date", "config", "status"];

        VisitorProject::where("id", $request->project_id)
            ->update($request->only($project_params));

        if (!empty($request->user_ids) && is_array($request->user_ids)) {
            Team::where("project_id", $request->project_id)->delete();

            foreach ($request->user_ids as $user_id) {
                Team::create([
                    "user_id" => $user_id,
                    "project_id" => $request->project_id
                ]);
            }
        }

        if ($request->hasFile("avatar")) {

            $project = VisitorProject::where("id", $request->project_id)->first();
            $project->clearMediaCollection();
            $project
                ->addMedia($request->file("avatar"))
                ->toMediaCollection();
        }

        return [
            "status" => "success"
        ];
    }

    public function get_survey(Request $request)
    {
        $request->validate([
            "project_id" => "required",
        ]);


        $project = VisitorProject::where("id", $request->project_id)
            ->first();

        if (empty($project)) {
            return [
                "status" => "fail"
            ];
        }

        return [
            "status" => "success",
            "survey" => $project->config
        ];
    }

    public function get(Request $request)
    {
        $request->validate([
            "project_id" => "required",
        ]);


        $project = VisitorProject::where("id", $request->project_id)
            ->with("media")->with("team")
            ->first();

        if (empty($project)) {
            return [
                "status" => "fail"
            ];
        }

        return [
            "status" => "success",
            "project" => [
                "id" => $project->id,
                "name" => $project->name,
                "overview" => $project->overview,
                "start_date" => $project->start_date,
                "due_date" => $project->due_date,
                "team" => $project->team->map(function ($user) {
                    return [
                        "id" => $user->id,
                        "name" => $user->name,
                        "first_name" => $user->first_name,
                        "last_name" => $user->last_name,
                        "email" => $user->email
                    ];
                }),
                "config" => $project->config,
                "avatar" => count($project->media) > 0 ? $project->media[0]->getUrl() : [],
                "status" => $project->status
            ]
        ];
    }
}
