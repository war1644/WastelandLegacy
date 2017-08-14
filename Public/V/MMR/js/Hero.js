// 游戏玩家职业信息
let JobList= [

];
let EnemyList= [

];
let HeroPlayer = {
    isHero: true,
    //角色昵称
    nickName:'',
    // 各种战斗信息
    Hp: 100,
    Sp: 0,
    maxSp:0,
    Level: 1,
    // 升级经验值
    Exp: 0,
    alive: true,
    // 装备：武器、防具、装饰
    weapon: -1,
    armor: -1,
    ornament: -1,
    hand:-1,
    foot:-1,
    head:-1,
	//是否在战车内
	inTank: false,
    //是否在战场
    inFight: false,
	// 设置等级，直接影响的是上限值
	setLevel:function(lv){
		this.Level = lv;
        this.attack = eval(this.attackCurve);
        this.defend = eval(this.defendCurve);
        this.maxHp = eval(this.maxHpCurve);
        this.maxExp = eval(this.maxExpCurve);
        this.drive = eval(this.driveCurve);
        this.speed = eval(this.speedCurve);
	},
    // 设置等级，直接影响的是上限值
    setEnemyLevel:function(lv){
        this.Level = lv;
        this.attack = (60 * Math.sqrt(lv) - 0.5 * lv + 0.1 * lv * lv - 60)>>0;
        this.defend = (44 * Math.sqrt(lv) - 0.09 * lv + 0.1 * lv * lv - 44)>>0;
        this.maxHp = (200 * Math.sqrt(lv) - 1 * lv + 1 * lv * lv - 200)>>0;
        this.maxExp= (210 * Math.sqrt(lv) - 230 * lv + 200 * lv * lv - 110)>>0;
        this.drive= (10 * Math.sqrt(lv) - 0.1 * lv + 0.1 * lv * lv - 10)>>0;
        this.speed= (10 * Math.sqrt(lv) - 0.1 * lv + 0.1 * lv * lv - 10)>>0;
    },
    // 设置装甲值
    setSp:function(num){
        this.maxSp = num;
    },
    // 满回复
    fullSp:function(){
        this.Sp= this.maxSp;
    },
	// 满回复
	fullHeal:function(){
		this.Hp= this.maxHp;
		// this.Sp= this.maxSp;
        this.alive = true;
	},
	// 受攻击，减血
	beHit: function(hit){
		hit = hit>>0;
		this.Hp= this.Hp- hit;
		if (this.Hp<= 0) {
			this.Hp= 0;
			this.alive= false;
		}
	},
	addHp:function(hp,name=false){
        if (!this.alive) {
            if (name==='再生丸'){
            	this.alive= true;
            } else {
                alert('再生丸或电击可复活队友');
            	return;
			}
        }
		hp = hp>>0;
		this.Hp= Number(this.Hp)+ Number(hp);
		if (this.Hp>= this.maxHp) {
			this.Hp= this.maxHp;
		}
	},
	addSp: function(hit){
		this.Sp= this.Sp + hit;
		if (this.Sp>= this.maxSp) {
			this.Sp= this.maxSp;
		}
	},
	// 增加经验值
	addExp: function(exp){
		exp = Math.ceil(exp);
		this.Exp = Number(this.Exp)+ Number(exp);
		while (this.Exp> this.maxExp) {
			this.setLevel(Number(this.Level)+ 1);
			this.Exp -= this.maxExp;
		}
	},
	// 更换武器
	changeWeapon: function(id){
		let a = this.weapon;
		this.weapon = id;
		return Number(a);
	},
	// 更换防具
	changeArmor:function(id){
		let a= this.armor;
		this.armor= id;
		return Number(a);
	},
	// 更换装饰
	changeOrn:function(id){
		let a= this.ornament;
		this.ornament= id;
		return Number(a);
	},
    // 更换手
    changeHand:function(id){
        let a= this.hand;
        this.hand= id;
        return Number(a);
    },
    // 更换装饰
    changeFoot:function(id){
        let a= this.foot;
        this.foot= id;
        return Number(a);
    },
    // 更换装饰
    changeHead:function(id){
        let a= this.head;
        this.head = id;
        return Number(a);
    },
	getWeapon:function(){
		return ItemList[this.weapon-1];
	},
	getArmor:function(){
		return ItemList[this.armor-1];
	},
    getOrn:function(){
        return ItemList[this.ornament-1];
    },
    getHand:function(){
        return ItemList[this.hand-1];
    },
    getFoot:function(){
        return ItemList[this.foot-1];
    },
    getHead:function(){
        return ItemList[this.head-1];
    },

};

