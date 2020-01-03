import {STYLE} from "./volume-credits.component.style";
import {statement} from "./service/statement";

export class VolumeCreditsElement extends HTMLElement {
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
        const container = document.createElement('pre');

        const invoice = require('./samples/invoices.json')[0];
        const plays = require('./samples/plays.json');
        const result = statement(invoice, plays);

        container.textContent = result

        return container;
    }
}
