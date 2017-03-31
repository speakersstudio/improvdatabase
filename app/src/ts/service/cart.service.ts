import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { AppHttp } from '../data/app-http';

import { Package } from '../model/package';
import { Purchase } from '../model/purchase';
import { MaterialItem, MaterialItemVersion } from '../model/material-item';
import { Subscription } from '../model/subscription';

import { User } from '../model/user';
import { UserService } from './user.service';

@Injectable()
export class CartService {
    private chargeUrl = "/charge";

    private cart: Purchase[] = [];
    private user: User;

    constructor(
        private http: AppHttp,
        private userService: UserService
        ) { }

    reset(): void {
        this.cart = [];
    }

    addPackage(pack: Package): Purchase[] {
        let purchase = new Purchase();
        if (this.userService.isLoggedIn()) {
            purchase.user = this.userService.getLoggedInUser()._id;
        }
        purchase.type = 'package';
        purchase.total = pack.price;
        purchase.package = pack
        
        this.cart.push(purchase);

        return this.cart;
    }

    setUser(user: User): void {
        this.user = user;
    }

    charge(token: String): Promise<User> {
        return this.http.post(this.chargeUrl, {
            stripeToken: token,
            cart: this.cart,
            user: this.user
        }).toPromise()
            .then(result => {
                return result.json() as User;
            })
    }
}