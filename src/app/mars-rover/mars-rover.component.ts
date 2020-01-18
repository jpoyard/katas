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

    constructor() {
        super();
        this.gridSize = 10;
        this.init();
        this.gridDesigner = new GridDesigner(this.canvas, this.gridSize);
        this.marsRover = new MarsRover({x: 0, y: 0}, 'N', this.gridSize);
        window.addEventListener('resize', () => this.resize());
        this.resize();
        setTimeout(() => this.do(), 2000);
    }

    public resize() {
        this.gridDesigner.size = {width: 0, height: 0};
        setTimeout(
            () => {
                const gridSize = this.map.offsetWidth > this.map.offsetHeight ? this.map.offsetHeight : this.map.offsetWidth;
                this.gridDesigner.size = {width: gridSize, height: gridSize};
            });
    }

    public do() {
        const state = this.marsRover.state;
        const states = [state, ...this.marsRover.do('ffrfflfffrffflbbbrffrfflfffl')].reverse();
        this.gridDesigner.draw(states);
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

        this.console = document.createElement('div');
        this.console.classList.add('console');
        container.appendChild(this.console);

        this.map = document.createElement('div');
        this.map.classList.add('map');
        container.appendChild(this.map);

        this.canvas = document.createElement('canvas');
        this.map.appendChild(this.canvas);

        return container;
    }
}
