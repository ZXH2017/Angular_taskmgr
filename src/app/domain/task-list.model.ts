export interface TaskList {
    id?: string;
    name: string;
    order: number;
    taskIds: string[];
    projectId: string;
}