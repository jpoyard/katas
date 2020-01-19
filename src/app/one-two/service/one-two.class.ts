interface NumberCounter {
    count: number;
    value: string;
}

export class OneTwo {
    private static readonly i18n = new Map([
        ['1', 'one'],
        ['2', 'two'],
        ['3', 'three'],
        ['4', 'four'],
        ['5', 'five'],
        ['6', 'six'],
        ['7', 'seven'],
        ['8', 'eight'],
        ['9', 'nine'],
    ]);

    public convertNumberToString(
        numberSequence: string
    ) {
        const numberCounterArray = this.getNumberCountArray(numberSequence);
        return numberCounterArray.map(item => this.convertEachNumber(item)).join(' ');
    }

    private getNumberCountArray(numberSequence: string) {
        const numberCounterArray: NumberCounter[] = numberSequence
            .split(' ')
            .reduce<NumberCounter[]>(
                (acc: NumberCounter[], cur: string) => {
                    if (acc.length > 0 && acc[acc.length-1].value === cur) {
                        acc[acc.length-1].count++;
                    } else {
                        acc.push({count: 1, value: cur})
                    }
                    return acc;
                }, []
            );
        return numberCounterArray;
    }

    private convertEachNumber(numberCounter: NumberCounter) {
        return `${this.getNumberWorld(numberCounter.count.toString())} ${this.getNumberWorld(numberCounter.value)}`
    }

    private getNumberWorld(numberElement: string): string {
        if (OneTwo.i18n.has(numberElement)) {
            return OneTwo.i18n.get(numberElement);
        } else {
            throw new Error(`unknown number ${numberElement}`)
        }
    }
}
