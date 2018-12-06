/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆██▄▄▃▂
 *  ████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 游戏声效基类
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2018/1/16 21:10 初版
 */
// 全部技能
let Item = {
    num: 0,
    useTo: function(hero){
        if (this.effect){
            this.effect(hero);
        }
    },
    getItem: function(){
        return ItemList[this.id];
    },
};

// 全部物品
// type：1.人类装备；2.坦克装备；
// position：1=武器，2=衣服；3=防具
// position：1=主，2=副；3=SE；4=C；5=引擎
// 对于使用类：type=1 加HP，type=2=加SP,type=4 战场攻击
// job：职业
// range：0，单体，1：群组，2：全部

let ItemList = [
    {id: "1", name: "细胞", price: 5, attack: 0, effect: "", description: "据说酒吧老板会喜欢"},
    {id: "2", name: "零件", price: 10, attack: 0, effect: "", description: "商人一般看到零件就会眼睛放光"},
    {id: "3", name: "废铁", price: 15, attack: 0, effect: "", description: "拿去废铁处理厂吧"},
    {id: "4", name: "参丸", price: 10, attack: 0, effect: "(hero)=>{hero.addHp(100);}", description: "单人HP100回复"},
    {id: "4", name: "手雷", price: 5, attack: 0, effect: "(hero)=>{hero.beHit(rangeRand(8,20));}", description: "敌单体小伤害"},
];

/**战车装备**/
let TankEquipment = [
    //主炮
    {id: "1",name: "55炮", attack: 120, defend: 48,count:32,range: 0,weight: 1.6,position: "1",  place: "20", type: "2",  price: 540,  job: "0", effect: "", description: "55mm主炮", attackAnimation: "220Animation"},
    {id: "2",name: "75炮", attack: 160, defend: 48,count:32,range: 0,weight: 1.8,position: "1",  place: "20", type: "2",  price: 640,  job: "0", effect: "", description: "75mm主炮", attackAnimation: "220Animation"},
    //副炮
    {id: "3",name: "09机关炮", attack: 60, defend: 28,count:0,range: 0,weight: 0.9,position: 2,  place: "20", type: "2",  price: 380,  job: "0", effect: "", description: "", attackAnimation: "220Animation"},
    {id: "4",name: "格林炮", attack: 75, defend: 30,count:0,range: 1,weight: 1.2,position: 2,  place: "20", type: "2",  price: 550,  job: "0", effect: "", description: "", attackAnimation: "220Animation"},
    //SE
    {id: "5",name: "喷火", attack: 250, defend: 20,count:8,range: 1,weight: 2.4,position: 3,  place: "20", type: "2",  price: 1000,  job: "0", effect: "", description: "", attackAnimation: "220Animation"},

    {id: "6",name: "HAL900", attack: 0, defend: 30,count:0,range: 0,weight: 0.8,position: 4,  place: "20", type: "2",  price: 800,  job: "0", effect: "", description: "C装置", attackAnimation: "220Animation"},

    {id: "7",name: "MOT2", attack: 9, defend: 24,count:0,range: 0,weight: 0.2,position: 5,  place: "20", type: "2",  price: 340,  job: "0", effect: "", description: "坦克引擎", attackAnimation: "220Animation"},
    {id: "8",name: "MOT3", attack: 10, defend: 24,count:0,range: 0,weight: 0.3,position: 5,  place: "20", type: "2",  price: 520,  job: "0", effect: "", description: "坦克引擎", attackAnimation: "220Animation"},
];

let HumanEquipment = [
    //
    {id: "1",name: "短枪", attack: 22, defend: 0,range: 0,position: 1,  place: "20",price: 180,effect: "", description: "", attackAnimation: "220Animation",type:1},
    {id: "2",name: "战斧", attack: 26, defend: 0,range: 0,position: 1,  place: "20",price: 240, effect: "", description: "", attackAnimation: "220Animation",type:1},
    //
    {id: "3",name: "布衣", attack: 0, defend: 6,position: 2,  place: "20",price: 40, effect: "", description: "",type:1},
    {id: "4",name: "皮衣", attack: 0, defend: 12,position: 2,  place: "20",price: 110, effect: "", description: "",type:1},

    {id: "5",name: "破损防具", attack: 0, defend: 0,position: 3,  place: "20",price: 0, effect: "", description: "",type:1},
    {id: "6",name: "防弹背心", attack: 0, defend: 30,position: 3,  place: "20",price: 160, effect: "", description: "",type:1},

];


