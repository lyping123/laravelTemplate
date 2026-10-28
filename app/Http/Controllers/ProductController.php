<?php

namespace App\Http\Controllers;

use App\Models\supplier;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        return inertia('Products/Index');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'supplier.company_name' => ['required', 'string', 'max:255'],
            'supplier.contact_person' => ['required', 'string', 'max:255'],
            'supplier.email' => ['nullable', 'email', 'max:255'],
            'supplier.contact_number' => ['required', 'string', 'max:255'],
            'products' => ['required', 'array', 'min:1'],
            'products.*.product_name' => ['required', 'string', 'max:255'],
            'products.*.description' => ['nullable', 'string'],
            'products.*.price' => ['required', 'numeric', 'min:0'],
            'products.*.quantity' => ['required', 'integer', 'min:1'],
        ]);

        DB::transaction(function () use ($validated): void {
            $supplier = supplier::create([
                'company_name' => $validated['supplier']['company_name'],
                'contact_person' => $validated['supplier']['contact_person'],
                'contact_number' => $validated['supplier']['contact_number'],
                'email' => $validated['supplier']['email'] ?? null,
            ]);

            foreach ($validated['products'] as $product) {
                $supplier->productStockIns()->create([
                    'product_name' => $product['product_name'],
                    'quantity' => $product['quantity'],
                    'price' => $product['price'],
                    'description' => $product['description'] ?? null,
                ]);
            }
        });

        return redirect()->route('products.index')->with('success', 'Supplier and products added successfully.');
    }
}
