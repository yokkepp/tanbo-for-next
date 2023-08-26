import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import { InformationsContext } from "@/app/layout";

import {
	Checkbox,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { LocalInformation } from "@/app/types";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase";

/**
 * doneListまたはnotDoneListを引数に渡すことで、リストを生成するコンポーネントです。
 * @param informationList Tasks画面にてリスト表示させたいinformationの配列です。
 * @returns
 */
export default function CreateTaskList({ informationList }: any) {
	const [informations, setInformations]: any = useContext(InformationsContext);

	/**
	 * informationsから任意のinformationを削除する関数です。
	 * @param e イベントです。
	 */
	const handleDeleteList = async (id: string) => {
		if (confirm("本当に削除しますか？")) {
			const newArray = await informations.filter(
				(info: LocalInformation) => info.id !== id
			);
			setInformations(newArray);
			deleteDoc(doc(db, "informations", id));
		} else {
			alert("キャンセルしました。");
		}
	};

	return (
		<TableContainer rounded={"base"} color={"white"} bg={"gray.900"}>
			<Table variant='simple'>
				<Thead bg={"gray.700"}>
					<Tr>
						<Th textColor={"white"}></Th>
						<Th textColor={"white"}>作成日</Th>
						<Th textColor={"white"}>タイトル</Th>
						<Th textColor={"white"}>詳細</Th>
						<Th textColor={"white"}>開始予定</Th>
						<Th textColor={"white"}>終了予定</Th>
						<Th textColor={"white"} isNumeric>
							進捗率(%)
						</Th>
						<Th textColor={"white"}></Th>
					</Tr>
				</Thead>
				<Tbody>
					{informationList.map((info: any) => {
						return (
							<Tr key={info.id} id={info.id}>
								<Td textColor={"white"}>
									<Checkbox
										isChecked={info.done}
										variant={"circular"}
										colorScheme='teal'
										size={"lg"}></Checkbox>
								</Td>
								<Td textColor={"white"}>{info.createdAt}</Td>
								<Td textColor={"white"}>{info.title}</Td>
								<Td textColor={"white"}>
									<button>
										<CopyIcon boxSize={"6"} />
									</button>
								</Td>
								<Td textColor={"white"}>{info.planStart}</Td>
								<Td textColor={"white"}>{info.planEnd}</Td>
								<Td textColor={"white"} isNumeric>
									{info.progress}
								</Td>
								<Td textColor={"white"}>
									<button onClick={() => handleDeleteList(info.id)}>
										<DeleteIcon boxSize={"5"} />
									</button>
								</Td>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
