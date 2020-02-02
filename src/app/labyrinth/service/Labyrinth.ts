export enum TypeEnum {
    Wall = 'W',
    Door = 'D'
}

export interface Room {
    North: TypeEnum;
    South: TypeEnum;
    East: TypeEnum;
    West: TypeEnum;
}

export class Labyrinth {
    private rooms: Room[];
    private readonly length : number;

    constructor(private size: { width: number, height: number }) {
        this.length = this.size.width * this.size.height;
    }

    initialize(): Room[] {
        this.rooms = new Array(this.length).fill({}).map(
            (_v, index)=>({
                    North: this.getNorth(index),
                    South: this.getSouth(index),
                    East: this.getEast(index),
                    West: this.getWest(index)
                })
        );
        return this.rooms;
    }

    private getWest(index: number):TypeEnum {
        debugger
        if (index % this.size.width === 0) {
            return TypeEnum.Wall;
        } else {
            return TypeEnum.Door;
        }
    }

    private getEast(index: number):TypeEnum {
        if (index % this.size.width === (this.size.width - 1)) {
            return TypeEnum.Wall;
        } else {
            return TypeEnum.Door;
        }
    }

    private getSouth(index: number):TypeEnum {
        if (index + this.size.width >= this.length) {
            return TypeEnum.Wall;
        } else {
            return TypeEnum.Door;
        }
    }

    private getNorth(index: number):TypeEnum {
        if (index - this.size.width < 0) {
            return TypeEnum.Wall;
        } else {
            return TypeEnum.Door;
        }
    }
}