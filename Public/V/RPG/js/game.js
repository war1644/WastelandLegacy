/**
 * Created by Troy on 2016/7/22.
 */
//游戏全局载入enchant
enchant();

var config = {
    spriteWidth:24,
    spriteHeight:24,
    scale:1.5,
    fps:30,
    mapWidth:14*24,
    mapHeight:16*24,
    keyA:0, //用于防止按键连续触发
    keyB:0, //防止连发
    inTank:false
},
    enemySign = {
    0:'A',
    1:'B',
    2:'C',
    3:'D',
    4:'E',
    5:'F',
    6:'G',
    7:'H'
},
    signBit = {
    '3':'up',
    '0':'down',
    '1':'left',
    '2':'right'
},
    key = {
    'up':87,
    'down':83,
    'left':65,
    'right':68,
    'a':74,
    'b':75,
    'i':73
},
    keyD = {
    'up':3,
    'down':0,
    'left':1,
    'right':2
},
    dialogDirection = {
    0:3,    //下
    1:2,    //左
    2:1,    //右
    3:0     //上
};

//游戏初始化
window.onload = function () {

    window.g = new Game(480,320);
    g.resource = {
        'home2_0':'./images/assets/home2_0.png',
        'home2_1':'./images/assets/home2_1.png',
        'home1_0':'./images/assets/home1_0.png',
        'home1_1':'./images/assets/home1_1.png',
        'baseMap':'./images/map.png',
        'player1':'./images/player.png',
        'player1_battle':'./images/player_battle.png',
        'weapon01':'./images/weapon01.png',
        'ammo':'./images/ammo.png',
        'explosion':'./images/explosion.png',
        'music01':'./bgm/map.mp3',
        'music02':'./bgm/shop.mp3',
        'music04':'./bgm/boss.mp3',
        'music05':'./bgm/Walk Down.mp3',
        'music06':'./bgm/town.mp3',
        'music07':'./bgm/enemy.mp3',
        'music08':'./bgm/town2.mp3',
        'music09':'./bgm/battle.mp3',
        'music10':'./bgm/shop2.mp3',
        'music11':'./bgm/appear.mp3',
        'music12':'./bgm/sound_wp01.mp3',
        'music13':'./bgm/explosion.mp3',
        'music14':'./bgm/escape.mp3',
        'music15':'./bgm/collapse.mp3',
        'music16':'./bgm/cut.mp3',
        'music17':'./bgm/break.mp3',
        'select':'./bgm/select.mp3',
        'lose':'./bgm/lose.mp3',
        'message':'./bgm/message.wav',
        'buy':'./bgm/buy.mp3',
        'gameover':'./images/end.png',
        'cursor':'./images/cursor.png',
        'triangle_up':'./images/up.png',
        'triangle_down':'./images/down.png',
        'spBg':'./images/label.png',
        'townMap':'./images/map1.png',
        'aBtn':'./images/A.png',
        'npc01':'./images/npc.png',
        'npc02':'./images/npc2.png',
        'npc03':'./images/npc3.png',
        'npc04':'./images/npc4.png',
        'npc05':'./images/npc5.png',
        'enemy00':'./images/m010.gif',
        'enemy01':'./images/m011.gif',
        'enemy02':'./images/m012.gif',
        'enemy03':'./images/m013.gif',
        'enemy04':'./images/m014.gif',
        'enemy05':'./images/boss.gif'
    };
    var rpg = new RPG_Game({
        resource:g.resource //游戏资源
    });
};

function RPG_Game() {
    return this.init.apply(this,arguments);
}

