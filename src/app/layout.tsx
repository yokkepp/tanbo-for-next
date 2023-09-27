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
import {
	Information,
	InformationsContextType,
	SortConditionContextType,
	SortTypeString,
} from "./types";

export const InformationsContext =
	createContext<InformationsContextType | null>(null);

export const SortConditionContext =
	createContext<SortConditionContextType | null>(null);

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	/*------------------------------------------------------------
共通処理はここに記載する。
------------------------------------------------------------*/

	const [informations, setInformations] = useState<Information[]>([]);
	const [sortCondition, setSortCondition] = useState<SortTypeString>("all");

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
					<SortConditionContext.Provider
						value={{ sortCondition, setSortCondition }}>
						<InformationsContext.Provider
							value={{ informations, setInformations }}>
							<Header />
							{children}
						</InformationsContext.Provider>
					</SortConditionContext.Provider>
				</Providers>
			</body>
		</html>
	);
}
