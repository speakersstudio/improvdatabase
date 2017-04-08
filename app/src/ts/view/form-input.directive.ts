import {
    Directive,
    ElementRef,
    OnInit,
    Input
} from '@angular/core';

@Directive({
    selector: '[formInput]',
    host: {
        '(focus)': 'focus()',
        '(blur)': 'blur()'
    }
})
export class FormInputDirective implements OnInit {

    @Input() error: string;

    inputElement: HTMLInputElement;
    divElement: HTMLDivElement;
    labelElement: HTMLLabelElement;
    placeholder: string;

    constructor(el: ElementRef) {
        this.inputElement = el.nativeElement;
    }

    ngOnInit(): void {
        this.placeholder = this.inputElement.getAttribute('placeholder');

        this.divElement = document.createElement('div');
        this.divElement.className = 'form-input';
        this.inputElement.parentElement.insertBefore(this.divElement, this.inputElement.nextSibling);
        this.divElement.appendChild(this.inputElement);

        this.inputElement.setAttribute('placeholder', '');

        this.labelElement = document.createElement('label');
        this.labelElement.textContent = this.placeholder;
        this.divElement.appendChild(this.labelElement);

        setTimeout(() => {
            if (this.inputElement.value) {
                this.focus();
            }
        }, 10);
    }

    focus(): void {
        this.labelElement.className = 'active';
    }

    blur(): void {
        if (!this.inputElement.value) {
            this.labelElement.className = '';
        } else {
            this.focus();
        }
    }
    
}