"use client";

import { toast } from "sonner";
import gsap from "gsap";

export const showToast = (message: string, duration = 2500) => {
	const toastId = toast.custom(
		(t) => (
			<div
				id={`toast-${t}`}
				className='px-4 py-3 rounded-xl text-white font-dm-sans text-xs font-medium
                   border border-accent bg-black/60 backdrop-blur-md
                   shadow-[0_0_20px_var(--color-accent)]'>
				{message}
			</div>
		),
		{ duration }
	);

	// Animate entry
	setTimeout(() => {
		gsap.fromTo(
			`#toast-${toastId}`,
			{ y: -20, opacity: 0, scale: 0.95 },
			{ y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
		);
	}, 10);
};
