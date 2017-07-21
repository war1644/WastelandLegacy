// 英雄信息
let HeroList= [
	{index:0, chara:"blackTank", face:"face7",col:4,name:"路漫漫", atkEff: "mUse", force:100, mind:80, atk:50, def: 50, hp: 500, hpAdd: 50,desc:["主角"]},
	{index:1, chara:"npc1", face:"face6", name:"白色战车", force:50, mind:60, atk:40, def: 50, hp: 400, hpAdd: 50, desc:["xxxxxxx"]},
	{index:2, chara:"npc5", face:"", name:"商人", desc:"商人", atkEff: "pAttack", force:50, mind:20, atk:65, def: 45, hp: 350, hpAdd: 40},
	{index:3, chara:"npc24", face:"", name:"黑色战车", desc:"黑色战车", atkEff: "mAttack", force:50, mind:20, atk:60, def: 40, hp: 300, hpAdd: 40},
	{index:4, chara:"no17", face:"face1", col:4, name:"红色战车", atkEff: "pAttack", force:130, mind:80, atk:100, def: 100, hp: 800, hpAdd: 80,desc:["xxxxxxx"]},
	{index:5, chara:"npc17", face:"face3", col:4, name:"雷娜", atkEff: "pAttack", force:130, mind:80, atk:100, def: 100, hp: 800, hpAdd: 80,desc:["xxxxxx"]},
	{index:6, chara:"enemy00", face:"face3", row:1,col:1, name:"杀人虫", atkEff: "pAttack", force:130, mind:80, atk:100, def: 100, hp: 800, hpAdd: 80,desc:["xxxxxx"]}
];

let HeroPlayer={
	// 人物列表中人物编号
	index: 0,
	// 各种战斗信息
	Hp: 100,
	MaxHp: 100,
	Mp: 100,
	MaxMp: 100,
	Level: 1,
	Exp: 0,
    // 升级经验值
    maxExp: 100,
	alive: true,
	// 技能列表
	skillList: [],
	// 装备：武器、防具、装饰
	weapon: 24,
	armor: 11,
	ornament: 10,
	getPerson: function(){
		return HeroList[this.index];
	},
	getName: function() {
		return HeroList[this.index].name;
	},
	//
	getFace: function() {
		return HeroList[this.index].face;
	},
	getHpRate: function() {
		if (this.MaxHp> 0) {
			return this.Hp/ this.MaxHp;
		} else {
			return 0;
		}
	},
	getMpRate: function() {
		if (this.MaxMp> 0) {
			return this.Mp/ this.MaxMp;
		} else {
			return 0;
		}
	},
	getExpRate: function() {
		return this.Exp/ 100;
	},
	// 设置等级，直接影响的是上限值
	setLevel: function(lv) {
		let person= this.getPerson();
		this.Level= lv;
		this.MaxHp= person.hp+ person.hpAdd* lv;
		this.MaxMp= Math.ceil(person.mind* 5* (lv+ 10)/ 200);
        this.maxExp= this.MaxHp*2;
	},
	// 满回复
	fullHeal: function(){
		this.Hp= this.MaxHp;
		this.Mp= this.MaxMp;
	},
	// 受攻击，减血
	beHit: function(hit){
		hit= hit>>0;
		this.Hp= this.Hp- hit;
		if (this.Hp<= 0) {
			this.Hp= 0;
			this.alive= false;
		}
	},
	addHp: function(hit){
		hit= Math.ceil(hit);
		this.Hp= Number(this.Hp)+ Number(hit);
		if (this.Hp>= this.MaxHp) {
			this.Hp= this.MaxHp;
		}
		if (!this.alive) {
			// 补血后自动复活
			this.alive= true;
		}
	},
	addMp: function(hit){
		hit= Math.ceil(hit);
		this.Mp= this.Mp+ hit;
		if (this.Mp>= this.MaxMp) {
			this.Mp= this.MaxMp;
		}
	},
	// 增加经验值
	addExp: function(exp){
		exp= Math.ceil(exp);
		this.Exp= Number(this.Exp)+ Number(exp);
		while (this.Exp> this.maxExp) {
			this.setLevel(Number(this.Level)+ 1);
			this.Exp -= this.maxExp;
		}
	},
	// 更换武器
	changeWeapon: function(id){
		let a= this.weapon;
		this.weapon= id;
		return Number(a);
	},
	// 更换防具
	changeArmor: function(id){
		let a= this.armor;
		this.armor= id;
		return Number(a);
	},
	// 更换装饰
	changeOrn: function(id){
		let a= this.ornament;
		this.ornament= id;
		return Number(a);
	},
	getWeapon: function(){
		return RPG.ItemList[this.weapon];
	},
	getArmor: function(){
		return RPG.ItemList[this.armor];
	},

};

