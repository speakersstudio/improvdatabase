import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { UserService } from '../service/user.service';
import { LibraryService } from '../service/library.service';
import { CartService } from '../service/cart.service';

import { Config } from '../config';

import { User } from '../model/user';
import { Package } from '../model/package';

declare var Stripe: any;

@Component({
    moduleId: module.id,
    selector: "signup",
    templateUrl: '../template/signup.component.html'
})
export class SignupComponent implements OnInit {

    user: User;
    packages: Package[];

    selectedPackage: Package;

    isLoadingPackages: boolean = false;

    isPosting: boolean = false;

    step: number = 1;

    stripe: any;
    card: any;
    cardError: string;

    constructor(
        private _app: AppComponent,
        private router: Router,
        private userService: UserService,
        private libraryService: LibraryService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        
        this.user = new User();
        this.user.improvExp = 1;
        this.user.facilitationExp = 1;

        this.isLoadingPackages = true;
        this.libraryService.getPackages().then(packages => {
            this.packages = packages;
            this.isLoadingPackages = false;
        });

        this.step1();

    }

    step1(): void {
        this.step = 1;
        this.cartService.reset();
    }

    selectPackage(pack: Package): void {
        this.selectedPackage = pack;
        this.cartService.addPackage(pack);
        this.showUser();
    }

    showUser(): void {
        this.step = 2;
    }

    saveUser(user: User): void {

        this.user = user;
        this.cartService.setUser(this.user);

        this.step = 3;

        let button = document.querySelector('.button.raised'),
            color = document.defaultView.getComputedStyle(button)['background-color'];

        // setup the stripe credit card input
        setTimeout(() => {
            this.stripe = Stripe(Config.STRIPE_KEY);
            let elements = this.stripe.elements();
            this.card = elements.create('card', {
                value: {postalCode: this.user.zip},
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

    submitPayment(): void {

        this.isPosting = true;
        this.stripe.createToken(this.card).then(result => {
            if (result.error) {
                this.cardError = result.error.message;
            } else {
                this.cartService.charge(result.token)
                    .then(user => {
                        return this.userService.login(this.user.email, this.user.password);
                    });
            }
        });

    }

}
