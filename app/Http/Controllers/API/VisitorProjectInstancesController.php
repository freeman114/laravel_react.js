<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\VisitorProject;
use App\Team;
use App\VisitorProjectInstance;
use Illuminate\Http\Request;

class VisitorProjectInstancesController extends Controller
{

    public function create(Request $request)
    {
        $request->validate([
            "project_id" => "required",
            "question" => "required",
        ]);

        if (empty($request->user_id)) {
            $request->merge([
                "user_id" => $request->user()->id
            ]);
        }


        $project_params = ["user_id", "project_id", "question", "answer"];
        $project_instance = VisitorProjectInstance::create($request->only($project_params));


        return [
            "status" => "success",
            "project_instance" => $project_instance
        ];
    }

    public function update(Request $request)
    {
        $request->validate([
            "instance_id" => "required",
        ]);

        $project_params = ["user_id", "project_id", "question", "answer"];

        VisitorProjectInstance::where("id", $request->instance_id)->update($request->only($project_params));

        return [
            "status" => "success"
        ];
    }


    /**
     * by project_id or user_id
     *
     * @param Request $request
     * @return array|string[]
     */
    public function get(Request $request)
    {
        $query = VisitorProjectInstance::query();

        if (!empty($request->instance_id)) {
            $query->where("id", $request->instance_id);
        }

        if (!empty($request->project_id)) {
            $query->where("project_id", $request->project_id);
        }

        if (!empty($request->user_id)) {
            $query->where("user_id", $request->user_id);
        }


        return [
            "status" => "success",
            "project_instances" => $query->get()
        ];
    }

    public function report(Request $request)
    {

        $query = VisitorProjectInstance::selectRaw("question, answer, created_at");
        if (!empty($request->start_date)) {
            $query->whereDate("created_at", ">=", $request->start_date);
        }
        if (!empty($request->due_date)) {
            $query->whereDate("created_at", "<=", $request->due_date);
        }
        if (!empty($request->project_id)) {
            $query->where("project_id", $request->project_id);
        }

        $instances = $query->get();

        $min_created_at = $instances->min("created_at");

        $instances = $instances->map(function ($instance) {

            $questions = json_decode($instance->question);
            $answers = json_decode($instance->answer);

            $rows = [];
            foreach ($questions as $question_id => $question_text) {

                if (is_array($question_text)) {
                    foreach ($question_text as $q_id => $q_text) {
                        $row = [
                            "question_id" => $q_id,
                            "question_text" => $q_text,
                            "answer" => $this->getAnswer($answers->{$question_id}[$q_id]),
                            "created_at" => $instance->created_at
                        ];
                        $rows[] = $row;
                    }
                } else {
                    $row = [
                        "question_id" => $question_id,
                        "question_text" => $question_text,
                        "answer" => $this->getAnswer(is_array($answers->{$question_id}) ? implode(", ", $answers->{$question_id}) : $answers->{$question_id}),
                        "created_at" => $instance->created_at
                    ];
                }

                $rows[] = $row;
            }


            return $rows;
        })->toArray();

        $report = [];
        foreach ($instances as $instance) {
            $report = array_merge($report, $instance);
        }

        return [
            "status" => "success",
            "report" => $report,
            "min_created_at" => $min_created_at
        ];
    }

    private function getAnswer($answer) {
        if(is_object($answer)) {
            $answers = [];
            foreach ($answer as $answer_key => $answer_item) {
                $answers[] = "$answer_key: $answer_item";
            }

            $answer = implode(", ", $answers);
        }

        return $answer;
    }

}
