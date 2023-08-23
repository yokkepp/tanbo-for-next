"use client";
import { InformationsContextObject } from "@/app/layout";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import React, { useContext } from "react";

function NoteLists(props: any) {
	//全てのデータを管理します。
	const { informations, setInformations }: any = useContext(
		InformationsContextObject
	);
	const { activeInformation, handleDeleteList, handleActiveInformation } =
		props;
	return (
		<>
			{informations.map((info: any, index: number) => {
				if (info.id === activeInformation.id) {
					return (
						<Button
							key={index}
							// key={info.id}
							id={info.id}
							justifyContent={"space-between"}
							colorScheme={"orange"}
							h={"50px"}
							p={"10px"}
							bg={"orangeAlpha.900"}
							onClick={(e) => handleActiveInformation(e)}>
							<Box
								overflow={"hidden"}
								textOverflow={"ellipsis"}
								pointerEvents={"none"}
								w={"100%"}
								textAlign={"left"}>
								{activeInformation.title}
							</Box>

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
							key={index}
							// key={info.id}
							id={info.id}
							justifyContent={"space-between"}
							colorScheme={"orange"}
							h={"50px"}
							p={"10px"}
							bg={"orangeAlpha.200"}
							onClick={(e) => handleActiveInformation(e)}>
							<Box
								overflow={"hidden"}
								textOverflow={"ellipsis"}
								pointerEvents={"none"}
								w={"100%"}
								textAlign={"left"}>
								{info.title}
							</Box>

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
		</>
	);
}

export default NoteLists;
