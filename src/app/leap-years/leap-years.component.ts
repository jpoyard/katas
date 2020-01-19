import {STYLE} from "./leap-years.component.style";

export class LeapYearsElement extends HTMLElement {
    public static readonly EXPRESSIONS = [];
    // private leapYears: RPNCalculator = new RPNCalculator();
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

        LeapYearsElement.EXPRESSIONS.forEach(
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
                // cellResult.textContent = this.leapYears.calculate(expression).toString();
                row.appendChild(cellResult);
            }
        );


        return container;
    }
}
