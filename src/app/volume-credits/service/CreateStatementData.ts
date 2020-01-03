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

interface PerformanceCalculator {
    performance: Performance;
    play: Play;
    amount: number;
    volumeCredits: number;
}

interface Statement {
    customer: string;
    performances: EnrichPerformance[];
    totalAmount: number;
    totalVolumeCredits: number;
}

class PerformanceCalculatorImpl implements PerformanceCalculator {
    constructor(public performance: Performance, public play: Play) {
    }

    public get amount(): number {
        throw new Error('subclass responsability');
    }

    public get volumeCredits(): number {
        return Math.max(this.performance.audience - 30, 0);
    }
}

class TragedyCalculator extends PerformanceCalculatorImpl implements PerformanceCalculator {
    constructor(performance: Performance, play: Play) {
        super(performance, play)
    }

    public get amount(): number {
        let result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }
        return result
    }
}

class ComedyCalculator extends PerformanceCalculatorImpl implements PerformanceCalculator {
    constructor(public performance: Performance, public play: Play) {
        super(performance, play)
    }

    public get amount(): number {
        let result = 30000;
        if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        return result
    }

    public get volumeCredits(): number {
        return super.volumeCredits + Math.floor(this.performance.audience / 5);
    }
}

function createPerformanceCalculator(aPerformance, aPlay): PerformanceCalculator {
    const PERFORMANCE_CALCULATORS: Array<{ type: string, constructor }> = [
        {type: "tragedy", constructor: TragedyCalculator},
        {type: "comedy", constructor: ComedyCalculator},
    ];

    const result = PERFORMANCE_CALCULATORS.find(
        (properties) => properties.type === aPlay.type
    );
    if (!result) {
        throw new Error(`unknown type: ${aPlay.type}`);
    }
    return new result.constructor(aPerformance, aPlay);
}

export function createStatementData(invoice, plays): Statement {
    const result: any = {};
    result.customer = invoice.customer;
    result.performances = invoice.performances.map(enrichPerformance);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result;

    function enrichPerformance(aPerformance): EnrichPerformance {
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
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
