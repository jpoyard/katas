import {STYLE} from "./gilded-rose.component.style";
import {GildedRose, Item} from "./service/gilded-rose";

export class GildedRoseElement extends HTMLElement {
    public static readonly ITEMS: Item[] = [
        new Item("+5 Dexterity Vest", 10, 20), //
        new Item("Aged Brie", 2, 0), //
        new Item("Elixir of the Mongoose", 5, 7), //
        new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
        new Item("Sulfuras, Hand of Ragnaros", -1, 80),
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    ];
    private shadow: ShadowRoot;

    constructor() {
        super();
        this.init();
    }

    private init() {
        this.shadow = this.attachShadow({mode: 'open'});

        const wrapper = this.getContent();

        const style = document.createElement('style');

        style.textContent = STYLE;

        this.shadow.appendChild(style);
        this.shadow.appendChild(wrapper);
    }

    private getContent(): HTMLElement {
        const container = document.createElement('div');
        container.classList.add('container');

        const gildedRose = new GildedRose(GildedRoseElement.ITEMS.map(item => new Item(item.name, item.sellIn, item.quality)));
        gildedRose.updateQuality();

        container.innerHTML = `
<h1>Before</h1>
${this.displayItems(GildedRoseElement.ITEMS)}
<h1>After</h1>
${this.displayItems(gildedRose.items)}
`;

        return container;
    }

    private displayItems(items) {
        let result = `
<table>
<thead>
    <tr>
        <th>Name</th>
        <th>SellIn</th>
        <th>Quality</th>
    </tr>
</thead>
<tbody>`;
        items.forEach(
            item => {
                result += `
    <tr>
        <td>${item.name}</td>
        <td>${item.sellIn}</td>
        <td>${item.quality}</td>
    </tr>
`
            }
        );

        result += `</tbody></table>`;
        return result;
    }
}
