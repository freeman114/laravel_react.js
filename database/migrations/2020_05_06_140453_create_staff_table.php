<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStaffTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('staff', function (Blueprint $table) {
            $table->id();
            $table->string("first_name", 100);
            $table->string("last_name", 100);
            $table->string("email");
            $table->integer("cell")->nullable();
            $table->string("title");
            $table->tinyInteger("status");
            $table->tinyInteger("type");
            $table->string("home_phone", 20)->nullable();
            $table->string("home_street_number", 50)->nullable();
            $table->string("home_street_name")->nullable();
            $table->string("home_city")->nullable();
            $table->string("home_state")->nullable();
            $table->string("home_zip")->nullable();
            $table->text("image_url")->nullable();
            $table->text("notes")->nullable();
            $table->tinyInteger("user_status");
            $table->unsignedBigInteger("user_id")->nullable();

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
        Schema::dropIfExists('staff');
    }
}
