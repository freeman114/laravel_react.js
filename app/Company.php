<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Company
 *
 * @property int $id
 * @property string $name
 * @property string $address
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Company newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Company newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Company query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Company whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Company whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Company whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Company whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Company whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Company whereUserId($value)
 * @mixin \Eloquent
 * @property int $billing_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Company whereBillingId($value)
 */
class Company extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'address', 'user_id', 'billing_id'
    ];
}
