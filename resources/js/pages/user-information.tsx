import { Form, Head, Link } from '@inertiajs/react';
import { useState, type ChangeEvent } from 'react';
import axios from 'axios';
import { dashboard } from '@/routes';
import userInformation from '@/routes/user-information';
import StateSelectbox from '@/components/StateSelectbox';


type UserInformation = {
    name: string;
    ic: string;
    tin_number: string | null;
    phone_number: string;
};

type Address = {
    address: string;
    city: string;
    states: string[];
    selectedState: string;
    zip_code: string;
};

type StateSelectboxProps = {
    states: string[];
    selectedState: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};


type UserInformationPageProps = {
    userInformation: UserInformation | null;
    address: Address | null;

};



const inputClassName =
    'h-12 w-full rounded-xl border border-[#cbd1c8] bg-white px-4 text-sm text-[#18211d] outline-none transition placeholder:text-[#9aa49b] focus:border-[#18211d] focus:ring-4 focus:ring-[#d8f36a]/50';

function Field({
    label,
    name,
    type = 'text',
    defaultValue = '',
    error,
    required = false,
}: {
    label: string;
    name: string;
    type?: string;
    defaultValue?: string;
    error?: string;
    required?: boolean;
}) {
    return (
        <label className="grid gap-2 text-sm font-semibold" htmlFor={name}>
            {label}
            <input
                id={name}
                name={name}
                type={type}
                defaultValue={defaultValue}
                required={required}
                className={inputClassName}
            />
            {error && (
                <span className="text-xs font-normal text-[#c44936]">
                    {error}
                </span>
            )}
        </label>
    );
}

export default function UserInformation({
    userInformation: profile,
    address,
}: UserInformationPageProps) {
    const [selectedState, setSelectedState] = useState(
        address?.selectedState ?? '',
    );

    const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedState(event.target.value);
    };

    const findTinNumber = () => {
        axios.get('http://localhost:8000/api/v1/tin-number', {
            params: {
                ic: profile?.ic,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    throw new Error('Failed to fetch TIN number');
                }

            })
            .then((data) => {
                const tinNumber = data.tin || data.error;
                // Update the TIN number field in the form
                const tinNumberInput = document.querySelector<HTMLInputElement>(
                    'input[name="tin_number"]',
                );

                if (tinNumberInput) {
                    tinNumberInput.value = tinNumber;
                }
            })
            .catch((error) => {
                console.error('Error fetching TIN number:', error);
            });
    }

    return (
        <>
            <Head title="User information" />
            <main className="min-h-screen bg-[#f5f1e8] px-5 py-8 text-[#18211d] sm:px-8 lg:px-12 lg:py-12">
                <div className="mx-auto max-w-5xl">
                    <Link
                        href={dashboard.url()}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#68736c] transition hover:text-[#18211d]"
                    >
                        <span aria-hidden="true">←</span>
                        Back to dashboard
                    </Link>

                    <div className="mt-8 grid gap-6 lg:grid-cols-[0.75fr_1.5fr]">
                        <section className="rounded-3xl bg-[#18211d] p-7 text-[#f5f1e8] sm:p-9">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d8f36a] text-[#18211d]">
                                <span className="text-xl font-black">◎</span>
                            </div>
                            <p className="mt-10 text-xs font-bold tracking-[0.2em] text-[#d8f36a] uppercase">
                                Profile details
                            </p>
                            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                                Keep your information up to date.
                            </h1>
                            <p className="mt-4 text-sm leading-6 text-[#b7c0b8]">
                                Add your personal and contact details once so
                                your account is ready whenever you need it.
                            </p>
                            <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-5 text-sm text-[#b7c0b8]">
                                <span className="text-[#d8f36a]">●</span>
                                Your details are stored securely.
                            </div>
                        </section>

                        <section className="rounded-3xl border border-[#dfe2da] bg-white/80 p-6 sm:p-9">
                            <Form
                                action={userInformation.store.url()}
                                method="post"
                                className="grid gap-8"
                            >
                                {({ errors, processing, wasSuccessful }) => (
                                    <>
                                        <div>
                                            <p className="text-xs font-bold tracking-[0.2em] text-[#d25c43] uppercase">
                                                Personal information
                                            </p>
                                            <h2 className="mt-2 text-xl font-semibold">
                                                Tell us about yourself
                                            </h2>
                                        </div>

                                        <div className="grid gap-5 sm:grid-cols-2">
                                            <Field
                                                label="Full name"
                                                name="name"
                                                defaultValue={
                                                    profile?.name ?? ''
                                                }
                                                error={errors.name}
                                                required
                                            />
                                            <Field
                                                label="IC / identification number"
                                                name="ic"
                                                defaultValue={profile?.ic ?? ''}
                                                error={errors.ic}
                                                required
                                            />
                                            <Field
                                                label="TIN number"
                                                name="tin_number"
                                                defaultValue={
                                                    profile?.tin_number ?? ''
                                                }

                                                error={errors.tin_number}
                                            />
                                            <button type="button" onClick={findTinNumber} className="rounded-xl border border-[#cbd1c8] bg-white px-4 py-3 text-sm font-semibold text-[#18211d] transition hover:border-[#9aa49b] hover:bg-[#f5f1e8] sm:ml-auto">
                                                Get TIN
                                            </button>
                                            <Field
                                                label="Phone number"
                                                name="phone_number"
                                                type="tel"
                                                defaultValue={
                                                    profile?.phone_number ?? ''
                                                }
                                                error={errors.phone_number}
                                                required
                                            />
                                        </div>

                                        <div className="grid gap-5 border-t border-[#dfe2da] pt-7">
                                            <div>
                                                <p className="text-xs font-bold tracking-[0.2em] text-[#d25c43] uppercase">
                                                    Address
                                                </p>
                                                <p className="mt-1 text-sm text-[#829087]">
                                                    Optional, but useful for
                                                    billing and contact details.
                                                </p>
                                            </div>
                                            <Field
                                                label="Street address"
                                                name="address"
                                                defaultValue={
                                                    address?.address ?? ''
                                                }
                                                error={errors.address}
                                            />
                                            <div className="grid gap-5 sm:grid-cols-3">
                                                <Field
                                                    label="City"
                                                    name="city"
                                                    defaultValue={
                                                        address?.city ?? ''
                                                    }
                                                    error={errors.city}
                                                />
                                                <StateSelectbox
                                                    states={address?.states ?? []}
                                                    selectedState={selectedState}
                                                    onChange={handleStateChange}
                                                />
                                                <Field
                                                    label="ZIP code"
                                                    name="zip_code"
                                                    defaultValue={
                                                        address?.zip_code ?? ''
                                                    }
                                                    error={errors.zip_code}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4 border-t border-[#dfe2da] pt-7 sm:flex-row sm:items-center sm:justify-between">
                                            {wasSuccessful && (
                                                <p className="flex items-center gap-2 text-sm font-semibold text-[#4e8b56]">
                                                    <span aria-hidden="true">
                                                        ✓
                                                    </span>
                                                    Information saved.
                                                </p>
                                            )}
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="rounded-xl bg-[#18211d] px-5 py-3 text-sm font-semibold text-[#f5f1e8] transition hover:bg-[#2d3b33] disabled:cursor-wait disabled:opacity-60 sm:ml-auto"
                                            >
                                                {processing
                                                    ? 'Saving...'
                                                    : 'Save information'}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}
