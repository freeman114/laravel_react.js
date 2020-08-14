<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\UserLevel
 *
 * @property int $id
 * @property int $parent_id
 * @property int $user_id
 * @property int $level_id
 * @property string $value
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserLevel newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserLevel newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserLevel query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserLevel whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserLevel whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserLevel whereLevelId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserLevel whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserLevel whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserLevel whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserLevel whereValue($value)
 * @mixin \Eloquent
 * @property int $company_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserLevel whereCompanyId($value)
 */
class UserLevel extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'parent_id', 'user_id', 'level_id', 'value', 'company_id'
    ];
}
