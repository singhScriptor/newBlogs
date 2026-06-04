const express = require('express')
const db = require('./utils/db-connection')
const cors = require('cors')
const port= 3000

const app = express()

app.use(express.json())
app.use(cors())

const blogRoutes = require('./routes/blogRouter')
const commentRoutes = require('./routes/commentRouter')

app.get('/',(req,res)=>{
    res.send('server is working!')
})

app.use("/blogs",blogRoutes)
app.use("/blogs/:blogId/comments",commentRoutes)



db.sync({alter:true})
.then(()=>{
    app.listen(port,()=>{
        console.log('server is listening...!')
    })
})
.catch((err)=>{
    console.log(err.message)
})

