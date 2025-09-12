"use client";

import Image from "next/image";
import { Element } from "react-scroll";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Specs = () => {
	const [openItem, setOpenItem] = useState<string | null>(null);

	const accordionItems = [
		{
			id: "general-features",
			title: "General Features",
			content: [
				"High-resolution audio support",
				"Premium build quality",
				"Ergonomic design",
				"Multiple connectivity options",
			],
		},
		{
			id: "battery",
			title: "Battery",
			content: [
				"Up to 30 hours playback time",
				"Quick charge: 15 minutes for 3 hours",
				"USB-C charging port",
				"Battery level indicator",
			],
		},
		{
			id: "bluetooth",
			title: "Bluetooth® Specification",
			content: [
				"Bluetooth 5.2 technology",
				"aptX HD codec support",
				"10-meter range",
				"Multi-device pairing",
			],
		},
		{
			id: "noise-cancelling",
			title: "Noise Cancelling",
			content: [
				"Active noise cancellation (ANC)",
				"Ambient sound mode",
				"Adaptive noise control",
				"Wind noise reduction",
			],
		},
		{
			id: "amplifier",
			title: "Portable Headphone Amplifier",
			content: [
				"Built-in DAC/amplifier",
				"High impedance driver support",
				"Low distortion output",
				"Customizable EQ settings",
			],
		},
		{
			id: "processor",
			title: "Processor/Transmitter",
			content: [
				"Advanced DSP chip",
				"Real-time audio processing",
				"Low-latency transmission",
				"Automatic gain control",
			],
		},
		{
			id: "whats-in-box",
			title: "What's In The Box",
			content: [
				"Wireless headphones",
				"USB-C charging cable",
				"3.5mm audio cable",
				"Carrying case",
				"Quick start guide",
			],
		},
	];

	// refs for GSAP to control heights
	const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		// initialize all closed
		accordionItems.forEach((_, i) => {
			if (contentRefs.current[i]) {
				gsap.set(contentRefs.current[i], {
					height: 0,
					opacity: 0,
					overflow: "hidden",
				});
			}
		});
	}, []);

	const toggleItem = (id: string, index: number) => {
		if (openItem === id) {
			gsap.to(contentRefs.current[index], {
				height: 0,
				opacity: 0,
				duration: 1,
				ease: "power2.inOut",
			});
			setOpenItem(null);
		} else {
			// close currently open
			if (openItem !== null) {
				const prevIndex = accordionItems.findIndex((i) => i.id === openItem);
				if (prevIndex !== -1 && contentRefs.current[prevIndex]) {
					gsap.to(contentRefs.current[prevIndex], {
						height: 0,
						opacity: 0,
						duration: 1,
						ease: "power2.inOut",
					});
				}
			}
			// open new
			gsap.to(contentRefs.current[index], {
				height: "auto",
				opacity: 1,
				duration: 1,
				ease: "power2.inOut",
			});
			setOpenItem(id);
		}
	};

	useGSAP(() => {
		gsap.fromTo(
			".spec-img",
			{
				rotate: 0,
			},
			{
				rotate: 20,
				duration: 2,
				repeat: -1,
				yoyo: true,
				ease: "power1.inOut",
			}
		);

		const tl = gsap.timeline({ paused: true });
		tl.fromTo(
			".spec-title",
			{
				opacity: 0,
				y: 20,
			},
			{ opacity: 1, y: 0, duration: 1, ease: "power2.in" }
		).fromTo(
			".accordion-item",
			{
				opacity: 0,
				y: 20,
			},
			{
				opacity: 1,
				y: 0,
				duration: 1,
				delay: 0.5,
				stagger: 0.1,
				ease: "power2.in",
			},
			"<"
		);

		gsap.timeline({
			scrollTrigger: {
				trigger: "#specs",
				start: "top 98%",
				end: "bottom top",
				onEnter: () => {
					tl.restart();
				},
				onEnterBack: () => {
					tl.restart();
				},
			},
		});
	});
	return (
		<Element name='specs' id='specs'>
			<section className='min-h-[60vh] bg-[linear-gradient(to_bottom,#09002D_0%,#06001E_50%,#02000F_100%)] w-full py-10 lg:py-20 relative'>
                <div className="absolute top-0 left-0 w-full h-full bg-[#06001E]/50 lg:bg-transparent z-[2]" />
				<div className='w-[300px] h-[300px] md:w-[600px] md:h-[600px] [@media(min-width:2000px)]:w-[800px] [@media(min-width:2000px)]:h-[800px] absolute left-[-30px] spec-img z-[1]'>
					<Image
						src='/spec-img.png'
						fill
						alt='specs'
						className='object-cover'
					/>
				</div>
				<div className='responsive-container flex justify-center lg:justify-end [@media(min-width:2000px)]:justify-center z-[3] relative'>
					<div className='max-w-2xl w-full'>
						<h1 className='text-3xl md:text-4xl font-extrabold font-plus-jakarta-sans text-white text-center mb-8 spec-title opacity-0 drop-shadow-black'>
							Specifications and Features
						</h1>

						<div className='w-full space-y-2'>
							{accordionItems.map((item, index) => {
								const isOpen = openItem === item.id;

								return (
									<div
										key={item.id}
										onClick={() => toggleItem(item.id, index)}
										className='border-b border-white/30 backdrop-blur-sm overflow-hidden cursor-pointer accordion-item'>
										<button
											onClick={() => toggleItem(item.id, index)}
											className='w-full px-2 pt-2 text-left text-sm md:text-base font-medium text-white flex justify-between items-center cursor-pointer'>
											<span>{item.title}</span>
											<svg
												className={`w-5 h-5 transition-transform duration-500 ease-in-out ${
													isOpen ? "rotate-180" : ""
												}`}
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M19 9l-7 7-7-7'
												/>
											</svg>
										</button>

										<div
											ref={(el) => {
												contentRefs.current[index] = el;
											}}
											className='px-6 pt-2 pb-4 text-sm md:text-base text-gray-200'>
											<ul className='space-y-2'>
												{item.content.map((feature, i) => (
													<li key={i}>• {feature}</li>
												))}
											</ul>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</section>
		</Element>
	);
};

export default Specs;
