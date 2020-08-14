<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * App\VisitorProject
 *
 * @property int $id
 * @property string $name
 * @property string $overview
 * @property string $start_date
 * @property string $due_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProject newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProject newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProject query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProject whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProject whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProject whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProject whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProject whereOverview($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProject whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProject whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property int $status
 * @property array|null $config
 * @property-read \Spatie\MediaLibrary\MediaCollections\Models\Collections\MediaCollection|\Spatie\MediaLibrary\MediaCollections\Models\Media[] $media
 * @property-read int|null $media_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $team
 * @property-read int|null $team_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProject whereConfig($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\VisitorProject whereStatus($value)
 */
class VisitorProject extends Model implements HasMedia
{
    use InteractsWithMedia;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = "visitor_projects";

    const ONGOING = 0;
    const FINISHED = 1;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'overview', 'start_date', 'due_date', 'config', 'status', 'company_id'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'config' => 'json',
    ];

    public function team()
    {
        return $this->belongsToMany('App\User', 'teams', 'project_id', 'user_id');
    }
}
