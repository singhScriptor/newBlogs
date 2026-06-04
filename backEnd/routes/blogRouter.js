const express = require('express')
const router = express.Router()

const blogControl = require('../controller/blogsControl')

router.post('/',blogControl.postBlog)
router.get('/',blogControl.getBlog)

module.exports = router