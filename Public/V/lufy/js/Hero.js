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
        atk: 30,
        def: 30,
		hpAdd: 60,//等级血量增益
        description:["战车驾驶技术一流，还会修理，肉搏也不弱，这不就是主角光环么？"]
	},
    {
        index:1,
        img:"机械师",//movePic
        face:"face女机械师",//头像
        job:"机械师",//职业
        force:80,//力量
        mind:150,//智慧
        speed:50,//速度
        atk: 20,
        def: 20,
        hpAdd: 40,//等级血量增益
        description:["修理MAX，还能战场修理，还能改造战车，绝对的辅助一把手"]
    },
    {
        index:2,
        img:"雷娜",//movePic
        face:"face雷娜",//头像
        job:"战士",//职业
        force:160,//力量
        mind:80,//智慧
        speed:120,//速度
        atk: 50,
        def: 50,
        hpAdd: 100,//等级血量增益
        description:["肉搏强悍，但是也不可能与战车匹敌的，各种人武器玩的666."]
    },
];
let HeroPlayer = {
	// 人物列表中人物编号
	index: 0,
    //角色昵称
	nickName:'',
	img:'',
	// 各种战斗信息
	Hp: 0,
	MaxHp: 0,
	Sp: 0,
	MaxSp: 0,
	Level: 1,
	Exp: 0,
    // 升级经验值
    maxExp: 100,
	alive: true,
	// 技能列表
	skillList: [],
	// 装备：武器、防具、装饰
	weapon: -1,
	armor: -1,
	ornament: -1,
	getPerson:function(){
		return HeroList[this.index];
	},
	getName:function(){
		return this.nickName;
	},

	getFace:function(){
		return HeroList[this.index].face;
	},
	// 设置等级，直接影响的是上限值
	setLevel:function(lv){
		let person = this.getPerson();
		this.Level = lv;
        this.img = person.img;
		this.MaxHp = 100 + person.hpAdd * lv;
        this.maxExp= this.MaxHp*2;
	},
    // 设置装甲值
    setSp:function(){
        this.MaxSp = 0;
    },
	// 满回复
	fullHeal:function(){
		this.Hp= this.MaxHp;
		this.Sp= this.MaxSp;
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
	addHp:function(hit,name=false){
        if (!this.alive) {
            if (name==='再生丸'){
            	this.alive= true;
            }else {
            	Fight.showInfo('再生丸或电击可复活队友');
            	return;
			}
            // 补血后自动复活
        }
		hit = hit>>0;
		this.Hp= Number(this.Hp)+ Number(hit);
		if (this.Hp>= this.MaxHp) {
			this.Hp= this.MaxHp;
		}
	},
	addSp: function(hit){
		hit= Math.ceil(hit);
		this.Sp= this.Sp+ hit;
		if (this.Sp>= this.MaxSp) {
			this.Sp= this.MaxSp;
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
		let a= this.weapon;
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
	getWeapon:function(){
		return ItemList[this.weapon];
	},
	getArmor:function(){
		return ItemList[this.armor];
	},

};

