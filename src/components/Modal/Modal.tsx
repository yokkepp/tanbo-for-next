"use client";
import { CloseIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import {
	Box,
	Button,
	Checkbox,
	Input,
	Stack,
	Textarea,
	SimpleGrid,
} from "@chakra-ui/react";
import { db } from "@/app/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import NotesParts from "../NotesParts";
import BoardsParts from "../BoardsParts";
export function Modal(props) {
	const {
		handleModalToggle,
		information,
		setInformation,
		informations,
		setInformations,
		isEditing,
		handleChangeInformation,
		changeDateFormat,
	} = props;

	const inputEl = useRef<HTMLElement>(null);

	/**
	 * モーダル出現時に件名に自動的にフォーカスを当てる
	 */
	const focusTitle = () => {
		if (inputEl.current !== null) {
			inputEl.current.focus();
		}
	};

	/**
	 * 件名の変更を感知して、状態を保管する関数です。
	 * @param e イベントです。
	 * @function
	 */
	const handleClickAddInformation = async () => {
		const date = new Date();
		const now = changeDateFormat(date).dateAndTime;
		const nowInDB = changeDateFormat(date).dateAndTimeInDB;
		//firebaseに追加する
		const docRef = await addDoc(collection(db, "informations"), {
			...information,
			createdAt: nowInDB,
		});
		console.log(now);
		setInformations((prev) => [
			...prev,
			{ ...information, createdAt: now, id: docRef.id },
		]);
		setInformation({});
		handleModalToggle();
	};

	useEffect(() => {
		focusTitle();
	}, []);

	return (
		<Box
			h={"100vh"}
			w={"100%"}
			bg={"blackAlpha.800"}
			zIndex={"modal"}
			position={"absolute"}
			top={0}
			left={0}
			display={"flex"}
			justifyContent={"center"}
			alignItems={"center"}>
			<Box
				h={"80%"}
				w={"80%"}
				p={"20px"}
				bg={"gray.800"}
				display={"flex"}
				borderRadius={"10px"}
				shadow={"10px 10px 10px 0px black"}>
				<Stack spacing={6} w={"70%"} p={"20px"} textColor={"gray.300"}>
					<Box display={"flex"}>
						<Checkbox
							colorScheme='teal'
							size={"lg"}
							mr={"20px"}
							onChange={(e) => handleChangeInformation(e, "done")}></Checkbox>
						<Input
							size={"lg"}
							variant={"outline"}
							placeholder='件名を入力してください'
							bg={"gray.700"}
							border={"none"}
							value={information.title}
							onChange={(e) => handleChangeInformation(e, "title")}
							ref={inputEl}
						/>
					</Box>
					<Textarea
						w={"100%"}
						h={"100%"}
						bg={"gray.700"}
						value={information.description}
						border={"none"}
						resize={"none"}
						placeholder='詳細を入力してください'
						onChange={(e) =>
							handleChangeInformation(e, "description")
						}></Textarea>
					<Button
						h={"100px"}
						colorScheme='green'
						onClick={handleClickAddInformation}>
						追加する
					</Button>
				</Stack>
				<Stack spacing={6} w={"30%"} p={"20px"} textColor={"white"}>
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
								placeholder='w'
								onChange={(e) => handleChangeInformation(e, "timeLimit")}
								value={information.timeLimit}
							/>
							<Box
								p={"10px"}
								borderBottom={"solid"}
								borderLeft={"solid"}
								borderColor={"gray.700"}>
								開始予定：
							</Box>

							<Input
								id='planStart'
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
								placeholder='w'
								onChange={(e) => handleChangeInformation(e, "planStart")}
								value={information.planStart}
							/>

							<Box
								p={"10px"}
								borderBottom={"solid"}
								borderLeft={"solid"}
								borderColor={"gray.700"}>
								終了予定：
							</Box>

							<Input
								type='datetime-local'
								p={"10px"}
								border={"none"}
								borderRadius={"none"}
								_hover={{ border: "none" }}
								shadow={"none"}
								borderBottom={"solid"}
								borderRight={"solid"}
								borderColor={"gray.700"}
								position={"relative"}
								zIndex={"popover"}
								placeholder='w'
								h={"100%"}
								onChange={(e) => handleChangeInformation(e, "planEnd")}
								value={information.planEnd}
							/>

							<Box
								p={"10px"}
								borderBottomLeftRadius={"5px"}
								borderBottom={"solid"}
								borderLeft={"solid"}
								borderColor={"gray.700"}>
								進捗：
							</Box>
							<Input
								id='progress'
								p={"10px"}
								borderBottomRightRadius={"5px"}
								borderBottom={"solid"}
								borderRight={"solid"}
								borderColor={"gray.700"}
								onChange={(e) => handleChangeInformation(e, "progress")}
								value={information.progress}
							/>
						</SimpleGrid>
					</Box>
					<NotesParts />
					<BoardsParts />
				</Stack>
			</Box>
			<CloseIcon
				w={10}
				h={10}
				color='gray.600'
				position={"absolute"}
				top={"40px"}
				right={"40px"}
				cursor={"pointer"}
				onClick={handleModalToggle}
			/>
		</Box>
	);
}
