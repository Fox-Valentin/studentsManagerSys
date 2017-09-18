var CourseModel = require("./model/Course.js")
var StudentModel = require("./model/Students.js")
exports.showIndex = showIndex
exports.showCourses = showCourses
exports.showAdd = showAdd
exports.doAdd = doAdd
function showIndex (req,res){
  StudentModel.findAll((result) => {
    var coursesAry = [];
    (function iterator1(i){
      if(i >= result.length){
        return
      }
      coursesAry[i] = [];
        (function iterator2(i,j){
          if(j >= result[i].courses.length){
            return
          }
          CourseModel.find({cid:result[i].courses[j]},function(err,data){
            coursesAry[i].push(data[0].name)
            iterator2(i,++j)
          })
        })(i,0)
      iterator1(++i)
      console.log(coursesAry)
    })(0)
      console.log(coursesAry)
    res.send(coursesAry)
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