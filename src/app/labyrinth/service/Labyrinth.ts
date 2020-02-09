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
    private readonly pathStrategies: Array<{ door: DirectionEnum, next: (path, position) => { path: Array<{ position: number, door: DirectionEnum }>, position: number } }>;

    constructor(private size: { width: number, height: number }, private doorRandomLevel: number) {
        this._length = this.size.width * this.size.height;
        this.pathStrategies = [
            {
                door: DirectionEnum.North,
                next: (path, position) => ({
                    path: [...path, {position, door: DirectionEnum.North}],
                    position: position - this.size.width
                })
            },
            {
                door: DirectionEnum.East,
                next: (path, position) => ({
                    path: [...path, {position, door: DirectionEnum.East}],
                    position: position + 1
                })
            },
            {
                door: DirectionEnum.South,
                next: (path, position) => ({
                    path: [...path, {position, door: DirectionEnum.South}],
                    position: position + this.size.width
                })
            },
            {
                door: DirectionEnum.West,
                next: (path, position) => ({
                    path: [...path, {position, door: DirectionEnum.West}],
                    position: position - 1
                })
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

    initialize(): Room[] {
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

    findPath(start: number, end: number): number[] {
        let path: Array<{ position: number, door: DirectionEnum }> = [];
        let position = start;
        let door = DirectionEnum.North;
        do {
            const next = this.getNextPosition(start, position, path, door);
            if (next) {
                position = next.position;
                path = next.path;
                door = DirectionEnum.North;
            } else if (path.length > 0) {
                const previous = path.pop();
                position = previous.position;
                door = previous.door;
            }
        } while (position !== start && position !== end && path.length > 0);
        if (position === end) {
            return [...path.map(i => i.position), position];
        } else {
            return []
        }
    }

    private getNextPosition(start: number, position: number, path: Array<{ position: number; door: DirectionEnum }>, door: DirectionEnum) {
        const possibleStrategies = this.pathStrategies
            .reduce((acc, strategy) => {
                if (strategy.door === door || acc.length > 0) {
                    return [...acc, strategy]
                } else {
                    return acc
                }
            }, [])
            .filter(strategy => this.rooms[position][strategy.door] === TypeEnum.Door)
            .filter(strategy => strategy.next(path, position).position !== start);

        if (possibleStrategies.length > 0) {
            return possibleStrategies[0].next(path, position);
        } else {
            return null;
        }

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