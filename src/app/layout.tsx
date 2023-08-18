"use client";
import Header from "@/components/Header/Header";
import { Providers } from "./providers";
import { useState, createContext, useEffect } from "react";
import { db } from "./firebase";
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import { LocalInformation, FirebaseInformation } from "./types";
export const InformationsContextObject = createContext<
	StateContextType | undefined
>(undefined);

interface StateContextType {
	informations: FirebaseInformation[];
	setInformations: React.Dispatch<React.SetStateAction<never[]>>;
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [informations, setInformations] = useState([]);

	//レンダリング時にfirebaseからデータを読み込む。
	useEffect(() => {
		const infoData = collection(db, "informations");
		getDocs(infoData).then((result) => {
			const INITIAL_DATA: any = [];
			result.forEach((doc) => {
				INITIAL_DATA.push({ ...doc.data(), id: doc.id });
			});
			setInformations(INITIAL_DATA);
		});
	}, []);
	return (
		<html lang='ja'>
			<body>
				<Providers>
					<InformationsContextObject.Provider
						value={{ informations, setInformations }}>
						<Header />
						{children}
					</InformationsContextObject.Provider>
				</Providers>
			</body>
		</html>
	);
}
