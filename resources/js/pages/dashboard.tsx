import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { logout } from '@/routes';
import userInformation from '@/routes/user-information';
import type { Auth } from '@/types/auth';

type SharedProps = {
    auth: Auth;
};

type IconProps = {
    className?: string;
};

function Icon({
    name,
    className = 'h-5 w-5',
}: IconProps & {
    name:
        | 'grid'
        | 'trend'
        | 'folder'
        | 'calendar'
        | 'settings'
        | 'search'
        | 'bell'
        | 'arrow'
        | 'plus'
        | 'more'
        | 'check';
}) {
    const paths = {
        grid: (
            <>
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
            </>
        ),
        trend: <path d="m3 17 6-6 4 4 8-9M16 6h5v5" />,
        folder: (
            <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z" />
        ),
        calendar: (
            <>
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M16 3v4M8 3v4M3 10h18" />
            </>
        ),
        settings: (
            <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8.2-3.5a8.4 8.4 0 0 0-.1-1l2-1.5-2-3.4-2.3.9a8 8 0 0 0-1.8-1L15.7 3h-4l-.4 2.5a8 8 0 0 0-1.8 1l-2.3-.9-2 3.4 2 1.5a8.4 8.4 0 0 0-.1 1 8.4 8.4 0 0 0 .1 1l-2 1.5 2 3.4 2.3-.9a8 8 0 0 0 1.8 1l.4 2.5h4l.4-2.5a8 8 0 0 0 1.8-1l2.3.9 2-3.4-2-1.5c.1-.3.1-.7.1-1Z" />
        ),
        search: (
            <path d="m20 20-4.5-4.5m2-5.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
        ),
        bell: (
            <>
                <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" />
            </>
        ),
        arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
        plus: <path d="M12 5v14M5 12h14" />,
        more: <path d="M6 12h.01M12 12h.01M18 12h.01" />,
        check: <path d="m5 12 4 4L19 6" />,
    };

    return (
        <svg
            aria-hidden="true"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
        >
            {paths[name]}
        </svg>
    );
}

const navigation = [
    { label: 'Overview', icon: 'grid' as const, active: true },
    { label: 'Analytics', icon: 'trend' as const },
    { label: 'Projects', icon: 'folder' as const, count: '4' },
    { label: 'Schedule', icon: 'calendar' as const },
];

