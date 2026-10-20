import React from 'react';

type StateSelectboxProps = {
    states: string[];
    selectedState: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function StateSelectbox({
    states,
    selectedState,
    onChange,
}: StateSelectboxProps) {
    return (
        <label className="grid gap-2 text-sm font-semibold" htmlFor="state">
            <span>State</span>
            <span className="relative">
                <select
                    className="h-12 w-full appearance-none rounded-xl border border-[#cbd1c8] bg-white px-4 pr-11 text-sm font-normal text-[#18211d] transition outline-none hover:border-[#9aa49b] focus:border-[#18211d] focus:ring-4 focus:ring-[#d8f36a]/50"
                    name="state"
                    id="state"
                    value={selectedState}
                    onChange={onChange}
                    aria-label="Select a state"
                >
                    <option value="">Select a state</option>
                    {states.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
                <span
                    className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#68736c]"
                    aria-hidden="true"
                >
                    <svg
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
            </span>
        </label>
    );
}
