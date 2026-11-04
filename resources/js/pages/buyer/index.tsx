import { Head } from '@inertiajs/react';
import { useState, type ChangeEvent } from 'react';
import buyerRoute from '@/routes/buyer';


type BuyerDraft = {
    buyer_name: string;
    ic: string;
    contact_number: string;
    line_address: string;
    state: string;
    zipcode: string;
    country: string;
};

const initialBuyer: BuyerDraft = {
    buyer_name: '',
    ic: '',
    contact_number: '',
    line_address: '',
    state: '',
    zipcode: '',
    country: '',
};

export default function index() {
    const [buyer, setBuyer] = useState<BuyerDraft>(initialBuyer);

    const handleChange =
        (field: keyof BuyerDraft) =>
            (event: ChangeEvent<HTMLInputElement>): void => {
                setBuyer((currentBuyer) => ({
                    ...currentBuyer,
                    [field]: event.target.value,
                }));
            };

    return (
        <>
            <Head title="Suppliers & Products" />
            <h2 className="ml-10 mt-2 text-2xl font-semibold">
                Buyer Register form
            </h2>
            <form
                action={buyerRoute.store.url()}
                method='POST'
                className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.4fr]"
            >
                <div className="ml-10 mt-6 grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                            Buyer Name
                            <input
                                name="buyer_name"
                                value={buyer.buyer_name}
                                onChange={handleChange('buyer_name')}
                                placeholder=""

                                className="h-12 w-full rounded-xl border border-[#dfe2da] bg-white px-4 text-sm text-[#18211d] outline-none transition placeholder:text-[#9aa49b] focus:border-[#18211d] focus:ring-4 focus:ring-[#d8f36a]/50"
                            />

                        </label>
                        <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                            Ic
                            <input
                                name="ic"
                                value={buyer.ic}
                                onChange={handleChange('ic')}
                                placeholder=""
                                required
                                className="h-12 w-full rounded-xl border border-[#dfe2da] bg-white px-4 text-sm text-[#18211d] outline-none transition placeholder:text-[#9aa49b] focus:border-[#18211d] focus:ring-4 focus:ring-[#d8f36a]/50"
                            />

                        </label>
                        <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                            Conatct Number
                            <input
                                name="contact_number"
                                value={buyer.contact_number}
                                onChange={handleChange('contact_number')}
                                placeholder=""
                                required
                                className="h-12 w-full rounded-xl border border-[#dfe2da] bg-white px-4 text-sm text-[#18211d] outline-none transition placeholder:text-[#9aa49b] focus:border-[#18211d] focus:ring-4 focus:ring-[#d8f36a]/50"
                            />

                        </label>
                        <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                            line Address
                            <input
                                name="line_address"
                                value={buyer.line_address}
                                onChange={handleChange('line_address')}
                                placeholder=""
                                required
                                className="h-12 w-full rounded-xl border border-[#dfe2da] bg-white px-4 text-sm text-[#18211d] outline-none transition placeholder:text-[#9aa49b] focus:border-[#18211d] focus:ring-4 focus:ring-[#d8f36a]/50"
                            />

                        </label>
                        <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                            State
                            <input
                                name="state"
                                value={buyer.state}
                                onChange={handleChange('state')}
                                placeholder=""
                                required
                                className="h-12 w-full rounded-xl border border-[#dfe2da] bg-white px-4 text-sm text-[#18211d] outline-none transition placeholder:text-[#9aa49b] focus:border-[#18211d] focus:ring-4 focus:ring-[#d8f36a]/50"
                            />

                        </label>
                        <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                            Zipcode
                            <input
                                name="zipcode"
                                value={buyer.zipcode}
                                onChange={handleChange('zipcode')}
                                placeholder=""
                                required
                                className="h-12 w-full rounded-xl border border-[#dfe2da] bg-white px-4 text-sm text-[#18211d] outline-none transition placeholder:text-[#9aa49b] focus:border-[#18211d] focus:ring-4 focus:ring-[#d8f36a]/50"
                            />

                        </label>
                        <label className="grid gap-2 text-sm font-semibold sm:col-span-2">
                            courtry
                            <input
                                name="country"
                                value={buyer.country}
                                onChange={handleChange('country')}
                                placeholder=""
                                required
                                className="h-12 w-full rounded-xl border border-[#dfe2da] bg-white px-4 text-sm text-[#18211d] outline-none transition placeholder:text-[#9aa49b] focus:border-[#18211d] focus:ring-4 focus:ring-[#d8f36a]/50"
                            />

                        </label>
                        <button
                            type="submit"
                            className="rounded-xl bg-[#18211d] px-5 py-3 text-sm font-semibold text-[#f5f1e8] transition hover:bg-[#2d3b33] disabled:cursor-wait disabled:opacity-60"
                        >
                            Submit
                        </button>

                    </div>
                </div>
            </form>
        </>
    )
}


