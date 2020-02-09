import {STYLE} from "./labyrinth.component.style";
import {Labyrinth, TypeEnum} from "./service/Labyrinth";

export class LabyrinthGameElement extends HTMLElement {
    private readonly TEXT_COLOR = "#fff"; //"#ff631f";
    private readonly WALL_COLOR = "#7d7d7d";
    private readonly PATH_COLOR = "#7d0609";
    private readonly FONT = '20px serif';
    private shadow: ShadowRoot;
    private canvas: HTMLCanvasElement;
    private canvasCtx: CanvasRenderingContext2D;
    private labyrinth: Labyrinth;
    private roomSize: number;
    private start: number;
    private end: number;

    constructor() {
        super();
        this.labyrinth = new Labyrinth({width: 40, height: 30}, 60);
        this.labyrinth.initialize();
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
        this.canvas.onclick = (event: MouseEvent) => {
            if (!this.start) {
                const position = {
                    x: Math.floor((event.x - this.canvas.offsetLeft) / this.roomSize),
                    y: Math.floor((event.y - this.canvas.offsetTop) / this.roomSize),
                };
                this.start = position.x + position.y * this.labyrinth.width;
            } else {
                this.start = undefined;
            }
        };

        this.canvas.onmousemove = (event: MouseEvent) => {
            if (this.start) {
                const position = {
                    x: Math.floor((event.x - this.canvas.offsetLeft) / this.roomSize),
                    y: Math.floor((event.y - this.canvas.offsetTop) / this.roomSize),
                };
                this.end = position.x + position.y * this.labyrinth.width;
                const path = this.labyrinth.findPath(this.start, this.end);
                this.draw(path);
            }
        };

        container.appendChild((this.canvas));

        const style = document.createElement('style');

        style.textContent = STYLE;

        this.shadow.appendChild(style);
        this.shadow.appendChild(container);
    }

    private resize() {
        this.canvas.width = 0;
        this.canvas.height = 0;
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

    private draw(path?: number[]) {
        this.clear();
        this.drawLabyrinth();
        this.drawPath(path);
    }

    private clear() {
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private drawLabyrinth() {
        this.canvasCtx.strokeStyle = this.WALL_COLOR;
        this.canvasCtx.lineWidth = 4;
        this.canvasCtx.beginPath();
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
            this.writePosition(y, x);
        }
        this.canvasCtx.closePath();
        this.canvasCtx.stroke();
    }

    private writePosition(y: number, x: number) {
        this.canvasCtx.fillStyle = this.TEXT_COLOR;
        this.canvasCtx.font = this.FONT;
        const displayedValue = `${y * this.labyrinth.width + x}`;
        const measureText = (this.canvasCtx.measureText(displayedValue));
        const textSize = {width: measureText.width, height: measureText.actualBoundingBoxAscent};
        const xPosition = (this.roomSize - textSize.width) / 2;
        const yPosition = this.roomSize - (this.roomSize - textSize.height) / 2;
        this.canvasCtx.fillText(displayedValue, xPosition + this.roomSize * (x), yPosition + this.roomSize * (y));
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

    private drawPath(path?: number[]) {
        if (path && path.length > 0) {
            this.canvasCtx.strokeStyle = this.PATH_COLOR;
            this.canvasCtx.lineWidth = 5;
            this.canvasCtx.beginPath();
            this.canvasCtx.moveTo(this.getX(this.start), this.getY(this.start));
            path.forEach((position) => {
                this.canvasCtx.lineTo(this.getX(position), this.getY(position));
            });
            this.canvasCtx.moveTo(this.getX(this.end), this.getY(this.end));
            this.canvasCtx.closePath();
            this.canvasCtx.stroke();
        }
    }

    private getY(position: number) {
        return ((position - (position % this.labyrinth.width)) / this.labyrinth.width) * this.roomSize + this.roomSize / 2;
    }

    private getX(position: number) {
        return (position % this.labyrinth.width) * this.roomSize + this.roomSize / 2;
    }
}
