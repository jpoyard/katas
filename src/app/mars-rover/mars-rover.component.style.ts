export const STYLE = `
    :host {
        flex-direction: column;
    }
    .toolbar {
        display: flex;
        padding: 5px 10px;
    }
    .toolbar input {
        flex: 1 1 auto;
    }
    .container {
        display: flex;
        flex: 1 1 auto;
        flex-direction: row;
        justify-content: space-between;
    }
    .sidebar {
        display: flex;
        flex-direction: column;               
        min-width: 25%;        
    }
    .console {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
        background-color: #1f1f1f;
        color: #33ffbb;
        border:  2px solid white;
    }
    .map {        
        flex: 1 1 auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    canvas {
        background-color: #1f1f1f;
    }
`;
