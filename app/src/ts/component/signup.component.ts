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

import { FadeAnim, DialogAnim, CardAnim } from '../util/anim.util';

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

    @ViewChild('facilitatorCard') facilitatorCard: ElementRef;
    @ViewChild('improviserCard') improviserCard: ElementRef;
    @ViewChild('yourselfCard') yourselfCard: ElementRef;
    @ViewChild('yourTeamCard') yourTeamCard: ElementRef;
    @ViewChildren('packageCard') packageCards: QueryList<ElementRef>;

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
    card: any;

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
        this.card = elements.create('card', {
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

        this.card.addEventListener('change', e => {
            
            this.cardComplete = e.complete;

            if (e.error) {
                this.cardError = e.error.message;
            } else {
                this.cardError = '';
            }
        });

    }

    selectCard(option: string, value: string, cardToOpen: HTMLElement, cardToClose: HTMLElement): void {
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

        CardAnim.openCard(cardToOpen, 200);
        CardAnim.closeCard(cardToClose, 200);

        setTimeout(() => {
            this[option] = value;
        }, 400);
    }

    reset(): void {
        this._app.scrollTo(0, 600);

        setTimeout(() => {
            this.userType = '';
            this.teamOption = '';

            this.email = '';
            this.password = '';
            this.userName = '';
            this.teamName = '';
            this.selectedPackage = null;

            CardAnim.openCard(this.facilitatorCard.nativeElement, 200);
            CardAnim.openCard(this.improviserCard.nativeElement, 200);
        }, 600);
    }

    selectFacilitator(): void {
        this.selectCard('userType', 'facilitator', 
            this.facilitatorCard.nativeElement, this.improviserCard.nativeElement);
    }

    selectImproviser(): void {
        this.selectCard('userType', 'improviser', 
            this.improviserCard.nativeElement, this.facilitatorCard.nativeElement);
    }

    selectYourself(): void {
        this.selectCard('teamOption', 'individual', 
            this.yourselfCard.nativeElement, this.yourTeamCard.nativeElement);
    }

    selectYourTeam(): void {
        this.selectCard('teamOption', 'team',
            this.yourTeamCard.nativeElement, this.yourselfCard.nativeElement);
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
            if (card.nativeElement != cardClicked) {
                CardAnim.closeCard(card.nativeElement, 200);
            }
        });
        CardAnim.openCard(cardClicked, 200);

        setTimeout(() => {
            this.selectedPackage = pack;

            // setup the stripe credit card input
            this.card.unmount();
            setTimeout(() => {
                this.card.mount('#card-element');
            }, 400)
        }, 200);
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

        this.stripe.createToken(this.card).then(result => {
            if (result.error) {
                this.cardError = result.error.message;
            } else {
                this.cartService.setUser(user);

                this.cartService.charge(result.token)
                    .catch(response => {
                        this._app.hideLoader();
                        this.isPosting = false;
                        let msg = response.json();
                        if (msg.error && msg.error == 'email already exists') {
                            this.emailError = "That email address is already registered.";
                            let card: HTMLElement = this.facilitatorCard.nativeElement;
                            this._app.scrollTo(card.offsetTop, 600);
                        }
                    })
                    .then(u => {
                        this._app.hideLoader();
                        if (u) {
                            return this.userService.login(user.email, user.password);
                        }
                    });
            }
        });
    }



    // step1(): void {
    //     this.step = 1;
    //     this.cartService.reset();
    // }

    // selectPackage(pack: Package): void {
    //     this.selectedPackage = pack;
    //     this.cartService.addPackage(pack);
    //     this.showUser();
    // }

    // showUser(): void {
    //     this.step = 2;
    // }

    // saveUser(user: User): void {

    //     if (!user || !user.email) {
    //         return;
    //     }

    //     this.user = user;
    //     this.cartService.setUser(this.user);

    //     this.step = 3;

    //     // let button = document.querySelector('.button.raised'),
    //     //     color = document.defaultView.getComputedStyle(button)['background-color'];

    //     // setup the stripe credit card input
    //     setTimeout(() => {
    //         this.stripe = Stripe(Config.STRIPE_KEY);
    //         let elements = this.stripe.elements();
    //         this.card = elements.create('card', {
    //             value: {postalCode: this.user.zip},
    //             style: {
    //                 base: {
    //                     color: '#32325d',
    //                     lineHeight: '24px',
    //                     fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    //                     fontSmoothing: 'antialiased',
    //                     fontSize: '16px',

    //                     '::placeholder': {
    //                         color: 'rgba(96,96,96,0.5)'
    //                     }
    //                 },
    //                 invalid: {
    //                     color: '#fa755a',
    //                     iconColor: '#fa755a'
    //                 }
    //             }
    //         });
    //         this.card.mount('#card-element');

    //         this.card.addEventListener('change', e => {
                
    //             this.cardComplete = e.complete;

    //             if (e.error) {
    //                 this.cardError = e.error.message;
    //             } else {
    //                 this.cardError = '';
    //             }
    //         });

    //     }, 100)

    // }

    // submitPayment(): void {
    //     if (this.cardError || !this.cardComplete) {
    //         return;
    //     }

    //     this.isPosting = true;
    //     this.stripe.createToken(this.card).then(result => {
    //         if (result.error) {
    //             this.cardError = result.error.message;
    //         } else {
    //             this.cartService.charge(result.token)
    //                 .catch(response => {
    //                     this.isPosting = false;
    //                     let msg = response.json();
    //                     if (msg.error && msg.error == 'email already exists') {
    //                         this.showUser();
    //                     }
    //                 })
    //                 .then(user => {
    //                     if (user) {
    //                         return this.userService.login(this.user.email, this.user.password);
    //                     }
    //                 });
    //         }
    //     });

    // }

}
