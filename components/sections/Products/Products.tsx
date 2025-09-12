"use client";

import React, { useEffect, useRef, useState } from "react";
import { Element } from "react-scroll";
import Image from "next/image";
import Head from "next/head"; // ✅ preload support
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { MdArrowBack, MdArrowForward } from "react-icons/md";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Lens } from "@/components/ui/lens";

const products = [
	{
		id: 1,
		name: "Halo",
		palettes: [
			{
				id: "cryo",
				label: "Cryo",
				swatch: "#B0C4CD",
				images: [
					"/products/halo-cryo-1.webp",
					"/products/halo-cryo-2.webp",
					"/products/halo-cryo-3.webp",
					"/products/halo-cryo-4.webp",
				],
			},
			{
				id: "titanium",
				label: "Titanium",
				swatch: "#626973",
				images: [
					"/products/halo-titanium-1.webp",
					"/products/halo-titanium-2.webp",
					"/products/halo-titanium-3.webp",
					"/products/halo-titanium-4.webp",
				],
			},
			{
				id: "sand",
				label: "Sand",
				swatch: "#DFD3C7",
				images: [
					"/products/halo-sand-1.webp",
					"/products/halo-sand-2.webp",
					"/products/halo-sand-3.webp",
					"/products/halo-sand-4.webp",
				],
			},
			{
				id: "phantom",
				label: "Phantom",
				swatch: "#CBC2D7",
				images: [
					"/products/halo-phantom-1.webp",
					"/products/halo-phantom-2.webp",
					"/products/halo-phantom-3.webp",
					"/products/halo-phantom-4.webp",
				],
			},
			{
				id: "solar",
				label: "Solar",
				swatch: "#EABCAC",
				images: [
					"/products/halo-solar-1.webp",
					"/products/halo-solar-2.webp",
					"/products/halo-solar-3.webp",
					"/products/halo-solar-4.webp",
				],
			},
		],
	},
];

const allImages = products[0].palettes.flatMap((p) => p.images);

