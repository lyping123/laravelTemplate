import { Form, Head, Link } from '@inertiajs/react';
import AuthLayout from '@/components/AuthLayout';
import { logout } from '@/routes';
import verification from '@/routes/verification';

type VerifyEmailProps = {
    status?: string;
};

export default function VerifyEmail({ status }: VerifyEmailProps) {
    return (
        <>
            <Head title="Verify your email" />
            <AuthLayout
                eyebrow="One last step"
                title="Check your inbox."
                description="We sent a verification link to your email address. Click it to activate your account and continue."
                footer={
                    <Form action={logout.url()} method="post">
                        <button
                            type="submit"
                            className="font-semibold text-[#18211d] underline decoration-[#d25c43] decoration-2 underline-offset-4"
                        >
                            Use a different account
                        </button>
                    </Form>
                }
            >
                <div className="grid gap-5">
                    <div className="flex items-center gap-4 rounded-2xl border border-[#cbd1c8] bg-white p-5">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d8f36a] text-xl">
                            @
                        </span>
                        <p className="text-sm leading-6 text-[#68736c]">
                            The link is only valid for a little while. If you do
                            not see it, check your spam folder.
                        </p>
                    </div>
                    {status === 'verification-link-sent' && (
                        <p className="rounded-xl bg-[#e6f4cf] px-4 py-3 text-sm font-semibold text-[#315021]">
                            A fresh verification link is on its way.
                        </p>
                    )}
                    <Form action={verification.send.url()} method="post">
                        {({ processing }) => (
                            <button
                                type="submit"
                                disabled={processing}
                                className="h-13 w-full rounded-xl bg-[#18211d] px-5 font-semibold text-[#f5f1e8] transition hover:bg-[#2d3b33] disabled:cursor-wait disabled:opacity-60"
                            >
                                {processing
                                    ? 'Sending...'
                                    : 'Resend verification email'}
                            </button>
                        )}
                    </Form>
                    <Link
                        href="/"
                        className="text-center text-sm font-semibold text-[#68736c] hover:text-[#18211d]"
                    >
                        Return home
                    </Link>
                </div>
            </AuthLayout>
        </>
    );
}
