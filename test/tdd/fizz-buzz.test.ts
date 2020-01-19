import {expect} from 'chai';
import {FizzBuzz} from "../../src/app/fizz-buzz/service/fizz-buzz";

describe('FizzBuzz', () => {
    let fizzBuzz: FizzBuzz;

    beforeEach(() => {
        fizzBuzz = new FizzBuzz();
    });

    describe('play()', () => {
        [
            {given: 1, then: `1`},
            {given: 2, then: `2`},
            {given: 3, then: `Fizz`},
            {given: 6, then: `Fizz`},
            {given: 5, then: `Buzz`},
            {given: 10, then: `Buzz`},
            {given: 15, then: `FizzBuzz`}
        ].forEach(
            (scenario: { given: number, then: string }) => {

                it(`should return "${scenario.then}", when given value is ${scenario.given}`, () => {
                    // Given

                    // When
                    const actual = fizzBuzz.play(scenario.given);

                    // Then
                    expect(actual).to.equal(scenario.then)
                })
            }
        )
    })


});
