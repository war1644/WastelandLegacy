/**
 * Created by 路漫漫.
 * Link: ahmerry@qq.com
 * Date: 2017/5/21 14:40
 *
 */

enchant();
window.onload = wl;
var resList = {
        'tileSet': './images/assets/室内.png',
        'player1': './images/player.png',
        'tank': './images/blackTank.png',
        'select': './bgm/select.mp3',
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
        'NameSetting_mp3':'./Sound/Bgm/NameSetting.mp3',
        'lose':'./bgm/lose.mp3',
        'message':'./bgm/message.wav',
        'buy':'./bgm/buy.mp3',
        'cursor':'./images/system/select.png',
        'triangle_up':'./images/up.png',
        'triangle_down':'./images/down.png',
        'spBg':'./images/label.png',
        'aBtn':'./images/A.png',
        'tankNpc01':'./images/movePic/NPC_1.png',
        'sister':'./images/movePic/NPC_2.png',
        'dade':'./images/movePic/NPC_3.png',
        'npc08':'./images/movePic/NPC_5.png',
        'enemy00':'./images/m010.gif',
        'enemy01':'./images/m011.gif',
        'enemy02':'./images/m012.gif',
        'enemy03':'./images/m013.gif',
        'enemy04':'./images/m014.gif',
        'enemy05':'./images/T10_沙漠之舟.png'
    },
    config = {
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
    key = {
        'up':87,
        'down':83,
        'left':65,
        'right':68,
        'a':74,
        'b':75,
        'i':73
    },
    tileSize = 24;

function wl() {
    window.game = new Game(320, 240);
    //初始设定
    gameInit();
    //预加载资源
    game.preload(resList);
    game.onload = () => {
        let map = setHome2Map();
        game.playerList.push(new Player({
            startingX:4,
            startingY:8,
            playerImage:'tank',
            map:map[0],
            defaultAttributes:Player.p1Attributes
        }));
        window.p1 = game.playerList[0];
        game.gp = p1.player.gp;    //金钱
        game.exp = p1.player.exp;  //经验值
        game.hp = p1.maxHp = p1.getHp();
        game.item_p1 = p1.player.items;    //角色一物品
        game.encounter = false; //不可以遇敌
        //播放音乐
        // new SoundManage(game.curBGM,true);
        let scene = new enchant.Scene();
        let stage = addToStage(map);
        scene.addChild(stage);
        game.pushScene(scene);
        p1.player.on('enterframe',function() {
            if(this.stop) return;
            p1.move();
            let playerPos = {
                x:p1.square().x * config.spriteWidth,
                y:p1.square().y * config.spriteHeight,
                tileX: p1.square().x,
                tileY: p1.square().y,
                face:p1.facingSquare()
            };
            //场景切换检测
            if(game.mapCode === mapCode['home2']) {
                //进出场景
                let enterEvent = gameEv.findTile(playerPos.tileX,playerPos.tileY,game.mapCode);
                if(enterEvent && !enterEvent.hasOwnProperty("lock") && p1.player.x % tileSize === 0 && p1.player.y % tileSize === 0) {
                    enterEvent.action();
                }
            }

            if(game.mapCode === mapCode['home1']) {
                if(game.npcList.home1.npc.length) {
                    let hasObstacle = hasObstacleAround(p1).filter(function(o){
                        return typeof o === 'string';
                    });
                    let obstacleLen = hasObstacle.length;

                    for(let i in game.dirDeny) {
                        if(game.dirDeny.hasOwnProperty(i)) game.dirDeny[i] = false;
                    }
                    while(obstacleLen--) {
                        game.dirDeny[hasObstacle[obstacleLen]] = true;
                    }
                }
            }

            //处理按下A键的情况
            if(game.input.a){
                config.keyA++;
            } else {
                config.keyA = 0;
            }
            if(config.keyA === 1) {//仅当值为1时触发
                new SoundManage('select');
                let facingSquare = p1.facingSquare();
                if(facingSquare) {
                    //找玩家附近是否有事件
                    let evTile = gameEv.findTile(facingSquare.x,facingSquare.y,game.mapCode);
                    console.log(evTile);
                    evTile && evTile.action();

                    let npc = game.npcList[game.mapCode].npc;

                    npc.forEach(function(o) {
                        if(o.tileX === facingSquare.x &&
                            o.tileY === facingSquare.y &&
                            o.x % tileSize === 0 && o.y % tileSize === 0 &&
                            p1.player.isMoving === false) {
                            o.action();
                        } else if(p1.map.hitTest(facingSquare.x * tileSize,facingSquare.y * tileSize) &&
                            o.facingSquare().x === facingSquare.x &&
                            o.facingSquare().y === facingSquare.y &&
                            o.x % tileSize === 0 && o.y % tileSize === 0 &&
                            p1.player.isMoving === false &&
                            (p1.player.x === o.x || p1.player.y === o.y)) {
                            //隔着障碍物也能对话
                            o.action();
                        }
                    });
                }
            }
            //镜头跟随角色
            setCamera(map[0].width,map[0].height,game.playerList,scene);
        });
    };
    game.start();
}

function gameInit() {
    //地图标识
    game.mapCode = 'home2';
    game.spriteWidth = config.spriteWidth;
    game.spriteHeight = config.spriteHeight;
    game.scale = config.scale;
    game.fps = config.fps;
    game.curBGM = 'NameSetting_mp3';
    game.playerList = [];
    //npc清单
    game.npcList = {
        "home2":{
            "npc":[]

        },
        "home1":{
            "npc":[],
            //商品列表
            "commodity":[
                {name:'装甲包',cost:'100G',description:'补充少量装甲',scene:'battle'},
                {name:'中装甲药',cost:'300G',description:'补充部分量装甲',scene:'battle'},
                {name:'大装甲药',cost:'600G',description:'补充大量装甲',scene:'battle'},
                {name:'传真',cost:'2000G',description:'传送到各地方的装置'}
            ],
            "commodity2":[
                {name:'55炮',cost:'10000G',attack:50,description:'55mm口径主炮，一炮把你秒成渣'},
                {name:'85炮',cost:'15000G',attack:70,description:'85mm口径主炮，一炮把你秒成渣'},
                {name:'105炮',cost:'20000G',attack:100,description:'105mm口径主炮，一炮把你秒成渣'},
                {name:'125炮',cost:'25000G',attack:120,description:'125mm口径主炮，一炮把你秒成渣'},
                {name:'155炮',cost:'50000G',attack:150,description:'155mm口径主炮，一炮把你秒成渣'},
                {name:'165炮',cost:'70000G',attack:160,description:'165mm口径主炮，一炮把你秒成渣'},
                {name:'185炮',cost:'100000G',attack:200,description:'185mm口径主炮，一炮把你秒成渣'},
                {name:'205炮',cost:'120000G',attack:250,description:'205mm口径主炮，一炮把你秒成渣'},
                {name:'220炮',cost:'150000G',attack:300,description:'220mm口径主炮，一炮把你秒成渣'},
                {name:'225炮',cost:'20000000G',attack:500,description:'225mm口径主炮，一炮把你秒成渣'}
            ]
        }
    };
    //在某方向上停止行动
    game.dirDeny = {
        'up':false,
        'right':false,
        'down':false,
        'left':false
    };
    //地图清单
    game.mapList = {
        "home1":[],
        "home2":[]
    };

    //按键绑定
    game.keybind(key['a'],'a');
    game.keybind(key['b'],'b');
    game.keybind(key['i'],'i');
    game.keybind(key['up'],'up');
    game.keybind(key['down'],'down');
    game.keybind(key['left'],'left');
    game.keybind(key['right'],'right');

}

//主角屋子2楼
function setHome2Map() {
    let mapArr = [];
    for (let i = 0; i < home2MapData.length; i++) {
        mapArr[i] = new enchant.Map(24,24);
        mapArr[i].image = game.assets['tileSet'];
        mapArr[i].loadData(home2MapData[i]);
    }

    mapArr[0].collisionData = home2PassMap;
    game.mapList.home2 = mapArr;
    return mapArr;
}

//主角屋子1楼
function setHome1Map() {
    let mapArr = [];
    for (let i = 0; i < home1MapData.length; i++) {
        mapArr[i] = new enchant.Map(24,24);
        mapArr[i].image = game.assets['tileSet'];
        mapArr[i].loadData(home1MapData[i]);
    }
    mapArr[0].collisionData = home1PassMap;
    game.mapList.home1 = mapArr;
    return mapArr;
}

/**
 * 添加场景
 * @param obj {Object} 单个场景或一组场景
 */
function addToStage(obj) {
    let stage = new enchant.Group();
    if(!obj.length) {
        stage.addChild(obj);
    } else {
        for(let i = 0; i < obj.length; i++) {
            stage.addChild(obj[i]);
            if (i==2){
                stage.addChild(p1.player);
            }
        }
        // for(let i = 0; i < obj.length; i++) {
        //     stage.addChild(obj[i]);
        // }
    }
    return stage;
}

function rand(n) {
    return (Math.random() * n) >> 0;
}

function rangeRand(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 创建提示路标
 * @type {Sprite}
 */
var SignPostLabel = enchant.Class.create(enchant.Sprite, {
    initialize: function (text, callback) {
        enchant.Sprite.call(this, 300, 35);

        this.spAge = this.age + 30;
        this.callback = callback;
        this.x = (game.width - this.width) / 2;
        this.y = (game.height - this.height) / 2;

        let surface = new enchant.Surface(300, 35);
        this.image = surface;
        //绘制背景图片
        // surface.draw(game.assets["spBg"]);

        let ctx = surface.context;

        //设置文字样式
        ctx.fillStyle = '#fff';
        ctx.shadowColor = "#707070";
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.font = '24px 黑体';

        let w = surface.context.measureText(text).width,
            x = (surface.width - w) / 2;

        ctx.fillText(text, x, 26);

        let scene = new enchant.Scene();
        scene.addChild(this);
        game.pushScene(scene);

        return this;
    },
    onenterframe: function () {
        if (this.age > this.spAge) {
            if (this.opacity > 0.3) {
                this.opacity -= 0.03;
                if (this.opacity < 0.8) this.y += 2;
            } else {
                game.popScene();
                this.callback && this.callback.apply(this, arguments);
            }
        }
    }
});

/**
 * 创建对话场景
 * @param scene 场景
 * @param npc npc对象
 */
dialogDirection = {
    0:3,    //下
    1:2,    //左
    2:1,    //右
    3:0     //上
};
function createDialogScene(scene,npc) {
    //对话时改变npc的朝向，使其面向玩家
    npc.frame = dialogDirection[p1.player.direction] * 4;
    //如果场景存在，则退出场景
    if(scene) game.popScene();
    //新建场景
    scene = new enchant.Scene();

    //对话文字背景
    let msgBg = new enchant.Sprite(game.width,70);
    msgBg.x = 0;
    msgBg.y = game.height-70;
    msgBg.backgroundColor = 'black';
    msgBg.opacity = 1;

    //按键闪烁
    let aBtn = new confirmBtn();

    //文本容器
    let label = new enchant.Label();
    label.width = game.width-50;
    label.height = 60;
    label.font = '12px Microsoft YaHei';
    label.color = '#fff';
    label.x = 10;
    label.y = game.height-60;

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
    let dialog = findDialogByID(id,type),  //获取相应的对话
        start = dialog.startIndex,  //对话从哪个索引开始
        i = start,
        tmpText = '',   //每帧显示的临时文本
        keyCount = 0,   //防止连发
        face = npc.direction,
        op;

    scene[0].addEventListener('enterframe',function() {
        let message = 'dialog_'+ i,
            text = dialog[message].text;
        //若文本未显示完
        if(tmpText.length < text.length) {
            //如果按下了A键并且文本长度大于1
            if(game.input.a && tmpText.length > 1) {
                if(keyCount++ === 1) {
                    //瞬间显示文本
                    tmpText = text;
                    scene[1].text = (dialog.name.length ? (dialog.name + '：<br/>') : '') + tmpText;
                }
            } else {
                keyCount = 0;
            }
            //若没有按下A键，则逐帧显示文本(打字机效果)
            if(this.age % 2 === 0 && !game.input.a && tmpText.length < text.length) {
                tmpText = text.substr(0, tmpText.length + 1);
                scene[1].text = (dialog.name.length ? (dialog.name + '：<br/>') : '') + tmpText;
                //文本显示时播放声音
                new SoundManage('message');
            }
        } else {//文本已完全显示，则进入下一段对话
            if(!dialog[message].options) {//无对话选项
                if (dialog[message].nextDialog !== -1) {
                    if (game.input.a) {
                        if (keyCount++ === 1) {
                            tmpText = '';
                            i = dialog[message].nextDialog;
                        }
                    } else {
                        keyCount = 0;
                    }
                } else {//若没有下一段对话了
                    if (game.input.a) {
                        if (keyCount++ === 1) {
                            game.popScene();   //退出场景
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
                    scene.choice = new choiceText(op, 20, 20);
                    game.currentScene.addChild(scene.choice);
                } else {//再次运行时监听是否按下确认键
                    if (game.input.a) {
                        if(keyCount++ === 1) {
                            //得到玩家的回答
                            let select = scene.choice.cursor.selected;

                            //满足条件
                            if(op[select].nextDialog !== -1) {
                                if(op[select].condition) {
                                    if(eval(op[select].condition)) {//判断是否满足条件
                                        tmpText = '';
                                        i = op[select].nextDialog;
                                        game.currentScene.removeChild(scene.choice);
                                        scene.choice = null;
                                        op[select].callback && op[select].callback();
                                    } else {
                                        tmpText = '';
                                        i = op[select].failDialog;
                                        game.currentScene.removeChild(scene.choice);
                                        scene.choice = null;
                                    }
                                } else {
                                    tmpText = '';
                                    i = op[select].nextDialog;
                                    game.currentScene.removeChild(scene.choice);
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
//选项类对话
function Deal(npcID,type,npc,scene,itemList) {
    let dialog = findDialogByID(npcID,type),
        start = dialog.startIndex,
        i = start,
        tmpText = '',
        keyCount = 0,   //防止连发
        face = npc.direction,
        op;

    scene[0].addEventListener('enterframe',function() {
        //显示钱钱
        disPlayGold();
        let message = 'dialog_' + i,
            text = dialog[message].text;

        if(tmpText.length < text.length) {
            if(game.input.a && tmpText.length > 1) {
                if(keyCount++ === 1) {
                    //瞬间显示文本
                    tmpText = text;
                    scene[1].text = tmpText;
                }
            } else {
                keyCount = 0;
            }
            //若没有按下A键，则逐帧显示文本(打字机效果)
            if(this.age % 2 === 0 && !game.input.a && tmpText.length < text.length) {
                tmpText = text.substr(0, tmpText.length + 1);
                scene[1].text = tmpText;
                //文本显示时播放声音
                new SoundManage('message');
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
                    if (game.input.a) {
                        if (keyCount++ === 1) {
                            game.popScene();
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
                    //创建选项 内容，内容坐标
                    scene.choice = new choiceText2(op, 25, 5);
                    scene[2].visible = false;//隐藏闪烁的A按键
                    game.currentScene.addChild(scene.choice);
                } else {//再次进入则监听按键
                    let select; //玩家选择
                    if(game.input.b) {//按B键退出
                        if(keyCount++ === 1) {
                            select = op.length - 1;
                            tmpText = '';
                            i = op[select].failDialog;
                            game.currentScene.removeChild(scene.choice);
                            scene.choice = null;
                        }
                    } else if(game.input.a) {
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

//查找对话id
function findDialogByID(id,type) {
    let data = null;
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