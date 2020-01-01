import {FizzBuzz} from "./fizz-buzz";
import {STYLE} from "./fizz-buzz.component.style";

export class FizzBuzzElement extends HTMLElement {
    private fizzBuzz: FizzBuzz = new FizzBuzz();
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

        for (let i = 0; i < 100; i++) {
            let newChild = document.createElement('div');
            container.appendChild(newChild);
            setTimeout(() => {
                const resultElt = document.createElement('div');
                const result = this.fizzBuzz.play(i + 1);
                resultElt.classList.add('result');
                resultElt.classList.add(this.getClassName(result));
                resultElt.textContent = this.getValue(result);
                newChild.appendChild(resultElt);
            }, i * 1000)
        }
        return container;
    }

    private getClassName(value: string): string {
        if (value === 'FizzBuzz') {
            return 'fizz-buzz';
        }
        if (value === 'Fizz') {
            return 'fizz';
        }
        if (value === 'Buzz') {
            return 'buzz';
        }
        return 'number';
    }

    private getValue(value: string): string {
        if (value === 'FizzBuzz') {
            return 'fizz buzz';
        }
        if (value === 'Fizz') {
            return 'fizz';
        }
        if (value === 'Buzz') {
            return 'buzz'
        }
        return value;
    }
}
