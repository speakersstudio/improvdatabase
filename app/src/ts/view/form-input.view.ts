import { 
    Component,
    Input,
    ViewChild,
    OnInit
} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: '.form-input-component',
    templateUrl: '../template/view/form-input.view.html'
})
export class FormInputView implements OnInit {
    @Input() text: String;
    @Input() name: String;
    @Input() required: boolean;
    @Input() model: any;

    @ViewChild('input') input;
    @ViewChild('label') label;

    type: string;

    constructor(
    ) { }

    ngOnInit(): void {
        this.type = this.name == 'password' ? 'password' : 'text';

        this.blur();
    }

    focus(): void {
        this.label.nativeElement.className = 'active';
    }

    blur(): void {
        if (!this.input.nativeElement.value) {
            this.label.nativeElement.className = '';
        } else {
            this.focus();
        }
    }
}
