const isUserAuthenticated = require("../Middlewares/Auth");

const router = require("express").Router()

router.get("/product" ,isUserAuthenticated, (req,res)=>{
    console.log("---Logged in User---", req.user);
    
    return res.status(200).json([
        {
            "name":"Mobile",
            "price":"10000"
        },
        {
            "name":"tv",
            "price":"20000"
        },
    ])
})

module.exports = router;