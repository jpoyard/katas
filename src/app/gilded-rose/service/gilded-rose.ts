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
            item = new AgedBrieItemUpdate(item).update();
        } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
            item = new BackstagePassesItemUpdate(item).update();
        } else if (item.name === 'Sulfuras, Hand of Ragnaros') {
            // NO ACTION
        } else {
            item = new ItemUpdater(item).update();
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

class ItemUpdater {
    constructor(public item: Item) {
    }

    update(): Item {
        this.updateSellIn();
        this.updateQuality();
        return this.item;
    }

    protected updateSellIn() {
        this.item.sellIn = this.item.sellIn - 1;
    }

    protected updateQuality() {
        if (this.item.quality > 0) {
            this.item.quality = this.item.quality - 1
        }
        if ((this.item.sellIn < 0) && (this.item.quality > 0)) {
            this.item.quality = this.item.quality - 1
        }
    }
}

class AgedBrieItemUpdate extends ItemUpdater {
    constructor(public item: Item) {
        super(item);
    }

    protected updateQuality() {
        if (this.item.quality < 50) {
            this.item.quality = this.item.quality + 1;
        }
        if ((this.item.sellIn < 0) && (this.item.quality < 50)) {
            this.item.quality = this.item.quality + 1
        }
    }
}

class BackstagePassesItemUpdate extends ItemUpdater {
    constructor(public item: Item) {
        super(item);
    }

    protected updateQuality() {
        if (this.item.quality < 50) {
            this.item.quality = this.item.quality + 1;
            if ((this.item.sellIn < 10) && (this.item.quality < 50)) {
                this.item.quality = this.item.quality + 1
            }
            if ((this.item.sellIn < 5) && (this.item.quality < 50)) {
                this.item.quality = this.item.quality + 1
            }
        }
        if (this.item.sellIn < 0) {
            this.item.quality = 0
        }
    }
}
