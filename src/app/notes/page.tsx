"use client";
import { Modal } from "@/components/Modal/Modal";
import TasksParts from "@/components/TasksParts";
import NotesParts from "@/components/NotesParts";
import BoardsParts from "@/components/BoardsParts";
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
import { useState, useEffect, useContext } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { BgMaskForInput } from "@/components/bgMaskForInput";
import { InformationsContextObject } from "../layout";
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

	//Tasksコンポーネントの状態を管理します。
	const [tasksState, setTasksState] = useState({
		completedAt: "",
		timeLimit: "",
		planStart: "",
		planEnd: "",
		progress: 0,
	});
	//Notesコンポーネントの状態を管理します。
	const [notesState, setNotesState] = useState({
		notesArchive: true,
	});
	//Boardsコンポーネントの状態を管理します。
	const [boardsState, setBoardsState] = useState({
		boardName: "",
		boardStatus: "",
		boardsArchive: true,
	});
	//表示されるNoteを管理します。
	const [activeNote, setActiveNote] = useState({});

	//1つのNoteのデータを管理します。
	const [information, setInformation] = useState({});

	/**
	 *モーダル内部の
	 * @param e イベントです。
	 */
	const handleChangeInformation = (e, name) => {
		e.preventDefault();
		console.log(e);
		setInformation((prev) => ({ ...prev, [name]: e.target.value }));
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
			setActiveNote({});
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
		const updateRef = doc(db, "informations", activeNote.id);

		//updateするときは、idは不要なので、削除したものをupdateする
		const updateInformation = { ...activeNote };
		delete updateInformation.id;
		await updateDoc(updateRef, updateInformation);

		//informationsを更新してローカルを最新状態にする。
		setInformations((prevInformations) =>
			prevInformations.map((info) => {
				if (info.id === activeNote.id) {
					return activeNote;
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
	const handleActiveNote = (e) => {
		e.preventDefault();
		const newActiveNoteArray = informations.filter(
			(info) => info.id === e.target.id
		);

		const newActiveNote: {} = newActiveNoteArray[0];
		setActiveNote(newActiveNote);
	};

	/**編集したい要素を押下した時に発火する関数です。
	 *@param e イベントです。
	 */
	const handleChangeEditingValue = (e: any) => {
		setActiveNote((prev) => ({ ...prev, [editingElement]: e.target.value }));
	};

	//TODO: 通信環境によって、取得できない時がある。失敗時と成功時の処理を各必要がありそう？

	const { informations, setInformations } = useContext(
		InformationsContextObject
	);

	return (
		<>
			{isModalOpen ? (
				<Modal
					handleModalToggle={handleModalToggle}
					information={information}
					setInformation={setInformation}
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
					{/* TODO:setInformationsをチェックして、idが必ず設定されるか確認する！ */}
					{informations.map((info, index) => {
						console.log(index, info.id);
						if (info.id === activeNote.id) {
							return (
								<Button
									key={info.id}
									id={info.id}
									justifyContent={"space-between"}
									colorScheme={"orange"}
									h={"50px"}
									p={"10px"}
									bg={"orangeAlpha.900"}
									onClick={(e) => handleActiveNote(e)}>
									<Box
										overflow={"hidden"}
										textOverflow={"ellipsis"}
										pointerEvents={"none"}
										w={"100%"}
										textAlign={"left"}>
										{activeNote.title}
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
									onClick={(e) => handleActiveNote(e)}>
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
					{Object.keys(activeNote).length ? (
						<>
							<Box display={"flex"}>
								<Checkbox colorScheme='teal' size={"lg"} mr={"15px"}></Checkbox>
								{isEditing.title ? (
									<Input
										id='title'
										fontSize='3xl'
										fontWeight={"bold"}
										border={"none"}
										value={activeNote.title}
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
										{activeNote.title}
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
										value={activeNote.description}
									/>
								) : (
									<Text
										id='description'
										w={"100%"}
										h={"calc(100vh - 200px)"}
										onClick={(e) => handleClickUpdateElement(e)}>
										{activeNote.description}
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
					{Object.keys(activeNote).length ? (
						<Stack spacing={6}>
							<SimpleGrid columns={2} spacingY={3}>
								<p>作成日：</p>
								<p>{activeNote.createdAt}</p>
								<p>最終更新日：</p>
								<p>2023/4/10 23:54</p>
							</SimpleGrid>
							<TasksParts
								isEditing={isEditing}
								activeNote={activeNote}
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
