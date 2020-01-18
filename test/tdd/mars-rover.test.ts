import {expect} from 'chai';
import {Direction, MarsRover, Position} from "../../src/app/mars-rover/service/mars-rover.class";

describe(MarsRover.name, () => {
    let marsRover: MarsRover;

    describe('You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing.', () => {
        [
            {given: {position: {x: 0, y: 1}, direction: 'N'}},
            {given: {position: {x: -1, y: 0}, direction: 'W'}},
            {given: {position: {x: 0, y: -1}, direction: 'S'}},
            {given: {position: {x: 1, y: 0}, direction: 'E'}},
        ].forEach((scenario: { given: { position: Position, direction: Direction } }) => {
            it(`should create a new mars rover according given position and direction`, () => {
                // Given

                // When
                marsRover = new MarsRover(scenario.given.position, scenario.given.direction);

                // Then
                expect(marsRover.position).equals(scenario.given.position);
                expect(marsRover.direction).equals(scenario.given.direction);
            });
        })
    });

    describe('The rover receives a character array of commands.', () => {
        describe('Implement commands that move the rover forward/backward (f,b).', () => {
            [
                {
                    given: {position: {x: 0, y: 0}, direction: 'N'},
                    when: {commands: 'f'},
                    then: {position: {x: 0, y: 1}}
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'N'},
                    when: {commands: 'b'},
                    then: {position: {x: 0, y: -1}}
                },
                {
                    given: {position: {x: 1, y: 1}, direction: 'N'},
                    when: {commands: 'f'},
                    then: {position: {x: 1, y: 2}}
                },
                {
                    given: {position: {x: -1, y: -1}, direction: 'N'},
                    when: {commands: 'b'},
                    then: {position: {x: -1, y: -2}}
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'W'},
                    when: {commands: 'f'},
                    then: {position: {x: -1, y: 0}}
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'W'},
                    when: {commands: 'b'},
                    then: {position: {x: 1, y: 0}}
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'S'},
                    when: {commands: 'f'},
                    then: {position: {x: 0, y: -1}}
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'S'},
                    when: {commands: 'b'},
                    then: {position: {x: 0, y: 1}}
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'E'},
                    when: {commands: 'f'},
                    then: {position: {x: 1, y: 0}}
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'E'},
                    when: {commands: 'b'},
                    then: {position: {x: -1, y: 0}}
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'N'},
                    when: {commands: 'ff'},
                    then: {position: {x: 0, y: 2}}
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'E'},
                    when: {commands: 'bbfbb'},
                    then: {position: {x: -3, y: 0}}
                },
            ].forEach((scenario: { given: { position: Position, direction: Direction }, when: { commands: string }, then: { position: Position } }) => {
                it(`
should return ${JSON.stringify(scenario.then.position)}, 
when given params are ${JSON.stringify(scenario.given)} 
and call do method with '${scenario.when.commands}' commands`, () => {
                    // Given
                    marsRover = new MarsRover(scenario.given.position, scenario.given.direction);

                    // When
                    const actual = marsRover.do(scenario.when.commands);

                    // Then
                    expect(actual).eql(scenario.then.position);
                    expect(marsRover.position).eql(scenario.then.position);
                    expect(marsRover.direction).eq(scenario.given.direction);
                })
            })
        })
    })
});
