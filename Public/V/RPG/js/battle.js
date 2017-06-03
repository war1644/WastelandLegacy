/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 游戏客户端战斗类
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/05/27 初版
 */
function battle(enemyGroupID,firstEnemy) {
    new BattleTransitionScene(game.width,game.height,()=>{
        battle.msgPoint = [140,game.height-70+5];
        addBattleScene(enemyGroupID);
        // battle.firstEnemy = firstEnemy;
        battle.isBoss = enemyGroupID==2 ? true : false;
        new SoundManage(battle.isBoss ? 'music04' : 'music09',true);
    });
}
battle.enemyLoaded = false; //标识敌人是否加载完成
//敌人出现的位置(固定)
battle.enemyLocation = [
    [0,85],[68,85],
    [0,125],[68,125],
    [0,45],[68,45],
    [0,5],[68,5]
];
battle.battleInfo = []; //战斗信息
battle.enemies = [];  //出现的敌人
battle.actionQueue = [];    //行动列表
battle.battleStart = false;
battle.roundEnd = true;
battle.exp = 0; //战斗经验值
battle.gp = 0;  //战斗得到的金钱


//战斗场景
function addBattleScene(enemyGroupID) {
    let scene = new enchant.Scene();
    let group;
    let keyCount = 0;

    battle.battleInfo = [];
    addBattleScene.group_1 = [];
    addBattleScene.group_2 = [];

    let bg = new backSprite2(0,0,game.width,game.height,'',1);

    //玩家战斗菜单
    /*
     -----------------------1--------------------------
     |           | ------------------------ |         |
     |----3------| ------------------------ |         |
     |           | ------------------------ |         |
     -----------------6--------------------------------
     */
    let line1 = new whiteSprite(0,game.height-70,game.width,1);
    let line2 = new whiteSprite(130,game.height-70,1,100);
    let line3 = new whiteSprite(0,game.height-42,130,1);
    let line4 = new whiteSprite(game.width-1,game.height-70,1,70);
    let line5 = new whiteSprite(0,game.height-70,1,70);
    let line6 = new whiteSprite(0,game.height-1,game.width,1);
    let line7 = new whiteSprite(game.width-71,game.height-70,1,100);

    let opLabel = new textLabel('攻击',30,game.height-40);
    let opLabel2 = new textLabel('道具',90,game.height-40);
    let opLabel3 = new textLabel('防卫',30,game.height-20);
    let opLabel4 = new textLabel('逃跑',90,game.height-20);

    //x,y,number,verticalStep,horizonalStep
    let choice = new cursor2(10,game.height-40,4,20,60);
    addBattleScene.group_2.push(choice);

    //玩家信息
    let playerName = new textLabel(p1.player.name,20,game.height-64);
    let playerWeapon = new textLabel(p1.player.equip[0].name,75,game.height-64);
    let p1Hp = new textLabel('HP '+p1.player.hp,game.width-70+1,game.height-65);
    battle.p1Hp = p1Hp;

    let p1Battle = new gameSprite('player1_battle',game.width-50,(game.height>>3)+10);    //战斗姿势
    let p1Weapon = new gameSprite('weapon01',game.width-50,(game.height>>3)+20,1.5,1.5);   //武器

    battle.p1Battle = p1Battle;

    addBattleScene.group_2.push(p1Weapon);
    p1Weapon.visible = false;

    group = addToStage([bg,line1,line2,line3,line4,line5,line6,line7,opLabel,opLabel2,opLabel3,opLabel4,choice,playerName,playerWeapon,p1Hp,p1Battle,p1Weapon]);

    scene.addChild(group);
    game.pushScene(scene);

    //敌人随机出现
    selectEnemy(enemyGroupID);

    scene.on('enterframe',function() {
        if(choice.visible && game.input.a) {
            if(keyCount++ === 1 && battle.enemyLoaded) {
                new SoundManage('select');
                removeComponents(addBattleScene.group_1);
                switch (choice.selected) {
                    case 0://攻击
                        if(battle.damageInfo) game.currentScene.removeChild(battle.damageInfo);
                        let enemyNameGroup = displayGroupEnemy(battle.enemies);
                        let selectEnemyScene = new enchant.Scene();
                        let selectEnemy = new cursor(battle.msgPoint[0]-9,battle.msgPoint[1],'vertical',enemyNameGroup[1],20);
                        choice.visible = false;

                        selectEnemyScene.addChild(enemyNameGroup[0]);
                        selectEnemyScene.addChild(selectEnemy);
                        game.pushScene(selectEnemyScene);

                        selectEnemyScene.on('enterframe',function() {
                            if(game.input.b) {
                                if(keyCount++ === 1) {
                                    new SoundManage('select');
                                    game.popScene();
                                    choice.visible = true;
                                }
                            } else if(game.input.a) {
                                if(keyCount++ === 1) {//选择要攻击的敌人
                                    new SoundManage('select');
                                    let emy_select = enemyNameGroup[2][selectEnemy.selected];

                                    let emyList = battle.enemies.filter(function (o) {
                                        return o.id.toString() === emy_select;
                                    });

                                    if(emyList.length > 1) {
                                        //若该种类的敌人有多个，则赋予编号(敌人A、敌人B)
                                        emyList.forEach(function(o,i) {
                                            o.aliasName = '';
                                            o.aliasName += o.name + enemySign[i];
                                        });
                                    } else {
                                        emyList[0].aliasName = emyList[0].name;
                                    }
                                    game.popScene();
                                    //战斗
                                    fight(emyList,p1.player.equip[0].special);
                                }
                            } else keyCount = 0;
                        });
                        break;
                    //道具
                    case 1:
                        break;
                    //防御
                    case 2:
                        break;
                    //逃跑
                    case 3:
                        //逃跑成功率计算公式：F = (A * 32) / B + 30 * C
                        /*A为逃跑方的当前速度，包含加速buff。
                         B为对方的当前速度(或取对方的速度平均值)除以4再对256取余。
                         C为本次战斗中逃跑方已经尝试过的逃跑次数，包括正在进行的这一次逃跑。
                         若F大于255，则逃跑成功。否则在0到255之间生成一個随机数D。若D小于F则逃跑成功，否则逃跑失败。
                         若使用道具或某些特性逃跑必定成功*/
                        new SoundManage('music14');

                        game.popScene();
                        battle.gp = 0;
                        battle.exp = 0;
                        new TransitionScene3(game.width,game.height,function() {
                            new SoundManage('music01',true);
                            battle.enemies = [];
                            battle.enemyLoaded = false;
                            battle.roundEnd = true;
                            battle.battleInfo = [];
                        });
                        break;
                    default:
                        break;
                }
            }
        } else keyCount = 0;
    });
}


