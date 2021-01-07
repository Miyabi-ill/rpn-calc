import React from 'react';
import './rpn.css'

class RPN extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          stack: [],
          inputNumber: null,
          errorMessage: null,
        };

        this.clear = this.clear.bind(this);
        this.delete = this.delete.bind(this);
        this.enter = this.enter.bind(this);
        this.keyinput = this.keyinput.bind(this);
    }

    clear() {
        this.setState(() => ({
            stack: [],
            inputNumber: null,
        }));
    }

    delete() {
        if (this.state.inputNumber != null) {
            const deleted = this.state.inputNumber.slice(0, -1);
            if (deleted.length <= 0) {
                this.setState(() => ({inputNumber: null}));
            }
            else {
                this.setState(() => ({inputNumber: deleted}));
            }
            return;
        }
        const stack = this.state.stack.slice(0, -1);
        this.setState(() => ({stack: stack}));
    }

    enter() {
        if (this.state.inputNumber != null) {
            const number = parseFloat(this.state.inputNumber);
            var stack = this.state.stack.slice();
            stack.push(number);
            this.setState(() => ({
                stack: stack,
                inputNumber: null,
            }));
        }
    }

    operator(operatorType) {
        var stack = this.state.stack.slice();
        if (this.state.inputNumber != null && (stack.length >= 1 || operatorType === '-')) {
            const number = parseFloat(this.state.inputNumber);
            stack.push(number);
        }

        if (stack.length === 1 && operatorType === '-') {
            stack[0] = 0 - stack[0]
            this.setState(() => ({
                stack: stack,
                inputNumber: null,
            }));
        }

        if (stack.length < 2) {
            return;
        }

        // スタックの奥(先に書いてある数字)を順番通り取り出す 例: 3 4 + -> 3 + 4, 1 2 / -> 1 / 2
        const value2 = stack.pop();
        const value1 = stack.pop();
        switch(operatorType) {
            case '+':
                stack.push(value1 + value2);
                break;
            case '-':
                stack.push(value1 - value2);
                break;
            case '*':
                stack.push(value1 * value2);
                break;
            case '/':
                stack.push(value1 / value2);
                break;
            default:
                break;
        }
        this.setState(() => ({
            stack: stack,
            inputNumber: null,
        }));
    }

    number(numberStr) {
        if (this.state.inputNumber && this.state.inputNumber.includes('.') && numberStr === '.') {
            return;
        }
        const concated = this.state.inputNumber ? this.state.inputNumber + numberStr : numberStr;
        this.setState(() => ({inputNumber: concated}));
    }

    keyinput(event) {
        switch(event.key) {
            case '1':
                this.number('1');
                break;
            case '2':
                this.number('2');
                break;
            case '3':
                this.number('3');
                break;
            case '4':
                this.number('4');
                break;
            case '5':
                this.number('5');
                break;
            case '6':
                this.number('6');
                break;
            case '7':
                this.number('7');
                break;
            case '8':
                this.number('8');
                break;
            case '9':
                this.number('9');
                break;
            case '0':
                this.number('0');
                break;
            case '.':
                this.number('.');
                break;
            case 'tab':
            case 'enter':
            case ' ':
                this.enter();
                break;
            case '+':
                this.operator('+');
                break;
            case '-':
                this.operator('-');
                break;
            case '*':
            case 'x':
                this.operator('*');
                break;
            case '/':
                this.operator('/');
                break;
            case 'c':
                this.clear();
                break;
            case 'backspace':
            case 'delete':
                this.delete();
                break;
            default:
                return;
        }
    }

    render() {
        return (
            <div onKeyPress={this.keyinput}>
                <div>{this.state.stack.join(' ') + (this.state.inputNumber ? ' ' + this.state.inputNumber : '')}</div>
                <div className='grid-container'>
                    <div className='number' id='one' onClick={() => this.number('1')}>1</div>
                    <div className='number' id='two' onClick={() => this.number('2')}>2</div>
                    <div className='number' id='three' onClick={() => this.number('3')}>3</div>
                    <div className='number' id='four' onClick={() => this.number('4')}>4</div>
                    <div className='number' id='five' onClick={() => this.number('5')}>5</div>
                    <div className='number' id='six' onClick={() => this.number('6')}>6</div>
                    <div className='number' id='seven' onClick={() => this.number('7')}>7</div>
                    <div className='number' id='eight' onClick={() => this.number('8')}>8</div>
                    <div className='number' id='nine' onClick={() => this.number('9')}>9</div>
                    <div className='number' id='zero' onClick={() => this.number('0')}>0</div>
                    <div className='number' id='period' onClick={() => this.number('.')}>.</div>
                    <div className='enter' onClick={this.enter}>[ENT]</div>
                    <div className='operator' id='plus' onClick={() => this.operator('+')}>+</div>
                    <div className='operator' id='minus' onClick={() => this.operator('-')}>-</div>
                    <div className='operator' id='times' onClick={() => this.operator('*')}>x</div>
                    <div className='operator' id='divide' onClick={() => this.operator('/')}>/</div>
                    <div className='clear' onClick={this.clear}>C</div>
                    <div className='delete' onClick={this.delete}>←</div>
                </div>
            </div>
        );
    }
}

export default RPN;