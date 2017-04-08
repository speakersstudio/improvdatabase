import { MaterialItem } from './material-item';

// export class PackageMaterial {
//     "_id": string;
//     "materialItem": MaterialItem;
//     "addon": boolean;
// }

export class Package {
    "_id": string;
    "slug": string;
    "name": string;
    "description": string[];
    "color": string;
    "price": number;
    "dateAdded": Date;
    "dateModified": Date;
    "materials": MaterialItem[];
    "type": string;
    "team": boolean;
    "subscriptions": number;
    "role": number;
}