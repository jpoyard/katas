import {Operation, OperationManager} from "./operation";

export interface BinaryOperation extends Operation {
    hasOperator(operator: string): boolean;
    calculate(leftOperand: number, rightOperand: number): number;
}

class OperationDiv implements BinaryOperation {
    calculate(leftOperand: number, rightOperand: number): number {
        return leftOperand / rightOperand;
    }
    hasOperator(operator: string): boolean {
        return operator === '/';
    }
}

class OperationAdd implements BinaryOperation {
    calculate(leftOperand: number, rightOperand: number): number {
        return leftOperand + rightOperand;
    }
    hasOperator(operator: string): boolean {
        return operator === '+';
    }
}

class OperationSub implements BinaryOperation {
    calculate(leftOperand: number, rightOperand: number): number {
        return leftOperand - rightOperand;
    }
    hasOperator(operator: string): boolean {
        return operator === '-';
    }
}

class OperationMul implements BinaryOperation {
    calculate(leftOperand: number, rightOperand: number): number {
        return leftOperand * rightOperand;
    }
    hasOperator(operator: string): boolean {
        return operator === '*';
    }
}

class OperationMAX implements BinaryOperation {
    calculate(leftOperand: number, rightOperand: number): number {
        return Math.max(leftOperand , rightOperand);
    }
    hasOperator(operator: string): boolean {
        return operator === 'MAX';
    }
}

export class BinaryOperationManager extends OperationManager<BinaryOperation> {
    constructor() {
        super();
        this.addOperation(new OperationDiv());
        this.addOperation(new OperationAdd());
        this.addOperation(new OperationSub());
        this.addOperation(new OperationMul());
        this.addOperation(new OperationMAX());
    }
}