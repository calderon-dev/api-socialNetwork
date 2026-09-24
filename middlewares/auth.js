const jwt = require("jwt-simple")
const moment = require("moment")
const servicesJWT = require("../services/jwt.js")

exports.auth = (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(403).send({
            status:"error",
            message:"La Peticion  no tiene la cabecera de autorización"
        })
    }

    let CLjwt= req.headers.authorization.replace(/['"]+/g,'')

    try {
        const payload = jwt.decode(CLjwt,servicesJWT.secret)

        if(payload.exp<= moment().unix()){
            return res.status(401).send({
            status:"error",
            message:"Token Expirado",
            error
        })}
        
    req.user=payload

    } catch (error) {
        return res.status(404).send({
            status:"error",
            message:"Token Invalido",
            error
        })
    }

    next()

}