import { 
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef
} from '@angular/core';

import { Address } from '../../model/address';

@Component({
    moduleId: module.id,
    selector: '.improvplus-editable-metadata',
    templateUrl: '../template/view/editable-metadata.view.html'
})
export class EditableMetadataView implements OnInit {

    @ViewChild('metadataInput') inputElement;

    @Input() icon: string;
    @Input() text: string;
    @Input() blankText: string;
    @Input() canEdit: boolean;

    @Input() type: string = 'text';

    @Output() save: EventEmitter<string> = new EventEmitter();
    @Output() saveAddress: EventEmitter<Address> = new EventEmitter();

    private editShown: boolean;

    private editModel: string;

    @Input() address: string;
    @Input() city: string;
    @Input() state: string;
    @Input() zip: string;
    @Input() country: string;

    constructor(
    ) { }

    ngOnInit(): void {
        if (this.address) {
            this.type = 'address';
        }

        if (this.type == 'address') {
            this.setupAddress();
        }
    }

    private _focusInput(): void {
        (<HTMLInputElement> this.inputElement.nativeElement).focus();
    }

    setupAddress(): void {
        let address = this.address || '',
            city = this.city || '',
            state = this.state || '',
            zip = this.zip || '',
            country = this.country || '';

        this.text = address;
        if (address && (city || state || zip)) {
            this.text += '<br />';
        }
        this.text += city + ' ' + state;
        if ((city || state) && zip) {
            this.text += ',';
        }
        this.text += ' ' + zip;
        if (this.text && country) {
            this.text += '<br />';
        }
        this.text += country;

        this.text = this.text.trim();
    }

    showEdit(): void {
        if (this.canEdit) {
            this.editModel = this.text
            this.editShown = true;
            setTimeout(() => {
                this._focusInput();
            })
        }
    }

    closeEdit(): void {
        this.editShown = false;
        this.editModel = this.text;
    }

    pressEnter(): void {
        (<HTMLInputElement> this.inputElement.nativeElement).blur();
    }

    saveEdit(): void {
        if (this.type == 'address') {
            this.setupAddress();
            this.saveAddress.emit({
                address: this.address,
                city: this.city,
                state: this.state,
                zip: this.zip,
                country: this.country
            });
        } else if (this.editModel && this.editModel != this.text) {
            this.text = this.editModel;
            this.save.emit(this.editModel);
        }

        this.closeEdit();
    }
}
