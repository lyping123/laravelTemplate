<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StoreSupplierProductsTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_store_a_supplier_with_multiple_products(): void
    {
        $response = $this->actingAs(User::factory()->create())
            ->post(route('products.store'), [
                'supplier' => [
                    'company_name' => 'Northstar Trading',
                    'contact_person' => 'Maria Santos',
                    'contact_number' => '+63 900 000 0000',
                    'email' => 'maria@northstar.test',
                ],
                'products' => [
                    [
                        'product_name' => 'Arabica Coffee',
                        'description' => 'Organic beans',
                        'quantity' => 10,
                        'price' => '12.50',
                    ],
                    [
                        'product_name' => 'Robusta Coffee',
                        'description' => null,
                        'quantity' => 20,
                        'price' => '10.00',
                    ],
                ],
            ]);

        $response
            ->assertRedirect(route('products.index'))
            ->assertSessionHas('success', 'Supplier and products added successfully.');

        $this->assertDatabaseHas('suppliers', [
            'company_name' => 'Northstar Trading',
        ]);
        $this->assertDatabaseCount('product_stock_ins', 2);
        $this->assertDatabaseHas('product_stock_ins', [
            'product_name' => 'Arabica Coffee',
            'quantity' => 10,
            'price' => '12.50',
        ]);
    }
}
