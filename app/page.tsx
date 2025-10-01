"use client";

import CTA from "@/components/sections/CTA/CTA";
import Footer from "@/components/sections/Footer/Footer";
import Hero from "@/components/sections/Hero/Hero";
import Highlights from "@/components/sections/Highlights/Highlights";
import Products from "@/components/sections/Products/Products";
import Specs from "@/components/sections/Specs/Specs";
import Testimonials from "@/components/sections/Testimonials/Testimonials";
import Loader from "@/components/ui/Loader";
import Navbar from "@/components/ui/Navbar";
import gsap from "gsap";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import { useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
	const [loading, setLoading] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);
	const [smoothFailed, setSmoothFailed] = useState(false);

	// Debugging: capture uncaught errors
	useEffect(() => {
		const handleError = (e: ErrorEvent) => {
			console.error("Global error caught:", e.error || e.message);
		};
		const handleRejection = (e: PromiseRejectionEvent) => {
			console.error("Unhandled promise rejection:", e.reason);
		};

		window.addEventListener("error", handleError);
		window.addEventListener("unhandledrejection", handleRejection);

		return () => {
			window.removeEventListener("error", handleError);
			window.removeEventListener("unhandledrejection", handleRejection);
		};
	}, []);

	// Initialize ScrollSmoother *only after* loading is false
	useEffect(() => {
		if (!loading) {
			gsap.registerPlugin(ScrollSmoother);

			const wrapper = document.querySelector("#smooth-wrapper");
			const content = document.querySelector("#smooth-content");

			if (wrapper && content && !ScrollSmoother.get()) {
				try {
					ScrollSmoother.create({
						wrapper,
						content,
						smooth: 2.5, // higher = smoother
						effects: true,
					});
				} catch (err) {
					console.error("ScrollSmoother failed to initialize:", err);
					setSmoothFailed(true);
				}
			} else if (!wrapper || !content) {
				console.warn("ScrollSmoother: missing wrapper/content");
				setSmoothFailed(true);
			}
		}

		// cleanup on unmount or before next effect run
		return () => {
			const smoother = ScrollSmoother.get();
			if (smoother) {
				smoother.kill();
			}
		};
	}, [loading]);

	const content = (
		<main
			className={`relative text-white bg-background${
				smoothFailed ? " w-screen" : ""
			}`}>
			{loading ? (
				<Loader setLoading={setLoading} />
			) : (
				<div className='relative'>
					<Hero loading={loading} isPlaying={isPlaying} />
					<Specs />
					<Highlights />
					<Products />
					<Testimonials />
					<CTA />
					<Footer />
				</div>
			)}
		</main>
	);

	return (
		<>
			{!loading && <Navbar isPlaying={isPlaying} setIsPlaying={setIsPlaying} />}
			{smoothFailed ? (
				content
			) : (
				<div id='smooth-wrapper'>
					<div id='smooth-content'>{content}</div>
				</div>
			)}
		</>
	);
};

export default Home;