const activities = [
    {
        initials: 'MK',
        name: 'Maya Kim',
        action: 'shared a new comment',
        time: '12 min ago',
        color: 'bg-[#f3c6a5]',
    },
    {
        initials: 'JP',
        name: 'Jon Park',
        action: 'completed a task in Bloom',
        time: '48 min ago',
        color: 'bg-[#c8d8f3]',
    },
    {
        initials: 'SL',
        name: 'Sofia Lee',
        action: 'joined the workspace',
        time: '2 hrs ago',
        color: 'bg-[#d8f36a]',
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedProps>().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const firstName = auth.user.name.split(' ')[0];

    return (
        <>
            <Head title="Dashboard" />
            <div className="min-h-screen bg-[#f5f1e8] text-[#18211d] selection:bg-[#d8f36a] selection:text-[#18211d]">
                <div className="flex min-h-screen">
                    <aside
                        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 flex w-72 shrink-0 flex-col bg-[#18211d] p-6 text-[#f5f1e8] transition-transform lg:static lg:translate-x-0`}
                    >
                        <div className="flex items-center justify-between">
                            <Link
                                href="/"
                                className="flex items-center gap-3 text-sm font-semibold tracking-[0.18em] uppercase"
                            >
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8f36a] text-lg font-black text-[#18211d]">
                                    A
                                </span>
                                Arc
                            </Link>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="rounded-lg p-2 text-[#aab5ab] hover:bg-white/10 lg:hidden"
                                aria-label="Close navigation"
                            >
                                ×
                            </button>
                        </div>

                        <div className="mt-14">
                            <p className="mb-4 px-3 text-[10px] font-bold tracking-[0.2em] text-[#829087] uppercase">
                                Workspace
                            </p>
                            <nav className="grid gap-1">
                                {navigation.map((item) => (
                                    <a
                                        key={item.label}
                                        href="#"
                                        className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm transition ${item.active ? 'bg-[#d8f36a] font-semibold text-[#18211d]' : 'text-[#b7c0b8] hover:bg-white/10 hover:text-white'}`}
                                    >
                                        <span className="flex items-center gap-3">
                                            <Icon
                                                name={item.icon}
                                                className="h-[18px] w-[18px]"
                                            />
                                            {item.label}
                                        </span>
                                        {item.count && (
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-[10px] ${item.active ? 'bg-[#18211d]/10' : 'bg-white/10'}`}
                                            >
                                                {item.count}
                                            </span>
                                        )}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        <div className="mt-auto grid gap-1">
                            <Link
                                href={userInformation.create.url()}
                                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#b7c0b8] transition hover:bg-white/10 hover:text-white"
                            >
                                <Icon
                                    name="settings"
                                    className="h-[18px] w-[18px]"
                                />
                                Settings
                            </Link>
                            <Link
                                href={logout.url()}
                                method="post"
                                as="button"
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-[#b7c0b8] transition hover:bg-white/10 hover:text-white"
                            >
                                <span className="flex h-[18px] w-[18px] items-center justify-center text-xs">
                                    ↗
                                </span>
                                Sign out
                            </Link>
                            <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d8f36a] text-xs font-bold text-[#18211d]">
                                    {auth.user.name.slice(0, 2).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold">
                                        {auth.user.name}
                                    </p>
                                    <p className="truncate text-xs text-[#829087]">
                                        {auth.user.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {sidebarOpen && (
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 z-20 bg-[#18211d]/40 lg:hidden"
                            aria-label="Close navigation overlay"
                        />
                    )}

                    <main className="min-w-0 flex-1">
                        <header className="flex h-20 items-center justify-between border-b border-[#dfe2da] px-5 sm:px-8 lg:px-12">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="rounded-lg p-2 hover:bg-white/70 lg:hidden"
                                    aria-label="Open navigation"
                                >
                                    ☰
                                </button>
                                <div className="relative hidden sm:block">
                                    <Icon
                                        name="search"
                                        className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#829087]"
                                    />
                                    <input
                                        aria-label="Search"
                                        placeholder="Search anything..."
                                        className="h-10 w-64 rounded-xl border border-[#dfe2da] bg-white/60 pl-10 text-sm outline-none placeholder:text-[#9aa49b] focus:border-[#18211d] lg:w-80"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    className="relative rounded-xl p-2 text-[#68736c] transition hover:bg-white/70"
                                    aria-label="Notifications"
                                >
                                    <Icon name="bell" className="h-5 w-5" />
                                    <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#f26b4f]" />
                                </button>
                                <span className="hidden h-6 w-px bg-[#dfe2da] sm:block" />
                                <p className="hidden text-sm text-[#68736c] sm:block">
                                    Thursday, Oct 8
                                </p>
                            </div>
                        </header>

                        <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
                            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                                <div>
                                    <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#d25c43] uppercase">
                                        Your overview
                                    </p>
                                    <h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                                        Good morning, {firstName}.
                                    </h1>
                                    <p className="mt-3 text-base text-[#68736c]">
                                        Here’s what’s happening across your
                                        workspace.
                                    </p>
                                </div>
                                <button className="flex w-fit items-center gap-2 rounded-xl bg-[#18211d] px-4 py-3 text-sm font-semibold text-[#f5f1e8] transition hover:bg-[#2d3b33]">
                                    <Icon name="plus" className="h-4 w-4" />
                                    New project
                                </button>
                            </div>

                            <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                {[
                                    {
                                        label: 'Total views',
                                        value: '24,892',
                                        change: '+12.8%',
                                        accent: 'bg-[#d8f36a]',
                                        icon: 'trend' as const,
                                    },
                                    {
                                        label: 'Active projects',
                                        value: '08',
                                        change: '+2 this month',
                                        accent: 'bg-[#f3c6a5]',
                                        icon: 'folder' as const,
                                    },
                                    {
                                        label: 'Tasks completed',
                                        value: '126',
                                        change: '+18.4%',
                                        accent: 'bg-[#c8d8f3]',
                                        icon: 'check' as const,
                                    },
                                    {
                                        label: 'Hours tracked',
                                        value: '184.5',
                                        change: 'On track',
                                        accent: 'bg-[#e4d6f3]',
                                        icon: 'calendar' as const,
                                    },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="rounded-2xl border border-[#dfe2da] bg-white/70 p-5"
                                    >
                                        <div className="flex items-start justify-between">
                                            <p className="text-sm text-[#68736c]">
                                                {stat.label}
                                            </p>
                                            <span
                                                className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.accent} text-[#18211d]`}
                                            >
                                                <Icon
                                                    name={stat.icon}
                                                    className="h-4 w-4"
                                                />
                                            </span>
                                        </div>
                                        <p className="mt-7 text-3xl font-semibold tracking-[-0.04em]">
                                            {stat.value}
                                        </p>
                                        <p className="mt-2 text-xs font-semibold text-[#4e8b56]">
                                            {stat.change}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 grid gap-4 xl:grid-cols-[1.45fr_1fr]">
                                <section className="rounded-2xl border border-[#dfe2da] bg-white/70 p-5 sm:p-7">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-lg font-semibold">
                                                Workspace activity
                                            </h2>
                                            <p className="mt-1 text-sm text-[#829087]">
                                                Views and engagement over time
                                            </p>
                                        </div>
                                        <button className="flex items-center gap-2 rounded-lg border border-[#dfe2da] px-3 py-2 text-xs font-semibold text-[#68736c]">
                                            Last 30 days <span>⌄</span>
                                        </button>
                                    </div>
                                    <div className="mt-8 flex h-56 items-end gap-2 border-b border-l border-[#dfe2da] px-3 pb-0 sm:gap-3">
                                        {[
                                            38, 52, 45, 65, 55, 72, 62, 78, 68,
                                            91, 76, 86, 74, 96, 88, 100, 83, 93,
                                        ].map((height, index) => (
                                            <div
                                                key={index}
                                                className="group relative flex h-full flex-1 items-end"
                                            >
                                                <div
                                                    className={`w-full rounded-t-md transition-all group-hover:bg-[#f26b4f] ${index === 15 ? 'bg-[#18211d]' : 'bg-[#b9c6b8]'}`}
                                                    style={{
                                                        height: `${height}%`,
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-3 flex justify-between pl-3 text-[10px] text-[#9aa49b]">
                                        <span>Sep 08</span>
                                        <span>Sep 15</span>
                                        <span>Sep 22</span>
                                        <span>Sep 29</span>
                                        <span>Oct 08</span>
                                    </div>
                                </section>

                                <section className="rounded-2xl bg-[#18211d] p-5 text-[#f5f1e8] sm:p-7">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-xs font-bold tracking-[0.18em] text-[#d8f36a] uppercase">
                                                Focus today
                                            </p>
                                            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                                                Make space for deep work.
                                            </h2>
                                        </div>
                                        <span className="text-3xl text-[#d8f36a]">
                                            ✦
                                        </span>
                                    </div>
                                    <p className="mt-4 max-w-sm text-sm leading-6 text-[#aab5ab]">
                                        You have a clear afternoon. Use it to
                                        move one meaningful thing forward.
                                    </p>
                                    <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                                        <span className="text-xs text-[#829087]">
                                            Daily intention
                                        </span>
                                        <span className="text-xs font-semibold text-[#d8f36a]">
                                            01 / 01 complete
                                        </span>
                                    </div>
                                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                                        <div className="h-full w-full rounded-full bg-[#d8f36a]" />
                                    </div>
                                </section>
                            </div>

                            <div className="mt-4 grid gap-4 xl:grid-cols-[1.45fr_1fr]">
                                <section className="rounded-2xl border border-[#dfe2da] bg-white/70 p-5 sm:p-7">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-lg font-semibold">
                                                Recent projects
                                            </h2>
                                            <p className="mt-1 text-sm text-[#829087]">
                                                Your team’s latest work
                                            </p>
                                        </div>
                                        <a
                                            href="#"
                                            className="flex items-center gap-2 text-xs font-bold text-[#d25c43]"
                                        >
                                            View all{' '}
                                            <Icon
                                                name="arrow"
                                                className="h-3.5 w-3.5"
                                            />
                                        </a>
                                    </div>
                                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                        <a
                                            href="#"
                                            className="group rounded-xl border border-[#dfe2da] bg-[#f5f1e8]/70 p-4 transition hover:-translate-y-0.5 hover:border-[#18211d]"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#d8f36a] text-sm font-bold">
                                                    B
                                                </span>
                                                <Icon
                                                    name="more"
                                                    className="h-5 w-5 text-[#829087]"
                                                />
                                            </div>
                                            <h3 className="mt-6 font-semibold">
                                                Bloom campaign
                                            </h3>
                                            <p className="mt-1 text-xs text-[#829087]">
                                                Design system · 72% complete
                                            </p>
                                            <div className="mt-4 h-1 rounded-full bg-[#dfe2da]">
                                                <div className="h-full w-[72%] rounded-full bg-[#18211d]" />
                                            </div>
                                        </a>
                                        <a
                                            href="#"
                                            className="group rounded-xl border border-[#dfe2da] bg-[#f5f1e8]/70 p-4 transition hover:-translate-y-0.5 hover:border-[#18211d]"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f3c6a5] text-sm font-bold">
                                                    N
                                                </span>
                                                <Icon
                                                    name="more"
                                                    className="h-5 w-5 text-[#829087]"
                                                />
                                            </div>
                                            <h3 className="mt-6 font-semibold">
                                                Northstar launch
                                            </h3>
                                            <p className="mt-1 text-xs text-[#829087]">
                                                Marketing · 41% complete
                                            </p>
                                            <div className="mt-4 h-1 rounded-full bg-[#dfe2da]">
                                                <div className="h-full w-[41%] rounded-full bg-[#f26b4f]" />
                                            </div>
                                        </a>
                                    </div>
                                </section>
                                <section className="rounded-2xl border border-[#dfe2da] bg-white/70 p-5 sm:p-7">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-lg font-semibold">
                                                Activity
                                            </h2>
                                            <p className="mt-1 text-sm text-[#829087]">
                                                Latest updates
                                            </p>
                                        </div>
                                        <button className="text-[#829087]">
                                            <Icon name="more" />
                                        </button>
                                    </div>
                                    <div className="mt-6 grid gap-5">
                                        {activities.map((activity) => (
                                            <div
                                                key={activity.name}
                                                className="flex items-center gap-3"
                                            >
                                                <span
                                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${activity.color}`}
                                                >
                                                    {activity.initials}
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm">
                                                        <span className="font-semibold">
                                                            {activity.name}
                                                        </span>{' '}
                                                        {activity.action}
                                                    </p>
                                                    <p className="mt-1 text-xs text-[#9aa49b]">
                                                        {activity.time}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
