
const md5 = require("blueimp-md5")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("数据库连接成功")
});

const userSchema = mongoose.Schema({
    username:{type:String , require:true},
    password:{type:String , require:true},
    gender:{type:String , require:true},
    avatar:{type:String}
})

const UserModel = mongoose.model("user",userSchema)

function testSave(){
    const userModel = new UserModel({username:'dundun',password:md5('123'),gender:'male'})
    userModel.save(function(err,doc){
        console.log('打印看看',err,doc)
    })
}

// testSave()
function testFind(){
    //返回全部，数组类型
    UserModel.find(function(err,users){
        console.log('find',err,users)
    })
    //条件查询，对象类型
    UserModel.findOne({_id:'60017266b35ed63e3c003063'},function(err,user){
        console.log('findOne',err,user)

    })
}

// testFind()

function testUpdate(){
    UserModel.findByIdAndUpdate({_id:'60017266b35ed63e3c003063'},{username:'hahaha'},function(err,oldUser){
        console.log('findByIdAndUpdate',err,oldUser)
    })
}
// testUpdate()

function testDelete(){
    // UserModel.findByIdAndRemove
    UserModel.findByIdAndDelete({_id:'60017266b35ed63e3c003063'},function(err,deleteUser){
        console.log('findByIdAndDelete',err,deleteUser)
    })
}

testDelete()