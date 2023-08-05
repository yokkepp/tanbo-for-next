import { Box, SimpleGrid, Input, Text } from "@chakra-ui/react";
export default function TasksParts(props) {
	const {
		isEditing,
		activeNote,
		handleChangeEditingValue,
		handleClickUpdateElement,
	} = props;
	return (
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
				{isEditing.timeLimit ? (
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
						onChange={(e) => handleChangeEditingValue(e)}
						value={activeNote.timeLimit}
					/>
				) : (
					<Text
						id='timeLimit'
						p={"10px"}
						borderBottom={"solid"}
						borderRight={"solid"}
						borderColor={"gray.700"}
						onClick={(e) => handleClickUpdateElement(e)}>
						{activeNote.timeLimit}
					</Text>
				)}

				<Box
					p={"10px"}
					borderBottom={"solid"}
					borderLeft={"solid"}
					borderColor={"gray.700"}>
					開始予定：
				</Box>
				<Box
					id='planStart'
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
					id='planEnd'
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
					id='progress'
					p={"10px"}
					borderBottomRightRadius={"5px"}
					borderBottom={"solid"}
					borderRight={"solid"}
					borderColor={"gray.700"}>
					10％
				</Box>
			</SimpleGrid>
		</Box>
	);
}
