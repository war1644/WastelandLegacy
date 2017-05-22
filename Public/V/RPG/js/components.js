/**
 * Created by Troy on 2016/9/5.
 */
'use strict';
//A button
var confirmBtn = enchant.Class.create(enchant.Sprite,{
    initialize:function() {
        enchant.Sprite.call(this,20,20);
        this.x = game.width-30;
        this.y = game.height-40;
        this.image = game.assets['aBtn'];
        this.timer = this.age + 15;
        return this;
    },
    onenterframe:function() {
        if(this.age >= this.timer) {
            this.opacity = this.opacity ? 0 : 1;
            this.timer = this.age + 15;
        }
    }
});

//对话黑色背景
var backSprite = enchant.Class.create(enchant.Sprite,{
    initialize:function(width,height,x,y,bgColor,opacity) {
        enchant.Sprite.call(this,width,height);
        this.x = x;
        this.y = y;
        this.backgroundColor = bgColor || 'black';
        this.opacity = opacity || 0.8;
        return this;
    }
});

//展示商品时的上下箭头
var triangle = enchant.Class.create(enchant.Sprite,{
    initialize:function(x,y,image,width,height,scaleX,scaleY) {
        enchant.Sprite.call(this,width || 8,height || 4);
        this.x = x;
        this.y = y;
        this.scale(scaleX || 1,scaleY || 1);
        this.image = game.assets[image];
        return this;
    }
});

//创建对话选项
var choiceText = enchant.Class.create(enchant.Group,{
    initialize:function(choice,x,y) {
        enchant.Group.call(this);

        let that = this;

        choice.forEach(function(o) {
            let label = new enchant.Label(o.text);
            label.x = x;
            label.y = y;
            label.color = '#fff';
            label.font = '12px Microsoft YaHei';
            x += 50;

            that.addChild(label);
        });
        //创建手形指针
        this.cursor = new cursor(20,y,'',0,50);
        this.addChild(this.cursor);

        return this;
    }
});

var choiceText2 = enchant.Class.create(enchant.Group,{
    initialize:function(choice,x,y) {
        enchant.Group.call(this);
        let len = choice.length;
        let that = this;
        let sprite = new backSprite(60,20*len+10,0,0);
        this.addChild(sprite);
        choice.forEach(function(o) {
            let label = new enchant.Label(o.text);
            label.x = x;
            label.y = y;
            label.color = '#fff';
            label.font = '12px Microsoft YaHei';
            y += 20;

            that.addChild(label);
        });

        this.cursor = new cursor(5,5,'vertical',len);
        this.addChild(this.cursor);


        return this;
    }
});

var choiceText3 = enchant.Class.create(enchant.Group,{
    initialize:function(choice,x,y,number) {
        enchant.Group.call(this);

        let that = this;
        let sprite = new backSprite(130,110,0,130);
        this.addChild(sprite);
        choice.forEach(function(o) {
            let label = new Label(o);
            label.x = x;
            label.y = y;
            label.color = '#fff';
            label.font = '18px Microsoft YaHei';
            y += 30;

            that.addChild(label);
        });

        this.cursor = new cursor(10,140,'vertical',number);
        this.addChild(this.cursor);


        return this;
    }
});

/**
 * 创建手形指针
 * @param x {number} x坐标
 * @param y {number} y坐标
 * @param isVertical {Boolean|String} 是否竖形菜单
 * @param number {number} 菜单有几个选项
 * @param step {number} 每个选项之间的间隔，仅用于竖形菜单
 * @type {enchant.Sprite}
 */
