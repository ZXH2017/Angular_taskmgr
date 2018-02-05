export interface Project {
    id?: string;
    name: string;
    desc?: string;
    coverImg: string;
    taskLists?: string[];//列表id
    members?: string[];//成员id
}