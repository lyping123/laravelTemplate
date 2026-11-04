import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import productsRoute from '@/routes/products';

type ProductDraft = {
    product_name: string;
    description: string;
    quantity: string;
    price: string;
};

type SupplierDraft = {
    company_name: string;
    contact_person: string;
    email: string;
    contact_number: string;
};

type Supplier = SupplierDraft & {
    id: number;
    products: ProductDraft[];
};

const emptyProduct = (): ProductDraft => ({
    product_name: '',
    description: '',
    quantity: '',
    price: '',
});

const initialSupplier: SupplierDraft = {
    company_name: '',
    contact_person: '',
    email: '',
    contact_number: '',
};

const inputClassName =
    'h-12 w-full rounded-xl border border-[#dfe2da] bg-white px-4 text-sm text-[#18211d] outline-none transition placeholder:text-[#9aa49b] focus:border-[#18211d] focus:ring-4 focus:ring-[#d8f36a]/50';

function Field({
    label,
    name,
    value,
    onChange,
    type = 'text',
    placeholder,
    required = false,
}: {
    label: string;
    name: keyof SupplierDraft;
    value: string;
    onChange: (name: keyof SupplierDraft, value: string) => void;
    type?: string;
    placeholder: string;
    required?: boolean;
}) {
    return (
        <label className="grid gap-2 text-sm font-semibold" htmlFor={name}>
            {label}
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={(event) => onChange(name, event.target.value)}
                placeholder={placeholder}
                required={required}
                className={inputClassName}
            />
        </label>
    );
}

