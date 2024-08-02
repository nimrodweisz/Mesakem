const jwt = require('jsonwebtoken')
const { User } = require('../models/users')
const mongoose = require('mongoose');

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt

    console.log(token)
    if(token){
        jwt.verify(token,"my_secret",(err,decodedToken) => {
            if(err){
                console.log(err.message)
                res.status(401).send('cookieinvalid')
            }
          
            else{
                console.log(decodedToken.id)
                 console.log(decodedToken)
                next()
            }
        })
    }
    else{
        res.status(401).send('nocookie')
    }
}
module.exports = {requireAuth}