RPG_Game.prototype = {
    constructor:RPG_Game,
    init:function (options) {
        this.resource = options.resource;
        //上一次播放的背景音乐
        g.prevBGM = null;
        //当前背景音乐
        g.curBGM = g.resource['music01'];
        //角色清单
        g.playerList = [];
        //npc清单
        g.npcList = {
            "bigMap":{
                "npc":[]
            },
            "desertTown":{
                "npc":[]
            },
            //道具商店
            "desertTown_scene01":{
                "npc":[],
                //商品列表
                "commodity":[
                    {name:'回复药',cost:'10G',description:'恢复少量生命值',scene:'battle'},
                    {name:'中回复药',cost:'15G',description:'恢复一定生命值',scene:'battle'},
                    {name:'大回复药',cost:'20G',description:'恢复大量生命值',scene:'battle'},
                    {name:'手雷',cost:'20G',description:'能对软体怪物造成大量伤害',scene:'battle'}
                ],
                "commodity2":[
                    {name:'小刀',cost:'10G',attack:5,description:'切水果用的刀'},
                    {name:'匕首',cost:'15G',attack:7,description:'格斗用的锋利匕首'},
                    {name:'大马士革刀',cost:'20G',attack:10,description:'弯刀'},
                    {name:'拳套',cost:'25G',attack:12,description:'能打出爆发性的一击'},
                    {name:'手枪',cost:'50G',attack:15,description:'一把普通的枪'},
                    {name:'短枪',cost:'70G',attack:16,description:'射速极快的手枪'},
                    {name:'迫击炮',cost:'100G',attack:20,description:'军用武器'},
                    {name:'RPG',cost:'120G',attack:25,description:'榴弹发射器'},
                    {name:'激光炮',cost:'150G',attack:30,description:'未来高科技武器'},
                    {name:'卫星轨道炮',cost:'20000G',attack:50,description:'传说中大破坏后留下的武器,效果不明'}
                ]
            },
            //战车商店
            "desertTown_scene02":{
                "npc":[],
                //商品列表
                "commodity":[
                    {name:'装甲包',cost:'100G',description:'补充少量装甲',scene:'battle'},
                    {name:'中装甲药',cost:'300G',description:'补充部分量装甲',scene:'battle'},
                    {name:'大装甲药',cost:'600G',description:'补充大量装甲',scene:'battle'},
                    {name:'传真',cost:'2000G',description:'传送到各地方的装置'}
                ],
                "commodity2":[
                    {name:'55炮',cost:'10000G',attack:50,description:'55mm口径主炮'},
                    {name:'85炮',cost:'15000G',attack:70,description:'85mm口径主炮'},
                    {name:'105炮',cost:'20000G',attack:100,description:'105mm口径主炮'},
                    {name:'125炮',cost:'25000G',attack:120,description:'125mm口径主炮'},
                    {name:'155炮',cost:'50000G',attack:150,description:'155mm口径主炮'},
                    {name:'165炮',cost:'70000G',attack:160,description:'165mm口径主炮'},
                    {name:'185炮',cost:'100000G',attack:200,description:'185mm口径主炮'},
                    {name:'205炮',cost:'120000G',attack:250,description:'205mm口径主炮'},
                    {name:'220炮',cost:'150000G',attack:300,description:'220mm口径主炮'},
                    {name:'225炮',cost:'20000000G',attack:500,description:'225mm口径主炮'}
                ]
            }
        };
        //在某方向上停止行动
        g.dirDeny = {
            'up':false,
            'right':false,
            'down':false,
            'left':false
        };
        //地图清单
        g.mapList = {
            "bigMap":[],
            "desertTown":[],
            "desertTown_scene01":[],
            "desertTown_scene02":[]
        };
        //地图标识
        g.mapCode = mapCode['bigMap'];
        //初始设定
        g.spriteWidth = config.spriteWidth;
        g.spriteHeight = config.spriteHeight;
        g.scale = config.scale;
        g.fps = config.fps;

        //键位绑定
        this.bindKey(g);
        //预加载资源
        this.preload(g.resource);

        g.addEventListener('load',function() {
            var map = setWorldMap();

           g.playerList.push(new Player({
                startingX:4,
                startingY:5,
                playerImage:g.resource['player1'],
                map:map[0],
                defaultAttributes:Player.p1Attributes
            }));

            window.p1 = g.playerList[0];

            g.gp = p1.player.gp;    //金钱
            g.exp = p1.player.exp;  //经验值
            p1.hp = p1.maxHp = p1.getHp();
            g.item_p1 = p1.player.items;    //角色一物品
            g.encounter = true; //可以遇敌

            //播放音乐
            // var music01 = new SoundManage(g.curBGM,true);
            //addBattleScene();
            //新建场景
            var scene = new Scene();
            //新增一组节点
            var stage = addToStage([map[0],p1.player]);

            //节点塞入场景
            scene.addChild(stage);
            //文字添加
            var label = new Label("test");
            scene.addChild(label);
            //显示到屏幕
            g.pushScene(scene);

            g.playerList[0].player.on('enterframe',function() {
                if(this.stop) return;
                g.playerList[0].move();
                var playerPos = {
                    x:g.playerList[0].square().x * config.spriteWidth,
                    y:g.playerList[0].square().y * config.spriteHeight,
                    tileX: g.playerList[0].square().x,
                    tileY: g.playerList[0].square().y,
                    face:g.playerList[0].facingSquare()
                };

                if(g.mapCode === mapCode['desertTown']) {
                    if(g.npcList["desertTown"]["npc"].length) {
                        var hasObstacle = hasObstacleAround(g.playerList[0]).filter(function(o){
                                return typeof o === 'string';
                            }),
                            obstacleLen = hasObstacle.length;

                        for(var i in g.dirDeny) {
                            if(g.dirDeny.hasOwnProperty(i)) g.dirDeny[i] = false;
                        }
                        while(obstacleLen--) {
                            g.dirDeny[hasObstacle[obstacleLen]] = true;
                        }
                    }
                    //进入道具商店
                    var enterShop = gameEv.findTile(playerPos.tileX,playerPos.tileY,g.mapCode);
                    if(enterShop && p1.player.x % 32 === 0 && p1.player.y % 32 === 0) {
                        enterShop.action();
                    }
                }

                if(g.mapCode === mapCode['desertTown_scene01']) {
                    if(g.npcList["desertTown_scene01"]["npc"].length) {
                        hasObstacle = hasObstacleAround(g.playerList[0]).filter(function(o){
                            return typeof o === 'string';
                        });
                        obstacleLen = hasObstacle.length;

                        for(var i in g.dirDeny) {
                            if(g.dirDeny.hasOwnProperty(i)) g.dirDeny[i] = false;
                        }
                        while(obstacleLen--) {
                            g.dirDeny[hasObstacle[obstacleLen]] = true;
                        }
                    }
                }

                if(g.mapCode === mapCode['desertTown_scene02']) {
                    if(g.npcList["desertTown_scene02"]["npc"].length) {
                        hasObstacle = hasObstacleAround(g.playerList[0]).filter(function(o){
                            return typeof o === 'string';
                        });
                        obstacleLen = hasObstacle.length;

                        for(var i in g.dirDeny) {
                            if(g.dirDeny.hasOwnProperty(i)) g.dirDeny[i] = false;
                        }
                        while(obstacleLen--) {
                            g.dirDeny[hasObstacle[obstacleLen]] = true;
                        }
                    }
                }

                if(g.mapCode === mapCode['bigMap']) {
                    //进出场景
                    toggleScene(this,map[2],playerPos);
                }

                //处理按下A键的情况
                if(g.input.a){
                    config.keyA++;
                } else {
                    config.keyA = 0;
                }
                if(config.keyA === 1) {//仅当值为1时触发
                    new SoundManage(g.resource['select']);
                    var facingSquare = p1.facingSquare();
                    if(facingSquare) {
                        //找玩家附近是否有事件
                        var evTile = gameEv.findTile(facingSquare.x,facingSquare.y,g.mapCode);
                        evTile && evTile.action();

                        var npc = g.npcList[g.mapCode].npc;

                        npc.forEach(function(o) {
                            if(o.tileX === facingSquare.x &&
                                o.tileY === facingSquare.y &&
                                o.x % 32 === 0 && o.y % 32 === 0 &&
                                p1.player.isMoving === false) {
                                o.action();
                            } else if(p1.map.hitTest(facingSquare.x * 32,facingSquare.y * 32) &&
                                o.facingSquare().x === facingSquare.x &&
                                o.facingSquare().y === facingSquare.y &&
                                o.x % 32 === 0 && o.y % 32 === 0 &&
                                p1.player.isMoving === false &&
                                (p1.player.x === o.x || p1.player.y === o.y)) {
                                //隔着障碍物也能对话
                                o.action();
                            }
                        });
                    }
                }

                //镜头跟随角色
                setCamera(config.mapWidth,config.mapHeight,g.playerList,scene);
            });


        });

        g.start();
    },
    /**
     * 绑定键位
     * @param gameObject {Object} 游戏对象
     */
    bindKey:function(gameObject) {
        gameObject.keybind(key['a'],'a');
        gameObject.keybind(key['b'],'b');
        gameObject.keybind(key['i'],'i');
        gameObject.keybind(key['up'],'up');
        gameObject.keybind(key['down'],'down');
        gameObject.keybind(key['left'],'left');
        gameObject.keybind(key['right'],'right');
    },
    /**
     * 预加载资源
     * @param resource {Object} 游戏资源
     */
    preload:function(resource) {
        for(var i in resource) {
            if(resource.hasOwnProperty(i)) g.preload(resource[i]);
        }
    }
};



