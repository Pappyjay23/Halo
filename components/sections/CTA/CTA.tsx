import { useSound } from "@/hooks/useSound";
import { showToast } from "@/utils/toast";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import { MdArrowForward, MdArrowOutward } from "react-icons/md";
import { Link } from "react-scroll";

const CTA = () => {
	const { play: playClick } = useSound("/sounds/click.wav", 0.6, false);

	useGSAP(() => {
		const tl = gsap.timeline({ paused: true });
		tl.fromTo(
			".price-tag",
			{ opacity: 0, y: 50 },
			{ opacity: 1, y: 0, duration: 0.5, ease: "power2.in" }
		)
			.fromTo(
				".cta-title",
				{ opacity: 0, y: 100 },
				{ opacity: 1, y: 0, duration: 1, ease: "power2.in" },
				"<0.2"
			)
			.fromTo(
				".cta-btn",
				{ opacity: 0, y: 100 },
				{ opacity: 1, y: 0, duration: 1, stagger: 0.075, ease: "power2.in" },
				"<"
			);

		gsap.timeline({
			scrollTrigger: {
				trigger: "#cta",
				start: "top 90%",
				end: "bottom top",
				onEnter: () => tl.restart(),
				onEnterBack: () => tl.restart(),
				onLeave: () => tl.reverse(),
			},
		});
	});

	return (
		<div
			id='cta'
			className='min-h-screen h-screen bg-cover bg-center relative w-full'
			style={{ backgroundImage: "url('/cta-bg.jpg')" }}>
			<div className='absolute inset-0 backdrop-blur-xs'></div>
			<div className='absolute inset-0 bg-black opacity-60 z-[9]'></div>
			<div className='responsive-container z-10 relative flex flex-col gap-2 justify-center items-center h-full lg:w-[70%] text-center'>
				<span className='price-tag mt-2 px-4 py-1 rounded-full bg-white/10 text-white text-sm md:text-base font-bold backdrop-blur-md font-plus-jakarta-sans'>
					Starting at $199
				</span>
				<div className='overflow-hidden h-fit'>
					<h1 className='text-3xl lg:text-5xl font-extrabold text-white font-plus-jakarta-sans cta-title'>
						Redefine How You Listen.
					</h1>
				</div>
				<div className='flex flex-wrap justify-center gap-2 items-center mt-4 overflow-hidden'>
					<button
						onClick={() => {
							playClick();
							showToast("🚧 Halo isn’t available for purchase yet. Stay tuned for updates!")
						}}
						className='relative group overflow-hidden text-sm bg-white text-black hover:bg-accent/50 hover:text-white backdrop-blur-md border border-white/30 px-6 md:px-8 py-4 rounded-[4rem] transition-all duration-500 shadow-[inset_3px_3px_10px_rgba(255,255,255,0.5)] active:scale-[0.90] cursor-pointer cta-btn'>
						<div className='relative z-[3] flex items-center gap-2'>
							<span className='text-xs md:text-sm font-bold font-plus-jakarta-sans'>
								Shop now
							</span>
							<MdArrowOutward />
						</div>
					</button>
					<Link
						to='products'
						onClick={() => {
							playClick();
						}}
						className='relative group overflow-hidden text-sm bg-white/5 backdrop-blur-md border border-white/30 px-6 md:px-8 py-4 rounded-[4rem] transition-all duration-500 shadow-[inset_3px_3px_10px_rgba(255,255,255,0.5)] active:scale-[0.90] cursor-pointer cta-btn'>
						<div className='relative z-[3] flex items-center gap-2'>
							<span className='text-xs md:text-sm font-bold font-plus-jakarta-sans'>
								Explore Features
							</span>
							<MdArrowForward />
						</div>

						{/* Hover overlay */}
						<div className='absolute inset-0 z-[2] bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

						{/* Shine sweep (LOOPING) */}
						<div className='absolute inset-0 z-[2] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine' />

						{/* Outer glow (on hover) */}
						<div className='absolute -inset-2 z-[1] rounded-[4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-blue-500/60 to-purple-500/60 blur-2xl' />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CTA;
