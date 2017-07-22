/**
 * 团队类
 * 包括团队物品，团队金钱,角色数据
 *
 **/
 
// 用户操作的主队
let PlayerTeam = {
    //物品列表
	itemList: [],
    //单位列表
	heroList: [],
	init: function (){
		this.itemList=[];
		this.heroList=[];
	},
	clear: function (){
		this.itemList=[];
		this.heroList=[];
	},
    /**
     * 使用物品
     * @param visible {boolean} 是否给出一个提示框，显示得到了哪些物品
     * @param id  {int} 物品序号
     * @param num  {int} 使用数量
     * @returns
     */
	addItem: function (id, num=1, visible=false){
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
		if (visible) UI.showGetItem(id, num);
	},
    /**
     * 使用物品
     * @param heroId {int} 人物序号
     * @param itemId  {int} 物品序号
	 * @param num  {int} 使用数量
     * @returns
     */
	removeItem: function(heroId, itemId, num){
		if (heroId<0 || itemId< 0 || heroId>= this.heroList.length || itemId>= this.itemList.length)  return;
		let item1;
		let hero1= this.heroList[heroId];
		item1= this.itemList[itemId];
		if (item1.num> num){
			item1.num= item1.num- num;
		} else {
			this.itemList= this.itemList.slice(0, itemId).concat(this.itemList.slice(itemId+ 1));
		}
		if (item1.getItemDesc().kind=== 2){
			// 使用类
			item1.useTo(hero1);
		} else if (item1.getItemDesc().kind=== 1){
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

    /**
     * 向队伍增加人物
     * @param id {int} 序号
     * @param lv  {int} 等级
	 * @param nick  {string} 等级
     * @returns
     */
	addHero: function (id, lv, nick='路漫漫'){
		let h1 = RPG.beget(HeroPlayer);
        h1.index = id;
        h1.nickName = nick;
		h1.setLevel(lv);
		h1.fullHeal();
		this.heroList.push(h1);
	},
    /**
     * 向队伍增加怪物
     * @param id {int} 序号
     * @param lv  {int} 等级
     * @returns
     */
    addEnemy: function (id, lv){
        let e1= RPG.beget(Enemy);
        console.log('e1',e1);
        e1.index = id;
        e1.setLevel(lv);
        e1.fullHeal();
        this.heroList.push(e1);
    },
    /**
     * 获取队伍主角
     */
	getHero: function(){
		if (this.heroList.length > 0){
			return this.heroList[0];
		} else {
			return HeroPlayer;
		}
	},
    /**
     * 检查id人物是否存活，返回
     */
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
    /**
     * 全队满血复活
     */
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
    /**
     * 取走某物品，即使已经装配，一样取走，只取一个
     */
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