function addComponentsToArray(array) {
    for(let i = 1; i < arguments.length; i++) {
        if(arguments[i] instanceof Array) {
            arguments[i].forEach(function(o) {
                array.push(o);
            });
        } else {
            array.push(arguments[i]);
        }
    }
}

function hideComponents(array) {
    array.forEach(function(o) {
        o.visible = false;
    });
}
function removeComponents(array) {
    array.forEach(function(o) {
        game.currentScene.removeChild(o);
    });
    array.length = 0;
}
function showComponents(array) {
    array.forEach(function(o) {
        o.visible = true;
    });
}

//选择随机敌人
function selectEnemy(groupNumber) {
    let enemies = enemyGroup[groupNumber];
    let enemyList = []; //敌人列表

    //不是boss
    if (groupNumber != 2) {
        let enemyNumber = rangeRand(enemies.min,enemies.max);   //出现敌人的数量
        let candidate = []; //候选敌人列表

        //若候选敌人列表中为空，则表示候选敌人为全体类型的敌人
        if(enemies.enemies.length === 0) {
            candidate = enemyConfig.candidate;
            if(enemies.exclude.length !== 0) {  //需要排除的敌人
                enemies.exclude.forEach(function(o) {
                    let index = candidate.indexOf(o);
                    if(index > -1) {
                        candidate.splice(index,1);
                    }
                });
            }
        } else {
            candidate = enemies.enemies;
        }

        //在候选列表中提选出相应数量的敌人
        for(let i = 0; i < enemyNumber; i++) {
            enemyList.push(candidate[rand(candidate.length)]);
        }
    }else {
        enemyList = enemies.enemies;
    }


    let groupEnemy = generateEnemy(enemyList);
    let enemyNames = [];
    groupEnemy.forEach((o)=>{
        enemyNames.push(o[0].name);
    });
    //建立一个保存敌人位置的数组的副本
    let location = battle.enemyLocation.slice(0);
    let groupCount = 0; //敌人分组编号

    setTimeout(()=>{
        (function displayEmy() {
            if(groupEnemy.length) {
                //获取组内敌人
                let el = groupEnemy.shift();
                (function addEnemy(){
                    if(el.length) {
                        let child = el.shift();
                        //绘制到对应坐标，并加入到战斗场景
                        game.currentScene.addChild(child.draw(location[0][0],location[0][1]));
                        battle.enemies.push(child);
                        location.shift();
                        new SoundManage('music11');
                        setTimeout(addEnemy,300);
                    } else {
                        //怪物出现时显示的文字信息
                        let info = new textLabel(enemyNames[groupCount] + ' 出现了!<br/>',battle.msgPoint[0],battle.msgPoint[1]+20 * groupCount);
                        battle.battleInfo.push(info);
                        addComponentsToArray(addBattleScene.group_1,battle.battleInfo);
                        game.currentScene.addChild(info);
                        groupCount++;
                        setTimeout(displayEmy,500);
                    }
                })();
            } else {
                if(isForestall()) {
                    let info = new textLabel(`${enemyNames[groupCount]}出现了!<br/>但怪物还没有发现${p1.player.name}!<br/>`,battle.msgPoint[0],battle.msgPoint[1]+20 * groupCount);
                    battle.battleInfo.push(info);
                    addComponentsToArray(addBattleScene.group_1,battle.battleInfo);
                    game.currentScene.addChild(info);
                }
                //敌人参战完成
                battle.enemyLoaded = true;
            }
        })();
    },200);
}

