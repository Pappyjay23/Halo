"use client";

import React, { useRef, useEffect } from "react";
import { Element } from "react-scroll";
import Image from "next/image";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { IoArrowForward } from "react-icons/io5";
import gsap from "gsap";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const slides = [
	{
		id: 1,
		title: "Concentration",
		description:
			"Block out distractions and dive into pure sound. Perfect for deep work sessions.",
		image: "/highlight-slide-1.jpg",
	},
	{
		id: 2,
		title: "Relaxation",
		description:
			"Unwind with a soundscape that melts away the noise of the day.",
		image: "/highlight-slide-2.jpg",
	},
	{
		id: 3,
		title: "Travel",
		description:
			"Lightweight, wireless freedom designed for comfort on the go.",
		image: "/highlight-slide-3.jpg",
	},
	{
		id: 4,
		title: "Performance",
		description: "Engineered to deliver studio-quality sound wherever you are.",
		image: "/highlight-slide-4.jpg",
	},
	{
		id: 5,
		title: "Power & Charging",
		description:
			"Fast charging and long-lasting battery life keep your headphones ready anytime, anywhere.",
		image: "/highlight-slide-5.jpg",
	},
];

export default function Highlights() {
	const swiperRef = useRef<SwiperClass | null>(null);
	const textRefs = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		if (!swiperRef.current) return;

		const swiper = swiperRef.current;

		const animateSlide = (index: number) => {
			const textContainer = textRefs.current[index];
			if (!textContainer) return;

			const headline = textContainer.querySelector("h2") as HTMLElement;
			const description = textContainer.querySelector("p") as HTMLElement;
			const button = textContainer.querySelector("button") as HTMLElement;

			if (!headline || !description || !button) return;

			gsap.killTweensOf([headline, description, button]);
			gsap.set([headline, description, button], { autoAlpha: 0, y: 20 });

			gsap.to([headline, description, button], {
				autoAlpha: 1,
				y: 0,
				duration: 8,
				ease: "power3.out",
			});
		};

		// Animate the initial slide
		animateSlide(swiper.realIndex);

		swiper.on("slideChangeTransitionStart", () => {
			animateSlide(swiper.realIndex);
		});

		return () => {
			swiper.off("slideChangeTransitionStart");
		};
	}, []);

	return (
		<Element name='highlights' id='highlights'>
			<div className='relative w-full h-screen overflow-hidden'>
				<Swiper
					modules={[Pagination, Autoplay]}
					onSwiper={(swiper) => (swiperRef.current = swiper)}
					spaceBetween={0}
					slidesPerView={1}
					loop={true}
					autoplay={{ delay: 5000, disableOnInteraction: false }}
					pagination={{ clickable: true }}
					speed={2500}
					style={
						{
							"--swiper-transition-timing-function":
								"cubic-bezier(0.22, 1, 0.36, 1)",
						} as React.CSSProperties
					}>
					{slides.map((slide, index) => (
						<SwiperSlide key={slide.id}>
							<div className='relative w-full h-screen'>
								<Image
									src={slide.image}
									alt={slide.title}
									fill
									className='object-cover select-none pointer-events-none'
									priority
								/>
								<div className='absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60' />
								<div
									className={`absolute inset-0 flex items-center ${
										slide.id === 1 || slide.id === 2
											? "md:justify-start"
											: "md:justify-end"
									} justify-center px-12 md:px-24 text-white responsive-container`}>
									<div
										className='max-w-lg space-y-4'
										ref={(el) => {
											if (el) textRefs.current[index] = el;
										}}>
										<h2 className='text-3xl md:text-5xl [@media(min-width:2000px)]:text-7xl tracking-tighter font-extrabold font-plus-jakarta-sans'>
											{slide.title}
										</h2>
										<p className='text-base md:text-lg [@media(min-width:2000px)]:text-xl leading-relaxed w-[70%] [@media(min-width:2000px)]:w-[85%]'>
											{slide.description}
										</p>
										<button
											onClick={() => swiperRef.current?.slideNext()}
											className='mt-4 flex items-center justify-center gap-2 border border-white rounded-full h-8 w-8 [@media(min-width:2000px)]:h-12 [@media(min-width:2000px)]:w-12 [@media(min-width:2000px)]:text-2xl hover:bg-white hover:text-black transition duration-500 ease-in-out cursor-pointer shadow-2xl backdrop-blur-md'>
											<IoArrowForward />
										</button>
									</div>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</Element>
	);
}
