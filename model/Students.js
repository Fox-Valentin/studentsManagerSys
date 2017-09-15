var mongoose = require("mongoose")
var studentsSchema = mongoose.Schema({
  sid: String,
  name: String,
  gender: Boolean,
  courses: [String]
})
studentsSchema.index({'sid':1})
studentsSchema.statics.findAll = function(callback){
  StudentModel.find({},function(err,result){
    if (err){
      throw err
    }
    callback(result)
  })
}
var StudentModel = mongoose.model('StudentModel',studentsSchema)
module.exports = StudentModel