//实例化列表中的敌人
function generateEnemy(enemyList) {
    let list = [];
    let enemyNumber = enemyList.length;
    let groupNumber;    //分若干组
    let group_1 = [];
    let group_2 = [];
    let group_3 = [];

    enemyList.forEach(function(o) {
        let enemy = new Enemy(enemyConfig[o]);
        list.push(enemy);
    });

    //将敌人分组
    if(enemyNumber === 1) {//当敌人列表中只有一个敌人
        group_1.push(list);
        return group_1;
    } else if(enemyNumber === 2) {//当敌人列表中有两个敌人
        groupNumber = rangeRand(1,2);   //随机分为一组或两组
        if(groupNumber === 2) {
            group_1.push(list[0]);
            group_2.push(list[1]);
            return [group_1,group_2];
        } else {
            group_1.push(list);
            return group_1;
        }
    } else {//敌人列表中有三个或三个以上敌人
        groupNumber = rangeRand(1,3);   //随机分为一、二或三组
        if(groupNumber === 3) {//三组
            list.forEach(function(o,i) {
                if(i === 0) group_1.push(list[i]);
                else if(i === 1) group_2.push(list[i]);
                else group_3.push(list[i]);
            });
            return [group_1,group_2,group_3];
        } else if(groupNumber === 2) {//两组
            list.forEach(function(o,i) {
                if(i === 0) group_1.push(list[i]);
                else group_2.push(list[i]);
            });
            return [group_1,group_2];
        } else {
            list.forEach(function(o,i) {
                group_1.push(list[i]);
            });
            return [group_1];
        }
    }
}

//选择要攻击的怪物
function displayGroupEnemy(enemyList) {
    let enemies = unique(enemyList,'id','name');
    let index = 0;
    let group = new enchant.Group();
    for(let i in enemies) {
        let enemyNumber = new textLabel(enemies[i].count,battle.msgPoint[0]+10,battle.msgPoint[1]+ 21 * index);
        let enemyName = new textLabel(enemies[i].name,battle.msgPoint[0]+20,battle.msgPoint[1]+ 20 * index);
        index++;

        group.addChild(enemyName);
        group.addChild(enemyNumber);
    }

    return [group,index,Object.keys(enemies)];
}

/**
 * 将重复的数组元素合并并统计出现次数
 * @param array {Array} 待合并数组
 * @param property  {string} 按数组中元素的某个属性排列
 * @param name  {string} 数组元素的名称
 * @returns {{统计集合}}
 */
function unique(array,property,name) {
    let ret = {};

    for(let i = 0; i < array.length; i++){
        let item = array[i][property];

        if(!ret[item]){
            ret[item] = {};
            ret[item].count = 1;
            ret[item][name] = array[i][name];
        } else {
            ret[item].count++;
        }
    }

    return ret;
}
/**
 * emyList 敌人列表
 * ability 武器攻击范围
 *
 */
