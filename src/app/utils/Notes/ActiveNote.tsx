import { LocalInformation } from "@/app/types";
import { Box, Checkbox, Input, Text, Textarea } from "@chakra-ui/react";
import React from "react";

type Props = {
	isEditing: {
		title: boolean;
		description: boolean;
		completedAt: boolean;
		timeLimit: boolean;
		planStart: boolean;
		planEnd: boolean;
		progress: boolean;
		notesArchive: boolean;
		boardName: boolean;
		boardStatus: boolean;
		boardsArchive: boolean;
		all: boolean;
	};
	activeInformation: LocalInformation;
	handleChangeCheckbox: () => Promise<void>;
	handleClickUpdateElement: any;
	handleChangeEditingValue: (e: {
		target: {
			value: string | number;
		};
	}) => void;
};

function ActiveNote(props: Props) {
	const {
		isEditing,
		activeInformation,
		handleChangeCheckbox,
		handleClickUpdateElement,
		handleChangeEditingValue,
	} = props;
	return (
		<>
			{activeInformation.id !== "" ? (
				<>
					<Box display={"flex"}>
						<Checkbox
							isChecked={activeInformation.done}
							variant={"circular"}
							colorScheme={"teal"}
							size={"lg"}
							mr={"15px"}
							onChange={handleChangeCheckbox}></Checkbox>
						{isEditing.title ? (
							<Input
								id='title'
								isReadOnly={false}
								fontSize='3xl'
								fontWeight={"bold"}
								border={"none"}
								value={activeInformation.title}
								position={"relative"}
								onChange={(e) => handleChangeEditingValue(e)}
								zIndex={"popover"}
							/>
						) : (
							<Input
								id='title'
								isReadOnly={true}
								isInvalid={true}
								fontSize='3xl'
								fontWeight={"bold"}
								border={"none"}
								display={"block"}
								w={"100%"}
								onClick={(e) => handleClickUpdateElement(e)}
								value={activeInformation.title}
							/>
						)}
					</Box>
					<Box whiteSpace={"pre-wrap"}>
						{isEditing.description ? (
							<Textarea
								id='description'
								border={"none"}
								textColor={"white"}
								w={"100%"}
								h={"calc(100vh - 200px)"}
								resize={"none"}
								position={"relative"}
								zIndex={"popover"}
								onChange={(e) => handleChangeEditingValue(e)}
								value={activeInformation.description}
							/>
						) : (
							<Textarea
								id='description'
								isReadOnly={true}
								border={"none"}
								textColor={"white"}
								resize={"none"}
								w={"100%"}
								h={"calc(100vh - 200px)"}
								onClick={(e) => handleClickUpdateElement(e)}
								value={activeInformation.description}
							/>
						)}
					</Box>
				</>
			) : (
				<Box
					display={"flex"}
					h={"100vh"}
					justifyContent={"center"}
					alignItems={"center"}>
					<Text>Noteが選択されていません。</Text>
				</Box>
			)}
		</>
	);
}

export default ActiveNote;
