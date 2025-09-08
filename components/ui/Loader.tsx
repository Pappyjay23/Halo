"use client";
import type React from "react";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import Image from "next/image";

const Loader = ({
	setLoading,
}: {
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const counterRef = useRef<HTMLDivElement>(null);
	const ringRef = useRef<SVGCircleElement>(null);
	const hundredsRef = useRef<HTMLDivElement>(null);
	const tensRef = useRef<HTMLDivElement>(null);
	const onesRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const counterEl = counterRef.current;
		const ringEl = ringRef.current;
		if (!counterEl || !ringEl) return;

		const tl = gsap.timeline({ onComplete: () => setLoading(false) });

		tl.to(
			{ value: 0 },
			{
				value: 100,
				duration: 4,
				ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
				onUpdate: function () {
					const current = Math.floor(this.targets()[0].value);
					const hundreds = Math.floor(current / 100);
					const tens = Math.floor((current % 100) / 10);
					const ones = current % 10;

					gsap.to(hundredsRef.current, {
						y: -hundreds * 60,
						duration: 0.3,
						ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
					});
					gsap.to(tensRef.current, {
						y: -tens * 60,
						duration: 0.3,
						ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
					});
					gsap.to(onesRef.current, {
						y: -ones * 60,
						duration: 0.3,
						ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
					});

					const circumference = 2 * Math.PI * 80;
					const offset = circumference - (current / 100) * circumference;
					gsap.set(ringEl, {
						strokeDashoffset: offset,
					});
				},
			}
		);

		tl.to(counterEl, {
			opacity: 0,
			duration: 1,
			ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
		});

		tl.to(".loader-ring", {
			scale: 0.1,
			duration: 1,
			ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
		});

		tl.to(
			".loader-container",
			{
				opacity: 0,
				duration: 1,
				ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
			},
			"<"
		);
	}, []);

	const renderDigits = (ref: React.RefObject<HTMLDivElement | null>) => (
		<div className='overflow-hidden h-[60px] w-[40px]'>
			<div ref={ref}>
				{[...Array(10)].map((_, i) => (
					<div
						key={i}
						className='h-[60px] flex items-center justify-center text-5xl font-mono font-bold text-white drop-shadow-[0_0_8px_#00BFFF]'>
						{i}
					</div>
				))}
			</div>
		</div>
	);

	return (
		<div className='loader-container absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm overflow-hidden h-svh'>
			{/* Counter */}
			<div
				ref={counterRef}
				className='absolute bottom-10 left-10 flex text-2xl'>
				{renderDigits(hundredsRef)}
				{renderDigits(tensRef)}
				{renderDigits(onesRef)}
			</div>

			<div className='relative flex items-center justify-center loader-ring'>
				<svg width='200' height='200' className='transform -rotate-90'>
					{/* Background ring */}
					<circle
						cx='100'
						cy='100'
						r='80'
						stroke='#1C1C1C'
						strokeWidth='3'
						fill='none'
					/>
					{/* Progress ring with HALO neon blue */}
					<circle
						ref={ringRef}
						cx='100'
						cy='100'
						r='80'
						stroke='#00BFFF'
						strokeWidth='3'
						fill='none'
						strokeLinecap='round'
						strokeDasharray={`${2 * Math.PI * 80}`}
						strokeDashoffset={`${2 * Math.PI * 80}`}
						style={{
							filter: "drop-shadow(0 0 8px #00BFFF)",
						}}
					/>
				</svg>
				{/* Logo placeholder in center */}
				<div className='absolute inset-0 flex items-center justify-center w-full mx-auto'>
					<div className='rounded-full relative overflow-hidden flex items-center justify-center backdrop-blur-md w-[150px] h-[150px]'>
						<Image src='/logo.png' alt='Logo' fill className='object-cover' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Loader;
