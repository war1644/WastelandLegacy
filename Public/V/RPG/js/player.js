/**
 * Created by Troy on 2016/8/16.
 */
/**
 * 设置角色
 * @returns {Function} init
 * @constructor Player
 */
function Player() {
    return this.init.apply(this,arguments);
}

Player.p1Attributes = {
    name:'路漫漫',
    hp: 100,
    sp: 20,
    exp: 0,
    level: 1,
    gp:1000,
    characterClass:'猎人',
    items:[
        {name:'回复药',cost:'10G',description:'恢复少量生命值',special:'useinbattle'},
        {name:'小刀',cost:'10G',attack:5,description:'切水果用的刀'},
        {name:'匕首',cost:'15G',attack:7,description:'格斗用的锋利匕首'},
        {name:'大马士革刀',cost:'20G',attack:10,description:'弯刀'},
        {name:'拳套',cost:'25G',attack:12,description:'能打出爆发性的一击'},
        {name:'手枪',cost:'50G',attack:15,description:'一把普通的枪'},
        {name:'短枪',cost:'70G',attack:16,description:'射速极快的机关枪',special:'all'},
    ],
    maxItemsCount:12,
    equip:[
        {name:'迫击炮',cost:'100G',attack:5,description:'军用武器',special:'group'},
        {name:'技师手套',cost:'10G',defence:3,description:'操作机械的专用手套'},
        {name:'防弹背心',cost:'20G',defence:10,description:'几乎所有商店都能买到的普通护甲'}
    ],
    maxEquipCount:5,
    levelStats:[
        {},
        { attack: 8, maxHp: 80, maxSp: 20, expMax: 0, speed:5, power:5 },
        { attack: 10, maxHp: 100, maxSp: 22, expMax: 10, speed:7, power:6 },
        { attack: 12, maxHp: 120, maxSp: 26, expMax: 20, speed:8, power:7 },
        { attack: 15, maxHp: 150, maxSp: 30, expMax: 40, speed:10, power:9 }
    ]
};

Player.minEnCounterStep = 64;
Player.maxEnCounterStep = 255;

