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
    talkScript:[],
    //选择对话脚本
    choiceScript:{},
    //对话序号
    talkIndex : 0,
    // 对话换行位置记录
    talkLinePos : 550,

    // 对话窗口大小
    LEFT:10,
    WIDTH: WIDTH-gap*2,
    HEIGHT:100,
    TOP:HEIGHT-100-gap,

    makeChoice:(optionScript)=>{
        //如果对话内容为空，则开始判断是否可以对话
        if (!Talk.choiceScript){
            Talk.choiceScript = optionScript;
            if(Talk.choiceScript === null) return;
        }
        // 状态切换
        RPG.pushState(RPG.IN_CHOOSING);
        //得到对话内容
        //将对话层清空
        talkLayer.removeAllChild();
        //对话背景
        UI.drawBorderWindow(talkLayer, Talk.LEFT, Talk.TOP, Talk.WIDTH, Talk.HEIGHT);
        //对话头像
        if (optionScript.img) {
            let bitmapData = new LBitmapData(imglist[optionScript.img]);
            let bitmap = new LBitmap(bitmapData);
            bitmap.x = optionScript.x || Talk.LEFT;
            bitmap.y = optionScript.y || Talk.TOP-bitmap.height;
            talkLayer.addChild(bitmap);
        }
        //对话人物名称
        if (optionScript.msg){
            let name = UI.text(optionScript.msg,Talk.LEFT+ 5,Talk.TOP+ 5);
            talkLayer.addChild(name);
            // 对话初始行的位置
            Talk.talkLinePos= name.y+ 20;
        } else {
            Talk.talkLinePos= Talk.TOP+ 5;
        }

        //分支选项
        for (let i= 0; i< optionScript.choise.length; i++){
            let button01= RPG.newSimpleButton(Talk.WIDTH- 10, 22, Talk.LEFT+ 5, Talk.talkLinePos, optionScript.choise[i].text, optionScript.choise[i].action);
            talkLayer.addChild(button01);
            Talk.talkLinePos= Talk.talkLinePos+ 25;
        }
        talkLayer.x = 0;
        talkLayer.y = 0;
    },
    
    /**
     * 对话完成后回调方法
     */
    waitTalk:(callback)=>{
        if (Talk.talkScript) {
            setTimeout(function(){Talk.waitTalk(callback)}, 500);
        } else {
            if (callback) callback();
        }
    },

    /**
     * 关闭对话框
     */
    closeTalk:()=>{
        RPG.popState();
        //将对话层清空
        talkLayer.removeAllChild();
        //对话结束
        Talk.talkScript = null;
        Talk.choiceScript = null;
        // RPG.ScriptIndex++;
        isKeyDown= false;
    },

	/**
	 * 对话内容逐字显示
	 */
    closeSentence:()=>{
        Talk.sentenceFinish = true;
    },

    /**
     * 设置对话框位置
     */
    setTalkPos:(pos)=>{
        if (pos==="middle"){
            Talk.LEFT= 10;
            Talk.WIDTH= WIDTH- Talk.LEFT* 2;
            Talk.HEIGHT= 100;
            Talk.TOP= (HEIGHT- Talk.HEIGHT)/ 2;
        } else if (pos==="bottom"){
            Talk.LEFT= 10;
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
    startTalk:(talkList=false)=>{
        let border = 10;
        //如果对话内容为空，则开始判断是否可以对话
        if (!Talk.talkScript){
            Talk.talkScript = talkList;
            Talk.talkIndex = 0;
            if(!talkList) return;
        }
        // 游戏状态切换----对话中
        if (!RPG.checkState(RPG.IN_TALKING))  RPG.pushState(RPG.IN_TALKING);
        
        // 前半句话没说完的情况下，先说完
        if (!Talk.sentenceFinish) {
            Talk.sentenceFinish = true;
            Talk.msgCurrent.windRunning = false;
            Talk.msgCurrent.text = Talk.msgText;
            return;
        }
        //当对话开始，且按照顺序进行对话
        if(Talk.talkIndex < Talk.talkScript.length){
            //得到对话内容
            let talkObject = Talk.talkScript[Talk.talkIndex];

            //将对话层清空
            talkLayer.removeAllChild();
            //对话背景
            UI.drawBorderWindow(talkLayer, Talk.LEFT, Talk.TOP, Talk.WIDTH, Talk.HEIGHT);
            //对话头像
            if (talkObject.img) {
                let imgData = new LBitmapData(imglist[talkObject.img]);
                let bitmap = new LBitmap(imgData);
                bitmap.scaleX = 0.5;
                bitmap.scaleY = 0.5;
                bitmap.x = talkObject.x || Talk.LEFT;
                bitmap.y = talkObject.y || Talk.TOP-bitmap.height/2;
                talkLayer.addChild(bitmap);
            }
            //对话人物名称
            if (talkObject.name){
                let name = UI.text(`【${talkObject.name}】`,Talk.LEFT + border,Talk.TOP + border);
                talkLayer.addChild(name);
                // 对话初始行的位置
                Talk.talkLinePos= name.y + 20;
            } else {
                Talk.talkLinePos = Talk.TOP + border;
            }
            //对话内容
            let msg = UI.text(talkObject.msg,Talk.LEFT + border,Talk.talkLinePos);
            msg.width = Talk.WIDTH - border*2;
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
        }else{
            Talk.closeTalk();
        }
    },

    /**
     * 添加对话
     */
    addTalk:()=>{
        // 仅在地图控制状态可以启动新对话
        if (RPG.checkState(RPG.MAP_CONTROL) && player){
            let tx = player.px,ty = player.py;
            switch (player.direction){
                case UP:
                    ty -= 1;
                    break;
                case LEFT:
                    tx -= 1;
                    break;
                case RIGHT:
                    tx += 1;
                    break;
                case DOWN:
                    ty += 1;
                    break;
            }
            for(let key in charaLayer.childList){
                // 不可见的对象，不触发
                if (!charaLayer.childList[key].visible) continue;
                //判断前面有npc，有则开始对话
                if (charaLayer.childList[key].px === tx && charaLayer.childList[key].py === ty){
                    if (charaLayer.childList[key].rpgEvent) {
                        // 首先转身
                        charaLayer.childList[key].anime.setAction(3- player.direction);
                        charaLayer.childList[key].anime.onframe();
                        // 然后执行指令
                        charaLayer.childList[key].rpgEvent(charaLayer.childList[key]);
                    }
                }
            }
            //如果前方没有npc，则检查跳转的可能
            if(!Talk.talkScript) {
                checkTrigger();
                return;
            }
        } else{
            // 直接继续对话
            Talk.startTalk(Talk.talkScript);
        }
    }
};
