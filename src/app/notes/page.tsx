"use client";
import Header from "@/components/Header/Header";
import { Modal } from "@/components/Modal/Modal";
import {
	List,
	UnorderedList,
	Textarea,
	Box,
	Stack,
	Button,
	Checkbox,
	Heading,
	SimpleGrid,
	border,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function Notes() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [informations, setInformations] = useState([
		{ title: "タイトル1", description: "詳細1" },
		{ title: "タイトル2", description: "詳細2" },
		{ title: "タイトル3", description: "詳細3" },
	]);
	const [activeInformation, setActiveInformation] = useState({});
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
	const handleDeleteList = (e) => {
		e.stopPropagation();
		if (confirm("本当に削除しますか？")) {
			const id = e.target.parentElement.id;
			const newArray = informations.filter(
				(information) => information.title !== id
			);
			setInformations(newArray);
		} else {
			alert("キャンセルしました。");
		}
	};

	/**
	 * アクティブ表示されるinformationを選択する関数です。
	 * @param e イベントです。
	 */
	const handleActiveInformation = (e) => {
		e.preventDefault();
		const newActiveInformation = informations.filter(
			(info) => info.title === e.target.id
		);
		console.log(newActiveInformation);
		setActiveInformation(newActiveInformation[0]);
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
					{informations.map((information, index) => {
						if (information.title === activeInformation.title) {
							return (
								<Button
									key={information.title}
									id={information.title}
									justifyContent={"space-between"}
									colorScheme={"orange"}
									h={"50px"}
									p={"10px"}
									bg={"orangeAlpha.900"}
									onClick={(e) => handleActiveInformation(e)}>
									{information.title}

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
									key={information.title}
									id={information.title}
									justifyContent={"space-between"}
									colorScheme={"orange"}
									h={"50px"}
									p={"10px"}
									bg={"orangeAlpha.200"}
									onClick={(e) => handleActiveInformation(e)}>
									{information.title}

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
						<Heading as='h1'>{activeInformation.title}</Heading>
					</Box>
					<Box>
						<p>{activeInformation.description}</p>
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
									期限：
								</Box>
								<Box
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
									開始予定：
								</Box>
								<Box
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
									p={"10px"}
									borderBottom={"solid"}
									borderRight={"solid"}
									borderColor={"gray.700"}>
									xxxプロジェクト
								</Box>
								<Box
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
