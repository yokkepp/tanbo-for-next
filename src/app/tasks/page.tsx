"use client";
import { Box, Stack, Text } from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import SearchConditionButtons from "../utils/Tasks/SearchConditionButtons";
import CreateTaskList from "@/app/utils/Tasks/CreateTaskList";
import { InformationsContext } from "../layout";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FirebaseInformation } from "../types";

export default function Tasks() {
	const [informations, setInformations]: any = useContext(InformationsContext);
	const [doneList, setDoneList] = useState([]);
	const [notDoneList, setNotDoneList] = useState([]);

	const [quickTitle, setQuickTitle] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	//TODO: useState localInformationsを用意して、informationsをまとめて表示する時も表示形式を変更しておく必要がある。
	//TODO: 検索機能を実装する必要がある。ソート機能を作成して、doneList notDoneListを作成して、それぞれに格納→表示する。
	/** モーダルを表示非表示を切り替える関数です。
	 * @function
	 */
	const handleModalToggle = () => {
		setIsModalOpen(!isModalOpen);
	};

	useEffect(() => {
		//未完了のタスクリストを生成する関数です。
		const notDoneList = informations.filter((info: any) => {
			if (info.done === false) {
				return info;
			}
		});
		setNotDoneList(notDoneList);

		//未完了のタスクリストを生成する関数です。
		const doneList = informations.filter((info: any) => {
			if (info.done === true) {
				return info;
			}
		});
		setDoneList(doneList);
	}, [informations]);

	const handleChangeQuickTitle = (e: any) => {
		setQuickTitle(e.target.value);
	};

	const handleChangeCheckbox = async (id: any) => {
		const newInformations = [...informations];
		setInformations(
			newInformations.map((info) => {
				if (info.id === id) {
					//firebaseのdoneを更新する
					//firebaseの更新対象を選択する。
					const updateRef = doc(db, "informations", id);

					//updateするときは、idは不要なので、削除したものをupdateする
					const updateInformation: FirebaseInformation = {
						...info,
						done: !info.done,
					};
					delete updateInformation.id;
					updateDoc(updateRef, updateInformation);
					return { ...info, done: !info.done };
				} else {
					return info;
				}
			})
		);
	};

	return (
		<>
			<Box w={"100%"} h={"100vh"} pt={"70px"} bg={"gray.900"} px={"20px"}>
				<Stack spacing={6}>
					<SearchConditionButtons
						quickTitle={quickTitle}
						handleChangeQuickTitle={handleChangeQuickTitle}
						handleModalToggle={handleModalToggle}
					/>
					<Box h={"calc(100vh - 160px)"} overflow={"scroll"}>
						<Box
							bg={"gray.800"}
							w={"100%"}
							rounded={"base"}
							p={"20px"}
							mb={"20px"}>
							<Stack spacing={3}>
								<Box>
									<Text textColor={"white"} fontSize={"xl"} w={"25%"}>
										未完了タスク（ {notDoneList.length} 件 ）
									</Text>
								</Box>
								<CreateTaskList
									informationList={notDoneList}
									handleChangeCheckbox={handleChangeCheckbox}
								/>
							</Stack>
						</Box>
						<Box bg={"gray.800"} w={"100%"} rounded={"base"} p={"20px"}>
							<Stack spacing={3}>
								<Box>
									<Text textColor={"white"} fontSize={"xl"} w={"25%"}>
										完了済みタスク（ {doneList.length} 件 ）
									</Text>
								</Box>
								<CreateTaskList
									informationList={doneList}
									handleChangeCheckbox={handleChangeCheckbox}
								/>
							</Stack>
						</Box>
					</Box>
				</Stack>
				<Stack>
					<Stack></Stack>
				</Stack>
				<Stack></Stack>
			</Box>
			<Box></Box>
		</>
	);
}
