const bcrypt = require("bcrypt")
const User = require("../models/userModels.js")
const jwt = require("../services/jwt.js")
const fs = require("fs")


//Register

const RegisterUser = async (req, res) => {
  try {
    let params = req.body;

    // Validación inicial
    if (!params.name || !params.email || !params.nick || !params.password) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos por enviar",
      });
    }

    // Normalizar email y nick
    params.email = params.email.toLowerCase();
    params.nick = params.nick.toLowerCase();

    // Validación duplicados
    const existingUser = await User.findOne({
      $or: [{ email: params.email }, { nick: params.nick }],
    });

    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message:
          existingUser.email === params.email
            ? "El email ya está registrado"
            : "El nick ya está registrado",
      });
    }

    // Hashear contraseña
    const hashPW = await bcrypt.hash(params.password, 10);
    params.password = hashPW;

    // Guardar usuario
    const userSave = new User(params);
    const userStored = await userSave.save();

    console.log("Guardado en DB:", userStored);

    return res.status(201).json({
      status: "success",
      message: "Usuario registrado",
      user: userStored,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error en el servidor de usuario",
      error: error.message,
    });
  }



  //validation duplication
  /*  User.find({
       $or: [
           { email: userSave.email.toLowerCase() },
           { nick: userSave.nick.toLowerCase() }
       ]
   }).exec((error, users) => {
       if (error)  return res.status(500).json({ status: "error", message: "Error en el Servidor de usuario" }) 
       if (users && users.lenght >= 1) {
           return res.status(200).send({
               status: "success",
               message: "El usuario ya existe"
           })
       } else {
 
           return res.status(200).json({
               message: "Accion  de Registo de usuarios",
               userSave
           })
       }
   })
*/
}


const login = async (req, res) => {
  let params = req.body;

  if (!params.email || !params.password) {
    return res.status(400).send({
      status: "error",
      message: "Falta información"
    })
  }

  let search_user = await User.findOne({ email: params.email })
    .select({ "password": 0 })
    .exec()

  if (!search_user) {
    return res.status(404).send({
      status: "error",
      message: "El usuario no existe"
    })
  }

  const token = jwt.createToken(search_user)

  return res.status(200).json({
    status: "success",
    message: "Acceso concedido",
    search_user: {
      id: search_user._id,
      name: search_user.name,
      nick: search_user.nick
    },
    token
  })
}

const getProfile = async (req, res) => {
  const id = req.params.id

  let userProfile = await User.findById(id)
    .select({ password: 0, role: 0 })
    .exec()

  if (!userProfile) {
    return res.status(404).send({
      status: "error",
      message: "El usuario no existe o hay un error"
    })
  }

  return res.status(200).send({
    status: "success",
    user: userProfile
  })
}

const list = async (req, res) => {

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const options = {
      page,
      limit,
      sort: { _id: 1 },
      select: "-password -role"
    };

    const result = await User.paginate({}, options)


    return res.status(200).send({
      status: "success",
      users: result.docs,
      page: result.page,
      itemsPerPage: result.limit,
      total: result.totalDocs,
      totalPages: result.totalPages
    })
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error en la consulta",
      error: error.message
    });
  }
}

const update = async (req, res) => {

  let userIdentity = req.body
  let userToUpdate = req.user

  delete userToUpdate.iat;
  delete userToUpdate.exp;
  delete userToUpdate.role;
  delete userToUpdate.image

  let search_user = await User.findOne({ email: userIdentity.email })
    .select({ "password": 0 })
    .exec()

  if (!search_user) {
    return res.status(404).send({
      status: "error",
      message: "El usuario no existe"
    })
  }


  User.findByIdAndUpdate(userIdentity._id, userToUpdate, { new: true }, (error, userUpdated) => {
    return res.status(200).send({
      status: "success",
      message: "Metodo actualizar",
      userUpdated
    })
  })


  if (userIdentity.password) {
    const hashPW = await bcrypt.hash(userIdentity.password, 10);
    userIdentity.password = hashPW;
  }

}

const uploadImg = async (req, res) => {

  if (!req.file) {
    return res.status(404).send({
      status: "error",
      message: "No se incluye imagen"
    })
  }

  let image = req.file.originalname;
  let imagesplit = image.split("/.")
  let extension = imagesplit[1]

  if (extension !== "png" && extension !== "jpg") {

    const file_path = req.files.path;
    const file_deleted = fs.unlinkSync(file_path)
    return res.status(400).send({
      status:"error",
      message:"Archivo no permitido"
    })
  }

  return res.status(200).send({
    status: "success",
    message: "Metodo Subir",
    user: req.user,
    file: req.file,
    image
  })
}

const avatar = (req, res) => {
  const file = req.params.file;
  const file_path = path.resolve("./uploads/avatars/" + file);

  fs.stat(file_path, (err, stats) => {
    if (err || !stats) {
      return res.status(404).json({
        status: "error",
        message: "No se encuentra la imagen"
      });
    }

    // Si existe, enviamos el archivo
    return res.sendFile(file_path);
  });
};

module.exports = {
  RegisterUser,
  login,
  getProfile,
  list,
  update,
  uploadImg,
  avatar
}