const mongoose = require("mongoose")
const Schema = mongoose.Schema

const eventSchema = new Schema({
  StartTime:String,
  EndTime:String,
  time:String,
  Subject:String,
  owner:{type:Schema.Types.ObjectId,ref:'user'}
})

const Event = mongoose.model('event',eventSchema)
module.exports = Event