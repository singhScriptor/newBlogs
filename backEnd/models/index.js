const blogs = require('./blogs')
const comments = require('./comments')

blogs.hasMany(comments, { foreignKey: 'blogId' })
comments.belongsTo(blogs, { foreignKey: 'blogId' })


module.exports={
    blogs,
    comments
}
