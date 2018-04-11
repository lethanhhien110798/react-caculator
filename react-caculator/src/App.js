import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      value: null,
      dispatchEvent: '0',
      waitingForOperand: false,
      operator: null

    }
  }
  clearDisplay() {
    this.setState({
      dispatchEvent: '0'
    })
  }
  inputDigit(digit) {
    const { dispatchEvent, waitingForOperand } = this.state

    if (waitingForOperand) {
      this.setState({
        dispatchEvent: String(digit),
        waitingForOperand: false
      })
    } else {
      this.setState({
        dispatchEvent: dispatchEvent === '0' ? String(digit) : dispatchEvent + digit
      })
    }
  }
  inputDot() {
    const { dispatchEvent, waitingForOperand } = this.state

    if (waitingForOperand) {
      this.setState({
        dispatchEvent: '.',
        waitingForOperand: false
      })
    } else
      if (dispatchEvent.indexOf('.') === -1) {
        this.setState({
          dispatchEvent: dispatchEvent + '.',
          waitingForOperand: false
        })
      }
  }
  toggleSign() {
    const { dispatchEvent } = this.state

    this.setState({
      dispatchEvent: dispatchEvent.charAt(0) === '-' ? dispatchEvent.substr(1) : '-' + dispatchEvent
    })
  }
  inputPercent() {
    const { dispatchEvent } = this.state
    const value = parseFloat(dispatchEvent)

    this.setState({
      dispatchEvent: String(value / 100)
    })
  }
  performOperation(nextOperator) {
    const { dispatchEvent, operator, value } = this.state
    const nextValue = parseFloat(dispatchEvent)
    const operations = {
      '/': (prevValue, nextValue) => prevValue / nextValue,
      '*': (prevValue, nextValue) => prevValue * nextValue,
      '%': (prevValue, nextValue) => prevValue % nextValue,
      '+': (prevValue, nextValue) => prevValue + nextValue,
      '-': (prevValue, nextValue) => prevValue - nextValue,
      '=': (prevValue, nextValue) => nextValue,
    }

    if (value == null) {
      this.setState({
        value: nextValue
      })
    } else if (operator) {
      const currentValue = value || 0
      const computedValue = operations[operator](currentValue, nextValue)

      this.setState({
        value: computedValue,
        dispatchEvent: String(computedValue)
      })
    }
    this.setState({
      waitingForOperand: true,
      operator: nextOperator

    })
  }
  render() {
    const { dispatchEvent } = this.state
    return (
      <div className="View">
        <section id="hero">
            <div className="Caculator">
              <div className="Caculator-display">
                <p className="number">{dispatchEvent}</p>
              </div>
              <div className="Caculator-keypad">
                <div className="input-keys">
                  <div className="function-keys">
                    <button className="a" onClick={() => this.clearDisplay()}>AC</button>
                    <button className="a" onClick={() => this.toggleSign()}>+/-</button>
                    <button className="a" onClick={() => this.performOperation('%')}>%</button>
                  </div>
                  <div className="digit-keys">
                    <button className="b" onClick={() => this.inputDigit(7)}>7</button>
                    <button className="b" onClick={() => this.inputDigit(8)}>8</button>
                    <button className="b" onClick={() => this.inputDigit(9)}>9</button>
                    <button className="c" onClick={() => this.inputDigit(4)}>4</button>
                    <button className="c" onClick={() => this.inputDigit(5)}>5</button>
                    <button className="c" onClick={() => this.inputDigit(6)}>6</button>
                    <button className="c" onClick={() => this.inputDigit(1)}>1</button>
                    <button className="c" onClick={() => this.inputDigit(2)}>2</button>
                    <button className="c" onClick={() => this.inputDigit(3)}>3</button>
                    <button className="c3" onClick={() => this.inputDigit(0)}>0</button>
                    <button className="c" onClick={() => this.inputDot()}>,</button>
                  </div>

                </div>
                <div className="input-keys2">
                  <button className="a2" onClick={() => this.performOperation('/')}>:</button>
                  <button className="b2" onClick={() => this.performOperation('*')}>x</button>
                  <button className="c2" onClick={() => this.performOperation('-')}>-</button>
                  <button className="c2" onClick={() => this.performOperation('+')}>+</button>
                  <button className="c2" onClick={() => this.performOperation('=')}>=</button>
                </div>
              </div>
            </div>
        </section>
      </div>
    );
  }
}

export default App;
