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
            item.sellIn = item.sellIn - 1;
            if (item.quality < 50) {
                item.quality = item.quality + 1;
            }
            if ((item.sellIn < 0) && (item.quality < 50)) {
                item.quality = item.quality + 1
            }
        } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
            item.sellIn = item.sellIn - 1;
            if (item.quality < 50) {
                item.quality = item.quality + 1;
                if ((item.sellIn < 10) && (item.quality < 50)) {
                    item.quality = item.quality + 1
                }
                if ((item.sellIn < 5) && (item.quality < 50)) {
                    item.quality = item.quality + 1
                }
            }
            if (item.sellIn < 0) {
                item.quality = 0
            }
        } else if (item.name === 'Sulfuras, Hand of Ragnaros') {
            // NO ACTION
        } else {
            item.sellIn = item.sellIn - 1;
            if (item.quality > 0) {
                item.quality = item.quality - 1
            }
            if ((item.sellIn < 0) && (item.quality > 0)) {
                item.quality = item.quality - 1
            }
        }
        return item;
    }

    public updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            this.items = this.items.map(item => {
                return GildedRose.updateItemQuality(item);
            })
        }

        return this.items;
    }
}
