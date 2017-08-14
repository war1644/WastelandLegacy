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
	tankList:[],
	//是否在战车内
	inTank:false,
    //钱钱
    money: 1000,
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
        id = Number(id);
		if (id < 0) return;
		let found= false;
		for (let i=0; i< this.itemList.length; i++) {
			if (this.itemList[i].id == id) {
				this.itemList[i].num = Number(this.itemList[i].num) + Number(num);
				found = true;
				break;
			}
		}
		if (!found) {
			let item = RPG.beget(Item);
			RPG.extend(item,ItemList[id-1]);
            item.num = num;
            this.itemList.push(item);
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
	useItem: function(heroId, itemId, num){
		if (heroId<0 || itemId< 0 || heroId>= this.heroList.length || itemId>= this.itemList.length)  return;
		let item1;
		let hero1= this.heroList[heroId];
		item1= this.itemList[itemId];
		if (item1.num> num){
			item1.num= item1.num- num;
		} else {
			this.itemList= this.itemList.slice(0, itemId).concat(this.itemList.slice(itemId+ 1));
		}

		switch (item1.type){
			case '1':
			case '3':
                // 装配类
                switch (item1.position) {
                    case '1':
                        this.addItem(hero1.changeWeapon(item1.id), 1);
                        break;
                    case '2':
                        this.addItem(hero1.changeArmor(item1.id), 1);
                        break;
                    case '3':
                        this.addItem(hero1.changeHand(item1.id), 1);
                        break;
                    case '4':
                        this.addItem(hero1.changeFoot(item1.id), 1);
                        break;
                    case '5':
                        this.addItem(hero1.changeHead(item1.id), 1);
                        break;
                }
                break;
			case '2':
			case '4':
                // 使用类
                if (item1.effect){
                    item1.effect = eval(item1.effect);
                	item1.effect(hero1);
                }
                break;
		}
	},

    /**
     * 取走某物品
     */
    delItem: function(index) {
        // 取走某物品
        let item1 = this.itemList[index];
        if (item1) {
            if (item1.num > 1) {
                item1.num = item1.num - 1;
            } else {
                this.itemList = this.itemList.slice(0, index).concat(this.itemList.slice(index + 1));
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
    addTank: function (id, lv, nick='路漫漫'){
        let h1 = RPG.beget(TankPlayer);
        RPG.extend(h1, JobList[id-1]);
        h1.nickName = nick;
        h1.setLevel(Number(lv));
        h1.fullHeal();
        this.heroList.push(h1);
    },
    /**
     * 向队伍增加战车
     * @param id {int} 序号
     * @param lv  {int} 等级
     * @param nick  {string} 等级
     * @returns
     */
    addHero: function (id, lv, nick='路漫漫'){
        let h1 = RPG.beget(HeroPlayer);
        RPG.extend(h1, JobList[id-1]);
        h1.nickName = nick;
        h1.setLevel(Number(lv));
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
        let e1 = RPG.beget(HeroPlayer);
        RPG.extend(e1, EnemyList[id-1]);
        e1.setEnemyLevel(Number(lv));
        e1.nickName = e1.fightPic;
        e1.isHero = false;
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
     * 检查id人物是否存活，返回队伍一个存活的玩家
     */
	getAliveHero: function(heroId){
		if (heroId < this.heroList.length
			&& heroId >= 0
			&& this.heroList[heroId].alive){
			return this.heroList[heroId];
		} else {
            // return false;
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
			// this.heroList[i].alive= true;
			this.heroList[i].fullHeal();
		}		
	},

	keepHp: function(){
	},

	haveItem: function(itemId){
		// 判断是否有某物品，无论是否被装配
		let item1, hero1;
		for (let i= 0; i< this.itemList.length; i++) {
			item1= this.itemList[i];
			if (item1.id== itemId) {
				return true;
			}
		}
		// 物品表里没有，看装备情况
		for (let i= 0; i< this.heroList.length; i++){
			hero1= this.heroList[i];
			if (hero1.weapon== itemId || hero1.armor== itemId || hero1.ornament== itemId || hero1.hand== itemId || hero1.foot== itemId || hero1.head== itemId){
				return true;
			}
		}
		//
		return false;
	},
    /**
     * 取走某物品，即使已经装配，一样取走，只取一个
     */
	takeItem: function(index){
		// 取走某物品，即使已经装配，一样取走，只取一个
		let item1, hero1;
        console.log('index',index);
        for (let i= 0; i< this.itemList.length; i++) {
			item1 = this.itemList[i];
			if (item1.id === index) {
                if (item1.num > 1){
                    this.itemList[i].num= item1.num- 1;
                } else {
                    this.itemList = this.itemList.slice(0, i).concat(this.itemList.slice(i+ 1));
                }
				return;
			}
		}
		// 物品表里没有，看装备情况
		for (let i= 0; i< this.heroList.length; i++){
			hero1= this.heroList[i];
			if (hero1.weapon=== index) {
				hero1.weapon= -1;
				return;
			} else if (hero1.armor=== index) {
				hero1.armor= -1;
				return;
			} else if (hero1.ornament=== index){
				hero1.ornament= -1;
				return;
			}
		}
	},
	/**
	 * 加钱
	 * */
	addMoney:function (num) {
		this.money += Number(num);
    },
	/**
	 * 减钱
	 * */
    reduceMoney:function (num) {
		this.money -= Number(num);
    },
};