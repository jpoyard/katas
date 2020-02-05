import {STYLE} from "./labyrinth.component.style";
import {Labyrinth, TypeEnum} from "./service/Labyrinth";

export class LabyrinthGameElement extends HTMLElement {
    private readonly PRIMARY_COLOR = "#ff631f";
    private readonly FONT = '20px serif';
    private shadow: ShadowRoot;
    private canvas: HTMLCanvasElement;
    private canvasCtx: CanvasRenderingContext2D;
    private labyrinth: Labyrinth;
    private roomSize: number;

    constructor() {
        super();
        this.labyrinth = new Labyrinth({width: 2, height: 2}, 60);
        this.init();
        window.addEventListener('resize', () => this.resize());
        this.resize();
    }

    private init() {
        this.shadow = this.attachShadow({mode: 'open'});

        const container = document.createElement('div');
        container.classList.add('container');
        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('draw-zone');
        this.canvasCtx = this.canvas.getContext('2d');
        container.appendChild((this.canvas));

        const style = document.createElement('style');

        style.textContent = STYLE;

        this.shadow.appendChild(style);
        this.shadow.appendChild(container);
    }

    private resize() {
        this.canvas.width = 0;
        this.canvas.height = 0;
        this.labyrinth.initialize();
        setTimeout(
            () => {
                this.roomSize = (this.canvas.offsetWidth / this.labyrinth.width > this.canvas.offsetHeight / this.labyrinth.height) ?
                    this.canvas.offsetHeight / this.labyrinth.height : this.canvas.offsetWidth / this.labyrinth.width;
                this.canvas.width = this.canvas.offsetWidth;
                this.canvas.height = this.canvas.offsetHeight;
                this.draw();
            }, 100
        )
    }

    private draw() {
        this.clear();
        this.writePosition();
    }

    private clear() {
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private writePosition() {
        this.canvasCtx.fillStyle = this.PRIMARY_COLOR;
        this.canvasCtx.font = this.FONT;
        for (let i = 0; i < this.labyrinth.length; i++) {
            const x = i % this.labyrinth.width;
            const y = Math.floor(i / this.labyrinth.width);

            if (this.labyrinth.rooms[i].North === TypeEnum.Wall) {
                this.drawNorthWall(x, y);
            }
            if (this.labyrinth.rooms[i].West === TypeEnum.Wall) {
                this.drawWestWall(x, y);
            }
            if (this.labyrinth.rooms[i].South === TypeEnum.Wall) {
                this.drawSouthWall(x, y);
            }
            if (this.labyrinth.rooms[i].East === TypeEnum.Wall) {
                this.drawEastWall(x, y);
            }

            // const displayedValue = `${y * this.labyrinth.width + x}`;
            // const measureText = (this.canvasCtx.measureText(displayedValue));
            // const textSize = {width: measureText.width, height: measureText.actualBoundingBoxAscent};
            // const xPosition = (this.roomSize - textSize.width) / 2;
            // const yPosition = this.roomSize - (this.roomSize - textSize.height) / 2;
            // this.canvasCtx.fillText(displayedValue, xPosition + this.roomSize * (x), yPosition + this.roomSize * (y));
        }
        this.canvasCtx.stroke();
    }

    private drawNorthWall(x: number, y: number) {
        this.canvasCtx.moveTo(x * this.roomSize, (y) * this.roomSize);
        this.canvasCtx.lineTo((x + 1) * this.roomSize, (y) * this.roomSize);
    }

    private drawSouthWall(x: number, y: number) {
        this.canvasCtx.moveTo(x * this.roomSize, (y + 1) * this.roomSize);
        this.canvasCtx.lineTo((x + 1) * this.roomSize, (y + 1) * this.roomSize);
    }

    private drawWestWall(x: number, y: number) {
        this.canvasCtx.moveTo(x * this.roomSize, y * this.roomSize);
        this.canvasCtx.lineTo(x * this.roomSize, (y + 1) * this.roomSize);
    }

    private drawEastWall(x: number, y: number) {
        this.canvasCtx.moveTo((x + 1) * this.roomSize, y * this.roomSize);
        this.canvasCtx.lineTo((x + 1) * this.roomSize, (y + 1) * this.roomSize);
    }
}
