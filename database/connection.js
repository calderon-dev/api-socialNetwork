const mongoose = require("mongoose")
const ENV = require("env")

const  connection = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://@cluster0.bankqua.mongodb.net/Social_Net")
        console.log("conectado correctamente DB");
        
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar con la Base de dato")
    }
}

module.exports={
    connection
}