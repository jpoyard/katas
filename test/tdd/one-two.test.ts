// https://josepaumard.github.io/katas/introductory/onetwo-kata.html
import {expect} from 'chai';
import {OneTwo} from "../../src/app/one-two/service/one-two.class";

describe('oneTwo function', () => {
    [
        {when: '1', then: 'one one'},
        {when: '2', then: 'one two'}
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
