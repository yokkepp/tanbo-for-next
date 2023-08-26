import { changeDateFormat } from "@/app/utils/common/functions";
import { Box, SimpleGrid, Input, Text } from "@chakra-ui/react";
export default function TasksParts(props: any) {
	const {
		isEditing,
		activeInformation,
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
						value={activeInformation.timeLimit}
					/>
				) : (
					<Text
						id='timeLimit'
						p={"10px"}
						borderBottom={"solid"}
						borderRight={"solid"}
						borderColor={"gray.700"}
						onClick={(e) => handleClickUpdateElement(e)}>
						{activeInformation.timeLimit
							? changeDateFormat(activeInformation.timeLimit).dateAndTime
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
						value={activeInformation.planStart}
					/>
				) : (
					<Text
						id='planStart'
						p={"10px"}
						borderBottom={"solid"}
						borderRight={"solid"}
						borderColor={"gray.700"}
						onClick={(e) => handleClickUpdateElement(e)}>
						{activeInformation.planStart
							? changeDateFormat(activeInformation.planStart).dateAndTime
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
						value={activeInformation.planEnd}
					/>
				) : (
					<Text
						id='planEnd'
						p={"10px"}
						borderBottom={"solid"}
						borderRight={"solid"}
						borderColor={"gray.700"}
						onClick={(e) => handleClickUpdateElement(e)}>
						{activeInformation.planEnd
							? changeDateFormat(activeInformation.planEnd).dateAndTime
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
						value={activeInformation.progress}
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
							{activeInformation.progress
								? activeInformation.progress + " %"
								: "-"}
						</Text>
					</>
				)}
			</SimpleGrid>
		</Box>
	);
}
