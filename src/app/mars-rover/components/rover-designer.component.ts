import {Direction, State} from "../service/mars-rover.class";

interface OrientationInfo {
    orientation: Direction;
    angle: number;
    L: Direction;
    R: Direction;
}


export class RoverDesigner {
    private static readonly ORIENTATIONS: OrientationInfo[] = [
        {orientation: 'E', angle: 1, L: 'N', R: 'S'},
        {orientation: 'N', angle: 1 / 2, L: 'W', R: 'E'},
        {orientation: 'W', angle: 0, L: 'S', R: 'N'},
        {orientation: 'S', angle: 3 / 2, L: 'E', R: 'W'}
    ];
    private static readonly ARROW: number[] = [1, 1 / 2, 3 / 2];
    private state: State;

    constructor(public PRIMARY_COLOR: string, public SECONDARY_COLOR: string, public canvasCtx: CanvasRenderingContext2D) {
    }

    private _size: number = 1;

    public set size(value: number) {
        this._size = value;
    }

    public get angle(): number {
        return this.getDirectionInfo(this.state.direction).angle;
    }

    public draw(state: State): void {
        this.state = state;
        this.drawBase();
        this.drawArrow();
    }

    private drawArrow() {
        this.canvasCtx.fillStyle = this.SECONDARY_COLOR;
        this.canvasCtx.beginPath();
        RoverDesigner.ARROW.forEach((vertex, i) => {
            const x = this.state.position.x + this._size * (Math.cos((vertex + this.angle) * Math.PI));
            const y = this.state.position.y + this._size * (Math.sin((vertex + this.angle) * Math.PI));
            if (i === 0) {
                this.canvasCtx.moveTo(x, y);
            } else {
                this.canvasCtx.lineTo(x, y);
            }
        });
        this.canvasCtx.fill();
        this.canvasCtx.closePath();
    }

    private drawBase() {
        this.canvasCtx.fillStyle = this.PRIMARY_COLOR;
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(this.state.position.x, this.state.position.y, this._size, 0, Math.PI * 2, true);
        this.canvasCtx.fill();
        this.canvasCtx.closePath();
    }

    private getDirectionInfo(direction: Direction): OrientationInfo {
        const orientationInfo = RoverDesigner.ORIENTATIONS.find(o => o.orientation === direction.toUpperCase());
        if (!orientationInfo) {
            throw new Error(`Unknown orientation ${direction}`)
        }
        return orientationInfo;
    }

}
