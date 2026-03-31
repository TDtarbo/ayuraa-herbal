"use client";

import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

type ConfirmationDialogProps = {
	isOpen: boolean;
	title: string;
	description: string;
	confirmLabel?: string;
	cancelLabel?: string;
	tone?: "default" | "danger";
	onConfirm: () => void;
	onClose: () => void;
};

export default function ConfirmationDialog({
	isOpen,
	title,
	description,
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
	tone = "default",
	onConfirm,
	onClose,
}: ConfirmationDialogProps) {
	useEffect(() => {
		if (!isOpen) return;

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleEscape);

		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const confirmButtonClassName =
		tone === "danger"
			? "border-[#9e5b54] bg-[#9e5b54] text-white hover:border-[#874d47] hover:bg-[#874d47]"
			: "border-brand-gold bg-brand-gold text-white hover:border-brand-gold-hover hover:bg-brand-gold-hover";

	return (
		<div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6">
			<button
				type="button"
				className="absolute inset-0 bg-[#26231f]/30 backdrop-blur-[2px]"
				onClick={onClose}
				aria-label="Close confirmation dialog"
			/>

			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby="confirmation-dialog-title"
				className="surface-pop-in relative z-10 w-full max-w-lg rounded-[32px] border border-brand-border-soft bg-brand-paper p-6 shadow-[0_22px_60px_var(--shadow-black-06)] sm:p-8"
			>
				<div className="flex items-start justify-between gap-4">
					<div>
						<p className="section-eyebrow text-brand-gold">Please Confirm</p>
						<h2
							id="confirmation-dialog-title"
							className="mt-3 text-2xl leading-tight font-light tracking-tight text-brand-ink sm:text-3xl"
						>
							{title}
						</h2>
					</div>

					<button
						type="button"
						onClick={onClose}
						className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-border-button bg-brand-ivory text-brand-copy-ui transition duration-300 hover:border-brand-gold hover:text-brand-gold"
						aria-label="Close confirmation dialog"
					>
						<IoCloseOutline className="h-7 w-7" />
					</button>
				</div>

				<p className="section-body text-brand-copy mt-5">{description}</p>

				<div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
					<button
						type="button"
						onClick={onClose}
						className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-border-button px-7 py-3 text-[11px] tracking-[0.24em] text-brand-copy-ui uppercase transition duration-300 hover:border-brand-gold hover:text-brand-gold"
					>
						{cancelLabel}
					</button>
					<button
						type="button"
						onClick={onConfirm}
						className={`inline-flex min-h-12 items-center justify-center rounded-full border px-7 py-3 text-[11px] tracking-[0.24em] uppercase transition duration-300 ${confirmButtonClassName}`}
					>
						{confirmLabel}
					</button>
				</div>
			</div>
		</div>
	);
}
