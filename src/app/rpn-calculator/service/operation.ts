import {UnaryOperation} from "./unary-operation";

export interface Operation {
    hasOperator(operator: string): boolean;
}


export class OperationManager<T extends Operation> {
    private operations: Array<T>;
    constructor() {
        this.operations = [];
    }

    public addOperation(operation: T): void {
        this.operations = [...this.operations, operation];
    }

    public hasOperator(operator): boolean {
        return this.operations.some(operation=>operation.hasOperator(operator));
    }

    public getOperation(operator: string): T {
        const operation = this.operations.reduce((acc, operation) => operation.hasOperator((operator))?operation:acc, null);
        if (!operation) {
            throw new Error(`Unimplemented operator: ${operation}`)
        }
        return operation;
    }
}