export enum TypeEnum {
    Wall = 'W',
    Door = 'D'
}

export enum DirectionEnum {
    North = 'North',
    East = 'East',
    South = 'South',
    West = 'West'
}

export interface Room {
    North: TypeEnum;
    South: TypeEnum;
    East: TypeEnum;
    West: TypeEnum;

    [key: string]: TypeEnum;
}

export class Labyrinth {
    private static readonly MAX = 100;
    public rooms: Room[];
    private readonly _length: number;
    private readonly pathStrategies: Array<{ door: DirectionEnum, next: (position: number) => number }>;

    constructor(private size: { width: number, height: number }, private doorRandomLevel: number) {
        this._length = this.size.width * this.size.height;
        this.pathStrategies = [
            {
                door: DirectionEnum.North,
                next: (position) => position - this.size.width
            },
            {
                door: DirectionEnum.East,
                next: (position) => position + 1
            },
            {
                door: DirectionEnum.South,
                next: (position) => position + this.size.width
            },
            {
                door: DirectionEnum.West,
                next: (position) => position - 1
            }
        ];
    }

    public get length(): number {
        return this._length;
    }

    public get width(): number {
        return this.size.width;
    }

    public get height(): number {
        return this.size.height;
    }

    private static getInDoor(door: DirectionEnum): DirectionEnum | null {
        switch (door) {
            case DirectionEnum.West:
                return DirectionEnum.East;
            case DirectionEnum.East:
                return DirectionEnum.West;
            case DirectionEnum.South:
                return DirectionEnum.North;
            case DirectionEnum.North:
                return DirectionEnum.South;
            default:
                return null;
        }
    }

    public initialize(): Room[] {
        this.rooms = new Array(this._length).fill({
            North: TypeEnum.Wall,
            South: TypeEnum.Wall,
            East: TypeEnum.Wall,
            West: TypeEnum.Wall
        });
        for (let index = 0; index < this._length; index++) {
            this.rooms[index] = ({
                North: this.getNorth(index),
                South: this.getSouth(index),
                East: this.getEast(index),
                West: this.getWest(index)
            })
        }
        return this.rooms;
    }

    public findPath(start: number, end: number): number[] {
        let directions = Object.values(DirectionEnum);

        // init
        const possiblePaths = this.rooms.map(
            room => directions
                .map(direction => ({direction, type: room[direction]}))
                .filter(possiblePath => possiblePath.type === TypeEnum.Door)
                .map(possiblePath => possiblePath.direction)
        );
        const path: number[] = [start];
        do {
            const cursor = path[path.length - 1];
            if (possiblePaths[cursor].length > 0) {
                path.push(this.nextDoor(cursor, path, possiblePaths));
            } else {
                path.pop();
            }
        } while (path.length > 0 && path[path.length - 1] !== end);
        console.info(path);
        return path;
    }

    private nextDoor(cursor: number, path: number[], possiblePaths: DirectionEnum[][]) {
        const door = possiblePaths[cursor].pop();
        const strategy = this.pathStrategies.find(strategy => strategy.door === door);
        const next = strategy.next(cursor);
        const indoor = Labyrinth.getInDoor(door);
        possiblePaths[next] = possiblePaths[next].filter(direction => direction !== indoor);
        const previous = path[path.length - 1];
        const previousPosition = path.indexOf(previous);
        if (previousPosition !== path.length - 1) {
            path.splice(previousPosition, (path.length - 1) - previousPosition);
        }
        return next;
    }

    private getWest(index: number): TypeEnum {
        if (index % this.size.width === 0) {
            return TypeEnum.Wall;
        } else {
            return this.rooms[index - 1].East;
        }
    }

    private getEast(index: number): TypeEnum {
        if (index % this.size.width === (this.size.width - 1)) {
            return TypeEnum.Wall;
        } else {
            return this.getRandomState();
        }
    }

    private getSouth(index: number): TypeEnum {
        if (index + this.size.width >= this._length) {
            return TypeEnum.Wall;
        } else {
            return this.getRandomState();
        }
    }

    private getNorth(index: number): TypeEnum {
        if (index - this.size.width < 0) {
            return TypeEnum.Wall;
        } else {
            return this.rooms[index - this.size.width].South;
        }
    }

    private getRandomState(): TypeEnum {
        if (Labyrinth.MAX > this.doorRandomLevel) {
            const random = Math.floor(Math.random() * (Labyrinth.MAX));
            if (random < this.doorRandomLevel) {
                return TypeEnum.Door
            } else {
                return TypeEnum.Wall
            }
        } else {
            return TypeEnum.Door;
        }
    }
}