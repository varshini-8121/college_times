const router=require("express").Router();
const User=require("../models/user");
const bcrypt=require("bcrypt");
const mongoose=require("mongoose");
//Register
router.post('/register',async(req,res)=>{
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPass= await bcrypt.hash(req.body.password,salt);
        console.log("safe be until here");

        const newUser= new User(
            {
                username:req.body.username,
                email:req.body.email,
                password:hashedPass,
            });
            // console.log(newUser.username);
            const user=await newUser.save();
            console.log("safe be until here");
            res.status(200).json(user);
        // res.send('SAVING THINGS')
        
    }catch(err)
    {
        res.status(500).json({ error: "Failed to register user." });
    }
})
// Login
router.post("/login",async (req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username});
        console.log("level 1");
       
        if(!user)
        {
            return res.status(400).json("wrong credentials")
        }
        const validated = await bcrypt.compare(req.body.password, user.password);
        
        if(!validated)
        {
            console.log("level 2");
            return res.status(400).json("wrong credentials");
        }
        console.log("level 3");
        console.log(validated);
        const { password, ...others } = user._doc;
        console.log(others);
        res.status(200).json(others);
    }
    catch(err){
        console.log('entering to error',err);
          res.status(500).json(err);
    }
});


module.exports=router;



