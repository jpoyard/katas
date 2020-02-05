import {expect} from 'chai';
import {Labyrinth, TypeEnum} from "../../src/app/labyrinth/service/Labyrinth";

describe(Labyrinth.name, () => {
    describe('initialize', () => {
        [
            {
                given: {size: {width: 1, height: 1}, doorRandomLevel: 100}, then:
                    [{North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall}]
            },
            {
                given: {size: {width: 2, height: 1}, doorRandomLevel: 100}, then:
                    [
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Door, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Door}
                    ]
            },
            {
                given: {size: {width: 2, height: 2}, doorRandomLevel: 100}, then:
                    [
                        {North: TypeEnum.Wall, South: TypeEnum.Door, East: TypeEnum.Door, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Door, East: TypeEnum.Wall, West: TypeEnum.Door},
                        {North: TypeEnum.Door, South: TypeEnum.Wall, East: TypeEnum.Door, West: TypeEnum.Wall},
                        {North: TypeEnum.Door, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Door}
                    ]
            },
            {
                given: {size: {width: 3, height: 2}, doorRandomLevel: 100}, then:
                    [
                        {North: TypeEnum.Wall, South: TypeEnum.Door, East: TypeEnum.Door, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Door, East: TypeEnum.Door, West: TypeEnum.Door},
                        {North: TypeEnum.Wall, South: TypeEnum.Door, East: TypeEnum.Wall, West: TypeEnum.Door},
                        {North: TypeEnum.Door, South: TypeEnum.Wall, East: TypeEnum.Door, West: TypeEnum.Wall},
                        {North: TypeEnum.Door, South: TypeEnum.Wall, East: TypeEnum.Door, West: TypeEnum.Door},
                        {North: TypeEnum.Door, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Door}
                    ]
            },
            {
                given: {size: {width: 3, height: 3}, doorRandomLevel: 100}, then:
                    [
                        {North: TypeEnum.Wall, South: TypeEnum.Door, East: TypeEnum.Door, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Door, East: TypeEnum.Door, West: TypeEnum.Door},
                        {North: TypeEnum.Wall, South: TypeEnum.Door, East: TypeEnum.Wall, West: TypeEnum.Door},
                        {North: TypeEnum.Door, South: TypeEnum.Door, East: TypeEnum.Door, West: TypeEnum.Wall},
                        {North: TypeEnum.Door, South: TypeEnum.Door, East: TypeEnum.Door, West: TypeEnum.Door},
                        {North: TypeEnum.Door, South: TypeEnum.Door, East: TypeEnum.Wall, West: TypeEnum.Door},
                        {North: TypeEnum.Door, South: TypeEnum.Wall, East: TypeEnum.Door, West: TypeEnum.Wall},
                        {North: TypeEnum.Door, South: TypeEnum.Wall, East: TypeEnum.Door, West: TypeEnum.Door},
                        {North: TypeEnum.Door, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Door}
                    ]
            },
            {
                given: {size: {width: 1, height: 1}, doorRandomLevel: 0}, then:
                    [{North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall}]
            },
            {
                given: {size: {width: 2, height: 1}, doorRandomLevel: 0}, then:
                    [
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall}
                    ]
            },
            {
                given: {size: {width: 2, height: 2}, doorRandomLevel: 0}, then:
                    [
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall}
                    ]
            },
            {
                given: {size: {width: 3, height: 2}, doorRandomLevel: 0}, then:
                    [
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall}
                    ]
            },
            {
                given: {
                    size: {width: 3, height: 3}, doorRandomLevel: 0
                }, then:
                    [
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall},
                        {North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall}
                    ]

            }
        ].forEach(scenario => {
            it(`should return expected labyrinth when given=${JSON.stringify((scenario.given))}`, () => {
                // given
                const labyrinth = new Labyrinth(scenario.given.size, scenario.given.doorRandomLevel);

                // when
                const actual = labyrinth.initialize();

                // then
                expect(actual).to.eql(scenario.then);
            });
        });
    });
    describe('findPath', () => {
        [
            {given: {size: {width: 2, height: 1}, doorRandomLevel: 100}, when: {start: 0, end: 1}, then: [0, 1]},
            {given: {size: {width: 2, height: 1}, doorRandomLevel: 100}, when: {start: 1, end: 0}, then: [1, 0]},
            {given: {size: {width: 1, height: 2}, doorRandomLevel: 100}, when: {start: 0, end: 1}, then: [0, 1]},
            {given: {size: {width: 1, height: 2}, doorRandomLevel: 100}, when: {start: 1, end: 0}, then: [1, 0]},
            {given: {size: {width: 2, height: 2}, doorRandomLevel: 100}, when: {start: 0, end: 3}, then: [0, 1, 3]},
            {given: {size: {width: 2, height: 2}, doorRandomLevel: 100}, when: {start: 3, end: 0}, then: [3, 1, 0]},
            {given: {size: {width: 2, height: 2}, doorRandomLevel: 100}, when: {start: 1, end: 2}, then: [1, 3, 2]},
            {given: {size: {width: 2, height: 2}, doorRandomLevel: 100}, when: {start: 2, end: 1}, then: [2, 0, 1]},
        ].forEach((scenario) => {
            it(`should return expected path when given=${JSON.stringify((scenario.given))}`, () => {
                // given
                const labyrinth = new Labyrinth(scenario.given.size, scenario.given.doorRandomLevel);
                labyrinth.initialize();

                // when
                const actual = labyrinth.findPath(scenario.when.start, scenario.when.end);
                // then
                expect(actual).to.eql(scenario.then);
            });
        })
    });
});