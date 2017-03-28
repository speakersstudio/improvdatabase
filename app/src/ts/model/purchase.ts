import { MaterialItem } from './material-item';
import { Package } from './package';

export class Purchase {
    _id?: string;
    user?: string;
    date?: Date;
    type: string;
    materialItem?: MaterialItem;
    package?: Package;
    total: number;
    refunded?: boolean;
}