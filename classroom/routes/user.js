
const express=require("express");
const router =express.Router();


//index users

router.get("/",(req,res)=>{
    res.send("get for the users");

});

//show route
router.get("/:id",(req,res)=>{
    res.send("get for the user id");

});
//POST users
router.post("/",(req,res)=>{
    res.send("post for the users");

});
//delete users
router.delete("/:id",(req,res)=>{
    res.send("delete for the users");

});

module.exports=router;