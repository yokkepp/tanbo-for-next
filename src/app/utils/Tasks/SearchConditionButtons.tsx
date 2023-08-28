"use client";
import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Modal } from "../../../components/Modal";
function SearchConditionButtons(props: any) {
	const { quickTitle, handleChangeQuickTitle } = props;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [sortCondition, setSortCondition] = useState("");
	/** モーダルを表示非表示を切り替える関数です。
	 * @function
	 */
	const handleModalToggle = () => {
		setIsModalOpen(!isModalOpen);
	};

	const handleSortCondition = (setting: string) => {
		setSortCondition(setting);
		console.log(sortCondition);
	};

	return (
		<>
			{isModalOpen ? <Modal handleModalToggle={handleModalToggle} /> : null}
			<Box display={"flex"} justifyContent={"space-between"}>
				<Box display={"flex"}>
					<Box pr={"20px"}>
						{sortCondition === "today" ? (
							<Button
								colorScheme='teal'
								variant={"solid"}
								w={"95px"}
								mr={"5px"}
								onClick={() => handleSortCondition("today")}>
								今日
							</Button>
						) : (
							<Button
								colorScheme='teal'
								variant={"outline"}
								w={"95px"}
								mr={"5px"}
								onClick={() => handleSortCondition("today")}>
								今日
							</Button>
						)}

						{sortCondition === "thisWeek" ? (
							<Button
								colorScheme='teal'
								variant={"solid"}
								w={"95px"}
								mr={"5px"}
								onClick={() => handleSortCondition("thisWeek")}>
								今週
							</Button>
						) : (
							<Button
								colorScheme='teal'
								variant={"outline"}
								w={"95px"}
								mr={"5px"}
								onClick={() => handleSortCondition("thisWeek")}>
								今週
							</Button>
						)}
						{sortCondition === "thisMonth" ? (
							<Button
								colorScheme='teal'
								variant={"solid"}
								w={"95px"}
								onClick={() => handleSortCondition("thisMonth")}>
								今月
							</Button>
						) : (
							<Button
								colorScheme='teal'
								variant={"outline"}
								w={"95px"}
								onClick={() => handleSortCondition("thisMonth")}>
								今月
							</Button>
						)}
					</Box>
					<Box pr={"20px"}>
						{sortCondition === "next7days" ? (
							<Button
								colorScheme='teal'
								variant={"solid"}
								w={"95px"}
								mr={"5px"}
								onClick={() => handleSortCondition("next7days")}>
								先7日間
							</Button>
						) : (
							<Button
								colorScheme='teal'
								variant={"outline"}
								w={"95px"}
								mr={"5px"}
								onClick={() => handleSortCondition("next7days")}>
								先7日間
							</Button>
						)}

						{sortCondition === "next1month" ? (
							<Button
								colorScheme='teal'
								variant={"solid"}
								w={"95px"}
								mr={"5px"}
								onClick={() => handleSortCondition("next1month")}>
								先1ヶ月
							</Button>
						) : (
							<Button
								colorScheme='teal'
								variant={"outline"}
								w={"95px"}
								mr={"5px"}
								onClick={() => handleSortCondition("next1month")}>
								先1ヶ月
							</Button>
						)}
					</Box>
					<Box>
						{sortCondition === "all" ? (
							<Button
								colorScheme='teal'
								variant={"solid"}
								w={"95px"}
								onClick={() => handleSortCondition("all")}>
								全て
							</Button>
						) : (
							<Button
								colorScheme='teal'
								variant={"outline"}
								w={"95px"}
								onClick={() => handleSortCondition("all")}>
								全て
							</Button>
						)}
					</Box>
				</Box>
				<Box display={"flex"} w={"40%"}>
					<Input
						placeholder='クイック作成'
						textColor={"white"}
						mr={"10px"}
						value={quickTitle}
						onChange={(e) => handleChangeQuickTitle(e)}
					/>
					{quickTitle ? (
						<Button w={"130px"} colorScheme='green'>
							クイック追加
						</Button>
					) : (
						<Button w={"130px"} colorScheme='green' onClick={handleModalToggle}>
							詳細追加
						</Button>
					)}
				</Box>
			</Box>
		</>
	);
}

export default SearchConditionButtons;
