import {GildedRose, Item} from "../../src/app/gilded-rose/service/gilded-rose";
import {expect} from "chai";

describe(GildedRose.name, () => {

    xit(`should do nothing`, () => {
        // Given
        const gildedRose = new GildedRose();

        // When
        gildedRose.updateQuality();

        // ThenBackstage passes to a TAFKAL80ETC concert
        expect(gildedRose.items).to.equal([]);
    });

    [
        {
            given: {
                name: "+5 Dexterity Vest", sellIn: 10, quality: 20
            },
            then: {sellIn: 9, quality: 19}
        },
        {
            given: {
                name: "+5 Dexterity Vest", sellIn: 0, quality: 20
            },
            then: {sellIn: -1, quality: 18}
        },{
        given: {
            name: "Aged Brie", sellIn: 10, quality: 20
        },
        then: {sellIn: 9, quality: 21}
    }, {
        given: {
            name: "+5 Dexterity Vest", sellIn: 10, quality: 0
        },
        then: {sellIn: 9, quality: 0}
    }, {
        given: {
            name: "Sulfuras, Hand of Ragnaros", sellIn: 10, quality: 10
        },
        then: {sellIn: 10, quality: 10}
    }, {
        given: {
            name: "Aged Brie", sellIn: 10, quality: 50
        },
        then: {sellIn: 9, quality: 50}
    }, {
        given: {
            name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 10, quality: 10
        },
        then: {sellIn: 9, quality: 12}
    }, {
        given: {
            name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 10
        },
        then: {sellIn: 4, quality: 13}
    }, {
        given: {
            name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 6, quality: 10
        },
        then: {sellIn: 5, quality: 12}
    }, {
        given: {
            name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 11, quality: 10
        },
        then: {sellIn: 10, quality: 11}
    }, {
        given: {
            name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 11, quality: 49
        },
        then: {sellIn: 10, quality: 50}
    }, {
        given: {
            name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 49
        },
        then: {sellIn: 4, quality: 50}
    }, {
        given: {
            name: "+5 Dexterity Vest", sellIn: -1, quality: 10
        },
        then: {sellIn: -2, quality: 8}
    }, {
        given: {
            name: "Aged Brie", sellIn: -1, quality: 10
        },
        then: {sellIn: -2, quality: 12}
    }, {
        given: {
            name: "Aged Brie", sellIn: -1, quality: 50
        },
        then: {sellIn: -2, quality: 50}
    },{
        given: {
            name: "Backstage passes to a TAFKAL80ETC concert", sellIn: -1, quality: 10
        },
        then: {sellIn: -2, quality: 0}
    },{
        given: {
            name: "Sulfuras, Hand of Ragnaros", sellIn: -1, quality: 0
        },
        then: {sellIn: -1, quality: 0}
    },{
        given: {
            name: "Sulfuras, Hand of Ragnaros", sellIn: -2, quality: 1
        },
        then: {sellIn: -2, quality: 1}
    }
    ].forEach(((scenario: {
        given: {
            name: string, sellIn: number, quality: number
        },
        then: { sellIn: number, quality: number }
    }) => {
        it(`should return "${JSON.stringify(scenario.then)}", when given item is ${JSON.stringify(scenario.given)}`, () => {
            // Given
            const item = new Item(scenario.given.name, scenario.given.sellIn, scenario.given.quality);
            const gildedRose = new GildedRose([item]);

            // When
            gildedRose.updateQuality();
            const actual = gildedRose.items[0];

            // Then
            expect(actual.name).to.equal(scenario.given.name);
            expect(actual.sellIn).to.equal(scenario.then.sellIn);
            expect(actual.quality).to.equal(scenario.then.quality);
        })
    }))
});
