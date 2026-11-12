import { Head, Link, router } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import buyerController from '@/actions/App/Http/Controllers/buyerController';
import Pagination, {
    type Paginated,
} from '@/components/Pagination';

import { dashboard } from '@/routes';

type Buyer = {
    id: number;
    buyer_name: string;
    ic: string;
};

type Product = {
    id: number;
    product_name: string;
    description: string | null;
    quantity: number;
    price: string | number;
};

type CartList = {
    id: number;
    invoice_number: string;
    total_price: string | number;
    buyer: Buyer;
    products_list: Array<{
        id: number;
        quantity: number;
        unit_price: string | number;
        product: Product;
    }>;
};

type BuyerPageProps = {
    buyers: Buyer[];
    products: Paginated<Product>;
    cartLists: Paginated<CartList>;
};

const formatPrice = (price: string | number) =>
    Number(price).toLocaleString('en-MY', {
        style: 'currency',
        currency: 'MYR',
    });

export default function BuyerIndex({
    buyers,
    products,
    cartLists,
}: BuyerPageProps) {
    const [buyerId, setBuyerId] = useState('');
    const [quantities, setQuantities] = useState<Record<number, number>>({});
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const selectedProducts = useMemo(
        () =>
            products.data
                .filter((product) => (quantities[product.id] ?? 0) > 0)
                .map((product) => ({
                    product,
                    quantity: quantities[product.id],
                })),
        [products, quantities],
    );

    const total = selectedProducts.reduce(
        (sum, item) => sum + Number(item.product.price) * item.quantity,
        0,
    );

    const updateQuantity = (product: Product, value: string) => {
        const quantity = Math.min(
            Math.max(Number.parseInt(value, 10) || 0, 0),
            product.quantity,
        );

        setQuantities((current) => ({ ...current, [product.id]: quantity }));
    };

    const submitCart = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (!buyerId) {
            setError('Select a buyer before adding the cart list.');

            return;
        }

        if (selectedProducts.length === 0) {
            setError('Add at least one product to the cart list.');

            return;
        }

        setProcessing(true);
        router.post(
            buyerController.storeCartList.url(),
            {
                buyer_id: Number(buyerId),
                products: selectedProducts.map(({ product, quantity }) => ({
                    product_id: product.id,
                    quantity,
                })),
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setQuantities({});
                    setSuccess('Cart list added successfully.');
                },
                onError: (errors) => {
                    const firstError = Object.values(errors)[0];
                    setError(
                        typeof firstError === 'string'
                            ? firstError
                            : 'Unable to add this cart list.',
                    );
                },
                onFinish: () => setProcessing(false),
            },
        );
    };

    return (
        <>
            <Head title="Buyer Cart" />
            <main className="min-h-screen bg-[#f5f1e8] px-5 py-8 text-[#18211d] sm:px-8 lg:px-12 lg:py-12">
                <div className="mx-auto max-w-7xl">
                    <Link
                        href={dashboard.url()}
                        className="text-sm font-semibold text-[#68736c] hover:text-[#18211d]"
                    >
                        ← Back to dashboard
                    </Link>
                    <header className="mt-8">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-xs font-bold tracking-[0.2em] text-[#c44936] uppercase">
                                    Sales workspace
                                </p>
                                <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                                    Buyer cart preview
                                </h1>
                                <p className="mt-3 max-w-xl text-sm leading-6 text-[#68736c]">
                                    Select a buyer, choose products, and preview
                                    the cart total before saving the cart list.
                                </p>
                            </div>
                            <Link
                                href={buyerController.create.url()}
                                className="inline-flex items-center justify-center rounded-xl bg-[#18211d] px-4 py-3 text-sm font-bold text-[#f5f1e8] transition hover:bg-[#2c3932]"
                            >
                                Add buyer
                            </Link>
                        </div>
                    </header>

                    <form
                        onSubmit={submitCart}
                        className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]"
                    >
                        <section className="rounded-3xl border border-[#dfe2da] bg-white/80 p-6 sm:p-8">
                            <label
                                className="grid gap-2 text-sm font-semibold"
                                htmlFor="buyer"
                            >
                                Buyer
                                <select
                                    id="buyer"
                                    value={buyerId}
                                    onChange={(event) =>
                                        setBuyerId(event.target.value)
                                    }
                                    className="h-12 rounded-xl border border-[#dfe2da] bg-white px-4 outline-none focus:border-[#18211d] focus:ring-4 focus:ring-[#d8f36a]/50"
                                >
                                    <option value="">Select a buyer</option>
                                    {buyers.map((buyer) => (
                                        <option key={buyer.id} value={buyer.id}>
                                            {buyer.buyer_name} ({buyer.ic})
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <div className="mt-8 flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        Products
                                    </h2>
                                    <p className="mt-1 text-sm text-[#68736c]">
                                        Enter a quantity to add an item.
                                    </p>
                                </div>
                                <span className="rounded-full bg-[#d8f36a] px-3 py-1 text-xs font-bold">
                                    {selectedProducts.length} selected
                                </span>
                            </div>

                            <div className="mt-6 grid gap-3">
                                {products.data.length === 0 ? (
                                    <p className="rounded-2xl bg-[#f5f1e8] p-5 text-sm text-[#68736c]">
                                        No products are available yet.
                                    </p>
                                ) : (
                                    products.data.map((product) => (
                                        <div
                                            key={product.id}
                                            className="flex flex-col gap-4 rounded-2xl border border-[#dfe2da] p-4 sm:flex-row sm:items-center sm:justify-between"
                                        >
                                            <div>
                                                <h3 className="font-semibold">
                                                    {product.product_name}
                                                </h3>
                                                <p className="mt-1 text-sm text-[#68736c]">
                                                    {formatPrice(product.price)} ·{' '}
                                                    {product.quantity} in stock
                                                </p>
                                            </div>
                                            <input
                                                aria-label={`Quantity for ${product.product_name}`}
                                                type="number"
                                                min="0"
                                                max={product.quantity}
                                                value={
                                                    quantities[product.id] ?? ''
                                                }
                                                onChange={(event) =>
                                                    updateQuantity(
                                                        product,
                                                        event.target.value,
                                                    )
                                                }
                                                className="h-11 w-full rounded-xl border border-[#dfe2da] px-3 text-sm sm:w-24"
                                            />
                                        </div>
                                    ))
                                )}
                            </div>
                            <Pagination pagination={products} />
                        </section>

                        <aside className="h-fit rounded-3xl bg-[#18211d] p-6 text-[#f5f1e8] sm:p-8">
                            <p className="text-xs font-bold tracking-[0.2em] text-[#d8f36a] uppercase">
                                Cart preview
                            </p>
                            <div className="mt-6 grid gap-3">
                                {selectedProducts.length === 0 ? (
                                    <p className="text-sm text-[#aab5ab]">
                                        Your selected products will appear here.
                                    </p>
                                ) : (
                                    selectedProducts.map(
                                        ({ product, quantity }) => (
                                            <div
                                                key={product.id}
                                                className="flex justify-between gap-4 text-sm"
                                            >
                                                <span>
                                                    {product.product_name} ×{' '}
                                                    {quantity}
                                                </span>
                                                <span>
                                                    {formatPrice(
                                                        Number(product.price) *
                                                        quantity,
                                                    )}
                                                </span>
                                            </div>
                                        ),
                                    )
                                )}
                            </div>
                            <div className="mt-6 border-t border-white/15 pt-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-[#aab5ab]">
                                        Total
                                    </span>
                                    <strong className="text-2xl">
                                        {formatPrice(total)}
                                    </strong>
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-6 w-full rounded-xl bg-[#d8f36a] px-4 py-3 text-sm font-bold text-[#18211d] transition hover:bg-[#e4fb91] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing
                                        ? 'Saving cart...'
                                        : 'Add cart list'}
                                </button>
                            </div>
                            {error && (
                                <p className="mt-4 rounded-xl bg-[#c44936]/20 p-3 text-sm text-[#ffb7a9]">
                                    {error}
                                </p>
                            )}
                            {success && (
                                <p className="mt-4 rounded-xl bg-[#d8f36a]/15 p-3 text-sm text-[#d8f36a]">
                                    {success}
                                </p>
                            )}
                        </aside>
                    </form>

                    <section className="mt-10 rounded-3xl border border-[#dfe2da] bg-white/80 p-6 sm:p-8">
                        <h2 className="text-xl font-semibold">
                            Recent cart lists
                        </h2>
                        {cartLists.data.length === 0 ? (
                            <p className="mt-3 text-sm text-[#68736c]">
                                No cart lists have been added yet.
                            </p>
                        ) : (
                            <div className="mt-5 grid gap-3">
                                {cartLists.data.map((cart) => (
                                    <div
                                        key={cart.id}
                                        className="flex flex-col gap-2 rounded-2xl bg-[#f5f1e8] p-4 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div>
                                            <p className="font-semibold">
                                                {cart.invoice_number}
                                            </p>
                                            <p className="text-sm text-[#68736c]">
                                                {cart.buyer.buyer_name} ·{' '}
                                                {cart.products_list.length}{' '}
                                                {cart.products_list.length === 1
                                                    ? 'item'
                                                    : 'items'}
                                            </p>
                                        </div>
                                        <strong>
                                            {formatPrice(cart.total_price)}
                                        </strong>
                                    </div>
                                ))}
                            </div>
                        )}
                        <Pagination pagination={cartLists} />
                    </section>
                </div>
            </main>
        </>
    );
}