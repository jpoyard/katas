import {expect} from "chai";
import {htmlStatement, statement} from "../../src/app/volume-credits/service/statement";
import {createStatementData} from "../../src/app/volume-credits/service/CreateStatementData";

describe('Volume Credits', () => {
    describe('statement', () => {
        [
            {
                given: {
                    invoice: {
                        "customer": "BigCo",
                        "performances": [
                            {
                                "playID": "hamlet",
                                "audience": 55
                            },
                            {
                                "playID": "as-like",
                                "audience": 35
                            },
                            {
                                "playID": "othello",
                                "audience": 40
                            }
                        ]
                    }, plays: {
                        "hamlet": {
                            "name": "Hamlet",
                            "type": "tragedy"
                        },
                        "as-like": {
                            "name": "As You Like It",
                            "type": "comedy"
                        },
                        "othello": {
                            "name": "Othello",
                            "type": "tragedy"
                        }
                    }
                },
                then: 'Statement for BigCo\n  Hamlet: $650.00 (55 seats)\n  As You Like It: $580.00 (35 seats)\n  Othello: $500.00 (40 seats)\nAmount owed is $1,730.00\nYou earned 47 credits\n'
            }, {
            given: {
                invoice: {
                    "customer": "BigCo",
                    "performances": [
                        {
                            "playID": "hamlet",
                            "audience": 30
                        }
                    ]
                }, plays: {
                    "hamlet": {
                        "name": "Hamlet",
                        "type": "tragedy"
                    }
                }
            },
            then: 'Statement for BigCo\n  Hamlet: $400.00 (30 seats)\nAmount owed is $400.00\nYou earned 0 credits\n'
        }, {
            given: {
                invoice: {
                    "customer": "BigCo",
                    "performances": [
                        {
                            "playID": "hamlet",
                            "audience": 20
                        }
                    ]
                }, plays: {
                    "hamlet": {
                        "name": "Hamlet",
                        "type": "tragedy"
                    }
                }
            },
            then: 'Statement for BigCo\n  Hamlet: $400.00 (20 seats)\nAmount owed is $400.00\nYou earned 0 credits\n'
        }, {
            given: {
                invoice: {
                    "customer": "BigCo",
                    "performances": [
                        {
                            "playID": "as-like",
                            "audience": 20
                        }
                    ]
                }, plays: {
                    "as-like": {
                        "name": "As You Like It",
                        "type": "comedy"
                    },
                }
            },
            then: 'Statement for BigCo\n  As You Like It: $360.00 (20 seats)\nAmount owed is $360.00\nYou earned 4 credits\n'
        },
            {
                given: {
                    invoice: {
                        "customer": "BigCo",
                        "performances": [
                            {
                                "playID": "as-like",
                                "audience": 10
                            }
                        ]
                    }, plays: {
                        "as-like": {
                            "name": "As You Like It",
                            "type": "comedy"
                        },
                    }
                },
                then: 'Statement for BigCo\n  As You Like It: $330.00 (10 seats)\nAmount owed is $330.00\nYou earned 2 credits\n'
            }
        ].forEach(
            (scenario: { given: { invoice: any, plays: any }, then: string }) => {

                it(`should return ${scenario.then}, when given expression is ${JSON.stringify(scenario.given)}`, () => {
                    // Given

                    // When
                    const actual = statement(scenario.given.invoice, scenario.given.plays);

                    // Then
                    expect(actual).to.equal(scenario.then);
                })
            });

        describe('', () => {
            const invoice = {
                "customer": "BigCo",
                "performances": [
                    {
                        "playID": "hamlet",
                        "audience": 55
                    }
                ]
            };
            const plays = {
                "hamlet": {
                    "name": "Hamlet",
                    "type": "bad type"
                }
            };

            it(`should Throw exception, when given expression is ${JSON.stringify({invoice, plays})}`, () => {
                // Given

                // When
                try {
                    expect(statement(invoice, plays)).to.throw();
                    expect.fail();
                } catch (e) {

                }

                // Then
            })

        })
    });
    describe('statement', () => {
        [
            {
                given: {
                    invoice: {
                        "customer": "BigCo",
                        "performances": [
                            {
                                "playID": "hamlet",
                                "audience": 55
                            },
                            {
                                "playID": "as-like",
                                "audience": 35
                            },
                            {
                                "playID": "othello",
                                "audience": 40
                            }
                        ]
                    }, plays: {
                        "hamlet": {
                            "name": "Hamlet",
                            "type": "tragedy"
                        },
                        "as-like": {
                            "name": "As You Like It",
                            "type": "comedy"
                        },
                        "othello": {
                            "name": "Othello",
                            "type": "tragedy"
                        }
                    }
                },
                then: `
<h1>Statement for BigCo</h1>
<table>
    <thead>
        <tr>
            <th>play</th><th>seats</th><th>cost</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Hamlet</td>
            <td>55</td>
            <td>$650.00</td>
        </tr>
        <tr>
            <td>As You Like It</td>
            <td>35</td>
            <td>$580.00</td>
        </tr>
        <tr>
            <td>Othello</td>
            <td>40</td>
            <td>$500.00</td>
        </tr>    </tbody>
</table>
<p>Amount owed is <em>$1,730.00</em></p>
<p>You earned <em>47</em> credits</p>
`
            }
        ].forEach(
            (scenario: { given: { invoice: any, plays: any }, then: string }) => {

                it(`should return ${scenario.then}, when given expression is ${JSON.stringify(scenario.given)}`, () => {
                    // Given

                    // When
                    const actual = htmlStatement(scenario.given.invoice, scenario.given.plays);

                    // Then
                    expect(actual).to.equal(scenario.then);
                })
            });
    });

    describe('createStatementData', () => {
        [
            {
                given: {
                    invoice: {
                        "customer": "BigCo",
                        "performances": [
                            {
                                "playID": "hamlet",
                                "audience": 55
                            },
                            {
                                "playID": "as-like",
                                "audience": 35
                            },
                            {
                                "playID": "othello",
                                "audience": 40
                            }
                        ]
                    }, plays: {
                        "hamlet": {
                            "name": "Hamlet",
                            "type": "tragedy"
                        },
                        "as-like": {
                            "name": "As You Like It",
                            "type": "comedy"
                        },
                        "othello": {
                            "name": "Othello",
                            "type": "tragedy"
                        }
                    }
                },
                then: {
                    "customer": "BigCo",
                    "performances": [
                        {
                            "amount": 65000,
                            "audience": 55,
                            "play": {
                                "name": "Hamlet",
                                "type": "tragedy"
                            },
                            "playID": "hamlet",
                            "volumeCredits": 25
                        },
                        {
                            "amount": 58000,
                            "audience": 35,
                            "play": {
                                "name": "As You Like It",
                                "type": "comedy"
                            },
                            "playID": "as-like",
                            "volumeCredits": 12
                        },
                        {
                            "amount": 50000,
                            "audience": 40,
                            "play": {
                                "name": "Othello",
                                "type": "tragedy",
                            },
                            "playID": "othello",
                            "volumeCredits": 10,
                        }
                    ],
                    "totalAmount": 173000,
                    "totalVolumeCredits": 47
                }
            }, {
            given: {
                invoice: {
                    "customer": "BigCo",
                    "performances": [
                        {
                            "playID": "hamlet",
                            "audience": 30
                        }
                    ]
                }, plays: {
                    "hamlet": {
                        "name": "Hamlet",
                        "type": "tragedy"
                    }
                }
            },
            then: {
                "customer": "BigCo",
                "performances": [
                    {
                        "amount": 40000,
                        "audience": 30,
                        "play": {
                            "name": "Hamlet",
                            "type": "tragedy"
                        },
                        "playID": "hamlet",
                        "volumeCredits": 0
                    }
                ],
                "totalAmount": 40000,
                "totalVolumeCredits": 0
            }
        }, {
            given: {
                invoice: {
                    "customer": "BigCo",
                    "performances": [
                        {
                            "playID": "hamlet",
                            "audience": 20
                        }
                    ]
                }, plays: {
                    "hamlet": {
                        "name": "Hamlet",
                        "type": "tragedy"
                    }
                }
            },
            then: {
                "customer": "BigCo",
                "performances": [
                    {
                        "amount": 40000,
                        "audience": 20,
                        "play": {
                            "name": "Hamlet",
                            "type": "tragedy"
                        },
                        "playID": "hamlet",
                        "volumeCredits": 0
                    }
                ],
                "totalAmount": 40000,
                "totalVolumeCredits": 0
            }
        }, {
            given: {
                invoice: {
                    "customer": "BigCo",
                    "performances": [
                        {
                            "playID": "as-like",
                            "audience": 20
                        }
                    ]
                }, plays: {
                    "as-like": {
                        "name": "As You Like It",
                        "type": "comedy"
                    },
                }
            },
            then: {
                "customer": "BigCo",
                "performances": [
                    {
                        "amount": 36000,
                        "audience": 20,
                        "play": {
                            "name": "As You Like It",
                            "type": "comedy"
                        },
                        "playID": "as-like",
                        "volumeCredits": 4
                    }
                ],
                "totalAmount": 36000,
                "totalVolumeCredits": 4
            }
        },
            {
                given: {
                    invoice: {
                        "customer": "BigCo",
                        "performances": [
                            {
                                "playID": "as-like",
                                "audience": 10
                            }
                        ]
                    }, plays: {
                        "as-like": {
                            "name": "As You Like It",
                            "type": "comedy"
                        },
                    }
                },
                then: {
                    "customer": "BigCo",
                    "performances": [
                        {
                            "amount": 33000,
                            "audience": 10,
                            "play": {
                                "name": "As You Like It",
                                "type": "comedy",
                            },
                            "playID": "as-like",
                            "volumeCredits": 2
                        }
                    ],
                    "totalAmount": 33000,
                    "totalVolumeCredits": 2
                }
            }
        ].forEach(
            (scenario: { given: { invoice: any, plays: any }, then: any }) => {

                it(`should return ${scenario.then}, when given expression is ${JSON.stringify(scenario.given)}`, () => {
                    // Given

                    // When
                    const actual = createStatementData(scenario.given.invoice, scenario.given.plays);

                    // Then
                    expect(actual).to.eql(scenario.then);
                })
            });

        describe('', () => {
            const invoice = {
                "customer": "BigCo",
                "performances": [
                    {
                        "playID": "hamlet",
                        "audience": 55
                    }
                ]
            };
            const plays = {
                "hamlet": {
                    "name": "Hamlet",
                    "type": "bad type"
                }
            };

            it(`should Throw exception, when given expression is ${JSON.stringify({invoice, plays})}`, () => {
                // Given

                // When
                try {
                    expect(createStatementData(invoice, plays)).to.throw();
                    expect.fail();
                } catch (e) {

                }

                // Then
            })

        })
    });
});
