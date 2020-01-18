export class RoverDesigner {
    public x: number;
    public y: number;
    public orientation: string;
    public direction: number;
    public size: number = 1;

    private readonly ARROW: number[] = [1, 1 / 2, 3 / 2];

    constructor(public PRIMARY_COLOR: string, public SECONDARY_COLOR: string, public canvasCtx: CanvasRenderingContext2D) {
    }

    public drawRover(state: { x?: number, y?: number, direction?: number }): void {
        this.x = state.x !== undefined ? state.x : this.x;
        this.y = state.y !== undefined ? state.y : this.y;
        this.direction = state.direction !== undefined ? state.direction : this.direction;
        this.drawBase();
        this.drawArrow();
    }

    private drawArrow() {
        this.canvasCtx.fillStyle = this.SECONDARY_COLOR;
        this.canvasCtx.beginPath();
        this.ARROW.forEach((vertex, i) => {
            const x = this.x + this.size * (Math.cos((vertex + this.direction) * Math.PI));
            const y = this.y + this.size * (Math.sin((vertex + this.direction) * Math.PI));
            if (i === 0) {
                this.canvasCtx.moveTo(x, y);
            } else {
                this.canvasCtx.lineTo(x, y);
            }
        });
        this.canvasCtx.fill();
    }

    private drawBase() {
        this.canvasCtx.fillStyle = this.PRIMARY_COLOR;
        this.canvasCtx.beginPath();
        this.canvasCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
        this.canvasCtx.fill();
    }
}
