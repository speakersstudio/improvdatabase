import { Package } from './package';

export class Subscription {
    "_id": string;
    "expires": Date;
    "dateAdded": Date;
    "package": Package;
}