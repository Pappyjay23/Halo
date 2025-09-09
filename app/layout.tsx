import type { Metadata } from "next";
import {
	DM_Sans,
	Geist_Mono,
	Manrope,
	Plus_Jakarta_Sans,
} from "next/font/google";

import { Toaster } from "sonner";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
	variable: "--font-plus-jakarta-sans",
	subsets: ["latin"],
});

const manrope = Manrope({
	variable: "--font-manrope",
	subsets: ["latin"],
});

const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Halo — Premium Headphones",
	description:
		"Halo headphones deliver immersive sound, premium design, and next-level comfort. Redefine how you listen—experience Halo today.",

	openGraph: {
		title: "Halo — Premium Headphones",
		description:
			"Discover Halo headphones: immersive sound, premium design, and ultimate comfort. Redefine your listening experience.",
		url: "https://yourdomain.com", // update to actual domain
		siteName: "Halo",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Halo Headphones",
			},
		],
		locale: "en_US",
		type: "website",
	},

	twitter: {
		card: "summary_large_image",
		title: "Halo — Premium Headphones",
		description:
			"Premium sound. Iconic design. Meet Halo headphones—the ultimate way to experience music.",
		images: ["/og-image.png"],
	},

	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistMono.variable} ${dmSans.variable} ${manrope.variable} ${plusJakartaSans.variable} antialiased`}>
				{children}
				<Toaster
					position='top-center'
					toastOptions={{
						style: {
							background: "transparent",
							border: "none",
							boxShadow: "none",
						},
					}}
				/>
			</body>
		</html>
	);
}
