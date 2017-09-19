var mongoose = require("mongoose")

var courseSchema = mongoose.Schema({
  cid: String,
  name: String,
  students: [String]
})
courseSchema.index({'cid':1})
courseSchema.statics.findAll = function(callback){
    CourseModel.find({},function(err,result){
    if(err){
      throw err
    }
    callback(result)
  })
}
courseSchema.statics.findNameByCid = function(cid,callback){
  return this.find({cid:cid},callback)
}
var CourseModel = mongoose.model('CourseModel',courseSchema)
module.exports =  CourseModel