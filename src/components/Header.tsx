"use client";
import Link from "next/link";
import { Box, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const menus = [
	{
		name: "Home",
		link: "/",
		colorScheme: "gray",
		bgColor: "gray.500",
	},
	{
		name: "Tasks",
		link: "/tasks",
		colorScheme: "teal",
		bgColor: "tealAlpha.900",
	},
	{
		name: "Notes",
		link: "/notes",
		colorScheme: "orange",
		bgColor: "orangeAlpha.900",
	},
	{
		name: "Boards",
		link: "/boards",
		colorScheme: "blue",
		bgColor: "blueAlpha.900",
	},
];

export default function Header() {
	const pathName = usePathname();
	const [page, setPage] = useState<string>("");

	useEffect(() => {
		setPage(pathName);
	}, [pathName]);

	return (
		<Box
			display='flex'
			bg='gray.700'
			h={"50px"}
			w={"100%"}
			textColor={"white"}
			px={50}
			justifyContent={"space-between"}
			alignItems={"center"}
			position={"fixed"}
			zIndex={"banner"}>
			<Box display='flex' alignItems={"center"}>
				<Image width={100} height={32} src={"/logo.png"} alt={"logo"} />
				<Box display={"flex"} ml={"50px"}>
					<Link href={"/"}>
						<Button
							m={"5px"}
							colorScheme={"gray"}
							variant={page === "/" ? "solid" : "outline"}
							textColor={"gray.500"}
							borderColor={"gray.500"}>
							HOME
						</Button>
					</Link>
					<Link href={"/tasks"}>
						<Button
							m={"5px"}
							colorScheme={"teal"}
							variant={page === "/tasks" ? "solid" : "outline"}>
							Tasks
						</Button>
					</Link>
					<Link href={"/notes"}>
						<Button
							m={"5px"}
							colorScheme={"orange"}
							variant={page === "/notes" ? "solid" : "outline"}>
							Notes
						</Button>
					</Link>
					<Link href={"/boards"}>
						<Button
							m={"5px"}
							colorScheme={"blue"}
							variant={page === "/boards" ? "solid" : "outline"}>
							Boards
						</Button>
					</Link>
				</Box>
			</Box>
			<Button colorScheme={"Black"}>ログアウト</Button>
		</Box>
	);
}
