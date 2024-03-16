const express = require('express')
const mongoose = require('mongoose')

const app = express()
// app.use(require('json'))
PORT = 8000

app.use(express.json());


//connection
mongoose.connect('mongodb://127.0.0.1:27017/hotel')
.then(()=>console.log(`Connected to MongoDB`))
.catch((err) => console.log(err));

//Schema
app.listen(PORT , ()=>console.log("running on port "+PORT))

const userSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required:true,

    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    
},{timestamps: true});

const User = mongoose.model("user",userSchema);

app.post("/add",async (req,res)=>{
    const body = req.body
    const result =  await User.create({
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        })
        console.log(result);
        return res.status(201).json({msg: "success"});
})