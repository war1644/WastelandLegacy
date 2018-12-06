// 战场指挥的各种控制
// 战场指挥主菜单
let FightMenu = {
    layer:null,
    setFormation:(text)=>{
        // 暂时不会
        if (!FightMenu.layer) FightMenu.layer = new LSprite();
        FightMenu.layer.removeAllChild();
        let x0 = gap;
        let y0 = HEIGHT>>1;
        UI.drawBorderWindow(FightMenu.layer, x0, y0, menuWidth, 50);
        let name = UI.simpleText(text,20);
        name.x = (menuWidth-name.getWidth())>>1;
        name.y = y0+gap;
        FightMenu.layer.addChildAt(name, 1);
        talkLayer.addChild(FightMenu.layer);
    },

    closeFormation:()=>{
		talkLayer.removeChild(FightMenu.layer);
		FightMenu.layer.removeAllChild();
	},

    showFightInfo:function() {
        if (!FightMenu.layer) FightMenu.layer = new LSprite();
        FightMenu.layer.removeAllChild();
        let menu = mainTeam.inTank ? Fight.tankMenu : Fight.humanMenu;
        let listView = listViewInit(5,HEIGHT-Fight.infoHeight,50,25,3,menu.length);
        let list = [];
        for(let i=0;i<menu.length;i++){
            let c = new MyListChildView(menu[i]);
            list.push(c);
        }
        listView.updateList(list);
        UI.drawBorderWindow(FightMenu.layer, 0,HEIGHT-Fight.infoHeight, WIDTH, Fight.infoHeight);
        talkLayer.addChild(FightMenu.layer);
        FightMenu.layer.addChild(listView);
    },
};



