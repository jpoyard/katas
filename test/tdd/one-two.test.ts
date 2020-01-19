// https://josepaumard.github.io/katas/introductory/onetwo-kata.html
import {expect} from 'chai';
import {OneTwo} from "../../src/app/one-two/service/one-two.class";

describe(OneTwo.name, () => {
    describe('convertNumberToString()', () => {
        [
            {when: '1', then: 'one one'},
            {when: '2', then: 'one two'},
            {when: '1 2', then: 'one one one two'},
            {when: '3 9', then: 'one three one nine'},
            {when: '2 2', then: 'two two'},
            {when: '3 9 9 9 8 8', then: 'one three three nine two eight'},
            {when: '1 1 1 1 1 1 1', then: 'seven one'},
            {when: '2 4 4 4 6 6 6 6 6', then: 'one two three four five six'},
            {when: '5 5 5 5 5 5 5 5 5 5 5 5', then: 'nine five three five'}
        ].forEach(
            scenario => {
                it(`
should return '${scenario.then}' 
when parameter is '${scenario.when}'            
`, () => {
                    // Given
                    const oneTwo = new OneTwo();

                    // When
                    const actual = oneTwo.convertNumberToString(scenario.when);

                    // Then
                    expect(actual).eq(scenario.then);
                });
            }
        )
    });

    describe('convertStringToNumber()', () => {
        [
            {when: 'one one', then: '1'},
            {when: 'one two', then: '2'},
            {when: 'one one one two', then: '1 2'},
            {when: 'one three one nine', then: '3 9'},
            {when: 'two two', then: '2 2'},
            {when: 'one three three nine two eight', then: '3 9 9 9 8 8'},
            {when: 'seven one', then: '1 1 1 1 1 1 1'},
            {when: 'one two three four five six', then: '2 4 4 4 6 6 6 6 6'},
            {when: 'nine five three five', then: '5 5 5 5 5 5 5 5 5 5 5 5'}
        ].forEach(
            scenario => {
                it(`
should return '${scenario.then}' 
when parameter is '${scenario.when}'            
`, () => {
                    // Given
                    const oneTwo = new OneTwo();

                    // When
                    const actual = oneTwo.convertStringToNumber(scenario.when);

                    // Then
                    expect(actual).eq(scenario.then);
                });
            }
        )
    });
});
