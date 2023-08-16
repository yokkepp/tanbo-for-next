export type CommonInformation = {
	title: string;
	description: string;
};

export type TasksInformation = {
	done: boolean;
	completedAt: string;
	timeLimit: string;
	planStart: string;
	planEnd: string;
	progress: number;
};

export type NotesInformation = {
	notesArchive: boolean;
};

export type BoardsInformation = {
	boardName: string;
	boardStatus: string;
	boardsArchive: boolean;
};

export type Informations = CommonInformation &
	TasksInformation &
	NotesInformation &
	BoardsInformation;
