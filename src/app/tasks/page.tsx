"use client";
import Header from "@/components/Header/Header";
import {
	Box,
	Stack,
	Text,
	Button,
	Input,
	flexbox,
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Flex,
	Checkbox,
} from "@chakra-ui/react";
import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";

export default function Tasks() {
	return (
		<>
			<Header />
			<Box w={"100%"} h={"100vh"} pt={"70px"} bg={"gray.900"} px={"20px"}>
				<Stack spacing={16}>
					<Box display={"flex"} justifyContent={"space-between"}>
						<Text color={"white"} fontSize={"2xl"}>
							Tasks
						</Text>
						<Box display={"flex"}>
							<Box pr={"20px"}>
								<Button
									colorScheme='teal'
									variant={"solid"}
									w={"95px"}
									mr={"5px"}>
									今日
								</Button>
								<Button
									colorScheme='teal'
									variant={"outline"}
									w={"95px"}
									mr={"5px"}>
									今週
								</Button>
								<Button colorScheme='teal' variant={"outline"} w={"95px"}>
									今月
								</Button>
							</Box>
							<Box pr={"20px"}>
								<Button
									colorScheme='teal'
									variant={"outline"}
									w={"95px"}
									mr={"5px"}>
									先7日間
								</Button>
								<Button colorScheme='teal' variant={"outline"} w={"95px"}>
									先1ヶ月
								</Button>
							</Box>
							<Box>
								<Button colorScheme='teal' variant={"outline"} w={"95px"}>
									全て
								</Button>
							</Box>
						</Box>
					</Box>
					<Box bg={"gray.800"} w={"100%"} rounded={"base"} p={"20px"}>
						<Stack spacing={6}>
							<Flex justifyContent={"space-between"}>
								<Text textColor={"white"} fontSize={"xl"} w={"25%"}>
									未完了タスク
								</Text>
								<Box display={"flex"} w={"75%"}>
									<Input placeholder='クイック作成' mr={"10px"} />
									<Button colorScheme='teal'>詳細追加</Button>
								</Box>
								{/* TODO:クイック作成に文字があれば、クイック作成、なければ詳細追加でモーダル出す */}
							</Flex>
							<TableContainer rounded={"base"} color={"white"} bg={"gray.900"}>
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
										<Tr>
											<Td textColor={"white"}>
												<Checkbox colorScheme='teal' size={"lg"}></Checkbox>
											</Td>
											<Td textColor={"white"}>2023/04/01 10:30</Td>
											<Td textColor={"white"}>
												いつまでになにをやるかタスク記載！
											</Td>
											<Td textColor={"white"}>
												<button>
													<CopyIcon boxSize={"6"} />
												</button>
											</Td>
											<Td textColor={"white"}>2023/04/01 10:30</Td>
											<Td textColor={"white"}>2023/04/01 10:30</Td>
											<Td textColor={"white"} isNumeric>
												20
											</Td>
											<Td textColor={"white"}>
												<button>
													<DeleteIcon boxSize={"5"} />
												</button>
											</Td>
										</Tr>
										<Tr>
											<Td textColor={"white"}>
												<Checkbox colorScheme='teal' size={"lg"}></Checkbox>
											</Td>
											<Td textColor={"white"}>2023/04/01 10:30</Td>
											<Td textColor={"white"}>
												いつまでになにをやるかタスク記載！
											</Td>
											<Td textColor={"white"}>
												<button>
													<CopyIcon boxSize={"6"} />
												</button>
											</Td>
											<Td textColor={"white"}>2023/04/01 10:30</Td>
											<Td textColor={"white"}>2023/04/01 10:30</Td>
											<Td textColor={"white"} isNumeric>
												20
											</Td>
											<Td textColor={"white"}>
												<button>
													<DeleteIcon boxSize={"5"} />
												</button>
											</Td>
										</Tr>
										<Tr>
											<Td textColor={"white"}>
												<Checkbox colorScheme='teal' size={"lg"}></Checkbox>
											</Td>
											<Td textColor={"white"}>2023/04/01 10:30</Td>
											<Td textColor={"white"}>
												いつまでになにをやるかタスク記載！
											</Td>
											<Td textColor={"white"}>
												<button>
													<CopyIcon boxSize={"6"} />
												</button>
											</Td>
											<Td textColor={"white"}>2023/04/01 10:30</Td>
											<Td textColor={"white"}>2023/04/01 10:30</Td>
											<Td textColor={"white"} isNumeric>
												20
											</Td>
											<Td textColor={"white"}>
												<button>
													<DeleteIcon boxSize={"5"} />
												</button>
											</Td>
										</Tr>
									</Tbody>
								</Table>
							</TableContainer>
						</Stack>
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
