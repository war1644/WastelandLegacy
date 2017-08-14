/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * Talk class 客户端对话类
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/07/21 初版
 */

let Talk = {
    //当前对话OBJ
    msgCurrent:{},
    //当前对话内容
    msgText:'',
    //一句话说完标记
    sentenceFinish:true,
    //普通对话脚本
    talkScript:false,
    //选择对话脚本
    choiceScript:false,
    //对话序号
    talkIndex : 0,
    //对话结尾
    talkEnd : -1,
    // 对话换行位置记录
    talkLinePos : 550,
    // 对话窗口大小
    LEFT:gap,
    WIDTH: WIDTH-gap*2,
    HEIGHT:100,
    TOP:HEIGHT-100-gap,
    callback:null,
    layer:null,

    makeChoice:(optionScript,layer)=>{
        //如果对话内容为空，则开始判断是否可以对话
        if (!Talk.choiceScript){
            Talk.choiceScript = optionScript;
            if(!Talk.choiceScript) return;
        }
        Talk.setTalkPos('middle');
        // 游戏状态切换----选项中
        if(!RPG.checkState(RPG.IN_CHOOSING)) RPG.pushState(RPG.IN_CHOOSING);
        //得到对话内容
        if(!layer){
            layer = talkLayer;
            //将对话层清空
            layer.removeAllChild();
        }
        Talk.layer = layer;
        Talk.WIDTH = Talk.WIDTH-layer.x;

        //分支选项
        let options = optionScript.option;
        let len = options.length,height,width=Talk.WIDTH;
        if(len>2){
            height = 50+25*len;
        }else {
            height = 90;
        }
        //对话背景
        UI.drawBorderWindow(layer, Talk.LEFT, Talk.TOP, width, height);
        //对话头像
        if (optionScript.img) {
            let bitmapData = new LBitmapData(assets[optionScript.img]);
            let bitmap = new LBitmap(bitmapData);
            bitmap.x = optionScript.x || Talk.LEFT;
            bitmap.y = optionScript.y || Talk.TOP-bitmap.height/2;
            bitmap.scaleX = 0.5;
            bitmap.scaleY = 0.5;
            layer.addChild(bitmap);
        }
        //选项标题
        if (optionScript.msg){
            let name = UI.simpleText(optionScript.msg,undefined,undefined,Talk.LEFT+gap,Talk.TOP+gap);
            layer.addChild(name);
            // 选项标题初始行的位置
            Talk.talkLinePos= name.y+ 25;
        } else {
            Talk.talkLinePos= Talk.TOP+ 5;
        }

        for (let i= 0; i< len; i++){
            let button01= UI.diyButton(width-2*gap, 22, Talk.LEFT+gap, Talk.talkLinePos, options[i].text, options[i].action);
            layer.addChild(button01);
            Talk.talkLinePos= Talk.talkLinePos+ 25;
        }
        Talk.setTalkPos('bottom');
    },
    
    /**
     * 对话完成后回调方法
     */
    waitTalk:(callback)=>{
        Talk.callback = callback;
        // if (Talk.talkScript) {
        //     setTimeout(function(){Talk.waitTalk(callback)}, 1000);
        // } else {
        //     if (callback) callback();
        // }
    },

    /**
     * 关闭对话框
     */
    closeTalk:(del=0)=>{
        // console.warn('调用colse');
        //将对话层清空
        Talk.layer.removeAllChild();
        //对话结束
        Talk.talkScript = null;
        Talk.choiceScript = null;
        Talk.talkIndex = 0;
        Talk.talkEnd = -1;
        if(RPG.checkState(RPG.IN_CHOOSING)) RPG.popState();
        RPG.popState();
        if(RPG.checkState(RPG.MAP_WAITING)) RPG.popState();
        if(RPG.checkState(RPG.IN_CHOOSING)) RPG.popState();
        if(del && Talk.callback){
            Talk.callback();
            Talk.callback = null;
        }
        isKeyDown= false;
    },

	/**
	 * 逐字显示完成回调
	 */
    closeSentence:()=>{
        Talk.sentenceFinish = true;
    },

    /**
     * 设置对话框位置
     */
    setTalkPos:(pos)=>{
        if (pos==="middle"){
            Talk.LEFT= gap;
            Talk.WIDTH= WIDTH- Talk.LEFT* 2;
            Talk.HEIGHT= 100;
            Talk.TOP= (HEIGHT- Talk.HEIGHT)/ 2;
        } else if (pos==="bottom"){
            Talk.LEFT= gap;
            Talk.WIDTH= WIDTH - Talk.LEFT* 2;
            Talk.HEIGHT= 100;
            Talk.TOP= HEIGHT - Talk.HEIGHT- Talk.LEFT;
        }
    },

    /**
     * 开始对话
     * @param talkList 攻击方
     * @returns
     */
    startTalk:(talkList=false,layer=false,index=0,end=0)=>{
        Lib.bgm('按钮');
        if(talkList && Talk.talkScript){
            if(RPG.checkState(RPG.IN_CHOOSING)) RPG.popState();
            Talk.closeTalk();
            Talk.talkScript = talkList;
            Talk.talkIndex = index;
            Talk.talkEnd = end ? end : talkList.length;
        }
        //如果对话内容为空，则开始判断是否可以对话
        if (!Talk.talkScript){
            if(!talkList) return;
            Talk.talkScript = talkList;
            Talk.talkIndex = index;
            Talk.talkEnd = end ? end : talkList.length;
        }
        // 游戏状态切换----对话中
        if (!RPG.checkState(RPG.IN_TALKING)){
            // console.log('checkState');
            //进入地图等待状态
            RPG.pushState(RPG.MAP_WAITING);
            RPG.pushState(RPG.IN_TALKING);
        }

        //还在逐字显示时，点击了按键就直接全部显示
        if (!Talk.sentenceFinish) {
            Talk.sentenceFinish = true;
            Talk.msgCurrent.windRunning = false;
            Talk.msgCurrent.text = Talk.msgText;
            return;
        }

        //当对话开始，且按照顺序进行对话
        if(Talk.talkIndex < Talk.talkScript.length && Talk.talkIndex <= Talk.talkEnd){
            //得到对话内容
            let talkObject = Talk.talkScript[Talk.talkIndex];
            if(!layer){
                layer = talkLayer;
                //将对话层清空
                layer.removeAllChild();
            }
            Talk.layer = layer;

            if('option' in talkObject){
                Talk.makeChoice(talkObject,layer);
                return;
            }

            //对话背景
            let talkWinow = UI.drawBorderWindow(talkLayer, Talk.LEFT, Talk.TOP, Talk.WIDTH, Talk.HEIGHT);
            //对话头像
            if (talkObject.img) {
                let imgData = new LBitmapData(assets[talkObject.img]);
                let bitmap = new LBitmap(imgData);
                bitmap.scaleX = 0.5;
                bitmap.scaleY = 0.5;
                bitmap.x = talkObject.x || Talk.LEFT;
                bitmap.y = talkObject.y || Talk.TOP-bitmap.height/2;
                talkLayer.addChild(bitmap);
            }
            //对话人物名称
            if (talkObject.name){
                let name = UI.text(`【${talkObject.name}】`,Talk.LEFT + gap,Talk.TOP + gap);
                talkLayer.addChild(name);
                // 对话初始行的位置
                Talk.talkLinePos= name.y + 20;
            } else {
                Talk.talkLinePos = Talk.TOP + gap;
            }
            //对话内容
            let msg = UI.simpleText(talkObject.msg);
            msg.x = Talk.LEFT + gap;
            msg.y = Talk.talkLinePos;
            msg.width = Talk.WIDTH - gap*2;
            msg.setWordWrap(true, 20);
            talkLayer.addChild(msg);

            msg.speed = 1;
            //对话内容逐字显示
            msg.wind(Talk.closeSentence);
            Talk.sentenceFinish = false;
            Talk.msgCurrent = msg;
            Talk.msgText = talkObject.msg;
            talkLayer.x = 0;
            talkLayer.y = 0;
            Talk.talkIndex++;
            Talk.talkLinePos = Talk.talkLinePos + 20;
            // if (Talk.talkIndex === end){
            //     Talk.talkIndex =  Talk.talkScript.length;
            // }
        }else{
            Talk.closeTalk(1);
        }
    },

    /**
     * 添加对话
     */
    addTalk:()=>{
        // 仅在地图控制状态可以启动新对话
        if (RPG.checkState(RPG.MAP_CONTROL) && player){
            let tx = player.px,ty = player.py,x=player.px,y=player.py;
            switch (player.direction){
                case UP:
                    ty -= 1;
                    y -= 2;
                    break;
                case LEFT:
                    tx -= 1;
                    x -= 2;
                    break;
                case RIGHT:
                    tx += 1;
                    x += 2;
                    break;
                case DOWN:
                    ty += 1;
                    y += 2;
                    break;
            }
            for(let key in charaLayer.childList){
                let npc = charaLayer.childList[key];
                // 不可见的对象，不触发
                if (!npc.visible) continue;
                //判断前面有npc，有则开始对话
                if (npc.px == tx && npc.py == ty){
                    if (npc.rpgEvent) {
                        // 首先转身
                        npc.anime.setAction(3- player.direction);
                        npc.anime.onframe();
                        // 然后执行指令
                        npc.rpgEvent(npc);
                        return;
                    }
                }
                //隔着障碍物有npc，则开始对话
                if ((!player.move && (npc.px == x && npc.py == y))){
                    if (npc.rpgEvent) {
                        // 首先转身
                        npc.anime.setAction(3- player.direction);
                        npc.anime.onframe();
                        // 然后执行指令
                        npc.rpgEvent(npc);
                        return;
                    }
                }
            }
            //如果前方没有npc，则检查跳转的可能
            // if(!Talk.talkScript)  checkTrigger();
        } else{
            // 直接继续对话
            // Talk.startTalk(Talk.talkScript);
        }
    }
};
