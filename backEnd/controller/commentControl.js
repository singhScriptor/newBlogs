const comments = require('../models/comments')


const postComment = async(req,res)=>{
    try{
        const {comment,blogId} = req.body
        const result = await comments.create({comment,blogId})
        res.json(result)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

const getcomment = async(req,res)=>{
    try{
        const result = await comments.findAll()
        res.json(result)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

const deleteComment = async(req,res)=>{
    try{
        const { id } = req.params
        const result = await comments.destroy({where:{id}})
        if(result){
            res.json(result)
        }
        else{
            res.status(404).json({message:'not found!'})
        }
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

module.exports ={
    postComment,
    getcomment,
    deleteComment
}