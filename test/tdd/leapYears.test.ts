// https://josepaumard.github.io/katas/introductory/leapyears-kata.html
import {isLeapYear} from "../../src/app/leap-years/service/leap-years.function";
import {expect} from 'chai';

describe('isLeapYear()', () => {
    [
        {when: 1996, then: true},
        {when: 2001, then: false},
        {when: 2012, then: true},
        {when: 1900, then: false},
    ].forEach(scenario => {
        it(`
should return ${scenario.then}, 
when given param is ${scenario.when}        
        `, () => {
            // Given

            // When
            const actual = isLeapYear(scenario.when);

            // Then
            expect(actual).equals(scenario.then);
        })
    })
});