const Products: React.FC = () => {
	const swiperRef = useRef<SwiperClass | null>(null);
	const [activePalette, setActivePalette] = useState(products[0].palettes[0]);
	const [prevPalette, setPrevPalette] = useState<typeof activePalette | null>(
		null
	);

	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);

	// refs for images (for GSAP animation)
	const imgRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

	// 🔥 Preload all images
	useEffect(() => {
		allImages.forEach((src) => {
			const img = new window.Image();
			img.src = src;
		});
	}, []);

	const handleSwiper = (swiper: SwiperClass) => {
		swiperRef.current = swiper;
		setIsBeginning(swiper.isBeginning);
		setIsEnd(swiper.isEnd);

		swiper.on("slideChange", () => {
			setIsBeginning(swiper.isBeginning);
			setIsEnd(swiper.isEnd);
		});
	};

	const handlePaletteChange = (palette: typeof activePalette) => {
		if (palette.id === activePalette.id) return;
		setPrevPalette(activePalette);
		setActivePalette(palette);
	};

	// GSAP crossfade for palette changes
	useEffect(() => {
		if (!prevPalette) return;

		activePalette.images.forEach((_, idx) => {
			const prev = imgRefs.current[`prev-${idx}`];
			const active = imgRefs.current[`active-${idx}`];

			if (prev && active) {
				gsap.set(active, { opacity: 0 });
				gsap.to(active, { opacity: 1, duration: 1.2, ease: "power2.out" });
				gsap.to(prev, { opacity: 0, duration: 1.2, ease: "power2.out" });
			}
		});

		const timeout = setTimeout(() => setPrevPalette(null), 1300);
		return () => clearTimeout(timeout);
	}, [activePalette, prevPalette]);

	// Subtle continuous 3D tilt/pulse on images
	useEffect(() => {
		Object.values(imgRefs.current).forEach((img) => {
			if (!img) return;

			gsap.to(img, {
				scale: 1.1,
				yoyo: true,
				repeat: -1,
				duration: 4,
				ease: "sine.inOut",
			});
		});
	}, []);

	useGSAP(() => {
		const tl = gsap.timeline({ paused: true });
		tl.fromTo(
			".products-title",
			{ opacity: 0, y: 20 },
			{ opacity: 1, y: 0, duration: 1, ease: "power2.in" }
		)
			.fromTo(
				".product-card-row",
				{ opacity: 0 },
				{ opacity: 1, duration: 1, ease: "power2.in" },
				"<"
			)
			.fromTo(
				".product-palette",
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.in" },
				"<"
			);

		gsap.timeline({
			scrollTrigger: {
				trigger: "#products",
				start: "top bottom",
				end: "bottom top",
				onEnter: () => tl.restart(),
				onEnterBack: () => tl.restart(),
				onLeave: () => tl.reverse(),
			},
		});
	});

	return (
		<>
			{/* ✅ Preload all images with <link> */}
			<Head>
				{allImages.map((src) => (
					<link key={src} rel='preload' as='image' href={src} />
				))}
			</Head>

			<Element name='products' id='products'>
				<section className='relative w-full pt-15 pb-25 lg:pb-18 flex items-center justify-center bg-background overflow-hidden'>
					<div className='relative w-[90%] max-w-7xl flex flex-col gap-8'>
						<h2 className='products-title text-4xl lg:text-5xl font-bold text-left font-plus-jakarta-sans tracking-tight'>
							Take a closer look.
						</h2>

						{/* Cards row */}
						<div className='relative product-card-row'>
							<Swiper
								modules={[Navigation, FreeMode]}
								freeMode={true}
								onSwiper={handleSwiper}
								slidesPerView='auto'
								spaceBetween={24}
								centeredSlides={false}
								speed={900}
								className='!overflow-visible transition-transform duration-700 ease-[cubic-bezier(.77,0,.18,1)]'>
								{activePalette.images.map((img, idx) => (
									<SwiperSlide key={idx} className='!w-[450px] lg:!w-[900px]'>
										<Lens>
											<div
												style={{ backgroundColor: activePalette.swatch }}
												className='relative h-[300px] w-[450px] lg:h-[600px] lg:w-[900px] rounded-xl overflow-hidden flex items-center justify-center shadow-md transition-all duration-500 ease-[cubic-bezier(.77,0,.18,1)]'>
												<div
													style={{ backgroundColor: "#000" }}
													className='absolute inset-0 opacity-50'
												/>
												{/* Prev image (fading out) */}
												{prevPalette && (
													<div
														ref={(el) => {
															if (el) imgRefs.current[`prev-${idx}`] = el;
														}}
														className='absolute inset-0 z-10'>
														<Image
															src={prevPalette.images[idx]}
															alt={`${prevPalette.label}-${idx}`}
															fill
															className='object-cover'
														/>
													</div>
												)}

												{/* Active image (fading in + tilt/pulse) */}
												<div
													ref={(el) => {
														if (el) imgRefs.current[`active-${idx}`] = el;
													}}
													style={{ perspective: 1000 }}
													className='absolute inset-0 z-20 cursor-pointer'>
													<Image
														src={img}
														alt={`${activePalette.label}-${idx}`}
														fill
														className='object-cover'
														priority={idx === 0}
													/>
												</div>
											</div>
										</Lens>
									</SwiperSlide>
								))}
							</Swiper>

							{/* Nav arrows */}
							<div className='absolute -bottom-12 right-0 flex gap-3'>
								<button
									onClick={() => !isBeginning && swiperRef.current?.slidePrev()}
									disabled={isBeginning}
									className={`products-prev bg-white rounded-full shadow-md p-2 hover:bg-gray-100 text-background cursor-pointer ${
										isBeginning ? "opacity-50 pointer-events-none" : ""
									}`}>
									<MdArrowBack size={16} />
								</button>
								<button
									onClick={() => !isEnd && swiperRef.current?.slideNext()}
									disabled={isEnd}
									className={`products-next bg-white rounded-full shadow-md p-2 hover:bg-gray-100 text-background cursor-pointer ${
										isEnd ? "opacity-50 pointer-events-none" : ""
									}`}>
									<MdArrowForward size={16} />
								</button>
							</div>
						</div>
					</div>

					{/* Palette */}
					<div className='absolute scale-[0.89] md:scale-100 bottom-3 md:bottom-5 lg:bottom-7 left-0 translate-x-0 md:left-[50%] md:translate-x-[-50%] z-20 flex flex-col gap-2 product-palette'>
						<div className='bg-black/20 p-2 backdrop-blur-lg rounded-full w-fit min-w-[80px] mx-auto border border-white/50'>
							<h3 className='text-xs font-semibold text-center'>
								{activePalette.label}
							</h3>
						</div>
						<div className='flex gap-2 justify-center bg-white/20 backdrop-blur-lg py-2 px-4 rounded-full border border-white/50'>
							{products[0].palettes.map((palette) => (
								<div
									key={palette.id}
									className={`w-7 h-7 rounded-full flex justify-center items-center border-2 transition-all duration-700 ease-in-out ${
										activePalette.id === palette.id
											? "border-white"
											: "border-transparent"
									}`}>
									<button
										onClick={() => handlePaletteChange(palette)}
										className='w-5 h-5 rounded-full cursor-pointer border border-white/10'
										style={{ backgroundColor: palette.swatch }}
									/>
								</div>
							))}
						</div>
						<div className='bg-white/20 px-4 py-2 backdrop-blur-lg rounded-full w-fit min-w-[80px] mx-auto border border-white/50'>
							<h3 className='text-xs font-semibold text-center'>
								Starting at $199
							</h3>
						</div>
					</div>
				</section>
			</Element>
		</>
	);
};

export default Products;
