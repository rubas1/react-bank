import React, { Component } from 'react';
import Transaction from './Transaction';
import '../style/Operations.css'

class Operations extends Component{
    constructor(){
        super()
        this.state = {
            userInput: {
                amount: null,
                vendor: "",
                category: ""
            }
        }
    }

    updateAmount = (event) => {
        let input = this.state.userInput
        input.amount = event.target.value
        this.setState({userInput: input})
    }
    updateVendor = (event) => {
        let input = this.state.userInput
        input.vendor = event.target.value
        this.setState({userInput: input})
    }
    updateCategory = (event) => {
        let input = this.state.userInput
        input.category = event.target.value
        this.setState({userInput: input})
    }

    withdraw = () => {
        this.props.withdraw(this.state.userInput)
    }

    deposit = () => {
        this.props.deposit(this.state.userInput)
    }

    render(){
        return(
            <div className="main-div">
                <h3 className="title">Operations:</h3>
                <div className="user-input">
                    <p>amount: </p>
                    <input id="amount" value={this.state.userInput.amount} onChange={this.updateAmount}></input>
                    <p>vendor: </p>
                    <input id="vendor" value={this.state.userInput.vendor} onChange={this.updateVendor}></input>
                    <p>category: </p>
                    <input id="category" value={this.state.userInput.category} onChange={this.updateCategory}></input>
                </div>
                <div className="operations">
                    <button id="withdraw" onClick={this.withdraw}>Withdraw</button>
                    <button id="deposit" onClick={this.deposit}>Deposit</button>
                </div>
            </div>
        )
    }
}

export default Operations