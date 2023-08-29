"use client";
import Link from "next/link";
import { Box, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
export default function Header() {
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
	const [page, setPage] = useState(window.location.pathname);
	const handlePage = (path: string) => {
		setPage(path);
		//先にwindow.location.pathnameが読み込まれる。
		//その後レンダリング
		//useState
		console.log(path);
	};

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
							onClick={() => handlePage("/")}
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
							onClick={() => handlePage("/tasks")}
							variant={page === "/tasks" ? "solid" : "outline"}>
							Tasks
						</Button>
					</Link>
					<Link href={"/notes"}>
						<Button
							m={"5px"}
							colorScheme={"orange"}
							onClick={() => handlePage("/notes")}
							variant={page === "/notes" ? "solid" : "outline"}>
							Notes
						</Button>
					</Link>
					<Link href={"/boards"}>
						<Button
							m={"5px"}
							colorScheme={"blue"}
							onClick={() => handlePage("/boards")}
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