/*
* {id: "2", place: "20", type: "1", position: "1", name: "弩枪", price: "80", attack: "15", range: "1", weight: "0.00", defend: "0", job: "0", effect: "", description: "", attackAnimation: "220Animation"},
    {id: "3", place: "20", type: "1", position: "1", name: "霰弹枪", price: "180", attack: "22", range: "2", weight: "0.00", defend: "0", job: "0", effect: "", description: "", attackAnimation: "220Animation"},
    {id: "4", place: "20", type: "1", position: "3", name: "白线手套", price: "10", attack: "0", range: "0", weight: "0.00", defend: "2", job: "0", effect: "", description: "", attackAnimation: ""},
    {id: "5", place: "20", type: "1", position: "2", name: "帆布衣", price: "40", attack: "0", range: "0", weight: "0.00", defend: "6", job: "0", effect: "", description: "", attackAnimation: ""},
    {id: "6", place: "20", type: "1", position: "4", name: "袜子", price: "15", attack: "0", range: "0", weight: "0.00", defend: "3", job: "0", effect: "", description: "", attackAnimation: ""},
    {id: "7", place: "20", type: "2", position: "0", name: "回复胶囊", price: "10", attack: "0", range: "0", weight: "0.00", defend: "0", job: "0", effect: "(hero)=>{hero.addHp(100);}", description: "回复少量体力", attackAnimation: ""},
    {id: "8", place: "20", type: "2", position: "0", name: "火箭礼花", price: "5", attack: "0", range: "0", weight: "0.00", defend: "0", job: "0", effect: "(hero)=>{hero.beHit(100);}", description: "造成少量伤害", attackAnimation: "220Animation"},
    {id: "9", place: "20", type: "2", position: "0", name: "火焰瓶", price: "10", attack: "0", range: "0", weight: "0.00", defend: "0", job: "0", effect: (hero)=>{hero.beHit(100,1);}, description: "造成少量伤害，并每回合扣少量血", attackAnimation: "220Animation"},
    {id: "10", place: "20", type: "2", position: "0", name: "修理工具", price: "80", attack: "0", range: "0", weight: "0.00", defend: "0", job: "0", effect: "", description: "机械师用来修理战车", attackAnimation: ""},
    {id: "11", place: "20", type: "2", position: "0", name: "蚊香", price: "5", attack: "0", range: "0", weight: "0.00", defend: "0", job: "0", effect: "", description: "减少蚊子吸血数", attackAnimation: ""},
    {id: "12", place: "20", type: "2", position: "0", name: "再生丸", price: "200", attack: "0", range: "0", weight: "0.00", defend: "0", job: "0", effect: "", description: "复活", attackAnimation: ""},
    {id: "13", place: "20", type: "2", position: "0", name: "止痛剂", price: "200", attack: "0", range: "0", weight: "0.00", defend: "0", job: "0", effect: "", description: "复活", attackAnimation: ""},
    {id: "14", place: "20", type: "2", position: "0", name: "回复药", price: "50", attack: "0", range: "0", weight: "0.00", defend: "0", job: "0", effect: "", description: "回复HP", attackAnimation: ""},
    {id: "15", place: "20", type: "2", position: "0", name: "xxx", price: "50", attack: "0", range: "0", weight: "0.00", defend: "0", job: "0", effect: "", description: "xxxx", attackAnimation: ""},

    {id: "16", place: "20", type: "3", position: "2", name: "9mm机枪", price: "100", attack: "20", range: "0", weight: "0.10", defend: "0", job: "0", effect: "", description: "9mm副炮", attackAnimation: "220Animation"},
    {id: "17", place: "20", type: "1", position: "5", name: "头巾", price: "100", attack: "0", range: "0", weight: "0.00", defend: "10", job: "0", effect: "", description: "", attackAnimation: ""},
    {id: "18", place: "20", type: "3", position: "3", name: "台风", price: "100", attack: "20", range: "0", weight: "3.00", defend: "0", job: "0", effect: "", description: "SE炮", attackAnimation: "220Animation"},
    {id: "19", place: "20", type: "3", position: "4", name: "尼克", price: "100", attack: "20", range: "0", weight: "0.20", defend: "0", job: "0", effect: "", description: "C装置", attackAnimation: ""},
    {id: "20", place: "20", type: "3", position: "5", name: "V24", price: "100", attack: "36", range: "0", weight: "0.20", defend: "0", job: "0", effect: "", description: "坦克引擎", attackAnimation: ""},

    {id: "24", place: "20", type: "1", position: "4", name: "皮衣", price: "15", attack: "0", range: "0", weight: "0.00", defend: "3", job: "0", effect: "", description: "", attackAnimation: ""},
    {id: "25", place: "20", type: "1", position: "4", name: "皮靴", price: "15", attack: "0", range: "0", weight: "0.00", defend: "3", job: "0", effect: "", description: "", attackAnimation: ""},
    {id: "26", place: "20", type: "1", position: "4", name: "xx", price: "15", attack: "0", range: "0", weight: "0.00", defend: "3", job: "0", effect: "", description: "", attackAnimation: ""},
    {id: "27", place: "20", type: "1", position: "4", name: "xx", price: "15", attack: "0", range: "0", weight: "0.00", defend: "3", job: "0", effect: "", description: "", attackAnimation: ""},
    {id: "28", place: "20", type: "1", position: "4", name: "xx", price: "15", attack: "0", range: "0", weight: "0.00", defend: "3", job: "0", effect: "", description: "", attackAnimation: ""},
    {id: "29", place: "20", type: "1", position: "4", name: "xx", price: "15", attack: "0", range: "0", weight: "0.00", defend: "3", job: "0", effect: "", description: "", attackAnimation: ""},
*
*
* */



