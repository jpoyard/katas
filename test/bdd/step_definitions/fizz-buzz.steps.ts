import {binding, then, when} from 'cucumber-tsflow';
import {expect} from 'chai';
import {FizzBuzz} from "../../../src/app/fizz-buzz/service/fizz-buzz";

@binding()
export class FizzBuzz1Steps {
    private fizzBuzz: FizzBuzz;
    private actual: string;

    constructor() {
        this.fizzBuzz = new FizzBuzz();
    }

    @when(/^play is called with (\d*)$/)
    public callPlay(input: number) {
        this.actual = this.fizzBuzz.play(Number(input));
    }

    @then(/^The returned value should be (.*)$/)
    public returnedValueShouldBe(expectedValue: string) {
        expect(this.actual).to.equal(expectedValue);
    }
}
