export type LocalCommonInformation = {
	id: string;
	createdAt: string;
	title: string;
	description: string;
};

export type FirebaseCommonInformation = {
	id?: string;
	createdAt: string;
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

export type LocalInformation = LocalCommonInformation &
	TasksInformation &
	NotesInformation &
	BoardsInformation;

export type FirebaseInformation = FirebaseCommonInformation &
	TasksInformation &
	NotesInformation &
	BoardsInformation;
