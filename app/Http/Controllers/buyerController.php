<?php

namespace App\Http\Controllers;

use App\Models\buyer;
use App\Models\buyer_cart_list;
use App\Models\productStockIn;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class buyerController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('buyer/create');
    }

    public function index(): Response
    {
        return Inertia::render('buyer/index', [
            'buyers' => buyer::query()->orderBy('buyer_name')->get(),
            'products' => productStockIn::query()->orderBy('product_name')->get(),
            'cartLists' => buyer_cart_list::query()
                ->with(['buyer', 'ProductsList.product'])
                ->latest()
                ->limit(10)
                ->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'buyer_name' => ['required', 'string', 'max:255'],
            'ic' => ['required', 'string', 'max:255'],
            'contact_number' => ['required', 'string', 'max:255'],
            'line_address' => ['required', 'string', 'max:255'],
            'state' => ['required', 'string', 'max:255'],
            'zipcode' => ['required', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
        ]);

        $buyer = buyer::create($validated);

        return redirect()->route('buyer.index')->with('success', "Buyer {$buyer->buyer_name} added successfully.");
    }

    public function storeCartList(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'buyer_id' => ['required', 'integer', 'exists:buyer,id'],
            'products' => ['required', 'array', 'min:1'],
            'products.*.product_id' => ['required', 'integer', 'distinct', 'exists:product_stock_ins,id'],
            'products.*.quantity' => ['required', 'integer', 'min:1'],
        ]);

        DB::transaction(function () use ($validated): void {
            $products = productStockIn::query()
                ->whereIn('id', collect($validated['products'])->pluck('product_id'))
                ->lockForUpdate()
                ->get()
                ->keyBy('id');

            $totalPrice = 0;
            foreach ($validated['products'] as $cartProduct) {
                $product = $products->get($cartProduct['product_id']);
                if ($product === null || $cartProduct['quantity'] > $product->quantity) {
                    abort(422, 'One or more products do not have enough stock.');
                }

                $totalPrice += (float) $product->price * $cartProduct['quantity'];
            }

            $cartList = buyer_cart_list::create([
                'buyer_id' => $validated['buyer_id'],
                'invoice_number' => 'INV-' . str()->upper(str()->random(10)),
                'status' => 0,
                'total_price' => round($totalPrice, 2),
            ]);

            foreach ($validated['products'] as $cartProduct) {
                $product = $products->get($cartProduct['product_id']);
                $cartList->ProductsList()->create([
                    'product_id' => $product->id,
                    'quantity' => $cartProduct['quantity'],
                    'unit_price' => $product->price,
                ]);
            }
        });

        return redirect()->route('buyer.index')->with('success', 'Cart list added successfully.');
    }
}
