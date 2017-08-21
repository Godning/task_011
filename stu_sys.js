/**
 * Created by zhaoningli on 2017/8/20.
 * 学生成绩单命令行版
 */

const student = require('./student.js');
const std = require('cli-interact')

function show_info() {
    let query = std.getNumber;
    let ques = `
1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）：`;
    let answer = query(ques);
    return answer;
}

function addStudent(stu_list) {
    let query = std.question;
    let ques = "请输入学生信息（格式：姓名, 学号, 班级, 学科: 成绩, ...），按回车提交：";
    let str = query(ques);
    console.log(str);
}

function stu_sys() {
    let stu_list = [];
    let cmd = show_info();
    if (cmd === 1) {
        addStudent(stu_list);
    }
    if (cmd === 2) {

    }
    if (cmd === 3) {

    }
}

stu_sys();

//module.exports = stu_sys;