"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
	OrbitControls,
	useGLTF,
	Environment,
	ContactShadows,
	Float,
	Preload,
} from "@react-three/drei";
import { useRef } from "react";
import type * as THREE from "three";

const HeadphoneModel = () => {
	const { scene } = useGLTF("/models/halo-model.glb");

	const modelRef = useRef<THREE.Group>(null);

	useFrame((state) => {
		if (modelRef.current) {
			modelRef.current.rotation.y += 0.005; // Slow, premium rotation
			// Subtle floating animation
			modelRef.current.position.y =
				Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
		}
	});

	return (
		<Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
			<primitive
				ref={modelRef}
				object={scene}
				scale={3}
				position={[0, -1, 0]}
			/>
		</Float>
	);
};

const HeadphoneModel3d = () => {
	return (
		<div className='w-full h-[50vh] my-auto relative !bg-transparent'>
			<Canvas
				className='w-full h-full cursor-pointer threed-canvas !bg-transparent'
				camera={{
					position: [0, 0, 8],
					fov: 45,
					near: 0.1,
					far: 1000,
				}}
				gl={{
					antialias: true,
					alpha: true,
					powerPreference: "high-performance", // Performance optimization
				}}
				dpr={[1, 2]} // Responsive pixel ratio for performance
			>
				<ambientLight intensity={0.2} color='#FFFFFF' />

				{/* Key light with HALO blue tint */}
				<directionalLight
					position={[10, 10, 5]}
					intensity={1.2}
					color='#00BFFF'
					castShadow
					shadow-mapSize={[2048, 2048]}
				/>

				{/* Fill light */}
				<directionalLight
					position={[-5, 5, -5]}
					intensity={0.5}
					color='#FFFFFF'
				/>

				{/* Rim light for premium edge lighting */}
				<spotLight
					position={[0, 10, -10]}
					angle={0.3}
					penumbra={0.5}
					intensity={0.8}
					color='#00FFC6'
					castShadow
				/>

				<Environment preset='studio' />

				{/* <ContactShadows
					position={[0, -2, 0]}
					opacity={0.3}
					scale={10}
					blur={2}
					far={4}
					color='#0A0A0A'
				/> */}

				<OrbitControls
					enableZoom={false}
					enablePan={false}
					autoRotate={false}
					enableDamping={true}
					dampingFactor={0.05}
					minPolarAngle={Math.PI / 3}
					maxPolarAngle={Math.PI / 1.5}
				/>

				<Preload all />

				<HeadphoneModel />
			</Canvas>
		</div>
	);
};

useGLTF.preload("/models/halo-model.glb");

export default HeadphoneModel3d;
