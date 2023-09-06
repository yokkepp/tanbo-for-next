"use client";
import Header from "@/components/Header";
import { Providers } from "./providers";
import React, {
	useState,
	useEffect,
	createContext,
	Dispatch,
	SetStateAction,
} from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { changeDateFormat } from "./utils/common/functions";
import { Information } from "./types";

export const InformationsContext = createContext<{
	informations: Information[];
	setInformations: Dispatch<SetStateAction<Information[]>>;
} | null>(null);

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	/*------------------------------------------------------------
共通処理はここに記載する。
------------------------------------------------------------*/

	const [informations, setInformations] = useState<Information[]>([]);

	//レンダリング時にfirebaseからデータを読み込む。
	useEffect(() => {
		const infoData = collection(db, "informations");
		getDocs(infoData).then((result) => {
			const INITIAL_DATA: any = [];
			result.forEach((doc) => {
				INITIAL_DATA.push({
					...doc.data(),
					id: doc.id,
					createdAt: changeDateFormat(doc.data().createdAt.toString())
						.dateAndTime,
				});
			});
			setInformations(INITIAL_DATA);
		});
	}, []);

	return (
		<html lang='ja'>
			<body>
				<Providers>
					<InformationsContext.Provider
						value={{ informations, setInformations }}>
						<Header />
						{children}
					</InformationsContext.Provider>
				</Providers>
			</body>
		</html>
	);
}
