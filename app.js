
const express = require("express")
const http = require('http')
const socketIo = require("socket.io")
const path = require("path")

const app = express()

const server = http.createServer(app)

const io = socketIo(server)

app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, "public")));


io.on("connection", (socket) => {
    console.log("Connected")


    socket.on("send-location", (data) => {

        io.emit("recieve-location", { id: socket.id, ...data })

    })

    socket.on("disconnect", () => {
        io.emit("user-disconnected", socket.id)
    })

})

app.get("/", (req, res) => {

    res.render("index")
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`> Express app running at ${PORT}`)
})