Player.prototype = {
    constructor:Player,
    init:function(options) {
        this.map = options.map;
        this.encounterStep = rangeRand(Player.minEnCounterStep,Player.maxEnCounterStep);
        this.player = this.addPlayer(options);
        this.player.stop = false;
        this.player.aspect = null;
        this.inTank = config.inTank;
        this.setAttributes(options.defaultAttributes);
        this.nextTile = {
            nextTileX:null,
            nextTileY:null
        };

        return this;
    },
    /**
     * 添加角色
     * @param options
     * options.startingX {number} 横向tiles
     * options.startingY {number} 纵向tiles
     * options.direction {number} 角色朝向
     * options.walk {number} 角色行走姿势
     * options.imgWidth {number} 所使用角色图片的宽度 default 128
     * options.imgHeight {number} 所使用角色图片的高度 default 128
     * options.playerImage {string} 角色图片的路径
     * @returns {Sprite}
     */
    addPlayer:function(options) {
        let player = new enchant.Sprite(config.spriteWidth,config.spriteHeight);
        player.startingX = options.startingX || 0;
        player.startingY = options.startingY || 0;
        player.x = player.startingX * config.spriteWidth;
        player.y = player.startingY * config.spriteHeight;
        player.direction = options.direction || 0;
        player.walk = options.walk || 0;
        player.scaleY = 1;
        player.frame = player.direction;
        player.image = new enchant.Surface(options.imgWidth || 96,options.imgHeight || 96);
        player.image.draw(game.assets[options.playerImage]);

        return player;
    },
    /**
     * 更新角色位置
     * @param tileX {number} 地图块索引
     * @param tileY {number} 地图块索引
     */
    updatePlace:function(tileX,tileY) {
        this.player.x = tileX * config.spriteWidth;
        this.player.y = tileY * config.spriteHeight;
    },
    /**
     * 设置角色属性
     * @param options
     */
    setAttributes:function(options) {
        /*if(options && JSON.stringify(options) != "{}") {
            for(var i in options) {
                Player.defaultAttributes[i] = options[i];
            }
        }*/
        for(let i in options)
            this.player[i] = options[i];
    },
    getAttack:function() {
        return this.player.levelStats[this.player.level].attack;
    },
    getHp:function() {
        return this.player.levelStats[this.player.level].maxHp;
    },
    getSp:function() {
        return this.player.levelStats[this.player.level].maxSp;
    },
    getSpeed:function() {
        return this.player.levelStats[this.player.level].speed;
    },
    /**
     * 获取角色正处于哪一块tile上
     * @returns {{x: number, y: number}} tile的x、y值
     */
    square:function() {
        return {
            x:(this.player.x / config.spriteWidth) >> 0,
            y:(this.player.y / config.spriteHeight) >> 0
        };
    },
    /**
     * 计算出角色面向的tile
     * @returns {Object} 角色面向的tile的x、y值
     */
    facingSquare:function() {
        let playerSquare = this.square(),
            facingSquare,
            player = this.player;
        /*direction:up:3 right:2 down:0 left:1*/
        if(player.direction === 3) {
            facingSquare = {x:playerSquare.x,y:playerSquare.y - 1};
        } else if(player.direction === 2) {
            facingSquare = {x:playerSquare.x + 1,y:playerSquare.y};
        } else if(player.direction === 0) {
            facingSquare = {x:playerSquare.x,y:playerSquare.y + 1};
        } else if(player.direction === 1) {
            facingSquare = {x:playerSquare.x - 1,y:playerSquare.y};
        }

        if((facingSquare.x < 0 || facingSquare.x >= this.map.width / config.spriteWidth) ||
            (facingSquare.y < 0 || facingSquare.y >= this.map.height / config.spriteHeight)) {
            return null;
        } else return facingSquare;
    },
    /**
     * 角色面向的物体
     * @returns {number} 角色面向的物体
     */
    facingObject:function() {
        let facingSquare = this.facingSquare();
        if(!facingSquare) return null;
        else return forebackgroundMap[facingSquare.y][facingSquare.x];
    },
    /**
     * 获取角色即将进入的tile
     * @param inputDirection 角色方向，通过game.input确定
     * @returns {{nextTileX: number, nextTileY: number}}
     */
    getNextTile:function(inputDirection) {
        let curTileX = (this.player.x / config.spriteWidth) >> 0,
            curTileY = (this.player.y / config.spriteHeight) >> 0;

        switch (inputDirection) {
            case 'down'://下
                curTileY++;
                break;
            case 'left'://左
                this.player.x % config.spriteWidth === 0 ? curTileX-- : curTileX;
                break;
            case 'right'://右
                curTileX++;
                break;
            case 'up'://上
                this.player.y % config.spriteHeight === 0 ? curTileY-- : curTileY;
                break;
        }

        return {
            nextTileX:curTileX,
            nextTileY:curTileY
        };
    },
    /**
     * 设置推动开始时NPC的状态为中止行动
     * @param player {Object} player
     * @param direction {string} 推动方向
     * @param mapCode   {string} 所在地图
     */
    pushObject:function(player,direction,mapCode) {
        let npc = game.npcList[mapCode].npc;

        if(npc && npc.length) {
            let obstacle = hasObstacleAround(player).filter(function (o) {
                return o.canPush === direction;
            });

            //if(hasObstacleAround(player) === direction) {
            if(obstacle[0]) {
                player.player.speed = 2;

                npc.forEach(function(o) {
                    if(o.canPush) {
                        o.stop = true;
                        o.direction = player.player.direction;
                    }
                });
            }
        }
    },
    /**
     * 检测推动NPC时是否到达地图边界或者与其他NPC碰撞
     * @param direction {string} 推动方向
     * @param mapCode   {string} 所在地图
     * @param npc   {object} 正在推动的NPC
     * @returns {boolean} 到达边界则返回true
     */
    checkHitTest:function(direction,mapCode,npc) {
        if(!npc) return false;
        let player = this.player;
        switch (direction) {
            case 'right':
                //与地图障碍碰撞时停止移动
                //与NPC障碍碰撞时停止移动
                if(((npc.checkNpcObstacle(mapCode) && player.direction === npc.direction) ||
                    game.mapList[mapCode][0].hitTest(npc.x + tileSize,npc.y)) &&
                    player.x === (npc.x - tileSize) && player.y === npc.y) {
                    player.x = npc.x - tileSize;
                    player.isMoving = false;
                    player.walk = 2;
                    return true;
                }

                break;
            case 'left':
                if(((npc.checkNpcObstacle(mapCode) && player.direction === npc.direction) ||
                    game.mapList[mapCode][0].hitTest(npc.x - tileSize,npc.y)) &&
                    player.x === (npc.x + tileSize) && player.y === npc.y) {
                    player.x = npc.x + tileSize;
                    player.isMoving = false;
                    player.walk = 2;
                    return true;
                }
                break;
            case 'up':
                if(((npc.checkNpcObstacle(mapCode) && player.direction === npc.direction) ||
                    game.mapList[mapCode][0].hitTest(npc.x,npc.y - tileSize)) &&
                    player.x === npc.x && player.y === (npc.y + tileSize)) {
                    player.y = npc.y + tileSize;
                    player.isMoving = false;
                    player.walk = 2;
                    return true;
                }
                break;
            case 'down':
                if(((npc.checkNpcObstacle(mapCode) && player.direction === npc.direction) ||
                    game.mapList[mapCode][0].hitTest(npc.x,npc.y + tileSize)) &&
                    player.x === npc.x && player.y === (npc.y - tileSize)) {
                    player.y = npc.y - tileSize;
                    player.isMoving = false;
                    player.walk = 2;
                    return true;
                }
                break;
        }
    },
    //若npc正在移动，则停止移动防止冲突
    sequenceMove:function(direction) {
        let npc = game.npcList[game.mapCode].npc.filter(function(o) {return o.canPush === true})[0];
        if(!npc) return false;
        this.nextTile = this.getNextTile(this.player.aspect);
        if (this.nextTile.nextTileX === npc.getNextTile().nextTileX &&
            this.nextTile.nextTileY === npc.getNextTile().nextTileY) {
            //若npc正在移动，则停止移动防止冲突
            if(npc.isMoving) {
                switch (direction) {
                    case 'up':
                        this.player.yMovement = 0;
                        break;
                    case 'right':
                        this.player.xMovement = 0;
                        break;
                    case 'down':
                        this.player.yMovement = 0;
                        break;
                    case 'left':
                        this.player.xMovement = 0;
                        break;
                }
                return true;
            }
        }
    },
    move:function() {
        /*direction:up:3 right:2 down:0 left:1*/
        let that = this.player,
            npc;
        //设置角色对应的姿势
        that.frame = that.direction * 4 + that.walk;
        if(that.isMoving) {

            that.moveBy(that.xMovement,that.yMovement);

            if(!(game.frame % 4)) {//每4帧更新一个动作
                that.walk++;
                that.walk %= 4;//0,1,2,3
            }
            //如果完成一次移动，角色正好立于一个tile上时，停止移动并设定站立姿势
            if((that.xMovement && that.x % tileSize === 0) || (that.yMovement && that.y % tileSize === 0)) {
                that.isMoving = false;
                that.walk = 2;
                if(game.encounter) {
                    this.encounterStep -= 4;
                } else {
                    this.encounterStep = rangeRand(Player.minEnCounterStep,Player.maxEnCounterStep);
                }
                //遇敌
                if(this.encounterStep <= 0 && !gameEv.findTile(p1.square().x,p1.square().y,game.mapCode)) {
                    let enemyGroupID = 0;
                    let firstEnemy;
                    (function reSelect() {
                        if(that.x <= 320 && that.y >= 800) {//进入boss遭遇范围
                            enemyGroupID = [0,2][rand(2)];
                        }
                        if((firstEnemy = enemyConfig[enemyGroup[enemyGroupID].enemies[0]]).dead) {
                            reSelect();
                        }
                    })();
                    //enemyGroupID = 2;
                    //console.log(enemyGroupID);
                    battle(enemyGroupID,firstEnemy);
                    this.encounterStep = rangeRand(Player.minEnCounterStep,Player.maxEnCounterStep);
                }

            }
        } else {
            that.xMovement = 0;
            that.yMovement = 0;

            that.speed = 4;
            if(game.npcList[game.mapCode].npc && game.npcList[game.mapCode].npc.length) {
                game.npcList[game.mapCode].npc.forEach(function(o) {
                    if(o.canPush) o.stop = false;
                });
            }
            /*direction:up:3 right:2 down:0 left:1*/
            if(game.input.up) {//上
                that.aspect = 'up';
                that.direction = 3;
                this.pushObject(this,'up',game.mapCode);

                if(game.npcList[game.mapCode].npc.length) {
                    npc = game.npcList[game.mapCode].npc.filter(function(o){ return o.canPush === true})[0];

                    if(this.checkHitTest(that.aspect,game.mapCode,npc)) return;
                    if(this.sequenceMove(that.aspect)) return;
                }

                that.yMovement = game.dirDeny[that.aspect] ? 0 : -that.speed;    //每帧移动4像素

            } else if(game.input.right) {//右
                that.aspect = 'right';
                that.direction = 2;

                this.pushObject(this,that.aspect,game.mapCode);

                if(game.npcList[game.mapCode].npc.length) {
                    npc = game.npcList[game.mapCode].npc.filter(function(o){ return o.canPush === true})[0];

                    if(this.checkHitTest(that.aspect,game.mapCode,npc)) return;
                    if(this.sequenceMove(that.aspect)) return;
                }

                that.xMovement = game.dirDeny[that.aspect] ? 0 : that.speed;
            } else if(game.input.down) {//下
                that.aspect = 'down';
                that.direction = 0;
                this.pushObject(this,'down',game.mapCode);

                if(game.npcList[game.mapCode].npc.length) {
                    npc = game.npcList[game.mapCode].npc.filter(function(o){ return o.canPush === true})[0];
                    if(this.checkHitTest(that.aspect,game.mapCode,npc)) return;
                    if(this.sequenceMove(that.aspect)) return;
                }

                that.yMovement = game.dirDeny[that.aspect] ? 0 : that.speed;
            } else if(game.input.left) {//左
                that.aspect = 'left';
                that.direction = 1;

                this.pushObject(this,that.aspect,game.mapCode);
                if(game.npcList[game.mapCode].npc.length) {
                    npc = game.npcList[game.mapCode].npc.filter(function(o){ return o.canPush === true})[0];
                    if(this.checkHitTest(that.aspect,game.mapCode,npc)) return;
                    if(this.sequenceMove(that.aspect)) return;
                }

                that.xMovement = game.dirDeny[that.aspect] ? 0 : -that.speed;
            }
            //碰撞检测
            if(that.xMovement || that.yMovement) {
                //that.xMovement / Math.abs(that.xMovement)目的是为了取正负1
                let x = that.x + (that.xMovement ?
                    that.xMovement / Math.abs(that.xMovement) * config.spriteWidth : 0);
                let y = that.y + (that.yMovement ?
                    that.yMovement / Math.abs(that.yMovement) * config.spriteHeight : 0);
                if(x >= 0 && x < this.map.width && y >= 0 && y < this.map.height && !this.map.hitTest(x,y)) {
                    that.isMoving = true;
                    this.move();
                }
            }
        }
    },
    /**
     * 判断角色是否离开当前场景
     * @param coordinate {Array} 可以离开场景的坐标
     * @returns {boolean} 可以离开当前场景则返回true，否则false
     */
    isOut:function(coordinate) {
        for(let i = 0; i < coordinate.length; i++) {
            if(coordinate[i].x === this.player.x && coordinate[i].y === this.player.y) return true;
        }
        return false;
    }
};