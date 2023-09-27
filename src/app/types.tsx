import { Dispatch, SetStateAction } from "react";

export type Information = {
	id?: string;
	createdAt: string;
	title: string;
	description: string;
	done: boolean;
	completedAt: string;
	timeLimit: string;
	planStart: string;
	planEnd: string;
	progress: number;
	notesArchive: boolean;
	boardName: string;
	boardStatus: string;
	boardsArchive: boolean;
};

export type InformationsContextType = {
	informations: Information[];
	setInformations: Dispatch<SetStateAction<Information[]>>;
};

export type SortTypeString =
	| "all"
	| "today"
	| "thisWeek"
	| "thisMonth"
	| "next7days"
	| "next1month";

export type SortConditionContextType = {
	sortCondition: SortTypeString;
	setSortCondition: React.Dispatch<React.SetStateAction<SortTypeString>>;
};
