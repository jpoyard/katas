import {createStatementData} from "./CreateStatementData";

export function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data: { customer: string, performances, totalAmount: number, totalVolumeCredits: number }) {
    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {
        // print line for this order
        result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;
    return result;
}

export function htmlStatement(invoice, plays) {
    return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data: { customer: string, performances, totalAmount: number, totalVolumeCredits: number }) {
    let result = `
<h1>Statement for ${data.customer}</h1>
<table>
    <thead>
        <tr>
            <th>play</th><th>seats</th><th>cost</th>
        </tr>
    </thead>
    <tbody>`;

    for (let perf of data.performances) {
        // print line for this order
        result += `
        <tr>
            <td>${perf.play.name}</td>
            <td>${perf.audience}</td>
            <td>${usd(perf.amount)}</td>
        </tr>`;
    }

    result += `    </tbody>
</table>
<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>
<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>
`;

    return result;
}

function usd(amount: number): string {
    return new Intl.NumberFormat("en-US",
        {
            style: "currency", currency: "USD",
            minimumFractionDigits: 2
        }).format(amount / 100);
}
