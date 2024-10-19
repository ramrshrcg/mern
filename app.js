require("dotenv").config();
const expresss = require("express");
const connectToDatabase = require("./data-base");
const Blog = require("./models/blogModel");
const { storage,multer } = require("./middleware/multerconfig");
const app = expresss();
app.use(expresss.json());

const upload= multer({storage: storage})

connectToDatabase();

app.get("/", (req, res) => {
  //console.log(req)
  res.status(200).json({
    message: "this is a home page route by '/ ",
  });
});
app.post("/blog",upload.single('image'), async (req, res) => {
  const { title,  sub_title, description } = req.body;
  const filename = req.file.filename

  if (!title || !description || !sub_title ) {
    return res.status(400).json({
      message: "Please fill in all fields.",
    });
  }
 //console.log(req.body)
 //console.log(filename)
  await Blog.create({
    title: title,
    sub_title: sub_title,
    description: description,
    image: filename
  });

  res.status(200).json({
    message: "hitted ",
  });
});
app.get("/blog", async(req,res)=>
{
  //take data from database 
  await  Blog.find().then((data)=>
    {
      res.status(200).json({message: "sucessdul",
        data})
      })

})

app.listen(process.env.PORT, () => {
  console.log("npm has started");
});
