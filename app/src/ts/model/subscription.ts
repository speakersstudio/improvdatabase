export class Subscription {
    _id: string;
    start: Date;
    role: number;
    expiration: Date;

    team: string; // the _id of the team with this sub
    subscriptions: number; // how many users can inherit this sub
    children: string[]; // array of _ids of child subscriptions

    user: string; // the _id of the user who has this subscription

    parent: string; // the _id of a parent subscription
}