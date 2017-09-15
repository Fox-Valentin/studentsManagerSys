var mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/haha")
var db = mongoose.connection
db.once("openUri",function(callback){
  console.log('数据库已开')
})
module.exports = db