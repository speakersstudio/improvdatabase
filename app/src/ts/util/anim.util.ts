import {
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/animations';

const DIALOG_STYLE_IN = {
        transform: 'scale(1)',
        opacity: 1
    };
const DIALOG_STYLE_OUT = {
        transform: 'scale(0.1)',
        opacity: 0
    };
const DIALOG_ANIM_DURATION = 200;

const FADE_STYLE_IN = { opacity: 1 };
const FADE_STYLE_OUT = { opacity: 0 };
const FADE_STYLE_ABSOLUTE_OUT = {
    opacity: 0,
    position: 'absolute'
};
const FADE_ANIM_DURATION = 200;

// bouncing
const EASE_IN_BACK = 'cubic-bezier(0.600, -0.280, 0.735, 0.045)';
const EASE_OUT_BACK = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)';

export class DialogAnim {
    static dialog = trigger('dialog', [
        state('in', style(DIALOG_STYLE_IN)),
        transition('void => *', [
            style(DIALOG_STYLE_OUT),
            animate(DIALOG_ANIM_DURATION + 'ms ' + EASE_OUT_BACK)
        ]),
        transition('* => void', [
            animate(DIALOG_ANIM_DURATION + 'ms ' + EASE_IN_BACK, style(DIALOG_STYLE_OUT))
        ])
    ]);

    static dialogSlow = trigger('dialogSlow', [
        state('in', style(DIALOG_STYLE_IN)),
        transition('void => *', [
            style(DIALOG_STYLE_OUT),
            animate((DIALOG_ANIM_DURATION*2) + 'ms ' + EASE_OUT_BACK)
        ]),
        transition('* => void', [
            animate((DIALOG_ANIM_DURATION*2) + 'ms ' + EASE_IN_BACK, style(DIALOG_STYLE_OUT))
        ])
    ]);
}

export class FadeAnim {
    static fade = trigger('fade', [
        state('in', style(FADE_STYLE_IN)),
        transition('void => *', [
            style(FADE_STYLE_OUT),
            animate(FADE_ANIM_DURATION + 'ms ease-in-out')
        ]),
        transition('* => void', [
            animate(FADE_ANIM_DURATION + 'ms ease-in-out', style(FADE_STYLE_OUT))
        ])
    ]);

    static fadeAbsolute = trigger('fadeAbsolute', [
        state('in', style(FADE_STYLE_IN)),
        transition('void => *', [
            style(FADE_STYLE_ABSOLUTE_OUT),
            animate(FADE_ANIM_DURATION + 'ms ease-in-out')
        ]),
        transition('* => void', [
            animate(FADE_ANIM_DURATION + 'ms ease-in-out', style(FADE_STYLE_ABSOLUTE_OUT))
        ])
    ]);
}

export class CardAnim {
    static closeCard(cardElement: Element, delay?: number): void {
        if (!cardElement) {
            return;
        }
        let card = <HTMLElement>cardElement,
            children = card.children;

        delay = delay || 10;

        setTimeout(() => {
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
            if (!card.dataset.width) {
                card.dataset.width = card.offsetWidth.toString();
            }

            // card.style.height = card.offsetHeight + 'px';
            card.style.width = card.dataset.width + 'px';
            card.style.overflow = 'hidden';

            setTimeout(() => {
                card.style.flexGrow = '0';
                card.style.width = '0px';
                card.style.opacity = '0.5';
            }, 10);
        }, delay);
    }

    static openCard(cardElement: Element, delay?: number): void {
        if (!cardElement) {
            return;
        }
        let card = <HTMLElement>cardElement,
            children = card.children,
            width = card.dataset.width;

        if (!width) {
            return; // uh oh?
        }

        delay = delay || 10;

        setTimeout(() => {
            for(let i = 0; i < children.length; i++) {
                let child = <HTMLElement> children[i];

                child.style.opacity = '0';

                setTimeout(() => {
                    child.style.opacity = '1';
                }, 200)
            }

            card.style.width = width + 'px';
            card.style.overflow = 'hidden';

            setTimeout(() => {
                card.style.width = width + 'px';
                card.style.opacity = '1';

                setTimeout(() => {
                    card.style.flexGrow = '';
                    card.style.width = '';
                    card.style.height = '';
                    card.style.overflow = '';
                }, 500)
            }, 10);
        }, delay);
    }
}