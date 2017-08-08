// 游戏玩家职业信息
let HeroList= [
	{
		index:0,
		img:"猎人",//movePic
		face:"face女猎人",//头像
        job:"猎人",//角色昵称
		force:100,//力量
		mind:80,//智慧
		speed:80,//速度
        attack: 30,
        defend: 30,
		lvAdd: 60,//等级增益系数
        skillList: [],// 技能列表
        description:"战车驾驶技术一流，还会修理，肉搏也不弱，这不就是主角光环么？",
	},
    {
        index:1,
        img:"机械师",//movePic
        face:"face女机械师",//头像
        job:"机械师",//职业
        force:80,//力量
        mind:150,//智慧
        speed:50,//速度
        attack: 20,
        defend: 20,
        lvAdd: 40,//等级血量增益
        skillList: [],// 技能列表
        description:"修理MAX，还能战场修理，还能改造战车，绝对的辅助一把手"
    },
    {
        index:2,
        img:"雷娜",//movePic
        face:"face雷娜",//头像
        job:"战士",//职业
        force:160,//力量
        mind:80,//智慧
        speed:120,//速度
        attack: 50,
        defend: 50,
        lvAdd: 100,//等级血量增益
        skillList: [],// 技能列表
        description:"肉搏强悍，但是也不可能与战车匹敌的，各种人武器玩的666."
    },
    {
        index:3,
        img:"黑色梅卡瓦",//movePic
        face:"face雷娜",//头像
        job:"战士",//职业
        force:160,//力量
        mind:80,//智慧
        speed:120,//速度
        attack: 50,
        defend: 50,
        lvAdd: 100,//等级血量增益
        skillList: [],// 技能列表
        description:"肉搏强悍，但是也不可能与战车匹敌的，各种人武器玩的666."
    },
];
let EnemyList= [
    {
        index:0,
        img:"巨炮",//movePic
        col:1,
        row:1,
        speed:120,//速度
        isTank:true,
        description:"大破坏前，军方防御型阵地大炮"
    },
    {
        index:1,
        col:1,
        row:1,
        img:"沙漠之舟",//movePic
        speed:10,//速度
        isTank:true,
        description:"移动碉堡，强悍的防御和攻击让人生畏，但速度和智商感人"
    },
    {
        index:2,
        img:"红色梅卡瓦",//movePic
        speed:245,//速度
        isTank:true,
        description:"初代最强NPC，有异意么？",
    },
];
let HeroPlayer = {
	// 人物列表中人物编号
    isHero: true,
    //角色昵称
    nickName:'',
    // 各种战斗信息
    Hp: 100,
    Sp: 0,
    Level: 1,
    Exp: 0,
    // 升级经验值
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
        this.attack = (60 * Math.sqrt(lv) - 0.5 * lv + 0.1 * lv * lv - 60)>>0;
        this.defend = (44 * Math.sqrt(lv) - 0.09 * lv + 0.1 * lv * lv - 44)>>0;
        this.maxHp = (200 * Math.sqrt(lv) - 1 * lv + 1 * lv * lv - 200)>>0;
        this.maxExp= (210 * Math.sqrt(lv) - 230 * lv + 200 * lv * lv - 110)>>0;
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
		this.weapon= id;
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
		return ItemList[this.weapon];
	},
	getArmor:function(){
		return ItemList[this.armor];
	},

};

