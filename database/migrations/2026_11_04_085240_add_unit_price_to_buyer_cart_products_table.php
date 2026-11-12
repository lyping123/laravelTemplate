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
        Schema::table('buyer_cart_products', function (Blueprint $table) {
            Schema::table('buyer_cart_products', function (Blueprint $table): void {
                $table->decimal('unit_price', 10, 2)->after('quantity');
            });

            Schema::table('buyer_cart_lists', function (Blueprint $table): void {
                $table->renameColumn('invloice_number', 'invoice_number');
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('buyer_cart_products', function (Blueprint $table) {
            Schema::table('buyer_cart_lists', function (Blueprint $table): void {
                $table->renameColumn('invoice_number', 'invloice_number');
            });

            Schema::table('buyer_cart_products', function (Blueprint $table): void {
                $table->dropColumn('unit_price');
            });
        });
    }
};
