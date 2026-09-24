const Follow = require("../models/followModel.js")
const mongoose = require("mongoose")

const saveFollow = (req, res) => {

    const params = req.body

    const identity = req.user

    let userToFollow = new Follow({
        user: identity.id,
        followed: params.followed
    })


    userToFollow.save((error, followedStored) => {
        if (error || followedStored) {
            return res.status(500).send({
                status: "success",
                message: "No se ha podido guardar el usuario",

            })
        }

        return res.status(200).send({

            status: "success",
            message: "desde Foolow",
            identity: req.user,
            follow: followedStored
        })
    })


}


const unFollow = (req, res) => {

    const userId = req.user.id
    const followedID = req.params.id

    Follow.find({
        "user": userId,
        "followed": followedID
    }, (error, followedStored) => {
        return res.status(200).send({
            status: "success",
            message: "desde Foolow",
            followedStored
        })
    })
}

const following = (req, res) => {

    let userID=req.user.id
    if(req.params.id)userId=req.params.id

    let page =1
    if(req.params.page)page=req.params.page

    const itemsPerPage= 5

    return res.status(200).send({
        status: "success",
        message: "Listado de Seguidores",
    })
}


const followers = (req, res) => {
    return res.status(200).send({
        status: "success",
        message: "Listado de mis seguidores",
    })
}

module.exports = {
    saveFollow,
    unFollow,
    followers,
    following,
    followed
}