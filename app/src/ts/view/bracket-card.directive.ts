import {
    Directive,
    ElementRef,
    OnInit,
    Input
} from '@angular/core';

@Directive({
    selector: '[bracketCard]'
})
export class BracketCardDirective implements OnInit {

    @Input() error: string;

    card: HTMLElement;
    isOpen: boolean;

    constructor(el: ElementRef) {
        this.card = el.nativeElement;
    }

    ngOnInit(): void {
        this._saveDimens();
        this.isOpen = true;
    }

    private _saveDimens(): void {
        this.card.dataset.width = this.card.offsetWidth.toString();
        this.card.dataset.height = this.card.offsetHeight.toString();
    }

    close(delay?: number): void {

        delay = delay || 10;

        this._saveDimens();

        setTimeout(() => {
            if (window.innerWidth < 500) {
                this._closeVertical();
            } else {
                this._closeHorizontal();
            }
            this.isOpen = false;
        }, delay);
    }

    private _closeVertical(): void {
        let children = this.card.children;

        for (let i = 0; i < children.length; i++) {
            let child = <HTMLElement>children[i];
            setTimeout(() => {
                child.style.opacity = '0';
            }, 10)
        }

        this.card.style.height = this.card.offsetHeight + 'px';
        this.card.style.overflow = 'hidden';

        setTimeout(() => {
            this.card.style.height = '0px';
            this.card.style.opacity = '0.5';
        }, 10);
    }

    private _closeHorizontal(): void {
        let children = this.card.children;

        for(let i = 0; i < children.length; i++) {
            let child = <HTMLElement>children[i];
            child.style.width = child.offsetWidth + 'px';
            child.style.boxSizing = 'border-box';
            child.style.transform = 'translateX(-50%)';
            child.style.marginLeft = '50%';

            setTimeout(() => {
                child.style.opacity = '0';
            }, 10)
        }

        this.card.style.width = this.card.offsetWidth + 'px';
        this.card.style.overflow = 'hidden';

        setTimeout(() => {
            this.card.style.flexGrow = '0';
            this.card.style.width = '0px';
            this.card.style.opacity = '0.5';
        }, 10);
    }

    open(delay?: number): void {
        delay = delay || 10;

        if (this.card.style.height !== '0px' && this.card.style.width !== '0px') {
            return;   
        }

        setTimeout(() => {
            let height = this.card.dataset.height,
                width = this.card.dataset.width,
                children = this.card.children;
                
            for(let i = 0; i < children.length; i++) {
                let child = <HTMLElement> children[i];

                child.style.opacity = '0';

                setTimeout(() => {
                    child.style.opacity = '1';
                }, 200)
            }

            this.card.style.overflow = 'hidden';

            setTimeout(() => {
                this.card.style.height = height + 'px';
                this.card.style.width = width + 'px';
                this.card.style.opacity = '1';

                setTimeout(() => {
                    this.card.style.flexGrow = '';
                    this.card.style.width = '';
                    this.card.style.height = '';
                    this.card.style.overflow = '';
                }, 500)
            }, 10);

            this.isOpen = true;
        }, delay);
    }
    
}