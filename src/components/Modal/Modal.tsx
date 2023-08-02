"use client";
import { CloseIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import {
	Box,
	Button,
	Text,
	Heading,
	Checkbox,
	Input,
	Stack,
	Textarea,
	Table,
	TableContainer,
	TableCaption,
	Thead,
	Tbody,
	Td,
	Th,
	Tr,
} from "@chakra-ui/react";
import { db } from "@/app/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import Tasks from "../TasksParts";
import NotesParts from "../NotesParts";
import BoardsParts from "../BoardsParts";
export function Modal(props) {
	const { handleModalToggle, informations, setInformations, isEditing } = props;
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const inputEl = useRef(null);

	const focusTitle = () => {
		inputEl.current.focus();
	};

	/**
	 * 件名の変更を感知して、状態を保管する関数です。
	 * @param e イベントです。
	 * @function
	 */
	const handleChangeTitle = (e) => {
		setTitle(e.target.value);
	};

	/**
	 * 件名の変更を感知して、状態を保管する関数です。
	 * @param e イベントです。
	 * @function
	 */
	const handleChangeDescription = (e) => {
		setDescription(e.target.value);
	};

	/**
	 * 件名の変更を感知して、状態を保管する関数です。
	 * @param e イベントです。
	 * @function
	 */
	const handleClickAddInformation = async () => {
		//firebaseに追加する
		const docRef = await addDoc(collection(db, "informations"), {
			title,
			description,
		});

		const newInformations = [
			...informations,
			{ title, description, id: docRef.id },
		];

		setInformations(newInformations);

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
					<Box display={"flex"} justifyContent={"space-between"}>
						<Text>作成日:2023年7月20日</Text>
						<Text>最終更新日:2023年7月20日</Text>
					</Box>
					<Box display={"flex"}>
						<Checkbox colorScheme='teal' size={"lg"} mr={"20px"}></Checkbox>
						<Input
							size={"lg"}
							variant={"outline"}
							placeholder='テスト'
							bg={"gray.700"}
							border={"none"}
							value={title}
							onChange={handleChangeTitle}
							ref={inputEl}
						/>
					</Box>
					<Textarea
						w={"100%"}
						h={"100%"}
						bg={"gray.700"}
						value={description}
						border={"none"}
						onChange={handleChangeDescription}></Textarea>
					<Button
						h={"100px"}
						colorScheme='green'
						onClick={handleClickAddInformation}>
						追加する
					</Button>
				</Stack>
				<Stack spacing={6} w={"30%"} p={"20px"} textColor={"white"}>
					<Tasks isEditing={isEditing} />
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
