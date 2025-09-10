"use client";

import Hero from "@/components/sections/Hero/Hero";
import Highlights from "@/components/sections/Highlights/Highlights";
import Specs from "@/components/sections/Specs/Specs";
import Loader from "@/components/ui/Loader";
import Navbar from "@/components/ui/Navbar";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { useEffect, useState } from "react";

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
		<>
			{!loading && <Navbar isPlaying={isPlaying} setIsPlaying={setIsPlaying} />}

			<div id='smooth-wrapper'>
				<div id='smooth-content'>
					<main className='relative text-white bg-background'>
						{loading ? (
							<Loader setLoading={setLoading} />
						) : (
							<div className='relative'>
								<Hero loading={loading} isPlaying={isPlaying} />
								<Specs />
								<Highlights />
							</div>
						)}
					</main>
				</div>
			</div>
		</>
	);
};

export default Home;
