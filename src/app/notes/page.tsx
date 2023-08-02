"use client";
import Header from "@/components/Header/Header";
import { Modal } from "@/components/Modal/Modal";
import {
	List,
	UnorderedList,
	Text,
	Box,
	Stack,
	Button,
	Checkbox,
	Heading,
	SimpleGrid,
	border,
	Input,
	Textarea,
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { CommonInformation } from "../types";
import { BgMaskForInput } from "@/components/bgMaskForInput";
import { db } from "../firebase";

import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import { resolve } from "path";

//あらかじめ設定するNoteデータ
const INITIAL_DATA = [
	{
		title: "タイトル1",
		description: "詳細1",
		completedAt: "",
		timeLimit: "",
		planStart: "",
		planEnd: "",
		progress: "",
		notesArchive: "",
		boardName: "",
		boardStatus: "",
		boardsArchive: "",
	},
	{
		title: "タイトル2",
		description: "詳細2",
		completedAt: "",
		timeLimit: "",
		planStart: "",
		planEnd: "",
		progress: "",
		notesArchive: "",
		boardName: "",
		boardStatus: "",
		boardsArchive: "",
	},
	{
		title: "タイトル3",
		description: "詳細3",
		completedAt: "",
		timeLimit: "",
		planStart: "",
		planEnd: "",
		progress: "",
		notesArchive: "",
		boardName: "",
		boardStatus: "",
		boardsArchive: "",
	},
];

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

	//Noteの全データを管理します。
	const [informations, setInformations] = useState([]);

	//レンダリング時にfirebaseからデータを読み込む。
	useEffect(() => {
		const getDataForfirestore = async () => {
			const querySnapshot = await getDocs(collection(db, "informations"));
			const INITIAL_DATA_FOR_FIRESTORE = await [];
			querySnapshot.forEach((doc) => {
				INITIAL_DATA_FOR_FIRESTORE.push({ ...doc.data(), id: doc.id });
			});
			setInformations(INITIAL_DATA_FOR_FIRESTORE);
		};
		getDataForfirestore();
	}, []);
	//TODO: 削除を実行した後に、firebaseを再度読み込む必要がある！useEffect？

	/**
	 *
	 * @param e
	 */
	const handleClickUpdateElement = async (e) => {
		setEditingElement(e.target.id);
		//クリックされた要素だけを編集中のステータスに変更する
		const newEditing = { ...INITIAL_EDITING };
		setIsEditing({ ...newEditing, [e.target.id]: true, all: true });

		console.log(newEditing);
		console.log(editingElement);
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
			const newArray = informations.filter(
				(information) => information.id !== id
			);
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
		// const newInformations = informations.map((info) => {
		// 	if (info.title === editingElement.id) {
		// 		return { [editingElement.id]: editingElement.value };
		// 	} else {
		// 		return info;
		// 	}
		// });
		// setInformations(newInformations);
		// setIsEditing(initialEditing);
		//編集中の要素を把握し、更新する

		//firebaseの更新をする。
		const updateRef = await doc(db, "informations", activeNote.id);

		//updateするときは、idは不要なので、削除したものをupdateする
		const updateInformation = { ...activeNote };
		delete updateInformation.id;

		console.log(updateInformation);
		await updateDoc(updateRef, updateInformation);

		//編集状態を初期化して解除する
		setIsEditing(INITIAL_EDITING);
		console.log("clicked!");
	};

	/**
	 * アクティブ表示されるinformationを選択する関数です。
	 * @param e イベントです。
	 */
	const handleActiveNote = (e) => {
		e.preventDefault();
		console.log(e);
		const newActiveNote = informations.filter(
			(info) => info.id === e.target.id
		);
		console.log({ newActiveNote });
		setActiveNote(newActiveNote[0]);
	};
	//TODO: UIにてNoteを追加されたものをクリックすると、エラーが出る。informationsに反映されてないことが原因か？？

	/**
	 * クリックされた要素を編集する関数です。
	 */
	// const handleUpdateInformation = (e, el) => {
	// 	const;
	// };

	/**編集したい要素を押下した時に発火する関数です。
	 *@param e イベントです。
	 */
	const handleChangeEditingValue = (e: any) => {
		//setActiveNoteに、現在の値を展開して、上書きしていく
		const newActiveNote = { ...activeNote, [editingElement]: e.target.value };

		setActiveNote(newActiveNote);
	};

	return (
		<>
			<Header />
			{isModalOpen ? (
				<Modal
					handleModalToggle={handleModalToggle}
					informations={informations}
					setInformations={setInformations}
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
					w={"55%"}
					bg={"gray.800"}
					h={"100vh"}
					overflow={"scroll"}
					pt={"70px"}
					px={"20px"}
					color={"gray.300"}
					spacing={10}>
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
							<>
								<Textarea
									id='description'
									w={"100%"}
									h={"calc(100vh - 200px)"}
									resize={"none"}
									position={"relative"}
									zIndex={"popover"}
									value={""}
								/>
							</>
						) : (
							<p id='description'>{activeNote.description}</p>
						)}
					</Box>
				</Stack>
				<Stack
					w={"20%"}
					bg={"gray.900"}
					pt={"70px"}
					pb={"50px"}
					px={"20px"}
					color={"gray.300"}
					h={"100vh"}
					overflow={"scroll"}>
					<Stack spacing={6}>
						<SimpleGrid columns={2} spacingY={3}>
							<p>作成日：</p>
							<p>2023/4/10 11:25</p>
							<p>最終更新日：</p>
							<p>2023/4/10 23:54</p>
						</SimpleGrid>
						<Box>
							<Box
								bg={"tealAlpha.900"}
								w={"100%"}
								border={"solid"}
								borderColor={"tealAlpha.900"}
								textAlign={"center"}
								fontWeight={"bold"}
								roundedTop={"5px"}
								color={"gray.900"}>
								Tasks
							</Box>
							<SimpleGrid
								columns={2}
								borderColor={"gray.700"}
								borderTopColor={"tealAlpha.900"}>
								<Box
									p={"10px"}
									borderBottom={"solid"}
									borderLeft={"solid"}
									borderColor={"gray.700"}>
									完了日：
								</Box>
								<Box
									id='completedAt'
									p={"10px"}
									borderBottom={"solid"}
									borderRight={"solid"}
									borderColor={"gray.700"}></Box>
								<Box
									p={"10px"}
									borderBottom={"solid"}
									borderLeft={"solid"}
									borderColor={"gray.700"}>
									期限：
								</Box>
								{isEditing.timeLimit ? (
									<>
										<Input
											id='timeLimit'
											type='datetime-local'
											p={"10px"}
											border={"none"}
											_hover={{ border: "none" }}
											shadow={"none"}
											borderBottom={"solid"}
											borderRight={"solid"}
											borderColor={"gray.700"}
											position={"relative"}
											zIndex={"popover"}
										/>
									</>
								) : (
									<Box
										id='timeLimit'
										p={"10px"}
										borderBottom={"solid"}
										borderRight={"solid"}
										borderColor={"gray.700"}>
										2023/5/15 23:00
									</Box>
								)}

								<Box
									p={"10px"}
									borderBottom={"solid"}
									borderLeft={"solid"}
									borderColor={"gray.700"}>
									開始予定：
								</Box>
								<Box
									id='planStart'
									p={"10px"}
									borderBottom={"solid"}
									borderRight={"solid"}
									borderColor={"gray.700"}>
									2023/5/15 23:00
								</Box>
								<Box
									p={"10px"}
									borderBottom={"solid"}
									borderLeft={"solid"}
									borderColor={"gray.700"}>
									終了予定：
								</Box>
								<Box
									id='planEnd'
									p={"10px"}
									borderBottom={"solid"}
									borderRight={"solid"}
									borderColor={"gray.700"}></Box>
								<Box
									p={"10px"}
									borderBottomLeftRadius={"5px"}
									borderBottom={"solid"}
									borderLeft={"solid"}
									borderColor={"gray.700"}>
									進捗：
								</Box>
								<Box
									id='progress'
									p={"10px"}
									borderBottomRightRadius={"5px"}
									borderBottom={"solid"}
									borderRight={"solid"}
									borderColor={"gray.700"}>
									10％
								</Box>
							</SimpleGrid>
						</Box>
						<Box>
							<Box
								bg={"orangeAlpha.900"}
								w={"100%"}
								border={"solid"}
								borderColor={"orangeAlpha.900"}
								textAlign={"center"}
								fontWeight={"bold"}
								roundedTop={"5px"}
								color={"gray.900"}>
								Notes
							</Box>
							<SimpleGrid
								columns={2}
								borderColor={"gray.700"}
								borderTopColor={"tealAlpha.900"}>
								<Box
									p={"10px"}
									borderBottomLeftRadius={"5px"}
									borderBottom={"solid"}
									borderLeft={"solid"}
									borderColor={"gray.700"}>
									Task完了後：
								</Box>
								<Box
									id='notesArchive'
									p={"10px"}
									borderBottomRightRadius={"5px"}
									borderBottom={"solid"}
									borderRight={"solid"}
									borderColor={"gray.700"}>
									残す
								</Box>
							</SimpleGrid>
						</Box>
						<Box>
							<Box
								bg={"blueAlpha.900"}
								w={"100%"}
								border={"solid"}
								borderColor={"blueAlpha.900"}
								textAlign={"center"}
								fontWeight={"bold"}
								roundedTop={"5px"}
								color={"gray.900"}>
								Boards
							</Box>
							<SimpleGrid columns={2} borderColor={"gray.700"}>
								<Box
									p={"10px"}
									borderBottom={"solid"}
									borderLeft={"solid"}
									borderColor={"gray.700"}>
									ボード名：
								</Box>
								<Box
									id='boardName'
									p={"10px"}
									borderBottom={"solid"}
									borderRight={"solid"}
									borderColor={"gray.700"}>
									xxxプロジェクト
								</Box>
								<Box
									id='boardStatus'
									p={"10px"}
									borderBottom={"solid"}
									borderLeft={"solid"}
									borderColor={"gray.700"}>
									ステータス：
								</Box>
								<Box
									p={"10px"}
									borderBottom={"solid"}
									borderRight={"solid"}
									borderColor={"gray.700"}>
									確認中
								</Box>
								<Box
									id='boardsArchive'
									p={"10px"}
									borderBottomLeftRadius={"5px"}
									borderBottom={"solid"}
									borderLeft={"solid"}
									borderColor={"gray.700"}>
									Task完了後：
								</Box>
								<Box
									p={"10px"}
									borderBottomRightRadius={"5px"}
									borderBottom={"solid"}
									borderRight={"solid"}
									borderColor={"gray.700"}>
									アーカイブ
								</Box>
							</SimpleGrid>
						</Box>
					</Stack>
				</Stack>
			</Box>
		</>
	);
}
