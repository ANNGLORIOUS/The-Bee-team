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
        Schema::table('books', function (Blueprint $table) {
            // Drop the old availability column
            $table->dropColumn('availability');

            // Add the new available column
            $table->integer('available')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('books', function (Blueprint $table) {
            // Drop the available column
            $table->dropColumn('available');

            // Restore the old availability column
            $table->boolean('availability')->default(true);
        });
    }
};
