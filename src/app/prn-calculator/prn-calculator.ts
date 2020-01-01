import {BinaryOperationManager} from './binary-operation';
import {UnaryOperation, UnaryOperationManager} from "./unary-operation";
import {ArrayOperationManager} from "./array-operation";

export class PRNCalculator {
    private unaryOperationManager: UnaryOperationManager;
    private binaryOperationManager: BinaryOperationManager;
    private arrayOperationManager: ArrayOperationManager;

    constructor() {
        this.unaryOperationManager = new UnaryOperationManager();
        this.binaryOperationManager = new BinaryOperationManager();
        this.arrayOperationManager = new ArrayOperationManager()
    }
    calculate(given: string) {
        const expressionQueue = given.split(' ');
        let resultStack: Array<number> = [];
        let operandCounter = 0;

        do {
            const element = expressionQueue.shift();

            if(this.arrayOperationManager.hasOperator(element) && operandCounter > 2) {
                operandCounter = 0;
                const operation = this.arrayOperationManager.getOperation(element);
                resultStack = [(operation.calculate(resultStack))];
            } else if(this.binaryOperationManager.hasOperator(element)){
                operandCounter = 0;
                const rightOperand = resultStack.pop();
                const leftOperand  = resultStack.pop();
                const operation = this.binaryOperationManager.getOperation(element);
                resultStack.push(operation.calculate(leftOperand, rightOperand));
            } else if(this.unaryOperationManager.hasOperator(element)) {
                operandCounter = 0;
                const operand = resultStack.pop();
                const operation = this.unaryOperationManager.getOperation(element);
                resultStack.push(operation.calculate(operand));
            } else {
                operandCounter++;
                resultStack.push(Number(element));
            }
        } while(expressionQueue.length>0)

        return resultStack.pop();
    }
}
