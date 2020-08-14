<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Price
 *
 * @property int $id
 * @property int $count_min
 * @property int $count_max
 * @property float $sum_minimum
 * @property float $record_cost
 * @property string $currency
 * @property string|null $note
 * @property int $discount
 * @property int $days_in_month
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Price newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Price newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Price query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Price whereCountMax($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Price whereCountMin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Price whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Price whereCurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Price whereDaysInMonth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Price whereDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Price whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Price whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Price whereRecordCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Price whereSumMinimum($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Price whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Price extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'count_min', 'count_max', 'sum_minimum', 'record_cost', 'currency', 'note', 'discount', 'days_in_month'
    ];
}
