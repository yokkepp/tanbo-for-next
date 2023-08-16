import { Box, Checkbox, Input, Text, Textarea } from "@chakra-ui/react";
import React from "react";

function ActiveNote(props) {
	const {
		isEditing,
		activeInformation,
		handleChangeCheckbox,
		handleClickUpdateElement,
		handleChangeEditingValue,
	} = props;
	return (
		<>
			{Object.keys(activeInformation).length ? (
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
								fontSize='3xl'
								fontWeight={"bold"}
								border={"none"}
								value={activeInformation.title}
								position={"relative"}
								onChange={(e) => handleChangeEditingValue(e)}
								zIndex={"popover"}
							/>
						) : (
							<Text
								id='title'
								fontSize='3xl'
								fontWeight={"bold"}
								display={"block"}
								w={"100%"}
								onClick={(e) => handleClickUpdateElement(e)}>
								{activeInformation.title}
							</Text>
						)}
					</Box>
					<Box whiteSpace={"pre-wrap"}>
						{isEditing.description ? (
							<Textarea
								id='description'
								w={"100%"}
								h={"calc(100vh - 200px)"}
								resize={"none"}
								position={"relative"}
								zIndex={"popover"}
								onChange={(e) => handleChangeEditingValue(e)}
								value={activeInformation.description}
							/>
						) : (
							<Text
								id='description'
								w={"100%"}
								h={"calc(100vh - 200px)"}
								onClick={(e) => handleClickUpdateElement(e)}>
								{activeInformation.description}
							</Text>
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