var cursor = enchant.Class.create(enchant.Sprite,{
    initialize:function(x,y,isVertical,number,step) {
        enchant.Sprite.call(this,16,16);
        this.old_x = x;
        this.old_y = y;
        this.x = x;
        this.y = y;
        this.isVertical = isVertical;
        this.number = (number - 1 === 0) ? 0 : (number - 1) || 2;
        this.step = step || 20;
        this.keyCount = 0;
        this.selected = 0;
        this.image = game.assets['cursor'];

        return this;
    },
    onenterframe:function() {
        if(!this.isVertical) {//横向选择
            if (game.input.right) {
                this.x = this.old_x + this.step;
                this.selected = 1;  //否
                new SoundManage('select');
            } else if (game.input.left) {
                this.x = this.old_x;
                this.selected = 0;  //是
                new SoundManage('select');
            }
        } else {//竖向选择
            if(game.input.down) {
                if(this.keyCount++ === 1) {
                    this.selected++;
                    this.selected = Math.min(this.selected, this.number);
                    if (this.selected <= this.number) {
                        this.y = this.old_y + this.selected * this.step;
                    }
                    new SoundManage('select');
                }
            } else if(game.input.up) {
                if(this.keyCount++ === 1) {
                    this.selected--;
                    this.selected = Math.max(this.selected, 0);
                    if (this.selected >= 0) {
                        this.y = this.old_y + this.selected * this.step;
                    }
                    new SoundManage('select');
                }
            } else this.keyCount = 0;
        }
    }
});

//混合选择菜单(可竖向、横向选择)
var cursor2 = enchant.Class.create(enchant.Sprite,{
    initialize:function(x,y,number,verticalStep,horizonalStep) {
        enchant.Sprite.call(this,20,20);
        this.old_x = x;
        this.old_y = y;
        this.x = x;
        this.y = y;
        this.number = number - 1;
        this.verticalStep = verticalStep;
        this.horizonalStep = horizonalStep;
        this.keyCount = 0;
        this.selected = 0;
        this.image = game.assets['cursor'];

        return this;
    },
    onenterframe:function() {
        if(game.input.down) {
            if(this.keyCount++ === 1) {
                this.selected += 2;
                this.selected = Math.min(this.selected, this.number);
                if (this.selected <= this.number) {
                    this.y = this.old_y + Math.floor(this.selected / 2) * this.verticalStep;
                }
                new SoundManage('select');
            }
        } else if(game.input.up) {
            if(this.keyCount++ === 1) {
                this.selected -= 2;
                this.selected = Math.max(this.selected, 0);
                if (this.selected >= 0) {
                    this.y = this.old_y + Math.floor(this.selected / 2) * this.verticalStep;
                }
                new SoundManage('select');
            }
        } else if(game.input.left) {
            if(this.keyCount++ === 1) {
                this.selected--;
                if(this.selected <= 0) {
                    this.selected = Math.max(this.selected, 0);
                } else {
                    this.selected = Math.max(this.selected, 2);
                }

                this.x = this.old_x + this.selected % 2 * this.horizonalStep;

                new SoundManage('select');
            }
        } else if(game.input.right) {
            if(this.keyCount++ === 1) {
                this.selected++;
                if(this.y === this.old_y) {
                    this.selected = Math.min(this.selected, 1);
                    this.x = this.old_x + this.selected * this.horizonalStep;
                } else {
                    this.selected = Math.min(this.selected, this.number);
                    this.x = this.old_x + this.selected % 2 * this.horizonalStep;
                }

                new SoundManage('select');
            }
        } else this.keyCount = 0;
    }
});

/**
 * 过渡场景
 * @type {Sprite}
 */
var TransitionScene = enchant.Class.create(enchant.Scene,{
    initialize:function(width,height,callback,leaveCoordinate) {
        enchant.Scene.call(this);

        this.sprite = new enchant.Sprite(width,height);
        this.sprite.backgroundColor = '#000';
        this.sprite.opacity = 0;
        this.leaveCoordinate = leaveCoordinate;
        this.waitFor = this.sprite.age + 20;
        this.callback = callback;
        new SoundManage('music05');

        this.addChild(this.sprite);

        game.pushScene(this);
    },
    onenterframe:function() {
        if(this.sprite.opacity <= 1) this.sprite.opacity += 0.1;
        else {
            if(this.sprite.age > this.waitFor) {
                game.popScene();
                this.callback && this.callback(this.leaveCoordinate);
            }
        }
    }
});

