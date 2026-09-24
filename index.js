const express = require("express")
const { connection } = require("./database/connection.js")
const cors = require("cors")

connection()

const app = express()
const port = 4000

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Router
const UserRoutes = require("./routes/user.js")
const UserFollow = require("./routes/follow.js") 
/* const PostRouter = require("./routes/publication.js")
const UserFollow = require("./routes/follow.js") */
app.get("/", (req, res) => {
  return res.status(200).json({ message: "hola" });
});
app.use("/api/", UserRoutes)
app.use("/api/follow",UserFollow)
/* app.use("/api/post", PostRouter)
app.use("api/follow", UserFollow) */

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);

})