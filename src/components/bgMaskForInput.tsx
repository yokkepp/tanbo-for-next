import { Box } from "@chakra-ui/react";

/**
 * 編集時の編集中以外の要素にマスクをかけるためのコンポーネントです。
 * @param endEdit endEdit関数を渡します。
 * @returns エレメントが返ります。
 */
export const BgMaskForInput = ({ endEdit }) => {
	return (
		<Box
			w={"100vw"}
			h={"100vh"}
			top={0}
			left={0}
			position={"absolute"}
			zIndex={"overlay"}
			bg={"blackAlpha.500"}
			onClick={endEdit}></Box>
	);
};
