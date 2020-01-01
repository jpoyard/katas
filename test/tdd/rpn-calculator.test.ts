// http://codingdojo.org/kata/RPN/

import {expect} from 'chai';
import {RPNCalculator} from "../../src/app/rpn-calculator/rpn-calculator";

describe('RPN Calculator', () => {
    let calculator: RPNCalculator;

    beforeEach(() => {
        calculator = new RPNCalculator();
    })

    describe('calculate()', () => {
        [
            {given: '9 3 /', then: 3},
            {given: '4 2 /', then: 2},
            {given: '20 4 /', then: 5},
            {given: '20 10 /', then: 2},
            {given: '22 12 +', then: 34},
            {given: '12 9 -', then: 3},
            {given: '2 4 *', then: 8},
            {given: '4 2 + 3 -', then: 3},
            {given: '3 5 8 * 7 + *', then: 141},
            {given: '9 SQRT', then: 3},
            {given: '5 3 4 2 9 1 MAX', then: 9},
            {given: '4 5 MAX 1 2 MAX *', then: 10}
        ].forEach(
            (scenario: { given: string, then: number }) => {

                it(`should return ${scenario.then}, when given expression is ${scenario.given}`, () => {
                    // Given

                    // When
                    const actual = calculator.calculate(scenario.given)

                    // Then
                    expect(actual).to.equal(scenario.then);
                })
            })
    })
})