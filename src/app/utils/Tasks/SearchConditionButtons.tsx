"use client";
import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Modal } from "../../../components/Modal";
function SearchConditionButtons(props: any) {
	const { quickTitle, handleChangeQuickTitle } = props;
	const [isModalOpen, setIsModalOpen] = useState(false);
	/** モーダルを表示非表示を切り替える関数です。
	 * @function
	 */
	const handleModalToggle = () => {
		setIsModalOpen(!isModalOpen);
	};

	return (
		<>
			{isModalOpen ? <Modal handleModalToggle={handleModalToggle} /> : null}
			<Box display={"flex"} justifyContent={"space-between"}>
				<Box display={"flex"}>
					<Box pr={"20px"}>
						<Button colorScheme='teal' variant={"solid"} w={"95px"} mr={"5px"}>
							今日
						</Button>
						<Button
							colorScheme='teal'
							variant={"outline"}
							w={"95px"}
							mr={"5px"}>
							今週
						</Button>
						<Button colorScheme='teal' variant={"outline"} w={"95px"}>
							今月
						</Button>
					</Box>
					<Box pr={"20px"}>
						<Button
							colorScheme='teal'
							variant={"outline"}
							w={"95px"}
							mr={"5px"}>
							先7日間
						</Button>
						<Button colorScheme='teal' variant={"outline"} w={"95px"}>
							先1ヶ月
						</Button>
					</Box>
					<Box>
						<Button colorScheme='teal' variant={"outline"} w={"95px"}>
							全て
						</Button>
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
