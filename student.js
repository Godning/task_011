/**
 * Created by zhaoningli on 2017/8/21.
 */
//姓名, 学号, 班级, 学科: 成绩
module.exports = class Student{
    constructor(name, id, clazz, grade){
        this.name = name;
        this.id = id;
        this.clazz = clazz;
        this.grade = grade;
    }
}
