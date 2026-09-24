const mongoose = require("mongoose")
require('dotenv').config();
const uri = process.env.MONGO_URI

const  connection = async ()=>{
    try {
        await mongoose.connect(uri)
        console.log("conectado correctamente DB");
        
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar con la Base de dato")
    }
}

module.exports={
    connection
}