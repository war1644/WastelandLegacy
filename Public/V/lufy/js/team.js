/**
 * 团队类
 * 包括团队物品，团队金钱
 * 已经角色数据
 * 包括姓名，头像，武艺，智力，生命力和法力
 **/
 
// 用户操作的主队
RPG.PlayerTeam= {
	itemList: [],
	heroList: [],
	init: function (){
		this.itemList=[
            {index:14,num:5,name:'回复药',cost:'10G', kind: 2, type:1,description:'恢复少量生命值',effect:function(hero){hero.addHp(100);},useTo: function(hero){
                if (RPG.ItemList[this.index].effect){
                    RPG.ItemList[this.index].effect(hero);
                }
            },
                getItemDesc: function(){
                    return RPG.ItemList[this.index];
                }},
            {index:17,num:1,name:'手雷',cost:'20G',kind: 4, type:4,description:'能对软体怪物造成大量伤害',effect:function(enemy){enemy.beHit(50);},useTo: function(hero){
                if (RPG.ItemList[this.index].effect){
                    RPG.ItemList[this.index].effect(hero);
                }
            },
                getItemDesc: function(){
                    return RPG.ItemList[this.index];
                }}
		];
		this.heroList=[];
	},
	clear: function (){
		this.itemList=[];
		this.heroList=[];
	},
	// visible：是否给出一个提示框，显示得到了哪些物品
	addItem: function (id, num=1, visible){
		if (id < 0) return;
		let found= false;
		for (let i=0; i< this.itemList.length; i++) {
			if (this.itemList[i].index === id) {
				this.itemList[i].num = Number(this.itemList[i].num) + Number(num);
				found = true;
				break;
			}
		}
		if (!found) {
			let i1= RPG.beget(RPG.Item);
			i1.index = id;
			i1.num = num;
			this.itemList.push(i1);
		}
		if (visible) RPG.showGetItem(id, num);
	},
	// 使用物品
	removeItem: function(aHero, aId, aNum){
		if (aHero<0 || aId< 0 || aHero>= this.heroList.length || aId>= this.itemList.length) {
			return;
		}
		let item1;
		let hero1= this.heroList[aHero];
		item1= this.itemList[aId];
		if (item1.num> aNum){
			item1.num= item1.num- aNum;
		} else {
			this.itemList= this.itemList.slice(0, aId).concat(this.itemList.slice(aId+ 1));
		}
		if (item1.getItemDesc().kind== 2){
			// 使用类
			item1.useTo(hero1);
		} else if (item1.getItemDesc().kind== 1){
			// 装配类
			switch (item1.getItemDesc().type) {
				case 1: 
					this.addItem(hero1.changeWeapon(item1.index), 1);
					break;
				case 2: 
					this.addItem(hero1.changeArmor(item1.index), 1);
					break;
				case 3: 
					this.addItem(hero1.changeOrn(item1.index), 1);
					break;
			}
		}
	},
	addHero: function (id, lv){
		let h1= RPG.beget(RPG.HeroPlayer);
		h1.index= id;
		h1.setLevel(lv);
		h1.fullHeal();
		this.heroList.push(h1);
	},
	getHero: function(){
		if (this.heroList.length> 0){
			return this.heroList[0];
		} else {
			return RPG.HeroPlayer;
		}
	},
	getAliveHero: function(aId){
		if (aId< this.heroList.length && aId>=0 && this.heroList[aId].alive){
			return this.heroList[aId];
		} else {
			for (let i= 0; i< this.heroList.length; i++){
				if (this.heroList[i].alive) {
					return this.heroList[i];
				}
			}
		}
	},
	fullHeal: function(){
		for (let i= 0; i< this.heroList.length; i++){
			this.heroList[i].alive= true;
			this.heroList[i].fullHeal();
		}		
	},
	keepHp: function(){
		let hero1= this.heroList[0];
	},
	haveItem: function(aId){
		// 判断是否有某物品，无论是否被装配
		let item1, hero1;
		for (let i= 0; i< this.itemList.length; i++) {
			item1= this.itemList[i];
			if (item1.index== aId) {
				return true;
			}
		}
		// 物品表里没有，看装备情况
		for (let i= 0; i< this.heroList.length; i++){
			hero1= this.heroList[i];
			if (hero1.weapon== aId || hero1.armor== aId || hero1.ornament== aId){
				return true;
			}
		}
		//
		return false;
	},
	takeItem: function(aId){
		// 取走某物品，即使已经装配，一样取走，只取一个
		let item1, hero1;
		for (let i= 0; i< this.itemList.length; i++) {
			item1= this.itemList[i];
			if (item1.index== aId) {
				this.itemList= this.itemList.slice(0, i).concat(this.itemList.slice(i+ 1));
				return;
			}
		}
		// 物品表里没有，看装备情况
		for (let i= 0; i< this.heroList.length; i++){
			hero1= this.heroList[i];
			if (hero1.weapon== aId) {
				hero1.weapon= -1;
				return;
			} else if (hero1.armor== aId) {
				hero1.armor= -1;
				return;
			} else if (hero1.ornament== aId){
				hero1.ornament= -1;
				return;
			}
		}
	}
};