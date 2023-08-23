"use client";
import {
	Box,
	Stack,
	Text,
	Button,
	Input,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	Flex,
	Checkbox,
} from "@chakra-ui/react";
import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState, useContext, SetStateAction } from "react";
import { InformationsContextObject } from "../layout";
import SearchConditionButtons from "../../components/SearchConditionButtons";

export default function Tasks() {
	const { informations }: any = useContext(InformationsContextObject);
	const [doneList, setDoneList] = useState([]);
	const [notDoneList, setNotDoneList] = useState([]);
	const [localInformations, setLocalInformations] = useState([]);
	const [sortCondition, setSortCondition] = useState(""); //TODO:どの条件で入れる？？
	const [quickTitle, setQuickTitle] = useState("");
	//TODO: useState localInformationsを用意して、informationsをまとめて表示する時も表示形式を変更しておく必要がある。
	//TODO: 検索機能を実装する必要がある。ソート機能を作成して、doneList notDoneListを作成して、それぞれに格納→表示する。

	const handleChangeQuickTitle = (e: any) => {
		setQuickTitle(e.target.value);
	};

	return (
		<>
			<Box w={"100%"} h={"100vh"} pt={"70px"} bg={"gray.900"} px={"20px"}>
				<Stack spacing={6}>
					<SearchConditionButtons
						quickTitle={quickTitle}
						handleChangeQuickTitle={handleChangeQuickTitle}
					/>
					<Box h={"calc(100vh - 160px)"} overflow={"scroll"}>
						<Box
							bg={"gray.800"}
							w={"100%"}
							rounded={"base"}
							p={"20px"}
							mb={"20px"}>
							<Stack spacing={3}>
								<Box>
									<Text textColor={"white"} fontSize={"xl"} w={"25%"}>
										未完了タスク
									</Text>
								</Box>
								<TableContainer
									rounded={"base"}
									color={"white"}
									bg={"gray.900"}>
									<Table variant='simple'>
										<Thead bg={"gray.700"}>
											<Tr>
												<Th textColor={"white"}></Th>
												<Th textColor={"white"}>作成日</Th>
												<Th textColor={"white"}>タイトル</Th>
												<Th textColor={"white"}>詳細</Th>
												<Th textColor={"white"}>開始予定</Th>
												<Th textColor={"white"}>終了予定</Th>
												<Th textColor={"white"} isNumeric>
													進捗率(%)
												</Th>
												<Th textColor={"white"}></Th>
											</Tr>
										</Thead>
										<Tbody>
											{informations.map((info: any) => {
												return (
													<Tr key={info.id} id={info.id}>
														<Td textColor={"white"}>
															<Checkbox
																isChecked={info.done}
																colorScheme='teal'
																variant={"circular"}
																size={"lg"}
																onChange={() => alert("Hello")}></Checkbox>
														</Td>
														<Td textColor={"white"}>{info.createdAt}</Td>
														<Td textColor={"white"}>{info.title}</Td>
														<Td textColor={"white"}>
															<button>
																<CopyIcon boxSize={"6"} />
															</button>
														</Td>
														<Td textColor={"white"}>{info.planStart}</Td>
														<Td textColor={"white"}>{info.planEnd}</Td>
														<Td textColor={"white"} isNumeric>
															{info.progress}
														</Td>
														<Td textColor={"white"}>
															<button>
																<DeleteIcon boxSize={"5"} />
															</button>
														</Td>
													</Tr>
												);
											})}
										</Tbody>
									</Table>
								</TableContainer>
							</Stack>
						</Box>
						<Box bg={"gray.800"} w={"100%"} rounded={"base"} p={"20px"}>
							<Stack spacing={3}>
								<Box>
									<Text textColor={"white"} fontSize={"xl"} w={"25%"}>
										完了済みタスク
									</Text>
								</Box>
								<TableContainer
									rounded={"base"}
									color={"white"}
									bg={"gray.900"}>
									<Table variant='simple'>
										<Thead bg={"gray.700"}>
											<Tr>
												<Th textColor={"white"}></Th>
												<Th textColor={"white"}>作成日</Th>
												<Th textColor={"white"}>タイトル</Th>
												<Th textColor={"white"}>詳細</Th>
												<Th textColor={"white"}>開始予定</Th>
												<Th textColor={"white"}>終了予定</Th>
												<Th textColor={"white"} isNumeric>
													進捗率(%)
												</Th>
												<Th textColor={"white"}></Th>
											</Tr>
										</Thead>
										<Tbody>
											{informations.map((info: any) => {
												return (
													<Tr key={info.id} id={info.id}>
														<Td textColor={"white"}>
															<Checkbox
																variant={"circular"}
																colorScheme='teal'
																size={"lg"}></Checkbox>
														</Td>
														<Td textColor={"white"}>{info.createdAt}</Td>
														<Td textColor={"white"}>{info.title}</Td>
														<Td textColor={"white"}>
															<button>
																<CopyIcon boxSize={"6"} />
															</button>
														</Td>
														<Td textColor={"white"}>{info.planStart}</Td>
														<Td textColor={"white"}>{info.planEnd}</Td>
														<Td textColor={"white"} isNumeric>
															{info.progress}
														</Td>
														<Td textColor={"white"}>
															<button>
																<DeleteIcon boxSize={"5"} />
															</button>
														</Td>
													</Tr>
												);
											})}
										</Tbody>
									</Table>
								</TableContainer>
							</Stack>
						</Box>
					</Box>
				</Stack>
				<Stack>
					<Stack></Stack>
				</Stack>
				<Stack></Stack>
			</Box>
			<Box></Box>
		</>
	);
}
