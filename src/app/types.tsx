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
