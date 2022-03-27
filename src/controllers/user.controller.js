const express=require("express");

const Users=require("../models/users.models");

const router=express.Router();

router.get("",async(req,res)=>{

    try {
        const users = await User.find().lean().exec();
    
        return res.status(200).send({users:users});
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
})

router.post("",upload.single("profilePic"),async(req,res)=>{

    try {
         //   const user = await User.create(req.body)
         const users = await Users.create({
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         profilePic: req.file.path,
      });
    
      return res.status(200).send({users:users});
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
})

router.post("/multipal",upload.any("profilePic"),async(req,res)=>{

    try {
        const filePaths = req.files.map((file) => {
          return file.path;
        });
    
        const users = await User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          profilePic: filePaths,
        });
    
        return res.status(200).send({users:users});
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
})

router.patch("./id",async(req,res)=>{
    
    try {
        const users = await Users.findByIdAndUpdate(req.params.id,req.body)
        return res.status(200).send({users:users});
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

})

router.delete("./id",async(req,res)=>{
    
    try {
        const users = await Users.findByIdAndDelete(req.params.id)
        return res.status(200).send({users:users});
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

})
module.exports=router;
