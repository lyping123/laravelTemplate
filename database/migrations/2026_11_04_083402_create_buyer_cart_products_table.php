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
        Schema::create('buyer_cart_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('buyer_cart_list_id')->constrained('buyer_cart_lists')->onDelete('cascade');
            $table->foreignId('product_id')->constrained('product_stock_ins')->onDelete('cascade');
            $table->integer('quantity')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buyer_cart_products');
    }
};
