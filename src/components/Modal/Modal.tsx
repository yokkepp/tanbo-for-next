"use client";
import { CloseIcon } from "@chakra-ui/icons";

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

export default function Modal() {
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
				bg={"gray.700"}
				display={"flex"}
				borderRadius={"10px"}
				shadow={"0px 0px 20px 10px"}>
				<Stack spacing={7} w={"70%"} p={"20px"} textColor={"gray.300"}>
					<Box display={"flex"} justifyContent={"space-between"}>
						<Text>作成日:2023年7月20日</Text>
						<Text>最終更新日:2023年7月20日</Text>
					</Box>
					<Box display={"flex"}>
						<Checkbox mr={"20px"}></Checkbox>
						<Input
							size={"lg"}
							variant={"outline"}
							placeholder='テスト'
							bg={"gray.600"}
						/>
					</Box>
					<Textarea w={"100%"} h={"100%"} bg={"gray.600"}></Textarea>
					<Button h={"100px"} colorScheme='green'>
						登録
					</Button>
				</Stack>
				<Stack w={"30%"} p={"20px"}>
					<TableContainer>
						<Table variant={"unstyled"} size={"sm"} textColor={"gray.200"}>
							<Thead bg={"green"}>
								<Tr>
									<Th textColor={"white"}>Tasks</Th>
									<Th></Th>
								</Tr>
							</Thead>
							<Tbody>
								<Tr>
									<Td>完了or未完了</Td>
									<Td p={0} borderColor={"transparent"}>
										<Input value={""} />
									</Td>
								</Tr>
								<Tr>
									<Td>完了日</Td>
									<Td p={0} borderColor={"transparent"}>
										<Input value={""} />
									</Td>
								</Tr>
								<Tr>
									<Td>期限</Td>
									<Td p={0} borderColor={"transparent"}>
										<Input value={""} />
									</Td>
								</Tr>
								<Tr>
									<Td>予定開始日</Td>
									<Td p={0} borderColor={"transparent"}>
										<Input value={""} />
									</Td>
								</Tr>
								<Tr>
									<Td>予定終了日</Td>
									<Td p={0} borderColor={"transparent"}>
										<Input value={""} />
									</Td>
								</Tr>
							</Tbody>
						</Table>
					</TableContainer>
				</Stack>
			</Box>
			<Box></Box>
			<CloseIcon
				w={12}
				h={12}
				color='gray.500'
				position={"absolute"}
				top={"40px"}
				right={"40px"}
				cursor={"pointer"}
			/>
		</Box>
	);
}
