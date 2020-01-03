import {STYLE} from "./volume-credits.component.style";
import {htmlStatement, statement} from "./service/statement";

export class VolumeCreditsElement extends HTMLElement {
    private shadow: ShadowRoot;

    constructor() {
        super();
        this.init();
    }

    private init() {
        this.shadow = this.attachShadow({mode: 'open'});

        const wrapper = VolumeCreditsElement.getContent();

        const style = document.createElement('style');

        style.textContent = STYLE;

        this.shadow.appendChild(style);
        this.shadow.appendChild(wrapper);
    }

    private static getContent(): HTMLElement {
        const container = document.createElement('div');
        container.classList.add('container');

        const invoice = require('./samples/invoices.json')[0];
        const plays = require('./samples/plays.json');

        container.appendChild(VolumeCreditsElement.renderPlainText(invoice, plays));
        container.appendChild(VolumeCreditsElement.renderHtml(invoice, plays));

        return container;
    }

    private static renderPlainText(invoice, plays) {
        const preElement = document.createElement('pre');
        preElement.textContent = statement(invoice, plays);
        return preElement;
    }

    private static renderHtml(invoice, plays) {
        const preElement = document.createElement('div');
        preElement.innerHTML = htmlStatement(invoice, plays);
        return preElement;
    }
}
