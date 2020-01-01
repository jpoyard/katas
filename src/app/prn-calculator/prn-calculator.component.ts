import {PRNCalculator} from "./prn-calculator";
import {STYLE} from "./prn-calculator.component.style";

export class FizzBuzzElement extends HTMLElement {
    private calculator: PRNCalculator = new PRNCalculator();
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
