import {RPNCalculator} from "./rpn-calculator";
import {STYLE} from "./rpn-calculator.component.style";

export class FizzBuzzElement extends HTMLElement {
    private calculator: RPNCalculator = new RPNCalculator();
    private shadow: ShadowRoot;

    constructor() {
        super();
        this.init();
    }

    private init() {
        this.shadow = this.attachShadow({mode: 'open'});

        const wrapper = this.getContent();

        const style = document.createElement('style');

        style.textContent = STYLE;

        this.shadow.appendChild(style);
        this.shadow.appendChild(wrapper);
    }

    private getContent(): HTMLElement {
        const container = document.createElement('div');
        container.classList.add('container');
        return container;
    }
}
