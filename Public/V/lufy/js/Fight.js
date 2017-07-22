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


//  战斗过程控制
RPG.stopAuto= false;
RPG.afterStop= null;   /// func
RPG.quickFight= false;
RPG.finalButtonSetFunc= null;

// 最大HP，用于对比显示，给一个最小的参考值，一场战斗一旦确定则不再改变
RPG.maxHpAll= 1000;
RPG.maxMpAll= 100;

let gameMenus = ['背包','乘降','强度','存档','任务','返回'];
let fightMenus = ['攻击','阵形','道具','防御','逃跑','总攻'];

let Fight = {
    //战利品和经验获得 凌弱战true
    trophy: false,
    // 当前正在动作的对象
    currentFighter:{},
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

    /**
     * 普通战斗
     */
    simpleFight: (teamId, npc = {}) => {
        let enemyHero = RPG.beget(HeroPlayer);
        let playerHero = RPG.beget(HeroPlayer);
        RPG.extend(enemyHero, RPG.enemyTeam[teamId].getHero(0));
        RPG.extend(playerHero, mainTeam.getHero(0));

        // 敌方满血
        enemyHero.fullHeal();
        // 被攻击预算
        let a1 = Fight.physicalAttack(enemyHero, playerHero);
        let r1 = a1 / playerHero.Hp;
        // 攻击预算
        let a2 = Fight.physicalAttack(playerHero, enemyHero);
        let r2 = a2 / enemyHero.Hp;
        // 攻击力超过敌人血量，秒杀并无意义
        if (r2 > 1) r2 = 1;
        if ((playerHero.Level - enemyHero.Level) >= 3 && r2 / r1 > 3) {
            // 级别差三级以上，同时首击效果相差太大，则开始逃散
            let choice1 = {
                img: "", msg: "敌人四散奔逃，是否追击？",
                choise: [
                    {
                        text: "追击（经验少且无战利品）", action: function () {
                        Talk.closeTalk();
                        RPG.pushState(RPG.FIGHT_RESULT);
                        Fight.startFight(RPG.enemyTeam[teamId], mainTeam, true, true);
                        Menu.waitMenu(()=>{
                            if (Fight.state === Fight.WIN) {
                                // npc.visible= false;
                                RPG.popState();
                            } else if (Fight.state === Fight.LOST) {
                                RPG.drawGameOver();
                            } else {
                                // 不胜不败
                                // npc.visible= false;
                                RPG.popState();
                            }

                        });
                    }
                    },
                    {
                        text: "不追击", action: function () {
                        Talk.closeTalk();
                        // npc.visible= false;
                    }
                    }]
            };
            Talk.makeChoice(choice1);
        } else {
            RPG.pushState(RPG.FIGHT_RESULT);
            Fight.startFight(RPG.enemyTeam[teamId], mainTeam);
            Menu.waitMenu(()=>{
                if (Fight.state === Fight.WIN) {
                    // npc.visible= false;
                    RPG.popState();
                } else if (Fight.state === Fight.LOST) {
                    RPG.drawGameOver();
                } else {
                    // 不胜不败
                    RPG.popState();
                }
            });
        }
    },

    /**
     * 战斗初始化
     */
    startFight: (enemyTeam, playerTeam) => {
        //设置控制状态
        RPG.pushState(RPG.IN_FIGHTING);
        // 设置战斗状态
        Fight.state = Fight.FIGHTING;
        //将对话层清空
        talkLayer.removeAllChild();
        // 进入即不可再开菜单了
        clearTimeout(timer);
        //当对话开始，且按照顺序进行对话
        isKeyDown = false;

        //对话背景
        talkLayer.x = 10;
        talkLayer.y = 10;
        UI.drawBorderWindow(talkLayer, 0, 0, menuWidth, menuHeight);
        // 子菜单层
        if (!RPG.descLayer) RPG.descLayer = new LSprite();
        RPG.descLayer.removeAllChild();
        RPG.descLayer.x = 0;
        RPG.descLayer.y = 0;
        talkLayer.addChild(RPG.descLayer);
        RPG.ctrlLayer = new LSprite();
        talkLayer.addChild(RPG.ctrlLayer);
        // 敌人队全满参战
        enemyTeam.fullHeal();
        RPG.quickFight = false;
        Fight.fightState = 0;
        Fight.eTeam = enemyTeam;
        Fight.pTeam = playerTeam;
        console.log('eTeam',Fight.eTeam);
        console.log('pTeam',Fight.pTeam);

        showFightInfo();
        let text = UI.text('遭遇战，敌我力量悬殊，敌方士气大减',gap,HEIGHT-100+gap,'10');
        text.setWordWrap(true);
        RPG.fightMenuLayer.addChildAt(text,1);
        Fight.drawFighters();
    },

    /**
     * 绘制战斗场景
     */
    drawFighters: () => {
        // 战斗窗口基本站位
        let hero1, chara, bitmapData, col,row, x, y, team, hpText, dir;
        RPG.descLayer.removeAllChild();
        let text = new LTextField();
        text.size = '10';
        text.color = '#fff';
        text.textAlign = 'center';
        text.width = 40;
        //绘制敌我两队到战场
        for (let j = 0; j < 2; j++) {
            team = j ? Fight.pTeam.heroList : Fight.eTeam.heroList;
            dir = j ? RPG.LEFT : RPG.RIGHT;
            y = gap * 2;
            x = j ? menuWidth - STEP - gap*2 : gap;
            for (let i = 0; i < team.length; i++) {
                hero1 = team[i];
                bitmapData = new LBitmapData(imglist[hero1.img]);
                col = hero1.getPerson().col || 4;
                row = hero1.getPerson().row || 4;
                chara = new Fighter(bitmapData, row, col);
                if (!hero1.alive) {
                    y = y + chara.getHeight() + 30;
                    continue;
                }
                chara.changeDir(dir);
                chara.x = x;
                chara.y = y;
                RPG.descLayer.addChild(chara);

                hero1.fighter = chara;
                y = y + chara.getHeight() + 5;

                hpText = text.clone();
                hpText.text = hero1.Hp;
                hpText.x = x+gap;
                hpText.y = y;
                RPG.descLayer.addChild(hpText);
                y += 3*gap;
            }
        }

        Fight.drawActButton();

    },

    /**
     * 战斗按钮操作
     */
    drawActButton: () => {
        // 控制按钮
        let attackButton = null;
        let exitButton = null;
        let x0, y0;
        let useWidth = menuWidth - gap * 2;
        x0 = useWidth / 8 - RPG.iconStep * 1.5 / 2 + gap;
        y0 = HEIGHT - 120;
        const list = [
            {label:"攻击",list:[
                {label:"主炮",click:()=>{trace("File");}},
                {label:"副炮",click:()=>{trace("File");}},
                {label:"SE",click:()=>{trace("Open File")}},
            ]},
            {label:"防御",click:()=>{trace("Test1");}},
            {label:"逃跑",click:()=>{trace("Test1");}},
            {label:"乘降",click:()=>{trace("Test1");}},
        ];

        let menu = new LMenubar(list,{textSize:10,textColor:"#000",lineColor:"#000",backgroundColor:"#eee"});
        menu.x = x0;
        menu.y = y0;
        talkLayer.addChild(menu);
        // attackButton = UI.fightButton(x0, y0, "攻击", function (e) {
        //     RPG.stopAuto = true;
        //     exitButton.setState(LButton.STATE_DISABLE);
        //     Fight.fightState = 1;
        //     Fight.autoFight(0);
        //     // 首先等待自动战斗结束后，才能开启其他按钮
        //     attackButton.setState(LButton.STATE_DISABLE);
        //     RPG.afterStop = function () {
        //         attackButton.setState(LButton.STATE_ENABLE);
        //         exitButton.setState(LButton.STATE_ENABLE);
        //         Fight.fightState = 0;
        //     }
        // });
        // talkLayer.addChild(attackButton);
        // x0 = x0 + useWidth / 4;
        // exitButton = UI.fightButton(x0, y0, "逃跑", function (e) {
        //     // 直接获胜
        //     Menu.closeMenu();
        // });
        Fight.endCallback = ()=>{
            exitButton.setState(LButton.STATE_ENABLE);
        };
        // talkLayer.addChild(exitButton);
        /*for (let i = 0; i < fightMenus.length; i++) {
            let currText = fightMenus[i];
            attackButton = UI.fightButton(x0, y0, currText, function (e) {
                RPG.stopAuto = true;
                exitButton.setState(LButton.STATE_DISABLE);
                Fight.fightState = 1;
                Fight.autoFight(0);
                // 首先等待自动战斗结束后，才能开启其他按钮
                attackButton.setState(LButton.STATE_DISABLE);
                RPG.afterStop = function () {
                    attackButton.setState(LButton.STATE_ENABLE);
                    exitButton.setState(LButton.STATE_ENABLE);
                    Fight.fightState = 0;
                }
            });

        }*/

    },

    //绘制攻击中的特效动画
    autoFight: (heroId) => {
        // 简单的顺序，我方依次先动，敌方依次再动
        let hero1, hero2;
        let a, b;
        let effect;
        if (heroId >= (Fight.pTeam.heroList.length + Fight.eTeam.heroList.length)) {
            if (RPG.stopAuto) {
                if (RPG.afterStop) RPG.afterStop();
                return;
            } else {
                heroId = 0;
            }
        }
        Fight.currentFighter = heroId;
        b = rangeRand(1, Fight.eTeam.heroList.length);
        if (heroId < Fight.pTeam.heroList.length) {
            hero1 = Fight.pTeam.heroList[heroId];
            if (!hero1.alive) {
                Fight.autoFight(heroId + 1);
                return;
            }
            switch (b) {
                case 1:
                    a = rangeRand(0, Fight.eTeam.heroList.length);
                    a = 10;
                    hero2 = Fight.eTeam.getAliveHero(a);
                    trace(hero1.getName() + '攻击' + hero2.getName());
                    effect = "pSword";
                    // 计算攻击效果
                    let ret = Fight.physicalAttack(hero1, hero2);
                    hero2.beHit(ret);
                    trace(hero2.getName() + '损伤' + ret);
                    break;
                case 2:
                    a = rangeRand(0, Fight.eTeam.heroList.length);
                    hero2 = Fight.eTeam.getAliveHero(a);
                    effect = "mAttack";
                    break;
                case 3:
                    a = rangeRand(0, Fight.pTeam.heroList.length);
                    hero2 = Fight.eTeam.getAliveHero(a);
                    //回血动画
                    effect = "heal";
                    break;
            }
        } else if (heroId < Fight.pTeam.heroList.length + Fight.eTeam.heroList.length) {
            hero1 = Fight.eTeam.heroList[heroId - Fight.pTeam.heroList.length];
            if (!hero1.alive) {
                Fight.autoFight(heroId + 1);
                return;
            }
            switch (b) {
                case 1:
                    a = rangeRand(0, Fight.pTeam.heroList.length);
                    hero2 = Fight.pTeam.getAliveHero(a);
                    trace(hero1.getName() + '攻击' + hero2.getName());
                    effect = "pAttack";
                    if (hero2) {
                        let ret = Fight.physicalAttack(hero1, hero2);
                        hero2.beHit(ret);
                        trace(hero2.getName() + '损伤' + ret);
                    }
                    break;
                case 2:
                    a = rangeRand(0, Fight.pTeam.heroList.length);
                    hero2 = Fight.pTeam.getAliveHero(a);
                    effect = "mAttack";
                    break;
                case 3:
                    a = rangeRand(0, Fight.pTeam.heroList.length);
                    hero2 = Fight.pTeam.getAliveHero(a);
                    effect = "heal";
                    break;
            }
        }
        if (hero1) {
            if (RPG.quickFight) {
                console.log("Do quick attack", heroId);
                Fight.doQuickFight(hero1, hero2, effect, function () {
                    Fight.autoFight(heroId + 1);
                });
            } else {
                console.log("Do normal attack", heroId);
                // 获得正确的动画显示效果
                if(hero1.getWeapon){
                    let item1 = hero1.getWeapon();
                    if (item1) effect = item1.atkEff;
                }

                if (!effect) {
                    // 最后的默认值
                    effect = ["220Animation",4,5];
                }
                Fight.doNormalFight(hero1, hero2, effect, function () {
                    Fight.autoFight(heroId + 1);
                });
            }
        }
    },

    /**
     * 开始攻击动作
     */
    doNormalFight: (hero, toHero, actEffect, afterFunc) => {
        // 我方物理攻击
        let x0, x1, effect;
        // let effectName = actEffect[0];
        // let effectRow = actEffect[1];
        // let effectCol = actEffect[2];
        console.log('actEffect',actEffect);
        if ( (typeof actEffect) === 'object'){
            effect = RPG.loadEffect(actEffect[0],actEffect[1],actEffect[2],1);
        } else {
            effect = RPG.loadEffect(actEffect);
        }

        if (hero.fighter.x > menuWidth / 2) {
            x0 = hero.fighter.x;
            x1 = menuWidth / 2 + gap;
        } else {
            x0 = hero.fighter.x;
            x1 = menuWidth / 2 - gap - RPG.STEP;
        }
        // 人物前进
        LTweenLite.to(hero.fighter, 0.3,
            {
                scaleX: 1, scaleY: 1, alpha: 1, x: x1, ease: Circ.easeOut,
                onComplete: function () {
                    //console.log("a");
                    //hero.fighter.x= x1;
                    if (toHero) {
                        effect.x = toHero.fighter.x + (toHero.fighter.getWidth() - effect.getWidth()) / 2;
                        effect.y = toHero.fighter.y + (toHero.fighter.getHeight() - effect.getHeight()) / 2;
                    } else {
                        effect.x = -100;
                    }
                    RPG.descLayer.addChild(effect);
                    effect.play(1, function () {
                        // 刷新数据
                        //Fight.drawData();
                        if (toHero && !toHero.alive) {
                            toHero.fighter.visible = false;
                        }
                        // 动画效果消失
                        RPG.descLayer.removeChild(effect);
                        LTweenLite.to(hero.fighter, 0.5,
                            {
                                scaleX: 1, scaleY: 1, alpha: 1, x: x0, ease: Circ.easeOut,
                                onComplete: function () {
                                    // 然后判断胜负
                                    if (Fight.checkFight()) {
                                        //显示战斗结果
                                        Fight.showResult();
                                        Fight.endCallback();
                                        return;
                                    }
                                    // 下一个
                                    if (afterFunc) afterFunc();
                                }
                            }
                        )
                    });
                }
            }
        )
    },

    /**
     *    胜负检测
     */
    checkFight: () => {
        let a;
        let hero1;
        // 首先检查敌人队伍人数
        a = 0;
        for (let i = 0; i < Fight.eTeam.heroList.length; i++) {
            hero1 = Fight.eTeam.heroList[i];
            if (hero1.alive) {
                a++;
            }
        }
        if (a === 0) {
            Fight.state = Fight.WIN;
            return true;
        }
        a = 0;
        for (let i = 0; i < Fight.pTeam.heroList.length; i++) {
            hero1 = Fight.pTeam.heroList[i];
            if (hero1.alive) {
                a++;
            }
        }
        if (a === 0) {
            Fight.state = Fight.LOST;
            return true;
        }
        return false;
    },

    bossFight: () => {
        RPG.pushState(RPG.FIGHT_RESULT);
        Fight.startFight(RPG.enemyTeam[5], mainTeam, false);
        Menu.waitMenu(function () {
            if (Fight.state === Fight.WIN) {
                RPG.popState();
                RPG.setSwitch("gate1win");
                let char1 = stage.charaList["boss"];
                char1.visible = false;
            } else if (Fight.state === Fight.LOST) {
                // 结束游戏
                RPG.drawGameOver();
            } else {
                // 不胜不败，并不可能
                RPG.popState();
            }
        });
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
            for (let i = 0; i < Fight.eTeam.heroList.length; i++) {
                hero2 = Fight.eTeam.heroList[i];
                // 基本经验
                b1 = (hero2.Level - hero1.Level + 3) * 2;
                if (b1 > 16) {
                    b1 = 16;
                } else if (b1 < 0) {
                    b1 = 0;
                }
                // 奖励经验
                if (hero2.Level > hero1.Level) {
                    b2 = 32;
                } else {
                    b2 = 64 / (hero1.Level - hero2.Level + 2);
                }
                a = a + b1;
                if (i === 0) {
                    // 第一敌人，有额外的奖励经验
                    a = a + b2;
                }
            }
            if (!hero1.alive) {
                // 战场阵亡，经验减半
                a = a / 2;
            }
            // 根据人数打折扣
            a = a * rate;
            getExp.push(Math.floor(a));
        }
        return getExp;
    },

    /**
     * 显示战斗结果
     */
    showResult: () => {
        if (Fight.state === Fight.WIN) {
            // 胜利，获得经验及奖励物品
            let exp = Fight.calculateExp(),hero1, item1,text,yy, xx;
            // 经验值的计算
            if (!Fight.trophy) {
                for (let j = 0; j < Fight.pTeam.heroList.length; j++) {
                    exp[j] = 1;
                }
            }
            // 获得经验值
            for (let j = 0; j < Fight.pTeam.heroList.length; j++) {
                hero1 = Fight.pTeam.heroList[j];
                // 增加经验，及判断升级
                hero1.addExp(exp[j]);
                // 人物转正面
                hero1.fighter.changeDir(0);
                // 阵亡将士显示
                if (!hero1.alive) {
                    hero1.fighter.visible = true;
                    hero1.fighter.alpha = 0.3;
                }
                hero1.fighter.x = menuWidth / 2 - STEP / 2;
                // 显示获得的经验值
                text = UI.text("Exp " + exp[j] + "↑", hero1.fighter.x + 40, hero1.fighter.y + 5);
                RPG.descLayer.addChild(text);
                yy = hero1.fighter.y;
            }
            yy = yy + STEP + 20;
            xx = menuWidth / 2;

            // 获得物品
			if (Fight.trophy) {
                for (let j = 0; j < Fight.eTeam.itemList.length; j++) {
                    item1 = Fight.eTeam.itemList[j];
                    // 获得敌队的物品
                    Fight.pTeam.addItem(item1.index, item1.num);
                    // 图片
                    // 物品数量
                    text = UI.text(item1.num, xx, yy + j * 30 + 5);
                    RPG.descLayer.addChild(text);
                }
            }
        } else {
            // 敌人占中正面
            let hero1;
            for (let j = 0; j < Fight.eTeam.heroList.length; j++) {
                hero1 = Fight.eTeam.heroList[j];
                hero1.fighter.changeDir(0);
                hero1.fighter.x = menuWidth / 2 - hero1.fighter.getWidth() / 2;
            }
        }
    },

    /**
     * 快速战斗
     */
    doQuickFight: (hero, toHero, actEffect, afterFunc) => {
        // 只进行胜负检查
        if (Fight.checkFight()) {
            // 无论输赢，都不再继续
            Fight.drawFighters();
            Fight.showResult();
            return;
        }
        // 下一个
        if (afterFunc) afterFunc();
    },

    //计算敌人的平均速度
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
        let emyAvgSpeed = Fight.getEmyAverageSpeed();
        let playerSpeed = mainTeam.getHero();

        if(playerSpeed >= emyAvgSpeed) {
            if(Math.random() >= 0.8) return true;
        } else {
            if(Math.random() >= 0.9) return true;
        }
        return false;
    },

    //是否被偷袭
    isSneak:()=>{
        let emyAvgSpeed = Fight.getEmyAverageSpeed();
        let playerSpeed = player.getSpeed();

        if(emyAvgSpeed >= playerSpeed) {
            if(Math.random() >= 0.5) return true;
        } else {
            if(Math.random() >= 0.8) return true;
        }
        return false;
    },

    /**
     * 物理攻击效果的计算
     * @param heroAtk  {object} 攻击方
     * @param heroDef  {object} 防御方
     * @returns
     */
    physicalAttack:(heroAtk, heroDef)=>{
        let atk, def;
        let pAtk= heroAtk.getPerson();
        let pDef= heroDef.getPerson();
        let weaponAddOn= 1;
        let armorAddOn= 1;
        let vaporAtk, vaporDef;
        // 有装备，加成
        if (heroAtk.weapon >= 0) {
            let aon = heroAtk.getWeapon().addOn;
            if (aon) weaponAddOn= aon;
        }
        // 士气加成
        vaporAtk = (heroAtk.Hp / heroAtk.MaxHp + 1) / 2 * 100;
        // 攻击力
        atk = (4000/ (140- pAtk.force)+ pAtk.atk* 2+ vaporAtk)* (heroAtk.Level/ 10+ 1)* weaponAddOn;
        // 防守方护甲加成
        if (heroDef.armor >= 0) {
            let aon = heroDef.getArmor().addOn;
            if (aon) armorAddOn = aon;
        }
        // 士气加成
        vaporDef= (heroDef.Hp/ heroDef.MaxHp+ 1)/ 2* 100;
        // 防御力
        def= (4000/ (140- pDef.force)+ pDef.def* 2+ vaporDef)* (heroDef.Level/ 10+ 1)* armorAddOn;
        // 攻击效果随机加成 0.9~1.1
        let ran= (rangeRand(0, 100)+ 1000)/ 1000;
        let result= (atk- def/ 2)* ran;
        if (result<= 0) {
            result= 1;
        }
        //秒杀
        // if (result > heroDef.Hp) {
        //     result = heroDef.Hp;
        // }
        return result>>0;
    }
};










