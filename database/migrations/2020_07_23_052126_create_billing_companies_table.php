<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBillingCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('billing_companies', function (Blueprint $table) {
            $table->id();
            $table->string("firstname");
            $table->string("lastname");
            $table->string("contactEmail");
            $table->string("contactPhone");
            $table->string("city");
            $table->string("country");
            $table->string("personalAddress");
            $table->string("state");
            $table->string("zip");
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
        Schema::dropIfExists('billing_companies');
    }
}
