import {STYLE} from "./rpn-calculator.component.style";
import {RPNCalculator} from "./service/rpn-calculator";

export class RpnCalculatorElement extends HTMLElement {
    private calculator: RPNCalculator = new RPNCalculator();
    private shadow: ShadowRoot;
    public static readonly EXPRESSIONS = [
        '9 3 /', '4 2 /', '20 4 /', '20 10 /', '22 12 +', '12 9 -', '2 4 *',
        '4 2 + 3 -', '3 5 8 * 7 + *',
        '9 SQRT',
        '5 3 4 2 9 1 MAX', '4 5 MAX 1 2 MAX *'
    ];

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

        RpnCalculatorElement.EXPRESSIONS.forEach(
            expression => {
                const row = document.createElement('div');
                row.classList.add('row');
                container.appendChild(row);

                const cellExpression = document.createElement('div');
                cellExpression.classList.add('cell');
                cellExpression.classList.add('expression');
                cellExpression.textContent = expression;
                row.appendChild(cellExpression);

                const cellEqual = document.createElement('div');
                cellEqual.classList.add('cell');
                cellEqual.classList.add('equal');
                cellEqual.textContent = '=';
                row.appendChild(cellEqual);

                const cellResult = document.createElement('div');
                cellResult.classList.add('cell');
                cellResult.classList.add('result');
                cellResult.textContent = this.calculator.calculate(expression).toString();
                row.appendChild(cellResult);
            }
        )


        return container;
    }
}
