export class User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
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
    dateAdded: string;
    dateModified: string;
    locked: boolean;
    roleID: number;
    description: string;
    permissions: Object;
    actions: string[];
}