var TransitionScene2 = enchant.Class.create(enchant.Scene,{
    initialize:function(width,height,callback,leaveCoordinate) {
        enchant.Scene.call(this);

        this.sprite = new enchant.Sprite(width,height);
        this.sprite.backgroundColor = '#fff';
        this.sprite.opacity = 0;
        this.leaveCoordinate = leaveCoordinate;
        this.waitFor = this.sprite.age + 55;
        new SoundManage('music07',false,'music01');

        this.callback = callback;
        this.addChild(this.sprite);

        game.pushScene(this);
    },
    onenterframe:function() {
        if(this.sprite.age % 2 === 0) {
            this.sprite.opacity = 0;
        } else {
            this.sprite.opacity = 0.5;
        }

        if(this.sprite.age > this.waitFor) {
            game.popScene();
            this.callback && this.callback(this.leaveCoordinate);
        }

    }
});

var TransitionScene3 = enchant.Class.create(enchant.Scene,{
    initialize:function(width,height,callback) {
        enchant.Scene.call(this);

        this.sprite = new enchant.Sprite(width,height);
        this.sprite.backgroundColor = '#000';
        this.sprite.opacity = 1;
        this.waitFor = this.sprite.age + 20;

        this.callback = callback;
        this.addChild(this.sprite);

        game.pushScene(this);
    },
    onenterframe:function() {
        if(this.sprite.age > this.waitFor) {
            game.popScene();
            this.callback && this.callback();
        }
    }
});

//显示文字
var itemLabel = enchant.Class.create(enchant.Label,{
    initialize:function(text,x,y,color,font,textAlign,visible,width,height) {
        enchant.Label.call(this,text);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.font = font;
        this.textAlign = textAlign;
        this.visible = visible;

        return this;
    }
});

