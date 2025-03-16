
export interface Tag {
    id: number;
    tagName: string;
    creationDate: Date;
    updateDate: Date;
}

export interface TagArray {
    tags: Tag[];
}