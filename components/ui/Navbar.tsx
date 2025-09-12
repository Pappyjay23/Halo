"use client";

import { useSound } from "@/hooks/useSound";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoVolumeMute } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-scroll";

const Navbar = ({
	isPlaying,
	setIsPlaying,
}: {
	isPlaying: boolean;
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const navLinks = [
		{ name: "Specs", path: "specs" },
		{ name: "Highlights", path: "highlights" },
		{ name: "Products", path: "products" },
		{ name: "Testimonials", path: "testimonials" },
	];

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const { play: playAmbient, stop: stopAmbient } = useSound(
		"/sounds/ambient.mp3",
		0.3,
		true
	);

	const toggleMenu = () => setIsMenuOpen((prev) => !prev);

	const toggleAudio = () => {
		if (isPlaying) {
			stopAmbient();
			setIsPlaying(false);
		} else {
			playAmbient();
			setIsPlaying(true);
		}
	};

	useGSAP(() => {
		gsap
			.timeline()
			.fromTo(
				"#volume-btn",
				{
					opacity: 0,
					y: 100,
				},
				{
					opacity: 1,
					y: 0,
					duration: 1,
					ease: "power4.out",
					delay: 0.5,
				}
			)
			.fromTo(
				"#logo, #nav-links a, #nav-links button, #menu-btn",
				{
					opacity: 0,
					y: 100,
				},
				{
					opacity: 1,
					y: 0,
					duration: 2,
					ease: "power4.out",
					delay: 0.5,
					stagger: 0.075,
				},
				"<"
			)
			.fromTo(
				".volume-btn",
				{ scale: 0.9, filter: "drop-shadow(0 0 2px #00bfff)" },
				{
					scale: 1.2,
					filter: "drop-shadow(0 0 12px #00ffc6) drop-shadow(0 0 20px #7a5cff)",
					duration: 2,
					delay: 1,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
					transformOrigin: "center",
				}
			);
	});

	useEffect(() => {
		if (isMenuOpen) {
			// Animate overlay in
			gsap.fromTo(
				".mobile-overlay",
				{ y: "-100%", opacity: 0 },
				{ y: "0%", opacity: 1, duration: 0.7, ease: "power4.out" }
			);

			// Animate links
			gsap.fromTo(
				".mobile-menu-links a, .mobile-menu-links button",
				{ opacity: 0, y: 30, scale: 0.95 },
				{
					opacity: 1,
					y: 0,
					scale: 1,
					stagger: 0.12,
					duration: 0.5,
					delay: 0.2,
					ease: "power3.out",
				}
			);
		} else {
			gsap
				.timeline()
				.to(".mobile-menu-links a, .mobile-menu-links button", {
					opacity: 0,
					y: 30,
					scale: 0.95,
					duration: 0.6,
					ease: "power4.in",
				})
				.to(
					".mobile-overlay",
					{
						y: "-100%",
						duration: 0.6,
						ease: "power4.in",
					},
					"-=0.4"
				);
		}
	}, [isMenuOpen]);

	return (
		<nav id='navbar' className='fixed top-0 left-0 z-50 w-full bg-transparent'>
			<div className='relative flex justify-between items-center py-4 responsive-container overflow-hidden'>
				{/* Volume Button */}
				<button
					id='volume-btn'
					onClick={toggleAudio}
					className='relative bg-accent/5 p-2 rounded-full h-7 w-7 md:w-10 md:h-10 flex items-center justify-center hover:bg-accent/20 transition-all duration-500 ease-in-out cursor-pointer border border-accent opacity-0'>
					<span className='volume-btn'>
						{!isPlaying ? (
							<IoVolumeMute className='text-accent' />
						) : (
							<div className='flex items-center'>
								<div className='flex items-center justify-center gap-[2px] h-[1px] md:h-4 ml-1'>
									{[0, 1, 2, 3, 4].map((i) => (
										<span
											key={i}
											className={`w-[2px] bg-accent rounded-sm animate-bar${i}`}
										/>
									))}
								</div>
							</div>
						)}
					</span>
				</button>

				{/* Logo */}
				<Link
					id='logo'
					to='hero'
					smooth={true}
					duration={500}
					offset={-50}
					spy={true}
					className='flex items-center absolute left-1/2 -translate-x-1/2 cursor-pointer'>
					<div className='rounded-full relative overflow-hidden flex items-center justify-center backdrop-blur-md w-[30px] h-[30px] md:w-[50px] md:h-[50px]'>
						<Image src='/logo.png' alt='Logo' fill className='object-cover' />
					</div>
					<p className='text-lg md:text-2xl font-extrabold font-plus-jakarta-sans'>
						Halo
					</p>
				</Link>

				{/* Desktop Nav */}
				<div className='flex space-x-4 items-center text-xs font-medium text-white'>
					<div id='nav-links' className='space-x-4 items-center hidden lg:flex'>
						{navLinks.map((link, index) => (
							<Link
								key={index}
								to={link.path}
								smooth={true}
								duration={500}
								offset={-50}
								spy={true}
								className='opacity-100 cursor-pointer'>
								{link.name}
							</Link>
						))}
						<button className='opacity-100 cursor-pointer'>
							<MdOutlineShoppingCart className='text-[1.2rem]' />
						</button>
					</div>

					{/* Mobile Menu Toggle */}
					<button
						id='menu-btn'
						onClick={toggleMenu}
						className='relative z-[60] w-6 h-6 flex items-center justify-center cursor-pointer lg:hidden'
						style={{
							filter:
								"drop-shadow(0 0 12px #00ffc6) drop-shadow(0 0 20px #7a5cff)",
						}}>
						<div className='relative w-6 flex flex-col items-center justify-center'>
							<span
								className={`absolute h-[1px] w-full bg-accent rounded transition-transform duration-500 ${
									isMenuOpen ? "rotate-45" : "-translate-y-1.5"
								}`}
							/>
							<span
								className={`absolute h-[1px] w-full bg-accent rounded transition-transform duration-500 ${
									isMenuOpen ? "-rotate-45" : "translate-y-1.5"
								}`}
							/>
						</div>
					</button>
				</div>
			</div>

			{/* Mobile Overlay */}
			<div
				style={{
					backgroundImage:
						"linear-gradient(to bottom, rgba(0, 0, 0, 0.334), rgba(0, 0, 0, 0.738)), url(/hero-bg.jpg)",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
				className='mobile-overlay fixed top-0 left-0 w-full h-screen z-40 opacity-0'>
				<div className='absolute top-0 left-0 w-full h-screen bg-black/40 backdrop-blur-md z-40' />
				<div className='relative gap-6 flex flex-col items-center text-white z-50 mt-[6rem] text-[2.5rem] font-dm-sans font-semibold mobile-menu-links'>
					{navLinks.map((link, index) => (
						<Link
							onClick={toggleMenu}
							key={index}
							to={link.path}
							smooth={true}
							duration={500}
							offset={-50}
							spy={true}
							className='cursor-pointer drop-shadow-2xl'>
							{link.name}
						</Link>
					))}
					<button
						onClick={toggleMenu}
						className='cursor-pointer drop-shadow-2xl'>
						<p>Shopping Cart</p>
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
