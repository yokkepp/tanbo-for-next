import { Box, SimpleGrid, Input, Text } from "@chakra-ui/react";
export default function TasksParts(props: any) {
	const {
		isEditing,
		activeNote,
		handleChangeEditingValue,
		handleClickUpdateElement,
		changeDateFormat,
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
						{activeNote.timeLimit
							? changeDateFormat(activeNote.timeLimit).dateAndTime
							: "-"}
					</Text>
				)}

				<Box
					p={"10px"}
					borderBottom={"solid"}
					borderLeft={"solid"}
					borderColor={"gray.700"}>
					開始予定：
				</Box>
				{isEditing.planStart ? (
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
						onChange={(e) => handleChangeEditingValue(e)}
						value={activeNote.planStart}
					/>
				) : (
					<Text
						id='planStart'
						p={"10px"}
						borderBottom={"solid"}
						borderRight={"solid"}
						borderColor={"gray.700"}
						onClick={(e) => handleClickUpdateElement(e)}>
						{activeNote.planStart
							? changeDateFormat(activeNote.planStart).dateAndTime
							: "-"}
					</Text>
				)}
				<Box
					p={"10px"}
					borderBottom={"solid"}
					borderLeft={"solid"}
					borderColor={"gray.700"}>
					終了予定：
				</Box>
				{isEditing.planEnd ? (
					<Input
						id='planEnd'
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
						value={activeNote.planEnd}
					/>
				) : (
					<Text
						id='planEnd'
						p={"10px"}
						borderBottom={"solid"}
						borderRight={"solid"}
						borderColor={"gray.700"}
						onClick={(e) => handleClickUpdateElement(e)}>
						{activeNote.planEnd
							? changeDateFormat(activeNote.planEnd).dateAndTime
							: "-"}
					</Text>
				)}
				<Box
					p={"10px"}
					borderBottomLeftRadius={"5px"}
					borderBottom={"solid"}
					borderLeft={"solid"}
					borderColor={"gray.700"}>
					進捗：
				</Box>
				{isEditing.progress ? (
					<Input
						id='progress'
						type='number'
						min={"0"}
						max={"100"}
						p={"10px"}
						border={"none"}
						_hover={{ border: "none" }}
						shadow={"none"}
						borderBottom={"solid"}
						borderRight={"solid"}
						borderColor={"gray.700"}
						position={"relative"}
						zIndex={"popover"}
						placeholder='0~100'
						onChange={(e) => handleChangeEditingValue(e)}
						value={activeNote.progress}
					/>
				) : (
					<>
						<Text
							id='progress'
							p={"10px"}
							borderBottom={"solid"}
							borderRight={"solid"}
							borderColor={"gray.700"}
							onClick={(e) => handleClickUpdateElement(e)}>
							{activeNote.progress ? activeNote.progress + " %" : "-"}
						</Text>
					</>
				)}
			</SimpleGrid>
		</Box>
	);
}