/**
 * 创建提示路标
 * @type {Sprite}
 */
var SignPostLabel = Class.create(Sprite,{
    initialize:function(text,callback) {
        enchant.Sprite.call(this,200,35);

        this.spAge = this.age + 30;
        this.callback = callback;
        this.x = (g.width - this.width) / 2;
        this.y = (g.height - this.height) / 2;

        var surface = new Surface(200,35);
        this.image = surface;
        surface.draw(g.assets[g.resource["spBg"]]); //获取背景图片

        var ctx = surface.context;

        //设置文字样式
        ctx.fillStyle = '#fff';
        ctx.shadowColor = "#707070";
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.font = '24px 黑体';

        var w = surface.context.measureText(text).width,
            x = (surface.width - w) / 2;

        ctx.fillText(text,x,26);

        var scene = new Scene();
        scene.addChild(this);
        g.pushScene(scene);

        return this;
    },
    onenterframe:function() {
        if(this.age > this.spAge) {
            if(this.opacity > 0.3) {
                this.opacity -= 0.03;
                if(this.opacity < 0.8) this.y += 2;
            } else {
                g.popScene();
                this.callback && this.callback.apply(this,arguments);
            }
        }
    }
});




/**
 * 设置camera
 * @param mapWidth {number} 地图宽度
 * @param mapHeight {number} 地图高度
 * @param playerList {Array} player清单
 * @param stage {Object} 场景中对象的组合
 */
