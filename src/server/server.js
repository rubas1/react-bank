const mongoose = require('mongoose')
const express = require('express')
const urllib = require('urllib')
const app = express()
const port = 3001
const Transactions = require('./models/transactionSchema')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

mongoose.connect('mongodb://localhost/transactionsDB', { useNewUrlParser: true })

// ROUTES

app.post('/transaction', function(request, response){
    let input = request.body
    let newTrans = new Transactions({amount: input.amount, category: input.category, vendor: input.vendor})
    newTrans.save()
    response.send("saved successfuly")
})

app.put('/transaction/:_id', function(request, response){
    let id = request.params._id
    console.log("id is: " + id)
    Transactions.find({_id: id}, function(err, data){
       if(data != undefined){
        data[0].remove(function (err){
            if(err === null){
                response.send("removed")
            }else{
                console.log("removing failed - " + err)
                response.send("failed to remove")
            }
        })
       }else{
           console.log("remove failed: " + err)
       }
    })
})

app.get('/transactions', function(request, response){
    Transactions.find({}, function(err, data){
        response.send(data)
    })
})

app.listen(port, function(){
    console.log(`Running server on port ${port}`)
})