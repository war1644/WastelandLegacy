
// 全部物品
	// 类型：kind=1装备类；kind=2使用类；kind=3不可类；kind=4战场可用物品
	// 对于装备类：type=1=武器，type=2=防具；type=3=装饰物
	// 对于使用类：type=1=加HP，type=2=加SP,type=4 战场攻击
	RPG.ItemList= [
		{index:0, pic:{x:12,y:0}, cost:'10G',name:"神鞭", kind: 1, type: 1, addOn:1.5, atkEff:"pSwipe", description:"魔王的神鞭，从地底洞穴中得到，具有强大的威力", effect:function(hero){hero.changeWeapon(0);}},
		{index:1, pic:{x:3,y:10}, cost:'10G',name:"肉干", kind: 2, type:1, description:"肉干，食用可以补充少量体力", effect:function(hero){hero.addHp(200);}},
		{index:2, pic:{x:0,y:10}, cost:'10G',name:"胡萝卜", kind: 2, type:2, description:"营养丰富的蔬菜", effect:function(hero){hero.addMp(20);}},
		{index:3, pic:{x:1,y:0}, cost:'10G',name:"短剑", kind: 1, type: 1, addOn:1.1, description:"初等的武器"},
		{index:4, pic:{x:2,y:0}, cost:'10G',name:"长剑", kind: 1, type: 1, addOn:1.2, description:"中级的武器"},
		{index:5, pic:{x:3,y:0}, cost:'10G',name:"宝剑", kind: 1, type: 1, addOn:1.3, description:"高级的武器"},
		{index:6, pic:{x:4,y:1}, cost:'10G',name:"法杖", kind: 1, type: 1, addOn:1.2, description:"法师的法杖"},
		{index:7, pic:{x:5,y:1}, cost:'10G',name:"高级法杖", kind: 1, type: 1, addOn:1.3, description:"高级法师的法杖"},
		{index:8, pic:{x:3,y:2}, cost:'10G',name:"隐身冠", kind: 1, type: 3, description:"戴上之后完全隐身，无论是人类还是精灵都无法看到戴有隐身冠的人"},
		{index:9, pic:{x:12,y:2}, cost:'10G',name:"武士服", kind: 1, type: 2, addOn:1.1, description:"轻巧而坚固的防护服"},
		{index:10, pic:{x:6,y:3}, cost:'10G',name:"头带", kind: 1, type: 3, description:"阿给莱法师制作的神奇腰带，任何精灵无法伤害佩戴腰带的人"},
		{index:11, pic:{x:8,y:2}, cost:'10G',name:"钢甲", kind: 1, type: 2, addOn:1.2, description:"坚固而厚重的铠甲，有极强的防护能力"},
		{index:12, pic:{x:10,y:10}, cost:'10G',name:"面包", kind: 2, type:1, description:"面包，适合携带，食用可以补充体力", effect:function(hero){hero.addHp(500);}},
		{index:13, pic:{x:8,y:10}, cost:'10G',name:"蓝莓", kind: 4, type:1, description:"蓝色浆果，可在战场食用快速补充体力", effect:function(hero){hero.addHp(200);}},
        {index:14,pic:{x:8,y:10},name:'回复药',cost:'10G', kind: 2, type:1,description:'恢复少量生命值',effect:function(hero){hero.addHp(100);}},
        {index:15,pic:{x:8,y:10},name:'中回复药',cost:'15G', kind: 2, type:1,description:'恢复一定生命值',effect:function(hero){hero.addHp(200);}},
        {index:16,pic:{x:8,y:10},name:'大回复药',cost:'20G', kind: 2, type:1,description:'恢复大量生命值',effect:function(hero){hero.addHp(1000);}},
        {index:17,pic:{x:8,y:10},name:'手雷',cost:'20G', kind: 4, type:4,description:'能对软体怪物造成大量伤害',effect:function(enemy){enemy.beHit(50);}},
        {index:18,pic:{x:8,y:10},name:'小刀',cost:'10G',kind: 1, type: 1, addOn:1.2,attack:5,description:'切水果用的刀'},
        {index:19,pic:{x:8,y:10},name:'匕首',cost:'15G',kind: 1, type: 1, addOn:1.2,attack:7,description:'格斗用的锋利匕首'},
        {index:20,pic:{x:8,y:10},name:'大马士革刀',cost:'20G',kind: 1, type: 2, addOn:1.2,attack:10,description:'弯刀'},
        {index:21,pic:{x:8,y:10},name:'拳套',cost:'25G',kind: 1, type: 1, addOn:1.2,attack:12,description:'能打出爆发性的一击'},
        {index:22,pic:{x:8,y:10},name:'手枪',cost:'50G',kind: 1, type: 1, addOn:1.2,attack:15,description:'一把普通的枪'},
        {index:23,pic:{x:8,y:10},name:'短枪',cost:'70G',kind: 1, type: 1, addOn:1.2,attack:16,description:'射速极快的手枪'},
        {index:24,pic:{x:8,y:10},name:'迫击炮',cost:'100G',kind: 1, type: 1, addOn:1.2,attack:20,description:'军用武器'},
        {index:25,pic:{x:8,y:10},name:'RPG',cost:'120G',kind: 1, type: 1, addOn:1.2,attack:25,description:'榴弹发射器'},
        {index:26,pic:{x:8,y:10},name:'激光炮',cost:'150G',kind: 1, type: 1, addOn:1.2,attack:30,description:'未来高科技武器'},
        {index:27,pic:{x:8,y:10},name:'卫星轨道炮',cost:'20000G',kind: 1, type: 1, addOn:1.2,attack:50,description:'传说中大破坏后留下的武器,效果不明'}
	];
	// 全部技能
	RPG.SkillList= [
		{index:0, pic:{x:12,y:0}, name:"不知道1", desc:["xxxxxxx","xxxxxxx","具有强大的威力"], effect:{}},
		{index:1, pic:{x:3,y:10}, name:"不知道2", desc:["xxxxxxx","xxxxxxx","少量体力"]}
	];

	RPG.Item= {
		index: 0,
		num: 0,
		useTo: function(hero){
			if (RPG.ItemList[this.index].effect){
				RPG.ItemList[this.index].effect(hero);
			}
		},
		getItemDesc: function(){
			return RPG.ItemList[this.index];
		}
	};

	// 获得浆果的通用程序
	RPG.getBerry= function(id, num=1, talk) {
		let str= "Berry"+ id;
		if (!RPG.checkSwitch(str)) {
			if (!RPG.checkSwitch("firstBerry")) {
				RPG.setSwitch("firstBerry");
			}
     		mainTeam.addItem(13, num, true);
			RPG.setSwitch(str);
			if (talk) {
		     	Talk.startTalk(talk);
			}
		}
	};