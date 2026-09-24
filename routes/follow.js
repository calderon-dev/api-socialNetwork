const express = require("express")
const router= express.Router()
const FollowController = require("../controllers/follow.js")
const {auth}=require("../middlewares/auth.js")


router.post("/save", FollowController.saveFollow)
router.delete("/unfollow/:id", FollowController.saveFollow)
router.delete("/unfollow/:id", FollowController.saveFollow)
router.get("/following/:id", FollowController.following)

module.exports=router