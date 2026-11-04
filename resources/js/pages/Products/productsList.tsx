import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import productsRoute from '@/routes/products';
import { dashboard } from '@/routes';

type Product = {
    id: number;
    product_name: string;
    description: string | null;
    quantity: number;
    price: string | number;
    supplier?: Supplier | null;
};

type Supplier = {
    id: number;
    company_name: string;
    contact_person: string;
    contact_number: string;
    email: string | null;
};

type ProductsListProps = {
    products: Product[];
};

type ProductForm = {
    product_name: string;
    description: string;
    quantity: string;
    price: string;
};

const inputClassName =
    'h-12 w-full rounded-xl border border-[#dfe2da] bg-white px-4 text-sm text-[#18211d] outline-none transition placeholder:text-[#9aa49b] focus:border-[#18211d] focus:ring-4 focus:ring-[#d8f36a]/50';

const formatPrice = (price: string | number) =>
    Number(price).toLocaleString('en-MY', {
        style: 'currency',
        currency: 'MYR',
    });

export default function ProductsList({ products }: ProductsListProps) {
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [form, setForm] = useState<ProductForm>({
        product_name: '',
        description: '',
        quantity: '',
        price: '',
    });
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    const productCount = products.length;

    const openEdit = (product: Product) => {
        setEditingProduct(product);
        setForm({
            product_name: product.product_name,
            description: product.description ?? '',
            quantity: String(product.quantity),
            price: String(product.price),
        });
        setError('');
    };

    const closeEdit = () => {
        if (!processing) {
            setEditingProduct(null);
        }
    };

    const updateForm = (name: keyof ProductForm, value: string) => {
        setForm((current) => ({ ...current, [name]: value }));
    };

    const submitEdit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!editingProduct) {
            return;
        }

        setProcessing(true);
        setError('');
        router.put(productsRoute.update.url(editingProduct.id), form, {
            preserveScroll: true,
            onSuccess: () => setEditingProduct(null),
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                setError(
                    typeof firstError === 'string'
                        ? firstError
                        : 'Unable to update this product.',
                );
            },
            onFinish: () => setProcessing(false),
        });
    };

    const deleteProduct = (product: Product) => {
        if (
            !window.confirm(
                `Delete "${product.product_name}"? This action cannot be undone.`,
            )
        ) {
            return;
        }
        router.delete(productsRoute.destroy.url(product.id), {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Product List" />
            <main className="min-h-screen bg-[#f5f1e8] px-5 py-8 text-[#18211d] sm:px-8 lg:px-12 lg:py-12">

                <Link
                    href={dashboard.url()}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#68736c] transition hover:text-[#18211d]"
                >
                    <span aria-hidden="true">←</span>
                    Back to dashboard
                </Link>
                <div className="mx-auto max-w-7xl">
                    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-bold tracking-[0.2em] text-[#c44936] uppercase">
                                Inventory workspace
                            </p>
                            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                                Product list
                            </h1>
                            <p className="mt-3 text-sm leading-6 text-[#68736c]">
                                {productCount}{' '}
                                {productCount === 1 ? 'product' : 'products'} in
                                your catalog.
                            </p>
                        </div>
                        <Link
                            href={productsRoute.index.url()}
                            className="rounded-xl bg-[#18211d] px-5 py-3 text-center text-sm font-semibold text-[#f5f1e8] transition hover:bg-[#2d3b33]"
                        >
                            Add supplier
                        </Link>
                    </header>

                    {products.length === 0 ? (
                        <section className="mt-8 rounded-3xl border border-dashed border-[#b8c0b7] bg-white/60 p-10 text-center">
                            <h2 className="text-xl font-semibold">
                                No products yet
                            </h2>
                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#68736c]">
                                Add your first supplier and attach one or more
                                products to start building your catalog.
                            </p>
                        </section>
                    ) : (
                        <section className="mt-8 overflow-hidden rounded-3xl border border-[#dfe2da] bg-white/80">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[840px] text-left text-sm">
                                    <thead className="bg-[#18211d] text-xs tracking-[0.1em] text-[#f5f1e8] uppercase">
                                        <tr>
                                            <th className="px-6 py-4 font-bold sm:px-8">
                                                Product
                                            </th>
                                            <th className="px-6 py-4 font-bold">
                                                Description
                                            </th>
                                            <th className="px-6 py-4 font-bold">
                                                Stock
                                            </th>
                                            <th className="px-6 py-4 font-bold">
                                                Price
                                            </th>
                                            <th className="px-6 py-4 font-bold">
                                                Supplier
                                            </th>
                                            <th className="px-6 py-4 font-bold">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#dfe2da]">
                                        {products.map((product) => (
                                            <tr
                                                key={product.id}
                                                className="transition hover:bg-[#f5f1e8]/60"
                                            >
                                                <td className="px-6 py-5 font-semibold sm:px-8">
                                                    {product.product_name}
                                                </td>
                                                <td className="max-w-xs px-6 py-5 text-[#68736c]">
                                                    {product.description || '—'}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className="rounded-full bg-[#d8f36a]/60 px-3 py-1 text-xs font-bold">
                                                        {product.quantity}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 font-semibold">
                                                    {formatPrice(product.price)}
                                                </td>
                                                <td className="px-6 py-5 font-semibold">
                                                    {product.supplier
                                                        ?.company_name || '—'}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                openEdit(
                                                                    product,
                                                                )
                                                            }
                                                            className="font-semibold text-[#18211d] underline-offset-4 hover:underline"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                deleteProduct(
                                                                    product,
                                                                )
                                                            }
                                                            className="font-semibold text-[#c44936] underline-offset-4 hover:underline"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}
                </div>
            </main>

            {editingProduct && (
                <div className="fixed inset-0 z-40 grid place-items-center bg-[#18211d]/60 px-5 py-8">
                    <form
                        onSubmit={submitEdit}
                        className="w-full max-w-lg rounded-3xl bg-[#f5f1e8] p-6 shadow-2xl sm:p-8"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-bold tracking-[0.2em] text-[#c44936] uppercase">
                                    Catalog update
                                </p>
                                <h2 className="mt-2 text-2xl font-semibold">
                                    Edit product
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={closeEdit}
                                className="text-2xl leading-none text-[#68736c] hover:text-[#18211d]"
                                aria-label="Close edit form"
                            >
                                ×
                            </button>
                        </div>

                        <div className="mt-6 grid gap-4">
                            <label className="grid gap-2 text-sm font-semibold">
                                Product name
                                <input
                                    value={form.product_name}
                                    onChange={(event) =>
                                        updateForm(
                                            'product_name',
                                            event.target.value,
                                        )
                                    }
                                    required
                                    className={inputClassName}
                                />
                            </label>
                            <label className="grid gap-2 text-sm font-semibold">
                                Description
                                <textarea
                                    value={form.description}
                                    onChange={(event) =>
                                        updateForm(
                                            'description',
                                            event.target.value,
                                        )
                                    }
                                    rows={3}
                                    className="w-full resize-none rounded-xl border border-[#dfe2da] bg-white px-4 py-3 text-sm outline-none focus:border-[#18211d] focus:ring-4 focus:ring-[#d8f36a]/50"
                                />
                            </label>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="grid gap-2 text-sm font-semibold">
                                    Stock quantity
                                    <input
                                        type="number"
                                        min="1"
                                        value={form.quantity}
                                        onChange={(event) =>
                                            updateForm(
                                                'quantity',
                                                event.target.value,
                                            )
                                        }
                                        required
                                        className={inputClassName}
                                    />
                                </label>
                                <label className="grid gap-2 text-sm font-semibold">
                                    Unit price
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={form.price}
                                        onChange={(event) =>
                                            updateForm(
                                                'price',
                                                event.target.value,
                                            )
                                        }
                                        required
                                        className={inputClassName}
                                    />
                                </label>
                            </div>
                        </div>

                        {error && (
                            <p className="mt-4 rounded-xl bg-[#c44936]/10 px-4 py-3 text-sm text-[#a13a2a]">
                                {error}
                            </p>
                        )}

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeEdit}
                                className="rounded-xl border border-[#cbd1c8] px-4 py-3 text-sm font-semibold"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-xl bg-[#18211d] px-5 py-3 text-sm font-semibold text-[#f5f1e8] disabled:cursor-wait disabled:opacity-60"
                            >
                                {processing ? 'Saving...' : 'Save changes'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
