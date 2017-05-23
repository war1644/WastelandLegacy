/**
 * Created by Troy on 2016/8/16.
 */
var NPC = enchant.Class.create(enchant.Sprite,{
    initialize:function(options) {
        enchant.Sprite.call(this,options.width || config.spriteWidth,options.height || config.spriteHeight);
        this.tileX = options.tileX;
        this.tileY = options.tileY;
        this.originTileX = options.tileX;   //初始化时原始位置
        this.originTileY = options.tileY;
        this.x = this.tileX * config.spriteWidth;
        this.y = this.tileY * config.spriteHeight;
        this.image = game.assets[options.image];
        this.canPush = options.canPush || false;
        this.dialogID = null;   //对话ID
        this.stop = false;  //是否中止行为
        this.specialAction = options.specialAction;    //是否存在特殊指令
        this.standing = options.standing;   //是否站立
        this.stay = options.stay;   //原地踏步
        this.sequence = []; //特殊指令的队列
        this.beforeSpecialAction = options.beforeSpecialAction; //在特殊指令触发前执行的操作
        this.afterSpecialAction = options.afterSpecialAction;   //在特殊指令结束后执行的操作
        this.specialActionStart = true; //特殊指令开始执行
        this.walk = 0;  //行走姿势
        this.direction = options.direction; //朝向
        this.originDirection = options.direction;
        this.frame = this.direction * 4;
        this.duration = rand(20);   //距离下一次运动间隔
        this.distance = tileSize * rand(4);   //移动的距离
        this.timer = 0; //计数器
        this.forward = rand(4); //随机朝向
        this.action = options.action;   //指令
        this.tempScene = null;  //用于对话
        this.sells = options.sells; //所卖商品的种类
        return this;
    },
    updatePlace:function() {
        this.tileX = (this.x / config.spriteWidth) >> 0;
        this.tileY = (this.y / config.spriteHeight) >> 0;
    },
    /**
     * 获取npc正处于哪一块tile上
     * @returns {{x: number, y: number}} tile的x、y值
     */
    square:function() {
        return {
            x:(this.x / config.spriteWidth) >> 0,
            y:(this.y / config.spriteHeight) >> 0
        };
    },
    facingSquare:function() {
        let npcSquare = this.square(),
            playerFacing = p1.player.direction,
            facingSquare;

        /*direction:up:3 right:2 down:0 left:1*/
        if(playerFacing === 3) {
            facingSquare = {x:npcSquare.x,y:npcSquare.y + 1};
        } else if(playerFacing === 2) {
            facingSquare = {x:npcSquare.x - 1,y:npcSquare.y};
        } else if(playerFacing === 0) {
            facingSquare = {x:npcSquare.x,y:npcSquare.y - 1};
        } else if(playerFacing === 1) {
            facingSquare = {x:npcSquare.x + 1,y:npcSquare.y};
        }

        if((facingSquare.x < 0 || facingSquare.x >= game.mapList[game.mapCode][0].width / config.spriteWidth) ||
            (facingSquare.y < 0 || facingSquare.y >= game.mapList[game.mapCode][0].height / config.spriteHeight)) {
            return null;
        } else return facingSquare;
    },
    //重新设置随机移动
    renewMove:function() {
        this.timer = 0;
        //0下 1左 2右 3上
        this.forward = rand(4);
        this.direction = this.forward;
        this.duration = rangeRand(50,80);
        this.distance = tileSize * rand(4);
    },
    sequenceMove:function(direction) {
        if(p1.nextTile.nextTileX === this.getNextTile().nextTileX &&
            p1.nextTile.nextTileY === this.getNextTile().nextTileY) {
            if(p1.player.isMoving) {
                switch (direction) {
                    case 0:
                        this.yMovement = 0;
                        break;
                    case 1:
                        this.xMovement = 0;
                        break;
                    case 2:
                        this.xMovement = 0;
                        break;
                    case 3:
                        this.yMovement = 0;
                        break;
                }

                this.isMoving = false;
                this.renewMove();
            }

        }
    },
    move:function() {
        this.frame = this.direction * 4 + this.walk;
        this.updatePlace();

        if(this.isMoving) {
            this.moveBy(this.xMovement,this.yMovement);

            if(!(game.frame % 4)) {
                this.walk++;
                this.walk %= 4;
            }

            this.distance -= this.xMovement ? Math.abs(this.xMovement) : Math.abs(this.yMovement);

            if((this.xMovement && this.x % tileSize === 0) || (this.yMovement && this.y % tileSize === 0)) {
                this.isMoving = false;
                this.walk = 2;
            }
        } else {
            this.xMovement = 0;
            this.yMovement = 0;

            switch (this.forward) {
                case 0:
                    this.direction = 0;
                    this.yMovement = 2;

                    this.sequenceMove(0);

                    break;
                case 1:
                    this.direction = 1;
                    this.xMovement = -2;

                    this.sequenceMove(1);
                    break;
                case 2:
                    this.direction = 2;
                    this.xMovement = 2;

                    this.sequenceMove(2);
                    break;
                case 3:
                    this.direction = 3;
                    this.yMovement = -2;

                    this.sequenceMove(3);
                    break;
            }

            //若完成一次随机移动，重新开始随机移动
            if(this.distance <= 0) {
                this.xMovement = 0;
                this.yMovement = 0;

                this.renewMove();
            }

            if(this.xMovement || this.yMovement) {
                let x = this.x + (this.xMovement ? this.xMovement / Math.abs(this.xMovement) * tileSize : 0);
                let y = this.y + (this.yMovement ? this.yMovement / Math.abs(this.yMovement) * tileSize : 0);

                if(x >= 0 && x < game.mapList[game.mapCode][0].width &&
                    y >= 0 && y < game.mapList[game.mapCode][0].height &&
                    !game.mapList[game.mapCode][0].hitTest(x,y) &&
                    (x !== p1.player.x || y !== p1.player.y) &&
                    !this.intersect(p1.player)) {

                    if(this.checkNpcObstacle(mapCode['home1'])) return;
                    this.isMoving = true;
                    this.move();
                } else {
                    this.renewMove();
                }
            }
        }
    },
    checkNpcObstacle:function(mapCode) {
        let npc = game.npcList[mapCode].npc.filter(function(o) {
            return o.standing === true || o.stay === true;
        });
        //遇到障碍npc时停止移动
        for(let i = 0; i < npc.length; i++) {
            if (this.getNextTile().nextTileX === npc[i].tileX &&
                this.getNextTile().nextTileY === npc[i].tileY) {
                this.isMoving = false;
                this.walk = 2;
                this.forward = rand(4);
                return true;
            }
        }
        return false;
    },
    //获取NPC即将进入的tiles
    getNextTile:function() {
        let curTileX = (this.x / config.spriteWidth) >> 0,
            curTileY = (this.y / config.spriteHeight) >> 0;

        switch (this.direction) {
            case 0://下
                curTileY++;
                break;
            case 1://左
                this.x % config.spriteWidth === 0 ? curTileX-- : curTileX;
                break;
            case 2://右
                curTileX++;
                break;
            case 3://上
                this.y % config.spriteHeight === 0 ? curTileY-- : curTileY;
                break;
        }

        return {
            nextTileX:curTileX,
            nextTileY:curTileY
        };
    },
    //推动
    pushMove:function() {
        if(this.stop) {
            if(this.canPush) {
                let player = game.playerList[0].player;

                switch (player.aspect) {
                    case 'right':
                        this.frame = keyD['right'] * 4 + this.walk;
                        if(!(game.frame % 4)) {
                            this.walk++;
                            this.walk %= 4;
                        }
                        if(game.mapList[game.mapCode][0].hitTest(this.x + tileSize,this.y)) {
                            this.walk=2;
                        }
                        this.x = player.x + tileSize;
                        break;
                    case 'up':
                        this.frame = keyD['up'] * 4 + this.walk;
                        if(!(game.frame % 4)) {
                            this.walk++;
                            this.walk %= 4;
                        }
                        if(game.mapList[game.mapCode][0].hitTest(this.x,this.y - 1)) {
                            this.walk = 2;
                        }
                        this.y = player.y - tileSize;
                        break;
                    case 'down':
                        this.frame = keyD['down'] * 4 + this.walk;
                        if(!(game.frame % 4)) {
                            this.walk++;
                            this.walk %= 4;
                        }
                        if(game.mapList[game.mapCode][0].hitTest(this.x,this.y + tileSize)) {
                            this.walk = 2;
                        }
                        this.y = player.y + 32;
                        break;
                    case 'left':
                        this.frame = keyD['left'] * 4 + this.walk;
                        if(!(game.frame % 4)) {
                            this.walk++;
                            this.walk %= 4;
                        }
                        if(game.mapList[game.mapCode][0].hitTest(this.x - 1,this.y)) {
                            this.walk = 2;
                        }
                        this.x = player.x - tileSize;
                        break;
                }
                //每次移动完成更新npc位置
                this.updatePlace();
            }
            return true;
        }
        return false;
    },
    //原地走动
    stayMove:function() {
        if(this.stay) {
            this.frame = this.direction * 4 + this.walk;
            if(!(game.frame % 8)) {
                this.walk++;
                this.walk %= 4;
            }
            return true;
        }
        return false;
    },
    //特殊移动
    specialMove:function() {
        this.beforeSpecialAction && this.beforeSpecialAction();

        if(!this.specialActionStart) return true;
        let speed = 4,dir;
        if(this.specialAction) {
            if(!this.sequence.length && !this.specialActionFinish) {
                for (let i in this.specialAction) {
                    let item = this.specialAction[i];   //{x:5}
                    let key = Object.keys(item)[0];
                    let obj = {};
                    obj[key] = item[key];
                    this.sequence.push(obj);
                }
            } else {
                if(this.sequence.length) {
                    if (Object.keys(this.sequence[0])[0] === 'x') {
                        //根据指定位置与现在位置的大小判断行走方向
                        dir = this.tileX >= this.sequence[0].x ? -1 : 1;
                        //更改朝向
                        this.direction = dir === -1 ? 1 : 2;
                        if(!(game.frame % 4)) {
                            this.walk++;
                            this.walk %= 4;
                        }
                        if(this.x % tileSize === 0) {
                            this.walk = 2;
                        }
                        this.frame = this.direction * 4 + this.walk;
                        let dx = this.x - this.sequence[0].x * config.spriteWidth;
                        //若到达终点
                        if (dx === 0) {
                            this.sequence.shift();  //该指令已完成，从队列中删除
                            if (this.sequence.length === 0) {   //队列中不再有指令
                                this.specialActionFinish = true;    //更新标识表示运动完成
                                this.standing = true;               //更改npc状态为站立
                            }
                            this.updatePlace();
                            return;
                        }
                        this.moveBy(speed * dir, 0);
                    } else if (Object.keys(this.sequence[0])[0] === 'y') {
                        dir = this.tileY >= this.sequence[0].y ? -1 : 1;

                        this.direction = dir === -1 ? 3 : 0;
                        if(!(game.frame % 4)) {
                            this.walk++;
                            this.walk %= 4;
                        }
                        if(this.y % tileSize === 0) {
                            this.walk = 2;
                        }
                        this.frame = this.direction * 4 + this.walk;

                        let dy = this.y - this.sequence[0].y * config.spriteHeight;
                        if (dy === 0) {
                            this.sequence.shift();
                            if (this.sequence.length === 0) {
                                this.specialActionFinish = true;
                                this.standing = true;
                            }
                            this.updatePlace();
                            return;
                        }
                        this.moveBy(0, speed * dir);
                    }
                } else {
                    this.afterSpecialAction && this.afterSpecialAction();
                }
            }

            return true;
        }
        return false;
    },
    onenterframe:function() {
        if(this.pushMove()) return;
        else if(this.specialMove()) return;
        else if(this.standing) return;
        else if(this.stayMove()) return;
        this.timer++;
        if(this.timer >= this.duration) {
            this.move();
        }
    }
});

//进出场景时重置npc位置
function resetNpcLocation(o) {
    o.tileX = o.originTileX;
    o.tileY = o.originTileY;
    o.direction = o.originDirection;
    o.isMoving = false;
    o.distance = 0;
    o.walk = 0;
    o.frame = o.direction * 4;
    o.specialActionFinish = false;
    o.specialActionStart = true;
    o.sequence = [];
    o.x = o.tileX * config.spriteWidth;
    o.y = o.tileY * config.spriteHeight;
}