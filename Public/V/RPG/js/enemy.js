/**
 * Created by Troy on 2016/9/13.
 */
var Enemy = enchant.Class.create(enchant.Sprite,{
    initialize:function(options) {
        enchant.Sprite.call(this,this.width,this.height);

        this.id = options.id;  //敌人ID
        this.name = options.name;   //敌人名称
        this.aliasName = ''; //编号
        this.image = options.image; //敌人图片
        this.width = options.width; //宽
        this.height = options.height;   //高
        this.scaleX = options.scaleX; //缩放比例
        this.scaleY = options.scaleY;
        this.hp = options.hp;   //hp
        this.attack = options.attack;   //攻击力
        this.defence = options.defence; //防御力
        this.hitRate = options.hitRate; //命中
        this.dodge = options.dodge; //闪避
        this.speed = options.speed; //速度
        this.isBoss = options.isBoss;   //是否boss
        this.skills = options.skills;   //技能(攻击方式)
        this.skillRate = options.skillRate; //技能触发率
        this.criticalStrike = options.criticalStrike;   //暴击率
        this.callBackUp = options.callBackUp;   //是否能呼叫增援
        this.backupEnemy = options.backupEnemy; //敌人增援的种类
        this.dead = false;  //是否死亡
        this.exp = options.exp; //能得到的经验值
        this.gp = options.gp;   //能得到的金钱
        this.drop = options.drop;   //掉落的道具
        this.dropRate = options.dropRate;   //掉落率
        this.escapeRate = options.escapeRate;   //敌人的逃跑机率
        this.escapeSuccess = options.escapeSuccess;    //敌人逃跑成功率

        this.actions = options.actions; //敌人的行动

        return this;
    },
    draw:function(x,y) {
        this.image = game.assets[this.image];    //怪物图片
        this.x = x;
        this.y = y;
        return this;
    },
    getCenterPoint:function() {
        return [this.x + this.width / 2,this.y + this.height / 2];
    },
    getSpeed:function () {
        return this.speed;
    },
    destroy:function() {
        let drop = Math.random() <= this.dropRate;
        return drop ? [this.exp,this.gp,this.drop[rand(this.drop.length)]] : [this.exp,this.gp];
    }

});

function enemyAction(player,callback) {
    battle.roundEnd = false;
    game.currentScene.removeChild(battle.damageInfo);

    new SoundManage('music15');

    let skill = this.skills[rand(this.skills.length)];
    let damage = hitStrength(skill.attack);
    let battleInfo = (this.aliasName || this.name) + skill.name +'!<br/>';
    let info = new textLabel(battleInfo,140,game.height-70+5,150,50);
    game.currentScene.addChild(info);

    battle.damageInfo = new textLabel(player.player.name +'损伤了'+damage+'!<br/>',140,game.height-70+5,150,50);
    player.hp -= damage;


    let oldX = this.x,
        oldY = this.y,
        p_oldX = battle.p1Battle.x,
        that = this,
        waitFor = this.age + 40;

    function enemyAttack() {
        if(that.age <= waitFor) {
            this.moveTo(oldX + 10,oldY);
            if(waitFor - that.age < 20) {
                battle.p1Battle.x = p_oldX + 10;
            }
            if(that.age === waitFor) new SoundManage('music16');
        } else {
            this.moveTo(oldX,oldY);
            battle.p1Battle.x = p_oldX;
            game.currentScene.removeChild(info);
            game.currentScene.addChild(battle.damageInfo);

            battle.p1Hp.text = 'HP '+player.hp;

            if(player.hp <= 0) {
                battle.p1Hp.text = 'HP0';
                gameOver();
                new SoundManage('lose',true);
                return;
            }

            that.removeEventListener('enterframe',enemyAttack);
            setTimeout(function() {
                battle.roundEnd = true;
                callback && callback();
            },1000);
        }
    }
    this.addEventListener('enterframe',enemyAttack);
}

