const express = require("express")
const router= express.Router()
const UserPost = require("../controllers/pubication.js")

router.get("/",UserPost)

module.exports=router