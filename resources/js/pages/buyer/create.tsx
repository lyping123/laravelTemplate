import { Form, Head, Link } from '@inertiajs/react';
import buyerController from '@/actions/App/Http/Controllers/buyerController';
import { dashboard } from '@/routes';

type BuyerField = {
    label: string;
    name:
        | 'buyer_name'
        | 'ic'
        | 'contact_number'
        | 'line_address'
        | 'state'
        | 'zipcode'
        | 'country';
    placeholder: string;
    type?: string;
};

const fields: BuyerField[] = [
    {
        label: 'Buyer name',
        name: 'buyer_name',
        placeholder: 'Enter the buyer name',
    },
    {
        label: 'IC / identification number',
        name: 'ic',
        placeholder: 'Enter the identification number',
    },
    {
        label: 'Contact number',
        name: 'contact_number',
        placeholder: 'Enter the contact number',
        type: 'tel',
    },
    {
        label: 'Address',
        name: 'line_address',
        placeholder: 'Enter the street address',
    },
    {
        label: 'State',
        name: 'state',
        placeholder: 'Enter the state',
    },
    {
        label: 'Postcode',
        name: 'zipcode',
        placeholder: 'Enter the postcode',
    },
    {
        label: 'Country',
        name: 'country',
        placeholder: 'Enter the country',
    },
];

const inputClassName =
    'h-12 w-full rounded-xl border border-[#dfe2da] bg-white px-4 text-sm text-[#18211d] outline-none transition placeholder:text-[#9aa49b] focus:border-[#18211d] focus:ring-4 focus:ring-[#d8f36a]/50';

export default function CreateBuyer() {
    return (
        <>
            <Head title="Add buyer" />
            <main className="min-h-screen bg-[#f5f1e8] px-5 py-8 text-[#18211d] sm:px-8 lg:px-12 lg:py-12">
                <div className="mx-auto max-w-5xl">
                    <Link
                        href={dashboard.url()}
                        className="text-sm font-semibold text-[#68736c] transition hover:text-[#18211d]"
                    >
                        ← Back to dashboard
                    </Link>

                    <header className="mt-8">
                        <p className="text-xs font-bold tracking-[0.2em] text-[#c44936] uppercase">
                            Sales workspace
                        </p>
                        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                            Add a buyer
                        </h1>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-[#68736c]">
                            Save buyer details once so they are ready when you
                            create a cart list.
                        </p>
                    </header>

                    <section className="mt-8 rounded-3xl border border-[#dfe2da] bg-white/80 p-6 sm:p-9">
                        <Form
                            {...buyerController.store.form()}
                            className="grid gap-8"
                        >
                            {({ errors, processing }) => (
                                <>
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        {fields.map((field) => (
                                            <label
                                                key={field.name}
                                                className={`grid gap-2 text-sm font-semibold ${field.name === 'line_address' ? 'sm:col-span-2' : ''}`}
                                                htmlFor={field.name}
                                            >
                                                {field.label}
                                                <input
                                                    id={field.name}
                                                    name={field.name}
                                                    type={field.type ?? 'text'}
                                                    placeholder={field.placeholder}
                                                    required
                                                    className={inputClassName}
                                                />
                                                {errors[field.name] && (
                                                    <span className="text-xs font-normal text-[#c44936]">
                                                        {errors[field.name]}
                                                    </span>
                                                )}
                                            </label>
                                        ))}
                                    </div>

                                    <div className="flex flex-col-reverse gap-3 border-t border-[#dfe2da] pt-6 sm:flex-row sm:justify-end">
                                        <Link
                                            href={buyerController.index.url()}
                                            className="inline-flex items-center justify-center rounded-xl border border-[#cbd1c8] px-5 py-3 text-sm font-semibold transition hover:border-[#18211d] hover:bg-[#f5f1e8]"
                                        >
                                            Cancel
                                        </Link>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="rounded-xl bg-[#18211d] px-5 py-3 text-sm font-bold text-[#f5f1e8] transition hover:bg-[#2c3932] disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {processing
                                                ? 'Saving buyer...'
                                                : 'Save buyer'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </section>
                </div>
            </main>
        </>
    );
}
