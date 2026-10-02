import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

type AuthLayoutProps = {
    eyebrow: string;
    title: string;
    description: string;
    children: ReactNode;
    footer: ReactNode;
};

export default function AuthLayout({
    eyebrow,
    title,
    description,
    children,
    footer,
}: AuthLayoutProps) {
    return (
        <main className="min-h-screen bg-[#f5f1e8] text-[#18211d] selection:bg-[#d8f36a] selection:text-[#18211d]">
            <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[0.9fr_1.1fr]">
                <section className="relative hidden overflow-hidden bg-[#18211d] p-12 text-[#f5f1e8] lg:flex lg:flex-col lg:justify-between xl:p-16">
                    <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full border-[36px] border-[#d8f36a]/80" />
                    <div className="absolute right-20 bottom-24 h-28 w-28 rounded-full bg-[#f26b4f]" />
                    <Link
                        href="/"
                        className="relative flex items-center gap-3 text-sm font-semibold tracking-[0.18em] uppercase"
                    >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8f36a] text-lg font-black text-[#18211d]">
                            A
                        </span>
                        Arc / account
                    </Link>
                    <div className="relative max-w-md">
                        <p className="mb-5 text-xs font-semibold tracking-[0.24em] text-[#d8f36a] uppercase">
                            A quieter way in
                        </p>
                        <h2 className="text-5xl leading-[0.95] font-semibold tracking-[-0.04em] xl:text-7xl">
                            Make room for what matters.
                        </h2>
                        <p className="mt-7 max-w-sm text-base leading-7 text-[#d7ddd4]">
                            Your account keeps the work, ideas, and small
                            rituals you care about close at hand.
                        </p>
                    </div>
                    <p className="relative text-xs tracking-[0.16em] text-[#9ca89e] uppercase">
                        Simple by design · 2026
                    </p>
                </section>

                <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
                    <div className="w-full max-w-md">
                        <div className="mb-10 lg:hidden">
                            <Link
                                href="/"
                                className="flex items-center gap-3 text-sm font-semibold tracking-[0.18em] uppercase"
                            >
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18211d] text-lg font-black text-[#d8f36a]">
                                    A
                                </span>
                                Arc / account
                            </Link>
                        </div>
                        <p className="mb-4 text-xs font-bold tracking-[0.22em] text-[#d25c43] uppercase">
                            {eyebrow}
                        </p>
                        <h1 className="text-4xl leading-tight font-semibold tracking-[-0.04em] sm:text-5xl">
                            {title}
                        </h1>
                        <p className="mt-4 max-w-sm text-base leading-7 text-[#68736c]">
                            {description}
                        </p>
                        <div className="mt-9">{children}</div>
                        <div className="mt-8 text-center text-sm text-[#68736c]">
                            {footer}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
