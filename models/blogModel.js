require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema=new Schema({
  title: {
    type: String,
    //required: true,
    unique: true,
  },
  sub_title: {
    type: String,
   // required: false,
  },
  description: {
    type: String  
    },
  image: {
    type: String,
    //required: true,
  },
//   price:{
//     type: Number,

//   },
//   pages:{
//     type:Number,
//   }
});
const Blog= mongoose.model('Blog', blogSchema);
module.exports = Blog;



