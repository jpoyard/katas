export interface Position {
    x: number;
    y: number;
}

export type Direction = 'N' | 'W' | 'S' | 'E';

export interface State {
    position: Position,
    direction: Direction
}

export class MarsRover {
    constructor(private _position: Position, private _direction: Direction, private _gridSize: number = 10) {
    }

    public get gridSize(): number {
        return this._gridSize;
    }

    public get position(): Position {
        return this._position
    }

    public get direction(): Direction {
        return this._direction;
    }

    public get state(): State {
        return {position: {...this.position}, direction: this.direction};
    }

    public do(commands: string): State[] {
        return commands.split('').map((command) => {
            this.doCommand(command);
            return this.state;
        });
    }

    private doCommand(command: string) {
        if (command === 'f') {
            this.moveForward();
        } else if (command === 'b') {
            this.moveBackward();
        } else if (command === 'l') {
            this.turnLeft();
        } else if (command === 'r') {
            this.turnRight();
        }
    }

    private turnRight() {
        if (this.direction === 'N') {
            this._direction = 'E';
        } else if (this.direction == 'E') {
            this._direction = 'S';
        } else if (this.direction == 'S') {
            this._direction = 'W';
        } else if (this.direction == 'W') {
            this._direction = 'N';
        }
    }

    private turnLeft() {
        if (this.direction === 'N') {
            this._direction = 'W';
        } else if (this.direction == 'W') {
            this._direction = 'S';
        } else if (this.direction == 'S') {
            this._direction = 'E';
        } else if (this.direction == 'E') {
            this._direction = 'N';
        }
    }

    private moveForward() {
        if (this.direction === 'N') {
            this.moveForwardY();
        } else if (this.direction == 'W') {
            this.moveBackwardX();
        } else if (this.direction == 'S') {
            this.moveBackwardY();
        } else if (this.direction == 'E') {
            this.moveForwardX();
        }
    }

    private moveBackward() {
        if (this.direction === 'N') {
            this.moveBackwardY();
        } else if (this.direction == 'W') {
            this.moveForwardX();
        } else if (this.direction == 'S') {
            this.moveForwardY();
        } else if (this.direction == 'E') {
            this.moveBackwardX();
        }
    }

    private moveForwardX() {
        this.position.x = this.moveForwardValue(this.position.x)
    }

    private moveForwardY() {
        this.position.y = this.moveForwardValue(this.position.y)
    }

    private moveForwardValue(value: number) {
        return (value + 1) % this.gridSize;
    }

    private moveBackwardX() {
        this.position.x = this.moveBackwardValue(this.position.x)
    }

    private moveBackwardY() {
        this.position.y = this.moveBackwardValue(this.position.y)
    }

    private moveBackwardValue(value: number) {
        const result = value;
        if (result === 0) {
            return this.gridSize - 1;
        } else {
            return value - 1;
        }
    }

}
