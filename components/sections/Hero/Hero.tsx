import HeadphoneModel3d from "@/components/models/HeadphoneModel";
import React from "react";

const Hero = ({ loading }: { loading: boolean }) => {
	return (
		<section
			style={{
				backgroundImage: "url(/hero-bg.jpg)",
				// backgroundSize: "550%",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
			className={`relative z-10 w-full h-full flex justify-center items-center`}>
			<div className='relative z-10 !bg-transparent'>
				{!loading && <HeadphoneModel3d />}
			</div>

			<div className='absolute top-0 left-0 w-full h-full bg-black opacity-50 z-[2]'></div>
		</section>
	);
};

export default Hero;
