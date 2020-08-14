<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('visitor_projects', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("company_id")->nullable();
            $table->string("name");
            $table->string("overview");
            $table->date("start_date");
            $table->date("due_date");
            $table->tinyInteger("status")->default(0);
            $table->json("config");

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
        Schema::dropIfExists('visitor_projects');
    }
}
