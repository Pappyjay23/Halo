"use client";

import Hero from "@/components/sections/Hero/Hero";
import Loader from "@/components/ui/Loader";
import Navbar from "@/components/ui/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useState } from "react";
import { Element } from "react-scroll";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
	const [loading, setLoading] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<main className='relative h-screen text-white bg-background'>
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
	);
};

export default Home;
