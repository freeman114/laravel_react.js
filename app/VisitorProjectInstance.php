<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\VisitorProjectInstance
 *
 * @property int $id
 * @property int $user_id
 * @property int $project_id
 * @property array $question
 * @property array $answer
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProjectInstance newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProjectInstance newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProjectInstance query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProjectInstance whereAnswer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProjectInstance whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProjectInstance whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProjectInstance whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProjectInstance whereQuestion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProjectInstance whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProjectInstance whereUserId($value)
 * @mixin \Eloquent
 */
class VisitorProjectInstance extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = "visitor_project_instances";


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'project_id', 'question', 'answer'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'question' => 'json',
        'answer' => 'json',
    ];
}
