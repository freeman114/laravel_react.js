<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\BillingCompany
 *
 * @property int $id
 * @property string $firstname
 * @property string $lastname
 * @property string $contactEmail
 * @property string $contactPhone
 * @property string $city
 * @property string $country
 * @property string $personalAddress
 * @property string $state
 * @property string $zip
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingCompany newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingCompany newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingCompany query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingCompany whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingCompany whereContactEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingCompany whereContactPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingCompany whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingCompany whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingCompany whereFirstname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingCompany whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingCompany whereLastname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingCompany wherePersonalAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingCompany whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingCompany whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\BillingCompany whereZip($value)
 * @mixin \Eloquent
 */
class BillingCompany extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'firstname', 'lastname', 'contactEmail', 'contactPhone', 'city', 'country',
        'personalAddress', 'state', 'zip'
    ];
}
