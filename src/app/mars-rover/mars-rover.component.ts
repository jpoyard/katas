// https://kata-log.rocks/mars-rover-kata

import {STYLE} from "./mars-rover.component.style";
import {GridDesigner} from "./components/grid-designer.component";

export class MarsRoverElement extends HTMLElement {
    private shadow: ShadowRoot;
    private console: HTMLDivElement;
    private map: HTMLDivElement;
    private gridDesigner: GridDesigner;

    constructor() {
        super();
        this.init();
        window.addEventListener('resize', () => this.refresh());
        this.refresh();
    }

    refresh() {
        this.gridDesigner.size = {width: 0, height: 0};
        setTimeout(
            () => {
                const gridSize = this.map.offsetWidth > this.map.offsetHeight ? this.map.offsetHeight : this.map.offsetWidth;
                this.gridDesigner.size = {width: gridSize, height: gridSize};
                this.gridDesigner.draw(3, 3, 'N');
                this.gridDesigner.rotateRover('L');
                // this.gridDesigner.rotateRover('S');
                // this.gridDesigner.rotateRover('E');
            }, 100
        )
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

        const canvas = document.createElement('canvas');
        this.map.appendChild(canvas);
        this.gridDesigner = new GridDesigner(canvas);

        return container;
    }
}
