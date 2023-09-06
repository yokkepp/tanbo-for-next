"use client";
import { Box, Stack, Text } from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import SearchConditionButtons from "../utils/Tasks/SearchConditionButtons";
import CreateTaskList from "@/app/utils/Tasks/CreateTaskList";
import { InformationsContext } from "../layout";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Information } from "../types";

export default function Tasks() {
	const contextValue = useContext(InformationsContext);
	if (contextValue) {
	}
	const { informations, setInformations } = useContext(InformationsContext)!;
	const [doneList, setDoneList] = useState<Information[]>([]);
	const [notDoneList, setNotDoneList] = useState<Information[]>([]);

	useEffect(() => {
		//未完了のタスクリストを生成する関数です。
		const notDoneList = informations.filter((info) => {
			if (info.done === false) {
				return info;
			}
		});
		setNotDoneList(notDoneList);

		//未完了のタスクリストを生成する関数です。
		const doneList = informations.filter((info: Information) => {
			if (info.done === true) {
				return info;
			}
		});
		setDoneList(doneList);
	}, [informations]);

	const handleChangeCheckbox = async (id: string) => {
		const newInformations = [...informations];
		setInformations(
			newInformations.map((info) => {
				if (info.id === id) {
					//firebaseのdoneを更新する
					//firebaseの更新対象を選択する。
					const updateRef = doc(db, "informations", id);

					//updateするときは、idは不要なので、削除したものをupdateする
					const updateInformation: Information = {
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
					<SearchConditionButtons />
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
