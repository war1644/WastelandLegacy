// 游戏玩家职业信息
let JobList= [
        {
            id: "1",
            name: "猎人",
            description: "战车驾驶技术一流，还会修理，肉搏也不弱，这不就是主角光环么？",
            movePic: "猎人",
            fightPic: "猎人",
            maxExpCurve: "(210 * Math.sqrt(lv) - 100 * lv + 50 * lv * lv - 110)>>0",
            maxHpCurve: "(200 * Math.sqrt(lv) - 1 * lv + 1 * lv * lv + 200)>>0",
            attackCurve: "(100 * Math.sqrt(lv) - 0.5 * lv + 0.1 * lv * lv - 60)>>0",
            defendCurve: "(44 * Math.sqrt(lv) - 0.09 * lv + 0.1 * lv * lv - 44)>>0",
            driveCurve: "(1 * Math.sqrt(lv) - 0.1 * lv + 0.1 * lv * lv - 1)>>0",
            speedCurve: "(1 * Math.sqrt(lv) - 0.1 * lv + 0.1 * lv * lv - 1)>>0",
            face: "face猎人"
        },
        {
            id: "2",
            name: "机械师",
            description: "修理MAX，还能战场修理，还能改造战车，绝对的辅助一把手",
            movePic: "机械师",
            fightPic: "机械师",
            maxExpCurve: "(210 * Math.sqrt(lv) - 100 * lv + 50 * lv * lv - 110)>>0",
            maxHpCurve: "(200 * Math.sqrt(lv) - 1 * lv + 1 * lv * lv + 200)>>0",
            attackCurve: "(60 * Math.sqrt(lv) - 0.5 * lv + 0.1 * lv * lv - 60)>>0",
            defendCurve: "(44 * Math.sqrt(lv) - 0.09 * lv + 0.1 * lv * lv - 44)>>0",
            driveCurve: "(1 * Math.sqrt(lv) - 0.1 * lv + 0.1 * lv * lv - 1)>>0",
            speedCurve: "(1 * Math.sqrt(lv) - 0.1 * lv + 0.1 * lv * lv - 1)>>0",
            face: "face机械师"
        },
        {
            id: "3",
            name: "战士",
            description: "肉搏强悍，但是也不可能与战车匹敌的，各种人武器玩的666.",
            movePic: "战士",
            fightPic: "战士",
            maxExpCurve: "(210 * Math.sqrt(lv) - 100 * lv + 50 * lv * lv - 110)>>0",
            maxHpCurve: "(200 * Math.sqrt(lv) - 1 * lv + 1 * lv * lv + 200)>>0",
            attackCurve: "(60 * Math.sqrt(lv) - 0.5 * lv + 0.1 * lv * lv - 60)>>0",
            defendCurve: "(44 * Math.sqrt(lv) - 0.09 * lv + 0.1 * lv * lv - 44)>>0",
            driveCurve: "(1 * Math.sqrt(lv) - 0.1 * lv + 0.1 * lv * lv - 1)>>0",
            speedCurve: "(1 * Math.sqrt(lv) - 0.1 * lv + 0.1 * lv * lv - 1)>>0",
            face: "face战士"
        }
];
let EnemyList= [
    {
        id: "11",
        price: "10",
        name: "巨蚁",
        skill: "",
        item: [21],
        row: "1",
        col: "1",
        fightPic: "巨蚁",
        isBoss: "0",
        inTank: "1",
        description: "大破坏后，核变生物，具有较强攻击性。"
    },
    {
        id: "12",
        price: "10",
        name: "杀人虫",
        skill: "",
        item: [21],
        row: "1",
        col: "1",
        fightPic: "杀人虫",
        isBoss: "0",
        inTank: "1",
        description: "大破坏后，核变生物，猎杀人类是其爱好。"
    },
        {
            id: "1",
            price: "10",
            name: "加农炮",
            skill: "",
            item: "",
            row: "1",
            col: "1",
            fightPic: "加农炮",
            isBoss: "0",
            inTank: "1",
            description: "大破坏前，军方常规大炮"
        },
        {
            id: "2",
            price: "10",
            name: "野战炮",
            skill: "",
            item: "",
            row: "1",
            col: "1",
            fightPic: "野战炮",
            isBoss: "0",
            inTank: "1",
            description: ""
        },
        {
            id: "3",
            price: "2000",
            name: "巨炮",
            skill: "",
            item: "",
            row: "1",
            col: "1",
            fightPic: "巨炮",
            isBoss: "1",
            inTank: "1",
            description: "大破坏前，军方防御型阵地大炮"
        },
        {
            id: "4",
            price: "100",
            name: "喽啰",
            skill: "",
            item: "",
            row: "1",
            col: "1",
            fightPic: "喽啰",
            isBoss: "0",
            inTank: "1",
            description: ""
        },
        {
            id: "6",
            price: "35",
            name: "亡灵士兵",
            skill: "",
            item: "",
            row: "1",
            col: "1",
            fightPic: "亡灵士兵",
            isBoss: "0",
            inTank: "1",
            description: ""
        },
        {
            id: "7",
            price: "1000",
            name: "毁灭战车",
            skill: "",
            item: "",
            row: "1",
            col: "1",
            fightPic: "毁灭战车",
            isBoss: "0",
            inTank: "1",
            description: ""
        },
        {
            id: "8",
            price: "2000",
            name: "戈麦斯",
            skill: "",
            item: "",
            row: "1",
            col: "1",
            fightPic: "戈麦斯",
            isBoss: "1",
            inTank: "1",
            description: ""
        },
        {
            id: "9",
            price: "10000",
            name: "沙漠之舟",
            skill: "",
            item: "",
            row: "1",
            col: "1",
            fightPic: "沙漠之舟",
            isBoss: "1",
            inTank: "1",
            description: "移动碉堡，强悍的防御和攻击让人生畏，但速度和智商感人"
        },
        {
            id: "10",
            price: "100",
            name: "老爹",
            skill: "",
            item: "",
            row: "1",
            col: "1",
            fightPic: "人物行走图/老爹",
            isBoss: "1",
            inTank: "1",
            description: "主角老爹"
        }
];
let HeroPlayer = {
    isHero: true,
    //角色昵称
    nickName:'',
    // 各种战斗信息
    Hp: 80,
    Sp: 0,
    maxSp:0,
    Level: 1,
    // 升级经验值
    Exp: 0,
    alive: true,
    // 装备：武器、衣服、防具
    weapon: -1,
    cloth: -1,
    armor: -1,
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
        this.maxHp = (200 * Math.sqrt(lv) - 1 * lv + 1 * lv * lv + 200)>>0;
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
	// 更换衣服
	changeCloth:function(id){
		let a = this.cloth;
		this.cloth = id;
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
    getCloth:function(){
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

