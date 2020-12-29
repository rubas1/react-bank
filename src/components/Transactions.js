import React, { Component } from 'react';
import Transaction from './Transaction';
import '../style/Transactions.css'

class Transactions extends Component{
    render(){
        return(
            <div className="transactions">
                <h3 id="title">Transactions:</h3>
                <div className="transactions-container">
                    {this.props.transactions.map(t => {
                        return( 
                            <Transaction t={t} deleteTransaction={this.props.deleteTransaction} addTrans={this.props.addTrans} deleteTrans={this.props.deleteTrans}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Transactions