function setCamera(mapWidth,mapHeight,playerList,stage) {
    var x = Math.min((g.width - config.spriteWidth) / 2 - playerList[0].player.x,0);
    var y = Math.min((g.height - config.spriteHeight) / 2 - playerList[0].player.y,0);

    x = Math.max(g.width, x + mapWidth) - mapWidth;
    y = Math.max(g.height, y + mapHeight) - mapHeight;

    stage.x = x;
    stage.y = y;
}

/**
 * 设置大地图
 */
function setWorldMap() {
    //绘制大地图
    var bigMap = new MapManage({
        image:g.resource['baseMap'],
        //地形map
        mapJs:baseMap[0],
        hasCollision:true,
        //碰撞map
        rulesMap:baseMap[1],
        collistionRules:[171,172,173,174,66,176,177,179,168,169,180,192,193,197,205,208,74]
    });

    //绘制地图上的物件
    var frontMap = new MapManage({
        image:g.resource['baseMap'],
        mapJs:baseMap[1]
    });

    var town = new Town({
        width:64,
        height:32,
        tileX:4,
        tileY:4,
        coordinate:[
            {x:4 * config.spriteWidth,y:4 * config.spriteHeight},
            {x:5 * config.spriteWidth,y:4 * config.spriteHeight}
        ]
    });

    g.mapList.bigMap.push(bigMap);
    g.mapList.bigMap.push(frontMap);
    g.mapList.bigMap.push(town);
    return [bigMap,frontMap,town];
}

//设置沙漠镇地图
function setDesertTownMap() {
    var map = new MapManage({
        image:g.resource['townMap'],
        mapJs:townMap[0],
        hasCollision:true,
        rulesMap:townMap[1],
        collistionRules:[54,130,296,297,304,268,298,299,300,306,307,308,312,316,59,45]
    });

    var frontMap = new MapManage({
        image:g.resource['townMap'],
        mapJs:townMap[1]
    });
    if(!g.mapList.desertTown.desertTown) {
        g.mapList.desertTown.push(map);
        g.mapList.desertTown.push(frontMap);
        g.mapList.desertTown.desertTown = 1;
    }
    return [map,frontMap];
}

