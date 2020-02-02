import {expect} from 'chai';
import {Labyrinth, TypeEnum} from "../../src/app/labyrinth/service/Labyrinth";

describe(Labyrinth.name, () => {
    describe('initialize', () => {
        [
            {
                given: {size: {width: 1, height: 1}}, then:
                    [{North: TypeEnum.Wall, South: TypeEnum.Wall, East: TypeEnum.Wall, West: TypeEnum.Wall}]
            }
        ].forEach(scenario => {
            it(``, () => {
                // given
                const labyrinth = new Labyrinth(scenario.given.size);

                // when
                const actual = labyrinth.initialize();

                // then
                expect(actual).to.eql(scenario.then);
            });
        });
    });
});