"use Client";
import React, { ChangeEvent, MouseEvent, useContext, useState } from "react";
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
import { InformationsContext, SortConditionContext } from "@/app/layout";
import {
	Information,
	InformationsContextType,
	SortConditionContextType,
} from "@/app/types";

/**
 * doneListまたはnotDoneListを引数に渡すことで、リストを生成するコンポーネントです。
 * @param informationList Tasks画面にてリスト表示させたいinformationの配列です。
 * @returns
 */
export default function CreateTaskList({
	informationList,
	handleChangeCheckbox,
}: {
	informationList: Information[];
	handleChangeCheckbox: (id: string) => Promise<void>;
}) {
	const { informations, setInformations }: InformationsContextType =
		useContext(InformationsContext)!;

	const { sortCondition, setSortCondition }: SortConditionContextType =
		useContext(SortConditionContext)!;

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

	const handleChangeEditingValue = (
		e: ChangeEvent<HTMLInputElement>,
		id: string,
		prop: string
	) => {
		setEditingState({ id, prop, value: e.target.value });
	};

	const handleClick = (
		e: MouseEvent<HTMLInputElement | HTMLDivElement>,
		id: string,
		prop: string
	) => {
		let value = "";
		if (e.currentTarget instanceof HTMLInputElement) {
			value = e.currentTarget.value;
		}
		setEditingState({ id, prop, value: value });
	};

	/**
	 * フォーカスが外れた時に、firebaseとinformationsを更新する関数です。
	 */
	const handleBlurUpdateEditingValue: any = async (id: string) => {
		if (editingState.value === "" && editingState.prop === "title") {
			alert("空欄では保存できません");
		}

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
		<TableContainer
			rounded={"base"}
			color={"white"}
			bg={"gray.900"}
			overflowX={"auto"}>
			<Table variant='simple' layout='fixed'>
				<Thead bg={"gray.700"}>
					<Tr>
						<Th textColor={"white"} w={"70px"}></Th>
						<Th textColor={"white"}>作成日</Th>
						<Th textColor={"white"}>タイトル</Th>
						<Th textColor={"white"} w={"70px"}>
							詳細
						</Th>
						<Th textColor={"white"}>期限</Th>
						<Th textColor={"white"}>開始予定</Th>
						<Th textColor={"white"}>終了予定</Th>
						<Th textColor={"white"} w={"70px"} isNumeric>
							進捗率(%)
						</Th>
						<Th textColor={"white"} w={"70px"}></Th>
					</Tr>
				</Thead>
				<Tbody>
					{informationList.map((info) => (
						<Tr key={info.id} id={info.id}>
							<Td textColor={"white"}>
								<Checkbox
									isChecked={info.done}
									onChange={() => handleChangeCheckbox(info.id!)}
									variant={"circular"}
									colorScheme='teal'
									size={"lg"}></Checkbox>
							</Td>
							<Td textColor={"white"}>{info.createdAt}</Td>
							<Td textColor={"white"}>
								{editingState.id === info.id &&
								editingState.prop === "title" ? (
									<Input
										type='text'
										value={editingState.value}
										autoFocus
										isRequired
										onChange={(e) =>
											handleChangeEditingValue(e, info.id!, "title")
										}
										onBlur={handleBlurUpdateEditingValue}
										border={"none"}
										p={"0"}
										_focus={{ outline: "none", boxShadow: "none" }}
									/>
								) : (
									<Input
										type='text'
										value={info.title}
										border={"none"}
										isReadOnly={true}
										autoFocus
										isRequired
										p={"0"}
										onClick={(e) => handleClick(e, info.id!, "title")}
									/>
								)}
							</Td>
							<Td textColor={"white"}>
								<button>
									<CopyIcon boxSize={"6"} />
								</button>
							</Td>
							<Td textColor={"white"}>
								{editingState.id === info.id &&
								editingState.prop === "timeLimit" ? (
									<Input
										type='datetime-local'
										value={editingState.value}
										onChange={(e) =>
											handleChangeEditingValue(e, info.id!, "timeLimit")
										}
										onBlur={handleBlurUpdateEditingValue}
										border={"none"}
										p={"0"}
										_focus={{ outline: "none", boxShadow: "none" }}
									/>
								) : (
									<Input
										type='datetime-local'
										value={info.timeLimit}
										border={"none"}
										isReadOnly={true}
										p={"0"}
										onClick={(e) => handleClick(e, info.id!, "timeLimit")}
									/>
								)}
							</Td>
							<Td textColor={"white"}>
								{editingState.id === info.id &&
								editingState.prop === "planStart" ? (
									<Input
										type='datetime-local'
										value={editingState.value}
										onChange={(e) =>
											handleChangeEditingValue(e, info.id!, "planStart")
										}
										onBlur={handleBlurUpdateEditingValue}
										border={"none"}
										p={"0"}
										_focus={{ outline: "none", boxShadow: "none" }}
									/>
								) : (
									<Input
										type='datetime-local'
										value={info.planStart}
										border={"none"}
										isReadOnly={true}
										p={"0"}
										onClick={(e) => handleClick(e, info.id!, "planStart")}
									/>
								)}
							</Td>
							<Td textColor={"white"}>
								{editingState.id === info.id &&
								editingState.prop === "planEnd" ? (
									<Input
										type='datetime-local'
										value={editingState.value}
										onChange={(e) =>
											handleChangeEditingValue(e, info.id!, "planEnd")
										}
										onBlur={handleBlurUpdateEditingValue}
										border={"none"}
										p={"0"}
										_focus={{ outline: "none", boxShadow: "none" }}
									/>
								) : (
									<Input
										type='datetime-local'
										value={info.planEnd}
										border={"none"}
										isReadOnly={true}
										p={"0"}
										onClick={(e) => handleClick(e, info.id!, "planEnd")}
									/>
								)}
							</Td>
							<Td
								textColor={"white"}
								isNumeric
								onClick={() => console.log("HELLO")}>
								{editingState.id === info.id &&
								editingState.prop === "progress" ? (
									<Input
										onBlur={handleBlurUpdateEditingValue}
										type='number'
										autoFocus
										min={0}
										max={100}
										value={editingState.value}
										border={"none"}
										textAlign={"center"}
										p={"0"}
										onChange={(e) =>
											handleChangeEditingValue(e, info.id!, "progress")
										}
									/>
								) : (
									<CircularProgress value={info.progress} color='teal.400'>
										<CircularProgressLabel
											onClick={(e) => handleClick(e, info.id!, "progress")}>
											{info.progress}%
										</CircularProgressLabel>
									</CircularProgress>
								)}
							</Td>
							<Td textColor={"white"}>
								<button onClick={() => handleDeleteList(info.id!)}>
									<DeleteIcon boxSize={"5"} />
								</button>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
