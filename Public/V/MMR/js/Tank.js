// 游戏玩家职业信息
let TankList= [
    {
        description: "不知道说些什么",
        fightPic: "黑色战车MMR",
        movePic: "黑色战车MMR",
        id: "1",
        name: "黑色战车",
        weight:9.6,
    },

];
let TankPlayer = {
    isHero: true,
    //角色昵称
    nickName:'',
    // 各种战斗信息
    Sp: 0,
    maxSp:0,
    alive: true,
    // 装备：武器、防具、装饰
    主炮: -1,
    副炮: -1,
    SE: -1,
    C装置:-1,
    引擎:-1,
    //是否在战场
    inFight: false,
    // 设置等级，直接影响的是上限值
    init:function(){
        this.maxSp = this.maxSp);
        this.defend = eval(this.defendCurve);
        this.maxHp = eval(this.maxHpCurve);
        this.maxExp = eval(this.maxExpCurve);
        this.drive = eval(this.driveCurve);
        this.speed = eval(this.speedCurve);
    },
    // 设置装甲值
    setSp:function(num){
        this.maxSp = num;
    },
    // 满回复
    fullSp:function(){
        this.Sp= this.maxSp;
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
	addSp: function(hit){
		this.Sp= this.Sp + hit;
		if (this.Sp>= this.maxSp) {
			this.Sp= this.maxSp;
		}
	},
	更换主炮: function(id){
		let a = this.主炮;
		this.主炮 = id;
		return Number(a);
	},
    更换副炮:function(id){
		let a= this.副炮;
		this.副炮= id;
		return Number(a);
	},
    更换SE:function(id){
		let a= this.SE;
		this.SE= id;
		return Number(a);
	},
    更换引擎:function(id){
        let a= this.引擎;
        this.引擎= id;
        return Number(a);
    },
    更换C装置:function(id){
        let a= this.C装置;
        this.C装置= id;
        return Number(a);
    },
	获取主炮:function(){
		return ItemList[this.主炮-1];
	},
	获取副炮:function(){
		return ItemList[this.副炮-1];
	},
    获取SE:function(){
        return ItemList[this.SE-1];
    },
    获取引擎:function(){
        return ItemList[this.引擎-1];
    },
    获取C装置:function(){
        return ItemList[this.C装置-1];
    },

};

