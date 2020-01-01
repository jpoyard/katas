export class FizzBuzz {
    play(given: number) {

        if (this.isFizzBuzz(given)) {
            return 'FizzBuzz';
        }
        if (this.isFizz(given)) {
            return 'Fizz';
        }
        if (this.isBuzz(given)) {
            return 'Buzz';
        }

        return given.toString();
    }

    private isBuzz(given: number) {
        return given % 5 === 0;
    }

    private isFizz(given: number) {
        return given % 3 === 0;
    }

    private isFizzBuzz(given: number) {
        return this.isFizz(given) && this.isBuzz(given)
    }
}
