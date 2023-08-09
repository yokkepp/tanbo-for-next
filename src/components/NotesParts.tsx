import { Box, SimpleGrid } from "@chakra-ui/react";

export default function NotesParts() {
	return (
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
					id='notesArchive'
					p={"10px"}
					borderBottomRightRadius={"5px"}
					borderBottom={"solid"}
					borderRight={"solid"}
					borderColor={"gray.700"}>
					残す
				</Box>
			</SimpleGrid>
		</Box>
	);
}
