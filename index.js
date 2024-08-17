const express=require('express');
const path=require('path');
const mongoose=require("mongoose");

const User=require("./user.js");

const app=express();



mongoose.connect("mongodb+srv://aminfitati123:borhen22@nodejs.qkgle4y.mongodb.net/?retryWrites=true&w=majority&appName=Nodejs")
.then(()=>{
    console.log("connected succeffuly"); 
})
.catch((error)=>{
    console.log("error with connection",error);
})





app.use(express.urlencoded({ extended: true }));

app.use(express.json());


app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});
app.get('/login.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.css'));
});
app.get('/wordle.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, 'wordle.jpg'));
});
app.use(express.static(path.join(__dirname, 'public')));



app.post('/wordle',async(req,res)=>{
    email= req.body.email;
    password= req.body.password;
    user_exist=await User.findOne({email:email});
    if (user_exist){
        if(user_exist.password!=password){
            res.send("email or password incorrect");
        }
        else{
            return res.sendFile(path.join(__dirname, 'public', 'wordle.html'));
        }
    }else{
        const user=new User();
        user.email=req.body.email;
        user.password=req.body.password;
        await user.save();
        return res.sendFile(path.join(__dirname, 'public', 'wordle.html'));
    }

})

app.listen(3000,()=>{
    console.log('im listenning to port 3000');
})