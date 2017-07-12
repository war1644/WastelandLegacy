	// 全部物品
	// 类型：kind=1装备类；kind=2使用类；kind=3不可类；kind=4战场可用物品
	// 对于装备类：type=1=武器，type=2=防具；type=3=装饰物
	// 对于使用类：type=1=加HP，type=2=加MP
	RPG.ItemList= [
		{index:0, pic:{x:12,y:0}, name:"神鞭", kind: 1, type: 1, addon:1.5, atkEff:"pSwipe", desc:"魔王的神鞭，从地底洞穴中得到，具有强大的威力", effect:function(hero){hero.changeWeapon(0);}},
		{index:1, pic:{x:3,y:10}, name:"肉干", kind: 2, type:1, desc:"肉干，食用可以补充少量体力", effect:function(hero){hero.addHp(200);}},
		{index:2, pic:{x:0,y:10}, name:"胡萝卜", kind: 2, type:2, desc:"营养丰富的蔬菜", effect:function(hero){hero.addMp(20);}},
		{index:3, pic:{x:1,y:0}, name:"短剑", kind: 1, type: 1, addon:1.1, desc:"初等的武器"},
		{index:4, pic:{x:2,y:0}, name:"长剑", kind: 1, type: 1, addon:1.2, desc:"中级的武器"},
		{index:5, pic:{x:3,y:0}, name:"宝剑", kind: 1, type: 1, addon:1.3, desc:"高级的武器"},
		{index:6, pic:{x:4,y:1}, name:"法杖", kind: 1, type: 1, addon:1.2, desc:"法师的法杖"},
		{index:7, pic:{x:5,y:1}, name:"高级法杖", kind: 1, type: 1, addon:1.3, desc:"高级法师的法杖"},
		{index:8, pic:{x:3,y:2}, name:"隐身冠", kind: 1, type: 3, desc:"戴上之后完全隐身，无论是人类还是精灵都无法看到戴有隐身冠的人"},
		{index:9, pic:{x:12,y:2}, name:"武士服", kind: 1, type: 2, addon:1.1, desc:"轻巧而坚固的防护服"},
		{index:10, pic:{x:6,y:3}, name:"辟邪带", kind: 1, type: 3, desc:"阿给莱法师制作的神奇腰带，任何精灵无法伤害佩戴腰带的人"},
		{index:11, pic:{x:8,y:2}, name:"钢甲", kind: 1, type: 2, addon:1.2, desc:"坚固而厚重的铠甲，有极强的防护能力"},
		{index:12, pic:{x:10,y:10}, name:"面包", kind: 2, type:1, desc:"面包，适合携带，食用可以补充体力", effect:function(hero){hero.addHp(500);}},
		{index:13, pic:{x:8,y:10}, name:"蓝莓", kind: 4, type:1, desc:"蓝色浆果，可在战场食用快速补充体力", effect:function(hero){hero.addHp(200);}},
	];
	// 全部技能
	RPG.SkillList= [
		{index:0, pic:{x:12,y:0}, name:"神鞭", desc:["魔王的神鞭","从地底洞穴中得到","具有强大的威力"], effect:{}},
		{index:1, pic:{x:3,y:10}, name:"肉干", desc:["经过加工的肉干","食用可以补充","少量体力"]}
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
	RPG.getBerry= function(id, num, talk) {
		let str= "Berry"+ id;
		if (!num) {num= 1;}
		if (!RPG.checkSwitch(str)) {
			if (!RPG.checkSwitch("firstBerry")) {
				RPG.setSwitch("firstBerry");
			}
     		mainTeam.addItem(13, num, true);
			RPG.setSwitch(str);
			if (talk) {
		     	RPG.startTalk(talk);
			}
		}
	};