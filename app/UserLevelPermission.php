<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\UserLevelPermission
 *
 * @property int $user_id
 * @property int $user_level_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserLevelPermission newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserLevelPermission newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserLevelPermission query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserLevelPermission whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserLevelPermission whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserLevelPermission whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\UserLevelPermission whereUserLevelId($value)
 * @mixin \Eloquent
 */
class UserLevelPermission extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = "user_has_level_permissions";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'user_level_id'
    ];
}
