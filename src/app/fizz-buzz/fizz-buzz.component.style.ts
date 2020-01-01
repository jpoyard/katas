export const STYLE = `
.container {
    flex: 1 1 auto;
    display: grid;
    grid-template-columns: repeat(10, auto);
    grid-template-rows: repeat(10, auto);
    justify-content: stretch;
    align-content: stretch;
}

.container > div {
    display: flex;
    align-items: center;
    justify-content: center;
}

.result {
    border-radius: 50%;
    height: 35px;
    width: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    font-weight: bold;
}

.number {
    background: black;
    color: white;
}

.fizz {
    background: red;
    color: white;
    text-transform: uppercase;
    width: auto;
}

.buzz {
    background: forestgreen;
    color: white;
    text-transform: uppercase;
    width: auto;
}

.fizz-buzz {
    text-align: center;
    text-transform: uppercase;
    align-items: center;
    background: yellow;
    width: auto;
}
`;