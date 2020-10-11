const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  name:{type:String,required:true,unique:true},
  isAdmin:{type:String,default:"false"},
  pass:String
})
userSchema.index({ name: 1 });

const User = mongoose.model('user',userSchema)
module.exports = User