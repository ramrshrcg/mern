const mongoose=require('mongoose')

async function connectToDatabase() {

    await mongoose.connect('')
    console.log('Database connected sucessfully')
}
module.exports=connectToDatabase

