/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * Menu class 客户端菜单类
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/07/29 初版
 */

let Menu = {
    //菜单控制
    cmdChoose:-1,
    MouseX: 0,
    MouseY: 0,
    // 菜单中的分页指示
    menuPage: 1,
    // 物品显示参数位置
    listLayer:new LSprite(),
    listLayer_Y: 0,           // 原始位置
    maxScrollHeight: 0,
    listFocus: null,            // 选中的列表项后面的高亮区
    // 所有菜单的列表
    iconMenu: [
        {cmd: 1,name:'状态'},
        {cmd: 2,name:'物品'},
        {cmd: 3,name:'任务'},
        {cmd: 4,name:'存档'},
        {cmd: 0,name:'退出'}
    ],
    largeIconScale: 1.3,
    // 物品菜单的拖拽控制
    dragTimer:0,
    dragingItem: null,
    isItemDraging:false,
    nameText: null,
    chooseItem: -1,
    chooseHero: -1,
    // 存档相关
    saveSlot: 0,
    // 当前显示的主队成员
    currentHeroShow: 0,
    // 用于辅助物品使用的显示
	showItemEffectLabel:null,
    //回调方法
    callback:null,
    //当前商品列表
    currentItemList:false,
    //是否是买卖行为
    trade:false,
    //买卖物品价格
    itemCost:0,
    layer:new LSprite(),
    touchLayer:new LSprite(),

	/**
	 * 显示背包
	 *
	 * */
    menuShowItems:()=>{
        Menu.menuPage= 2;
        switch (Menu.trade){
            case 'sell':
                Menu.currentItemList = mainTeam.itemList;
                break;
            case 'buy':
                Menu.currentItemList = ItemList;
                break;
            default:
                Menu.currentItemList = mainTeam.itemList;
                break;
        }
        if(Menu.trade){
            //对话背景
            talkLayer.x = 10;
            talkLayer.y = 10;
            UI.drawBorderWindow(talkLayer, 0, 0, menuWidth, menuHeight);
            ctrlLayer = new LSprite();
            talkLayer.addChild(ctrlLayer);
        }
        ctrlLayer.removeAllChild();

        if(!RPG.checkState(RPG.IN_MENU)) RPG.pushState(RPG.IN_MENU);

        let i,item1,text,money;

        text = UI.simpleText("物品",18);
        text.x = menuWidth-text.getWidth()>>1;
        text.y = 2*gap;
        ctrlLayer.addChild(text);
        //绘制钱钱
        money = UI.diyButton(0,0,gap,gap,'G:'+mainTeam.money);
        money.setState(LButton.STATE_DISABLE);
        ctrlLayer.addChild(money);
        //按钮
        let btn = UI.diyButton(0,0,menuWidth-50,gap,'退出',()=>{
            Menu.trade = false;Menu.closeMenu()
        });
        ctrlLayer.addChild(btn);
        // 所有物品画在一张图片上
        let maskObj = new LSprite();
        // 144= 物品使用及信息区域 + 底部按钮区域；40= 上方区域
        let maskHeight = menuHeight- 144- 40;
        maskObj.graphics.drawRect(0, "#000", [0, 40, menuWidth, maskHeight]);
        if (!Menu.listLayer) {
            Menu.listLayer= new LSprite();
            Menu.listLayer.x= 0;
            Menu.listLayer.y= 60;
        } else {
            Menu.listLayer.removeAllChild();
            Menu.listLayer.y= 60;
        }
        Menu.listLayer.mask = maskObj;
        ctrlLayer.addChild(Menu.listLayer);
        Menu.maxScrollHeight= Menu.currentItemList.length* 30- maskHeight;
        RPG.descLayer.removeAllChild();
        RPG.descLayer.x = gap;
        // 保留144的物品描述即够用
        RPG.descLayer.y = menuHeight - 144;
        ctrlLayer.addChild(RPG.descLayer);

        // 物品列表
        for (i= 0; i< Menu.currentItemList.length; i++){
            // 逐个显示物品
            item1 = Menu.currentItemList[i];
            // 物品名称
            switch (Menu.trade){
                case 'sell':
                    text = UI.text(ItemList[item1.index].name+'    '+item1.num,gap* 2+ 30,i* 30+ gap+ 5);
                    break;
                case 'buy':
                    text = UI.text(item1.name+'    '+item1.cost+'G',gap* 2+ 30,i* 30+ gap+ 5);
                    break;
                default:
                    text = UI.text(ItemList[item1.index].name+'    '+item1.num,gap* 2+ 30,i* 30+ gap+ 5);
                    break;
            }
            Menu.listLayer.addChild(text);
        }
        // 选择高亮条
        Menu.listFocus= UI.drawColorWindow(Menu.listLayer, 0, 0, menuWidth-gap*2, 25,0.5,'#eee');

        // if (Menu.chooseItem>= 0) {
        //     Menu.menuShowOneItem(Menu.chooseItem);
        // } else {
            Menu.menuShowOneItem(0);
        // }
    },

    /**
     * 显示背包
     *
     * */
    fightShowItems:()=>{
        Menu.currentItemList = mainTeam.itemList;
        Menu.layer.removeAllChild();
        Menu.layer.x = gap;
        Menu.layer.y = gap;
        //加背景
        UI.drawBorderWindow(Menu.layer, 0, 0, menuWidth, menuHeight);
        //显示到talk层
        talkLayer.addChild(Menu.layer);
        if(!RPG.checkState(RPG.IN_FIGHTMENU)) RPG.pushState(RPG.IN_FIGHTMENU);

        let i,item1,text,money;
        text = UI.simpleText("物品",18);
        text.x = menuWidth-text.getWidth()>>1;
        text.y = 2*gap;
        Menu.layer.addChild(text);
        //绘制钱钱
        money = UI.diyButton(0,0,gap,gap,'G:'+mainTeam.money);
        money.setState(LButton.STATE_DISABLE);
        Menu.layer.addChild(money);
        //按钮
        let btn = UI.diyButton(0,0,menuWidth-50,gap,'退出',()=>{
            talkLayer.removeChild(Menu.layer);
        });
        Menu.layer.addChild(btn);

        // 所有物品画在一张图片上
        let maskObj = new LSprite();
        // 144= 物品使用及信息区域 + 底部按钮区域；40= 上方区域
        let maskHeight = menuHeight- 144- 40;
        maskObj.graphics.drawRect(0, "#000", [0, 40, menuWidth, maskHeight]);
        Menu.listLayer.removeAllChild();
        Menu.listLayer.x= 0;
        Menu.listLayer.y= 60;
        Menu.listLayer.mask = maskObj;
        Menu.layer.addChild(Menu.listLayer);
        Menu.maxScrollHeight= Menu.currentItemList.length* 30- maskHeight;
        RPG.descLayer.removeAllChild();
        RPG.descLayer.x = gap;
        // 保留144的空间即够用
        RPG.descLayer.y = menuHeight - 144;
        Menu.layer.addChild(RPG.descLayer);

        // 物品列表
        for (i= 0; i< Menu.currentItemList.length; i++){
            // 逐个显示物品
            item1 = Menu.currentItemList[i];
            // 物品名称
            text = UI.simpleText(ItemList[item1.index].name+'    '+item1.num);
            text.x = gap*5;
            text.y = i* 30+ gap+ 5;
            Menu.listLayer.addChild(text);
        }
        // 选择高亮条
        Menu.listFocus= UI.drawColorWindow(Menu.listLayer, 0, 0, menuWidth-gap*2, 25,0.5,'#eee');
        Menu.menuShowOneItem(0);
        Menu.layer.addChild(Menu.touchLayer);

    },

    // 拖动物品栏的物品
    dragItemBegin:(ax, ay, itemId)=>{
        let item1,text, i;
        // 详细信息
        RPG.descLayer.removeAllChild();
        // 显示单一物品详细信息
        // item1 = mainTeam.itemList[itemId].getItem();
        item1 = Menu.currentItemList[Menu.chooseItem];
        text = UI.text('',gap* 2,5);
        console.log('item1',item1);
        switch (item1.kind){
            case 1:
                text.text = item1.name+ "装配：";
                break;
            case 2:
                text.text = item1.name+ "使用：";
                break;
            case 4:
            case 3:
                text.text = item1.name+ "不可用";
                break;
        }
        RPG.descLayer.addChild(text);
        if ( (item1.kind === 1) || (item1.kind === 2) ) {
            // 显示姓名
            Menu.nameText = text.clone();
            Menu.nameText.x = text.x+ text.getWidth()+ gap;
            Menu.nameText.text = "";
            RPG.descLayer.addChild(Menu.nameText);
            Menu.chooseHero= -1;
            let cc= (menuWidth- gap* 2)/ mainTeam.heroList.length;
            for (i=0; i< mainTeam.heroList.length; i++){
                let hero = mainTeam.heroList[i];
                let heroImg= hero.img;
                let bitmapData = new LBitmapData(assets[heroImg]);
                let chara = new Fighter(bitmapData,4,4);
                // 测试物品效果的英雄
                let hero2= RPG.beget(HeroPlayer);
                RPG.extend(hero2, hero);
                //
                chara.x = cc* i+ cc/ 2- STEP/ 2;
                chara.y = gap* 2+ 5;
                // 根据物品的属性，增加相应属性值的显示
                if (item1.kind===1) {
                    // 装备类，显示现有的装配物
                    let tempItem;
                    switch (item1.type){
                        case 1:
                            tempItem= hero.weapon;
                            break;
                        case 2:
                            tempItem= hero.armor;
                            break;
                        case 3:
                            tempItem= hero.ornament;
                            break;
                    }

                } else if (item1.kind=== 2) {
                    // 使用类，显示对应的值
                    let text1 = text.clone();
                    text1.x = chara.x+ STEP/ 2;
                    text1.y = chara.y+ STEP+ 5;
                    text1.textAlign= "center";
                    if (item1.type=== 1) {
                        text1.text = "HP="+ hero.Hp;
                    }
                    RPG.descLayer.addChild(text1);
                    // 预计使用效果
                    // item1.effect(hero2);
                    // let text2 = text1.clone();
                    // if (item1.type=== 1) {
                    // 	text2.text = "HP="+ hero2.Hp;
                    // }
                    // if (text2.text=== text.text) {
                    // 	text2.color = "#FFFFFF";
                    // } else {
                    // 	text2.color = "#00FFFF";
                    // }
                    // text2.visible= false;
                    // RPG.descLayer.addChild(text2);
                    // Menu.showItemEffectLabel.push(text2);
                    // Menu.showItemEffectLabel.push(text);
                }
                RPG.descLayer.addChild(chara);
            }
            Menu.chooseItem= itemId;
            Menu.dragingItem = text.clone();
            Menu.dragingItem.text = item1.name;
            Menu.dragingItem.x= ax- RPG.descLayer.x;
            Menu.dragingItem.y= ay- RPG.descLayer.y;
            Menu.dragingItem.scaleX= 2;
            Menu.dragingItem.scaleY= 2;
            RPG.descLayer.addChild(Menu.dragingItem);
            Menu.isItemDraging= true;
        } else {
            Menu.nameText= null;
            Menu.chooseItem= -1;
            return;
        }

        // 图标作为拖动物
        // let bitmapData = new LBitmapData(assets["iconset"], ItemList[item1.index].pic.x*Menu.iconStep, ItemList[item1.index].pic.y*Menu.iconStep, Menu.iconStep, Menu.iconStep);
        // Menu.dragingItem = new LBitmap(bitmapData);

    },
	// 显示物品使用效果
    showLabel:(itemId)=>{
        for (let i= 0; i< Menu.showItemEffectLabel.length; i++) {
            if(((i/2)<<0) === i/2){
                Menu.showItemEffectLabel[i].visible= false;
            } else {
                Menu.showItemEffectLabel[i].visible= true;
            }
        }
        if (itemId>= 0 && Menu.showItemEffectLabel.length) {
            Menu.showItemEffectLabel[itemId* 2].visible = true;
            Menu.showItemEffectLabel[itemId* 2 + 1].visible = false;
        }
    },

	waitMenu:(callback)=>{
        Menu.callback = callback;
        // if (RPG.checkState(RPG.UNDER_WINDOWS)) {
		// 	setTimeout(function(){Menu.waitMenu(callback)}, 1000);
		// } else {
		// 	if (callback)  callback();
		// }
	},

    dealMenuUp:(x, y)=>{
        if (Menu.menuPage===2 || Menu.menuPage===1){
            clearTimeout(Menu.dragTimer);
            if (Menu.isItemDraging){
                Menu.dropItem();
            }
        }
    },

	closeMenu:()=>{
        // 切换状态
        RPG.popState();
		//将对话层清空
		talkLayer.removeAllChild();
		Menu.cmdChoose = -1;
        Menu.trade = false;
        Menu.itemCost = 0;
		// 这个动作，是为了屏蔽鼠标抬起事件
		isKeyDown= false;
		if(Menu.callback){
		    Menu.callback();
            Menu.callback=null;
        }
	},
    //菜单显示状态
    menuShowState: function() {
        //对话人物名称
        let valueLength,
            hero1 = mainTeam.heroList[Menu.currentHeroShow],
            rightPos = 110,
            leftPos = 10,
            topPos = 10,
            item1,
            textObj,numObj;

        if (!hero1) hero1= mainTeam.heroList[0];
        Menu.menuPage= 1;
        ctrlLayer.removeAllChild();
        textObj = UI.simpleText('');
        let item = [
            {text:'NAME',obj:textObj.clone()},
            {text:'FACE',obj:textObj.clone()},
            {text:'HP',obj:textObj.clone()},
            {text:'SP',obj:textObj.clone()},
            {text:'LV',obj:textObj.clone()},
            {text:'EXP',obj:textObj.clone()}
        ];
        for (let i = 0; i < item.length; i++) {
            let obj = item[i];
            switch (obj.text){
                case 'NAME':
                    obj.obj.x = rightPos;
                    obj.obj.y = topPos;
                    obj.obj.text = hero1.nickName;
                    break;
                case 'FACE':
                    // 头像
                    let imgData = new LBitmapData(assets[hero1.getFace()]);
                    let bitmap = new LBitmap(imgData);
                    bitmap.x = leftPos;
                    bitmap.y = topPos;
                    ctrlLayer.addChild(bitmap);
                    break;
                case 'HP':
                    // hp血条
                    // valueLength= (menuWidth- rightPos)- gap;
                    // RPG.drawScale(ctrlLayer, "winback", rightPos, 52, valueLength, 12);
                    // RPG.drawScale(ctrlLayer, "#ff565c", rightPos, 50, valueLength* hero1.getHpRate(), 15);
                    topPos+= 20;
                    obj.obj.x = rightPos;
                    obj.obj.y = topPos;
                    obj.obj.text = obj.text+' : '+hero1.Hp+ " / "+ hero1.MaxHp;
                    // numObj = textObj.clone();
                    // numObj.x = rightPos;
                    // numObj.y = topPos+20;
                    // numObj.text = hero1.Hp+ " / "+ hero1.MaxHp;
                    // ctrlLayer.addChild(numObj);
                    break;
                case 'SP':
                    // 战车血条
                    // valueLength= (menuWidth- rightPos)- gap;
                    // RPG.drawScale(ctrlLayer, "winback", rightPos, 92, valueLength, 12);
                    // RPG.drawScale(ctrlLayer, "#2b92ff", rightPos, 92, valueLength* hero1.getMpRate(), 12);
                    obj.obj.x = rightPos;
                    obj.obj.y = 70;
                    obj.obj.text = obj.text+' : '+hero1.Sp+ " / "+ hero1.MaxSp;
                    // numObj = textObj.clone();
                    // numObj.x = rightPos;
                    // numObj.y = 90;
                    // numObj.text = hero1.Sp+ "/"+ hero1.MaxSp;
                    // ctrlLayer.addChild(numObj);
                    break;

                case 'LV':
                    obj.obj.x = leftPos;
                    obj.obj.y = 110;
                    obj.obj.text = obj.text+' : '+hero1.Level;
                    // numObj = textObj.clone();
                    // numObj.x = leftPos;
                    // numObj.y = 130;
                    // numObj.text = ;
                    // ctrlLayer.addChild(numObj);
                    break;
                case 'EXP':
                    // 经验条
                    // valueLength= (menuWidth- rightPos)- gap;
                    // RPG.drawScale(ctrlLayer, "winback", rightPos, 132, valueLength, 12);
                    // RPG.drawScale(ctrlLayer, "#28ff4e", rightPos, 130, valueLength* hero1.getExpRate(), 15);
                    obj.obj.x = rightPos;
                    obj.obj.y = 110;
                    obj.obj.text = obj.text+' : '+hero1.Exp+' / '+hero1.maxExp;
                    // numObj = textObj.clone();
                    // numObj.x = rightPos;
                    // numObj.y = 130;
                    // numObj.text = ;
                    // ctrlLayer.addChild(numObj);
                    break;
            }
            ctrlLayer.addChild(obj.obj);
        }

        // 显示持有物品 武器 防具 饰物
        let showedItems=["weapon","armor","ornament"];
        for (let i= 0; i<= 2; i++) {
            item1 = ItemList[hero1[showedItems[i]]];
            if (item1) {
                // 图片
                // let imgData = new LBitmapData(assets["iconset"], item1.pic.x*Menu.iconStep, item1.pic.y*Menu.iconStep, Menu.iconStep, Menu.iconStep);
                // let bitmap = new LBitmap(imgData);
                // bitmap.x= leftPos;
                // bitmap.y= 160+ i* 30;
                // ctrlLayer.addChild (bitmap);
                // 物品名称
                let text = textObj.clone();
                text.x = leftPos + gap;
                text.y = 160+ i* 30 + 5;
                text.text = item1.name;
                ctrlLayer.addChild(text);
            }
        }
    },
    //显示物品详情
    menuShowOneItem: function(id) {
        let item1, text;
        // 详细信息
        RPG.descLayer.removeAllChild();
        // 显示单一物品详细信息
        if (id>=Menu.currentItemList.length) {
            id= Menu.currentItemList.length- 1;
        }
        item1= Menu.currentItemList[id];
        if (item1){
            Menu.chooseItem = id;
            Menu.listFocus.x = gap;
            Menu.listFocus.y = id*30+ gap;
            // 详细描述
            text = UI.text(item1.description,gap,2*gap);
            RPG.descLayer.addChild(text);
        }
    },
    //使用、装备物品
    dropItem: function(){
        RPG.descLayer.removeAllChild();
        Menu.isItemDraging= false;
        if (Menu.chooseItem>= 0){
            if (Menu.chooseHero>= 0){
                switch (Menu.trade){
                    case 'sell':
                        mainTeam.delItem(Menu.chooseItem);
                        mainTeam.addMoney(Menu.itemCost);
                        break;
                    case 'buy':
                        mainTeam.addItem(Menu.chooseItem, 1);
                        mainTeam.reduceMoney(Menu.itemCost);
                        break;
                    default:
                        // 物品装配或使用
                        mainTeam.useItem(Menu.chooseHero, Menu.chooseItem, 1);
                        break;
                }
                Menu.menuShowItems();
            }
        }
    },

    menuShowTasks: function() {
        Menu.menuPage= 3;
        ctrlLayer.removeAllChild();
    },

    menuShowSave: function(isSelect) {
        Menu.menuPage= 4;
        ctrlLayer.removeAllChild();
        let text = UI.simpleText("保存进度",18);
        text.x = menuWidth-text.getWidth()>>1;
        text.y = 2*gap;
        ctrlLayer.addChild(text);
        // 可用存档槽
        if (!Menu.listLayer) {
            Menu.listLayer= new LSprite();
        } else {
            Menu.listLayer.removeAllChild();
        }
        Menu.listLayer.x= 0;
        Menu.listLayer.y= 60;
        ctrlLayer.addChild(Menu.listLayer);
        Menu.listLayer.mask = null;
        // 选择高亮条
        if (isSelect) {
            // 选择高亮条
            Menu.listFocus= UI.drawColorWindow(Menu.listLayer, gap, 0, menuWidth- gap* 2, 25,0.5,'#eee');
            Menu.saveSlot= 0;
        } else {
            Menu.listFocus= UI.drawImgColor(Menu.listLayer, gap, Menu.listFocus.y, menuWidth- gap* 2, 25,0.5,'#eee');
        }

        for (let i= 0; i< RPG.MaxSaveSlot; i++){
            // 存档名称
            text = UI.simpleText(RPG.showSaveSlot(i));
            text.x = menuWidth>>3;
            text.y = i* 30+ 5;
            Menu.listLayer.addChild(text);
        }
        // let exitButton = UI.diyButton(60, 30, gap*2, menuHeight- 90, "删除", function(){
        //     Menu.closeMenu();
        //     RPG.drawCover();
        // });
        let saveButton = UI.diyButton(60, 30, gap*2, menuHeight>>1, "保存", function(){
            RPG.saveGame(Menu.saveSlot);
            Menu.menuShowSave(false);
        });
        ctrlLayer.addChild(saveButton);
        let loadSave= UI.diyButton(60, 30, gap*2 + 70, menuHeight>>1, "载入", function(e){
            Menu.closeMenu();
            RPG.loadGame(Menu.saveSlot);
        });
        ctrlLayer.addChild(loadSave);
    },

    menuShowLoad: function() {
        Menu.menuPage= 5;
        ctrlLayer.removeAllChild();
        let text = UI.simpleText("载入进度",18);
        text.x = menuWidth-text.getWidth()>>1;
        text.y = 2*gap;
        ctrlLayer.addChild(text);
        // UI.text("载入进度",menuWidth/ 2,10,'20');
        // text.width= 200;
        // text.textAlign= "center";
        // ctrlLayer.addChild(text);
        // 可用存档槽
        if (!Menu.listLayer) {
            Menu.listLayer= new LSprite();
        } else {
            Menu.listLayer.removeAllChild();
        }
        Menu.listLayer.x= 0;
        Menu.listLayer.y= 60;
        ctrlLayer.addChild(Menu.listLayer);
        Menu.listLayer.mask = null;
        // 选择高亮条
        // Menu.listFocus= UI.drawImgColor(Menu.listLayer, gap, 0, menuWidth- gap* 2, 30);
        // 选择高亮条
        Menu.listFocus= UI.drawColorWindow(Menu.listLayer, gap, 0, menuWidth-gap*2, 25,0.5,'#eee');
        Menu.saveSlot= 0;
        //
        for (let i= 0; i< RPG.MaxSaveSlot; i++){
            // 存档名称
            text = UI.simpleText(RPG.showSaveSlot(i));
            text.x = menuWidth>>3;
            text.y = i* 30+ 5;
            Menu.listLayer.addChild(text);
            // text = UI.text(RPG.showSaveSlot(i),gap* 2,i* 30+ 5);
            // Menu.listLayer.addChild(text);
        }
        // 空白按钮图片
        let button01= UI.diyButton(90, 30, gap* 2, menuHeight- 60, "载入进度", function(e){
            Menu.closeMenu();
            RPG.loadGame(Menu.saveSlot);
        });
        ctrlLayer.addChild(button01);
        // 空白按钮图片
        ctrlLayer.addChild(UI.diyButton(90, 30, menuWidth- gap* 2- 90, menuHeight- 60, "返回", function(e){
            Menu.closeMenu();
        }));
    },
    // 从标题画面，打开载入进度菜单
    openLoadMenu: function() {
        // 切换状态
        RPG.pushState(RPG.COVER_MENU);
        //将对话层清空
        talkLayer.removeAllChild();
        //当对话开始，且按照顺序进行对话
        //对话背景
        talkLayer.x = 10;
        talkLayer.y = 10;
        UI.drawBorderWindow(talkLayer, 0, 0, menuWidth, menuHeight);
        // 子菜单层
        ctrlLayer = new LSprite();
        talkLayer.addChild(ctrlLayer);
        Menu.menuShowLoad();
    },

    // 游戏进行中，打开主菜单
    openMenu: function() {
        //切换状态
        RPG.pushState(RPG.IN_MENU);
        //将对话层清空
        talkLayer.removeAllChild();
        let menusDown=40;
        let tmpMenuWidth = menuWidth / Menu.iconMenu.length;
        //对话背景
        talkLayer.x = 10;
        talkLayer.y = 10;
        UI.drawBorderWindow(talkLayer, 0, 0, menuWidth, menuHeight);
        let y = (menuHeight - gap - menusDown)<<0;
        for (let i=0; i< Menu.iconMenu.length; i++) {
            let obj = Menu.iconMenu[i];
            let x = (tmpMenuWidth*i + menusDown/2 - gap)<<0 ;
            let menuItem = UI.diyButton(0,0,x,y,obj.name);
            obj.x = x;
            obj.y = y;
            talkLayer.addChild(menuItem);
        }
        // 子菜单层
        ctrlLayer = new LSprite();
        talkLayer.addChild(ctrlLayer);
        Menu.currentHeroShow= 0;
        Menu.menuShowState();
    },

    dealMenu: function(ax, ay){
        // 根据点击位置，判断移动方向
        ax = ax- talkLayer.x;
        ay = ay- talkLayer.y;


        let	iconMenuItem;
        Menu.cmdChoose= -1;
        let len = Menu.iconMenu.length;
        for (let i=0; i < len; i++){
            iconMenuItem = Menu.iconMenu[i];
            if(ax > iconMenuItem.x &&
                ax < iconMenuItem.x + STEP &&
                ay > iconMenuItem.y &&
                ay < iconMenuItem.y + STEP){
                if(Menu.cmdChoose === i) return;
                Menu.cmdChoose = i;
                break;
            }
        }

        if (Menu.cmdChoose >= 0){
            let index = Menu.iconMenu[Menu.cmdChoose];
            switch (index.cmd){
                case 0:
                    Menu.closeMenu();
                    break;
                case 1:
                    Menu.menuShowState();
                    break;
                case 2:
                    Menu.menuShowItems();
                    break;
                case 3:
                    Menu.menuShowTasks();
                    break;
                case 4:
                    Menu.menuShowSave(true);
                    break;
            }
        }
        // 点击的时候记录鼠标位置
        Menu.MouseX= ax;
        Menu.MouseY= ay;
        let cc,hero1;
        // 分页处理
        switch (Menu.menuPage){
            case 1:
                // 长按卸下装备
                Menu.dragTimer= setTimeout(function(){
                    cc= ((ay- 160)/ 40)<<0;
                    hero1 = mainTeam.heroList[Menu.currentHeroShow];
                    switch (cc) {
                        case 0:
                            mainTeam.addItem(hero1.changeWeapon(-1), 1);
                            Menu.menuShowState();
                            break;
                        case 1:
                            mainTeam.addItem(hero1.changeArmor(-1), 1);
                            Menu.menuShowState();
                            break;
                        case 2:
                            mainTeam.addItem(hero1.changeOrn(-1), 1);
                            Menu.menuShowState();
                            break;
                    }
                }, 500);
                break;
            case 2:
                // 拉动物品条，以及长按使用物品
                Menu.listLayer_Y= Menu.listLayer.y;
                cc = ((ay- Menu.listLayer.y)/ 30)<<0;
                if (cc>= 0 && cc< Menu.currentItemList.length && ay< RPG.descLayer.y) {
                    Menu.menuShowOneItem(cc);
                    switch (Menu.trade){
                        case 'sell':
                            Menu.dragTimer = setTimeout(function(){Menu.sell(ax- 20, ay- 20, cc);}, 1000);
                            break;
                        case 'buy':
                            Menu.dragTimer = setTimeout(function(){Menu.buy(ax- 20, ay- 20, cc);}, 1000);
                            break;
                        default:
                            Menu.dragTimer = setTimeout(function(){Menu.dragItemBegin(ax- 20, ay- 20, cc);}, 1000);
                            break;
                    }
                }
                break;
            case 4:
            case 5:
                // 选择存档槽
                cc = ((ay- Menu.listLayer.y)/30)<<0;
                if (cc>= 0 && cc< 5) {
                    Menu.listFocus.y= cc* 30;
                    Menu.saveSlot= cc;
                }
                break;
        }
    },
    dealMenuMove: function(ax, ay){
        if (isKeyDown){
            ax= ax- talkLayer.x-20;
            ay= ay- talkLayer.y-20;
            if (Menu.menuPage===2){
                // 物品窗口
                if (Menu.isItemDraging){
                    // 动态选择人物
                    Menu.dragingItem.x = ax - RPG.descLayer.x;
                    Menu.dragingItem.y = ay - RPG.descLayer.y;
                    // 动态选择人物
                    if (Menu.nameText) {
                        // 可以选人的状态
                        let cc= (ax/ (menuWidth/ mainTeam.heroList.length))<<0;
                        if (cc>=0 && cc<mainTeam.heroList.length && ay> RPG.descLayer.y) {
                            Menu.chooseHero = cc;
                            switch (Menu.trade){
                                case 'sell':
                                    Menu.nameText.text= '售卖员';
                                    break;
                                case 'buy':
                                default:
                                    // 物品装配或使用
                                    Menu.nameText.text= mainTeam.heroList[cc].nickName;
                                    break;
                            }

                            console.log('cc',cc, Menu.nameText.text);
                            // Menu.showLabel(cc);
                            // 同时显示可能会出现的值的变化
                            //console.log(Menu.nameText.text);
                        } else {
                            Menu.nameText.text= "";
                            Menu.chooseHero= -1;
                            // Menu.showLabel(-1);
                        }
                    }
                } else {
                    let delta= ay- Menu.MouseY;
                    let a = Menu.listLayer_Y+ delta;
                    if (a<= 40 && Menu.maxScrollHeight> 0) {
                        if (a< -Menu.maxScrollHeight+ 40) {
                            Menu.listLayer.y= -Menu.maxScrollHeight+ 40;
                        } else {
                            Menu.listLayer.y= a;
                        }
                    } else {
                        Menu.listLayer.y= 40;
                    }
                    if (delta> 5 || delta< -5) {
                        clearTimeout(Menu.dragTimer);
                    }
                }
            } else if (Menu.menuPage===1) {
                // 状态窗口，左右切换选人
                let delta= ax- Menu.MouseX;
                if (delta> 100) {
                    Menu.currentHeroShow++;
                    if (Menu.currentHeroShow>= mainTeam.heroList.length) {
                        Menu.currentHeroShow= 0;
                    }
                    Menu.MouseX= ax;
                    Menu.MouseY= ay;
                    Menu.menuShowState();
                    clearTimeout(Menu.dragTimer);
                } else if (delta< -100) {
                    Menu.currentHeroShow--;
                    if (Menu.currentHeroShow< 0) {
                        Menu.currentHeroShow= mainTeam.heroList.length- 1;
                    }
                    Menu.MouseX= ax;
                    Menu.MouseY= ay;
                    Menu.menuShowState();
                    clearTimeout(Menu.dragTimer);
                }
            }
        }
    },
    
    showItemList:function () {
        
    },

    clickList: function(x, y){
        // 根据点击位置，判断移动方向
        x = x- Menu.layer.x;
        y = y- Menu.layer.y;
        console.log('xy',x,y);

        // 点击的时候记录鼠标位置
        Menu.MouseX= x;
        Menu.MouseY= y;

        // 拉动物品条，以及长按使用物品
        Menu.listLayer_Y= Menu.listLayer.y;
        let cc = ((y- Menu.listLayer.y)/ 30)<<0;
        if (cc>= 0 && cc< Menu.currentItemList.length && y< RPG.descLayer.y) {
            Menu.menuShowOneItem(cc);
            let item1 = Menu.currentItemList[cc];
            let select,index;
            Menu.dragTimer = setTimeout(function(){
                console.log('调用了',item1.kind);
                switch (item1.kind){
                    case 1:
                        select = {msg:"确认装备么？",option:[
                            {text:'是',action:()=>{
                                index = mainTeam.heroList.indexOf(Fight.currentFighter);
                                console.log('index',index);
                                mainTeam.useItem(index, cc, 1);
                                Menu.layer.removeAllChild();
                                talkLayer.removeChild(Menu.layer);
                                RPG.popState();
                                RPG.popState();
                                RPG.popState();
                                Fight.menu.visible = true;

                            }},
                            {text:'否',action:()=>{
                                Menu.layer.removeAllChild();
                                talkLayer.removeChild(Menu.layer);
                                RPG.popState();
                                RPG.popState();
                                RPG.popState();
                                Fight.menu.visible = true;
                            }},
                        ]};
                        Talk.setTalkPos('middle');
                        Talk.makeChoice(select,Menu.touchLayer);
                        Talk.setTalkPos('bottom');
                        break;
                    case 2:
                        let list = Fight.eTeam.heroList.concat(Fight.pTeam.heroList),optionList=[];
                        for (let i = 0; i < list.length; i++) {
                            let hero = list[i];
                            optionList.push({text:hero.nickName,action:()=>{
                                Menu.layer.removeAllChild();
                                talkLayer.removeChild(Menu.layer);
                                RPG.popState();
                                RPG.popState();
                                RPG.popState();
                                Fight.menu.visible = true;
                            }});
                        }
                        select = {msg:"对谁使用？",option:optionList};
                        Talk.setTalkPos('middle');
                        Talk.makeChoice(select,Menu.touchLayer);
                        Talk.setTalkPos('bottom');
                        break;
                    case 4:
                    case 3:
                        Menu.touchLayer.addChild(UI.diyButton(200, 40,(WIDTH-200)>>1, HEIGHT>>1,'该物品不能使用',function () {

                             Menu.touchLayer.removeAllChild();

                        },20));
                        break;
                }
            }, 1000);
        }

    },

    // 拖动物品栏的物品
    buy:(ax, ay, itemId)=>{
        let item1,text, i;
        // 详细信息
        RPG.descLayer.removeAllChild();
        // 显示单一物品详细信息
        item1 = Menu.currentItemList[Menu.chooseItem];
        text = UI.text('给谁：',gap* 2,5);
        Menu.itemCost = item1.cost;
        RPG.descLayer.addChild(text);
        // 显示姓名
        Menu.nameText = text.clone();
        Menu.nameText.x = text.x+ text.getWidth()+ gap;
        Menu.nameText.text = "";
        RPG.descLayer.addChild(Menu.nameText);
        Menu.chooseHero= -1;
        let cc= (menuWidth- gap* 2)/ mainTeam.heroList.length;
        for (i=0; i< mainTeam.heroList.length; i++){
            let hero = mainTeam.heroList[i];
            let heroImg = hero.img;
            let bitmapData = new LBitmapData(assets[heroImg]);
            let chara = new Fighter(bitmapData,4,4);
            chara.x = cc* i+ cc/ 2- STEP/ 2;
            chara.y = gap* 2+ 5;
            RPG.descLayer.addChild(chara);
        }
        Menu.chooseItem = itemId;
        Menu.dragingItem = text.clone();
        Menu.dragingItem.text = item1.name;
        Menu.dragingItem.x= ax- RPG.descLayer.x;
        Menu.dragingItem.y= ay- RPG.descLayer.y;
        Menu.dragingItem.scaleX= 2;
        Menu.dragingItem.scaleY= 2;
        RPG.descLayer.addChild(Menu.dragingItem);
        Menu.isItemDraging= true;

    },
    // 拖动物品栏的物品
    sell:(ax, ay, itemId)=>{
        let item1,text;
        // 详细信息
        RPG.descLayer.removeAllChild();
        // 显示单一物品详细信息
        item1 = Menu.currentItemList[Menu.chooseItem];
        text = UI.text(item1.name+'呀，好像很破的样子。'+item1.cost+'吧，卖么？',gap,gap);
        Menu.itemCost = item1.cost;
        RPG.descLayer.addChild(text);
        // 显示姓名
        Menu.nameText = text.clone();
        Menu.nameText.x = text.x+ text.getWidth()+ gap;
        Menu.nameText.text = "";
        RPG.descLayer.addChild(Menu.nameText);
        Menu.chooseHero= -1;
        let cc = (menuWidth- gap* 2);

        let bitmapData = new LBitmapData(assets['售卖员']);
        let chara = new Fighter(bitmapData,4,4);
        chara.x = cc/ 2- STEP/ 2;
        chara.y = gap*4;
        RPG.descLayer.addChild(chara);
        Menu.chooseItem = itemId;
        Menu.dragingItem = text.clone();
        Menu.dragingItem.text = item1.name;
        Menu.dragingItem.x= ax- RPG.descLayer.x;
        Menu.dragingItem.y= ay- RPG.descLayer.y;
        Menu.dragingItem.scaleX= 2;
        Menu.dragingItem.scaleY= 2;
        RPG.descLayer.addChild(Menu.dragingItem);
        Menu.isItemDraging= true;
    },

};
