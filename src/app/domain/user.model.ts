export interface User {
    id?: string;
    email: string;
    password: string;
    name: string;
    avatar: string;
    projectIds: string[];
}