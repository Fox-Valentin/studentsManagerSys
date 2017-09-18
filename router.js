var CourseModel = require("./model/Course.js")
var StudentModel = require("./model/Students.js")
exports.showIndex = showIndex
exports.showCourses = showCourses
exports.showAdd = showAdd
exports.doAdd = doAdd
function showIndex (req,res){
  StudentModel.findAll((result) => {
    var a = {}
    CourseModel.findNameByCid(result[0].courses[0]).then(function(err,data){
      console.log(data)
      a = data
      res.send(a)
    })
  })
}

function showCourses (req,res){
  CourseModel.findAll((result) => {
    var name = CourseModel.findNameByCid(result[0].courses[0])
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