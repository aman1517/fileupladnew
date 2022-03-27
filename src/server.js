const app=require("./index");

const connect=require("./configs/db");
app.listen(5500,async ()=>{
   try {
    await connect();
  
   } catch (err) {
    console.error(err.message);
   }
   console.log("listining on 5500"); 
})