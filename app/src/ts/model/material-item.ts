export class MaterialItemVersion {
    "_id": string;
    "ver": number;
    "description": string;
    "dateAdded": Date;
}

export class MaterialItem {
    "_id": string;
    "name": string;
    "description": string;
    "versions": MaterialItemVersion[];

    test(): string {
        return "test";
    }
}