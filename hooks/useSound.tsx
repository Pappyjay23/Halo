"use client";

import { useCallback, useRef, useState, useEffect } from "react";

export function useSound(src: string, volume = 0.5, loop = false) {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Create audio element
		const audio = new Audio();
		audio.volume = volume;
		audio.preload = "auto";
		audio.loop = loop;

		// Handle successful loading
		const handleCanPlay = () => {
			setIsLoaded(true);
			setError(null);
		};

		// Handle loading errors
		const handleError = (e: Event) => {
			setError(`Audio file not found: ${src}`);
			setIsLoaded(false);
			console.warn("Audio loading failed:", src);
		};

		// Add event listeners
		audio.addEventListener("canplaythrough", handleCanPlay);
		audio.addEventListener("error", handleError);

		// Set source and try to load
		audio.src = src;

		audioRef.current = audio;

		// Cleanup
		return () => {
			audio.removeEventListener("canplaythrough", handleCanPlay);
			audio.removeEventListener("error", handleError);
		};
	}, [src, volume, loop]);

	// Fallback: Create a synthetic beep sound using Web Audio API
	const createSyntheticSound = useCallback(() => {
		try {
			const audioContext = new window.AudioContext();
			const oscillator = audioContext.createOscillator();
			const gainNode = audioContext.createGain();

			oscillator.connect(gainNode);
			gainNode.connect(audioContext.destination);

			oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // 800Hz tone
			oscillator.type = "sine";

			gainNode.gain.setValueAtTime(0, audioContext.currentTime);
			gainNode.gain.linearRampToValueAtTime(
				volume * 0.3,
				audioContext.currentTime + 0.01
			);
			gainNode.gain.exponentialRampToValueAtTime(
				0.001,
				audioContext.currentTime + 0.1
			);

			oscillator.start(audioContext.currentTime);
			oscillator.stop(audioContext.currentTime + 0.1);
		} catch (err) {
			console.warn("Web Audio API not supported");
		}
	}, [volume]);

	const play = useCallback(async () => {
		if (audioRef.current && isLoaded && !error) {
			try {
				audioRef.current.currentTime = 0;
				await audioRef.current.play();
			} catch (err) {
				console.error("Error playing sound:", err);
				// Fallback to synthetic sound
				createSyntheticSound();
			}
		} else {
			// Use synthetic sound as fallback when audio file is not available
			createSyntheticSound();
		}
	}, [isLoaded, error, createSyntheticSound]);

	const stop = useCallback(() => {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
		}
	}, []);

	return { play, stop, isLoaded: isLoaded || true, error }; // Always show as loaded since we have fallback
}