//卖道具
function sellItem(itemList,scene,dialog) {
    let playerNames = [];
    let keyCount = 0;
    let playerScene = new enchant.Scene();
    game.playerList.forEach(function(o) {
        playerNames.push(o.player.name);
    });
    let selectName = new choiceText3(playerNames,35,138,playerNames.length);
    playerScene.addChild(selectName);
    game.pushScene(playerScene);

    playerScene.on('enterframe',function() {
        disPlayGold();
        if(game.input.a) {
            if(keyCount++ === 1) {
                new SoundManage('select');
                let items = game.playerList[selectName.cursor.selected].player.items;
                let itemGroup;
                let itemScene;
                let sellBg,sellText;
                if(items.length === 0) {
                    itemScene = new enchant.Scene();
                    itemGroup = new enchant.Group();
                    sellBg = new backSprite(game.width, 150, 0, 300, 'black', 1);
                    sellText = new itemLabel('背包里什么也没有~', 10, 310, 'white', '12px Microsoft YaHei',
                        'left', true, 600, 150);

                    itemGroup.addChild(sellBg);
                    itemGroup.addChild(sellText);

                    itemScene.addChild(itemGroup);
                    game.pushScene(itemScene);

                    setTimeout(function() {
                        game.popScene();
                    },1000);

                } else {
                    itemScene = new enchant.Scene();
                    itemGroup = new enchant.Group();
                    let group = new enchant.Group();
                    let labelGroup = new enchant.Group();
                    let descGroup = new enchant.Group();

                    sellBg = new backSprite(game.width, 150, 0, 300, 'black', 1);
                    sellText = new itemLabel('卖什么?', 10, 310, 'white', '12px Microsoft YaHei',
                        'left', true, 600, 150);
                    let sellItemBg = new backSprite(350, 110, 110, 0);
                    let descSprite = new backSprite(130,110,470,0);
                    group.addChild(sellItemBg);
                    group.addChild(descSprite);

                    //表示处在可见区域内的item索引
                    let inView = [];
                    if(items.length > 4) {
                        inView = [0,1,2,3];
                    } else {
                        inView = [];
                        items.forEach(function(o,i) {
                            inView.push(i);
                        });
                    }
                    let c = new cursor(130,8,'vertical',inView.length,26);

                    //上下箭头
                    let triangle_up = new triangle(285,3,'triangle_up');
                    let triangle_down = new triangle(285,102,'triangle_down');

                    let index = 0;  //选中物品的索引
                    //道具说明文字
                    let descText = [];

                    items.forEach(function (o, i) {
                        let label_1 = new itemLabel(o.name,160,5 + i * 26,'white','16px Microsoft YaHei',
                            'left',inView.indexOf(i) !== -1);
                        let label_2 = new itemLabel((parseInt(o.cost)/2>>0)+'G',330,8 + i * 26,'white','16px Arial',
                            'right',inView.indexOf(i) !== -1,100);

                        //将过长的说明分段显示
                        let tempString = [];
                        Array.prototype.forEach.call(o.description,function(o,i) {
                            tempString.push(o);
                            if(i !== 0 && i % 7 === 0) {
                                tempString.push('<br/>');
                            }
                        });
                        //首次加载所有说明，并显示对应说明，其余隐藏
                        descText[i] = new itemLabel(tempString.join(''),475,5,'white',
                            '12px Microsoft YaHei','left',i === inView[c.selected]);

                        labelGroup.addChild(label_1);
                        labelGroup.addChild(label_2);
                        descGroup.addChild(descText[i]);
                    });
                    group.addChild(sellBg);
                    group.addChild(sellText);


                    group.addChild(triangle_up);
                    group.addChild(triangle_down);
                    group.addChild(c);

                    itemScene.addChild(group);
                    itemScene.addChild(labelGroup);
                    itemScene.addChild(descGroup);
                    game.pushScene(itemScene);

                    //商品选单
                    let selectItem = function() {
                        itemGroup && game.currentScene.removeChild(itemGroup);
                        itemGroup = new Group();
                        labelGroup && game.currentScene.removeChild(labelGroup);
                        descGroup && game.currentScene.removeChild(descGroup);
                        descGroup = new Group();

                        inView.forEach(function(o,i) {
                            let itemName = items[o].name,
                                itemCost = items[o].cost;

                            let label_1 = new itemLabel(itemName,160,5 + i * 26,'white','16px Microsoft YaHei',
                                'left',true);
                            let label_2 = new itemLabel((parseInt(itemCost)/2>>0)+'G',330,8 + i * 26,'white','16px Arial',
                                'right',true,100);

                            itemGroup.addChild(label_1);
                            itemGroup.addChild(label_2);

                            itemScene.addChild(itemGroup);
                        });
                        //更新物品说明
                        descText.forEach(function(o,i) {
                            o.visible = i === inView[c.selected];
                            descGroup.addChild(o);
                            itemScene.addChild(descGroup);
                        });
                    };
                    let refresh = false;
                    itemScene.on('enterframe',function() {
                        if(refresh) {
                            selectItem();
                            disPlayGold();
                            refresh = false;
                        }

                        triangle_up.visible = inView[0] !== 0;
                        triangle_down.visible = inView[inView.length - 1] !== (items.length - 1);

                        if(game.input.down) {
                            if(keyCount++ === 1) {
                                index++;
                                index = Math.min(index,items.length - 1);
                                if(index > inView[inView.length - 1] && items.length > 4) {
                                    inView.shift();
                                    inView.push(index);
                                    selectItem();
                                }

                                descText.forEach(function(o,i) {o.visible = i === inView[c.selected];});
                            }
                        } else if(game.input.up) {
                            if(keyCount++ === 1) {
                                index--;
                                index = Math.max(index,0);
                                if(index < inView[0] && items.length > 4) {
                                    inView.pop();
                                    inView.unshift(index);
                                    selectItem();
                                }
                                descText.forEach(function(o,i) {o.visible = i === inView[c.selected];});
                            }
                        } else if(game.input.a) {
                            if(keyCount++ === 1) {
                                new SoundManage('select');
                                let currentItem = items[inView[Math.min(c.selected,inView.length - 1)]]; //当前选中的商品
                                let newBg = new backSprite(game.width, 150, 0, 300, 'black', 1);    //创建新背景
                                //将对话中的占位符替换成真实数据
                                let confirmText = dialog['dialog_6'].text.replace('{itemName}', currentItem.name)
                                    .replace('{itemCost}', (parseInt(currentItem.cost)/2>>0)+'G');
                                let confirmTxtLabel = new itemLabel(confirmText, 10, 310, 'white',
                                    '12px Microsoft YaHei','left', true, 600, 150);   //创建文字Label
                                let choice = new choiceText(dialog['dialog_6'].options, 35, 350);   //创建选项

                                let confirmGroup = new Group(); //新组
                                confirmGroup.addChild(newBg);
                                confirmGroup.addChild(confirmTxtLabel);
                                confirmGroup.addChild(choice);

                                let confirmScene = new Scene(); //新场景
                                confirmScene.addChild(confirmGroup);

                                game.pushScene(confirmScene);  //添加新场景

                                confirmScene.on('enterframe',function() {
                                    if(game.input.a) {
                                        if(keyCount++ === 1) {
                                            new SoundManage('select');
                                            let c_select = choice.cursor.selected;

                                            if(c_select === 0) {//确认卖
                                                let sellScene = new Scene();
                                                let sellBg = new backSprite(game.width,150,0,300,'black',1);
                                                let sellResult = new itemLabel('钱拿好~',10,310,
                                                    'white','12px Microsoft YaHei',
                                                    'left',true,600,150);
                                                game.gp += parseInt(currentItem.cost) / 2 >> 0;
                                                //从物品列表中移除该物品
                                                deleteItems(items,currentItem,descText);
                                                new SoundManage('buy');
                                                index = 0;
                                                if(items.length > 4) {
                                                    inView = [0,1,2,3];
                                                } else {
                                                    inView = [];
                                                    items.forEach(function(o,i) {
                                                        inView.push(i);
                                                    });
                                                }

                                                refresh = true;

                                                sellScene.addChild(sellBg);
                                                sellScene.addChild(sellResult);
                                                game.pushScene(sellScene);

                                                setTimeout(function() {
                                                    game.popScene();
                                                    game.popScene();
                                                    //若背包中没有物品了
                                                    if(items.length === 0) game.popScene();
                                                    c.selected = 0;
                                                    c.y = c.old_y;
                                                },1000);
                                            } else {//不卖
                                                game.popScene();
                                            }
                                        }
                                    } else if(game.input.b) {//不卖
                                        if(keyCount++ === 1) {
                                            game.popScene();
                                        }
                                    } else keyCount = 0;
                                });
                            }
                        } else if(game.input.b) {
                            if(keyCount++ === 1) {
                                scene.choice.cursor.visible = true;
                                game.popScene();
                            }
                        } else keyCount = 0;
                    });
                }
            }
        } else if(game.input.b) {
            if(keyCount++ === 1) {
                scene.choice.cursor.visible = true;
                game.popScene();
            }
        } else keyCount = 0;
    });
}

