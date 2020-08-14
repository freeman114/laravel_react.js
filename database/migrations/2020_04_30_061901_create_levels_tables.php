<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLevelsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('levels', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->integer("order");
            $table->timestamps();
        });

        Schema::create('user_levels', function (Blueprint $table) {
            $table->id();
            $table->integer("company_id");
            $table->integer("parent_id");
            $table->unsignedBigInteger("user_id");
            $table->integer("level_id");

            $table->string("value");
            $table->timestamps();
        });

        Schema::create('user_has_level_permissions', function (Blueprint $table) {
            $table->unsignedBigInteger("user_id");
            $table->unsignedBigInteger("user_level_id");
            $table->timestamps();
            $table->primary(["user_id", "user_level_id"]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('levels');
        Schema::dropIfExists('user_levels');
        Schema::dropIfExists('user_has_level_permissions');
    }
}
