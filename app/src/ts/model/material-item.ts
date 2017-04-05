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
    "price": number;
    "fileslug": string;
    "extension": string;
    "versions": MaterialItemVersion[];
    "visible": boolean;
    "tags": string[];
    "color": string;
}