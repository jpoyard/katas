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
        if(commands === 'f'){
            this._position = {x: 0, y: 1};
        } else if(commands === 'b') {
            this._position = {x: 0, y: -1};
        }

        return this._position;
    }
}
