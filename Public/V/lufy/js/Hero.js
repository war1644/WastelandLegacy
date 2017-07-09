	// 升级经验值
	RPG.MAXEXP= 100;
	// 英雄信息
	RPG.HeroList= [
		{index:0, chara:"blackTank", face:"fhero",col:4,name:"路漫漫", atkEff: "pSword", force:100, mind:80, atk:50, def: 50, hp: 500, hpAdd: 50,desc:["主角"]},
		{index:1, chara:"m1_npc_1", face:"m1_npc_1f", name:"路人甲", force:50, mind:60, atk:40, def: 50, hp: 400, hpAdd: 50, desc:["骗子"]},
		{index:2, chara:"m1_npc_2", face:"", name:"蝎子", desc:"蝎子", atkEff: "pAttack", force:50, mind:20, atk:65, def: 45, hp: 350, hpAdd: 40},
		{index:3, chara:"m1_npc_5", face:"", name:"蝙蝠", desc:"蝙蝠", atkEff: "pStick", force:50, mind:20, atk:60, def: 40, hp: 300, hpAdd: 40},
		{index:4, chara:"bigdragon", face:"bigdragon", col:4, name:"魔王", atkEff: "pAttack", force:130, mind:80, atk:100, def: 100, hp: 800, hpAdd: 80,desc:["魔王"]},
        {index:5, chara:"npc24", face:"bigdragon", col:4, name:"机械师", atkEff: "pAttack", force:130, mind:80, atk:100, def: 100, hp: 800, hpAdd: 80,desc:["魔王"]}
	];

RPG.HeroPlayer={
	// 人物列表中人物编号
	index: 0,
	// 各种战斗信息
	Hp: 100,
	MaxHp: 100,
	Mp: 100,
	MaxMp: 100,
	Level: 1,
	Exp: 0,
	alive: true,
	// 技能列表
	skillList: [],
	// 装备：武器、防具、装饰
	weapon: -1,
	armor: -1,
	ornament: -1,
	getPerson: function(){
		return RPG.HeroList[this.index];
	},
	getName: function() {
		return RPG.HeroList[this.index].name;
	},
	getFace: function() {
		return RPG.HeroList[this.index].face;
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
	setLevel: function(aLev) {
		var person= this.getPerson();
		this.Level= aLev;
		this.MaxHp= person.hp+ person.hpAdd* aLev;
		this.MaxMp= Math.ceil(person.mind* 5* (aLev+ 10)/ 200);
	},
	// 满回复
	fullHeal: function(){
		this.Hp= this.MaxHp;
		this.Mp= this.MaxMp;
	},
	// 受攻击，减血
	beHit: function(aHit){
		aHit= Math.floor(aHit);
		this.Hp= this.Hp- aHit;
		if (this.Hp<= 0) {
			this.Hp= 0;
			this.alive= false;
		}
	},
	addHp: function(aHit){
		aHit= Math.ceil(aHit);
		this.Hp= Number(this.Hp)+ Number(aHit);
		if (this.Hp>= this.MaxHp) {
			this.Hp= this.MaxHp;
		}
		if (!this.alive) {
			// 补血后自动复活
			this.alive= true;
		}
	},
	addMp: function(aHit){
		aHit= Math.ceil(aHit);
		this.Mp= this.Mp+ aHit;
		if (this.Mp>= this.MaxMp) {
			this.Mp= this.MaxMp;
		}
	},
	// 增加经验值
	addExp: function(aExp){
		aExp= Math.ceil(aExp);
		this.Exp= Number(this.Exp)+ Number(aExp);
		while (this.Exp> RPG.MAXEXP) {
			this.setLevel(Number(this.Level)+ 1);
			this.Exp -= RPG.MAXEXP;
		}
	},
	// 更换武器
	changeWeopen: function(aId){
		var a= this.weapon;
		this.weapon= aId;
		return Number(a);
	},
	// 更换防具
	changeArmor: function(aId){
		var a= this.armor;
		this.armor= aId;
		return Number(a);
	},
	// 更换装饰
	changeOrn: function(aId){
		var a= this.ornament;
		this.ornament= aId;
		return Number(a);
	},
	getWeapon: function(){
		return RPG.ItemList[this.weapon];
	},
	getArmor: function(){
		return RPG.ItemList[this.armor];
	},

}

// 物理攻击效果的计算
RPG.physicalAttack= function(aHeroAtk, aHeroDef){
	var atk1, def1;
	var pAtk= aHeroAtk.getPerson();
	var pDef= aHeroDef.getPerson();
	var weaponAddOn= 1;
	var armorAddOn= 1;
	var vaporAtk, vaporDef;
	// 攻方兵器加成
	if (aHeroAtk.weapon>= 0) {
		var aon= aHeroAtk.getWeapon().addon;
		if (aon){
			//weaponAddOn= (aon+ 100)/ 100;
			weaponAddOn= aon;
		}
	}
	// 士气加成
	vaporAtk= (aHeroAtk.Hp/ aHeroAtk.MaxHp+ 1)/ 2* 100;
	// 攻击力
	atk1= (4000/ (140- pAtk.force)+ pAtk.atk* 2+ vaporAtk)* (aHeroAtk.Level/ 10+ 1)* weaponAddOn;
	// 防守方护甲加成
	if (aHeroDef.armor>= 0) {
		var aon= aHeroDef.getArmor().addon;
		if (aon){
			//armorAddOn= (aon+ 100)/ 100;
			armorAddOn= aon;
		}
	}
	// 士气加成
	vaporDef= (aHeroDef.Hp/ aHeroDef.MaxHp+ 1)/ 2* 100;
	// 防御力
	def1= (4000/ (140- pDef.force)+ pDef.def* 2+ vaporDef)* (aHeroDef.Level/ 10+ 1)* armorAddOn;
	// 攻击效果随机加成 0.9~1.1
	var ran= (RPG.getRandomNum(0, 100)+ 1000)/ 1000;
	var result= (atk1- def1/ 2)* ran;
	if (result<= 0) {
		result= 1;
	}
	if (result> aHeroDef.Hp) {
		result= aHeroDef.Hp;
	}
	return result;
}