//展示商品
function showItemList(itemList,scene,dialog) {
    let group = new enchant.Group();
    let labelGroup = new enchant.Group();
    let itemGroup = new enchant.Group();
    //背景
    let sprite = new backSprite(game.width-60,game.height>>1,60,0);
    let descSprite = new backSprite(90,100,game.width-90,0);

    //表示处在可见区域内的item索引
    let inView = [0,1,2,3];
    //x,y,isVertical,number,step
    let c = new cursor(65,8,'vertical',4,25);

    //上下箭头
    let triangle_up = new triangle(game.width>>1,3,'triangle_up');
    let triangle_down = new triangle(game.width>>1,(game.height>>1)-5,'triangle_down');

    let len = itemList.length;
    let index = 0;  //选中物品的索引
    let keyCount = 0;
    //道具说明文字
    let descText = [];

    group.addChild(triangle_up);
    group.addChild(triangle_down);
    group.addChild(c);

    itemList.forEach(function(o,i) {
        //渲染物品名字
        let label_1 = new itemLabel(o.name,85,5 + i * 25,'white','10px Microsoft YaHei',
            'left',inView.indexOf(i) !== -1);
        //渲染价格
        let label_2 = new itemLabel(o.cost,110,6 + i * 25,'white','10px Arial',
            'right',inView.indexOf(i) !== -1,100);
        //渲染物品说明
        //将过长的说明分段显示
        let tempString = [];
        // Array.prototype.forEach.call(o.description,function(o,i) {
        //     tempString.push(o);
        //     if(i !== 0 && i % 7 === 0) {
        //         tempString.push('<br/>');
        //     }
        // });
        //首次加载所有说明，并显示对应说明，其余隐藏
        descText[i] = new itemLabel(o.description,game.width-85,5,'white',
            '10px Microsoft YaHei','left',i === inView[c.selected],75);

        labelGroup.addChild(label_1);
        labelGroup.addChild(label_2);
        group.addChild(descText[i]);
    });

    let newScene = new enchant.Scene();
    newScene.addChild(sprite);
    newScene.addChild(descSprite);
    newScene.addChild(group);
    newScene.addChild(labelGroup);

    game.pushScene(newScene);


    //商品选单
    let selectItem = function() {
        itemGroup && game.currentScene.removeChild(itemGroup);
        itemGroup = new enchant.Group();
        labelGroup && game.currentScene.removeChild(labelGroup);

        inView.forEach(function(o,i) {
            let itemName = itemList[o].name,
                itemCost = itemList[o].cost;

            let label_1 = new itemLabel(itemName,85,5 + i * 25,'white','12px Microsoft YaHei',
                'left',true);
            let label_2 = new itemLabel(itemCost,110,6 + i * 25,'white','12px Arial',
                'right',true,100);

            itemGroup.addChild(label_1);
            itemGroup.addChild(label_2);

            newScene.addChild(itemGroup);
        });

    };

    newScene.on('enterframe',function() {
        triangle_up.visible = inView[0] !== 0;
        triangle_down.visible = inView[inView.length - 1] !== (len - 1);

        if(game.input.down) {
            if(keyCount++ === 1) {
                index++;
                index = Math.min(index,len - 1);
                if(index > inView[3]) {
                    inView.shift();
                    inView.push(index);
                    selectItem();
                }
                descText.forEach(function(o,i) {o.visible = i === inView[c.selected];});
            }
        } else if(game.input.up) {
            if(keyCount++ === 1) {
                index--;
                index = Math.max(index,0);
                if(index < inView[0]) {
                    inView.pop();
                    inView.unshift(index);
                    selectItem();
                }
                descText.forEach(function(o,i) {o.visible = i === inView[c.selected];});
            }
        } else if(game.input.a) {
            if(keyCount++ === 1) {
                new SoundManage('select');
                let currentItem = itemList[inView[c.selected]]; //当前选中的商品
                //创建新背景
                let newBg = new backSprite(game.width,70,0,game.height-70,'black',1);
                let confirmText = dialog['dialog_5'].text.replace('{itemName}',currentItem.name)
                    .replace('{itemCost}',currentItem.cost);    //将对话中的占位符替换成真实数据
                let confirmTxtLabel = new itemLabel(confirmText,10,game.height-60,'white','12px Microsoft YaHei','left',true,game.width-20,50);   //创建文字Label
                let choice = new choiceText(dialog['dialog_5'].options, 35, 150);   //创建选项

                let confirmGroup = new enchant.Group(); //新组
                confirmGroup.addChild(newBg);
                confirmGroup.addChild(confirmTxtLabel);
                confirmGroup.addChild(choice);

                let confirmScene = new enchant.Scene(); //新场景
                confirmScene.addChild(confirmGroup);

                game.pushScene(confirmScene);  //添加新场景


                //为新场景监听事件
                confirmScene.on('enterframe',function() {
                    if(game.input.a) {
                        if(keyCount++ === 1) {
                            new SoundManage('select');
                            let c_select = choice.cursor.selected;

                            if(c_select === 0) {
                                let buyScene = new enchant.Scene();
                                let buyText = '';
                                let buyResult;
                                let buyBg = new backSprite(game.width,150,0,300,'black',1);
                                let buyGroup = new enchant.Group();
                                if(game.gp >= parseInt(currentItem.cost)) {
                                    buyText = '钱正好,装在谁的包里呢?';
                                    buyResult = new itemLabel(buyText,10,310,'white','12px Microsoft YaHei',
                                        'left',true,600,150);

                                    let playerNames = [];
                                    game.playerList.forEach(function(o) {
                                        playerNames.push(o.player.name);
                                    });
                                    let selectName = new choiceText3(playerNames,35,138,playerNames.length);

                                    buyGroup.addChild(buyBg);
                                    buyGroup.addChild(buyResult);
                                    buyGroup.addChild(selectName);
                                    buyScene.addChild(buyGroup);
                                    game.pushScene(buyScene);

                                    buyScene.on('enterframe',function() {
                                        if(game.input.a) {
                                            if(keyCount++ === 1) {
                                                let curPlayer = game.playerList[selectName.cursor.selected].player;
                                                if(curPlayer.items.length < curPlayer.maxItemsCount) {
                                                    game.gp -= parseInt(currentItem.cost);
                                                    curPlayer.items.push(currentItem);


                                                    new SoundManage('buy');
                                                    let buySuccess = new itemLabel('请拿好~',10,310,
                                                        'white','12px Microsoft YaHei',
                                                        'left',true,600,150);
                                                    let buySuccessBg = new backSprite(game.width,150,0,300,'black',1);
                                                    let buySuccessScene = new enchant.Scene();
                                                    buySuccessScene.addChild(buySuccessBg);
                                                    buySuccessScene.addChild(buySuccess);
                                                    game.pushScene(buySuccessScene);

                                                    setTimeout(function() {
                                                        game.popScene();
                                                        game.popScene();
                                                        game.popScene();
                                                        disPlayGold();
                                                    },1000);
                                                } else {
                                                    let buyFail = new itemLabel('背包已经满了,换个人拿吧.',10,310,
                                                        'white','12px Microsoft YaHei',
                                                        'left',true,600,150);
                                                    let buyFailBg = new backSprite(game.width,150,0,300,'black',1);
                                                    let buyFailScene = new enchant.Scene();
                                                    buyFailScene.addChild(buyFailBg);
                                                    buyFailScene.addChild(buyFail);
                                                    game.pushScene(buyFailScene);
                                                    setTimeout(function() {
                                                        game.popScene();
                                                    },1000);
                                                }
                                            }
                                        } else if(game.input.b) {
                                            if(keyCount++ === 1) {
                                                game.popScene();
                                                game.popScene();
                                            }
                                        } else keyCount = 0;
                                    });
                                } else {
                                    buyText = '钱不够啊,挑一个买得起的吧!';
                                    buyResult = new itemLabel(buyText,10,310,'white','12px Microsoft YaHei',
                                        'left',true,600,150);
                                    buyGroup.addChild(buyBg);
                                    buyGroup.addChild(buyResult);
                                    buyScene.addChild(buyGroup);
                                    game.pushScene(buyScene);

                                    setTimeout(function() {
                                        game.popScene();
                                        game.popScene();
                                    },1500);
                                }
                            }
                            if(c_select === 1) {
                                game.popScene();
                            }
                        }
                    } else if(game.input.b) {//退出到上一场景
                        if(keyCount++ === 1) {
                            game.popScene();
                        }
                    } else keyCount = 0;
                });

            }
        } else if(game.input.b) {
            if(keyCount++ === 1) {
                scene.choice.cursor.visible = true;
                game.popScene();
            }
        } else keyCount = 0;
    });
}

