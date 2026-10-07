import { Form, Head, Link } from '@inertiajs/react';
import AuthLayout from '@/components/AuthLayout';
import { login, register } from '@/routes';

export default function Register() {
    return (
        <>
            <Head title="Create account" />
            <AuthLayout
                eyebrow="Register for a new account"
                title="Your next chapter starts here."
                description="Create an account in a moment. We will send one quick email to confirm it is really you."
                footer={
                    <>
                        Already have an account?{' '}
                        <Link
                            href={login.url()}
                            className="font-semibold text-[#18211d] underline decoration-[#d25c43] decoration-2 underline-offset-4"
                        >
                            Log in
                        </Link>
                    </>
                }
            >
                <Form
                    action={register.url()}
                    method="post"
                    className="grid gap-5"
                >
                    {({ errors, processing }) => (
                        <>
                            <label
                                className="grid gap-2 text-sm font-semibold"
                                htmlFor="name"
                            >
                                Your name
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="h-13 rounded-xl border border-[#cbd1c8] bg-white px-4 font-normal transition outline-none focus:border-[#18211d] focus:ring-4 focus:ring-[#d8f36a]/50"
                                />
                                {errors.name && (
                                    <span className="text-xs font-normal text-[#c44936]">
                                        {errors.name}
                                    </span>
                                )}
                            </label>
                            <label
                                className="grid gap-2 text-sm font-semibold"
                                htmlFor="email"
                            >
                                Email address
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="h-13 rounded-xl border border-[#cbd1c8] bg-white px-4 font-normal transition outline-none focus:border-[#18211d] focus:ring-4 focus:ring-[#d8f36a]/50"
                                />
                                {errors.email && (
                                    <span className="text-xs font-normal text-[#c44936]">
                                        {errors.email}
                                    </span>
                                )}
                            </label>
                            <div className="grid gap-5 sm:grid-cols-2">
                                <label
                                    className="grid gap-2 text-sm font-semibold"
                                    htmlFor="password"
                                >
                                    Password
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="h-13 rounded-xl border border-[#cbd1c8] bg-white px-4 font-normal transition outline-none focus:border-[#18211d] focus:ring-4 focus:ring-[#d8f36a]/50"
                                    />
                                    {errors.password && (
                                        <span className="text-xs font-normal text-[#c44936]">
                                            {errors.password}
                                        </span>
                                    )}
                                </label>
                                <label
                                    className="grid gap-2 text-sm font-semibold"
                                    htmlFor="password_confirmation"
                                >
                                    Confirm password
                                    <input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="h-13 rounded-xl border border-[#cbd1c8] bg-white px-4 font-normal transition outline-none focus:border-[#18211d] focus:ring-4 focus:ring-[#d8f36a]/50"
                                    />
                                </label>
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-2 h-13 rounded-xl bg-[#18211d] px-5 font-semibold text-[#f5f1e8] transition hover:bg-[#2d3b33] disabled:cursor-wait disabled:opacity-60"
                            >
                                {processing
                                    ? 'Creating your account...'
                                    : 'Create account'}
                            </button>
                        </>
                    )}
                </Form>
            </AuthLayout>
        </>
    );
}
