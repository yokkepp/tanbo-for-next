"use client";
import Link from "next/link";
import { Box, Text, Button } from "@chakra-ui/react";
import Image from "next/image";
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
				<Image width={100} height={100} src={"/logo.png"} />
				<Box display={"flex"} ml={"50px"}>
					{menus.map((menu) => {
						// TODO: 現在のパスを取得し、色を特定する。
						if ("/note" === menu.link) {
							return (
								<Link href={menu.link} key={menu.name}>
									<Button m={"5px"} bg={menu.bgColor}>
										{menu.name}
									</Button>
								</Link>
							);
						} else {
							return (
								<Link href={menu.link} key={menu.name}>
									<Button
										m={"5px"}
										bg={"none"}
										color={menu.bgColor}
										_hover={{ bg: menu.bgColor, color: "gray.200" }}>
										{menu.name}
									</Button>
								</Link>
							);
						}
					})}
				</Box>
			</Box>
			<Button colorScheme={"Black"}>ログアウト</Button>
		</Box>
	);
}
