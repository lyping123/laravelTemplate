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
        Schema::create('buyer_cart_lists', function (Blueprint $table) {
            $table->id();
            $table->foreignId('buyer_id')->constrained('buyer')->onDelete('cascade');
            $table->string('invoice_number')->unique();
            $table->integer('status')->default(0);
            $table->decimal('total_price', 10, 2)->default(0);
            $table->string('payment_method')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buyer_cart_lists');
    }
};
