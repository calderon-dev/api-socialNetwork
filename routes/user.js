const express = require("express")
const router = express.Router()
const multer = require("multer")
const UserController = require("../controllers/user")
const { auth } = require("../middlewares/auth")

//config Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/avatars")
    },
    filename: (req, file, cb) => {
        cb(null, "avatar" + Date.now() + "-" + file.originalname);
    }
})


const uploads = multer({ storage })

router.post("/register", UserController.RegisterUser)
router.post("/login", UserController.login)
router.get("/profile/:id", auth, UserController.getProfile)
router.get("/list", auth, UserController.list)
router.put("/update", auth, UserController.update)
router.post("/upload", [auth, uploads.single("file0")], UserController.uploadImg)
router.get("/avatar/:file",auth,UserController.avatar)

module.exports = router