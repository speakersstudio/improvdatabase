import { Team } from './team';
import { Invite } from './invite';

export class Subscription {
    _id: string;
    start: Date;
    role: number;
    roleName: string;

    type: string; // 'facilitator' or 'improviser'

    expiration: Date;

    team: string|Team; // the _id of the team with this sub
    subscriptions: number; // how many users can inherit this sub
    children: string[]|Subscription[]; // array of _ids (or the data) of child subscriptions
    invites: Invite[];

    user: string; // the _id of the user who has this subscription

    parent: string|Subscription; // the _id (or Subscription object) of a parent subscription
}