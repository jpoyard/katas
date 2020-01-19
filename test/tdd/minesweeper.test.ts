// https://josepaumard.github.io/katas/intermediate/minesweeper-kata.html
import {expect} from 'chai';
import {Minesweeper} from "../../src/app/minesweeper/minesweeper.class";

describe(Minesweeper.name, () => {
    [
        {when: `1 1\n*`, then: `Field #1:\n*`},
        {when: `1 2\n.*`, then: `Field #1:\n1*`},
        {when: `1 2\n*.`, then: `Field #1:\n*1`},
        {when: `3 3\n...\n.*.\n...`, then: `Field #1:\n111\n1*1\n111`},
        {when: `3 3\n*..\n.*.\n..*`, then: `Field #1:\n*21\n2*2\n12*`}
    ].forEach(scenario => {
        it(`
should return 
${scenario.then}, 
when given input is 
${scenario.when}
`, () => {
            // Given
            const minesweeper = new Minesweeper();

            // When
            const actual = minesweeper.produce(scenario.when);

            // Then
            expect(actual).equals(scenario.then);
        });
    });
});
