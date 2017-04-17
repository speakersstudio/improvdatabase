import { 
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { AppComponent } from '../component/app.component';

import { User } from '../model/user';
import { UserService } from '../service/user.service';

@Component({
    moduleId: module.id,
    selector: 'user-form',
    templateUrl: '../template/view/user-form.view.html'
})
export class UserFormView implements OnInit, OnDestroy {

    @Input() user: User;
    @Input() backText: string;
    @Input() isPosting: boolean = false;
    @Input() saveText: string = "Save";

    @Output() back: EventEmitter<boolean> = new EventEmitter();
    @Output('valid') onValidated: EventEmitter<User> = new EventEmitter();

    newUser: boolean;

    isValidating: boolean;
    emailConflict: boolean;

    email: string;
    password: string;
    passwordConfirm: string;
    passwordMatchError: boolean;

    constructor(
        private _app: AppComponent,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.newUser = this.user._id == undefined;
    }

    ngOnDestroy(): void {
        
    }

    goBack(): void {
        // this._app.logout();
        this.back.emit(true);
    }

    submitForm(): void {
        this.passwordMatchError = false;
        this.emailConflict = false;

        if (this.password === this.passwordConfirm) {
            this.user.password = this.password;

            this.isValidating = true;

            this.userService.validate(this.user)
                .then(conflict => {
                    this.isValidating = false;

                    if (conflict) {
                        if (conflict == 'email') {
                            this.emailConflict = true;
                        }
                    } else {
                        this.onValidated.emit(this.user);

                        this.password = "";
                        this.passwordConfirm = "";
                    }
            });
        } else {
            this.passwordMatchError = true;
        }
    }
    
}
