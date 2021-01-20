const  mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("数据库连接成功")
});


const userSchema = mongoose.Schema({
    username:{type:String , required:true},
    password:{type:String , required:true},
    type:{type:String , required:true},
    header:{type:String },
    info:{type:String },
    company:{type:String },
    salary:{type:String },
})

const UserModel = mongoose.model("user",userSchema)


exports.UserModel = UserModel