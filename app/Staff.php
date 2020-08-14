<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Staff
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff query()
 * @mixin \Eloquent
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property int|null $cell
 * @property string $title
 * @property int $status
 * @property int $type
 * @property string|null $home_phone
 * @property string|null $home_street_number
 * @property string|null $home_street_name
 * @property string|null $home_city
 * @property string|null $home_state
 * @property string|null $home_zip
 * @property string|null $image_url
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereCell($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereHomeCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereHomePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereHomeState($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereHomeStreetName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereHomeStreetNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereHomeZip($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereUpdatedAt($value)
 * @property int $user_status
 * @property int|null $user_id
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Staff whereUserStatus($value)
 */
class Staff extends Model
{
    //STAFF STATUSES
    const FULL_TIME = 1;
    const PART_TIME = 2;
    const REMOVED = 3;

    const STATUSES = [
        self::FULL_TIME => "Full Time",
        self::PART_TIME => "Part Time",
        self::REMOVED => "Removed",
    ];

    //STAFF TYPES
    const HOURLY = 1;
    const SALARY = 2;
    const VOLUNTEER = 3;

    const TYPES = [
        self::HOURLY => "Hourly",
        self::SALARY => "Salary",
        self::VOLUNTEER => "Volunteer",
    ];

    //USER STATUSES
    const CREATED = 1;
    const INVITED = 2;
    const ACTIVATED = 3;
    const DUPLICATE = 4;

    const USER_STATUSES = [
        0 => "",
        self::CREATED => "Created",
        self::INVITED => "Invited",
        self::ACTIVATED => "Activated",
        self::DUPLICATE => "Duplicate",
    ];


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name', 'email', 'cell', 'title', 'status', 'type', 'home_phone',
        'home_street_number', 'home_street_name', 'home_city', 'home_state', 'home_zip',
        'image_url', 'notes', 'user_status', 'user_id'
    ];

}
