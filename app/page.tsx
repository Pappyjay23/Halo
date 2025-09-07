"use client";

import Hero from "@/components/sections/Hero/Hero";
import Loader from "@/components/ui/Loader";
import { useState } from "react";

const Home = () => {
	const [loading, setLoading] = useState(true);

	return (
		<main className='relative h-screen text-white bg-background'>
			{loading ? (
				<Loader setLoading={setLoading} />
			) : (
				<div>
					<Hero loading={loading} />
				</div>
			)}
		</main>
	);
};

export default Home;
