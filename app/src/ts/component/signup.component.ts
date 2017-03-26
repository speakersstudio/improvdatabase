import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { UserService } from '../service/user.service';

import { Config } from '../config';

import { User } from '../model/user';

declare var Stripe: any;

@Component({
    moduleId: module.id,
    selector: "signup",
    templateUrl: '../template/signup.component.html'
})
export class SignupComponent implements OnInit {

    user: User;

    isPostion: boolean = false;

    step: number = 1;

    stripe: any;
    card: any;
    cardError: string;

    constructor(
        private _app: AppComponent,
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        
        this.user = new User();
        this.user.improvExp = 1;
        this.user.facilitationExp = 1;

    }

    saveUser(user: User): void {

        this.user = user;
        this.step = 3;

        setTimeout(() => {
            this.stripe = Stripe(Config.STRIPE_KEY);
            let elements = this.stripe.elements();
            this. card = elements.create('card', {
                style: {
                    base: {
                        color: '#32325d',
                        lineHeight: '24px',
                        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                        fontSmoothing: 'antialiased',
                        fontSize: '16px',

                        '::placeholder': {
                            color: 'rgba(96,96,96,0.5)'
                        }
                    },
                    invalid: {
                        color: '#fa755a',
                        iconColor: '#fa755a'
                    }
                }
            });
            this.card.mount('#card-element');

            this.card.addEventListener('change', e => {
                if (e.error) {
                    this.cardError = e.error.message;
                } else {
                    this.cardError = '';
                }
            });
        }, 100)

    }

    back(): void {
        this.step = 1;
    }

    submitPayment(): void {

        this.stripe.createToken(this.card).then(result => {
            if (result.error) {
                this.cardError = result.error.message;
            } else {
                let token = result.token;
                console.log('token!', this.user, token);
            }
        });

    }

}
