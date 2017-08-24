/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * RPG class 客户端核心主类，游戏控制参数，方法
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/07/29 初版
 */
let RPG = {

// RPG基本管理参数，根据不同项目，应当调整
    curBGM: '',
    curBGMObj:null,
    //遇敌开关
    fight:false,
//方向常量
    DOWN: 0,
    LEFT: 1,
    RIGHT: 2,
    UP: 3,
// 地图单位
    STEP: 24,
    iconStep: 24,
    ctrState: 0,
//显示进度条所用层
    loadingLayer: {},
//游戏底层
    backLayer: {},
//地图层
    mapLayer: {},
//人物层
    charaLayer: {},
//效果层
    effectLayer: {},
//对话层（及菜单，战斗）
    talkLayer: {},
//子菜单层（多个菜单页）
    ctrlLayer: {},
    descLayer: new LSprite(),
// 状态控制
// 状态变量
    state: -1,
// 状态栈
    stateStack: [],
// 单值状态值
    IN_COVER: 0,           // 封面
    COVER_MENU: 1,         // 游戏开始菜单
    MAP_CONTROL: 2,        // 正常控制
    MAP_WAITING: 3,        // 等待NPC移动，不可控制
    IN_MENU: 4,            // 菜单中
    IN_FIGHTING: 5,        // 在战斗中
    IN_TALKING: 6,         // 对话状态中
    IN_CHOOSING: 7,        // 选择状态中
    IN_HELP: 8,            // 在帮助窗口下
    IN_OVER: 9,            // 在结束状态下
    FIGHT_RESULT: 10,      // 检查战斗结果状态（防止战斗异常重入）
    IN_FIGHTMENU:11,        //战斗菜单中
// 组合状态，100以上
    UNDER_MAP: 101,        // 地图下，包括地图控制和地图等待
    UNDER_MENU: 102,       // 菜单下，包括主菜单和载入菜单
    UNDER_WINDOWS: 103,       // 各种窗口下，包括主菜单、载入菜单、战斗系统
    stateList: {
        101: [2, 3],
        102: [4, 1],
        103: [4, 1, 5,6]
    },
// 流程控制:=============================================
// 内置开关量
    SWITCH: {},
// 敌人战队数据集合
    netEnemyTeam:[],
    enemyTeam: [],
//======================================================================
// 按钮管理
    currentButton: null,
    // 存档信息
    saveList: [],
    MaxSaveSlot: 1,
    WebAudioSound:null,
// ==========================================================

    /**
     * // ECMAScript5 compatibility based on: http://www.nczonline.net/blog/2012/12/11/are-your-mixins-ecmascript-5-compatible/
     *
     * */
    extend: function (obj, source) {
        if (Object.keys) {
            let keys = Object.keys(source);
            for (let i = 0, il = keys.length; i < il; i++) {
                let prop = keys[i];
                Object.defineProperty(obj, prop, Object.getOwnPropertyDescriptor(source, prop));
            }
        } else {
            let safeHasOwnProperty = {}.hasOwnProperty;
            for (let prop in source) {
                if (safeHasOwnProperty.call(source, prop)) {
                    obj[prop] = source[prop];
                }
            }
        }
        return obj;
    },

    /**
     * based on https://github.com/documentcloud/underscore/blob/bf657be243a075b5e72acc8a83e6f12a564d8f55/underscore.js#L767
     *
     * beget继承方法
     *
     * */
    beget: function (o) {
        let F = function () {
        };
        F.prototype = o;
        let G = new F();
        if (G.init) {
            G.init();
        }
        return G;
    },


    Serialize: function (obj) {
        switch (obj.constructor) {
            case Object:
                var str = "{";
                for (var o in obj) {
                    var tmp = RPG.Serialize(obj[o]);
                    if (tmp) {
                        str += o + ":" + tmp + ",";
                    }
                }
                if (str.substr(str.length - 1) == ",")
                    str = str.substr(0, str.length - 1);
                return str + "}";
                break;
            case Array:
                var str = "[";
                for (var o in obj) {
                    var tmp = RPG.Serialize(obj[o]);
                    if (tmp) {
                        str += tmp + ",";
                    }
                }
                if (str.substr(str.length - 1) == ",")
                    str = str.substr(0, str.length - 1);
                return str + "]";
                break;
            case Boolean:
                return "\"" + obj.toString() + "\"";
                break;
            case Date:
                return "\"" + obj.toString() + "\"";
                break;
            case Function:
                break;
            case Number:
                return "\"" + obj.toString() + "\"";
                break;
            case String:
                return "\"" + obj.toString() + "\"";
                break;
        }
    },

    setState: function (state) {
        RPG.stateStack = [];
        RPG.pushState(state);
    },
    pushState: function (state) {
        RPG.stateStack.push(state);
        RPG.state = state;
    },
    popState: function () {
        RPG.stateStack.pop();
        RPG.state = RPG.stateStack[RPG.stateStack.length - 1];
    },
    checkState: function (state) {
        if (state < 50) {
            if(RPG.state === state) return true;
            return false;
        } else {
            let stateSet = RPG.stateList[state];
            if (!stateSet) return false;

            for (let i = 0; i < stateSet.length; i++) {
                if (RPG.state === stateSet[i]) return true;
            }
            return false;
        }
    },
    initSwitch: function () {
        RPG.SWITCH = {};
    },
    setSwitch: function (k, v = true) {
        RPG.SWITCH[k] = v;
    },
    checkSwitch: function (k) {
        if (RPG.SWITCH[k]) {
            return Boolean(RPG.SWITCH[k]);
        } else {
            return false;
        }
    },


    // 获得移动方向，返回为一个数组，可以二选一
    getMoveDir: function (ax, ay) {
        let a = ax - player.x - charaLayer.x - STEP / 2;
        let b = ay - player.y - charaLayer.y - STEP / 2;
        let ret1 = [];
        let ret2 = [];
        if (a > STEP / 2) {
            ret1.push(RIGHT);
        } else if (a < -STEP / 2) {
            ret1.push(LEFT);
        }
        if (b > STEP / 2) {
            ret2.push(DOWN);
        } else if (b < -STEP / 2) {
            ret2.push(UP);
        }
        if (Math.abs(a) > Math.abs(b)) {
            return ret1.concat(ret2);
        } else {
            return ret2.concat(ret1);
        }
    },

    /**
     * 点击地图处理
     **/
    dealNormal: function (x, y) {
        // 根据点击位置，判断移动方向
        if (player) {
            console.log('clickPos',Lib.gridPos(x, y));
            //获取移动方向
            let ret = RPG.getMoveDir(x, y);
            if (ret.length === 0) {
                Talk.startTalk([
                    {msg:'功能控制',option:[
                        {text:'乘降',action:()=>{
                            if(mainTeam.inTank){
                                mainTeam.downTank(x,y);
                            } else {
                                mainTeam.upTank(x,y)
                            }
                            Talk.closeTalk();
                        }},
                        {text:'菜单',action:()=>{
                            Talk.closeTalk();
                            Menu.openMenu();
                        }},
                        {text:'取消',action:()=>{
                            Talk.closeTalk();
                        }},
                    ]}
                ]);
            } else {
                player.changeDirAlt(ret);
            }
        }
    },

    hideChar: function (aChar) {
        charaLayer.removeChild(aChar);
        //aChar.die();
    },

    showSaveSlot: function (aSlot) {
        if (aSlot >= 0 && aSlot < RPG.MaxSaveSlot) {
            let result = RPG.saveList[aSlot].name;
            if (RPG.saveList[aSlot].date) {
                for (let i = RPG.saveList[aSlot].name.length; i < 6; i++) {
                    result = result + "　";
                }
                result = result + "(" + RPG.saveList[aSlot].date + ")";
            }
            return result;
        }
    },
    getDateTimeStr: function () {
        if(RPG.checkSwitch('费雷塔任务')){

        }
        let myDate = new Date();
        let hh = myDate.getHours();
        let mm = myDate.getMinutes();
        //myDate.getFullYear()+ "-"
        let result = ""
            + (myDate.getMonth() + 1) + "-"
            + myDate.getDate() + " "
            + (hh < 10 ? "0" : "")
            + hh + ":"
            + (mm < 10 ? "0" : "")
            + mm
        ;
        return result;
    },
    howToUse: function () {
        Talk.startTalk([
            {img: "face雷娜", name: "游戏美工04", msg: "程序设计：[路漫漫]，[7。]，[问道中情]"},
            {img: "face雷娜", name: "游戏美工04", msg: "游戏素材：[〇亖]\nQQ群：375499028"},
            {img: "face雷娜", name: "游戏美工04", msg: "好了，不废话，开始你的废土捡破烂生活吧"},
        ]);
    },
    drawCover: function () {

        // 封面图
        RPG.setState(RPG.IN_COVER);
        let sLayer = effectLayer;
        sLayer.removeAllChild();

        let title = UI.simpleText('废土战纪',30);
        title.x = WIDTH-title.getWidth()>>1;
        title.y = HEIGHT>>3;
        sLayer.addChild(title);
        let ver = UI.simpleText(VER);
        ver.x = WIDTH-ver.getWidth()>>1;
        ver.y = title.y+title.getHeight()+20;
        sLayer.addChild(ver);


        // 新的开始
        let button01 = UI.diyButton(160, 40, (WIDTH - 160) >> 1, HEIGHT>>1, "进入废土", function () {
            // 按钮被透过窗口点击
            if (RPG.checkState(RPG.IN_COVER)) {
                if(!playerName){
                    // Lib.userInfo = JSON.parse(localStorage.getItem('wlUserInfo'));
                    // if(!Lib.userInfo){
                        Lib.login();
                    // }else {
                    //     playerName = Lib.userInfo.name;
                    //     GameSocket.onLink();
                    // }
                } else {
                    GameSocket.onLink();
                }
            }
        },18);
        sLayer.addChild(button01);

        // 继续
        // let button02 = UI.diyButton(160, 40, (WIDTH - 160) >> 1, (HEIGHT>>1)+60, "载入进度", function () {
        //     if (RPG.checkState(RPG.IN_COVER)) {
        //         Menu.openLoadMenu();
        //     }
        // },18);
        // button02.setState(LButton.STATE_DISABLE);
        // sLayer.addChild(button02);

        // 关于
        let button03 = UI.diyButton(160, 40, (WIDTH - 160) >> 1, (HEIGHT>>1)+60, "关于", function () {
            if (RPG.checkState(RPG.IN_COVER)) {
                RPG.howToUse();
            }
        },18);
        sLayer.addChild(button03);

        if (window.localStorage) {
            let saveList = JSON.parse(window.localStorage.getItem("WLSaveList"));
            if (saveList) {
                // button02.setState(LButton.STATE_ENABLE);
                RPG.copySaveList(saveList);
            } else {
                // button02.setState(LButton.STATE_DISABLE);
                RPG.newSaveList();
            }
        }
        // let bitmapdata = new LBitmapData(assets["start_png"]);
        // let bitmap = new LBitmap(bitmapdata);
        // bitmap.scaleX = WIDTH/ bitmap.width;
        // bitmap.scaleY = HEIGHT/ bitmap.height;
        // bitmap.x = 0;
        // bitmap.y = 0;
        // bitmap.alpha = 1;
        // sLayer.addChild(bitmap);
    },

    // 新游戏初始化信息
    newGame: function () {
        //初始化玩家队伍

        mainTeam = RPG.beget(PlayerTeam);
        //向玩家队伍增加人物（人物索引，人物等级)
        mainTeam.addHero(Lib.userInfo.jobId, Lib.userInfo.level, Lib.userInfo.name);
        socket.wlSend('netTeam', {jobId:Lib.userInfo.jobId, lv:Lib.userInfo.level, name:playerName});
        // mainTeam.addHero(2, Lib.userInfo.level, '废土机械师小伙伴');
        // mainTeam.addHero(3, Lib.userInfo.level, '废土战士小伙伴');

        RPG.initSwitch();
        //进入地图控制状态
        RPG.setState(RPG.MAP_CONTROL);
        //载入场景
        gameStageInit(Lib.userInfo.mapId, Lib.userInfo.mapX, Lib.userInfo.mapY, Lib.userInfo.mapDir);
        //初始化敌人
        // RPG.initEnemyTeam();
        // mainTeam.addItem()
    },

// 初始化敌人战斗队的数据
    initEnemyTeam: function () {
        let team1;
        // A队=0
        team1 = RPG.beget(PlayerTeam);
        team1.clear();
        team1.addEnemy(0, 50);
        team1.addEnemy(1, 50);
        // team1.addItem(1, 2);
        RPG.enemyTeam.push(team1);

        // B队=1
        team1 = RPG.beget(PlayerTeam);
        team1.clear();
        team1.addEnemy(0, 50);
        team1.addEnemy(1, 50);
        // team1.addItem(1, 2);
        RPG.enemyTeam.push(team1);

        // C队=2
        team1 = RPG.beget(PlayerTeam);
        team1.clear();
        team1.addEnemy(0, 60);
        // team1.addItem(1, 2);
        RPG.enemyTeam.push(team1);

        // D队=3
        team1 = RPG.beget(PlayerTeam);
        team1.clear();
        team1.addEnemy(1, 60);
        RPG.enemyTeam.push(team1);

        // E队=4
        team1 = RPG.beget(PlayerTeam);
        team1.clear();
        team1.addEnemy(0, 50);
        team1.addEnemy(1, 50);
        team1.addEnemy(0, 50);
        team1.addEnemy(1, 50);
        // team1.addItem(1, 2);
        RPG.enemyTeam.push(team1);
    },

    newSaveList: function () {
        // 存档记录为空
        RPG.saveList = [];
        for (let i = 0; i < RPG.MaxSaveSlot; i++) {
            RPG.saveList.push({name: "空记录", date: null});
        }
    },
    copySaveList: function (saveList) {
        // 读取存档记录
        RPG.saveList = saveList.slice(0);
    },

    saveGame: function (slot) {
        RPG.saveList[slot].name = stage.name;
        RPG.saveList[slot].date = RPG.getDateTimeStr();
        if (window.localStorage) {
            window.localStorage.setItem("WLSaveList", JSON.stringify(RPG.saveList));
            let tmp = [];
            if(mainTeam.unuseTankList.length>0){
                for (let i = 0; i < mainTeam.unuseTankList.length; i++) {
                    tmp.push(mainTeam.unuseTankList[i].chara);
                    mainTeam.unuseTankList[i].chara = false;
                }
            }
            let saveData = {
                px: player.px,
                py: player.py,
                itemList: mainTeam.itemList,
                heroList: mainTeam.heroList,
                tankList: mainTeam.tankList,
                unuseTankList:mainTeam.unuseTankList,
                stageId: stage.id,
                swt: RPG.SWITCH
            };
            socket.wlSend('setSave',saveData);

            if(tmp.length>0){
                for (let i = 0; i < tmp.length; i++) {
                    mainTeam.unuseTankList[i].chara = tmp[i];
                }
            }

        }
    },

    loadGame: function (content) {
        let saveData = content;
        console.log('load saveData',saveData);
        mainTeam = RPG.beget(PlayerTeam);
        for (let i = 0; i < saveData.itemList.length; i++) {
            mainTeam.addItem(saveData.itemList[i].index, saveData.itemList[i].num);
        }
        for (let i = 0; i < saveData.heroList.length; i++) {
            mainTeam.addHero(saveData.heroList[i].index, saveData.heroList[i].Level);
            RPG.extend(mainTeam.heroList[i], saveData.heroList[i]);
        }
        RPG.initSwitch();
        RPG.extend(RPG.SWITCH, saveData.swt);
        gameStageInit(saveData.stageId, Number(saveData.px), Number(saveData.py));
        // 进入地图控制状态
        RPG.setState(RPG.MAP_CONTROL);
    },

    /**
     * 载入特效
     *
     * */
    loadEffect: function(name,row=4,col=5){
        if (!effectList[name]){
            let bitmapData, chara;
            bitmapData = new LBitmapData(assets[name]);
            chara = new Effect(bitmapData, row, col);
            effectList[name]= chara;
        }
        return effectList[name];
    },

    // 屏幕从黑切换到白，模拟过去了一天的效果
    nightAndDay: function(callback) {
        Lib.bgm('睡觉');
        effectLayer.removeAllChild();
        let bmp = UI.drawColorWindow(effectLayer, 0, 0, WIDTH, HEIGHT, 1);
        LTweenLite.to(bmp, 5,
            {alpha: 0, onComplete: function () {
                    effectLayer.removeChild(bmp);
                    if (callback) callback();
                }
            }
        )
    },
    // 屏幕黑白闪速
    flickerAnimation: function(callback,teamId,level=0) {
        Lib.bgm('StartBattle');
        effectLayer.removeAllChild();
        let bmp = UI.drawColorWindow(effectLayer, 0, 0, WIDTH, HEIGHT, 1,'#fff');
        let flicker = LTweenLite.to(bmp,0.1,{alpha:0,loop:true}).to(bmp,0.1,{alpha:1});
        setTimeout(function () {
            effectLayer.removeAllChild();
            if(callback) callback(teamId,level);
        },1000)
    },
    // 屏幕渐变黑
    blackEffect: function(callback) {
        effectLayer.removeAllChild();
        let bmp = UI.drawColorWindow(effectLayer, 0, 0, WIDTH, HEIGHT, 0.1);
        LTweenLite.to(bmp, 2,
            {alpha: 1,onComplete: function () {
                    if (callback) callback();
                }
            }
        )
    },
    whiteEffect: function(callback) {
        effectLayer.removeAllChild();
        let bmp = UI.drawColorWindow(effectLayer, 0, 0, WIDTH, HEIGHT, 1);
        LTweenLite.to(bmp, 2,
            {alpha: 0, ease: Quad.easeOut,
                onComplete: function () {
                    effectLayer.removeChild(bmp);
                    if (callback) callback();
                }
            }
        )
    },

};








