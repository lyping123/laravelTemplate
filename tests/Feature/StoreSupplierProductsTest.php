<?php

namespace Tests\Feature;

use App\Models\productStockIn;
use App\Models\supplier;
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

    public function test_authenticated_user_can_load_the_product_list_grouped_by_supplier(): void
    {
        $user = User::factory()->create();
        $supplier = supplier::create([
            'company_name' => 'Northstar Trading',
            'contact_person' => 'Maria Santos',
            'contact_number' => '+63 900 000 0000',
            'email' => 'maria@northstar.test',
        ]);
        productStockIn::create([
            'supplier_id' => $supplier->id,
            'product_name' => 'Arabica Coffee',
            'quantity' => 10,
            'price' => '12.50',
            'description' => 'Organic beans',
        ]);

        $response = $this->actingAs($user)->get(route('products.list'));

        $response
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('Products/productsList')
                ->has('products', 1)
                ->where('products.0.product_name', 'Arabica Coffee')
                ->where('products.0.supplier.company_name', 'Northstar Trading'));
    }

    public function test_authenticated_user_can_update_a_product(): void
    {
        $user = User::factory()->create();
        $supplier = supplier::create([
            'company_name' => 'Northstar Trading',
            'contact_person' => 'Maria Santos',
            'contact_number' => '+63 900 000 0000',
        ]);
        $product = productStockIn::create([
            'supplier_id' => $supplier->id,
            'product_name' => 'Arabica Coffee',
            'quantity' => 10,
            'price' => '12.50',
        ]);

        $response = $this->actingAs($user)->put(route('products.update', $product), [
            'product_name' => 'Premium Arabica Coffee',
            'description' => 'Roasted beans',
            'quantity' => 25,
            'price' => '15.00',
        ]);

        $response
            ->assertRedirect(route('products.list'))
            ->assertSessionHas('success', 'Product updated successfully.');

        $this->assertDatabaseHas('product_stock_ins', [
            'id' => $product->id,
            'product_name' => 'Premium Arabica Coffee',
            'quantity' => 25,
            'price' => '15.00',
        ]);
    }

    public function test_authenticated_user_can_delete_a_product(): void
    {
        $user = User::factory()->create();
        $supplier = supplier::create([
            'company_name' => 'Northstar Trading',
            'contact_person' => 'Maria Santos',
            'contact_number' => '+63 900 000 0000',
        ]);
        $product = productStockIn::create([
            'supplier_id' => $supplier->id,
            'product_name' => 'Arabica Coffee',
            'quantity' => 10,
            'price' => '12.50',
        ]);

        $response = $this->actingAs($user)->delete(route('products.destroy', $product));

        $response
            ->assertRedirect(route('products.list'))
            ->assertSessionHas('success', 'Product deleted successfully.');

        $this->assertDatabaseMissing('product_stock_ins', [
            'id' => $product->id,
        ]);
    }
}
