"use Client";
import React, { MouseEvent, useContext, useState } from "react";
import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import {
	Checkbox,
	CircularProgress,
	CircularProgressLabel,
	Input,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { InformationsContext } from "@/app/layout";
import { Information } from "@/app/types";
import { INITIAL_INFORMATION } from "@/app/consts/initial";

/**
 * doneListまたはnotDoneListを引数に渡すことで、リストを生成するコンポーネントです。
 * @param informationList Tasks画面にてリスト表示させたいinformationの配列です。
 * @returns
 */
export default function CreateTaskList({
	informationList,
	handleChangeCheckbox,
}: any) {
	const { informations, setInformations } = useContext(InformationsContext)!;

	/**
	 * informationsから任意のinformationを削除する関数です。
	 * @param e イベントです。
	 */
	const handleDeleteList = async (id: string) => {
		if (confirm("本当に削除しますか？")) {
			const newArray = await informations.filter(
				(info: Information) => info.id !== id
			);
			setInformations(newArray);
			deleteDoc(doc(db, "informations", id));
		} else {
			alert("キャンセルしました。");
		}
	};

	const [editingState, setEditingState] = useState<{
		id: string;
		prop: string;
		value: string;
	}>({
		id: "",
		prop: "",
		value: "",
	});
	//TODO: 各項目をクリックすると、編集することができる。

	const handleChangeEditingValue = (e: any, id: string, prop: string) => {
		setEditingState({ id, prop, value: e.target.value });
	};

	const handleClick = (
		e: MouseEvent<HTMLInputElement>,
		id: string,
		prop: string
	) => {
		setEditingState({ id, prop, value: e.currentTarget.value });
	};

	/**
	 * フォーカスが外れた時に、firebaseとinformationsを更新する関数です。
	 */
	const handleBlurUpdateEditingValue = async () => {
		//■firebaseのInformationsを更新
		const informationCollection = collection(db, "informations");
		const updateRef = doc(informationCollection, editingState.id);
		const newInformation: Information | undefined = informations.find(
			(info: Information) => info.id === editingState.id
		);

		if (newInformation) {
			const updateInformation: Information = {
				...newInformation,
				[editingState.prop]: editingState.value,
			};
			//updateするときは、idは不要なので、削除したものをupdateする
			delete updateInformation.id;
			await updateDoc(updateRef, updateInformation);
		}
		//■ローカルのInformationsを更新
		setInformations((infos: Information[]) =>
			infos.map((info) => {
				if (info.id === editingState.id) {
					return { ...info, [editingState.prop]: editingState.value };
				} else {
					return info;
				}
			})
		);
		//■初期化
		setEditingState({ id: "", prop: "", value: "" });
	};

	return (
		<TableContainer rounded={"base"} color={"white"} bg={"gray.900"}>
			<Table variant='simple'>
				<Thead bg={"gray.700"}>
					<Tr>
						<Th textColor={"white"} width={"70px"}></Th>
						<Th textColor={"white"} w={"180px"}>
							作成日
						</Th>
						<Th textColor={"white"} w={"2px"}>
							タイトル
						</Th>
						<Th textColor={"white"} w={"80px"}>
							詳細
						</Th>
						<Th textColor={"white"} w={"180px"}>
							開始予定
						</Th>
						<Th textColor={"white"} w={"80px"}>
							終了予定
						</Th>
						<Th textColor={"white"} isNumeric>
							進捗率(%)
						</Th>
						<Th textColor={"white"}></Th>
					</Tr>
				</Thead>
				<Tbody>
					{informationList.map((info: any) => {
						return (
							<Tr key={info.id} id={info.id}>
								<Td textColor={"white"}>
									<Checkbox
										isChecked={info.done}
										onChange={() => handleChangeCheckbox(info.id)}
										variant={"circular"}
										colorScheme='teal'
										size={"lg"}></Checkbox>
								</Td>
								<Td textColor={"white"}>{info.createdAt}</Td>
								<Td textColor={"white"}>
									{editingState.id !== info.id ? (
										<Input
											type='text'
											value={info.title}
											border={"none"}
											isReadOnly={true}
											p={"0"}
											onClick={(e) => handleClick(e, info.id, "title")}
										/>
									) : (
										<Input
											type='text'
											value={editingState.value}
											onChange={(e) =>
												handleChangeEditingValue(e, info.id, "title")
											}
											onBlur={handleBlurUpdateEditingValue}
											border={"none"}
											p={"0"}
											_focus={{ outline: "none", boxShadow: "none" }}
										/>
									)}
								</Td>
								<Td textColor={"white"}>
									<button>
										<CopyIcon boxSize={"6"} />
									</button>
								</Td>
								<Td textColor={"white"}>
									{editingState.id !== info.id ? (
										<Input
											type='date'
											value={info.planStart}
											border={"none"}
											isReadOnly={true}
											p={"0"}
											onClick={(e) => handleClick(e, info.id, "planStart")}
										/>
									) : (
										<Input
											value={editingState.value}
											onChange={(e) =>
												handleChangeEditingValue(e, info.id, "planStart")
											}
											onBlur={handleBlurUpdateEditingValue}
											border={"none"}
											p={"0"}
											_focus={{ outline: "none", boxShadow: "none" }}
										/>
									)}
								</Td>
								<Td textColor={"white"}>{info.planEnd}</Td>
								<Td
									textColor={"white"}
									isNumeric
									onClick={() => alert("onClick")}>
									<CircularProgress value={info.progress} color='teal.400'>
										<CircularProgressLabel>
											{info.progress}%
										</CircularProgressLabel>
									</CircularProgress>
								</Td>
								<Td textColor={"white"}>
									<button onClick={() => handleDeleteList(info.id)}>
										<DeleteIcon boxSize={"5"} />
									</button>
								</Td>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
