"use client";

import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";

type ActionToastProps = {
	isOpen: boolean;
	title: string;
	description: string;
	actionLabel?: string;
	actionHref?: string;
	onClose: () => void;
};

export default function ActionToast({
	isOpen,
	title,
	description,
	actionLabel,
	actionHref,
	onClose,
}: ActionToastProps) {
	if (!isOpen) return null;

	return (
		<div className="surface-pop-in fixed right-4 bottom-4 z-[10000] w-[calc(100%-2rem)] max-w-sm rounded-[28px] border border-brand-border-soft bg-brand-paper p-5 shadow-[0_18px_50px_var(--shadow-black-06)] sm:right-6 sm:bottom-6">
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="section-eyebrow text-brand-gold">Added to Cart</p>
					<h3 className="mt-2 text-xl leading-tight font-light tracking-tight text-brand-ink">
						{title}
					</h3>
				</div>

				<button
					type="button"
					onClick={onClose}
					className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-border-button bg-brand-ivory text-brand-copy-ui transition duration-300 hover:border-brand-gold hover:text-brand-gold"
					aria-label="Close notification"
				>
					<IoCloseOutline className="h-6 w-6" />
				</button>
			</div>

			<p className="mt-3 text-sm leading-7 text-brand-copy">{description}</p>

			<div className="mt-5 flex flex-wrap gap-3">
				{actionLabel && actionHref && (
					<Link
						href={actionHref}
						className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-gold bg-brand-gold px-5 py-2.5 text-[11px] tracking-[0.24em] text-white uppercase transition duration-300 hover:border-brand-gold-hover hover:bg-brand-gold-hover"
					>
						{actionLabel}
					</Link>
				)}
				<button
					type="button"
					onClick={onClose}
					className="inline-flex min-h-11 items-center justify-center rounded-full border border-brand-border-button px-5 py-2.5 text-[11px] tracking-[0.24em] text-brand-copy-ui uppercase transition duration-300 hover:border-brand-gold hover:text-brand-gold"
				>
					Keep Shopping
				</button>
			</div>
		</div>
	);
}
