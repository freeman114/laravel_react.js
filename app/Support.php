<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Support
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Support newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Support newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Support query()
 * @mixin \Eloquent
 * @property int $id
 * @property string|null $name
 * @property string $email
 * @property string|null $subject
 * @property string $body
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Support whereBody($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Support whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Support whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Support whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Support whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Support whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Support whereUpdatedAt($value)
 */
class Support extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'subject', 'body'
    ];
}
