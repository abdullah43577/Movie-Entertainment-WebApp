const express = require ("express");
const authR = require("./routes/authRoute")
const saveR = require("./routes/saveRoute")
const adminR = require("./routes/adminRoute")
require("dotenv").config()
const port  = process.env.PORT || 7070
const app = express()
const cors = require("cors")

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "UPDATE", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: "X-Requested-With,content-type"
}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use("/auth", authR)
app.use("/bookmark", saveR)
app.use("/admin", adminR)


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})
