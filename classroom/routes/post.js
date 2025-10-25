const express=require("express");
const router =express.Router();

//posts

router.get("/",(req,res)=>{
    res.send("get for the post ");

});

//show route
router.get("/:id",(req,res)=>{
    res.send("get for the post id");

});
//POST users
router.post("/",(req,res)=>{
    res.send("post for the posts");

});
//delete users
router.delete("/:id",(req,res)=>{
    res.send("delete for the postss");

});
module.exports=router;