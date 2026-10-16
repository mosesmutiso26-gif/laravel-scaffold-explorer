<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('registration')->unique();
            $table->string('make')->nullable();
            $table->string('model')->nullable();
            $table->integer('capacity');
            $table->string('type'); // Bus, Van, Minibus
            $table->string('status')->default('Active'); // Active, Under Maintenance, Decommissioned
            $table->date('insurance_expiry')->nullable();
            $table->date('inspection_expiry')->nullable();
            $table->unsignedBigInteger('driver_staff_id')->nullable();
            $table->timestamps();

            $table->index('status');
        });

        Schema::create('transport_routes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->unsignedBigInteger('vehicle_id');
            $table->time('morning_pickup_time')->nullable();
            $table->time('evening_dropoff_time')->nullable();
            $table->text('stops')->nullable();
            $table->decimal('fee', 15, 2)->default(0);
            $table->string('status')->default('Active');
            $table->timestamps();

            $table->foreign('vehicle_id')->references('id')->on('vehicles')->cascadeOnUpdate()->restrictOnDelete();
            $table->index('status');
        });

        Schema::create('transport_assignments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('route_id');
            $table->unsignedBigInteger('term_id');
            $table->string('status')->default('Active'); // Active, Cancelled
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('students')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('route_id')->references('id')->on('transport_routes')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreign('term_id')->references('id')->on('terms')->cascadeOnUpdate()->restrictOnDelete();
            $table->index(['student_id', 'term_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transport_assignments');
        Schema::dropIfExists('transport_routes');
        Schema::dropIfExists('vehicles');
    }
};
