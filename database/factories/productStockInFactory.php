<?php

namespace Database\Factories;

use App\Models\productStockIn;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<productStockIn>
 */
class productStockInFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_name' => $this->faker->word(),
            'quantity' => $this->faker->numberBetween(1, 100),
            'price' => $this->faker->randomFloat(2, 1, 100),
            'description' => $this->faker->sentence(),
        ];
    }
}
