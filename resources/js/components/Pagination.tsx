import { Link } from '@inertiajs/react';

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type Paginated<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: PaginationLink[];
};

export default function Pagination({
    pagination,
}: {
    pagination: Paginated<unknown>;
}) {
    if (pagination.last_page <= 1) {
        return null;
    }

    return (
        <nav
            className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#dfe2da] pt-5"
            aria-label="Pagination"
        >
            <p className="text-xs text-[#68736c]">
                Showing {pagination.from}–{pagination.to} of {pagination.total}
            </p>
            <div className="flex flex-wrap gap-1">
                {pagination.links.map((link) =>
                    link.url ? (
                        <Link
                            key={link.label}
                            href={link.url}
                            preserveState
                            preserveScroll
                            className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                                link.active
                                    ? 'bg-[#18211d] text-[#f5f1e8]'
                                    : 'border border-[#dfe2da] bg-white text-[#68736c] hover:border-[#18211d] hover:text-[#18211d]'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ) : (
                        <span
                            key={link.label}
                            className="rounded-lg border border-[#dfe2da] px-3 py-2 text-xs font-semibold text-[#b8c0b7]"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ),
                )}
            </div>
        </nav>
    );
}
