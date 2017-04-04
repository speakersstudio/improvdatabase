import {Purchase} from './purchase';
import {MaterialItem} from './material-item';
import {Subscription} from './subscription';

export class Preference {
    _id?: string;
    key: string;
    value: string;
    date?: Date;
    user?: string;
}

export class User {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    company: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    improvExp: number;
    facilitationExp: number;
    trainingInterest: boolean;
    url: string;
    dateAdded: Date;
    dateModified: Date;
    locked: boolean;
    description: string;
    permissions: Object;
    actions: string[];

    purchases: Purchase[];
    materials: MaterialItem[];
    subscription: Subscription;
    preferences: Preference[];
}