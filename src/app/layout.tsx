"use client";
import Header from "@/components/Header";
import { Providers } from "./providers";
import { useState, useEffect, createContext } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { LocalInformation, FirebaseInformation } from "./types";
import { changeDateFormat } from "./utils/common/functions";

export const InformationsContext = createContext<
	FirebaseInformation[] | undefined
>(undefined);

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	/*------------------------------------------------------------
共通処理はここに記載する。
------------------------------------------------------------*/

	const [informations, setInformations]: any = useState<FirebaseInformation[]>(
		[]
	);

	//レンダリング時にfirebaseからデータを読み込む。
	useEffect(() => {
		const infoData = collection(db, "informations");
		getDocs(infoData).then((result) => {
			const INITIAL_DATA: any[] = [];
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
					<InformationsContext.Provider value={[informations, setInformations]}>
						<Header />
						{children}
					</InformationsContext.Provider>
				</Providers>
			</body>
		</html>
	);
}
