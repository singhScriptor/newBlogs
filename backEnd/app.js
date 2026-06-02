const express = require('express')
const db = require('./utils/db-connection')
const cors = require('cors')
const port= 3000

const app = express()

app.get('/',(req,res)=>{
    res.send('server is working!')
})



db.sync({alter:true})
.then(()=>{
    app.listen(port,()=>{
        console.log('server is listening...!')
    })
})
.catch((err)=>{
    console.log(err.message)
})

