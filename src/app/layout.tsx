// app/layout.tsx
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
				<Header />
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
