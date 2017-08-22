/**
 * Created by zhaoningli on 2017/8/21.
 */
module.exports = class grade{
    constructor(ch, ma, en, pg){
        this.ch = ch;
        this.ma = ma;
        this.en = en;
        this.pg = pg;
    }

    total(){
        return this.ch + this.ma + this.en + this.pg;
    }

    average(){
        return this.total()/4;
    }
}