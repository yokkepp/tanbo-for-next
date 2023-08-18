"use client";

import { Box, Text } from "@chakra-ui/react";
import { redirect } from "next/navigation";
export default function Home() {
	redirect("/notes");
	return (
		<></>
		// <Box pt={"70px"}>
		// 	<Text>これはホームです。</Text>
		// </Box>
	);
}
