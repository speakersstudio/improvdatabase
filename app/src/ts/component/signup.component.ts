import { 
    Component,
    OnInit,
    ViewChild,
    ViewChildren,
    QueryList,
    ElementRef
} from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { UserService } from '../service/user.service';
import { LibraryService } from '../service/library.service';
import { CartService } from '../service/cart.service';

import { Config } from '../config';

import { User } from '../model/user';
import { Package } from '../model/package';

import { FadeAnim, DialogAnim } from '../util/anim.util';

import { BracketCardDirective } from '../view/bracket-card.directive';

declare var Stripe: any;

@Component({
    moduleId: module.id,
    selector: "signup",
    templateUrl: '../template/signup.component.html',
    animations: [
        FadeAnim.fadeAbsolute,
        DialogAnim.dialogSlow
    ]
})
export class SignupComponent implements OnInit {

    @ViewChild('facilitatorCard', {read: BracketCardDirective}) facilitatorCard: BracketCardDirective;
    @ViewChild('improviserCard', {read: BracketCardDirective}) improviserCard: BracketCardDirective;
    @ViewChild('yourselfCard', {read: BracketCardDirective}) yourselfCard: BracketCardDirective;
    @ViewChild('yourTeamCard', {read: BracketCardDirective}) yourTeamCard: BracketCardDirective;
    @ViewChildren('packageCard', {read: BracketCardDirective}) packageCards: QueryList<BracketCardDirective>;

    userType: string;
    teamOption: string;

    email: string;
    password: string;
    teamName: string;
    userName: string;

    packages: Package[];
    selectedPackage: Package;
    isLoadingPackages: boolean = false;

    isPosting: boolean = false;

    stripe: any;
    creditCard: any;

    emailError: string;
    cardError: string;

    cardComplete: boolean = false;

    constructor(
        private _app: AppComponent,
        private router: Router,
        private userService: UserService,
        private libraryService: LibraryService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {

        this._app.showBackground(true);

        this.isLoadingPackages = true;
        this.libraryService.getPackages().then(packages => {
            this.isLoadingPackages = false;
        });

        this.stripe = Stripe(Config.STRIPE_KEY);
        let elements = this.stripe.elements();
        this.creditCard = elements.create('card', {
            // value: {postalCode: this.user.zip},
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

        this.creditCard.addEventListener('change', e => {
            
            this.cardComplete = e.complete;

            if (e.error) {
                this.cardError = e.error.message;
            } else {
                this.cardError = '';
            }
        });

    }

    selectCard(option: string, value: string, cardToOpen: BracketCardDirective, cardToClose: BracketCardDirective): void {
        if (this[option] == value) {
            return;
        }

        this[option] = '';
        if (option == 'userType') {
            this.teamOption = '';
        }
        if (option == 'teamOption') {
            this.userName = '';
            this.teamName = '';
            this.showPackages(value == 'team');
        }

        let delay = 400;
        if (cardToOpen.isOpen) {
            delay = 200;
        }

        cardToOpen.open(delay);
        cardToClose.close(delay);

        setTimeout(() => {
            this[option] = value;
        }, delay * 2);
    }

    reset(): void {
        this._app.scrollTo(0);

        setTimeout(() => {
            this.userType = '';
            this.teamOption = '';

            this.email = '';
            this.password = '';
            this.userName = '';
            this.teamName = '';
            this.selectedPackage = null;

            this.facilitatorCard.open(500);
            this.improviserCard.open(500)
        }, 600);
    }

    selectFacilitator(): void {
        this.selectCard('userType', 'facilitator', 
            this.facilitatorCard, this.improviserCard);
    }

    selectImproviser(): void {
        this.selectCard('userType', 'improviser', 
            this.improviserCard, this.facilitatorCard);
    }

    selectYourself(): void {
        this.selectCard('teamOption', 'individual', 
            this.yourselfCard, this.yourTeamCard);
    }

    selectYourTeam(): void {
        this.selectCard('teamOption', 'team',
            this.yourTeamCard, this.yourselfCard);
    }

    showPackages(team: boolean): void {
        this.selectedPackage = null;

        this.libraryService.getPackages(this.userType, team).then(p => {
            this.packages = p;
        });
    }

    selectPackage($event, pack: Package, cardClicked: HTMLElement): void {
        if (pack == this.selectedPackage) {
            return;
        }

        this.selectedPackage = null;

        this.packageCards.forEach(card => {
            if (card.card != cardClicked) {
                card.close(200);
            } else {
                card.open(200);
            }
        });

        setTimeout(() => {
            this.selectedPackage = pack;

            // setup the stripe credit card input
            this.creditCard.unmount();
            setTimeout(() => {
                this.creditCard.mount('#card-element');
            }, 400)
        }, 400);
    }

    isFormValid(): boolean {
        if (!this.email) {
            return false;
        }
        if (!this.password) {
            return false;
        }
        if (!this.teamOption || !this.userType) {
            return false;
        }
        if (this.teamOption == 'team' && !this.teamName) {
            return false;
        }
        if (this.teamOption == 'individual' && !this.userName) {
            return false;
        }
        if (this.cardError || !this.cardComplete) {
            return false;
        }
        return true;
    }

    submitPayment(): void {
        if (!this.isFormValid()) {
            return;
        }

        let user = new User();
        if (this.userName && this.userName.length) {
            let nameArray = this.userName.split(' ');
            if (nameArray[0]) {
                user.firstName = nameArray[0];
            }
            if (nameArray[1]) {
                user.lastName = nameArray[1];
            }
        }
        user.email = this.email;
        user.password = this.password;

        this._app.showLoader();
        this.isPosting = true;

        this.stripe.createToken(this.creditCard).then(result => {
            if (result.error) {
                this.cardError = result.error.message;
            } else {
                this.cartService.setUser(user);

                this.cartService.signup(result.token, this.email, this.password, this.selectedPackage, this.userName, this.teamName)
                    .catch(response => {
                        this._app.hideLoader();
                        this.isPosting = false;
                        let msg = response.json();
                        if (msg.error && msg.error == 'email already exists') {
                            this.emailError = "That email address is already registered.";
                            // let card: HTMLElement = this.facilitatorCard.nativeElement;
                            // this._app.scrollTo(card.offsetTop);
                        }
                    })
                    .then(u => {
                        if (u && u.email) {
                            this._app.scrollTo(0,1);
                            return this.userService.login(user.email, user.password);
                        } else {
                            // uh oh?
                        this._app.hideLoader();
                        }
                    });
            }
        });
    }

}
