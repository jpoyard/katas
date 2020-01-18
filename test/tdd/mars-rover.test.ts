import {expect} from 'chai';
import {Direction, MarsRover, Position, State} from "../../src/app/mars-rover/service/mars-rover.class";

interface RoverScenario {
    given: { position: Position, direction: Direction, gridSize: number },
    when: { commands: string },
    then: Array<State>
}

const gridSize = 10;

function testDoMethod(scenario: RoverScenario) {
    it(`
should return ${JSON.stringify(scenario.then)}, 
when given params are ${JSON.stringify(scenario.given)} 
and call do method with '${scenario.when.commands}' commands\`, () => {           
           `, () => {
        // Given
        scenario.given.gridSize = scenario.given.gridSize ? scenario.given.gridSize : gridSize;
        const marsRover = new MarsRover(scenario.given.position, scenario.given.direction, scenario.given.gridSize);

        // When
        const actual = marsRover.do(scenario.when.commands);

        // Then
        expect(actual).eql(scenario.then);
        expect(marsRover.state).eql(scenario.then.reverse()[0]);
    })
}

describe(MarsRover.name, () => {
    describe('You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing.', () => {
        [
            {given: {position: {x: 0, y: 1}, direction: 'N'}},
            {given: {position: {x: gridSize - 1, y: 0}, direction: 'W'}},
            {given: {position: {x: 0, y: gridSize - 1}, direction: 'S'}},
            {given: {position: {x: 1, y: 0}, direction: 'E'}},
        ].forEach((scenario: { given: State }) => {
            it(`should create a new mars rover according given position and direction`, () => {
                // Given

                // When
                let marsRover = new MarsRover(scenario.given.position, scenario.given.direction, 10);

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
                    then: [{position: {x: 0, y: 1}, direction: 'N'}]
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'N'},
                    when: {commands: 'b'},
                    then: [{position: {x: 0, y: gridSize - 1}, direction: 'N'}]
                },
                {
                    given: {position: {x: 1, y: 1}, direction: 'N'},
                    when: {commands: 'f'},
                    then: [{position: {x: 1, y: 2}, direction: 'N'}]
                },
                {
                    given: {position: {x: gridSize - 1, y: gridSize - 1}, direction: 'N'},
                    when: {commands: 'b'},
                    then: [{position: {x: gridSize - 1, y: gridSize - 2}, direction: 'N'}]
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'W'},
                    when: {commands: 'f'},
                    then: [{position: {x: gridSize - 1, y: 0}, direction: 'W'}]
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'W'},
                    when: {commands: 'b'},
                    then: [{position: {x: 1, y: 0}, direction: 'W'}]
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'S'},
                    when: {commands: 'f'},
                    then: [{position: {x: 0, y: gridSize - 1}, direction: 'S'}]
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'S'},
                    when: {commands: 'b'},
                    then: [{position: {x: 0, y: 1}, direction: 'S'}]
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'E'},
                    when: {commands: 'f'},
                    then: [{position: {x: 1, y: 0}, direction: 'E'}]
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'E'},
                    when: {commands: 'b'},
                    then: [{position: {x: gridSize - 1, y: 0}, direction: 'E'}]
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'N'},
                    when: {commands: 'ff'},
                    then: [
                        {position: {x: 0, y: 1}, direction: 'N'},
                        {position: {x: 0, y: 2}, direction: 'N'}
                    ]
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'E'},
                    when: {commands: 'bbfbb'},
                    then: [
                        {position: {x: gridSize - 1, y: 0}, direction: 'E'},
                        {position: {x: gridSize - 2, y: 0}, direction: 'E'},
                        {position: {x: gridSize - 1, y: 0}, direction: 'E'},
                        {position: {x: gridSize - 2, y: 0}, direction: 'E'},
                        {position: {x: gridSize - 3, y: 0}, direction: 'E'},
                    ]
                },
            ].forEach((scenario: RoverScenario) => {
                testDoMethod(scenario);
            })
        });

        describe('Implement commands that turn the rover left/right (l,r).', () => {
            [
                {
                    given: {position: {x: 0, y: 0}, direction: 'N'},
                    when: {commands: 'l'},
                    then: [
                        {position: {x: 0, y: 0}, direction: 'W'}
                    ]
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'W'},
                    when: {commands: 'l'},
                    then: [
                        {position: {x: 0, y: 0}, direction: 'S'}
                    ]
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'S'},
                    when: {commands: 'l'},
                    then: [
                        {position: {x: 0, y: 0}, direction: 'E'}
                    ]
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'E'},
                    when: {commands: 'l'},
                    then: [
                        {position: {x: 0, y: 0}, direction: 'N'}
                    ]
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'N'},
                    when: {commands: 'r'},
                    then: [
                        {position: {x: 0, y: 0}, direction: 'E'}
                    ]
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'E'},
                    when: {commands: 'r'},
                    then: [
                        {position: {x: 0, y: 0}, direction: 'S'}
                    ]
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'S'},
                    when: {commands: 'r'},
                    then: [
                        {position: {x: 0, y: 0}, direction: 'W'}
                    ]
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'W'},
                    when: {commands: 'r'},
                    then: [
                        {position: {x: 0, y: 0}, direction: 'N'}
                    ]
                },
                {
                    given: {position: {x: 0, y: 0}, direction: 'W'},
                    when: {commands: 'rrlrr'},
                    then: [
                        {position: {x: 0, y: 0}, direction: 'N'},
                        {position: {x: 0, y: 0}, direction: 'E'},
                        {position: {x: 0, y: 0}, direction: 'N'},
                        {position: {x: 0, y: 0}, direction: 'E'},
                        {position: {x: 0, y: 0}, direction: 'S'}
                    ]
                }
            ].forEach((scenario: RoverScenario) => {
                testDoMethod(scenario);
            })
        });

        describe('Implement wrapping from one edge of the grid to another. (planets are spheres after all)', () => {
            [{
                given: {position: {x: 0, y: 0}, direction: 'E', gridSize},
                when: {commands: 'b'},
                then: [
                    {position: {x: gridSize - 1, y: 0}, direction: 'E'}
                ]
            }, {
                given: {position: {x: 0, y: 0}, direction: 'N', gridSize},
                when: {commands: 'b'},
                then: [
                    {position: {x: 0, y: gridSize - 1}, direction: 'N'}
                ]
            }, {
                given: {position: {x: gridSize - 1, y: 0}, direction: 'E', gridSize},
                when: {commands: 'f'},
                then: [
                    {position: {x: 0, y: 0}, direction: 'E'}
                ]
            }, {
                given: {position: {x: 0, y: gridSize - 1}, direction: 'N', gridSize},
                when: {commands: 'f'},
                then: [
                    {position: {x: 0, y: 0}, direction: 'N'}
                ]
            }].forEach((scenario: RoverScenario) => {
                testDoMethod(scenario);
            });
        })
    })

});
