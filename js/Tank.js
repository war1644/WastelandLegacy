// 游戏玩家职业信息
let TankList= [
    {
        description: "不知道说些什么",
        fightPic: "黑色战车MMR",
        movePic: "黑色战车MMR",
        id: "1",
        name: "黑色战车",
        weight:13.0,
        defend:200,
    },
    {
        description: "我的最爱，1代蓝色战车",
        fightPic: "M1战车MM1",
        movePic: "M1战车MM1",
        id: "2",
        name: "M1战车MM1",
        weight:10.5,
        defend:120,
    },
    {
        description: "最初的战车，轻型坦克",
        fightPic: "59式战车",
        movePic: "59式战车",
        id: "3",
        name: "59式战车",
        weight:5,
        defend:60,
    },

];
let TankPlayer = {
    isHero: true,
    //角色昵称
    nickName:'',
    // 各种战斗信息
    Hp: 0,
    maxHp:0,
    alive: true,
    // 零件
    mainCannon: 15,
    subCannon: 16,
    SE: 18,
    CUnit:19,
    engine:20,
    //是否在战场
    inFight: false,
    maxWeight:0,
    maxDefend:0,
    itemList:[],
    // 设置等级，直接影响的是上限值
    initTank:function(){
        this.countTankInfo();
        this.fullHp();
    },
    countTankInfo:function () {
        let mainCannonObj = this.mainCannon>0 ? ItemList[this.mainCannon-1] : 0;
        let subCannonObj = this.subCannon>0 ? ItemList[this.subCannon-1] : 0;
        let SEObj = this.SE>0 ? ItemList[this.SE-1] : 0;
        let CUnitObj = this.CUnit>0?ItemList[this.CUnit-1]:0;
        let engineObj = this.engine>0?ItemList[this.engine-1]:0;
        //重量
        let mainCannonWeight = mainCannonObj ? mainCannonObj.weight:0;
        let subCannonWeight = subCannonObj ? subCannonObj.weight:0;
        let SEWeight = SEObj ? SEObj.weight:0;
        let CUnitWeight = CUnitObj?CUnitObj.weight:0;
        let engineWeight = engineObj?engineObj.weight:0;
        this.maxWeight = Number(mainCannonWeight)+Number(subCannonWeight)+Number(SEWeight)+Number(CUnitWeight)+Number(engineWeight)+Number(this.weight);
        //防御
        let mainCannonDefend = mainCannonObj?mainCannonObj.defend:0;
        let subCannonDefend = subCannonObj?subCannonObj.defend:0;
        let SEDefend = SEObj?SEObj.defend:0;
        let CUnitDefend = CUnitObj?CUnitObj.defend:0;
        let engineDefend = engineObj?engineObj.defend:0;
        this.maxDefend = Number(mainCannonDefend)+Number(subCannonDefend)+Number(SEDefend)+Number(CUnitDefend)+Number(engineDefend)+Number(this.defend);

        let max = engineObj ? engineObj.attack:0;
        this.maxHp = (Number(max) - this.maxWeight)*100;
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
        if (id < 1) return;
        let item = RPG.beget(Item);
        RPG.extend(item,ItemList[id-1]);
        this.itemList.push(item);
        if (visible) UI.showGetItem(id, num);
    },
    // 设置装甲值
    setHp:function(num){
        this.maxHp = num;
    },
    // 满回复
    fullHp:function(){
        this.Hp= this.maxHp;
    },
    //修理
    fixTank:function(){
        this.alive = true;
    },
	// 受攻击
	beHit: function(hit){
		hit = hit>>0;
		this.Hp= this.Hp- hit;
		if (this.Hp<= 0) {
			this.Hp= 0;
			this.alive= false;
		}
	},
	addHp: function(hit){
		this.Hp= this.Hp + hit;
		if (this.Hp>= this.maxHp) {
			this.Hp= this.maxHp;
		}
	},
	changeMainCannon: function(id){
        let a = this.mainCannon;
        if(a>0){
            this.maxDefend -= ItemList[a-1].defend;
        }
		this.mainCannon = id;
        if(id>0){
            this.maxDefend += ItemList[id-1].defend;
        }
		return Number(a);
	},
    changeSubCannon:function(id){
		let a= this.subCannon;
        if(a>0){
            this.maxDefend -= ItemList[a-1].defend;
        }
		this.subCannon= id;
        if(id>0){
            this.maxDefend += ItemList[id-1].defend;
        }
		return Number(a);
	},
    changeSE:function(id){
		let a= this.SE;
        if(a>0){
            this.maxDefend -= ItemList[a-1].defend;
        }
        if(id>0){
            this.maxDefend += ItemList[id-1].defend;
        }
		this.SE= id;
		return Number(a);
	},
    changeEngine:function(id){
        let a= this.engine;
        if(a>0){
            this.maxDefend -= ItemList[a-1].defend;
        }
        if(id>0){
            this.maxDefend += ItemList[id-1].defend;
        }
        this.engine = id;
        return Number(a);
    },
    changeCUnit:function(id){
        let a= this.CUnit;
        if(a>0){
            this.maxDefend -= ItemList[a-1].defend;
        }
        if(id>0){
            this.maxDefend += ItemList[id-1].defend;
        }
        this.CUnit= id;
        return Number(a);
    },
	getMainCannon:function(){
		return ItemList[this.mainCannon-1];
	},
	getSubCannon:function(){
		return ItemList[this.subCannon-1];
	},
    getSE:function(){
        return ItemList[this.SE-1];
    },
    getEngine:function(){
        return ItemList[this.engine-1];
    },
    getCUnit:function(){
        return ItemList[this.CUnit-1];
    },

};

