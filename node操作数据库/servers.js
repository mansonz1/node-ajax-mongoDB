var http = require("http");
var querystring = require("querystring");
var MongoClient = require("mongodb").MongoClient;
var mongoUrl = "mongodb://admin:123456@127.0.0.1:27017/admin";
var fs = require("fs");
var EventEmitter = require("events").EventEmitter;
var event = new EventEmitter();

const hostname = "127.0.0.1";
const port_TeacherInformationSetting = 3001;
const port_selectClass = 3002;
const port_choose = 3003;
const port_findResult = 3008;


const server_TeacherInformationSetting = http.createServer(function(request,response){
    response.statueCode == 200;
    response.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:63342");
    response.setHeader("Content-Type","text/plain");
    response.setHeader("Access-Control-Allow-Credentials","true");
    var post = "";
    var flag = 1;
    request.on("data",function(chunk){
        post = post + chunk;
    });
    request.on("end",function(){
        post = querystring.parse(post);
        console.log(post);
        if(post["key"] == 1){
            MongoClient.connect(mongoUrl,{useNewUrlParser:true},function(err,db){
                console.log("教师数据库链接成功");
                if(err){return console.log(err)}
                var dbase = db.db("weektest3");
                dbase.collection("classInformation").find({}).toArray(function(err,result){
                    if(err) throw err;
                    console.log(result);
                    for(var i=0; i<result.length;i++){
                        if(post.classId == result[i].classId){
                            flag = 0;
                            break;
                        }
                        if(i >= result.length){
                            flag = 1;
                        }
                        if(post.classId == ""){
                            flag = 0;
                            response.end("必须输入有效学号！");
                            console.log("学号不可为空");
                            break;
                        }
                    }
                    if(flag == 1){
                        dbase.collection("classInformation").insertOne(post,function(err,res){
                            if(err) throw err;
                            console.log("课程信息录入成功");
                            response.end("课程信息录入成功");
                            db.close();
                        });
                    }
                    else{
                        console.log("创建失败，信息重复");
                        response.end("信息重复，请重新输入！");
                    }
                    db.close();
                });
            })
        }
    });

});
const server_selectClass = http.createServer(function(request,response){
    response.statueCode == 200;
    response.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:63342");
    response.setHeader("Content-Type","application/json;charset=UTF-8");
    response.setHeader("Access-Control-Allow-Credentials","true");
    var post = "";
    request.on("data",function(chunk){
        post = post + chunk;
    });
    request.on("end",function(){
        post = querystring.parse(post);
        //console.log(post);
        MongoClient.connect(mongoUrl,{useNewUrlParser:true},function(err,db){
            console.log("学生端-教师库获取成功");
            if(err){return console.log(err)}
            var dbase = db.db("weektest3");
            dbase.collection("classInformation").find({}).toArray(function(err,result){
                var b= [];
                var obj = {};
                obj.project = result;
                var a = JSON.stringify(obj);
            /*  for(var i=0;i<result.length;i++){
                  b.push(result[i]["className"]);
              }
              var a =b.join(",");*/
               // console.log(a);
                console.log(a);
                response.end(a);
              db.close();

          /*  dbase.collection("studentResult").insertMany(post,function(err,result){
                if(err) throw err;
                console.log("插入的文档数量为:"+result.insertedCount);
                db.close();
            })*/
            })
        });
    })
});
const server_choose = http.createServer(function(request,response){
    response.statueCode == 200;
    response.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:63342");
    response.setHeader("Content-Type","text/plain");
    response.setHeader("Access-Control-Allow-Credentials","true");
    var post = "";
    var flag = 1;
    request.on("data",function(chunk){
        post = post + chunk;
    });
    request.on("end",function(){
        post = querystring.parse(post);
        MongoClient.connect(mongoUrl,{useNewUrlParser:true},function(err,db){
            console.log("科目上传 开始检索数据库");
            if(err){return console.log(err)}
            var dbase = db.db("weektest3");
            dbase.collection("choose").find({}).toArray(function(err,result){
                if(err) throw err;
                console.log(result);
                for(var i=0; i<result.length;i++){
                    if(post.choose == result[i].choose){
                        flag = 0;
                        break;
                    }
                    if(i >= result.length){
                        flag = 1;
                    }
                    if(post.choose == ""){
                        flag = 0;
                        response.end("必须选择1-3门科目");
                        console.log("未选择科目");
                        break;
                    }
                }
                if(flag == 1){
                    if(result.length == 0){
                        console.log(post);
                        dbase.collection("choose").insertOne(post,function(err,res){
                            if(err) throw err;
                            console.log("选课成功");
                            response.end("选课成功，请关闭网页");
                            db.close();
                    });
                }
                    else{
                        var studentId = {"key":"7"};
                        var newChoose = {$set:post};
                        console.log(post);
                        dbase.collection("choose").updateOne(studentId,newChoose,function(err,res){
                            if(err) throw err;
                            console.log("选课成功");
                            response.end("修改完毕");
                            db.close();
                        });
                    }
                }
                else{
                    console.log("创建失败，信息重复");
                    response.end("创建失败，所选科目与数据库内容重复");
                }
                db.close();
            })
        })
    });
});
const server_findResult = http.createServer(function(request,response){
    response.statueCode == 200;
    response.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:63342");
    response.setHeader("Content-Type","application/json;charset=UTF-8");
    response.setHeader("Access-Control-Allow-Credentials","true");
    var post = "";
    request.on("data",function(chunk){
        post = post + chunk;
    });
    request.on("end",function(){
        post = querystring.parse(post);
        MongoClient.connect(mongoUrl,{useNewUrlParser:true},function(err,db){
            console.log("学生端-查询系统进入");
            if(err){return console.log(err)}
            var dbase = db.db("weektest3");
            dbase.collection("choose").find({}).toArray(function(err,result){
                var obj={};
                obj.project = result;
                var a = JSON.stringify(obj);
                console.log(a);
                response.end(a);
                db.close();
            })
        })
    })
});


server_choose.listen(port_choose,hostname,function(){
    console.log("学生端 上传所选科目服务器 已开启运行 ： http://" + hostname + ":" + port_choose);
});
server_TeacherInformationSetting.listen(port_TeacherInformationSetting,hostname,function(){
    console.log("教师端，学生信息录入服务器 已开启运行 ： http://" + hostname + ":" + port_TeacherInformationSetting);
});
server_selectClass.listen(port_selectClass,hostname,function(){
    console.log("学生端 课程选择服务器 已开启运行 ： http://" + hostname + ":" + port_selectClass);
});
server_findResult.listen(port_findResult,hostname,function(){
    console.log("学生端 查询选课内容服务器 已开始运行 ：http://"+hostname+":"+port_findResult)
});


