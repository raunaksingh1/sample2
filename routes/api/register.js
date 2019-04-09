// const express=require('express')
// const router=express.Router()
// const mongoose=require('mongoose');
// const User=require('../../models/Register')
// const bcrypt=require('bcryptjs')
// const passport=require('passport')
// const jwt=require('jsonwebtoken')

// const registerUser=require('../../validation/register')
// const loginUser=require('../../validation/login')


// // router.get('/register',(req,res)=>{
// // res.send('hello')
// // })


// router.post('/register',(req,res)=>{

//     // const {errors,isValid}=registerUser(req.body)


//     // if(!isValid) {
//     //     return res.status(400).json(errors);
//     // }

//     User.findOne({email:req.body.email})
//     .then(user=>{
//         if(user){
//             return res.status(400).json('email already exits')
//         }
//         else{
//         const user=new User({
//             name:req.body.name,
//             email:req.body.email,
//             password:req.body.password,
//         })
// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(user.password,salt,(err,hash)=>{
//         user.password=hash;
//         user.save()
//         .then(user1=>{
//             res.json(user1)
//             // .catch(err=>{console.log(err)})
//         })
//     })
// })
//         }
//     })
// })


// router.post('/login',(req,res)=>{
//     // const {errors,isValid}=loginUser(req.body)


//     // if(!isValid){
//     //     return res.status(400).json(errors)
//     // }

//     const email=req.body.email;
//     const password=req.body.password
//    User.findOne({email})
//    .then(user=>{
//        if(!user){
//            res.status(400).send(errors)
//        }
//        else{

//        bcrypt.compare(password,user.password)
// .then(isMatch=>{
// if(!isMatch){
//     const payload={
//         id:user.id,
//         name:user.name
//     }
// jwt.sign(payload,'secret',{expiresIn:3600},(err,token)=>{
// if(err){
//     res.json(err)
// }
// else{
//     res.json({success:true,
//     token:'Bearer '+token
//     })
// }
// })
// }
// else{
//     res.json('password is incorrect')
// }
// })
// .catch(err=>{console.log(err)})
//        }
     
//    })


// })


// module.exports=router





























const express = require('express');
const router = express.Router();
// const gravatar = require('gravatar');
const User=require('../../models/Register')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            // const avatar = gravatar.url(req.body.email, {
            //     s: '200',
            //     r: 'pg',
            //     d: 'mm'
            // });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                // avatar
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                }); 
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name,
                                // avatar: user.avatar
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
        });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;