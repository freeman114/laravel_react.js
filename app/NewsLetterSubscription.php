<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\NewsLetterSubscription
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string|null $ip
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\NewsLetterSubscription newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\NewsLetterSubscription newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\NewsLetterSubscription query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\NewsLetterSubscription whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\NewsLetterSubscription whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\NewsLetterSubscription whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\NewsLetterSubscription whereIp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\NewsLetterSubscription whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\NewsLetterSubscription whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class NewsLetterSubscription extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'ip'
    ];
}
