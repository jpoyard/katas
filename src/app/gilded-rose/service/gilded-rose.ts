export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    private static updateItemQuality(item: Item) {
        if (item.name === 'Aged Brie') {

            GildedRose.improveQuality(item);

            GildedRose.reduceSellIn(item);

            if (item.sellIn < 0) {
                GildedRose.improveQuality(item);
            }
        } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
            GildedRose.improveQuality(item);

            if (item.sellIn < 11) {
                GildedRose.improveQuality(item);
            }
            if (item.sellIn < 6) {
                GildedRose.improveQuality(item);
            }

            GildedRose.reduceSellIn(item);

            if (item.sellIn < 0) {
                item.quality = 0
            }
        } else if (item.name === 'Sulfuras, Hand of Ragnaros') {

        } else {
            GildedRose.reduceQuality(item);

            GildedRose.reduceSellIn(item);

            if (item.sellIn < 0) {
                GildedRose.reduceQuality(item);
            }
        }
        return item;
    }

    private static reduceSellIn(item: Item) {
        item.sellIn = item.sellIn - 1;
    }

    private static reduceQuality(item: Item) {
        if (item.quality > 0) {
            item.quality = item.quality - 1
        }
    }

    private static improveQuality(item: Item) {
        if (item.quality < 50) {
            item.quality = item.quality + 1;
        }
    }

    updateQuality(): Item[] {
        this.items = this.items.map(i => GildedRose.updateItemQuality({...i}));
        return this.items;
    }
}
