"use client";
import { Box, Stack, Button, SimpleGrid } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { Modal } from "@/components/Modal";
import ActiveNote from "@/app/utils/Notes/ActiveNote";
import NoteLists from "@/app/utils/Notes/NoteLists";
import TasksParts from "@/components/TasksParts";
import NotesParts from "@/components/NotesParts";
import BoardsParts from "@/components/BoardsParts";
import { BgMaskForInput } from "@/components/bgMaskForInput";
import { Information } from "../types";
import { INITIAL_EDITING, INITIAL_INFORMATION } from "../consts/initial";
import { db } from "../firebase";
import {
	deleteDoc,
	doc,
	updateDoc,
	DocumentReference,
	Firestore,
	DocumentData,
	collection,
} from "firebase/firestore";
import { InformationsContext } from "../layout";

export default function Notes() {
	//新しいNoteを追加する時のモーダルの表示状態を管理します。
	const [isModalOpen, setIsModalOpen] = useState(false);

	//どの要素が編集中かをオブジェクトで保持するState。
	const [isEditing, setIsEditing] = useState(INITIAL_EDITING);

	//編集中のプロパティ名を管理します。（title, descriptionなど）
	const [editingElement, setEditingElement] = useState("");

	//1つのデータを管理します。
	const [activeInformation, setActiveInformation] =
		useState<Information>(INITIAL_INFORMATION);

	//全てのデータを管理します。
	const contextValue = useContext(InformationsContext);
	if (contextValue === null) {
		return <div>Contextが提供されていません。</div>;
	}
	const { informations, setInformations } = contextValue;

	/**
	 *クリックされた要素だけを編集中のステータスに変更するための関数です。
	 * @param e イベントです。
	 */
	const handleClickUpdateElement = async (e: any) => {
		//対象のidに設定されたプロパティ名を取得する。
		setEditingElement(e.target.id);
		//一度初期化し、クリックされた要素だけを編集中のステータスに変更する
		const newEditing = { ...INITIAL_EDITING };
		setIsEditing({ ...newEditing, [e.target.id]: true, all: true });
	};

	/**
	 * informationsから任意のinformationを削除する関数です。
	 * @param e イベントです。
	 */
	const handleDeleteList = async (e: {
		target: { parentElement: { id: string } };
	}) => {
		if (confirm("本当に削除しますか？")) {
			const id: string = e.target.parentElement.id;
			const newArray = await informations.filter(
				(info: Information) => info.id !== id
			);
			setInformations(newArray);
			setActiveInformation(INITIAL_INFORMATION);
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
		const informationCollection = collection(db, "informations");
		const updateRef: DocumentReference = doc(
			informationCollection,
			activeInformation.id
		);

		//updateするときは、idは不要なので、削除したものをupdateする
		const updateInformation: Information = { ...activeInformation };
		delete updateInformation.id;
		await updateDoc(updateRef, updateInformation);

		//ローカルを最新状態にする。
		setInformations((infos: Information[]) =>
			infos.map((info) => {
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
	 * アクティブ表示されるinformationを選択する関数です。
	 * @param e イベントです。
	 */
	const handleActiveInformation = (e: { target: { id: string } }) => {
		const newActiveInformationArray = informations.filter(
			(info: Information) => info.id === e.target.id
		);

		const newActiveInformation: Information = newActiveInformationArray[0];
		setActiveInformation(newActiveInformation);
	};

	/**編集したい要素を押下した時に発火する関数です。
	 *@param e イベントです。
	 */
	const handleChangeEditingValue = (e: {
		target: { value: string | number };
	}) => {
		setActiveInformation((prev: Information) => ({
			...prev,
			[editingElement]: e.target.value,
		}));
	};

	/**
	 * チェックボックスが変更された時に発火する関数です。
	 */
	const handleChangeCheckbox = async () => {
		//ローカルのdoneを更新する
		setActiveInformation((prev: Information) => ({
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
		const informationCollection = collection(db, "informations");
		const updateRef: DocumentReference = doc(
			informationCollection,
			activeInformation.id
		);

		//updateするときは、idは不要なので、削除したものをupdateする
		const updateInformation: Information = {
			...activeInformation,
			done: !activeInformation.done,
		};
		delete updateInformation.id;
		await updateDoc(updateRef, updateInformation);
	};

	/**
	 * モーダルを表示非表示を切り替える関数です。
	 */
	const handleModalToggle = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<>
			{isModalOpen ? <Modal handleModalToggle={handleModalToggle} /> : null}
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
					<NoteLists
						activeInformation={activeInformation}
						handleDeleteList={handleDeleteList}
						handleActiveInformation={handleActiveInformation}
					/>
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
					<ActiveNote
						isEditing={isEditing}
						activeInformation={activeInformation}
						handleChangeCheckbox={handleChangeCheckbox}
						handleClickUpdateElement={handleClickUpdateElement}
						handleChangeEditingValue={handleChangeEditingValue}
					/>
				</Stack>
				{activeInformation.id !== "" ? (
					<Stack
						w={"30%"}
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
								<p>{activeInformation.createdAt}</p>
								<p>最終更新日：</p>
								<p>2023/4/10 23:54</p>
							</SimpleGrid>
							<TasksParts
								isEditing={isEditing}
								activeInformation={activeInformation}
								handleChangeEditingValue={handleChangeEditingValue}
								handleClickUpdateElement={handleClickUpdateElement}
							/>
							<NotesParts />
							<BoardsParts />
						</Stack>
					</Stack>
				) : (
					<Stack
						w={"30%"}
						bg={"gray.900"}
						pt={"70px"}
						pb={"50px"}
						px={"20px"}
						color={"gray.300"}
						h={"100vh"}
						overflow={"scroll"}></Stack>
				)}
			</Box>
		</>
	);
}