//沙漠小镇道具商店
function setDesertTownShopMap() {
    var map = new MapManage({
        image:g.resource['townMap'],
        mapJs:townMap[2],
        hasCollision:true,
        rulesMap:townMap[3],
        collistionRules:[24,16,17,111,125,126,127,175,167,117,118,119,25,130,116,124,144,32,33,34,40,41,42]
    });

    var frontMap = new MapManage({
        image:g.resource['townMap'],
        mapJs:townMap[3]
    });

    if(!g.mapList.desertTown_scene01.shop) {
        g.mapList.desertTown_scene01.push(map);
        g.mapList.desertTown_scene01.push(frontMap);
        g.mapList.desertTown_scene01.shop = 1;
    }

    return [map,frontMap];
}

//沙漠小镇战车商店
function setDesertTownShop2Map() {
    var map = new MapManage({
        image:g.resource['townMap'],
        mapJs:townMap[4],
        hasCollision:true,
        rulesMap:townMap[4],
        collistionRules:[264,225,130]
    });

    if(!g.mapList.desertTown_scene02.shop) {
        g.mapList.desertTown_scene02.push(map);
        g.mapList.desertTown_scene02.shop = 1;
    }

    return [map];
}

/**
 * 添加场景
 * @param obj {Object} 单个场景或一组场景
 */
function addToStage(obj) {
    var stage = new Group();
    if(!obj.length) {
        stage.addChild(obj);
    }
    else {
        for(var i = 0; i < obj.length; i++) {
            stage.addChild(obj[i]);
        }
    }

    return stage;
}

logOnce.run = false;
function logOnce() {
    if(!logOnce.run) {
        logOnce.run = true;
        return console.log.apply(console,arguments);
    }
}

//创建小镇
var Town = Class.create(Sprite,{
    initialize:function(options) {
        enchant.Sprite.call(this,options.width || config.spriteWidth,options.height || config.spriteHeight);
        this.x = options.tileX * config.spriteWidth;
        this.y = options.tileY * config.spriteHeight;
        //坐标
        this.coordinate = options.coordinate;
        this.enter = false;
        return this;
    }
});

//检查角色坐标
function checkCoodinate(player,obj) {
    for(var i = 0; i < obj.coordinate.length; i++) {
        var c = obj.coordinate[i];
        if(player.x === c.x && player.y === c.y) {
            return true;
        }
    }
    return false;
}

//进出场景
function toggleScene(player,scene,pos) {
    //可以站在场景出入口
    if(checkCoodinate(player,scene)) {
        if(scene.enter) return;
        var enterScene = gameEv.findTile(pos.tileX,pos.tileY,g.mapCode);

        if(enterScene) {
            //从场景出来时踩在进出口时可以避免再次进入，直到移动后
            scene.enter = true;
            enterScene.action();
        }
    }
    if(!checkCoodinate(player,scene) && g.mapCode === mapCode['bigMap']) {
        scene.enter = false;
    }
}


//创建NPC
function createNPC(options) {
    return new NPC({
        tileX:options.tileX,
        tileY:options.tileY,
        standing:options.standing,
        canPush:options.canPush,
        specialMove:options.specialMove,
        image:g.resource[options.imageName],
        direction:options.direction,
        specialAction:options.specialAction,
        beforeSpecialAction:options.beforeSpecialAction,
        afterSpecialAction:options.afterSpecialAction,
        specialActionStart:options.specialActionStart,
        stay:options.stay,
        action:options.action,
        sells:options.sells
    });
}

//查找对话id
function findDialogByID(id,type) {
    var data = null;
    if(type === 'npcID') {
        dialogue.some(function(o) {
            if(o.npcID === id) {
                data = o;
                return false;
            }
        });
        return data;
    }
    if(type === 'dialogID') {
        dialogue.some(function(o) {
            if(o.dialogID === id) {
                data = o;
                return false;
            }
        });
        return data;
    }
}



function rand(n) {
    return (Math.random() * n) >> 0;
}