//显示金钱
function disPlayGold() {
    disPlayGold.gpSprite = new backSprite(60,16,game.width-90,game.height-90,'black',1);
    disPlayGold.gpText = new itemLabel(game.gp+'G',game.width-92,game.height-88,'white','12px Arial','right',true,60,16);

    disPlayGold.gpSprite && game.currentScene.removeChild(disPlayGold.gpSprite);
    disPlayGold.gpText && game.currentScene.removeChild(disPlayGold.gpText);

    game.currentScene.addChild(disPlayGold.gpSprite);
    game.currentScene.addChild(disPlayGold.gpText);
}

//删除物品
function deleteItems(itemList,removeItem,descText) {
    for(let i = 0; i < itemList.length; i++) {
        if(itemList[i].name === removeItem.name) {
            itemList.splice(i,1);
            descText.splice(i,1);
            break;
        }
    }
}

function makeArray(array) {
    var arr = [];
    for(var i = 0; i < array.length; i++) {
        if(array[i] instanceof Array) {
            arr = arr.concat(makeArray(array[i]));
        } else {
            arr = arr.concat(array[i]);
        }
    }
    return arr;
}

function gameOver() {
    var gameover = new triangle(205,152,'gameover',189,97);
    var overScene = new Scene();
    overScene.addChild(gameover);
    game.pushScene(overScene);
}


