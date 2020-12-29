import React, { Component } from 'react';
import Transactions from './components/Transactions';
import Operations from './components/Operations';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      transactions: [],
      balance: 0,
    }
  }

  async getTransactions() {
    return axios.get("http://localhost:3001/transactions")
  }

  async deleteTrans(id) {
    let res = await axios.put('http://localhost:3001/transaction/'+ id)
    return (res)
  }

  async addTrans(userInput) {
    let res= await axios.post('http://localhost:3001/transaction',  {amount: userInput.amount, category: userInput.category, vendor: userInput.vendor})
    return res
  }

  async componentDidMount() {
    let response = await this.getTransactions()
    let arr = response.data
    let newBalance = 0
    for(let t of arr){
      newBalance += t.amount
    }
    this.setState({balance: newBalance})
    this.setState({transactions: arr})
  }

  deleteTransaction = (tran) => {
    if(tran._id != undefined){
      this.deleteTrans(tran._id)
    }
    let arr = [...this.state.transactions]
    let balance = 0
    for(let t of arr){
      if(t === tran){
        arr.pop(t)
      }else{
        balance += t.amount
      }
    }
    this.setState({balance: balance})
    this.setState({transactions: arr})
  }

  addTransaction = (userInput) => {
    this.addTrans(userInput)
    let arr = [...this.state.transactions]
    let oldBalance = this.state.balance
    let newTrans = {
      amount: userInput.amount,
      category: userInput.category,
      vendor: userInput.vendor
    }
    arr.push(newTrans)
    this.setState({transactions: arr})
    this.setState({balance: (oldBalance + userInput.amount)})
  }

  withdraw = (userInput) => {
    userInput.amount = (0 - userInput.amount)
    this.addTransaction(userInput)
  }

  deposit = (userInput) => {
    this.addTransaction(userInput)
  }

  render(){

    return (
      <div className ="main-app">
        <h3 className="balance">Current Balance Is : {this.state.balance}</h3>
        <Transactions transactions={this.state.transactions} deleteTransaction={this.deleteTransaction} />
        <div className="operations-div">
          <Operations withdraw={this.withdraw} deposit={this.deposit}/>
        </div>
      </div>
    )
  }
}

export default App;
