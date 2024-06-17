const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT;

router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({min:5}),
    body('password', "Incorrect Password").isLength({min:5})
], async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
        
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        });
        res.json({success:true});
    }catch (error) {
        console.log(error);
        res.json({success:false});

    }
});

router.post("/loginuser", [
    body('email').isEmail(),
    body('password', "Incorrect Password").isLength({min:5})
], async (req, res)=>{
    let email = req.body.email;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        let userData = await User.findOne({email});
        if (!userData){ 
            return res.status(400).json({errors: "Try Logging in with correct credentials"});
        }
        const pwdComapre = await bcrypt.compare(req.body.password,userData.password);
        if (!pwdComapre){ 
            return res.status(400).json({errors: "Try Logging in with correct credentials"});
        }
        const data = {
            user:{
                id:userData.id
            }
        }
        const authToken = jwt.sign(data,jwtsecret);
        return res.json({success:true, authToken:authToken});
    }catch (error) {
        console.log(error);
        res.json({success:false});
    }
});

module.exports = router;