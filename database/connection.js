const mongoose = require("mongoose")

const  connection = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://calderonjmigueldev_db_user:Sumergido1@cluster0.bankqua.mongodb.net/Social_Net")
        console.log("conectado correctamente DB");
        
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar con la Base de dato")
    }
}

module.exports={
    connection
}