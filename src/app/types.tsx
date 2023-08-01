export type CommonInformation = {
	title: string;
	description: string;
};

export type TasksInformation = {
	completedAt: Date;
	timeLimit: Date;
	planStart: Date;
	planEnd: Date;
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
