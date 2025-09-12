"use client";

import React, { useRef, useEffect } from "react";
import { Element } from "react-scroll";
import Image from "next/image";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import gsap from "gsap";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

// Import Swiper styles
import "swiper/css";
import { useGSAP } from "@gsap/react";

const testimonials = [
	{
		id: 1,
		quote:
			"As a developer, I love how long the battery lasts. I can code for hours without worrying about recharging.",
		name: "Michael T.",
		role: "Software Developer",
		image: "/halo-testimonial-1.jpg", // guy coding
	},
	{
		id: 2,
		quote:
			"The sound is crystal clear and the comfort is amazing. I can’t stop smiling every time I put them on!",
		name: "Emma R.",
		role: "College Student",
		image: "/halo-testimonial-2.jpg", // lady smiling using the headphone
	},
	{
		id: 3,
		quote:
			"Music has never felt this alive. The headphones make every beat more enjoyable.",
		name: "Daniel K.",
		role: "Musician",
		image: "/halo-testimonial-3.jpg", // guy smiling listening to music
	},
	{
		id: 4,
		quote:
			"I love how easy it is to pair with my phone. I can listen to music and take calls seamlessly.",
		name: "Sophia L.",
		role: "Marketing Specialist",
		image: "/halo-testimonial-4.jpg", // lady using phone with headphones
	},
	{
		id: 5,
		quote:
			"The design is sleek and stylish. I use them every day whether I’m working or relaxing.",
		name: "James M.",
		role: "Entrepreneur",
		image: "/halo-testimonial-5.jpg", // guy using the headphone
	},
	{
		id: 6,
		quote:
			"Lightweight and comfortable — I barely notice I’m wearing them, even during long playlists.",
		name: "Linda S.",
		role: "Content Creator",
		image: "/halo-testimonial-6.jpg", // lady using the headphone
	},
	{
		id: 7,
		quote:
			"The noise cancellation is incredible. It’s like having my own quiet space anywhere I go.",
		name: "Olivia P.",
		role: "Graduate Student",
		image: "/halo-testimonial-7.jpg", // lady using the headphone
	},
];

const Testimonials = () => {
	const swiperRef = useRef<SwiperClass | null>(null);
	const textRefs = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		if (!swiperRef.current) return;

		const swiper = swiperRef.current;

		const animateSlide = (index: number) => {
			const textContainer = textRefs.current[index];
			if (!textContainer) return;

			const quote = textContainer.querySelector("p") as HTMLElement;
			const name = textContainer.querySelector("h4") as HTMLElement;
			const role = textContainer.querySelector("span") as HTMLElement;

			if (!quote || !name || !role) return;

			gsap.killTweensOf([quote, name, role]);
			gsap.set([quote, name, role], { autoAlpha: 0, y: 20 });

			gsap.to([quote, name, role], {
				autoAlpha: 1,
				y: 0,
				duration: 1.5,
				stagger: 0.2,
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

	useGSAP(() => {
		const tl = gsap.timeline({ paused: true });
		tl.fromTo(
			".testimonial-title",
			{ opacity: 0, y: 20 },
			{ opacity: 1, y: 0, duration: 1, ease: "power2.in" }
		).fromTo(
			".testimonial-card-row",
			{ opacity: 0 },
			{ opacity: 1, duration: 1, ease: "power2.in" },
			"<"
		);

		gsap.timeline({
			scrollTrigger: {
				trigger: "#testimonials",
				start: "top bottom",
				end: "bottom top",
				onEnter: () => tl.restart(),
				onEnterBack: () => tl.restart(),
				onLeave: () => tl.reverse(),
			},
		});
	});

	return (
		<Element name='testimonials' id='testimonials'>
			<div className='bg-background my-24 text-white'>
				<div className='text-center mb-8 responsive-container'>
					<h2 className='testimonial-title text-4xl lg:text-5xl font-bold text-left font-plus-jakarta-sans tracking-tight md:px-8'>
						Real Experiences.
					</h2>
				</div>
				<div className='relative w-full h-[70vh] lg:h-screen flex items-center justify-center responsive-container testimonial-card-row'>
					<Swiper
						modules={[Autoplay, FreeMode]}
						freeMode={true}
						onSwiper={(swiper) => (swiperRef.current = swiper)}
						spaceBetween={0}
						slidesPerView={1}
						loop={true}
						autoplay={{ delay: 5000, disableOnInteraction: false }}
						speed={2500}
						style={
							{
								"--swiper-transition-timing-function":
									"cubic-bezier(0.22, 1, 0.36, 1)",
							} as React.CSSProperties
						}>
						{testimonials.map((t, index) => (
							<SwiperSlide key={t.id}>
								<div className='grid grid-cols-1 md:grid-cols-2 h-[70vh] lg:h-screen'>
									{/* Left - Text */}
									<div
										className='flex flex-col justify-center lg:items-end [@media(min-width:2000px)]:items-end px-4 md:px-8 lg:px-16 relative'
										style={{
											backgroundImage:
												window.innerWidth < 768 ? `url(${t.image})` : "none",
											backgroundSize: "cover",
											backgroundPosition: "center",
										}}>
										<div className='absolute top-0 left-0 w-full h-full bg-black opacity-75 md:hidden'></div>

										<div
											className='max-w-lg space-y-2 z-10'
											ref={(el) => {
												if (el) textRefs.current[index] = el;
											}}>
											<p className='text-xl md:text-3xl font-medium leading-relaxed'>
												“ {t.quote} ”
											</p>
											<h4 className='text-base md:text-lg font-semibold'>
												{t.name}
											</h4>
											<span className='text-gray-200 text-xs md:text-sm'>
												{t.role}
											</span>
										</div>

										{/* Navigation Arrows */}
										<div className='flex justify-start w-full gap-4 mt-4 md:mt-8 z-10'>
											<button
												onClick={() => swiperRef.current?.slidePrev()}
												className='flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full bg-white text-black hover:bg-gray-500 hover:text-white cursor-pointer transition-all duration-500 ease-in-out'>
												<IoArrowBack />
											</button>
											<button
												onClick={() => swiperRef.current?.slideNext()}
												className='flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full bg-white text-black hover:bg-gray-500 hover:text-white cursor-pointer transition-all duration-500 ease-in-out'>
												<IoArrowForward />
											</button>
										</div>
									</div>

									{/* Right - Image */}
									<div className='relative w-full h-full hidden md:block'>
										<Image
											src={t.image}
											alt={t.name}
											fill
											className='object-cover'
											priority
										/>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</Element>
	);
};

export default Testimonials;