/**
 * 扩展
 */
//游戏音效管理类
function SoundManage() {
    return this.init.apply(this,arguments);
}
SoundManage.prototype = {
    constructor:SoundManage,
    /**
     * 播放音乐
     * @param sound {string} 音乐路径
     * @param loop  {boolean} 是否循环播放
     * @param closeSound  {string} 需要关闭的音乐
     * @param volume  {number} 音量0~1
     * @returns {Object} 返回对当前播放音乐的引用
     */
    init:function(sound,loop,closeSound,volume) {
        this.bgm = game.assets[sound];
        this.play(this.bgm,loop,closeSound,volume);

        return this.bgm;
    },
    play:function(sound,loop,closeSound,volume) {
        sound.play();
        sound.volume = volume || 0.6;
        if(loop) sound.src.loop = true;
        if(closeSound) this.stop(closeSound);
    },
    stop:function(sound) {
        sound ? game.assets[sound].stop() : this.bgm.stop();
    }
};

//游戏文字管理类
function CreateLabel() {
    return this.init.apply(this,arguments);
}
CreateLabel.prototype = {
    constructor:CreateLabel,
    init:function(options) {
        var label = new Label();
        label.text = options.text;
        label.moveTo((game.width - label._boundWidth) / 2,(g.height - label._boundHeight) / 2);
        label.opacity = options.opacity || 1;
        label.backgroundColor = options.backgroundColor || '#000';

        label._style = {
            'font': options.font || '26px Microsoft YaHei',
            'color':options.color || '#fff',
            'text-align':options.textAlign || 'left'
        };
        return label;
    }
};

