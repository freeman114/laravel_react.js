<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Level
 *
 * @property int $id
 * @property string $name
 * @property int $order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Level newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Level newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Level query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Level whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Level whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Level whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Level whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Level whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class C2g_countries extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'code', 'country',
    ];
}
