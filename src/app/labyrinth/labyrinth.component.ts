import {STYLE} from "./labyrinth.component.style";

export class LabyrinthGameElement extends HTMLElement {
    private readonly PRIMARY_COLOR = "#ff7013";
    private readonly FONT = '20px serif';
    private shadow: ShadowRoot;
    private canvas: HTMLCanvasElement;
    private canvasCtx: CanvasRenderingContext2D;
    private gridSize: number;
    private height: number;
    private width: number;
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
                console.info(this.canvas.offsetWidth, this.canvas.offsetHeight);
                this.gridSize = 10;
                this.roomSize = this.canvas.offsetWidth > this.canvas.offsetHeight ? this.canvas.offsetHeight : this.canvas.offsetWidth;
                this.height = this.roomSize / this.gridSize;
                this.width = this.roomSize / this.gridSize;
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
        for (let j = 0; j <= this.gridSize; j++) {
            const x = 0;
            const y = (j) * this.height;
            this.canvasCtx.moveTo(x, y);
            this.canvasCtx.lineTo(this.width * this.gridSize, y);
        }
        this.canvasCtx.stroke();
    }

    private drawVLines() {
        this.canvasCtx.strokeStyle = this.PRIMARY_COLOR;
        this.canvasCtx.lineWidth = 0.55;
        for (let i = 0; i <= this.gridSize; i++) {
            const x = i * this.width;
            const y = this.height * this.gridSize;
            this.canvasCtx.moveTo(x, 0);
            this.canvasCtx.lineTo(x, y);
        }
        this.canvasCtx.stroke();
    }

    private writePosition() {
        this.canvasCtx.fillStyle = this.PRIMARY_COLOR;
        this.canvasCtx.font = this.FONT;
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const displayedValue = `${y * this.gridSize + x}`;
                const measureText = (this.canvasCtx.measureText(displayedValue));
                const textSize = {width: measureText.width, height: measureText.actualBoundingBoxAscent};
                const xPosition = (this.width - textSize.width) / 2;
                const yPosition = this.height - (this.height - textSize.height) / 2;
                this.canvasCtx.fillText(displayedValue, xPosition + this.width * (x), yPosition + this.height * (y));
            }
        }
    }
}
