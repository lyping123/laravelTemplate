<?php

namespace Database\Seeders;

use App\Models\productStockIn;
use App\Models\supplier;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => '123',
            'email_verified_at' => now(),
        ]);

        $supplier = supplier::create([
            'company_name' => 'Supplier 1',
            'contact_person' => 'John Doe',
            'contact_number' => '1234567890',
            'email' => 'supplier1@example.com',
        ]);

        productStockIn::factory(10)->create([
            'supplier_id' => $supplier->id,
        ]);
    }
}