function fight(emyList,ability) {
    // ability = 'one';
    let target;

    if(emyList.length === 1) {
        target = [emyList[0]];
    } else {
        if(ability === 'group') {//若武器可以攻击一组敌人
            target = emyList;   //则将目标设为该组敌人
        } else {//否则随机从该组敌人中选择一个
            target = [emyList[rand(emyList.length)]];
        }
    }

    //按速度大小排序，速度快的先攻
    battle.actionQueue = battle.enemies.concat(p1).sort(function(a,b) {
        return a.getSpeed() < b.getSpeed();
    });
    console.log(battle.actionQueue);
    // if(isForestall() && !battle.battleStart) {
    //     battle.actionQueue = [p1];    //先制攻击
    //     battle.battleStart = true;
    // } else if(isSneak() && !battle.battleStart) {
    //     battle.actionQueue = battle.enemies;  //被偷袭
    //     battle.battleStart = true;
    // }

    (function actionByQueue() {
        if(battle.actionQueue.length && battle.roundEnd) {
            let el = battle.actionQueue.shift();

            if(el.constructor === Player) {//如果等于玩家则表示轮到玩家行动
                fightAnimation(target,function() {
                    actionByQueue();
                });
            } else {//敌方行动
                el.actions(p1.player,function() {
                    actionByQueue();
                });
            }
        } else {
            addBattleScene.group_2[1].visible = false;  //隐藏武器
            addBattleScene.group_2[0].visible = true;   //显示手形指针
        }
    })();
}

