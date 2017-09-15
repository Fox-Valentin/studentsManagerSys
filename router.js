var CourseModel = require("./model/Course.js")
var StudentModel = require("./model/Students.js")
exports.showIndex = showIndex
exports.showCourses = showCourses
exports.showAdd = showAdd
exports.doAdd = doAdd
function showIndex (req,res){
  StudentModel.findAll((result) => {
    result.courses.each((item) => {
      console.log(item)
    })
      // CourseModel.find({cid:item},function(err,result){
      //   if (err) {
      //     throw
      //   }
      //   console.log(result)
      // })
    res.render("index",{students:result})
  })
}

function showCourses (req,res){
  CourseModel.findAll((result) => {
    res.send(result)
  })
}

function showAdd (req,res) {
  CourseModel.findAll((result) => {
    res.render("add", {courses: result})
  })
}

function doAdd (req,res) {
  var queryParams = {
    sid:req.query.sid
  }
  StudentModel.findOne(queryParams,function(err,result){
    if (err){
      throw err
    }
    if (!result){
      StudentModel.create(req.query,function(err,result){
        if (err) {
          throw err
        }
        res.send(result)
      })
    } else {
      res.send("用户已存在")
    }
  })
}