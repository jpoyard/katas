import {RoverDesigner} from "./rover-designer.component";
import {State} from "../service/mars-rover.class";

export class GridDesigner {
    private readonly PRIMARY_COLOR = "#33ffbb";
    private readonly SECONDARY_COLOR = "#ed2939";
    private readonly numberofcolumns: number = 11;
    private readonly numberofrows: number = 11;

    private canvas: HTMLCanvasElement;
    private canvasCtx: CanvasRenderingContext2D;

    private width: number;
    private height: number;
    private cellSize: number;
    private roverDesigner: RoverDesigner;
    private states: State[] = [];

    constructor(canvas: HTMLCanvasElement, gridSize: number) {
        this.numberofcolumns = gridSize;
        this.numberofrows = gridSize;
        this.canvas = canvas;
        this.canvasCtx = this.canvas.getContext('2d');
        this.roverDesigner = new RoverDesigner(this.PRIMARY_COLOR, this.SECONDARY_COLOR, this.canvasCtx);
        setInterval(() => {
            this.drawFrame();
        }, 500);
    }

    set size(size: { width: number; height: number; }) {
        this.canvas.width = size.width;
        this.canvas.height = size.height;
        this.width = this.canvas.width / (this.numberofcolumns + 1);
        this.height = this.canvas.height / (this.numberofrows + 1);
        this.cellSize = Math.max(this.width, this.height);
        this.roverDesigner.size = this.cellSize / 3;
    }

    public draw(states: State[]): void {
        this.states = states;
    }

    private drawGrid() {
        this.writeYPosition();
        this.drawHLines();
        this.writeXPosition();
        this.drawVLines();
    }

    private clear() {
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private drawFrame() {
        if (this.states.length > 0) {
            const state = (this.states.pop());
            this.drawState(state);
            this.drawState(state);
        }
    }

    private drawState(state: State) {
        this.clear();
        this.drawGrid();
        this.canvasCtx.save();
        this.roverDesigner.draw({
            position: {
                x: this.getXPosition(state.position.x),
                y: this.getYPosition(state.position.y)
            }, direction: state.direction
        });
    }

    private drawHLines() {
        this.canvasCtx.strokeStyle = this.PRIMARY_COLOR;
        this.canvasCtx.lineWidth = 0.55;
        for (let j = 0; j < this.numberofcolumns; j++) {
            const y = (j + 1) * this.height;
            this.canvasCtx.moveTo(this.width, y);
            this.canvasCtx.lineTo(this.canvas.width, y);
        }
        this.canvasCtx.stroke();
    }

    private drawVLines() {
        this.canvasCtx.strokeStyle = this.PRIMARY_COLOR;
        this.canvasCtx.lineWidth = 0.55;
        for (let i = 0; i < this.numberofrows; i++) {
            const x = (i + 1) * this.width;
            const y = this.canvas.height - this.height;
            this.canvasCtx.moveTo(x, 0);
            this.canvasCtx.lineTo(x, y);
        }
        this.canvasCtx.stroke();
    }

    private writeXPosition() {
        this.canvasCtx.fillStyle = this.PRIMARY_COLOR;
        this.canvasCtx.font = '20px serif';
        for (let x = 0; x < this.numberofrows; x++) {
            const displayedValue = `${x}`;
            const measureText = (this.canvasCtx.measureText(displayedValue));
            const textSize = {width: measureText.width, height: measureText.actualBoundingBoxAscent};
            const xpos = (this.width - textSize.width) / 2;
            const ypos = this.height - (this.height - textSize.height) / 2;
            this.canvasCtx.fillText(displayedValue, xpos + this.width * (x + 1), ypos + this.height * (this.numberofcolumns));
        }
    }

    private writeYPosition() {
        this.canvasCtx.fillStyle = this.PRIMARY_COLOR;
        this.canvasCtx.font = '20px serif';
        for (let y = 0; y < this.numberofcolumns; y++) {
            const displayedValue = `${y}`;
            const measureText = (this.canvasCtx.measureText(displayedValue));
            const textSize = {width: measureText.width, height: measureText.actualBoundingBoxAscent};
            const xpos = (this.width - textSize.width) / 2;
            const ypos = this.height - (this.height - textSize.height) / 2;
            this.canvasCtx.fillText(displayedValue, xpos, ypos + this.height * (this.numberofcolumns - (y + 1)));
        }
    }

    private getYPosition(y: number) {
        return (this.numberofrows - y - 0.5) * this.cellSize;
    }

    private getXPosition(x: number) {
        return ((x + 1) + 0.5) * this.cellSize;
    }
}
