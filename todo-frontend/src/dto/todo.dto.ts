import {Tag} from "./tag.dto";

export interface Todo {
    id: number;
    title: string;
    content: string;
    status: "Incomplete" | "Complete";
    creationDate: string;
    updateDate: string;
    deadline: string;
    completedDate: string | null;
    overDue: boolean;
    tags: Tag[];
}