export interface Position {
    x: number;
    y: number;
}

export type Direction = 'N' | 'W' | 'S' | 'E';

export class MarsRover {
    constructor(private _position: Position, private _direction: Direction) {
    }

    public get position(): Position {
        return this._position
    }

    public get direction(): Direction {
        return this._direction;
    }

    do(commands: string): Position {
        commands.split('').forEach((command) => {
            this.doCommand(command);
        })
        return this._position;
    }

    private doCommand(command: string) {
        if (command === 'f') {
            this.moveForward();
        } else if (command === 'b') {
            this.moveBackward();
        }
    }

    private moveForward() {
        if (this.direction === 'N') {
            this._position.y++;
        } else if (this.direction == 'W') {
            this.position.x--;
        } else if (this.direction == 'S') {
            this.position.y--;
        } else if (this.direction == 'E') {
            this.position.x++;
        }
    }


    private moveBackward() {
        if (this.direction === 'N') {
            this._position.y--;
        } else if (this.direction == 'W') {
            this.position.x++;
        } else if (this.direction == 'S') {
            this.position.y++;
        } else if (this.direction == 'E') {
            this.position.x--;
        }
    }
}
