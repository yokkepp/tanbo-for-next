"use client";
import { Box, Stack, Text } from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import SearchConditionButtons from "../utils/Tasks/SearchConditionButtons";
import CreateTaskList from "@/app/utils/Tasks/CreateTaskList";
import { InformationsContext } from "../layout";

export default function Tasks() {
	const [informations]: any = useContext(InformationsContext);
	const [doneList, setDoneList] = useState([]);
	const [notDoneList, setNotDoneList] = useState([]);
	const [localInformations, setLocalInformations] = useState([]);
	const [sortCondition, setSortCondition] = useState(""); //TODO:どの条件で入れる？？
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
										未完了タスク
									</Text>
								</Box>
								<CreateTaskList informationList={notDoneList} />
							</Stack>
						</Box>
						<Box bg={"gray.800"} w={"100%"} rounded={"base"} p={"20px"}>
							<Stack spacing={3}>
								<Box>
									<Text textColor={"white"} fontSize={"xl"} w={"25%"}>
										完了済みタスク
									</Text>
								</Box>
								<CreateTaskList informationList={doneList} />
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
