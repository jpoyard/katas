interface NumberCounter {
    count: number;
    value: string;
}

export class OneTwo {
    private static readonly i18nNumberToWorldMap = new Map([
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

    private static readonly i18nWorldToNumberMap = new Map(Array.from(OneTwo.i18nNumberToWorldMap.entries()).map(
        entry => [entry[1], entry[0]]
    ));

    public convertNumberToString(
        numberSequence: string
    ) {
        const numberCounterArray = OneTwo.getNumberCountArray(numberSequence);
        return numberCounterArray.map(item => OneTwo.convertEachNumber(item)).join(' ');
    }

    public convertStringToNumber(worldSequence: string) {
        const worldSequenceArray = this.getWorldSequenceArray(worldSequence);
        return worldSequenceArray.map(item => OneTwo.getNumberSequence(item)).join(' ');
    }

    private static getNumberCountArray(numberSequence: string) {
        return numberSequence
            .split(' ')
            .reduce<NumberCounter[]>(
                (acc: NumberCounter[], cur: string) => {
                    if (acc.length > 0
                        && acc[acc.length - 1].count < 9
                        && acc[acc.length - 1].value === cur) {
                        acc[acc.length - 1].count++;
                    } else {
                        acc.push({count: 1, value: cur})
                    }
                    return acc;
                }, []
            );
    }

    private static convertEachNumber(numberCounter: NumberCounter): string {
        return `${OneTwo.getNumberWorld(numberCounter.count.toString())} ${OneTwo.getNumberWorld(numberCounter.value)}`
    }

    private static getNumberWorld(numberElement: string): string {
        if (OneTwo.i18nNumberToWorldMap.has(numberElement)) {
            return OneTwo.i18nNumberToWorldMap.get(numberElement);
        } else {
            throw new Error(`unknown number ${numberElement}`)
        }
    }

    private getWorldSequenceArray(worldSequence: string) {
        return worldSequence.split(' ').reduce<NumberCounter[]>(
            (acc, cur, i) => {
                if (i % 2 === 0) {
                    const count = Number.parseInt(
                        OneTwo.getNumberFromWorld(cur), 10
                    );
                    acc.push({count, value: ''})
                } else {
                    acc[acc.length - 1].value = cur
                }
                return acc;
            }, []
        );
    }

    private static getNumberFromWorld(world: string): string {
        if (OneTwo.i18nWorldToNumberMap.has(world)) {
            return OneTwo.i18nWorldToNumberMap.get(world);
        } else {
            throw new Error(`unknow world ${world}`)
        }
    }

    private static getNumberSequence(numberCounter: NumberCounter): string {
        const value = OneTwo.getNumberFromWorld(numberCounter.value);
        return new Array(numberCounter.count).fill(value).join(' ');
    }

}
