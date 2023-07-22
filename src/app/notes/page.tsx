"use client";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
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
} from "@chakra-ui/react";
export default function Notes() {
	return (
		<>
			<Header />
			{/* <Modal /> */}
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
						}}>
						Noteを追加する
					</Button>
					<Button
						justifyContent={"left"}
						colorScheme={"orange"}
						bg={"orangeAlpha.200"}>
						ボタン
					</Button>
					<Button colorScheme={"orange"} bg={"orangeAlpha.200"}>
						ボタン
					</Button>
					<Button colorScheme={"orange"} bg={"orangeAlpha.900"}>
						ボタン
					</Button>
					<Button colorScheme={"orange"} bg={"orangeAlpha.200"}>
						ボタン
					</Button>
					<Button colorScheme={"orange"} bg={"orangeAlpha.200"}>
						ボタン
					</Button>
					<Button colorScheme={"orange"} bg={"orangeAlpha.200"}>
						ボタン
					</Button>
					<Button colorScheme={"orange"} bg={"orangeAlpha.200"}>
						ボタン
					</Button>
					<Button colorScheme={"orange"} bg={"orangeAlpha.200"}>
						ボタン
					</Button>
					<Button colorScheme={"orange"} bg={"orangeAlpha.200"}>
						ボタン
					</Button>
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
						<Heading as='h1'>こちらがタイトルです。</Heading>
					</Box>
					<Box>
						<p>
							こちらにテキストが入ります。こちらにテキストが入ります。こちらにテキストが入ります。こちらにテキストが入ります。こちらにテキストが入ります。こちらにテキストが入ります。こちらにテキストが入ります。こちらにテキストが入ります。こちらにテキストが入ります。こちらにテキストが入ります。こちらにテキストが入ります。こちらにテキストが入ります。こちらにテキストが入ります。こちらにテキストが入ります。こちらにテキストが入ります。こちらにテキストが入ります。こちらにテキストが入ります。こちらにテキストが入ります。こちらにテキストが入ります。こちらにテキストが入ります。こちらにテキストが入ります。
						</p>
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
									予定開始日：
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
									予定終了日：
								</Box>
								<Box
									p={"10px"}
									borderBottomRightRadius={"5px"}
									borderBottom={"solid"}
									borderRight={"solid"}
									borderColor={"gray.700"}>
									2023/10/05 12:00
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
