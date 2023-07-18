"use client";

import { Box } from "@chakra-ui/react";

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
				bg={"gray.400"}
				display={"flex"}
				borderRadius={"10px"}
				shadow={"0px 0px 20px 10px"}></Box>
		</Box>
	);
}
