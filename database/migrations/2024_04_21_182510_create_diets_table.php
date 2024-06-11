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

        // 'low_carb', 'vegetarian', 'vegan', 'gluten_free', 'dairy_free',
        //         'paleo', 'keto', 'mediterranean', 'pescatarian', 'whole30',
        //         'raw_food', 'low_fat', 'nut_free', 'soy_free', 'shellfish_free',
        //         'halal', 'kosher', 'fodmap'
        Schema::create('diets', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('benefits')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diets');
    }
};
