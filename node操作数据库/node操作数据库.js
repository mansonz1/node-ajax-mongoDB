var MongoClient = require("mongodb").MongoClient;
var mongoUrl = "mongodb://admin:123456@127.0.0.1:27017/admin";
MongoClient.connect(mongoUrl,{useNewUrlParser:true},function(err,db){
    console.log("数据库链接成功");
    if(err)throw err;
    var studentinfo = [{sno:"001",name:"张三"},{sno:"002",name:"李四"}];
    var grade = [{sno:"001",cno:"ZJH5",grade:70},{sno:"001",cno:"ZJData",grade:80},{sno:"002",cno:"ZJH5",grade:90},{sno:"002",cno:"ZJData",grade:70}];
    var dbase = db.db("weektest");
//1.插入1次数据
/*    dbase.collection("studentinfo").insertMany(studentinfo,function(err,res){
        if(err) throw err;
        console.log("插入的文档数量为："+ res.insertedCount);
        db.close();
    });

    dbase.collection("grade").insertMany(grade,function(err,res){
        if(err) throw err;
        console.log("插入的文档数量为:"+res.insertedCount);
        db.close();
    });*/

    dbase.collection("studentinfo").aggregate([{$lookup:{
            from:'grade',
            localField:'sno',
            foreignField:'sno',
            as:'student'
        }
    },{$unwind:{
            path: "$student",    //拆分sum
            preserveNullAndEmptyArrays: true // 空的数组也拆分
        }
    },{
        $group: {
            _id:"$sno",
            name: { $first: "$name" },
            grade: {$sum: "$student.grade"}
        }
    }
    ]).toArray(function (err,res) {
        if (err)throw err;
        console.log(JSON.stringify(res));
        db.close();
    })
});
