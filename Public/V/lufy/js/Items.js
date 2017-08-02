
// 全部物品
// 类型：kind=1装备类；kind=2使用类；kind=3不可用类；kind=4战场可用物品
// 对于装备类：type=1=武器，type=2=防具；type=3=装饰物
// 对于使用类：type=1=加HP，type=2=加SP,type=4 战场攻击
let ItemList= [
		{cost:10,name:"GPS", kind: 1, type: 1, addOn:1.5, atkEff:"pSwipe", description:"", effect:(hero)=>{hero.changeWeapon(0);}},
		{cost:10,name:"军用肉干", kind: 2, type:1, description:"肉干，食用可以补充少量体力", effect:function(hero){hero.addHp(200);}},
		{cost:10,name:"自动步枪", kind: 1, type: 1, addOn:1.1, description:"初等的武器"},
		{cost:10,name:"狙击步枪", kind: 1, type: 1, addOn:1.2, description:"中级的武器"},
		{cost:10,name:"隐身衣", kind: 1, type: 3, description:"穿上之后完全隐身，然后就可以干一些不可描述的事情了"},
		{cost:10,name:"头巾", kind: 1, type: 3, description:"飞狗掉落，彩蛋级装备"},
		{cost:10,name:"钢甲", kind: 1, type: 2, addOn:1.2, description:"消耗性护甲，有极强的防护能力"},
		{cost:10,name:"面包", kind: 2, type:1, description:"面包，适合携带，食用可以补充体力", effect:(hero)=>{hero.addHp(50);}},
        {name:'回复药',cost:10, kind: 2, type:1,description:'恢复少量生命值', effect:(hero)=>{hero.addHp(200);}},
        {name:'生命胶囊',cost:15, kind: 2, type:1,description:'恢复一定生命值', effect:(hero)=>{hero.addHp(500);}},
        {name:'再生丸',cost:200000, kind: 2, type:1,description:'不是复活，是属于修复细胞，额，好像也是复活。。。',effect:function(hero){hero.addHp(1,'再生丸');}},
        {name:'手雷',cost:20, kind: 4, type:4,description:'能对软体怪物造成大量伤害',effect:function(enemy){enemy.beHit(50);}},
        {name:'小刀',cost:10,kind: 1, type: 1, addOn:1.2,attack:5,description:'切水果用的刀'},
        {name:'匕首',cost:15,kind: 1, type: 1, addOn:1.2,attack:7,description:'格斗用的锋利匕首'},
        {name:'大马士革刀',cost:20,kind: 1, type: 2, addOn:1.2,attack:10,description:'弯刀'},
        {name:'拳套',cost:25,kind: 1, type: 1, addOn:1.2,attack:12,description:'能打出爆发性的一击'},
        {name:'手枪',cost:50,kind: 1, type: 1, addOn:1.2,attack:15,description:'一把普通的枪'},
        {name:'短枪',cost:70,kind: 1, type: 1, addOn:1.2,attack:16,description:'射速极快的手枪'},
        {name:'迫击炮',cost:100,kind: 1, type: 1, addOn:1.2,attack:20,description:'军用武器'},
        {name:'RPG',cost:120,kind: 1, type: 1, addOn:1.2,attack:25,description:'榴弹发射器'},
        {name:'激光炮',cost:150,kind: 1, type: 1, addOn:1.2,attack:30,description:'博士造高科技武器'},
        {name:'卫星轨道炮',cost:20000,kind: 1, type: 1, addOn:1.2,attack:50,description:'传说中大破坏后留下的武器,效果不明'}
	];

// 全部技能
let SkillList= [
	{name:"不知道1", desc:["xxxxxxx","xxxxxxx","具有强大的威力"], effect:{}},
	{name:"不知道2", desc:["xxxxxxx","xxxxxxx","少量体力"]}
];

let Item= {
	index: 0,
	num: 0,
	name:'',
    description:'',
    kind: -1,
	type: -1,
	addOn:0,
    cost:0,
	useTo: function(hero){
		if (ItemList[this.index].effect){
			ItemList[this.index].effect(hero);
		}
	},
	getItem: function(){
		return ItemList[this.index];
	},
};