Array.prototype.contains = function(item) {
    return new RegExp("\\b"+item+"\\b").test(this);
};

Array.prototype.findTile = function(x,y,scene) {
    for(let i = 0,len = this.length; i < len; i++) {
        let coordinate = this[i].coordinate;
        for(let j = 0; j < coordinate.length; j++) {
            if(x === coordinate[j].tileX && y === coordinate[j].tileY && scene === this[i].scene)
                return this[i];
        }
    }
    return null;
};

/**
 * 设置camera
 * @param mapWidth {number} 地图宽度
 * @param mapHeight {number} 地图高度
 * @param playerList {Array} player清单
 * @param stage {Object} 场景中对象的组合
 */
function setCamera(mapWidth,mapHeight,playerList,stage) {
    let x = Math.min((game.width - config.spriteWidth) / 2 - playerList[0].player.x,0);
    let y = Math.min((game.height - config.spriteHeight) / 2 - playerList[0].player.y,0);

    x = Math.max(game.width, x + mapWidth) - mapWidth;
    y = Math.max(game.height, y + mapHeight) - mapHeight;

    stage.x = x;
    stage.y = y;
}

//创建NPC
function createNPC(options) {
    return new NPC({
        tileX:options.tileX,
        tileY:options.tileY,
        standing:options.standing,
        canPush:options.canPush,
        specialMove:options.specialMove,
        image:options.imageName,
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

//判断玩家周围是否有NPC
function hasObstacleAround(player) {
    let character = player.player;
    let around = {
        'up':{x:character.x,y:character.y - tileSize},
        'down':{x:character.x,y:character.y + tileSize},
        'left':{x:character.x - tileSize,y:character.y},
        'right':{x:character.x + tileSize,y:character.y}
    };

    let ret = [];
    //获取相应地图内的npc集合
    let npc = game.npcList[game.mapCode].npc;

    for(let i in npc) {
        let x = npc[i].x,
            y = npc[i].y,
            canPush = npc[i].canPush;

        for(let j in around) {
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


