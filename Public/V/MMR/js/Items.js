
// 全部物品
// 类型type：1.人类装备；2.人类道具；3.坦克装备；4.坦克道具;5.不可用
// 对于装备类：type=1=武器，type=2=防具；type=3=装饰物
// 对于使用类：type=1=加HP，type=2=加SP,type=4 战场攻击
// job：job=1 加HP，type=2=加SP,type=4 战场攻击
// attackRange：0，单体，1：群组，2：全部

let ItemList= [

		// {cost:10,name:"迫击炮", kind: 1, type: 1,  attackAnimation:"pSwipe", description:"定位自己的位置，以及呼叫卫星攻击", effect:(hero)=>{hero.changeWeapon(0);}},

	];

// 全部技能
let SkillList= [
	{name:"不知道1", desc:["xxxxxxx","xxxxxxx","具有强大的威力"], effect:{}},
	{name:"不知道2", desc:["xxxxxxx","xxxxxxx","少量体力"]},
    {name:'大炮齐射',attack:20},
    {name:'双副炮攻击',attack:15},
    {name:'225mm主炮攻击',attack:100}
];

let Item= {
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

