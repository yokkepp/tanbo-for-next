"use client";
import { InformationsContextObject } from "../layout";
import { useState, useEffect, useContext } from "react";
import { Modal } from "@/components/Modal/Modal";
import TasksParts from "@/components/TasksParts";
import NotesParts from "@/components/NotesParts";
import BoardsParts from "@/components/BoardsParts";
import { BgMaskForInput } from "@/components/bgMaskForInput";
import { Informations } from "../types";
import {
	Text,
	Box,
	Stack,
	Button,
	Checkbox,
	SimpleGrid,
	Input,
	Textarea,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { db } from "../firebase";
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from "firebase/firestore";

//全てのプロパティの値をfalseにする
const INITIAL_EDITING = {
	title: false,
	description: false,
	completedAt: false,
	timeLimit: false,
	planStart: false,
	planEnd: false,
	progress: false,
	notesArchive: false,
	boardName: false,
	boardStatus: false,
	boardsArchive: false,
	all: false,
};

export default function Notes() {
	//新しいNoteを追加する時のモーダルの表示状態を管理します。
	const [isModalOpen, setIsModalOpen] = useState(false);

	//どの要素が編集中かをオブジェクトで保持するState。
	const [isEditing, setIsEditing] = useState(INITIAL_EDITING);

	//編集中のプロパティ名を管理します。（title, descriptionなど）
	const [editingElement, setEditingElement] = useState("");

	// //Tasksコンポーネントの状態を管理します。
	// const [tasksState, setTasksState] = useState({
	// 	done: false,
	// 	completedAt: "",
	// 	timeLimit: "",
	// 	planStart: "",
	// 	planEnd: "",
	// 	progress: 0,
	// });
	// //Notesコンポーネントの状態を管理します。
	// const [notesState, setNotesState] = useState({
	// 	notesArchive: true,
	// });
	// //Boardsコンポーネントの状態を管理します。
	// const [boardsState, setBoardsState] = useState({
	// 	boardName: "",
	// 	boardStatus: "",
	// 	boardsArchive: true,
	// });

	//1つのデータを管理します。
	const [activeInformation, setActiveInformation] = useState({});

	//全てのデータを管理します。
	const { informations, setInformations } = useContext(
		InformationsContextObject
	);

	/**
	 *モーダル内部の
	 * @param e イベントです。
	 */
	const handleChangeInformation = (e, name) => {
		setActiveInformation((prev) => ({ ...prev, [name]: e.target.value }));
	};

	/**
	 *クリックされた要素だけを編集中のステータスに変更するための関数です。
	 * @param e イベントです。
	 */
	const handleClickUpdateElement = async (e) => {
		//対象のidに設定されたプロパティ名を取得する。
		setEditingElement(e.target.id);
		//一度初期化し、クリックされた要素だけを編集中のステータスに変更する
		const newEditing = { ...INITIAL_EDITING };
		setIsEditing({ ...newEditing, [e.target.id]: true, all: true });
	};

	/**
	 * モーダルを表示非表示を切り替える関数です。
	 */
	const handleModalToggle = () => {
		setIsModalOpen(!isModalOpen);
	};

	/**
	 * informationsから任意のinformationを削除する関数です。
	 * @param e イベントです。
	 */
	const handleDeleteList = (e: any) => {
		e.stopPropagation();
		if (confirm("本当に削除しますか？")) {
			const id = e.target.parentElement.id;
			const newArray = informations.filter((info) => info.id !== id);
			setInformations(newArray);
			setActiveInformation({});
			deleteDoc(doc(db, "informations", id));
		} else {
			alert("キャンセルしました。");
		}
	};

	/**
	 * 編集中以外の要素を押下することで、isEditingを初期化し、値を更新する関数です。
	 */
	const updateSubmit = async () => {
		//firebaseの更新対象を選択する。
		const updateRef = doc(db, "informations", activeInformation.id);

		//updateするときは、idは不要なので、削除したものをupdateする
		const updateInformation = { ...activeInformation };
		delete updateInformation.id;
		await updateDoc(updateRef, updateInformation);

		//informationsを更新してローカルを最新状態にする。
		setInformations((prev) =>
			prev.map((info) => {
				if (info.id === activeInformation.id) {
					return activeInformation;
				} else {
					return info;
				}
			})
		);
		//編集状態を初期化して解除する
		setIsEditing(INITIAL_EDITING);
	};

	/**
	 * 日時の情報を受け取り、表示したいフォーマットにして返却する関数です。（2023-08-03T14:30 → 2023/08/03 14:30）
	 * @param date string型の日時データです。（2023-08-03T14:30 ）
	 */
	const changeDateFormat = (date) => {
		const newDate = new Date(date);
		const year = newDate.getFullYear();
		const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
		const day = newDate.getDate().toString().padStart(2, "0");
		const hours = newDate.getHours().toString().padStart(2, "0");
		const minutes = newDate.getMinutes().toString().padStart(2, "0");
		const dateAndTime = `${year}/${month}/${day} ${hours}:${minutes}`;
		const dateAndTimeInDB = `${year}-${month}-${day}T${hours}:${minutes}`;
		const serialDate = newDate.getTime();
		return { dateAndTime, dateAndTimeInDB, serialDate };
	};

	/**
	 * アクティブ表示されるinformationを選択する関数です。
	 * @param e イベントです。
	 */
	const handleActiveInformation = (e) => {
		const newActiveInformationArray = informations.filter(
			(info) => info.id === e.target.id
		);

		const newActiveInformation: {} = newActiveInformationArray[0];
		setActiveInformation(newActiveInformation);
	};

	/**編集したい要素を押下した時に発火する関数です。
	 *@param e イベントです。
	 */
	const handleChangeEditingValue = (e: any) => {
		setActiveInformation((prev) => ({
			...prev,
			[editingElement]: e.target.value,
		}));
	};

	//PROB:一つのinformationに対して、activeInformation, informations, firebaseのDBの3つを更新している。冗長になっている気がするが他の方法が知りたい。
	const handleChangeCheckbox = async () => {
		//ローカルのdoneを更新する
		setActiveInformation((prev) => ({
			...prev,
			done: !activeInformation.done,
		}));

		const newInformations = [...informations];
		setInformations(
			newInformations.map((info) => {
				if (info.id === activeInformation.id) {
					return { ...activeInformation, done: !activeInformation.done };
				} else {
					return info;
				}
			})
		);

		//firebaseのdoneを更新する
		//firebaseの更新対象を選択する。
		const updateRef = doc(db, "informations", activeInformation.id);

		//updateするときは、idは不要なので、削除したものをupdateする
		const updateInformation = {
			...activeInformation,
			done: !activeInformation.done,
		};
		delete updateInformation.id;
		await updateDoc(updateRef, updateInformation);
	};

	return (
		<>
			{isModalOpen ? (
				<Modal
					handleModalToggle={handleModalToggle}
					activeInformation={activeInformation}
					setActiveInformation={setActiveInformation}
					informations={informations}
					setInformations={setInformations}
					isEditing={isEditing}
					handleChangeInformation={handleChangeInformation}
					changeDateFormat={changeDateFormat}
				/>
			) : null}
			{isEditing.all ? <BgMaskForInput updateSubmit={updateSubmit} /> : null}
			<Box display={"flex"}>
				<Stack
					w={"25%"}
					bg={"gray.900"}
					h={"100vh"}
					overflow={"scroll"}
					pt={"70px"}
					px={"20px"}
					spacing={2}
					justifyContent={"left"}>
					<Button
						colorScheme={"orange"}
						bg={"none"}
						border={"solid"}
						borderColor={"orange.500"}
						textColor={"orange.500"}
						mb={"10px"}
						p={"25px"}
						fontWeight={"bold"}
						_hover={{
							color: "gray.900",
							backgroundColor: "orange.500",
						}}
						onClick={handleModalToggle}>
						Noteを追加する
					</Button>
					{informations.map((info) => {
						if (info.id === activeInformation.id) {
							return (
								<Button
									key={info.id}
									id={info.id}
									justifyContent={"space-between"}
									colorScheme={"orange"}
									h={"50px"}
									p={"10px"}
									bg={"orangeAlpha.900"}
									onClick={(e) => handleActiveInformation(e)}>
									<Box
										overflow={"hidden"}
										textOverflow={"ellipsis"}
										pointerEvents={"none"}
										w={"100%"}
										textAlign={"left"}>
										{activeInformation.title}
									</Box>

									<Box
										w={"35px"}
										h={"35px"}
										borderRadius={"5px"}
										p={"5px"}
										transition={"ease 0.2s"}
										_hover={{
											color: "orangeAlpha.900",
											bg: "gray.200",
										}}
										onClick={(e) => handleDeleteList(e)}>
										<DeleteIcon
											alignItems={"center"}
											justifyItems={"center"}
											fontSize={"xl"}
											pointerEvents={"none"}
										/>
									</Box>
								</Button>
							);
						} else {
							return (
								<Button
									key={info.id}
									id={info.id}
									justifyContent={"space-between"}
									colorScheme={"orange"}
									h={"50px"}
									p={"10px"}
									bg={"orangeAlpha.200"}
									onClick={(e) => handleActiveInformation(e)}>
									<Box
										overflow={"hidden"}
										textOverflow={"ellipsis"}
										pointerEvents={"none"}
										w={"100%"}
										textAlign={"left"}>
										{info.title}
									</Box>

									<Box
										w={"35px"}
										h={"35px"}
										borderRadius={"5px"}
										p={"5px"}
										transition={"ease 0.2s"}
										_hover={{
											color: "orangeAlpha.900",
											bg: "gray.200",
										}}
										onClick={(e) => handleDeleteList(e)}>
										<DeleteIcon
											alignItems={"center"}
											justifyItems={"center"}
											fontSize={"xl"}
											pointerEvents={"none"}
										/>
									</Box>
								</Button>
							);
						}
					})}
				</Stack>
				<Stack
					w={"45%"}
					bg={"gray.800"}
					h={"100vh"}
					overflow={"scroll"}
					pt={"70px"}
					px={"20px"}
					color={"gray.300"}
					spacing={10}>
					{Object.keys(activeInformation).length ? (
						<>
							<Box display={"flex"}>
								<Checkbox
									isChecked={activeInformation.done}
									variant={"circular"}
									colorScheme={"teal"}
									size={"lg"}
									mr={"15px"}
									onChange={handleChangeCheckbox}></Checkbox>
								{isEditing.title ? (
									<Input
										id='title'
										fontSize='3xl'
										fontWeight={"bold"}
										border={"none"}
										value={activeInformation.title}
										position={"relative"}
										onChange={(e) => handleChangeEditingValue(e)}
										zIndex={"popover"}
									/>
								) : (
									<Text
										id='title'
										fontSize='3xl'
										fontWeight={"bold"}
										display={"block"}
										w={"100%"}
										onClick={(e) => handleClickUpdateElement(e)}>
										{activeInformation.title}
									</Text>
								)}
							</Box>
							<Box whiteSpace={"pre-wrap"}>
								{isEditing.description ? (
									<Textarea
										id='description'
										w={"100%"}
										h={"calc(100vh - 200px)"}
										resize={"none"}
										position={"relative"}
										zIndex={"popover"}
										onChange={(e) => handleChangeEditingValue(e)}
										value={activeInformation.description}
									/>
								) : (
									<Text
										id='description'
										w={"100%"}
										h={"calc(100vh - 200px)"}
										onClick={(e) => handleClickUpdateElement(e)}>
										{activeInformation.description}
									</Text>
								)}
							</Box>
						</>
					) : (
						<Box
							display={"flex"}
							h={"100vh"}
							justifyContent={"center"}
							alignItems={"center"}>
							<Text>Noteが選択されていません。</Text>
						</Box>
					)}
				</Stack>
				<Stack
					w={"30%"}
					bg={"gray.900"}
					pt={"70px"}
					pb={"50px"}
					px={"20px"}
					color={"gray.300"}
					h={"100vh"}
					overflow={"scroll"}>
					{Object.keys(activeInformation).length ? (
						<Stack spacing={6}>
							<SimpleGrid columns={2} spacingY={3}>
								<p>作成日：</p>
								<p>{activeInformation.createdAt}</p>
								<p>最終更新日：</p>
								<p>2023/4/10 23:54</p>
							</SimpleGrid>
							<TasksParts
								isEditing={isEditing}
								activeInformation={activeInformation}
								handleChangeEditingValue={handleChangeEditingValue}
								handleClickUpdateElement={handleClickUpdateElement}
								changeDateFormat={changeDateFormat}
							/>
							<NotesParts />
							<BoardsParts />
						</Stack>
					) : (
						<></>
					)}
				</Stack>
			</Box>
		</>
	);
}
