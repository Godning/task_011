/**
 * Created by zhaoningli on 2017/8/20.
 * 学生成绩单命令行版
 */

const Student = require('./student');
const Grade = require('./grade');
const Std = require('cli-interact');

function show_info() {
    let query = Std.getNumber;
    let ques = `
1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：`;
    let answer = query(ques);
    return answer;
}

function check_not(str) {
    return false;

}
function addStudent(stu_list) {
    let query = Std.question;
    let ques = "请输入学生信息（格式：姓名, 学号, 班级, 学科: 成绩, ...），按回车提交：";
    let str = query(ques);
    while(check_not(str)){
        ques = "请按正确的格式输入（格式：姓名, 学号, 班级, 学科: 成绩, ...）：";
        str = query(ques);
    }
    let str_list = str.split(', ');
    let name = str_list[0];
    let id = str_list[1];
    let clazz = str_list[2];
    let grade = new Grade(100,100,100,100);
    let student = new Student(name, id, clazz, grade);
    stu_list.push(student);
    console.log("学生"+student.name+"的成绩被添加");
    return stu_list;
}

function build_stu_info(student) {
    let str = `
成绩单
姓名|数学|语文|英语|编程|平均分|总分 
========================
`;
    let total = student.grade.total();
    let average = student.grade.average();
    let arr = [student.name, student.grade.ch, student.grade.ma, student.grade.en, student.grade.pg, total, average];
    str += arr.join('|');
    str += `
========================
全班总分平均数：xxx
全班总分中位数：xxx
`;
    return str;
}

function show_student(stu_list) {
    let query = Std.question;
    let ques = "请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：";
    let str = query(ques);
    while(check_not(str)){
        ques = "请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：";
        str = query(ques);
    }
    let stu_id_list = str.split(',');
    stu_id_list.map(function (id) {
       let student = stu_list.find( n => n.id == id);
       if(student){
           let print_stu_info = build_stu_info(student);
           console.log(print_stu_info);
       }
    });
}

function stu_sys() {
    let stu_list = [];
    while(1){

        let cmd = show_info();
        if (cmd === 1) {
            stu_list = addStudent(stu_list);
        }
        if (cmd === 2) {
            show_student(stu_list);
        }
        if (cmd === 3) {
            break;
        }
    }
}

stu_sys();

//module.exports = stu_sys;