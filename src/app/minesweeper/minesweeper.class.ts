class Field {
    public outputLines: string[][];
    private inputLines: string[][];

    constructor(private numberOfLines: number, private numberOfColumns: number, inputLines: string[]) {
        this.inputLines = inputLines.map(line => line.split(''));
        this.outputLines = this.inputLines.map(
            (line, lineIndex) =>
                line.map((column, columnIndex) => {
                        if (this.isMine(lineIndex, columnIndex)) {
                            return column;
                        } else if (column === '.') {
                            let counter = 0;
                            if (this.isMineForPosition1(lineIndex, columnIndex)) {
                                counter++;
                            }
                            if (this.isMineForPosition2(lineIndex, columnIndex)) {
                                counter++;
                            }
                            if (this.isMineForPosition3(lineIndex, columnIndex)) {
                                counter++;
                            }
                            if (this.isMineForPosition4(lineIndex, columnIndex)) {
                                counter++;
                            }
                            if (this.isMineForPosition5(lineIndex, columnIndex)) {
                                counter++;
                            }
                            if (this.isMineForPosition6(lineIndex, columnIndex)) {
                                counter++;
                            }
                            if (this.isMineForPosition7(lineIndex, columnIndex)) {
                                counter++;
                            }
                            if (this.isMineForPosition8(lineIndex, columnIndex)) {
                                counter++;
                            }
                            return counter.toString()
                        }
                    }
                )
        );
    }

    private isMine(lineIndex: number, columnPosition: number) {
        return this.inputLines[lineIndex][columnPosition] === '*';
    }

    private isMineForPosition1(lineIndex: number, columnIndex: number) {
        let columnPosition = columnIndex - 1;
        let linePosition = lineIndex - 1;
        return columnPosition >= 0 && linePosition >= 0 && this.isMine(linePosition, columnPosition);
    }

    private isMineForPosition2(lineIndex: number, columnIndex: number) {
        let linePosition = lineIndex - 1;
        return linePosition >= 0 && this.isMine(linePosition, columnIndex);
    }

    private isMineForPosition3(lineIndex: number, columnIndex: number) {
        let columnPosition = columnIndex + 1;
        let linePosition = lineIndex - 1;
        return columnPosition < this.numberOfColumns && linePosition >= 0 && this.isMine(linePosition, columnPosition);
    }

    private isMineForPosition4(lineIndex: number, columnIndex: number) {
        let columnPosition = columnIndex - 1;
        return columnPosition >= 0 && this.isMine(lineIndex, columnPosition);
    }

    private isMineForPosition5(lineIndex: number, columnIndex: number) {
        let columnPosition = columnIndex + 1;
        return columnPosition < this.numberOfColumns && this.isMine(lineIndex, columnPosition);
    }

    private isMineForPosition6(lineIndex: number, columnIndex: number) {
        let columnPosition = columnIndex - 1;
        let linePosition = lineIndex + 1;
        return columnPosition >= 0 && linePosition < this.numberOfLines && this.isMine(linePosition, columnPosition);
    }

    private isMineForPosition7(lineIndex: number, columnIndex: number) {
        let linePosition = lineIndex + 1;
        return linePosition < this.numberOfLines && this.isMine(linePosition, columnIndex);
    }

    private isMineForPosition8(lineIndex: number, columnIndex: number) {
        let columnPosition = columnIndex + 1;
        let linePosition = lineIndex + 1;
        return columnPosition < this.numberOfColumns && linePosition < this.numberOfLines && this.isMine(linePosition, columnPosition);
    }
}

/**
 * 1 2 3
 * 4 * 5
 * 6 7 8
 */
export class Minesweeper {
    public produce(inputStream: string): string {
        const inputLines = inputStream.split('\n');
        const size = this.getSize(inputLines[0]);
        const field = new Field(size.numberOfLines, size.numberOfColumns, inputLines.slice(1));

        console.info(field);

        return `Field #${1}:\n${field.outputLines.map(lines => lines.join('')).join('\n')}`;
    }


    private getSize(line: string): { numberOfLines: number, numberOfColumns: number } {
        return line.split(' ').reduce((acc, cur, i) => {
            if (i === 0) {
                acc.numberOfLines = Number.parseInt(cur, 10);
            } else {
                acc.numberOfColumns = Number.parseInt(
                    cur, 10
                )
            }
            return acc;
        }, {numberOfLines: 0, numberOfColumns: 0});
    }
}