function fightAnimation(target,callback) {
    game.currentScene.removeChild(battle.damageInfo);
    battle.roundEnd = false;
    addBattleScene.group_2[1].visible =  true;  //显示武器

    let centerArray = [];   //用于保存该组敌人的中心位置

    target.forEach(function(o){
        centerArray.push(o.getCenterPoint());
    });


    let info = new textLabel(p1.player.name +'攻击!',140,game.height-70+5);
    //炮弹
    let p1WeaponAmmo = new gameSprite('ammo',game.width-50,(game.height>>3)+10);
    p1WeaponAmmo.visible = false;
    let animationScene = new enchant.Scene();

    animationScene.addChild(info);
    animationScene.addChild(p1WeaponAmmo);

    let waitFor = animationScene.age + 20;
    let finish = false;
    let explosionRunning = false;
    let idx_target = 0;

    game.pushScene(animationScene);

    animationScene.on('enterframe',function() {
        if(this.age >= waitFor && !finish) {
            finish = true;
            new SoundManage('music12');
            p1WeaponAmmo.visible =  true;
        }
        if(p1WeaponAmmo.visible === true) {
            p1WeaponAmmo.tl.moveTo(centerArray[0][0],centerArray[0][1],20);
        }
        if(Math.abs(p1WeaponAmmo.x - centerArray[0][0]) < 0.1 &&
            Math.abs( p1WeaponAmmo.y - centerArray[0][1]) < 0.1 &&
            p1WeaponAmmo.visible === true) {
            //重置子弹位置
            p1WeaponAmmo.x = game.width-50;
            p1WeaponAmmo.y = (game.height>>3)+10;
            p1WeaponAmmo.visible = false;

            (function effectEx() {
                if(target.length && !explosionRunning) {
                    new SoundManage('music13');
                    explosionRunning = true;
                    let t = target.shift();

                    //爆炸效果
                    let explosion = new triangle('explosion',centerArray[idx_target][0] - 30,centerArray[idx_target][1] - 30,64,64);
                    explosion.frame = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,null];
                    animationScene.addChild(explosion);

                    let damage = hitStrength(p1.getAttack());
                    t.hp -= damage;

                    battle.damageInfo = new textLabel((t.aliasName || t.name) +'损伤了'+damage+'!<br/>',battle.msgPoint[0],battle.msgPoint[1]+ 20 * idx_target);

                    explosion.on('enterframe',function() {
                        if(this.frame === 24) {
                            animationScene.removeChild(this);
                            animationScene.removeChild(info);
                            game.currentScene.addChild(battle.damageInfo);
                            idx_target++;
                            explosionRunning = false;
                            this.frame = 0;
                            setTimeout(effectEx,0);
                        }
                    });

                    let targetLife = t.age + 20;
                    //监测敌方hp，判断敌方是否已死亡
                    function checkEnemyDead() {
                        this.bindEvent = true;
                        if(this.hp <= 0) {
                            if(!this.dead) {
                                new SoundManage('music15');
                                battle.damageInfo.text += '打倒了'+(t.aliasName || t.name)+'!<br/>';
                                game.currentScene.addChild(battle.damageInfo);
                                this.dead = true;
                            }
                            if(this.age <= targetLife) {
                                if(this.age % 2 === 0) {
                                    this.opacity = 0;
                                } else {
                                    this.opacity = 1;
                                }
                            } else {
                                game.currentScene.removeChild(this);
                                this.removeEventListener('enterframe',checkEnemyDead);
                                battle.gp += this.gp;
                                battle.exp += this.exp;

                                //从列表中移除已消灭的敌人
                                for(let i = 0; i < battle.enemies.length; i++) {
                                    let o = battle.enemies[i];
                                    if(o.aliasName !== '' && o.aliasName === t.aliasName) {
                                        battle.enemies.splice(i,1);
                                        break;
                                    }
                                }
                                //从行动队列中移除已经死亡的敌人
                                for(let i = 0; i < battle.actionQueue.length; i++) {
                                    let item = battle.actionQueue[i];
                                    if(item.hp <= 0) {
                                        battle.actionQueue.splice(i,1);
                                    }
                                }

                                //全都死了
                                if(battle.enemies.length === 0) {
                                    game.gp += battle.gp;
                                    game.exp += battle.exp;
                                    let info = new textLabel(`消灭了怪物!<br/>${p1.player.name}获得了${battle.exp}点经验和${battle.gp}G!<br/>`,battle.msgPoint[0],battle.msgPoint[1]);
                                    let currentLevel = p1.player.level;
                                    for(let i = currentLevel; i < p1.player.levelStats.length; i++) {
                                        if(currentLevel === (p1.player.levelStats.length - 1)) break;
                                        if(game.exp >= p1.player.levelStats[i].expMax) {
                                            p1.player.level = i;
                                            if(p1.player.level > currentLevel) {
                                                info.text += p1.player.name+'升级了!<br/>';
                                                currentLevel = p1.player.level;
                                                p1.player.hp = p1.getHp();
                                            }
                                        }
                                    }
                                    console.log(game.exp,p1.player.level,currentLevel);

                                    battle.gp = 0;
                                    battle.exp = 0;

                                    let battleResultScene = new enchant.Scene();

                                    // setTimeout(function() {
                                    //     new SoundManage('music17');
                                    //     game.currentScene.removeChild(battle.damageInfo);
                                    //     battleResultScene.addChild(info);
                                        game.pushScene(battleResultScene);

                                        // let keyCount = 0;
                                        let waitFor = battleResultScene.age + 30;
                                        battleResultScene.on('enterframe',function() {
                                            if(this.age >= waitFor) {
                                                if(game.input.a) {
                                                    if(keyCount++ === 1) {
                                                        game.popScene();
                                                        game.popScene();
                                                        battle.enemyLoaded = false;
                                                        battle.roundEnd = true;
                                                        //标记boss为死亡状态 后端控制，不由前端控制
                                                        // if(battle.isBoss) battle.firstEnemy.dead = true;
                                                        new SoundManage('music01',true);
                                                    }
                                                } else keyCount = 0;
                                            }
                                        });
                                    // },400);
                                }
                            }
                        }
                    }

                    if(!t.bindEvent) t.addEventListener('enterframe',checkEnemyDead);
                } else {//爆炸效果完成则退出场景
                    setTimeout(function() {
                        game.popScene();
                        addBattleScene.group_2[1].visible = false;  //隐藏武器
                        //addBattleScene.group_2[0].visible = true;   //显示手形指针
                        setTimeout(function() {
                            battle.roundEnd = true;
                            callback && callback();
                        },1300);
                    },1000);
                }
            })();

        }

    });
}

function hitStrength(hit) {
    return Math.round((Math.random() + .5) * hit);
}

//计算敌人的平均速度
function getEmyAverageSpeed() {
    let sumSpeed = 0;
    let len = battle.enemies.length;
    battle.enemies.forEach(function(o) {
        sumSpeed += o.speed;
    });

    return (sumSpeed / len) >> 0;
}

//是否先制攻击
function isForestall() {
    let emyAvgSpeed = getEmyAverageSpeed(battle.enemies);
    let playerSpeed = p1.getSpeed();

    if(playerSpeed >= emyAvgSpeed) {
        if(Math.random() >= 0.8) return true;
    } else {
        if(Math.random() >= 0.9) return true;
    }
    return false;
}

//是否被偷袭
function isSneak() {
    let emyAvgSpeed = getEmyAverageSpeed(battle.enemies);
    let playerSpeed = p1.getSpeed();

    if(emyAvgSpeed >= playerSpeed) {
        if(Math.random() >= 0.5) return true;
    } else {
        if(Math.random() >= 0.8) return true;
    }
    return false;
}