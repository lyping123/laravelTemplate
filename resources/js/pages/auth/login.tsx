import { Form, Head, Link } from '@inertiajs/react';
import AuthLayout from '@/components/AuthLayout';
import { login, register } from '@/routes';

export default function Login() {
    return (
        <>
            <Head title="Log in" />
            <AuthLayout
                eyebrow="Login to your account"
                title="Pick up where you left off."
                description="Sign in to return to your space and keep your momentum going."
                footer={
                    <>
                        New here?{' '}
                        <Link
                            href={register.url()}
                            className="font-semibold text-[#18211d] underline decoration-[#d25c43] decoration-2 underline-offset-4"
                        >
                            Create an account
                        </Link>
                    </>
                }
            >
                <Form action={login.url()} method="post" className="grid gap-5">
                    {({ errors, processing }) => (
                        <>
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
                            <label
                                className="grid gap-2 text-sm font-semibold"
                                htmlFor="password"
                            >
                                Password
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="h-13 rounded-xl border border-[#cbd1c8] bg-white px-4 font-normal transition outline-none focus:border-[#18211d] focus:ring-4 focus:ring-[#d8f36a]/50"
                                />
                                {errors.password && (
                                    <span className="text-xs font-normal text-[#c44936]">
                                        {errors.password}
                                    </span>
                                )}
                            </label>
                            <label className="flex items-center gap-3 text-sm text-[#68736c]">
                                <input
                                    name="remember"
                                    type="checkbox"
                                    value="1"
                                    className="h-4 w-4 rounded border-[#cbd1c8] accent-[#18211d]"
                                />
                                Keep me signed in
                            </label>
                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-2 h-13 rounded-xl bg-[#18211d] px-5 font-semibold text-[#f5f1e8] transition hover:bg-[#2d3b33] disabled:cursor-wait disabled:opacity-60"
                            >
                                {processing ? 'Signing you in...' : 'Log in'}
                            </button>
                        </>
                    )}
                </Form>
            </AuthLayout>
        </>
    );
}
