<?php

namespace App\Exports;

use App\VisitorProjectInstance;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\FromView;


class VisitorProjectInstancesExport implements FromView
{
    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }
    public function view(): View
    {
        $query = VisitorProjectInstance::selectRaw("question, answer, created_at");
        if (!empty($this->request->start_date)) {
            $query->whereDate("created_at", ">=", $this->request->start_date);
        }
        if (!empty($this->request->due_date)) {
            $query->whereDate("created_at", "<=", $this->request->due_date);
        }

        if (!empty($this->request->project_id)) {
            $query->where("project_id", $this->request->project_id);
        }

        $instances = $query->get();


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

        foreach ($report as $key => $item) {
            if(is_object($item["answer"])) {
                unset($report[$key]);
            }
        }

        return view('exports.visitor_instances', [
            'instances' => $report
        ]);
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
