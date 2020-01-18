import {RoverDesigner} from "./rover-designer.component";

export type Sense = 'L' | 'R';
export type Orientation = 'E' | 'N' | 'W' | 'S';

interface OrientationInfo {
    orientation: Orientation;
    angle: number;
    L: Orientation;
    R: Orientation;
}

export class GridDesigner {
    private readonly PRIMARY_COLOR = "#33ffbb";
    private readonly SECONDARY_COLOR = "#ed2939";
    private readonly NUMBER_OF_COLUMNS: number = 11;
    private readonly NUMBER_OF_ROWS: number = 11;
    private readonly ORIENTATIONS: OrientationInfo[] = [
        {orientation: 'E', angle: 1, L: 'N', R: 'S'},
        {orientation: 'N', angle: 1 / 2, L: 'W', R: 'E'},
        {orientation: 'W', angle: 0, L: 'S', R: 'N'},
        {orientation: 'S', angle: 3 / 2, L: 'E', R: 'W'}
    ];

    private canvas: HTMLCanvasElement;
    private canvasCtx: CanvasRenderingContext2D;

    private width: number;
    private height: number;
    private cellSize: number;
    private roverDesigner: RoverDesigner;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.canvasCtx = this.canvas.getContext('2d');
        this.roverDesigner = new RoverDesigner(this.PRIMARY_COLOR, this.SECONDARY_COLOR, this.canvasCtx);
    }

    set size(size: { width: number; height: number; }) {
        this.canvas.width = size.width;
        this.canvas.height = size.height;
        this.width = this.canvas.width / this.NUMBER_OF_COLUMNS;
        this.height = this.canvas.height / this.NUMBER_OF_ROWS;
        this.cellSize = Math.max(this.width, this.height);
        this.roverDesigner.size = this.cellSize / 3;
    }

    public draw(x: number, y: number, orientation: string): void {
        this.clear();
        this.drawGrid();
        this.drawRoverByOrientation(x, y, (orientation));
        this.drawRoverByOrientation(x - 1, y, 'W');
        this.drawRoverByOrientation(x, y - 1, 'S');
        this.drawRoverByOrientation(x + 1, y, 'E');
        this.drawRoverByOrientation(x, y + 1, 'N');
    }

    public rotateRover(sense: Sense): void {
        const orientation = this.getOrientationInfo(this.roverDesigner.orientation)[sense];
        this.rotateRoverByDirection(this.getDirection(orientation));
        this.roverDesigner.orientation = orientation;
    }

    public rotateRoverByDirection(direction: number): void {
        const roverDirection = this.roverDesigner.direction;
        if (roverDirection !== direction) {
            this.clear();
            this.drawGrid();

            let newDirection;
            if (roverDirection < direction) {
                newDirection = roverDirection + 1 / 16;
            } else {
                newDirection = roverDirection - 1 / 16;
            }
            this.roverDesigner.drawRover({direction: newDirection});

            setTimeout(() => this.rotateRoverByDirection(direction), 100);
        }
    }

    public getDirection(orientation: string): number {
        return this.getOrientationInfo(orientation).angle;
    }

    private getOrientationInfo(orientation: string): OrientationInfo {
        const orientationInfo = this.ORIENTATIONS.find(o => o.orientation === orientation.toUpperCase());

        if (!orientationInfo) {
            throw new Error(`Unknown orientation ${orientation}`)
        }

        return orientationInfo;

    }

    private drawGrid() {
        this.writeYPosition();
        this.drawHLines();
        this.writeXPosition();
        this.drawVLines();
        this.canvasCtx.save();
    }

    private clear() {
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private drawHLines() {
        this.canvasCtx.strokeStyle = this.PRIMARY_COLOR;
        this.canvasCtx.lineWidth = 0.55;
        for (let j = 1; j < this.NUMBER_OF_COLUMNS; j++) {
            const y = j * this.height;
            this.canvasCtx.moveTo(this.width, y);
            this.canvasCtx.lineTo(this.canvas.width, y);
        }
        this.canvasCtx.stroke();
    }

    private drawVLines() {
        this.canvasCtx.strokeStyle = this.PRIMARY_COLOR;
        this.canvasCtx.lineWidth = 0.55;
        for (let i = 1; i < this.NUMBER_OF_ROWS; i++) {
            const x = i * this.width;
            const y = this.canvas.height - this.height;
            this.canvasCtx.moveTo(x, 0);
            this.canvasCtx.lineTo(x, y);
        }
        this.canvasCtx.stroke();
    }

    private writeXPosition() {
        this.canvasCtx.fillStyle = this.PRIMARY_COLOR;
        this.canvasCtx.font = '20px serif';
        for (let x = 1; x < this.NUMBER_OF_ROWS; x++) {
            const displayedValue = `${x}`;
            const measureText = (this.canvasCtx.measureText(displayedValue));
            const textSize = {width: measureText.width, height: measureText.actualBoundingBoxAscent};
            const xpos = (this.width - textSize.width) / 2;
            const ypos = this.height - (this.height - textSize.height) / 2;
            this.canvasCtx.fillText(displayedValue, xpos + this.width * x, ypos + this.height * (this.NUMBER_OF_COLUMNS - 1));
        }
    }

    private writeYPosition() {
        this.canvasCtx.fillStyle = this.PRIMARY_COLOR;
        this.canvasCtx.font = '20px serif';
        for (let y = 0; y < this.NUMBER_OF_COLUMNS; y++) {
            const displayedValue = `${y}`;
            const measureText = (this.canvasCtx.measureText(displayedValue));
            const textSize = {width: measureText.width, height: measureText.actualBoundingBoxAscent};
            const xpos = (this.width - textSize.width) / 2;
            const ypos = this.height - (this.height - textSize.height) / 2;
            this.canvasCtx.fillText(displayedValue, xpos, ypos + this.height * (this.NUMBER_OF_COLUMNS - (y + 1)));
        }
    }

    private drawRoverByOrientation(x: number, y: number, orientation: string) {
        this.roverDesigner.orientation = orientation;
        this.drawRover(x, y, this.getDirection(orientation));
    }

    private drawRover(x: number, y: number, direction: number) {
        this.roverDesigner.drawRover({x: this.getXPosition(x), y: this.getYPosition(y), direction});
    }

    private getYPosition(y: number) {
        return (this.NUMBER_OF_ROWS - y - 0.5) * this.cellSize;
    }

    private getXPosition(x: number) {
        return (x + 0.5) * this.cellSize;
    }
}
