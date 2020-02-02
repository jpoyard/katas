import {STYLE} from "./labyrinth.component.style";

export class LabyrinthGameElement extends HTMLElement {
    private readonly PRIMARY_COLOR = "#ff631f";
    private readonly FONT = '20px serif';
    private shadow: ShadowRoot;
    private canvas: HTMLCanvasElement;
    private canvasCtx: CanvasRenderingContext2D;
    private size: { width: number, height: number } = {width: 1, height: 1};
    private roomSize: number;

    constructor() {
        super();
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
        setTimeout(
            () => {
                this.roomSize = (this.canvas.offsetWidth / this.size.width > this.canvas.offsetHeight / this.size.height) ?
                    this.canvas.offsetHeight / this.size.height : this.canvas.offsetWidth / this.size.width;
                this.canvas.width = this.canvas.offsetWidth;
                this.canvas.height = this.canvas.offsetHeight;
                this.draw();
            }, 100
        )
    }

    private draw() {
        this.clear();
        this.drawHLines();
        this.drawVLines();
        this.writePosition();
    }

    private clear() {
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private drawHLines() {
        this.canvasCtx.strokeStyle = this.PRIMARY_COLOR;
        this.canvasCtx.lineWidth = 0.55;
        for (let j = 0; j <= this.size.height; j++) {
            const x = 0;
            const y = (j) * this.roomSize;
            this.canvasCtx.moveTo(x, y);
            this.canvasCtx.lineTo(this.roomSize * this.size.width, y);
        }
        this.canvasCtx.stroke();
    }

    private drawVLines() {
        this.canvasCtx.strokeStyle = this.PRIMARY_COLOR;
        this.canvasCtx.lineWidth = 0.55;
        for (let i = 0; i <= this.size.width; i++) {
            const x = i * this.roomSize;
            const y = this.roomSize * this.size.height;
            this.canvasCtx.moveTo(x, 0);
            this.canvasCtx.lineTo(x, y);
        }
        this.canvasCtx.stroke();
    }

    private writePosition() {
        this.canvasCtx.fillStyle = this.PRIMARY_COLOR;
        this.canvasCtx.font = this.FONT;
        for (let y = 0; y < this.size.height; y++) {
            for (let x = 0; x < this.size.width; x++) {
                const displayedValue = `${y * this.size.width + x}`;
                const measureText = (this.canvasCtx.measureText(displayedValue));
                const textSize = {width: measureText.width, height: measureText.actualBoundingBoxAscent};
                const xPosition = (this.roomSize - textSize.width) / 2;
                const yPosition = this.roomSize - (this.roomSize - textSize.height) / 2;
                this.canvasCtx.fillText(displayedValue, xPosition + this.roomSize * (x), yPosition + this.roomSize * (y));
            }
        }
    }
}