export default function Index() {
    const [supplier, setSupplier] = useState<SupplierDraft>(initialSupplier);
    const [products, setProducts] = useState<ProductDraft[]>([emptyProduct()]);
    const [savedSuppliers, setSavedSuppliers] = useState<Supplier[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);

    const updateSupplier = (name: keyof SupplierDraft, value: string) => {
        setSupplier((current) => ({ ...current, [name]: value }));
    };

    const updateProduct = (
        index: number,
        name: keyof ProductDraft,
        value: string,
    ) => {
        setProducts((current) =>
            current.map((product, productIndex) =>
                productIndex === index
                    ? { ...product, [name]: value }
                    : product,
            ),
        );
    };

    const addProduct = () => {
        setProducts((current) => [...current, emptyProduct()]);
        setError('');
    };

    const removeProduct = (index: number) => {
        if (products.length === 1) {
            return;
        }

        setProducts((current) =>
            current.filter((_, productIndex) => productIndex !== index),
        );
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const incompleteProduct = products.some(
            (product) =>
                !product.product_name.trim() ||
                !product.price ||
                !product.quantity,
        );

        if (incompleteProduct) {
            setSuccess('');
            setError(
                'Complete the product name, price, and stock quantity before saving.',
            );

            return;
        }

        setError('');
        setSuccess('');
        setProcessing(true);

        router.post(
            //   /products POST
            productsRoute.store.url(),
            { supplier, products },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setSavedSuppliers((current) => [
                        ...current,
                        { ...supplier, id: Date.now(), products },
                    ]);
                    setSupplier(initialSupplier);
                    setProducts([emptyProduct()]);
                    setSuccess('Supplier and products added successfully.');
                },
                onError: (errors) => {
                    const firstError = Object.values(errors)[0];

                    setError(
                        typeof firstError === 'string'
                            ? firstError
                            : 'Unable to save the supplier and products.',
                    );
                },
                onFinish: () => setProcessing(false),
            },
        );
    };

    return (
        <>
            <Head title="Suppliers & Products" />
            <main className="min-h-screen bg-[#f5f1e8] px-5 py-8 text-[#18211d] sm:px-8 lg:px-12 lg:py-12">
                <div className="mx-auto max-w-7xl">
                    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-bold tracking-[0.2em] text-[#c44936] uppercase">
                                Inventory workspace
                            </p>
                            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                                Suppliers & products
                            </h1>
                            <p className="mt-3 max-w-xl text-sm leading-6 text-[#68736c]">
                                Add a supplier once, then attach as many
                                products as you need to keep your catalog
                                organized.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 self-start rounded-2xl bg-[#18211d] px-4 py-3 text-sm text-[#f5f1e8] sm:self-auto">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d8f36a] font-bold text-[#18211d]">
                                {savedSuppliers.length}
                            </span>
                            <span>Suppliers added</span>
                        </div>
                    </header>
                    {/*  /products/list */}
                    <Link
                        href={productsRoute.list.url()}
                        className="mt-6 inline-flex rounded-xl border border-[#cbd1c8] bg-white/70 px-4 py-3 text-sm font-semibold transition hover:border-[#18211d] hover:bg-white"
                    >
                        View product list
                    </Link>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.4fr]"
                    >
                        <section className="h-fit rounded-3xl bg-[#18211d] p-6 text-[#f5f1e8] sm:p-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d8f36a] text-xl font-black text-[#18211d]">
                                +
                            </div>
                            <p className="mt-8 text-xs font-bold tracking-[0.2em] text-[#d8f36a] uppercase">
                                Step 01
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold">
                                Supplier details
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-[#aab5ab]">
                                Start with the business that provides your
                                inventory. You can connect multiple products
                                below.
                            </p>

                            <div className="mt-8 grid gap-5">
                                <label
                                    className="grid gap-2 text-sm font-semibold"
                                    htmlFor="supplier-name"
                                >
                                    Supplier company name
                                    <input
                                        id="supplier-name"
                                        name="company_name"
                                        value={supplier.company_name}
                                        onChange={(event) =>
                                            updateSupplier(
                                                'company_name',
                                                event.target.value,
                                            )
                                        }
                                        placeholder="e.g. Northstar Trading"
                                        required
                                        className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-sm text-white transition outline-none placeholder:text-[#829087] focus:border-[#d8f36a] focus:ring-4 focus:ring-[#d8f36a]/20"
                                    />
                                </label>
                                <Field
                                    label="Contact person"
                                    name="contact_person"
                                    value={supplier.contact_person}
                                    onChange={updateSupplier}
                                    placeholder="e.g. Maria Santos"
                                    required
                                />
                                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                                    <Field
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={supplier.email}
                                        onChange={updateSupplier}
                                        placeholder="name@company.com"
                                    />
                                    <Field
                                        label="Phone"
                                        name="contact_number"
                                        type="tel"
                                        value={supplier.contact_number}
                                        onChange={updateSupplier}
                                        placeholder="+63 900 000 0000"
                                        required
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="rounded-3xl border border-[#dfe2da] bg-white/80 p-6 sm:p-8">
                            <div className="flex flex-col gap-4 border-b border-[#dfe2da] pb-6 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="text-xs font-bold tracking-[0.2em] text-[#c44936] uppercase">
                                        Step 02
                                    </p>
                                    <h2 className="mt-2 text-2xl font-semibold">
                                        Products from this supplier
                                    </h2>
                                </div>
                                <span className="text-sm text-[#68736c]">
                                    {products.length}{' '}
                                    {products.length === 1
                                        ? 'product'
                                        : 'products'}
                                </span>
                            </div>

                            <div className="mt-6 grid gap-4">
                                {products.map((product, index) => (
                                    <div
                                        key={index}
                                        className="rounded-2xl border border-[#dfe2da] bg-[#f5f1e8]/60 p-4"
                                    >
                                        <div className="mb-4 flex items-center justify-between">
                                            <p className="text-sm font-bold">
                                                Product {index + 1}
                                            </p>
                                            {products.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeProduct(index)
                                                    }
                                                    className="text-xs font-semibold text-[#c44936] transition hover:text-[#18211d]"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                                                Product name
                                                <input
                                                    name="product_name"
                                                    value={product.product_name}
                                                    onChange={(event) =>
                                                        updateProduct(
                                                            index,
                                                            'product_name',
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="e.g. Organic Arabica Coffee"
                                                    required
                                                    className={inputClassName}
                                                />
                                            </label>
                                            <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                                                Description
                                                <input
                                                    name="description"
                                                    value={product.description}
                                                    onChange={(event) =>
                                                        updateProduct(
                                                            index,
                                                            'description',
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="e.g. COF-001"
                                                    className={inputClassName}
                                                />
                                            </label>

                                            <label className="grid gap-2 text-sm font-semibold">
                                                Unit price
                                                <input
                                                    type="number"
                                                    min="1"
                                                    step="0.01"
                                                    name="price"
                                                    value={product.price}
                                                    onChange={(event) =>
                                                        updateProduct(
                                                            index,
                                                            'price',
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="0.00"
                                                    required
                                                    className={inputClassName}
                                                />
                                            </label>
                                            <label className="grid gap-2 text-sm font-semibold">
                                                Stock quantity
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="1"
                                                    name="quantity"
                                                    value={product.quantity}
                                                    onChange={(event) =>
                                                        updateProduct(
                                                            index,
                                                            'quantity',
                                                            event.target.value,
                                                        )
                                                    }
                                                    placeholder="0"
                                                    required
                                                    className={inputClassName}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={addProduct}
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#9aa49b] px-4 py-3 text-sm font-semibold text-[#68736c] transition hover:border-[#18211d] hover:bg-[#f5f1e8] hover:text-[#18211d]"
                            >
                                <span className="text-lg">+</span>
                                Add another product
                            </button>

                            {(error || success) && (
                                <p
                                    className={`mt-4 rounded-xl px-4 py-3 text-sm ${error ? 'bg-[#c44936]/10 text-[#a13a2a]' : 'bg-[#4e8b56]/10 text-[#39703f]'}`}
                                >
                                    {error || success}
                                </p>
                            )}

                            <div className="mt-6 flex flex-col gap-4 border-t border-[#dfe2da] pt-6 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-xs leading-5 text-[#829087]">
                                    Required fields are marked by the browser
                                    before saving.
                                </p>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-xl bg-[#18211d] px-5 py-3 text-sm font-semibold text-[#f5f1e8] transition hover:bg-[#2d3b33] disabled:cursor-wait disabled:opacity-60"
                                >
                                    {processing
                                        ? 'Saving...'
                                        : 'Save supplier & products'}
                                </button>
                            </div>
                        </section>
                    </form>

                    {savedSuppliers.length > 0 && (
                        <section className="mt-8 rounded-3xl border border-[#dfe2da] bg-white/70 p-6 sm:p-8">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs font-bold tracking-[0.2em] text-[#c44936] uppercase">
                                        Recently added
                                    </p>
                                    <h2 className="mt-2 text-xl font-semibold">
                                        Supplier catalog
                                    </h2>
                                </div>
                                <span className="text-sm text-[#68736c]">
                                    {savedSuppliers.reduce(
                                        (total, item) =>
                                            total + item.products.length,
                                        0,
                                    )}{' '}
                                    products
                                </span>
                            </div>
                            <div className="mt-6 grid gap-3">
                                {savedSuppliers.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col gap-3 rounded-2xl border border-[#dfe2da] p-4 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div>
                                            <p className="font-semibold">
                                                {item.company_name}
                                            </p>
                                            <p className="mt-1 text-sm text-[#68736c]">
                                                {item.contact_number ||
                                                    'No contact person'}{' '}
                                                · {item.email || 'No email'}
                                            </p>
                                        </div>
                                        <span className="w-fit rounded-full bg-[#d8f36a] px-3 py-1 text-xs font-bold text-[#18211d]">
                                            {item.products.length}{' '}
                                            {item.products.length === 1
                                                ? 'product'
                                                : 'products'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </main>
        </>
    );
}
