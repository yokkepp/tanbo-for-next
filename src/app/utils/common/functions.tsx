/**
 * 日時の情報を受け取り、表示したいフォーマットにして返却する関数です。（2023-08-03T14:30 → 2023/08/03 14:30）
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
