const blogs = require('../models/blogs')

const postBlog = async(req,res)=>{
    try{
        const { title,author,blog } = req.body
        const result = await blogs.create({ title,author,blog })
        res.json(result)
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

const getBlog = async(req,res)=>{
    try{
        const result = await postBlog.findhAll()
        res.json(result)

    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

module.exports ={
    postBlog,
    getBlog
}