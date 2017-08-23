/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * Fight class 客户端战斗类
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/07/20 初版
 */

let Fight = {
    gameMenus : ['背包','乘降','强度','存档','任务','返回'],
    fightMenus : ['攻击','阵形','道具','防御','逃跑','总攻'],

// 最大HP，用于对比显示，给一个最小的参考值，一场战斗一旦确定则不再改变
    maxHpAll: 1000,
    maxMpAll: 100,
    //战利品和经验获得
    trophy: true,
    // 当前正在动作的对象
    currentFighter:{},
    currentToFighter:{},
    // 当前战斗状态
    state:-1,
    // 战斗胜负标记
    WIN:1,//胜利
    LOST:2,//失败
    FIGHTING:3,//战斗中
    // 战斗队伍：敌方/玩家方
    eTeam:[],
    pTeam:[],
    // 战斗状态：0=暂停中；1=自动进行中
    fightState:0,
    //战斗结束回调函数
    endCallback:null,
    //战斗过程控制
    stopAuto:false,//动作执行中
    afterStop:null,//动作执行完毕回调函数
    quickFight:false,
    menu:{},
    queue:[],//行动队列
    queueIndex:0,//行动索引
    option:-1,
    textObj:null,
    textArr:[],
    infoHeight:110,
    tmpTeam:null,
    layer:new LSprite(),
    touchLayer:new LSprite(),
    time:false,

    /**
     * 网络战斗状态
     */
    addNetBattle:(data)=>{
        let fighter = netPlayer[data.name];
        if(!fighter) return false;
        fighter.inBattle = true;
        let text = fighter.getChildByName('nickNameText');
        text.color = '#f00';
    },

    /**
     * 战斗初始化
     */
    startFight: (enemyTeam, playerTeam) => {
        //设置控制状态
        RPG.pushState(RPG.IN_FIGHTING);
        // 设置战斗状态
        Fight.state = Fight.FIGHTING;
        Fight.queueIndex = 0;
        //将对话层清空
        talkLayer.removeAllChild();
        //当对话开始，且按照顺序进行对话
        isKeyDown = false;
        //对话背景
        UI.drawBorderWindow(talkLayer, 0, 0, WIDTH, HEIGHT);
        // 子菜单层
        Fight.layer.removeAllChild();
        Fight.touchLayer.removeAllChild();
        Fight.layer.x = 0;
        Fight.layer.y = 0;
        talkLayer.addChild(Fight.layer);
        talkLayer.addChild(Fight.touchLayer);
        // 敌人队全满参战
        enemyTeam.fullHeal();
        Fight.eTeam = enemyTeam;
        Fight.pTeam = playerTeam;
        // if(!Fight.textObj){
            Fight.textObj = UI.simpleText('',12);
            Fight.textObj.x = gap;
            Fight.textObj.y = HEIGHT-Fight.infoHeight + gap;
            Fight.textObj.setWordWrap(true,20);
            FightMenu.showFightInfo();
            FightMenu.layer.addChildAt(Fight.textObj,1);
        // }
        // Fight.infoCommand('遭遇战，敌我力量悬殊，敌方士气大减');
        Fight.drawFighters();
        // socket.wlSend('fight',{});


    },

    /**
     * 绘制战斗场景
     */
    drawFighters: (j=0,i=0,y=0,x=0)=>{
        if(j>1){
            console.log('调用time',Fight.time);
            Fight.actionQueue();
            Fight.starQueue();
            return;
        }
        // 战斗窗口基本站位
        let hero1, chara, bitmapData, col,row, team, hpText, dir;
        //绘制敌我两队到战场
        if(j){
            if(mainTeam.inTank){
                team = Fight.pTeam.tankList;
            } else {
                team = Fight.pTeam.heroList;
            }
        } else {
            team = Fight.eTeam.heroList;
        }

        dir = j ? RPG.LEFT : RPG.RIGHT;
        if(i==0) y = gap * 2;

        if(x==0) {
            x = j ? WIDTH-gap*4 : gap;
        }
        Lib.bgm('出现');
        hero1 = team[i];
        bitmapData = new LBitmapData(assets[hero1.fightPic]);
        col = hero1.col || 4;
        row = hero1.row || 4;
        chara = new Fighter(bitmapData, row, col);
        if (!hero1.alive) {
            y = y + chara.getHeight() + 30;
            Fight.time = setTimeout(()=>{
                if(i<team.length-1){
                    Fight.drawFighters(j,i+1,y);
                } else {
                    Fight.drawFighters(j+1,0,y);
                }
                return;
            },500);
            return;
        }
        chara.changeDir(dir);
        chara.x = x;
        chara.y = y;
        Fight.layer.addChild(chara);

        hero1.fighter = chara;
        y = y + chara.getHeight() + 5;

        hpText = UI.simpleText(hero1.Hp,10);
        if(j){
            chara.move = false;
            hpText.x = x-gap;
        } else {
            hpText.x = x+gap;
        }
        hpText.y = y;
        Fight.layer.addChild(hpText);
        hero1.hpText = hpText;
        y += 2*gap;
        Fight.infoCommand(hero1.nickName+'进入战场');
        Fight.time = setTimeout(()=>{
            if(i<team.length-1){
                if(i>2){
                    x = chara.getWidth()+2*gap;
                    y = 2*gap;
                }
                Fight.drawFighters(j,i+1,y,x);
            } else {
                Fight.drawFighters(j+1,0,y);
            }
            return;
        },500);
    },

    /**
     * 开始队列处理
     *
     * */
    starQueue:()=>{
        Fight.currentFighter = Fight.queue[Fight.queueIndex];
        // if(!Fight.currentFighter && Fight.queueIndex){
        //     Fight.queueIndex++;
        //     if(Fight.queueIndex>=Fight.queue.length){
        //         Fight.queueIndex = 0;
        //     }
        //     Fight.starQueue();
        // } else {
        if(Fight.currentFighter.isHero) {
            Fight.drawActButton();
        } else {
            let pteam = [];
            if(mainTeam.inTank){
                pteam = Fight.pTeam.tankList;
            } else {
                pteam = Fight.pTeam.heroList;
            }

            for (let i = 0; i < pteam.length; i++) {
                if(pteam[i].alive){
                    // let randIndex = rand(Fight.tmpTeam.length-1);
                    Fight.currentToFighter = pteam[i];
                    setTimeout(Fight.actionAttack,1000);
                    return;
                }

            }

        }

    },

    /**
     * 战斗按钮操作
     */
    drawActButton: () => {
        // 控制按钮
        let x0, y0;
        x0 = gap*2;
        y0 = HEIGHT - Fight.infoHeight - 30;
        let atk = {};
        if(mainTeam.inTank){
            atk = {label:"攻击",list:[
                {label:"主炮",click:()=>{Fight.menuCmd(1,'mainCannon')}},
                {label:"副炮",click:()=>{Fight.menuCmd(1,'subCannon')}},
                {label:"S-E",click:()=>{Fight.menuCmd(1,'SE')}},
            ]};

        }else {
            atk = {label:"攻击",list:[
                {label:"攻击",click:()=>{Fight.menuCmd(1)}},
            ]};
        }
        let list = [
            atk,
            {label:"防御",list:[
                {label:"防御",click:()=>{ Fight.menuCmd(3);}},
            ]},
            {label:"物品",list:[
                {label:"物品",click:()=>{Fight.menuCmd(2)}},
            ]},
            {label:"乘降",list:[
                {label:"乘降",click:()=>{ Fight.menuCmd(4)}},
            ]},
            {label:"逃跑",list:[
                {label:"逃跑",click:()=>{Fight.menuCmd(5)}},
            ]},
        ];
        Fight.menu = new LMenubar(list,{textSize:14,textColor:"#000",lineColor:"#000",backgroundColor:"#eee"});
        Fight.menu.x = x0;
        Fight.menu.y = y0;
        Fight.menu.name = 'fightMenu';
        talkLayer.addChild(Fight.menu);
        Fight.endCallback = ()=>{
            Fight.menu.visible = true;
            console.log(Fight.menu);
        };
    },

    menuCmd:(type,weapon=false)=>{
        Fight.menu.visible = false;
        switch(type){
            case 1://攻击
                Fight.showEnemyList(weapon);
                break;
            case 2://物品
                Menu.trade = 'use';
                Menu.fightShowItems();
                break;
            case 3://防御
                Fight.infoCommand(Fight.currentFighter.nickName+'防御中...');
                Fight.nextFighter();
                break;
            case 4://乘降
                Fight.infoCommand('没设计好');
                Fight.nextFighter();
                break;
            case 5://逃跑
                //逃跑成功率计算公式：F = (A * 32) / B + 30 * C
                /*A为逃跑方的当前速度，包含加速buff。
                 B为对方的当前速度(或取对方的速度平均值)除以4再对256取余。
                 C为本次战斗中逃跑方已经尝试过的逃跑次数，包括正在进行的这一次逃跑。
                 若F大于255，则逃跑成功。否则在0到255之间生成一個随机数D。若D小于F则逃跑成功，否则逃跑失败。
                 若使用道具或某些特性逃跑必定成功*/
                //hero.speed;
                if(Fight.isSneak()) {
                    Fight.infoCommand('敌方速度过快,'+Fight.currentFighter.nickName +'逃离失败');
                    Fight.nextFighter();
                }else {
                    if(mainTeam.inTank){
                        Fight.currentFighter = Fight.pTeam.tankList[0];
                        for (let i = 0; i < Fight.queue.length; i++) {
                            let obj = Fight.queue[i];
                            if(obj.isHero){
                                let index = Fight.queue.indexOf(obj);
                                Fight.queue.splice(index,1);
                                Fight.infoCommand(obj.nickName +'逃离战场');
                                i = index - 1;
                            }
                        }
                        Fight.currentFighter.fighter.visible = false;
                        Fight.currentFighter.hpText.visible = false;
                    }else {
                        for (let i = 0; i < Fight.queue.length; i++) {
                            let obj = Fight.queue[i];
                            if(obj.isHero){
                                let index = Fight.queue.indexOf(obj);
                                Fight.queue.splice(index,1);
                                Fight.infoCommand(obj.nickName +'逃离战场');
                                obj.fighter.visible = false;
                                obj.hpText.visible = false;
                                i = index - 1;
                            }
                        }
                    }

                    // 然后判断胜负
                    if (Fight.checkFight()) {
                        Menu.closeMenu();
                        // //显示战斗结果
                        // Fight.showResult();
                        // Fight.endCallback();
                        return;
                    }else {
                        Fight.nextFighter();
                    }
                }
                break;
        }
        // 行动结束后，再显示菜单
        Fight.afterStop = ()=>{
            Fight.menu.visible = true;
        };

    },
    /**
     * 显示敌人列表
     * */
    showEnemyList:(weapon)=>{
        let list = Fight.eTeam.heroList,optionList=[];
        for (let i = 0; i < list.length; i++) {
            let enemy = list[i];
            if(!enemy.alive) continue;
            optionList.push({text:enemy.nickName,action:()=>{
                Fight.currentToFighter = enemy;
                Fight.touchLayer.removeAllChild();
                RPG.popState();
                Fight.actionAttack(weapon);
            }});
        }
        optionList.push({text:"否",action:()=>{
            Fight.menu.visible = true;
            Talk.closeTalk();
        }});
        let select = {msg: Fight.currentFighter.nickName+" 攻击谁？",option:optionList};
        Talk.makeChoice(select,Fight.touchLayer);
    },

    actionAttack:(weapon,hero=false,toHero)=>{
        if(!hero){
            hero = Fight.currentFighter;
            toHero = Fight.currentToFighter;
        }
        Fight.infoCommand(hero.nickName + '攻击');
        let effect = "220Animation";

        // 有装备的战斗效果
        if(weapon){
            hero = Fight.pTeam.tankList[0];
            let id = hero[weapon];
            let item1 =  ItemList[id-1];
            if (item1) effect = item1.attackAnimation;
        }else if(hero.getWeapon){
            let item1 = hero.getWeapon();
            if (item1) effect = item1.attackAnimation;
        }

        Fight.playAction(weapon,hero, toHero, effect, function () {
            Fight.nextFighter();
        });

    },

    nextFighter:function () {
        Fight.queueIndex++;
        if(Fight.queueIndex>=Fight.queue.length){
            Fight.queueIndex = 0;
        }
        Fight.starQueue();
    },

    /**
     * 开始攻击动作
     */
    playAction: (weapon,hero, toHero, actEffect, afterFunc) => {
        // 我方物理攻击
        let x0, x1, effect;
        effect = RPG.loadEffect(actEffect);

        let P = WIDTH>>1;
        if (hero.fighter.x > P) {
            x0 = hero.fighter.x;
            x1 = hero.fighter.x - STEP;
        } else {
            x0 = hero.fighter.x;
            x1 = hero.fighter.x + STEP;
        }
        // 计算攻击效果
        let ret=0;
        if(weapon){
            ret = Fight.physicalTankAttack(hero, toHero,weapon);
        }else {
            ret = Fight.physicalAttack(hero, toHero);
        }

        toHero.beHit(ret);
        // 人物前进到攻击位置
        let start={},end={};
        effect.x = x1 + (hero.fighter.getWidth() - effect.getWidth()) / 2;
        effect.y = hero.fighter.y + (hero.fighter.getHeight() - effect.getHeight()) / 2;
        end.x = toHero.fighter.x + (toHero.fighter.getWidth() - effect.getWidth()) / 2;
        end.y = toHero.fighter.y + (toHero.fighter.getHeight() - effect.getHeight()) / 2;
        LTweenLite.to(hero.fighter, 0.3,
            {x: x1, ease: Circ.easeOut,onComplete: function () {
                LTweenLite.to(effect,1,{x:end.x,y:end.y,onStart:function(){
                    Fight.layer.addChild(effect);
                    Lib.bgm('GunAct');
                    setTimeout(function () {
                        Lib.bgm('boom',false,1)
                    },500);
                    effect.play(1, function () {
                        // 刷新数据
                        Fight.infoCommand(toHero.nickName + '损伤 ' + ret);
                        toHero.hpText.text = toHero.Hp;
                        if (toHero && !toHero.alive) {
                            toHero.fighter.visible = false;
                            toHero.hpText.visible = false;
                            Fight.infoCommand(toHero.nickName+'被击败');
                            let index = Fight.queue.indexOf(Fight.currentToFighter);
                            console.log('splice queue',Fight.queue.splice(index, 1));
                            if(toHero.isHero && mainTeam.inTank){
                                for (let i = 0; i < Fight.queue.length; i++) {
                                    let obj = Fight.queue[i];
                                    if(obj.isHero){
                                        let index = Fight.queue.indexOf(obj);
                                        Fight.queue.splice(index,1);
                                        Fight.infoCommand(obj.nickName +'逃离战场');
                                    }
                                }
                            }
                        }
                        // 动画效果消失
                        Fight.layer.removeChild(effect);
                        //人物退回站位
                        LTweenLite.to(hero.fighter, 0.5,
                            {x: x0, ease: Circ.easeOut,
                                onComplete: function () {
                                    // 然后判断胜负
                                    if (Fight.checkFight()) {
                                        //显示战斗结果
                                        Fight.showResult();
                                        // switch(Fight.state){
                                        //     case 1:
                                        //         Fight.endCallback();
                                        //         break;
                                        //     case 2:
                                        //         break;
                                        //     default:
                                        //         break;
                                        // }

                                        return;
                                    }
                                    // 下一个
                                    if (afterFunc) afterFunc();
                                }
                            }
                        )
                    });
                }});


                }
            }
        )
    },


    /**
     *    胜负检测
     */
    checkFight: () => {
        let hero1,hero;
        // 首先检查敌人队伍人数
        let a=0,p = 0,e=0;
        for (let i = 0; i < Fight.queue.length; i++) {
            hero = Fight.queue[i];
            if (hero.isHero) {
                p++;
            } else {
                e++
            }
        }

        if(e===0){
            Fight.state = Fight.WIN;
            return true;
        }
        if(p===0){
            Fight.state = Fight.LOST;
            return true;
        }
        return false;

        // 首先检查敌人队伍人数
        // a = 0;
        // for (let i = 0; i < Fight.eTeam.heroList.length; i++) {
        //     hero1 = Fight.eTeam.heroList[i];
        //     if (hero1.alive) {
        //         a++;
        //     }
        // }
        // if (a === 0) {
        //     Fight.state = Fight.WIN;
        //     return true;
        // }
        // a = 0;
        // for (let i = 0; i < Fight.pTeam.heroList.length; i++) {
        //     hero1 = Fight.pTeam.heroList[i];
        //     if (hero1.alive) {
        //         a++;
        //     }
        // }
        // if (a === 0) {
        //     Fight.state = Fight.LOST;
        //     return true;
        // }
    },

    bossFight: (enemyId,lv) => {
        socket.wlSend('inBattle',{'enemy':enemyId,'lv':lv});
        let enemyTeam = RPG.beget(PlayerTeam);
        enemyTeam.clear();
        for (let i = 0; i < enemyId.length; i++) {
            let id = enemyId[i];
            enemyTeam.addEnemy(id, lv);
        }
        Lib.bgm('BossFight',true);

        Fight.startFight(enemyTeam, mainTeam);
        //战斗结束后回调
        if(!Menu.callback){
            Menu.waitMenu(()=>{
                RPG.popState();
                if (Fight.state === Fight.WIN) {
                } else if (Fight.state === Fight.LOST) {
                    //战败
                } else {
                    // 不胜不败，并不可能
                }
            });
        }
    },
    normalFight: (enemyId,lv) => {
        socket.wlSend('inBattle',{'enemy':enemyId,'lv':lv});
        let enemyTeam = RPG.beget(PlayerTeam);
        enemyTeam.clear();
        for (let i = 0; i < enemyId.length; i++) {
            let id = enemyId[i];
            enemyTeam.addEnemy(id, lv);
        }
        Lib.bgm('BattleTheme',true);

        Fight.startFight(enemyTeam, mainTeam);
        //战斗结束后回调
        if(!Menu.callback){
            Menu.waitMenu(()=>{
                RPG.popState();
                if (Fight.state === Fight.WIN) {
                } else if (Fight.state === Fight.LOST) {
                    //战败
                } else {
                    // 不胜不败，并不可能
                }
            });
        }

    },

    /**
     * 计算经验值
     */
    calculateExp: () => {
        // 原则，首先针对每个人的等级，分别计算各自获得的单人经验值
        // 然后2个人出场只能获得实际的80%，3人70%，4人60%，5人50%。
        let getExp = [];
        let hero1, hero2;
        let a, b1, b2;
        // 参考折扣率，目前最多支持5个人同时战斗
        let rateList = [1, 0.8, 0.7, 0.6, 0.5, 0.5];
        let rate = rateList[Fight.pTeam.heroList.length - 1];
        for (let j = 0; j < Fight.pTeam.heroList.length; j++) {
            hero1 = Fight.pTeam.heroList[j];
            a = 0;
            a += hero1.Hp;

            // for (let i = 0; i < Fight.eTeam.heroList.length; i++) {
            //     hero2 = Fight.eTeam.heroList[i];
                // 基本经验

                // b1 = (hero2.Level - hero1.Level) * 2;
                // // if (b1 > 16) {
                // //     b1 = 16;
                // // } else if (b1 < 0) {
                // //     b1 = 0;
                // // }
                // // 奖励经验
                // if (hero2.Level > hero1.Level) {
                //     b2 = 32;
                // } else {
                //     b2 = 64 / (hero1.Level - hero2.Level + 2);
                // }
                // a = a + b1;
                // if (i === 0) {
                //     // 第一敌人，有额外的奖励经验
                //     a = a + b2;
                // }
                // a += hero1.Hp;
            // }
            if (!hero1.alive) {
                // 战场阵亡，经验减半
                a = a / 2;
            }
            // 根据人数打折扣
            a = a * rate;
            getExp.push(a>>0);
        }
        return getExp;
    },

    /**
     * 显示战斗结果
     */
    showResult: () => {
        RPG.curBGMObj.close();
        if (Fight.state === Fight.WIN) {
            Lib.bgm('Winning');
            // 胜利，获得经验及奖励物品
            let exp = Fight.calculateExp(),hero1, item1,text,yy=40, xx,money=0;
            // 经验值的计算
            if (!Fight.trophy) {
                for (let j = 0; j < Fight.pTeam.heroList.length; j++) {
                    exp[j] = 1;
                }
            }
            xx = menuWidth / 2;
            // 获得经验值
            for (let j = 0; j < Fight.pTeam.heroList.length; j++) {
                hero1 = Fight.pTeam.heroList[j];
                // 增加经验，及判断升级
                hero1.addExp(exp[j]);

                // 显示获得的经验值
                text = UI.text(hero1.nickName+" Exp " + exp[j] + "↑",xx, yy);
                Fight.layer.addChild(text);
                yy += 20;
            }
            yy = yy + STEP + 20;

            // 获得物品
			if (Fight.trophy) {
                // for (let j = 0; j < Fight.eTeam.itemList.length; j++) {
                //     item1 = Fight.eTeam.itemList[j];
                //     // 获得敌队的物品
                //     Fight.pTeam.addItem(item1.id, item1.num);
                //     // 图片
                //     // 物品数量
                //     text = UI.text(item1.num, xx, yy + j * 30 + 5);
                //     Fight.layer.addChild(text);
                // }
                for (let j = 0; j < Fight.eTeam.heroList.length; j++) {
                    let enemy = Fight.eTeam.heroList[j];
                    // 获得敌队的物品
                    Fight.pTeam.addMoney(enemy.price);
                    money += Number(enemy.price);
                }
                // 物品数量
                text = UI.text('金钱：'+money,xx,yy);
                Fight.layer.addChild(text);
            }
        } else {
            // 敌人占中正面
            Lib.bgm('Fail');
            let hero1;
            for (let j = 0; j < Fight.eTeam.heroList.length; j++) {
                hero1 = Fight.eTeam.heroList[j];
                hero1.fighter.changeDir(0);
                hero1.fighter.x = menuWidth / 2 - hero1.fighter.getWidth() / 2;
            }
            FightMenu.setFormation('我方团灭，别说忘了存档');
        }
        Lib.bgm(stage.music,true);
        setTimeout(Menu.closeMenu,3000);

    },

    //计算团队的平均速度
    getEmyAverageSpeed:(team)=>{
        let sumSpeed = 0;
        let len = team;
        team.forEach(function(o) {
            sumSpeed += o.speed;
        });

        return (sumSpeed / len) >> 0;
    },

    //是否先制攻击
    isForestall:()=>{
        let emyAvgSpeed = Fight.getEmyAverageSpeed(Fight.eTeam.heroList);
        let playerSpeed = Fight.getEmyAverageSpeed(Fight.pTeam.heroList);

        if(playerSpeed >= emyAvgSpeed) {
            if(Math.random() > 0.6) return true;
        } else {
            if(Math.random() > 0.9) return true;
        }
        return false;
    },

    //是否被偷袭
    isSneak:()=>{
        let emyAvgSpeed = Fight.getEmyAverageSpeed(Fight.eTeam.heroList);
        let playerSpeed = Fight.getEmyAverageSpeed(Fight.pTeam.heroList);

        if(emyAvgSpeed >= playerSpeed) {
            if(Math.random() >= 0.5) return true;
        } else {
            if(Math.random() >= 0.8) return true;
        }
        return false;
    },

    /**
     * 计算战场行动队列
     * */
    actionQueue:()=>{
        if(Fight.isForestall()) {
            UI.showInfo('我方偷袭敌人!');
            //偷袭敌人 我方所有人员先行攻击
            Fight.queue = mainTeam.heroList.concat(Fight.eTeam.heroList);
        } else if(Fight.isSneak()) {
            UI.showInfo('被敌人偷袭!');
            //被偷袭 敌方所有人员先行攻击
            Fight.queue = Fight.eTeam.heroList.concat(mainTeam.heroList);
        }else {
            //遭遇战 按速度排序
            Fight.queue = Fight.eTeam.heroList.concat(mainTeam.heroList).sort(function(a,b) {
                return a.speed < b.speed;
            });
        }
    },


    /**
     * 物理攻击效果的计算
     * @param heroAtk  {object} 攻击方
     * @param heroDef  {object} 防御方
     * @returns
     */
    physicalAttack:(heroAtk, heroDef)=>{
        let atk, def;
        let weaponAttack = 1;
        let armorDefend = 1;
        let vaporAtk, vaporDef;
        // 有装备，加成
        if (heroAtk.weapon >= 0) {
            let aon = heroAtk.getWeapon().attack;
            if (aon) weaponAttack = aon;
        }
        // 士气加成
        vaporAtk = (heroAtk.Hp / heroAtk.maxHp + 1) / 2 * 100;
        // 攻击力
        atk = heroAtk.attack + vaporAtk + weaponAttack;
        // 防守方护甲加成
        let armor = heroDef.armor>-1 ? heroDef.getArmor().defend:0;
        let hand = heroDef.hand>-1 ? heroDef.getHand().defend:0;
        let foot = heroDef.foot>-1 ? heroDef.getFoot().defend:0;
        let head = heroDef.head>-1 ? heroDef.getHead().defend:0;
        armorDefend = armor+hand+foot+head;
        // 士气加成
        vaporDef= (heroDef.Hp/ heroDef.maxHp+ 1)/ 2* 100;
        // 防御力
        def= heroDef.defend + vaporDef + armorDefend;
        // 攻击效果随机加成 0.9 ~ 1.1
        let ran= (rangeRand(0, 100)+ 1000)/ 1000;
        let result= (atk- def/ 2)* ran;
        if (result<= 0) {
            result= 1;
        }
        //秒杀
        if (result > heroDef.Hp) {
            UI.showInfo(heroDef.name+'被秒杀');
        }
        return result>>0;
    },

    /**
     * 物理攻击效果的计算
     * @param heroAtk  {object} 攻击方
     * @param heroDef  {object} 防御方
     * @returns
     */
    physicalTankAttack:(heroAtk, heroDef,weapon)=>{
        let atk, def;
        let weaponAttack = 1;
        let armorDefend = 1;
        let vaporAtk, vaporDef;
        //装备攻击力
        let id = heroAtk[weapon];
        if ( id > 0 ) {
            let aon = ItemList[id-1].attack;
            if (aon) weaponAttack = aon *4;
        }
        // 士气加成
        vaporAtk = (heroAtk.Hp / heroAtk.maxHp + 1) / 2 * 100;
        // 攻击力
        atk = vaporAtk + weaponAttack;
        // 防守方护甲加成
        armorDefend = (heroDef.maxDefend/2)>>0;
        // 士气加成
        vaporDef= (heroDef.Hp/ heroDef.maxHp+ 1)/ 2* 100;
        // 防御力
        def = vaporDef + armorDefend;
        // 攻击效果随机加成 0.9 ~ 1.1
        let ran= rangeRand(1,5);
        let result= (atk- def/ 2)* ran;
        if (result<= 0) {
            result= 1;
        }
        //秒杀
        if (result > heroDef.Hp) {
            UI.showInfo(heroDef.nickName+'被秒杀');
        }
        return result>>0;
    },

    //敌人分组
    processEnemyGroup:()=> {
        let enemyList = Fight.eTeam.heroList;
        let list = [];
        let enemyNumber = enemyList.length;
        let groupNumber;    //分若干组
        let group_1 = [];
        let group_2 = [];
        let group_3 = [];

        enemyList.forEach(function (o) {
            let enemy = new Enemy(enemyConfig[o]);
            list.push(enemy);
        });

        //将敌人分组
        if (enemyNumber === 1) {//当敌人列表中只有一个敌人
            group_1.push(list);
            return group_1;
        } else if (enemyNumber === 2) {//当敌人列表中有两个敌人
            groupNumber = rangeRand(1, 2);   //随机分为一组或两组
            if (groupNumber === 2) {
                group_1.push(list[0]);
                group_2.push(list[1]);
                return [group_1, group_2];
            } else {
                group_1.push(list);
                return group_1;
            }
        } else {//敌人列表中有三个或三个以上敌人
            groupNumber = rangeRand(1, 3);   //随机分为一、二或三组
            if (groupNumber === 3) {//三组
                list.forEach(function (o, i) {
                    if (i === 0) group_1.push(list[i]);
                    else if (i === 1) group_2.push(list[i]);
                    else group_3.push(list[i]);
                });
                return [group_1, group_2, group_3];
            } else if (groupNumber === 2) {//两组
                list.forEach(function (o, i) {
                    if (i === 0) group_1.push(list[i]);
                    else group_2.push(list[i]);
                });
                return [group_1, group_2];
            } else {
                list.forEach(function (o, i) {
                    group_1.push(list[i]);
                });
                return [group_1];
            }
        }
    },

    infoCommand:function (text) {
        if(Fight.textArr.length>=5){
            Fight.textArr.pop();
            Fight.textArr.pop();
            Fight.textArr.pop();
        }
        Fight.textArr.unshift(text);
        Fight.textObj.text = Fight.textArr.join('\n');
    }


};










