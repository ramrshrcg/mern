require("dotenv").config();


const expresss = require("express");
const cors= require("cors");




const connectToDatabase = require("./data-base");
const Blog = require("./models/blogModel");
const { storage, multer } = require("./middleware/multerconfig");
const app = expresss();


app.use(expresss.json());
const fs = require("fs");
const { error } = require("console");
app.use(expresss.static("./storage"));
app.use(cors());

const upload = multer({ storage: storage });

connectToDatabase();

app.get("/", (req, res) => {
  //console.log(req)
  res.status(200).json({
    message: "this is a home page route by '/ ",
  });
});
app.post("/blog", upload.single("image"), async (req, res) => {
  const { title, sub_title, description } = req.body;
  const image = req.file.filename;

  if (!title || !description || !sub_title) {
    return res.status(400).json({
      message: "Please fill in all fields.",
    });
  }
  //console.log(req.body)
  //console.log(image)
  await Blog.create({
    title: title,
    sub_title: sub_title,
    description: description,
    image: image,
  });

  res.status(200).json({
    message: "hitted ",
  });
});
app.get("/blog", async (req, res) => {
  // sabbai magney
  //take data from database
  await Blog.find().then((data) => {
    res.status(200).json({
      message: "sucessful",
      data,
    });
  });
});
app.get("/blog/:id", async (req, res) => {
  // console.log(req.params.id)
  const id = req.params.id;
  const Blogdata = await Blog.findById(id);
  if (!Blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  res.status(200).json({
    message: "Blog found",
    data: Blogdata,
  });
});

//delete a certain id data
//require(fs)
app.delete("/blog/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);
  const imageName = blog.image;
  await Blog.findByIdAndDelete(id);
  // delete related file also
  fs.unlink(`storage/${imageName}`, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("file deleted");
    }
  });

  res.status(200).json({
    message: "Blog deleted",
  });
});

app.patch("/blog/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  const { updatedtitle, sub_title,description} = req.body;
  let updatedimageName;
  const newimage= req.file.filename
  
  if (newimage) {
    
    
    const blog = await Blog.findById(id);
    const oldimageName = blog.image;
    fs.unlink(`storage/${oldimageName}`, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("old image removed ");
      }
    });
    updatedimageName= newimage
  }
  //updatedimageName = req.file.filename;
  

  await Blog.findByIdAndUpdate(id, {
    title:updatedtitle,
    sub_title: sub_title,
    description: description,
    image: updatedimageName,
  });
  console.log(updatedimageName)

  res.status(200).json({
    message: "Blog updated",
  });
});

app.listen(process.env.PORT, () => {
  console.log("npm has started");
});
