interface Play {
    "name": string,
    "type": string
}

interface Performance {
    "playID": string,
    "audience": number
}

interface EnrichPerformance extends Performance {
    play: Play;
    amount: number;
    volumeCredits: number;
}

class PerformanceCalculator {
    constructor(public performance: Performance, public play: Play) {
    }

    public get amount(): number {
        let result = 0;

        switch ((this.play).type) {
            case "tragedy":
                result = 40000;
                if (this.performance.audience > 30) {
                    result += 1000 * (this.performance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (this.performance.audience > 20) {
                    result += 10000 + 500 * (this.performance.audience - 20);
                }
                result += 300 * this.performance.audience;
                break;
            default:
                throw new Error(`unknown type: ${this.play.type}`);
        }

        return result
    }

    public get volumeCredits(): number {
        let result = 0;
        result += Math.max(this.performance.audience - 30, 0);
        if ("comedy" === this.play.type) result += Math.floor(this.performance.audience / 5);
        return result;
    }
}

function createPerformanceCalculator(aPerformance, playFor: (aPerformance: { playID: string }) => any) {
    return new PerformanceCalculator(aPerformance, playFor(aPerformance));
}

export function createStatementData(invoice, plays) {
    const result: any = {};
    result.customer = invoice.customer;
    result.performances = invoice.performances.map(enrichPerformance);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result;

    function enrichPerformance(aPerformance): EnrichPerformance {
        const calculator = createPerformanceCalculator(aPerformance, playFor);
        const result = {...aPerformance};
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return result;
    }

    function playFor(aPerformance: { playID: string }) {
        return plays[aPerformance.playID];
    }

    function totalAmount(data: { performances; }) {
        return data.performances.reduce((total, p) => total + p.amount, 0);
    }

    function totalVolumeCredits(data: { performances; }) {
        return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
    }
}
