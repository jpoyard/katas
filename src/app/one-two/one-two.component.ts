import {STYLE} from "./one-two.component.style";
import {OneTwo} from "./service/one-two.class";

export class OneTwoElement extends HTMLElement {
    public static readonly EXPRESSIONS = ["1", "2", "1 2", "3 9", "2 2", "3 9 9 9 8 8", "1 1 1 1 1 1 1", "2 4 4 4 6 6 6 6 6", "5 5 5 5 5 5 5 5 5 5 5 5"];
    private oneTwo = new OneTwo();
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

        OneTwoElement.EXPRESSIONS.forEach(
            expression => {
                const row = document.createElement('div');
                row.classList.add('row');
                container.appendChild(row);

                const cellExpression = document.createElement('div');
                cellExpression.classList.add('cell');
                cellExpression.classList.add('expression');
                cellExpression.textContent = `'${expression}'`;
                row.appendChild(cellExpression);

                const cellEqual1 = document.createElement('div');
                cellEqual1.classList.add('cell');
                cellEqual1.classList.add('equal');
                cellEqual1.textContent = '=';
                row.appendChild(cellEqual1);

                const cellResult1 = document.createElement('div');
                cellResult1.classList.add('cell');
                cellResult1.classList.add('result');
                const result1 = this.oneTwo.convertNumberToString(expression).toString()
                cellResult1.textContent = `'${result1}'`;
                row.appendChild(cellResult1);

                const cellEqual2 = document.createElement('div');
                cellEqual2.classList.add('cell');
                cellEqual2.classList.add('equal');
                cellEqual2.textContent = '=';
                row.appendChild(cellEqual2);

                const cellResult2 = document.createElement('div');
                cellResult2.classList.add('cell');
                cellResult2.classList.add('result');
                const result2 = this.oneTwo.convertStringToNumber(result1).toString()
                cellResult2.textContent = `'${result2}'`;
                row.appendChild(cellResult2);
            }
        );
        return container;
    }
}
