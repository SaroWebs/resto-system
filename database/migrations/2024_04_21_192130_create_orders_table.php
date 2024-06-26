<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->date('order_date');
            $table->time('order_time');
            $table->enum('status', ['pending', 'confirmed', 'completed', 'cancelled']);
            $table->foreignId('diet_id')->nullable();
            $table->text('special_requests')->nullable();
            $table->boolean('home_delivery')->default(0);
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
