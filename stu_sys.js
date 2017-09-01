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
    let str_list = str.split(', ');
    if(str_list.length != 6){
        return true;
    }
    try{
        let grade = build_grade(str, new Grade(0,0,0,0));
    } catch (e){
        return true;
    }
    return false;


}
function build_grade(str_list, grade) {
    for (let i = 3; i < str_list.length; i++) {
        let arr = str_list[i].split(':');
        let type = arr[0];
        let num = arr[1];

        if(type == "数学"){
            grade.ma = Number(num);
        }
        if(type == "语文"){
            grade.ch = Number(num);
        }
        if(type == "英语"){
            grade.en = Number(num);
        }
        if(type == "编程"){
            grade.pg = Number(num);
        }
    }
    return grade;
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
    let grade = new Grade(0, 0, 0, 0);
    //李赵宁, 0101, 1, 英语:90, 语文:90, 数学:90, 编程:90
    //李宁, 0102, 1, 英语:88, 语文:88, 数学:88, 编程:88
    grade = build_grade(str_list, grade);
    // let grade = new Grade(100,100,100,100);
    let student = new Student(name, id, clazz, grade);
    stu_list.push(student);
    console.log("学生"+student.name+"的成绩被添加");
    return stu_list;
}

function build_stu_info(student) {

    let total = student.grade.total();
    let average = student.grade.average();
    let arr = [student.name, student.grade.ch, student.grade.ma, student.grade.en, student.grade.pg, total, average];
    let str = arr.join('|');

    return str;
}

function build_class_average(stu_list) {
    let total = 0;
    for (let stu of stu_list) {
        total += stu.grade.total();
    }
    return total / stu_list.length;
}

function build_class_mid(stu_list) {
    return stu_list[Math.floor(stu_list.length / 2)].grade.total();
}

function show_student(stu_list) {
    let query = Std.question;
    let ques = "请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：";
    let str = query(ques);
    while(check_not(str)){
        ques = "请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：";
        str = query(ques);
    }
    let stu_id_list = str.split(', ');
    let print_str = "成绩单\n";
    print_str += "姓名|数学|语文|英语|编程|平均分|总分 \n";
    print_str += "========================\n";

    for (let id of stu_id_list) {
        let student = stu_list.find( n => n.id == id);
        if(student){
            print_str += build_stu_info(student);
            print_str += "\n";
        }
    }

    let class_average = build_class_average(stu_list);
    let class_mid = build_class_mid(stu_list);

    print_str += "========================\n";
    print_str += "全班总分平均数："+class_average+"\n";
    print_str += "全班总分中位数："+class_mid;
    console.log(print_str);
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