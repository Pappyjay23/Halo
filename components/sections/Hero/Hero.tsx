import HeadphoneModel3d from "@/components/models/HeadphoneModel";
import { useSound } from "@/hooks/useSound";
import { showToast } from "@/utils/toast";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram, IoLogoYoutube } from "react-icons/io5";
import {
	MdArrowOutward,
	MdKeyboardDoubleArrowDown,
	MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { Element, Link } from "react-scroll";

const Hero = ({
	loading,
	isPlaying,
}: {
	loading: boolean;
	isPlaying: boolean;
}) => {
	const { play: playClick } = useSound("/sounds/click.wav", 0.6, false);

	useGSAP(() => {
		gsap.to(".hero-text", {
			textShadow: `
							  0 0 15px rgba(0, 200, 255, 0.8),
							  0 0 30px rgba(150, 0, 255, 0.6),
							  0 0 45px rgba(0, 200, 255, 0.5)
							`,
			duration: 2,
			repeat: -1,
			yoyo: true,
			ease: "power1.inOut",
		});

		gsap.timeline({
			scrollTrigger: {
				trigger: "#hero",
				start: "10px top",
				onEnter: () => {
					gsap.to("#navbar", {
						backdropFilter: "blur(10px)",
						background:
							"linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))",
						boxShadow: "inset 3px 3px 10px rgba(0,0,0,0.2)",
					});
				},
				onLeaveBack: () => {
					gsap.to("#navbar", {
						backdropFilter: "blur(0px)",
						background: "transparent",
					});
				},
			},
		});

		const tl = gsap.timeline({ paused: true });

		tl.fromTo(
			".hero-text, .hero-text-outline",
			{
				y: 50,
				opacity: 0,
			},
			{
				y: 0,
				opacity: 1,
				duration: 1.5,
				ease: "power3.inOut",
			}
		)
			.fromTo(
				".hero-cta",
				{
					scale: 0.6,
					opacity: 0,
				},
				{
					scale: 1,
					opacity: 1,
					duration: 1.5,
					ease: "power3.out",
				},
				"<"
			)
			.fromTo(
				"#social-links",
				{
					y: 50,
					opacity: 0,
				},
				{
					y: 0,
					opacity: 1,
					duration: 1.5,
					ease: "power3.inOut",
				},
				"<"
			);

		gsap.timeline({
			scrollTrigger: {
				trigger: "#hero",
				start: "top 70%",
				end: "bottom 10%",
				onEnter: () => {
					tl.restart();
				},
				onEnterBack: () => {
					tl.restart();
				},
			},
		});
	}, []);

	return (
		<Element name='hero' id='hero'>
			<section
				style={{
					backgroundImage: "url(/hero-bg.jpg)",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
				className={`relative z-10 w-full min-h-svh flex justify-center items-center`}>
				<div className='absolute top-0 left-0 w-full h-full bg-black opacity-50 z-[2]' />
				<div className='absolute top-0 left-[50%] translate-x-[-50%] z-10 !bg-transparent h-full flex justify-center items-center'>
					{!loading && typeof window !== "undefined" && <HeadphoneModel3d />}
				</div>
				<div className='relative responsive-container flex justify-center items-center h-screen w-full'>
					<div
						id='enable-sound'
						className={`absolute top-15 md:top-17 left-1 lg:left-0 z-10 font-dm-sans text-[8px] md:text-[10px] lg:text-xs flex flex-col items-center transition-all duration-500 ease-in-out ${
							isPlaying ? "opacity-0" : "opacity-100 animate-bounce"
						}`}>
						<MdKeyboardDoubleArrowUp />
						<p>Enable sound</p>
					</div>
					{/* Social links */}
					<div
						id='social-links'
						className='flex items-center gap-2 absolute top-[150px] left-15 md:left-18 lg:left-20 text-xs md:text-sm z-10 text-white rotate-90'
						style={{ transformOrigin: "left top" }}>
						<p className=' mb-0 drop-shadow-2xl'>Follow us</p>
						<div className='h-[0.7px] w-8 bg-white' />
						<div className='flex flex-col items-center gap-3 -rotate-90 ml-[3rem] drop-shadow-2xl'>
							<FaXTwitter
								onClick={() =>
									showToast("🚧 Our social links aren’t live yet — stay tuned!")
								}
								className='hover:text-accent transition-all duration-300 ease-in-out cursor-pointer'
							/>
							<IoLogoInstagram
								onClick={() =>
									showToast("🚧 Our social links aren’t live yet — stay tuned!")
								}
								className='hover:text-accent transition-all duration-300 ease-in-out cursor-pointer'
							/>
							<FaFacebookF
								onClick={() =>
									showToast("🚧 Our social links aren’t live yet — stay tuned!")
								}
								className='hover:text-accent transition-all duration-300 ease-in-out cursor-pointer'
							/>
							<IoLogoYoutube
								onClick={() =>
									showToast("🚧 Our social links aren’t live yet — stay tuned!")
								}
								className='hover:text-accent transition-all duration-300 ease-in-out cursor-pointer'
							/>
						</div>
					</div>
					{/* Hero text */}
					<div id='hero-texts' className='relative'>
						<h1
							className='hero-text text-[8rem] md:text-[14rem] lg:text-[16rem] [@media(min-width:2000px)]:text-[35rem] font-extrabold text-center leading-tight tracking-tighter font-dm-sans text-transparent bg-clip-text relative z-[9] [-webkit-text-stroke:1px_#ffffff7a]'
							style={{
								backgroundImage: "url('/hero-texture.jpg')",
								backgroundSize: "cover",
								backgroundPosition: "center",
								filter: "drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.5))",
							}}>
							Pure
						</h1>

						<h1
							className='hero-text-outline text-[3rem] md:text-[4rem] [@media(min-width:2000px)]:text-[8rem] font-extrabold text-transparent [-webkit-text-stroke:1px_#00BFFF] text-center leading-tight font-plus-jakarta-sans mt-[4rem] backdrop-blur-xs'
							style={{
								filter: "drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.5))",
							}}>
							Immersive Sound
						</h1>
					</div>
					{/* CTA */}
					<div className='hero-cta flex justify-center cursor-pointer absolute bottom-15 md:bottom-10 md:left-3 md:translate-0 z-10'>
						<Link
							to='products'
							onClick={() => {
								playClick();
							}}
							className='relative group overflow-hidden text-sm bg-white/5 backdrop-blur-md border border-white/30 px-8 py-4 rounded-[4rem] transition-all duration-500 shadow-[inset_3px_3px_10px_rgba(255,255,255,0.5)] active:scale-[0.90]'>
							<div className='relative z-[3] flex items-center gap-2'>
								<span className=' font-bold font-plus-jakarta-sans'>
									Shop now
								</span>
								<MdArrowOutward />
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
				{/* Scroll Indicator */}
				<div
					className={`scroll-indicator absolute bottom-3 md:bottom-10 left-[50%] translate-x-[-50%] z-10 font-dm-sans text-xs flex flex-col items-center animate-pulse`}>
					<p>Scroll to see more</p>
					<MdKeyboardDoubleArrowDown />
				</div>
			</section>
		</Element>
	);
};

export default Hero;
