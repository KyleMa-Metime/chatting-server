const express = require('express');
const router = express.Router();
const { UserModel } = require('../db/models');
const md5 = require('blueimp-md5')
const fillter = {password: 0, __v: 0}



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express111' });
});



router.post("/register",function(req, res) {
  

    const { username, password, type }  = req.body;
 
    UserModel.findOne({ username },function(err, user){
  
        if(user){
            res.send({ code:1, msg:'此用户已存在' })
        }else {
        const userModel= new UserModel({ username, type, password:md5(password)})
        userModel.save(function(err, user) {
                res.cookie("userid", user._id, { maxAge:1000*60*60*24 })
                const data = { username, type, _id:user._id }
                res.send({ code:0, data })

            })
        }
    })
})

router.post("/login", function(req,res){
    const { username , password} = req.body;

    UserModel.findOne({username,password:md5(password)},fillter,function(err,user){

        if(user){
            res.cookie("userid", user._id, { maxAge:1000*60*60*24 })
            res.send({code: 0, msg: user})

        }else {
            res.send({ code: 1 , msg: "用户名或密码不正确"})
        }
    })


})

module.exports = router;
