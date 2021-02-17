import {GildedRose, Item} from "../../src/app/gilded-rose/service/gilded-rose";
import {expect} from "chai";

describe(GildedRose.name, () => {
    [
        {
            given: {
                name: "+5 Dexterity Vest", sellIn: 10, quality: 20
            },
            then: {sellIn: 9, quality: 19}
        },
        {
            given: {
                name: "Aged Brie", sellIn: 2, quality: 0
            },
            then: {sellIn: 1, quality: 1}
        },
        {
            given: {
                name: "Aged Brie", sellIn: -1, quality: 0
            },
            then: {sellIn: -2, quality: 2}
        },
        {
            given: {
                name: "Elixir of the Mongoose", sellIn: 5, quality: 7
            },
            then: {sellIn: 4, quality: 6}
        },
        {
            given: {
                name: "Elixir of the Mongoose", sellIn: -1, quality: 7
            },
            then: {sellIn: -2, quality: 5}
        },
        {
            given: {
                name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80
            },
            then: {sellIn: 0, quality: 80}
        },
        {
            given: {
                name: "Sulfuras, Hand of Ragnaros", sellIn: -1, quality: 80
            },
            then: {sellIn: -1, quality: 80}
        },
        {
            given: {
                name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 15, quality: 20
            },
            then: {sellIn: 14, quality: 21}
        },
        {
            given: {
                name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 10, quality: 49
            },
            then: {sellIn: 9, quality: 50}
        },
        {
            given: {
                name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 19
            },
            then: {sellIn: 4, quality: 22}
        },
        {
            given: {
                name: "Backstage passes to a TAFKAL80ETC concert", sellIn: -1, quality: 19
            },
            then: {sellIn: -2, quality: 0}
        }
    ].forEach((scenario => {
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
