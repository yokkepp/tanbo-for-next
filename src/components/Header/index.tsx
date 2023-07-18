"use client";
import Link from "next/link";
import {
	Box,
	Text,
	Flex,
	List,
	ListItem,
	ListIcon,
	OrderedList,
	UnorderedList,
	Spacer,
	Button,
	Center,
} from "@chakra-ui/react";

export default function Header() {
	const menus = [
		{
			name: "Inbox",
			link: "/inbox",
			bgColor: "gray",
			borderColor: "border-gray-500",
		},
		{
			name: "Tasks",
			link: "/tasks",
			bgColor: "teal",
			borderColor: "border-teal-600",
		},
		{
			name: "Notes",
			link: "/notes",
			bgColor: "orange",
			borderColor: "border-orange-700",
		},
		{
			name: "Boards",
			link: "/boards",
			bgColor: "blue",
			borderColor: "border-sky-600",
		},
	];

	return (
		<Box
			display='flex'
			bg='gray.700'
			h={"50px"}
			textColor={"white"}
			px={50}
			justifyContent={"space-between"}
			alignItems={"center"}>
			<Box display='flex' alignItems={"center"}>
				<Text mr={50}>TaNBo</Text>
				{/* TODO: ロゴを画像に差し替える */}
				<Box display={"flex"}>
					{menus.map((menu) => (
						// TODO: 押下できる範囲を広げたいたいめ、Linkコンポーネントとliタグを逆にした挙動が望ましいが、エラーが出るので要検討。
						<Link href={menu.link} key={menu.name}>
							<Button colorScheme={menu.bgColor} m={"5px"}>
								{menu.name}
							</Button>
						</Link>
					))}
				</Box>
			</Box>
			<Button colorScheme={"Black"}>ログアウト</Button>
		</Box>
	);
}
