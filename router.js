var CourseModel = require("./model/Course.js")
var StudentModel = require("./model/Students.js")
exports.showIndex = showIndex
exports.showCourses = showCourses
exports.showAdd = showAdd
exports.doAdd = doAdd
function showIndex (req,res){
  StudentModel.findAll((result) => {
    var resultAty = []
    for (var i = 0; i < result.length; i++){
      resultAty[i] = []
      for (var j = 0; j < result[i].courses.length; j++){
        (function iterator(result,l,k){
          if (k >= result.courses.length) {
            return
          }
          CourseModel.find({cid:result.courses[k]},function(err,data){
            if(err){
              throw err
            }
            resultAty[l].push(data[0].name)
            iterator(result,l,++k)
          })
        })(result[i],i,j)
        console.log(resultAty)
      }
    }
    res.send(resultAty)
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