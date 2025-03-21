const express=require("express");
const app=express();
const dotenv=require("dotenv");
dotenv.config();
app.use(express.json());
const mongoose=require("mongoose");
const authRoute=require("./routes/auth");
const userRoute=require("./routes/user");
const postRoute = require("./routes/post");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
app.use("/images", express.static(path.join(__dirname, "/images")));
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        // useCreateIndex:true
        // useFindAndModify:false
    }).then(console.log("connected to mongo")).catch((err)=>console.log(err));


// app.use("/",(req,res)=>{
//   console.log("hii")
// })
app.get("/",(req,res)=>{
    console.log('running fine h');
    res.send('SAFE EE CHOW')
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  console.log(req.body.filename);
  res.status(200).json("File has been uploaded");
});


app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/post", postRoute);
app.use("/api/categories", categoryRoute);
app.listen("5000",()=>{
    console.log("backend is running....");
});
