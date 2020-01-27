import {STYLE} from "./minesweeper.component.style";
import {Minesweeper} from "./service/minesweeper.class";

export class MinesWeeperElement extends HTMLElement {
    public static readonly EXPRESSIONS = [
        `3 3\n...\n.*.\n...`,
        `3 3\n***\n*.*\n***`,
        `4 4\n*...\n....\n.*..\n....`,
        `3 5\n**...\n.....\n.*...`
    ];
    private minesweeper: Minesweeper = new Minesweeper();
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

        MinesWeeperElement.EXPRESSIONS.forEach(
            expression => {
                const row = document.createElement('div');
                row.classList.add('row');
                container.appendChild(row);

                const cellExpression = document.createElement('pre');
                cellExpression.classList.add('cell');
                cellExpression.classList.add('expression');
                cellExpression.textContent = expression;
                row.appendChild(cellExpression);

                const cellEqual = document.createElement('div');
                cellEqual.classList.add('cell');
                cellEqual.classList.add('equal');
                cellEqual.textContent = '=';
                row.appendChild(cellEqual);

                const cellResult = document.createElement('pre');
                cellResult.classList.add('cell');
                cellResult.classList.add('result');
                cellResult.textContent = this.minesweeper.produce(expression).toString();
                row.appendChild(cellResult);
            }
        );
        return container;
    }
}
