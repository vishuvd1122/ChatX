const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app= express();
require("dotenv").config();
const PORT = process.env.PORT || 8080
require("./Modals/db")

const AuthRouter=  require("./Routes/AuthRouter")
const ProductRouter =require("./Routes/ProductRouter")


// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.get("/test", (req, res) => {
    res.send("TEST ROUTE - Server is working!")
})

app.use("/auth", AuthRouter);
app.use("/", ProductRouter)


app.listen(PORT ,()=>{
    console.log(`App is listening to PORT ${PORT}`);
    
})