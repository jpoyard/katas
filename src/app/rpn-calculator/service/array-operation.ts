import {Operation, OperationManager} from "./operation";

export interface ArrayOperation extends Operation {
    calculate(operand: number[]): number;
}

class OperationMAX implements ArrayOperation {
    calculate(operands: number[]): number {
        return Math.max(...operands);
    }

    hasOperator(operator: string): boolean {
        return operator === 'MAX';
    }
}

export class ArrayOperationManager extends OperationManager<ArrayOperation>{
    constructor() {
        super();
        this.addOperation(new OperationMAX());
    }
}