// 游戏玩家职业信息
let EnemyList= [
    {
        index:0,
        img:"巨炮",//movePic
		col:1,
		row:1,
        force:160,//力量
        mind:20,//智慧
        speed:120,//速度
        atk: 50,
        def: 50,
        hpAdd: 100,//等级血量增益
        description:["大破坏前，军方防御型阵地大炮"]
    },
    {
        index:1,
        col:1,
        row:1,
        img:"沙漠之舟",//movePic
        force:200,//力量
        mind:10,//智慧
        speed:10,//速度
        atk: 200,
        def: 200,
        hpAdd: 100,//等级血量增益
        description:["移动碉堡，强悍的防御和攻击让人生畏，但速度和智商感人"]
    },
];

let Enemy = {
	// 人物列表中人物编号
	index: 0,
    //角色昵称
	nickName:'',
    img:'',
	// 各种战斗信息
    force:0,//力量
    mind:0,//智慧
    speed:0,//速度
    atk: 0,
    def: 0,
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
    getPerson:function(){
        return EnemyList[this.index];
    },
    getName:function(){
        return this.nickName;
    },
    // 设置等级，直接影响的是上限值
    setLevel:function(lv){
        let person = this.getPerson();
        this.Level = lv;
        this.nickName = person.img;
        this.img = person.img;
        this.force = person.force;
        this.mind = person.mind;
        this.speed = person.speed;
        this.atk =  person.atk;
        this.def =  person.def;
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
    addHp:function(hit){
        hit= Math.ceil(hit);
        this.Hp= Number(this.Hp)+ Number(hit);
        if (this.Hp>= this.MaxHp) {
            this.Hp= this.MaxHp;
        }
        if (!this.alive) {
            // 补血后自动复活
            this.alive= true;
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

};

