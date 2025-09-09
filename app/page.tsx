"use client";

import Hero from "@/components/sections/Hero/Hero";
import Loader from "@/components/ui/Loader";
import Navbar from "@/components/ui/Navbar";
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import { useEffect, useState } from "react";
import { Element } from "react-scroll";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
	const [loading, setLoading] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		gsap.registerPlugin(ScrollSmoother);

		// Prevent multiple instances
		if (!ScrollSmoother.get()) {
			ScrollSmoother.create({
				wrapper: "#smooth-wrapper",
				content: "#smooth-content",
				smooth: 2.5, // higher = smoother
				effects: true,
			});
		}
	}, []);

	return (
		<div id='smooth-wrapper'>
			<div id='smooth-content'>
				<main className='relative text-white bg-background'>
					{loading ? (
						<Loader setLoading={setLoading} />
					) : (
						<div>
							<Navbar isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
							<Hero loading={loading} isPlaying={isPlaying} />
							<Element
								name='specs'
								id='specs'
								className='min-h-screen bg-background w-full'
							/>
						</div>
					)}
				</main>
			</div>
		</div>
	);
};

export default Home;
