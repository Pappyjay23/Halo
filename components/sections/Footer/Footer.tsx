import { navLinks } from "@/components/ui/Navbar";
import { useSound } from "@/hooks/useSound";
import { showToast } from "@/utils/toast";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram, IoLogoYoutube } from "react-icons/io5";
import { Link } from "react-scroll";

const Footer = () => {
	const { play: playClick } = useSound("/sounds/click.wav", 0.6, false);

	useGSAP(() => {
		const tl = gsap.timeline({ paused: true });
		tl.fromTo(
			".footer-tagline",
			{ opacity: 0, y: 20 },
			{ opacity: 1, y: 0, duration: 1, ease: "power2.in" }
		).fromTo(
			[".footer-nav", ".footer-copyright"],
			{ opacity: 0 },
			{ opacity: 1, duration: 1, ease: "power2.in" },
			"<"
		);

		gsap.timeline({
			scrollTrigger: {
				trigger: "#footer",
				start: "top bottom",
				end: "bottom top",
				onEnter: () => tl.restart(),
				onEnterBack: () => tl.restart(),
				onLeave: () => tl.reverse(),
			},
		});
	});

	return (
		<div id='footer' className='h-[50vh] relative bg-background'>
			<div className='absolute top-0 left-0 w-screen h-full'>
				<Image
					src='/footer-bg.jpg'
					alt='Footer Background'
					fill
					className='object-cover object-center opacity-90'
				/>
			</div>
			<div className='absolute inset-0 backdrop-blur-sm'></div>
			<div className='absolute inset-0 bg-black opacity-60 z-[9]'></div>
			<div className='responsive-container z-10 text-white relative h-full flex flex-col justify-center items-center text-[50px] font-plus-jakarta-sans font-extrabold'>
				<div>
					<h1
						className='footer-tagline text-transparent [-webkit-text-stroke:1px_#00BFFF] text-center text-[23px] md:text-3xl lg:text-5xl [@media(min-width:2000px)]:text-8xl -mt-[6rem] md:-mt-[3rem] lg:-mt-0'
						style={{
							textShadow: `
							  0 0 15px rgba(0, 200, 255, 0.8),
							  0 0 30px rgba(150, 0, 255, 0.6),
							  0 0 45px rgba(0, 200, 255, 0.5)
							`,
						}}>
						Halo is more than sound. It’s an experience.
					</h1>
				</div>
				<div className='flex flex-col items-center w-full responsive-container absolute bottom-0 py-2'>
					{/* Nav */}
					<div className='flex flex-col md:flex-row gap-4 justify-between items-center lg:w-[70%] w-[80%] footer-nav'>
						<Link
							onClick={() => playClick()}
							id='logo'
							to='hero'
							smooth={true}
							duration={500}
							offset={-50}
							spy={true}
							className='flex items-center cursor-pointer'>
							<div className='rounded-full relative overflow-hidden flex items-center justify-center backdrop-blur-md w-[20px] h-[20px] md:w-[40px] md:h-[40px]'>
								<Image
									src='/logo.png'
									alt='Logo'
									fill
									className='object-cover'
								/>
							</div>
							<p className='text-sm md:text-xl font-extrabold font-plus-jakarta-sans'>
								Halo
							</p>
						</Link>
						<div
							id='nav-links'
							className='gap-4 items-center flex flex-row text-xs font-medium text-white'>
							{navLinks.map((link, index) => (
								<Link
									onClick={() => playClick()}
									key={index}
									to={link.path}
									smooth={true}
									duration={500}
									offset={-50}
									spy={true}
									className='opacity-100 cursor-pointer hover:text-accent transition-all duration-300 ease-in-out'>
									{link.name}
								</Link>
							))}
						</div>
						<div className='flex flex-row items-center gap-3 drop-shadow-2xl text-sm'>
							<FaXTwitter
								onClick={() => {
									playClick();
									showToast(
										"🚧 Our social links aren’t live yet — stay tuned!"
									);
								}}
								className='hover:text-accent transition-all duration-300 ease-in-out cursor-pointer'
							/>
							<IoLogoInstagram
								onClick={() => {
									playClick();
									showToast(
										"🚧 Our social links aren’t live yet — stay tuned!"
									);
								}}
								className='hover:text-accent transition-all duration-300 ease-in-out cursor-pointer'
							/>
							<FaFacebookF
								onClick={() => {
									playClick();
									showToast(
										"🚧 Our social links aren’t live yet — stay tuned!"
									);
								}}
								className='hover:text-accent transition-all duration-300 ease-in-out cursor-pointer'
							/>
							<IoLogoYoutube
								onClick={() => {
									playClick();
									showToast(
										"🚧 Our social links aren’t live yet — stay tuned!"
									);
								}}
								className='hover:text-accent transition-all duration-300 ease-in-out cursor-pointer'
							/>
						</div>
					</div>
					<span className='text-[10px] mt-2 [@media(min-width:1025px]:mt-5 font-light footer-copyright'>
						© 2025 Halo. All rights reserved.
					</span>
				</div>
			</div>
		</div>
	);
};

export default Footer;
