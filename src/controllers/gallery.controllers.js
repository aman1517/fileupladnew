const express=require("express");
const upload=require("../middelewares/upload")

const Gallery=require("../models/gallery");

const router=express.Router();

router.get("",async(req,res)=>{

    try {
        const gallery = await Gallery.find().lean().exec();
    
        return res.status(200).send({gallery:gallery});
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
})

router.post("",upload.single("userPic"),async(req,res)=>{

    try {
         //   const user = await User.create(req.body)
         const gallery = await Gallery.create({
            userPic: req.file.path,
            usersId: req.body.usersId,
      });
    
      return res.status(200).send({gallery:gallery});
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
})

router.post("/multipal",upload.any("userPic"),async(req,res)=>{

    try {
        const filePaths = req.files.map((file) => {
          return file.path;
        });
    
        const gallery = await Gallery.create({
            userPic: req.file.path,
            usersId: req.body.usersId,
        });
    
        return res.status(200).send({gallery:gallery});
      } catch (err) {
        return res.status(500).send({ message: err.message });
      }
})
router.patch("./id",async(req,res)=>{
    
    try {
        const gallery = await Gallery.findByIdAndUpdate(req.params.id,req.body)
        return res.status(200).send({gallery:gallery});
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

})

router.delete("./id",async(req,res)=>{
    
    try {
        const gallery = await Gallery.findByIdAndDelete(req.params.id)
        return res.status(200).send({gallery:gallery});
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

})
module.exports=router;
