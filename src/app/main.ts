import {FizzBuzzElement} from './fizz-buzz';
import './style.css';
import {RpnCalculatorElement} from "./rpn-calculator";
import {MinesWeeperElement} from "./minesweeper";

const PACKAGE = require('./../../package.json');

const ELEMENTS = [MinesWeeperElement, FizzBuzzElement, RpnCalculatorElement];

function getName(constructor: Function) {
    return constructor.name
        .replace(/([A-Z])/g, "-$1")
        .toLowerCase().split('-').filter(i => !!i && i.length > 0 && i !== 'element').join('-');
}

export const defineElements: () => void = () => {
    ELEMENTS.forEach(constructor => {
        const name = getName(constructor);
        customElements.define(name, constructor);
    })
};

function insertElement(bodyElement: HTMLElement, name: string) {
    bodyElement.innerHTML = `<${name} style="display: flex; flex: 1 1 auto"></${name}>`
}

function createHeader(bodyElement: HTMLElement): HTMLElement {
    const headerElement = document.createElement('header');
    headerElement.style.display = 'flex';
    headerElement.style.margin = '10px';

    ELEMENTS.forEach(constructor => {
        const name = getName(constructor);
        const button = document.createElement('button');
        button.textContent = name;
        button.onclick = () => insertElement(bodyElement, name);
        headerElement.appendChild(button);
    });
    return headerElement;
}

function createFooter(): HTMLElement {
    const footerElememnt = document.createElement('footer');
    footerElememnt.textContent = `version ${PACKAGE.version}`;
    return footerElememnt;
}

function createBody(): HTMLElement {
    const bodyElement = document.createElement('div');
    bodyElement.style.flex = "1 1 auto";
    bodyElement.style.display = "flex";
    return bodyElement;
}

export const createElement: () => HTMLElement = () => {
    const mainElement = document.createElement('div');
    mainElement.style.display = 'flex';
    mainElement.style.flex = '1 1 auto';
    mainElement.style.flexDirection = 'column';
    mainElement.style.justifyContent = 'space-between';

    const body = createBody();
    insertElement(body, getName(ELEMENTS[0]));

    mainElement.appendChild(createHeader(body));
    mainElement.appendChild(body);
    mainElement.appendChild(createFooter());

    return mainElement;
};