var enemyConfig = {
    totalType:5, //总共有5种类型的敌人
    candidate:[0,1,2,3,4],  //全体敌人编号
    0:{//0号敌人
        id:0,
        name:'杀人虫',
        image:'enemy00',
        width:64,
        height:32,
        // scaleX:1.5,
        // scaleY:1.5,
        hp:11,
        attack:4,
        defence:5,
        hitRate:0.8,
        dodge:0.1,
        speed:2,
        criticalStrike:0.2,
        callBackUp:true,
        isBoss:false,
        skills:[
            {
                name:'撕咬',
                attack:5
            },
            {
                name:'猛扑',
                attack:6
            }
        ],
        skillRate:0.6,
        backupEnemy:[1,2,3,4],
        exp:3,
        gp:5,
        drop:[
            {name:'回复药',cost:'10G',description:'恢复少量生命值'},
            {name:'手雷',cost:'20G',description:'能对软体怪物造成大量伤害'}
        ],
        dropRate:0.3,
        escapeRate:0.1,
        escapeSuccess:0.5,
        actions:enemyAction
    },
    1:{//1号敌人
        id:1,
        name:'DNA食人虫',
        image:'enemy01',
        width:64,
        height:32,
        // scaleX:1.5,
        // scaleY:1.5,
        hp:11,
        attack:4,
        defence:5,
        hitRate:0.8,
        dodge:0.1,
        speed:11,
        criticalStrike:0.2,
        callBackUp:true,
        isBoss:false,
        skills:[
            {
                name:'吮吸',
                attack:5
            },
            {
                name:'猛扑',
                attack:6
            }
        ],
        skillRate:0.6,
        backupEnemy:[0,2,3,4],
        exp:3,
        gp:6,
        drop:[
            {name:'回复药',cost:'10G',description:'恢复少量生命值'},
            {name:'手雷',cost:'20G',description:'能对软体怪物造成大量伤害'}
        ],
        dropRate:0.3,
        escapeRate:0.1,
        escapeSuccess:0.5,
        actions:enemyAction
    },
    2:{//2号敌人
        id:2,
        name:'变形虫',
        image:'enemy02',
        width:64,
        height:32,
        // scaleX:1.5,
        // scaleY:1.5,
        hp:11,
        attack:4,
        defence:5,
        hitRate:0.8,
        dodge:0.1,
        speed:11,
        criticalStrike:0.2,
        callBackUp:true,
        isBoss:false,
        skills:[
            {
                name:'缠绕',
                attack:5
            },
            {
                name:'猛扑',
                attack:6
            }
        ],
        skillRate:0.6,
        backupEnemy:[0,2,3,4],
        exp:3,
        gp:6,
        drop:[
            {name:'回复药',cost:'10G',description:'恢复少量生命值'},
            {name:'手雷',cost:'20G',description:'能对软体怪物造成大量伤害'}
        ],
        dropRate:0.3,
        escapeRate:0.1,
        escapeSuccess:0.5,
        actions:enemyAction
    },
    3:{//3号敌人
        id:3,
        name:'寄生虫',
        image:'enemy03',
        width:64,
        height:32,
        // scaleX:1.5,
        // scaleY:1.5,
        hp:11,
        attack:4,
        defence:5,
        hitRate:0.8,
        dodge:0.1,
        speed:11,
        criticalStrike:0.2,
        callBackUp:true,
        isBoss:false,
        skills:[
            {
                name:'捕食',
                attack:5
            },
            {
                name:'注射',
                attack:6
            }
        ],
        skillRate:0.6,
        backupEnemy:[0,2,3,4],
        exp:3,
        gp:6,
        drop:[
            {name:'回复药',cost:'10G',description:'恢复少量生命值'},
            {name:'手雷',cost:'20G',description:'能对软体怪物造成大量伤害'}
        ],
        dropRate:0.3,
        escapeRate:0.1,
        escapeSuccess:0.5,
        actions:enemyAction
    },
    4:{//4号敌人
        id:4,
        name:'超导虫X',
        image:'enemy04',
        width:64,
        height:32,
        // scaleX:1.5,
        // scaleY:1.5,
        hp:11,
        attack:4,
        defence:5,
        hitRate:0.8,
        dodge:0.1,
        speed:2,
        criticalStrike:0.2,
        callBackUp:true,
        isBoss:false,
        skills:[
            {
                name:'捕食',
                attack:5
            },
            {
                name:'拍打',
                attack:6
            }
        ],
        skillRate:0.6,
        backupEnemy:[0,2,3,4],
        exp:3,
        gp:6,
        drop:[
            {name:'回复药',cost:'10G',description:'恢复少量生命值'},
            {name:'手雷',cost:'20G',description:'能对软体怪物造成大量伤害'}
        ],
        dropRate:0.3,
        escapeRate:0.1,
        escapeSuccess:0.5,
        actions:enemyAction
    },
    5:{
        id:4,
        name:'巨炮',
        image:'enemy05',
        width:96,
        height:96,
        // scaleX:1.5,
        // scaleY:1.5,
        hp:1000,
        attack:700,
        defence:500,
        hitRate:0.8,
        dodge:0.1,
        speed:15,
        criticalStrike:0.2,
        callBackUp:true,
        isBoss:true,
        skills:[
            {
                name:'连续击打',
                attack:20
            },
            {
                name:'挥舞触手',
                attack:15
            },
            {
                name:'超声波攻击',
                attack:18
            }
        ],
        skillRate:0.6,
        backupEnemy:[0,2,3,4],
        exp:10,
        gp:10,
        drop:[
            {name:'回复药',cost:'10G',description:'恢复少量生命值'},
            {name:'手雷',cost:'20G',description:'能对软体怪物造成大量伤害'}
        ],
        dropRate:0.3,
        escapeRate:0.1,
        escapeSuccess:0.5,
        actions:enemyAction
    }
};


//敌群
var enemyGroup = [
    {
        enemies:[0,1,2,3,4],    //可以出现的敌人编号
        exclude:[],             //这个数组里的敌人不出现
        min:1,                  //敌人最低出现的数量
        max:3                   //敌人最高出现的数量
    },
    {
        enemies:[],             //可以出现全部类型的敌人
        exclude:[0,1],          //除了0号和1号敌人
        min:2,
        max:5
    },
    {//boss
        enemies:[5],
        exclude:[],
        min:1,
        max:1
    }
];
