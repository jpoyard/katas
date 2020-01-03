import {Operation, OperationManager} from "./operation";

export interface UnaryOperation extends Operation {
    calculate(operand: number): number;
}

class OperationSQRT implements UnaryOperation {
    calculate(operand: number): number {
        return Math.sqrt(operand);
    }

    hasOperator(operator: string): boolean {
        return operator === 'SQRT';
    }
}

export class UnaryOperationManager extends OperationManager<UnaryOperation> {
    constructor() {
        super();
        this.addOperation(new OperationSQRT());
    }
}