"use client";
import Header from "@/components/Header/Header";
import { Providers } from "./providers";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='ja'>
			<body>
				<Providers>
					<Header />
					{children}
				</Providers>
			</body>
		</html>
	);
}
