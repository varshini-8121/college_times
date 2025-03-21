const router = require("express").Router();
const User = require("../models/user");
const Post = require("../models/Post");

//create post 
router.post("/",async(req,res)=>{
    console.log("upload ki occhinam")
    const newPost= new Post(req.body);
    console.log(req.body.title);
    try{
      console.log("upload 1");
        const savedPost= await newPost.save();
      console.log("upload 2");
         res.status(200).json(savedPost);
    }catch(err)
    {
      
      console.log(err);
        res.status(500).json(err);

    }
});

//update Post
router.put('/:id',async (req,res)=>{
  console.log("UPDATE IS CALLED");
    try{
    const post=await Post.findById(req.params.id);
    console.log("username level 1 ");
        try{
          const updatedPost= await Post.findByIdAndUpdate(req.params.id,
            {
             $set: req.body,
          },{new : true});
          console.log("all fine");
          res.status(200).json(updatedPost);
        }catch(err){
    console.log("username level 2");

            res.status(500).json(err);
        }
   }
   catch(err){
    console.log("username level 3");

        res.status(500).json(err);
   }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log("delete is being  called");
     await Post.deleteOne({_id:req.params.id})
    // const post = await Post.findById(req.params.id).then(async(post)=>{

    //  console.log(post.username);
    //     try {
    //       console.log("deletion almost");
    //       await post.delete();
    //       res.status(200).json("Post has been deleted...");
    //     } catch (err) {
    //       console.log("deletion error1 ");
    //       res.status(500).json(err);
    //     }
    // })
    console.log("DELETION IS SAFE");
    res.status(200).json("Post has been deleted...");

  } catch (err) {
    console.log("deletion error2 ");

    res.status(500).json(err);
  }
});

  //GET POST
router.get("/:id", async (req, res) => {
    try {
      
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      console.log("hii")
      res.status(500).json(err);
    }
  });

  //GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    console.log("get all aithundi")
    try {
      let posts;
      if (username) {
        posts = await Post.find({ username });
      } else if (catName) {
        posts = await Post.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        posts = await Post.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;


