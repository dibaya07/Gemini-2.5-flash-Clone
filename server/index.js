const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 3000 
const connectDB= require("./config/connectDB.js")
const cookieParser = require('cookie-parser')

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({}));

// app.use(
//   cors({
//     origin: (process.env.CLIENTSIDE_URL),
//     credentials: true,
//   })
// );
app.use(cookieParser());


app.use("/user", require("./route/user.js"))
app.use("/chat", require("./route/chatRoute.js"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})