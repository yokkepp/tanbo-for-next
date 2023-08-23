"use client";
import { InformationsContextObject } from "../layout";
import { useState, useContext, SetStateAction } from "react";
import { Modal } from "@/components/Modal/Modal";
import TasksParts from "@/components/TasksParts";
import NotesParts from "@/components/NotesParts";
import BoardsParts from "@/components/BoardsParts";
import { BgMaskForInput } from "@/components/bgMaskForInput";
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
import { db } from "../firebase";
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import NoteLists from "@/components/NoteLists";
import ActiveNote from "@/components/ActiveNote";
import { LocalInformation, FirebaseInformation } from "../types";
import { INITIAL_EDITING, INITIAL_INFORMATION } from "../../config/initial";

export default function Notes() {
	//新しいNoteを追加する時のモーダルの表示状態を管理します。
	const [isModalOpen, setIsModalOpen] = useState(false);

	//どの要素が編集中かをオブジェクトで保持するState。
	const [isEditing, setIsEditing] = useState(INITIAL_EDITING);

	//編集中のプロパティ名を管理します。（title, descriptionなど）
	const [editingElement, setEditingElement] = useState("");

	//1つのデータを管理します。
	const [activeInformation, setActiveInformation] =
		useState<LocalInformation>(INITIAL_INFORMATION);

	//全てのデータを管理します。
	const { informations, setInformations } = useContext<any>(
		InformationsContextObject
	);

	/**
	 *モーダル内部の
	 * @param e イベントです。
	 */
	const handleChangeInformation = (
		e: { target: HTMLButtonElement },
		name: string
	) => {
		setActiveInformation((prev) => ({ ...prev, [name]: e.target.value }));
	};

	/**
	 *クリックされた要素だけを編集中のステータスに変更するための関数です。
	 * @param e イベントです。
	 */
	const handleClickUpdateElement = async (e: { target: { id: string } }) => {
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
	const handleDeleteList = async (e: {
		target: { parentElement: { id: string } };
	}) => {
		if (confirm("本当に削除しますか？")) {
			const id: string = e.target.parentElement.id;
			const newArray = await informations.filter(
				(info: LocalInformation) => info.id !== id
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
	const updateSubmit: any = async () => {
		//firebaseの更新対象を選択する。
		const updateRef = doc(db, "informations", activeInformation.id);

		//updateするときは、idは不要なので、削除したものをupdateする
		const updateInformation: FirebaseInformation = { ...activeInformation };
		delete updateInformation.id;
		await updateDoc(updateRef, updateInformation);

		//informationsを更新してローカルを最新状態にする。
		setInformations((prev: any) =>
			prev.map((info: any) => {
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
	const changeDateFormat = (date: string) => {
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
	const handleActiveInformation = (e: { target: { id: string } }) => {
		const newActiveInformationArray = informations.filter(
			(info: LocalInformation) => info.id === e.target.id
		);

		const newActiveInformation: LocalInformation = newActiveInformationArray[0];
		setActiveInformation(newActiveInformation);
	};

	/**編集したい要素を押下した時に発火する関数です。
	 *@param e イベントです。
	 */
	const handleChangeEditingValue = (e: {
		target: { value: string | number };
	}) => {
		setActiveInformation((prev) => ({
			...prev,
			[editingElement]: e.target.value,
		}));
	};

	//PROB:一つのinformationに対して、activeInformation, informations, firebaseのDBの3つを更新している。冗長になっている気がするが他の方法が知りたい。
	/**
	 * チェックボックスが変更された時に発火する関数です。
	 */
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
		const updateInformation: FirebaseInformation = {
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
								changeDateFormat={changeDateFormat}
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
