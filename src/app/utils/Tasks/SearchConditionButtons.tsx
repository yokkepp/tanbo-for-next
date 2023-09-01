"use client";
import {
	Box,
	Button,
	Flex,
	FormControl,
	Input,
	flexbox,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Modal } from "../../../components/Modal";
import { InformationsContext } from "@/app/layout";
import { INITIAL_INFORMATION } from "@/app/consts/initial";
import { changeDateFormat } from "../common/functions";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/firebase";

function SearchConditionButtons() {
	const [quickTitle, setQuickTitle] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [sortCondition, setSortCondition] = useState("");
	const [informations, setInformations]: any = useContext(InformationsContext);
	/** モーダルを表示非表示を切り替える関数です。
	 * @function
	 */
	const handleModalToggle = () => {
		setIsModalOpen(!isModalOpen);
	};

	const handleChangeQuickTitle = (e: any) => {
		setQuickTitle(e.target.value);
	};

	const handleSortCondition = (setting: string) => {
		setSortCondition(setting);
		console.log(sortCondition);
	};

	const handleQuickSubmit = async (e: any) => {
		e.preventDefault();

		const date = new Date();
		const now = changeDateFormat(date.toString()).dateAndTime;
		const nowInDB = changeDateFormat(date.toString()).dateAndTimeInDB;
		console.log("now", now);
		console.log("nowInDB", nowInDB);
		//firebaseに追加する
		const docRef = await addDoc(collection(db, "informations"), {
			...INITIAL_INFORMATION,
			title: quickTitle,
			createdAt: nowInDB,
		});

		//ローカルに追加する
		setInformations([
			...informations,
			{
				...INITIAL_INFORMATION,
				createdAt: now,
				id: docRef.id,
				title: quickTitle,
			},
		]);

		//入力欄の初期化
		setQuickTitle("");
	};

	return (
		<>
			{isModalOpen ? <Modal handleModalToggle={handleModalToggle} /> : null}
			<Box display={"flex"} justifyContent={"space-between"}>
				<Box display={"flex"}>
					<Box pr={"20px"}>
						{sortCondition === "today" ? (
							<Button
								colorScheme='teal'
								variant={"solid"}
								w={"95px"}
								mr={"5px"}
								onClick={() => handleSortCondition("today")}>
								今日
							</Button>
						) : (
							<Button
								colorScheme='teal'
								variant={"outline"}
								w={"95px"}
								mr={"5px"}
								onClick={() => handleSortCondition("today")}>
								今日
							</Button>
						)}

						{sortCondition === "thisWeek" ? (
							<Button
								colorScheme='teal'
								variant={"solid"}
								w={"95px"}
								mr={"5px"}
								onClick={() => handleSortCondition("thisWeek")}>
								今週
							</Button>
						) : (
							<Button
								colorScheme='teal'
								variant={"outline"}
								w={"95px"}
								mr={"5px"}
								onClick={() => handleSortCondition("thisWeek")}>
								今週
							</Button>
						)}
						{sortCondition === "thisMonth" ? (
							<Button
								colorScheme='teal'
								variant={"solid"}
								w={"95px"}
								onClick={() => handleSortCondition("thisMonth")}>
								今月
							</Button>
						) : (
							<Button
								colorScheme='teal'
								variant={"outline"}
								w={"95px"}
								onClick={() => handleSortCondition("thisMonth")}>
								今月
							</Button>
						)}
					</Box>
					<Box pr={"20px"}>
						{sortCondition === "next7days" ? (
							<Button
								colorScheme='teal'
								variant={"solid"}
								w={"95px"}
								mr={"5px"}
								onClick={() => handleSortCondition("next7days")}>
								先7日間
							</Button>
						) : (
							<Button
								colorScheme='teal'
								variant={"outline"}
								w={"95px"}
								mr={"5px"}
								onClick={() => handleSortCondition("next7days")}>
								先7日間
							</Button>
						)}

						{sortCondition === "next1month" ? (
							<Button
								colorScheme='teal'
								variant={"solid"}
								w={"95px"}
								mr={"5px"}
								onClick={() => handleSortCondition("next1month")}>
								先1ヶ月
							</Button>
						) : (
							<Button
								colorScheme='teal'
								variant={"outline"}
								w={"95px"}
								mr={"5px"}
								onClick={() => handleSortCondition("next1month")}>
								先1ヶ月
							</Button>
						)}
					</Box>
					<Box>
						{sortCondition === "all" ? (
							<Button
								colorScheme='teal'
								variant={"solid"}
								w={"95px"}
								onClick={() => handleSortCondition("all")}>
								全て
							</Button>
						) : (
							<Button
								colorScheme='teal'
								variant={"outline"}
								w={"95px"}
								onClick={() => handleSortCondition("all")}>
								全て
							</Button>
						)}
					</Box>
				</Box>
				<Box w={"40%"}>
					{quickTitle ? (
						<form
							style={{ display: "flex" }}
							onSubmit={(e) => handleQuickSubmit(e)}>
							<Input
								type='text'
								placeholder='クイック作成'
								textColor={"white"}
								mr={"10px"}
								value={quickTitle}
								onChange={(e) => handleChangeQuickTitle(e)}
								onSubmit={() => console.log("Hello")}
							/>
							<Button
								w={"130px"}
								colorScheme='green'
								type='submit'
								onSubmit={() => console.log("Hello")}>
								クイック追加
							</Button>
						</form>
					) : (
						<form style={{ display: "flex" }}>
							<Input
								type='text'
								placeholder='クイック作成'
								textColor={"white"}
								mr={"10px"}
								value={quickTitle}
								onChange={(e) => handleChangeQuickTitle(e)}
							/>
							<Button
								w={"130px"}
								colorScheme='green'
								onClick={handleModalToggle}>
								詳細追加
							</Button>
						</form>
					)}
				</Box>
			</Box>
		</>
	);
}

export default SearchConditionButtons;
