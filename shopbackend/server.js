const PORT = 4000;
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const multer = require('multer')
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); 
const { error, log } = require('console');


app.use(express.json());
app.use(cors()) 

//database connect with mongodb


// mongoose.connect('mongodb+srv://shopAnsari:merashop@cluster0.uenasnl.mongodb.net/e-commerce');
mongoose.connect(process.env.DATABASE_URL)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


//api creation

app.get( '/',(req, res)=>{
  res.send('Express is running')
})

//image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
}) 

const upload = multer({storage:storage})
// static
app.use('/images', express.static('upload/images'))

//creating upload endpoint for image
app.post("/upload", upload.single('product'), (req, res)=>{
  const baseURL = process.env.BASE_URL || `${req.protocol}://${req.get('host')}`;
 res.json({
    success: 1,
    image_url: `${baseURL}/images/${req.file.filename}`
 })
})

//Schema For Creating Product
 const Product = mongoose.model("Product",{
    id:{type:Number, required:true},
    name:{type:String, required:true},
    image:{type:String, required:true},
    category:{type:String, required:true},
    new_price:{type:Number, required:true},
    old_price:{type:Number, required:true},
    date:{type:Date, default:Date.now},
    awailable:{type:Boolean, default:true},
 })

 // for add post
 app.post('/addproduct', async(req, res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
     let last_product_array = products.slice(-1);
     let last_product = last_product_array[0];
     id = last_product.id+1;
    }else{
        id=1;
    }

    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    // res.json({
    //     success:true,
    //     name:req.body.name,
    // })
    res.json({success:true, message: "added" });

 })

 // create API for deleting products
 app.post('/deleteproduct', async(req, res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Rermoved");
    // res.json({
    //     success:true,
    //     name:req.body.name,
    // })
    res.json({success:true, message: "added" });
 })

 //creating API for gettting all products
 app.get('/allproducts', async(req, res)=>{
    let products = await Product.find({});
     console.log("all products fetched");
     res.send(products);
 })

 // schema creating user model
  const Users = mongoose.model('Users',{
    name:{type:String},
    email:{type:String , unique:true},
    password:{type:String},
    cartData:{type:Object},
     date:{type:Date, default:Date.now}
  })

  // creating endpoint for registering user
   app.post('/signup', async(req, res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user with same email id."})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
        }
        const user = new Users({
            name:req.body.username,
            email:req.body.email,
            password:req.body.password,
            cartData:cart,
        })
        await user.save();
        const data = {
            user:{
              id:  user.id
            }
        }
        const token = jwt.sign(data, 'secret_ecom');
        res.json({success:true, token})
        
   })

   // creating end point for user login
   app.post('/login', async(req, res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
       const passCompared = req.body.password === user.password;
      if(passCompared){
        const data = {
            user:{
              id:  user.id
            }
        }
        const token = jwt.sign(data, 'secret_ecom');
        res.json({success:true, token})
      }else{
        res.json({success:false, errors:"wrong password"})
      }}
      else{
        res.json({success:false, errors:"wrong email id"})
      }
       
        })

        //creating endpoint for new collection data
        app.get('/newCollection', async(req, res)=>{
          let products = await Product.find({});
          let newcollection = products.slice(1).slice(-8);
          console.log('newcollection fetched');
          res.send(newcollection);
        })

         //creating endpoint for popular in women data
         app.get('/popularinwomen', async(req, res)=>{
          let products = await Product.find({category:"women"});
          let popular_in_women = products.slice(0, 4);
          console.log('popular in women fetched');
          res.send(popular_in_women);
        })

        //creating middleware to fetch user
         const fetchUser = async (req, res, next)=>{
              const token = req.header('auth-token');
              if(!token){
                res.status(401).send({errors:"pls authenticate using valid token"});
              }else{
                try {
                  const data = jwt.verify(token, 'secret_ecom');
                  req.user = data.user;
                  next();
                } catch (error) {
                  res.status(401).send({errors:"pls authenticate using valid token"});
                }
              }
         }
         

          //creating endpoint for add product  in cart data
          app.post('/addtocart', fetchUser,  async(req, res)=>{
            console.log("Added",req.body.itemId);
            let userData = await Users.findOne({_id:req.user.id});
            userData.cartData[req.body.itemId] += 1;
            await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData})
            res.send("added")
          })
         
      // creating endpoint to remove product from cart data
      app.post('/removefromcart', fetchUser, async (req, res)=>{
        console.log("Removed",req.body.itemId);
        let userData = await Users.findOne({_id:req.user.id});
        if( userData.cartData[req.body.itemId]>0)
        userData.cartData[req.body.itemId] -= 1;
        await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData})
        res.send("removed")
      })

      //creating endpoint to get cart data 
      app.post('/getcart',fetchUser, async(req, res)=>{
        console.log("get cart");
        let userData = await Users.findOne({_id:req.user.id});
        res.json(userData.cartData);
      })

app.listen(PORT,(error)=>{
    if(!error){
        console.log("Server App running on post:" + PORT)
    }else{
        console.log("Error" + error)
    }
})
