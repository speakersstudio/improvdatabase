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
import { TeamService } from '../service/team.service';
import { LibraryService } from '../service/library.service';
import { CartService } from '../service/cart.service';

import { User } from '../model/user';
import { Team } from '../model/team';
import { Package } from '../model/package';

import { ToggleAnim } from '../util/anim.util';

import { BracketCardDirective } from '../view/bracket-card.directive';

import { PackageConfig } from '../model/config';

declare var Stripe: any;

@Component({
    moduleId: module.id,
    selector: "signup",
    templateUrl: '../template/signup.component.html',
    animations: [
        ToggleAnim.fadeAbsolute,
        ToggleAnim.bubble
    ]
})
export class SignupComponent implements OnInit {

    @ViewChild('page') pageElement;

    @ViewChild('facilitatorCard', {read: BracketCardDirective}) facilitatorCard: BracketCardDirective;
    @ViewChild('improviserCard', {read: BracketCardDirective}) improviserCard: BracketCardDirective;
    @ViewChild('yourselfCard', {read: BracketCardDirective}) yourselfCard: BracketCardDirective;
    @ViewChild('yourTeamCard', {read: BracketCardDirective}) yourTeamCard: BracketCardDirective;
    @ViewChildren('packageCard', {read: BracketCardDirective}) packageCards: QueryList<BracketCardDirective>;

    private config: PackageConfig = new PackageConfig();

    userType: string;
    teamOption: string;

    email: string;
    password: string;
    teamName: string;
    userName: string;

    packages: Package[];
    options: Package[];
    selectedPackage: Package;
    isLoadingPackages: boolean = false;

    isPosting: boolean = false;

    stripe: any;
    creditCard: any;

    emailError: string;
    cardError: string;
    teamError: string;

    cardComplete: boolean = false;

    constructor(
        private _app: AppComponent,
        private router: Router,
        private userService: UserService,
        private libraryService: LibraryService,
        private cartService: CartService,
        private teamService: TeamService
    ) { }

    ngOnInit(): void {

        if (this.userService.isLoggedIn()) {
            this.router.navigate(['/app/dashboard'], {replaceUrl: true});
        }

        this._app.showLoader();

        this.cartService.getConfig().then(config => {
            this.config = config;
            this.setup();
        })

    }

    setup(): void {

        this._app.showBackground(true);

        this.isLoadingPackages = true;
        this.libraryService.getPackages().then(packages => {
            this.isLoadingPackages = false;
        });

        this.stripe = Stripe(this._app.config.stripe);
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


        this.libraryService.getPackages().then(p => {
            this.packages = p;
        });

        this._app.hideLoader();

    }

    emailTimer: any;
    emailInput(): void {
        clearTimeout(this.emailTimer);

        this.emailError = '';
        this.emailTimer = setTimeout(() => {
            this.validateEmail();
        }, 500);
    }

    validateEmail(): void {
        let user = new User();

        if (this.email.indexOf('@') > -1 && this.email.indexOf('.') > -1) {
            user.email = this.email;
            this.userService.validate(user).then(message => {
                this.emailError = message;
            });
        } else {
            this.emailError = 'This does not seem to be a valid email address.';
        }
    }

    teamTimer: any;
    teamInput(): void {
        clearTimeout(this.teamTimer);

        this.teamError = '';
        this.teamTimer = setTimeout(() => {
            this.validateTeam();
        }, 500);
    }

    validateTeam(): void {
        let team = new Team();
        team.name = this.teamName;

        this.teamService.validate(team).then(message => {
            this.teamError = message;
        });
    }

    setPageHeight(): void {
        let page = <HTMLElement> this.pageElement.nativeElement,
            height = page.offsetHeight,
            currentMinHeight = page.style.minHeight ? parseInt(page.style.minHeight.replace('px', '')) : 0;

        if (height > currentMinHeight) {
            page.style.minHeight = page.offsetHeight + 'px';
        }
    }

    selectCard(option: string, value: string, cardToOpen: BracketCardDirective, cardToClose: BracketCardDirective): void {
        if (this[option] == value) {
            return;
        }

        this.setPageHeight();

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
        this.cartService.reset();

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

        // add a subscription option to the list
        let subOption = new Package();
        subOption._id = 'sub';
        this.options = [];

        if (this.userType == 'facilitator') {
            if (!team) {
                subOption.name = 'Individual Facilitator Subscription';
                subOption.price = this.config.fac_sub_price;

                subOption.description = [
                    "Gain access to the the app for one year.",
                    "Browse and purchase from our catalogue of facilitation materials.",
                    "Utilize the database of over 200 Improv Exercises."
                ]

                this.packages.forEach(p => {
                    let copy = Object.assign({}, p);
                    this.options.push(copy);
                });

            } else {
                subOption.name = 'Facilitator Team Subscription';
                subOption.price = this.config.fac_team_sub_price;

                subOption.description = [
                    "Your team can share and collaborate with the ImprovPlus app.",
                    "Browse and purchase from our catalogue of facilitation materials.",
                    "Utilize the database of over 200 Improv Exercises."
                ];

                this.packages.forEach(p => {
                    let copy = Object.assign({}, p);
                    // the facilitator team packages are more expensive
                    copy.price += this.config.fac_team_package_markup;
                    this.options.push(copy);
                });
            }
        } else {
            if (!team) {
                subOption.name = 'Individual Improviser Subscription';
                subOption.price = this.config.improv_sub_price;

                subOption.description = [
                    "Gain access to the app for one year.",
                    "Browse the database of over 200 Improv Games.",
                    "Join the ever-growing ImprovPlus community."
                ]
            } else {
                subOption.name = 'Improviser Team Subscription';
                subOption.price = this.config.improv_team_sub_price;

                subOption.description = [
                    'Access powerful marketing and collaboration tools.',
                    'Browse the database of over 200 Improv Games.',
                    "Join the ever-growing ImprovPlus community."
                ]
            }
        }

        this.options.push(subOption);
    }

    selectPackage($event, pack: Package, cardClicked: HTMLElement): void {
        if (pack == this.selectedPackage) {
            return;
        }

        this.cartService.reset();

        this.setPageHeight();

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

            if (this.selectedPackage._id == 'sub') {
                let role;
                if (this.userType == 'facilitator') {
                    if (this.teamOption == 'team') {
                        role = this.config.role_facilitator_team;
                    } else {
                        role = this.config.role_facilitator;
                    }
                } else if (this.userType == 'improviser') {
                    if (this.teamOption == 'team') {
                        role = this.config.role_improviser_team;
                    } else {
                        role = this.config.role_improviser;
                    }
                }
                this.cartService.addSubscription(role);
            } else {
                this.cartService.addPackage(this.selectedPackage);
            }

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
        if (this.cardError || !this.cardComplete || this.teamError) {
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

                this.cartService.signup(result.token, this.email, this.password, this.userName, this.teamName)
                    .catch(response => {
                        this._app.hideLoader();
                        this.isPosting = false;
                        let msg = response.json();
                        if (msg.error && msg.error == 'email already exists') {
                            this.emailError = "That email address is already registered.";
                            // let card: HTMLElement = this.facilitatorCard.nativeElement;
                            // this._app.scrollTo(card.offsetTop);
                        } else if (msg.error) {
                            this._app.dialog('An error has occurred.', 'We are so sorry. Something happened, and we can\'t be sure what. Please try again, and if this keeps happening, reach out to us by emailing contact@improvpl.us. Have a nice day, dude.', 'Okay bye', null, true);
                        }
                    })
                    .then(u => {
                        if (u && u.email) {
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
