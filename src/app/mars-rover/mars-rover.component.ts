// https://kata-log.rocks/mars-rover-kata

import {STYLE} from "./mars-rover.component.style";
import {GridDesigner} from "./components/grid-designer.component";
import {MarsRover, State} from "./service/mars-rover.class";

export class MarsRoverElement extends HTMLElement {
    private shadow: ShadowRoot;
    private console: HTMLDivElement;
    private map: HTMLDivElement;
    private gridDesigner: GridDesigner;
    private marsRover: MarsRover;
    private canvas: HTMLCanvasElement;
    private gridSize: number;
    private input: HTMLInputElement;

    constructor() {
        super();
        this.gridSize = 10;
        this.init();
        this.gridDesigner = new GridDesigner(this.canvas, this.gridSize, this.log.bind(this));
        this.marsRover = new MarsRover({x: 0, y: 0}, 'N', this.gridSize);
        window.addEventListener('resize', () => this.resize());
        this.resize();
    }

    public log(state: State): void {
        this.console.innerHTML = this.console.innerHTML +
            `<span>{x:${state.position.x}, y:${state.position.y}} - '${state.direction}'</span>`;
    }

    public resize() {
        this.gridDesigner.size = {width: 0, height: 0};
        setTimeout(
            () => {
                const gridSize = this.map.offsetWidth > this.map.offsetHeight ? this.map.offsetHeight : this.map.offsetWidth;
                this.gridDesigner.size = {width: gridSize, height: gridSize};
            });
    }

    public load() {
        const state = this.marsRover.state;
        const states = [state, ...this.marsRover.do(this.input.value)].reverse();
        this.gridDesigner.draw(states);
    }

    private init() {
        this.shadow = this.attachShadow({mode: 'open'});
        const style = document.createElement('style');
        style.textContent = STYLE;
        this.shadow.appendChild(style);
        this.shadow.appendChild(this.getToolbar());
        this.input.value = 'ffrfflfffrffflbbbrffrfflfffl';
        this.shadow.appendChild(this.getContainer());
    }

    private getToolbar(): HTMLElement {
        const toolbar = document.createElement('div');
        toolbar.classList.add('toolbar');

        this.input = document.createElement('input');
        toolbar.appendChild(this.input);

        const button = document.createElement('button');
        button.textContent = 'load';
        button.onclick = ()=>this.load();
        toolbar.appendChild(button);

        return toolbar;
    }

    private getContainer(): HTMLElement {
        const container = document.createElement('div');
        container.classList.add('container');

        const sidebar = document.createElement('div');
        sidebar.classList.add('sidebar');
        container.appendChild(sidebar);

        this.console = document.createElement('div');
        this.console.classList.add('console');
        sidebar.appendChild(this.console);

        this.map = document.createElement('div');
        this.map.classList.add('map');
        container.appendChild(this.map);

        this.canvas = document.createElement('canvas');
        this.map.appendChild(this.canvas);

        return container;
    }
}
