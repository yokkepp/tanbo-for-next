/**
 * 日時の情報を受け取り、表示したいフォーマットにして返却する関数です。（2023-08-03T14:30 → 2023/08/03 14:30）
 * @function
 * @param date string型の日時データです。（2023-08-03T14:30 ）
 */
export const changeDateFormat = (date: string) => {
	const newDate = new Date(date);
	const year = newDate.getFullYear();
	const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
	const day = newDate.getDate().toString().padStart(2, "0");
	const hours = newDate.getHours().toString().padStart(2, "0");
	const minutes = newDate.getMinutes().toString().padStart(2, "0");
	const dateAndTime = `${year}/${month}/${day} ${hours}:${minutes}`;
	const dateAndTimeInDB = `${year}-${month}-${day}T${hours}:${minutes}`;
	const serialDate = newDate.getTime();
	return { dateAndTime, dateAndTimeInDB, serialDate };
};

type SortTypeString =
	| "all"
	| "today"
	| "thisWeek"
	| "thisMonth"
	| "next7days"
	| "next1month";

/**
 * sortConditionの状態を渡すことで、表示対象の開始日と終了日を返す関数です。
 * @param sortTypeString "all", "today", "thisWeek", "thisMonth", "next7days", "next1month" のいずれかです。
 */
export const sortConditionRange = (
	sortTypeString: SortTypeString
): { startDate: Date; endDate: Date } => {
	const currentDate = new Date();
	const startDate = new Date(currentDate);
	startDate.setHours(0, 0, 0);
	let endDate = new Date(currentDate);
	const year = endDate.getFullYear();
	const month = endDate.getMonth();
	const date = endDate.getDate();

	switch (sortTypeString) {
		case "today":
			endDate.setHours(23, 59, 59);
			break;
		case "thisWeek":
			endDate.setDate(currentDate.getDate() + (7 - currentDate.getDay()));
			endDate.setHours(23, 59, 59);
			break;
		case "thisMonth":
			const newEndDate = new Date(year, month + 1, 1);
			newEndDate.setDate(newEndDate.getDate() - 1);
			newEndDate.setHours(23, 59, 59);
			endDate = newEndDate;
			break;
		case "next7days":
			endDate.setDate(currentDate.getDate() + 7);
			break;
		case "next1month":
			const newEndDate2 = new Date(year, month + 1, date);
			endDate.setHours(23, 59, 59);
			endDate = newEndDate2;
			break;
		default:
			break;
	}
	return { startDate, endDate };
};
