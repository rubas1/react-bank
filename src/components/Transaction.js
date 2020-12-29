import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

class Transaction extends Component{
    deleteTransaction =() => {
        this.props.deleteTransaction(this.props.t)
    }
    
    render(){
        return(
            <div className="transaction">
                <span id="amount"> Amount: {this.props.t.amount} </span><br></br>
                <span id="vendor"> Vendor: {this.props.t.vendor} </span><br></br>
                <span id="category"> Category: {this.props.t.category} </span><br></br>
                <button id="delete" onClick={this.deleteTransaction}>Delete Transaction</button>
            </div>
        )
    }
}

export default Transaction