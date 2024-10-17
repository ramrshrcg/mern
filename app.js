   const expresss=require('express')
   const connectToDatabase = require('./data-base')
   const app=expresss()
   

   connectToDatabase()

   app.get("/", (req,res)=>
{
    //console.log(req)
    res.status(200).json({
        message:"this is a home page route by '/ "
    })
})

   app.listen(3000,()=>
    {
        console.log("npm has started")
    })

    