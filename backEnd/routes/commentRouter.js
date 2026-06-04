const express = require('express')
const router = express.Router()

const commentControl =  require('../controller/commentControl')


router.post('/',commentControl.postComment)
router.get('/',commentControl.getcomment)
router.delete('/:id',commentControl.deleteComment)

module.exports = router