<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePricesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prices', function (Blueprint $table) {
            $table->id();
            $table->integer("count_min");
            $table->integer("count_max");
            $table->decimal("sum_minimum")->default(0);
            $table->double("record_cost");
            $table->string("currency", 3)->default("USD");
            $table->string("note")->nullable();
            $table->integer("discount")->default(0);
            $table->integer("days_in_month")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('prices');
    }
}
