Feature: Fizz Buzz

  Scenario Outline: Says Fizz, Buzz or FizzBuzz
    When play is called with <input>
    Then The returned value should be <output>
    Examples:
      | input | output   |
      | 1     | 1        |
      | 2     | 2        |
      | 3     | Fizz     |
      | 6     | Fizz     |
      | 5     | Buzz     |
      | 10    | Buzz     |
      | 15    | FizzBuzz |