function rangeRand(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//判断玩家周围是否有NPC
function hasObstacleAround(player) {
    var character = player.player;
    var around = {
        'up':{x:character.x,y:character.y - 32},
        'down':{x:character.x,y:character.y + 32},
        'left':{x:character.x - 32,y:character.y},
        'right':{x:character.x + 32,y:character.y}
    };

    var ret = [];
    //获取相应地图内的npc集合
    var npc = g.npcList[g.mapCode].npc;

    for(var i in npc) {
        var x = npc[i].x,
            y = npc[i].y,
            canPush = npc[i].canPush;

        for(var j in around) {
            if((x === around[j].x && y === around[j].y)) {
                if(canPush) ret.push({canPush:j});
                else ret.push(j);
            }
        }
    }
    //返回up、down、left、right中的一个或数个
    //表示在该方位有NPC
    return ret;
}

/**
 * 创建对话场景
 * @param scene 场景
 * @param npc npc对象
 */
function createDialogScene(scene,npc) {
    //对话时改变npc的朝向，使其面向玩家
    npc.frame = dialogDirection[p1.player.direction] * 4;
    //如果场景存在，则退出场景
    if(scene) g.popScene();
    //新建场景
    scene = new Scene();

    //对话文字背景
    var msgBg = new Sprite(g.width,150);
    msgBg.x = 0;
    msgBg.y = 300;
    msgBg.backgroundColor = 'black';
    msgBg.opacity = 1;

    //按键闪烁
    var aBtn = new confirmBtn();

    //文本容器
    var label = new Label();
    label.width = 600;
    label.height = 150;
    label.font = '14px Microsoft YaHei';
    label.color = '#fff';
    label.x = 10;
    label.y = 310;

    scene.addChild(msgBg);
    scene.addChild(aBtn);
    scene.addChild(label);

    return [scene,label,aBtn];
}

/**
 * 处理npc对话
 * @param dialogID npcID npc01、npc02、npc03
 * @param type 查找类型 (根据dialogID查找，根据npcID查找)
 * @param npc this
 * @param scene tempScene
 */
function displayDialog(id,type,npc,scene) {
    var dialog = findDialogByID(id,type),  //获取相应的对话
        start = dialog.startIndex,  //对话从哪个索引开始
        i = start,
        tmpText = '',   //每帧显示的临时文本
        keyCount = 0,   //防止连发
        face = npc.direction,
        op;

    scene[0].addEventListener('enterframe',function() {
        var message = 'dialog_'+ i,
            text = dialog[message].text;

        //若文本未显示完
        if(tmpText.length < text.length) {
            //如果按下了A键并且文本长度大于1
            if(g.input.a && tmpText.length > 1) {
                if(keyCount++ === 1) {
                    //瞬间显示文本
                    tmpText = text;
                    scene[1].text = (dialog.name.length ? (dialog.name + '：<br/>') : '') + tmpText;
                }
            } else {
                keyCount = 0;
            }
            //若没有按下A键，则逐帧显示文本(打字机效果)
            if(this.age % 2 === 0 && !g.input.a && tmpText.length < text.length) {
                tmpText = text.substr(0, tmpText.length + 1);
                scene[1].text = (dialog.name.length ? (dialog.name + '：<br/>') : '') + tmpText;
                //文本显示时播放声音
                new SoundManage(g.resource['message']);
            }
        } else {//文本已完全显示，则进入下一段对话
            if(!dialog[message].options) {//无对话选项
                if (dialog[message].nextDialog !== -1) {
                    if (g.input.a) {
                        if (keyCount++ === 1) {
                            tmpText = '';
                            i = dialog[message].nextDialog;
                        }
                    } else {
                        keyCount = 0;
                    }
                } else {//若没有下一段对话了
                    if (g.input.a) {
                        if (keyCount++ === 1) {
                            g.popScene();   //退出场景
                            //根据设置随机选取对话
                            if(dialog[message].random) {
                                dialog.startIndex =
                                    dialog[message].random[Math.random()*dialog[message].random.length>>0];
                            } else {
                                i = start;  //重置段落计数器
                            }
                            tmpText = '';   //重置临时文本
                            scene[0] = null;   //重置场景
                            npc.frame = face * 4;   //将npc朝向还原为之前的状态
                        }
                    } else keyCount = 0;
                }
            } else {//有对话选项
                if(!scene.choice) {//首次运行时添加场景
                    op = dialog[message].options;
                    //创建选项
                    scene.choice = new choiceText(op, 35, 350);
                    g.currentScene.addChild(scene.choice);
                } else {//再次运行时监听是否按下确认键
                    if (g.input.a) {
                        if(keyCount++ === 1) {
                            //得到玩家的回答
                            var select = scene.choice.cursor.selected;

                            //满足条件
                            if(op[select].nextDialog !== -1) {
                                if(op[select].condition) {
                                    if(eval(op[select].condition)) {//判断是否满足条件
                                        tmpText = '';
                                        i = op[select].nextDialog;
                                        g.currentScene.removeChild(scene.choice);
                                        scene.choice = null;
                                        op[select].callback && op[select].callback();
                                    } else {
                                        tmpText = '';
                                        i = op[select].failDialog;
                                        g.currentScene.removeChild(scene.choice);
                                        scene.choice = null;
                                    }
                                } else {
                                    tmpText = '';
                                    i = op[select].nextDialog;
                                    g.currentScene.removeChild(scene.choice);
                                    scene.choice = null;
                                }
                            }
                        }
                    } else keyCount = 0;
                }
            }
        }
    });
}

function Deal(npcID,type,npc,scene,itemList) {
    var dialog = findDialogByID(npcID,type),
        start = dialog.startIndex,
        i = start,
        tmpText = '',
        keyCount = 0,   //防止连发
        face = npc.direction,
        op;

    scene[0].addEventListener('enterframe',function() {
        disPlayGold();
        var message = 'dialog_' + i,
            text = dialog[message].text;

        if(tmpText.length < text.length) {
            if(g.input.a && tmpText.length > 1) {
                if(keyCount++ === 1) {
                    //瞬间显示文本
                    tmpText = text;
                    scene[1].text = tmpText;
                }
            } else {
                keyCount = 0;
            }
            //若没有按下A键，则逐帧显示文本(打字机效果)
            if(this.age % 2 === 0 && !g.input.a && tmpText.length < text.length) {
                tmpText = text.substr(0, tmpText.length + 1);
                scene[1].text = tmpText;
                //文本显示时播放声音
                new SoundManage(g.resource['message']);
            }
        } else {//文本已完全显示
            if(!dialog[message].options) {//无对话选项
                if(scene.callback) {//买
                    dialog["dialog_"+i].callback(itemList,scene,dialog);
                    scene.callback = false;
                    tmpText = '';
                    i = dialog["dialog_"+i].failDialog;
                }
                if(scene.callback2) {//卖
                    dialog["dialog_"+i].callback(itemList,scene,dialog);
                    scene.callback2 = false;
                    tmpText = '';
                    i = dialog["dialog_"+i].failDialog;
                }
                if (dialog[message].nextDialog === -1) {
                    scene[2].visible = true;    //恢复显示闪烁的A按键
                    if (g.input.a) {
                        if (keyCount++ === 1) {
                            g.popScene();
                            i = start;
                            tmpText = '';   //重置临时文本
                            scene[0] = null;   //重置场景
                            npc.frame = face * 4;   //将npc朝向还原为之前的状态
                        }
                    } else keyCount = 0;
                }
            } else {
                if(!scene.choice) {//首次创建选项
                    op = dialog[message].options;
                    //创建选项
                    scene.choice = new choiceText2(op, 35, 10);
                    scene[2].visible = false;//隐藏闪烁的A按键
                    g.currentScene.addChild(scene.choice);
                } else {//再次进入则监听按键
                    var select; //玩家选择
                    if(g.input.b) {//按B键退出
                        if(keyCount++ === 1) {
                            select = op.length - 1;
                            tmpText = '';
                            i = op[select].failDialog;
                            g.currentScene.removeChild(scene.choice);
                            scene.choice = null;
                        }
                    } else if(g.input.a) {
                        if(keyCount++ === 1) {
                            select = scene.choice.cursor.selected;
                            if(op[select].nextDialog !== -1) {
                                tmpText = '';
                                i = op[select].nextDialog;
                                scene.choice.cursor.visible = false;

                                if(select === 0) scene.callback = true;
                                if(select === 1) scene.callback2 = true;

                            }
                        }
                    } else keyCount = 0;
                }
            }
        }
    });
}

//检测player是否存在于stage中
function checkPlayerInStage(stageNodes) {
    for(var p in stageNodes) {
        if(stageNodes[p] === p1.player) return true;
    }
    return false;
}



