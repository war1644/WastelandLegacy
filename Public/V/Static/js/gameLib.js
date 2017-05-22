/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 游戏客户端基础方法库
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/04/11 初版
 */
//分辨率的兼容适配
(function(win,doc){
    var rem = 20/750*doc.documentElement.clientWidth;
    doc.documentElement.style.fontSize=rem+'px';
    win.addEventListener('resize',function(){
        var rem = 20/750*doc.documentElement.clientWidth;
        doc.documentElement.style.fontSize = rem+'px';
    },false)
})(window,document);

var OS_PC = "pc",
    OS_IPHONE = "iPhone",
    OS_IPAD = "iPad",
    OS_ANDROID = "Android",
    OS_WINDOWS_PHONE = "Windows Phone",
    OS_BLACK_BERRY = "BlackBerry",
    NONE = "none",
    UNDEFINED = "undefined",
    LANDSCAPE = "landscape",
    PORTRAIT = "portrait",
    mouseX,
    mouseY;


var Lib = function () {

};
/**
 * 原型链继承扩展
 */
Lib.prototype = {
    /**
     * 获取整个表单数据并转为JSON对象
     */
    getFormJson : function (form) {
        var obj = {};
        var arr = $(form).serializeArray();
        $.each(arr, function () {
            if (obj[this.name] !== undefined) {
                if (!obj[this.name].push) {
                    obj[this.name] = [obj[this.name]];
                }
                obj[this.name].push(this.value || '');
            } else {
                obj[this.name] = this.value || '';
            }
        });
        return obj;
    }
};
var Global = (()=>{
    function Global () {
        throw "Global cannot be instantiated";
    }
    Global.width = screen.width;
    Global.height = screen.height;
    //
    ((userAgent)=>{
        if (userAgent.indexOf(OS_IPHONE) > 0) {
            Global.os = OS_IPHONE;
            Global.canTouch = true;
            Global.ios = true;
        }else if (userAgent.indexOf(OS_IPAD) > 0) {
            Global.os = OS_IPAD;
            Global.ios = true;
            Global.canTouch = true;
        } else if (userAgent.indexOf(OS_ANDROID) > 0) {
            Global.os = OS_ANDROID;
            Global.canTouch = true;
            Global.android = true;
        } else if (userAgent.indexOf(OS_WINDOWS_PHONE) > 0) {
            Global.os = OS_WINDOWS_PHONE;
            Global.canTouch = true;
        }
        Global.mobile = Global.canTouch;
    })(navigator.userAgent);
    return Global;
})();

//扩展send方法
WebSocket.prototype.wlSend = (type,params)=>{
    params = params || {};
    params.type = type;
    params.name = selfName;
    this.send(JSON.stringify(params));
};
/*
var LGlobal = ( function () {
    function LGlobal () {
        throw "LGlobal cannot be instantiated";
    }
    LGlobal.FULL_SCREEN = "full_screen";
    LGlobal.traceDebug = false;
    LGlobal.displayState = NONE;
    LGlobal.aspectRatio = NONE;
    LGlobal.canvasObj = null;
    LGlobal.canvas = null;
    LGlobal.webAudio = true;
    LGlobal.objectIndex = 1;
    LGlobal.stage = null;
    LGlobal.width = 0;
    LGlobal.height = 0;
    LGlobal.box2d = null;
    LGlobal.speed = 50;
    LGlobal.IS_MOUSE_DOWN = false;
    LGlobal.stopPropagation = false;
    LGlobal.preventDefault = true;
    LGlobal.childList = new Array();
    LGlobal.dragList = new Array();
    LGlobal.excludingContainer = new Array();
    LGlobal.fpsStatus = null;
    LGlobal.stageScale = "noScale";
    LGlobal.align = "M";
    LGlobal.mobile = false;
    LGlobal.canTouch = false;
    LGlobal.os = OS_PC;
    LGlobal.ios = false;
    LGlobal.android = false;
    LGlobal.android_new = false;
    LGlobal.backgroundColor = null;
    LGlobal.destroy = true;
    LGlobal.forceRefresh = false;
    LGlobal.devicePixelRatio = window.devicePixelRatio || 1;
    LGlobal.startTimer = 0;
    LGlobal.keepClear = true;
    LGlobal.top = 0;
    LGlobal.left = 0;
    LGlobal.window = window;
    (function (n) {
        LGlobal.isOldFirefox = (function(un){
            var i = un.toLowerCase().indexOf('firefox');
            if (i < 0) {
                return false;
            }
            var v = un.substring(i + 8, un.length);
            return parseFloat(v) < 39.0;
        })(n);
        if (n.indexOf(OS_IPHONE) > 0) {
            LGlobal.os = OS_IPHONE;
            LGlobal.canTouch = true;
            LGlobal.ios = true;
        } else if (n.indexOf(OS_IPOD) > 0) {
            LGlobal.os = OS_IPOD;
            LGlobal.canTouch = true;
            LGlobal.ios = true;
        } else if (n.indexOf(OS_IPAD) > 0) {
            LGlobal.os = OS_IPAD;
            LGlobal.ios = true;
            LGlobal.canTouch = true;
        } else if (n.indexOf(OS_ANDROID) > 0) {
            LGlobal.os = OS_ANDROID;
            LGlobal.canTouch = true;
            LGlobal.android = true;
            var i = n.indexOf(OS_ANDROID);
            if(parseInt(n.substr(i + 8, 1)) > 3){
                LGlobal.android_new = true;
            }
        } else if (n.indexOf(OS_WINDOWS_PHONE) > 0) {
            LGlobal.os = OS_WINDOWS_PHONE;
            LGlobal.canTouch = true;
        } else if (n.indexOf(OS_BLACK_BERRY) > 0) {
            LGlobal.os = OS_BLACK_BERRY;
            LGlobal.canTouch = true;
        }
        LGlobal.mobile = LGlobal.canTouch;
    })(navigator.userAgent);
    LGlobal.setDebug = function (v) {
        LGlobal.traceDebug = v;
    };
    LGlobal.setCanvas = function (id, w, h) {
        LGlobal.ll_createCanvas(id, w, h);
        LGlobal.ll_createStage();
        if(LGlobal.displayState == LStage.FULL_SCREEN){
            LGlobal.resize();
        }else if(typeof LGlobal.displayState == "number"){
            LGlobal.resize(LGlobal.width * LGlobal.displayState, LGlobal.height * LGlobal.displayState);
        }
        if (LGlobal.canTouch) {
            LGlobal.ll_clicks = 0;
            LGlobal.ll_prev_clickTime = 0;
            LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.TOUCH_START, LGlobal.ll_touchStart);
            LEvent.addEventListener(document, LMouseEvent.TOUCH_END, LGlobal.ll_touchEnd);
            LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.TOUCH_MOVE, LGlobal.ll_touchMove);
        } else {
            LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.DOUBLE_CLICK, LGlobal.ll_mouseDbclick);
            LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_DOWN, LGlobal.ll_mouseDown);
            LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_MOVE, LGlobal.ll_mouseMove);
            LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_UP, LGlobal.ll_mouseUp);
            LEvent.addEventListener(LGlobal.canvasObj,LMouseEvent.MOUSE_OUT, LGlobal.ll_mouseOut);
        }
    };
    LGlobal.ll_createCanvas = function (id, w, h) {
        LGlobal.id = id;
        LGlobal.object = document.getElementById(id);
        LGlobal.object.innerHTML = '<div style="position:absolute;margin:0;padding:0;overflow:visible;-webkit-transform: translateZ(0);z-index:0;">' +
            '<canvas id="' + LGlobal.id + '_canvas" style="margin:0;padding:0;width:' + w + 'px;height:' + h + 'px;">' +
            '<div id="noCanvas">' +
            "<p>Hey there, it looks like you're using Microsoft's Internet Explorer. Microsoft hates the Web and doesn't support HTML5 :(</p>" +
            '</div>' +
            '</canvas></div>' +
            '<div id="' + LGlobal.id + '_InputText" style="position:absolute;margin:0;padding:0;z-index:10;display:none;">' +
            '<textarea rows="1" id="' + LGlobal.id + '_InputTextareaBox" style="resize:none;background:transparent;border:0px;"></textarea>' +
            '<input type="text" id="' + LGlobal.id + '_InputTextBox"  style="background:transparent;border:0px;" />' +
            '<input type="password" id="' + LGlobal.id + '_passwordBox"  style="background:transparent;border:0px;" /></div>';
        LGlobal.canvasObj = document.getElementById(LGlobal.id + "_canvas");
        LGlobal._canvas = document.createElement("canvas");
        LGlobal._context = LGlobal._canvas.getContext("2d");
        if (LGlobal._context) {
            LGlobal.canvasObj.innerHTML="";
        }
        LGlobal.inputBox = document.getElementById(LGlobal.id + '_InputText');
        LGlobal.inputTextareaBoxObj = document.getElementById(LGlobal.id + '_InputTextareaBox');
        LGlobal.inputTextBoxObj = document.getElementById(LGlobal.id + '_InputTextBox');
        LGlobal.passwordBoxObj = document.getElementById(LGlobal.id + '_passwordBox');
        LGlobal.inputTextField = null;
        if (w) {
            LGlobal.canvasObj.width = w;
        }
        if (h) {
            LGlobal.canvasObj.height = h;
        }
        LGlobal.width = LGlobal.canvasObj.width;
        LGlobal.height = LGlobal.canvasObj.height;
        LGlobal.canvasStyleWidth = LGlobal.width;
        LGlobal.canvasStyleHeight = LGlobal.height;
        LGlobal.canvas = LGlobal.canvasObj.getContext("2d");
        LGlobal.offsetX = mouseX = 0;
        LGlobal.offsetY = mouseY = 0;
    };
    LGlobal.ll_createStage = function () {
        LGlobal.stage = new LSprite();
        LGlobal.stage.parent = "root";
        LGlobal.childList.push(LGlobal.stage);
        LGlobal.stage.baseAddEvent = LGlobal.stage.addEventListener;
        LGlobal.stage.baseRemoveEvent = LGlobal.stage.removeEventListener;
        LGlobal.stage.addEventListener = function (type, listener) {
            if (type == LEvent.WINDOW_RESIZE || type == LEvent.WINDOW_ORIENTATIONCHANGE) {
                if(type == LEvent.WINDOW_RESIZE){
                    LGlobal.stage.onresizeListener = listener;
                }else{
                    LGlobal.stage.onorientationchangeListener = listener;
                }
                if(!LGlobal.stage.onresize){
                    LGlobal.stage.onresize = function (e) {
                        LGlobal.stage.onresizeEvent = e;
                    };
                    LEvent.addEventListener(LGlobal.window, type,LGlobal.stage.onresize);
                }
            } else if (type == LKeyboardEvent.KEY_DOWN || type == LKeyboardEvent.KEY_UP || type == LKeyboardEvent.KEY_PRESS) {
                LEvent.addEventListener(LGlobal.window, type, listener);
            } else {
                LGlobal.stage.baseAddEvent(type, listener);
            }
        };
        LGlobal.stage.removeEventListener = function (type, listener) {
            if (type == LEvent.WINDOW_RESIZE || type == LEvent.WINDOW_ORIENTATIONCHANGE) {
                if(type == LEvent.WINDOW_RESIZE){
                    delete LGlobal.stage.onresizeListener;
                    if(LGlobal.stage.onorientationchangeListener){
                        return;
                    }
                }else{
                    delete LGlobal.stage.onorientationchangeListener;
                    if(LGlobal.stage.onresizeListener){
                        return;
                    }
                }
                LEvent.removeEventListener(LGlobal.window, LEvent.WINDOW_RESIZE, LGlobal.stage.onresize);
                delete LGlobal.stage.onresize;
            } else if (type == LKeyboardEvent.KEY_DOWN || type == LKeyboardEvent.KEY_UP || type == LKeyboardEvent.KEY_PRESS) {
                LEvent.removeEventListener(LGlobal.window, type, listener);
            } else {
                LGlobal.stage.baseRemoveEvent(type, listener);
            }
        };
        LGlobal.innerWidth = window.innerWidth;
        LGlobal.innerHeight = window.innerHeight;
        LEvent.addEventListener(LGlobal.window, "blur", function(){
            LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_OUT));
        });
    };
    LGlobal.ll_touchStart = function (event) {
        LGlobal._outStageCheckCount = 1;
        LGlobal.IS_MOUSE_DOWN = true;
        LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_IN));
        if (LGlobal.inputBox.style.display != NONE) {
            LGlobal.inputTextField._ll_getValue();
        }
        var canvasX, canvasY, eve, k, i;
        canvasX = parseInt(0 + LGlobal.object.style.left) + parseInt(LGlobal.canvasObj.style.marginLeft);
        canvasY = parseInt(0 + LGlobal.object.style.top) + parseInt(LGlobal.canvasObj.style.marginTop);
        if (LMultitouch.inputMode == LMultitouchInputMode.NONE) {
            eve = LGlobal.ll_touchStartEvent(event, 0, canvasX, canvasY);
        } else if (LMultitouch.inputMode == LMultitouchInputMode.TOUCH_POINT) {
            for (var i = 0,l = event.touches.length; i < l; i++) {
                if(!LMultitouch.touchs["touch" + event.touches[i].identifier]){
                    eve = LGlobal.ll_touchStartEvent(event, i, canvasX, canvasY);
                }
            }
        }
        var date = new Date();
        var clickTime = date.getTime();
        LGlobal.ll_clicks = (clickTime <= (LGlobal.ll_prev_clickTime + 500)) ? (LGlobal.ll_clicks + 1) : 1;
        LGlobal.ll_prev_clickTime = clickTime;
        if (LGlobal.ll_clicks === 2) {
            LGlobal.mouseEvent(eve, LMouseEvent.DOUBLE_CLICK);
            LGlobal.ll_clicks = 0;
        }
        if (LGlobal.mouseJoint_start) {
            LGlobal.mouseJoint_start(eve);
        }
        LGlobal.touchHandler(event);
    };
    LGlobal.ll_touchStartEvent = function (event,eveIndex,canvasX,canvasY) {
        var eve = {offsetX : (event.touches[eveIndex].pageX - canvasX),
            offsetY : (event.touches[eveIndex].pageY - canvasY),
            touchPointID : event.touches[eveIndex].identifier,
            force : event.touches[eveIndex].force,
            rotationAngle : event.touches[eveIndex].rotationAngle,
            radiusX : event.touches[eveIndex].radiusX,
            radiusY : event.touches[eveIndex].radiusY};
        eve.offsetX = LGlobal.ll_scaleX(eve.offsetX);
        eve.offsetY = LGlobal.ll_scaleY(eve.offsetY);
        mouseX = LGlobal.offsetX = eve.offsetX;
        mouseY = LGlobal.offsetY = eve.offsetY;
        LMultitouch.touchs["touch" + eve.touchPointID] = eve;
        LGlobal.mouseEvent(eve, LMouseEvent.MOUSE_DOWN);
        LGlobal.buttonStatusEvent = eve;
        return eve;
    };
    LGlobal.ll_touchEnd = function (event) {
        var e, eve, k, i, l, h;
        LGlobal.IS_MOUSE_DOWN = false;
        if (LMultitouch.inputMode == LMultitouchInputMode.TOUCH_POINT) {
            for (k in LMultitouch.touchs) {
                e = LMultitouch.touchs[k];
                h = false;
                for (i = 0,l = event.touches.length; i < l; i++) {
                    if (event.touches[i].identifier == e.touchPointID) {
                        h = true;
                        break;
                    }
                }
                if (!h) {
                    eve = e;
                    delete LMultitouch.touchs[k];
                    LGlobal.mouseEvent(eve, LMouseEvent.MOUSE_UP);
                }
            }
        }
        if (!eve) {
            eve = {offsetX : LGlobal.offsetX, offsetY : LGlobal.offsetY};
        }
        LGlobal.mouseEvent(eve, LMouseEvent.MOUSE_UP);
        LGlobal.touchHandler(event);
        LGlobal.buttonStatusEvent = null;
        if (LGlobal.mouseJoint_end) {
            LGlobal.mouseJoint_end();
        }
        LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_OUT));
    };
    LGlobal.ll_touchMove = function (e) {
        var cX, cY, eve, l, ll = e.touches.length;
        cX = parseInt(0 + LGlobal.object.style.left) + parseInt(LGlobal.canvasObj.style.marginLeft);
        cY = parseInt(0 + LGlobal.object.style.top) + parseInt(LGlobal.canvasObj.style.marginTop);
        if (LMultitouch.inputMode == LMultitouchInputMode.NONE) {
            ll = 1;
        }
        for (i = 0, l = e.touches.length; i < l && i < ll; i++) {
            eve = {offsetX : (e.touches[i].pageX - cX), offsetY : (e.touches[i].pageY - cY), touchPointID : e.touches[i].identifier};
            eve.offsetX = LGlobal.ll_scaleX(eve.offsetX);
            eve.offsetY = LGlobal.ll_scaleY(eve.offsetY);
            mouseX = LGlobal.offsetX = eve.offsetX;
            mouseY = LGlobal.offsetY = eve.offsetY;
            if (LMultitouch.touchs["touch" + eve.touchPointID] &&
                LMultitouch.touchs["touch" + eve.touchPointID].offsetX == eve.offsetX &&
                LMultitouch.touchs["touch" + eve.touchPointID].offsetY == eve.offsetY){
                continue;
            }
            LGlobal.buttonStatusEvent = eve;
            LMultitouch.touchs["touch" + eve.touchPointID] = eve;
            if(eve.offsetX <= 0 || eve.offsetX >= LGlobal.innerWidth || eve.offsetX >= LGlobal.width || eve.offsetY <= 0 || eve.offsetY >= LGlobal.innerHeight || eve.offsetY >= LGlobal.height){
                LGlobal._outStageCheckCount = 0;
            }else{
                LGlobal._outStageCheckCount = 1;
            }
            LGlobal.mouseEvent(eve, LMouseEvent.MOUSE_MOVE);
        }
        LGlobal.touchHandler(e);
        if (LGlobal.mouseJoint_move) {
            LGlobal.mouseJoint_move(eve);
        }
    };
    LGlobal.ll_mouseDbclick = function (e) {
        if (e.offsetX == null && e.layerX != null) {
            e.offsetX = e.layerX;
            e.offsetY = e.layerY;
        }
        var event = {button : e.button};
        event.offsetX = LGlobal.ll_scaleX(e.offsetX);
        event.offsetY = LGlobal.ll_scaleY(e.offsetY);
        LGlobal.mouseEvent(event, LMouseEvent.DOUBLE_CLICK);
    };
    LGlobal.ll_mouseDown = function (e) {
        if (e.offsetX == null && e.layerX != null) {
            e.offsetX = e.layerX;
            e.offsetY = e.layerY;
        }
        if (LGlobal.inputBox.style.display != NONE) {
            LGlobal.inputTextField._ll_getValue();
        }
        var event = {button : e.button};
        event.offsetX = LGlobal.ll_scaleX(e.offsetX);
        event.offsetY = LGlobal.ll_scaleY(e.offsetY);
        LGlobal.mouseEvent(event, LMouseEvent.MOUSE_DOWN);
        LGlobal.IS_MOUSE_DOWN = true;
        if (LGlobal.mouseJoint_start) {
            LGlobal.mouseJoint_start(event);
        }
    };
    LGlobal.ll_mouseMove = function (e) {
        if (e.offsetX == null && e.layerX != null) {
            e.offsetX = e.layerX;
            e.offsetY = e.layerY;
        }
        var event = {};
        event.offsetX = LGlobal.ll_scaleX(e.offsetX);
        event.offsetY = LGlobal.ll_scaleY(e.offsetY);
        LGlobal.buttonStatusEvent = event;
        mouseX = LGlobal.offsetX = event.offsetX;
        mouseY = LGlobal.offsetY = event.offsetY;
        LGlobal.cursor = "default";
        if(mouseX <= 0 || mouseX >= LGlobal.innerWidth || mouseX >= LGlobal.width || mouseY <= 0 || mouseY >= LGlobal.innerHeight || mouseY >= LGlobal.height){
            if(LGlobal._outStageCheckCount){
                LGlobal._outStageCheckCount = 0;
                LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_OUT));
            }
        }else{
            if(!LGlobal._outStageCheckCount){
                LGlobal._outStageCheckCount = 1;
                LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_IN));
            }
        }
        LGlobal.mouseEvent(event, LMouseEvent.MOUSE_MOVE);
        document.body.style.cursor = LGlobal.cursor;
        if (LGlobal.mouseJoint_move) {
            LGlobal.mouseJoint_move(event);
        }
    };
    LGlobal.ll_mouseUp = function (e) {
        if (e.offsetX == null && e.layerX != null) {
            e.offsetX = e.layerX;
            e.offsetY = e.layerY;
        }
        var event = {button : e.button};
        event.offsetX = LGlobal.ll_scaleX(e.offsetX);
        event.offsetY = LGlobal.ll_scaleY(e.offsetY);
        LGlobal.mouseEvent(event, LMouseEvent.MOUSE_UP);
        LGlobal.IS_MOUSE_DOWN = false;
        if (LGlobal.mouseJoint_end) {
            LGlobal.mouseJoint_end();
        }
    };
    LGlobal.ll_mouseOut = function (e) {
        if (e.offsetX == null && e.layerX != null) {
            e.offsetX = e.layerX;
            e.offsetY = e.layerY;
        }
        var event = {};
        event.offsetX = LGlobal.ll_scaleX(e.offsetX);
        event.offsetY = LGlobal.ll_scaleY(e.offsetY);
        LGlobal.mouseEvent(event, LMouseEvent.MOUSE_OUT);
        LGlobal.IS_MOUSE_DOWN = false;
    };
    LGlobal.touchHandler = function (e) {
        if (LGlobal.stopPropagation) {
            e.stopPropagation();
            if (e.stopImmediatePropagation) {
                e.stopImmediatePropagation();
            }
        }
        if (LGlobal.preventDefault) {
            e.preventDefault();
        }
        return e;
    };
    LGlobal.mouseEvent = function (e, t) {
        if (t == LMouseEvent.MOUSE_MOVE) {
            LGlobal.dragHandler(e);
        }
        if (LMouseEventContainer.container[t]) {
            LMouseEventContainer.dispatchMouseEvent(e, t);
            return;
        }
        for (var k = LGlobal.childList.length - 1; k >= 0; k--) {
            if (LGlobal.childList[k].mouseEvent && LGlobal.childList[k].mouseEvent(e, t)) {
                break;
            }
        }
    };
    LGlobal.dragHandler = function (e) {
        var i, s, c, d = LGlobal.dragList;
        for(i = d.length - 1; i >= 0; i--) {
            s = d[i];
            if (LGlobal.canTouch && s.ll_touchPointID != e.touchPointID) {
                continue;
            }
            c = s.parent.globalToLocal(new LPoint(e.offsetX - s.ll_dragMX + s.ll_dragGlobalPoint.x, e.offsetY - s.ll_dragMY + s.ll_dragGlobalPoint.y));
            s.x = c.x;
            s.y = c.y;
            if (s.dragRange) {
                if (s.x < s.dragRange.left) {
                    s.x = s.dragRange.left;
                } else if(s.x > s.dragRange.right){
                    s.x = s.dragRange.right;
                }
                if (s.y < s.dragRange.top) {
                    s.y = s.dragRange.top;
                } else if(s.y > s.dragRange.bottom){
                    s.y = s.dragRange.bottom;
                }
            }
            break;
        }
    };
    LGlobal._ll_mobile = function () {
        var w1 = LGlobal.width * 0.3, h1 = w1 * 1.5, s = LGlobal.width * 0.05, ss = w1 * 0.05, sm = w1 * 0.15,
            sx = w1 * 0.3, sh = h1 * 0.20, c = '#cccccc', d = '#000000', f = '#ffffff', h = '#ff0000', b, w1, h1, m, m1, n, v;
        b = new LSprite();
        addChild(b);
        w1 = LGlobal.width * 0.3, h1 = w1 * 1.5;
        b.graphics.drawRoundRect(1, d, [s, s, w1, h1, s],true,c);
        b.graphics.drawRoundRect(1, d, [s + ss, s + ss, w1 - ss * 2, h1 - ss * 2, s], true, d);
        b.graphics.drawRect(1, f, [s + sm, s + sh, w1 - sm * 2, h1 - sh * 2], true, f);
        b.graphics.drawArc(1, f, [s + w1 * 0.5, s + h1 - ss * 3.5, ss * 1.5, 0, 2 * Math.PI]);
        b.graphics.drawRoundRect(1, f, [s + sx, s + sm, w1 - sx * 2, ss, ss * 0.5]);
        m = new LSprite();
        m.x = -(w1 - sm * 2) * 0.5;
        m.y = -ss * 0.5;
        m.graphics.drawRect(1, h, [0, 0, w1 - sm * 2, ss], true, h);
        m1 = new LSprite();
        m1.y = -(w1 - sm * 2) * 0.5;
        m1.x = -ss * 0.5;
        m1.graphics.drawRect(1, h, [0, 0, ss, w1 - sm * 2], true, h);
        n = new LSprite();
        n.x = s + sx + (w1 - sx * 2) * 0.5;
        n.y = s + sh + (h1 - sh * 2) * 0.5;
        n.rotate = 45;
        n.addChild(m);
        n.addChild(m1);
        b.addChild(n);
        v = new LSprite();
        v.graphics.drawVertices(2, d, [[0, 0], [sm, sm ], [0, sm * 2]], true, c);
        v.x = s * 1.5 + h1;
        v.y = s * 1.5 + h1 * 0.5;
        addChild(v);
        b.arrow = v;
        var fn = function () {
            setTimeout(function () {
                location.href = location.href;
            }, 100);
        };
        window.onorientationchange = fn;
        return b;
    };
    LGlobal.verticalError = function () {
        var w1 = LGlobal.width * 0.3, s = LGlobal.width * 0.05;
        var b = LGlobal._ll_mobile();
        var d = b.clone();
        d.getChildAt(0).visible = false;
        d.x = LGlobal.width * 0.5 + s;
        addChild(d);
        b.rotate = 90;
        b.x = LGlobal.width * 0.5 + s;
        b.y = w1 * 0.5;
    };
    LGlobal.horizontalError = function () {
        var w1 = LGlobal.width * 0.3, s = LGlobal.width * 0.05;
        var b = LGlobal._ll_mobile();
        var d = b.clone();
        d.getChildAt(0).visible = false;
        d.rotate = 90;
        d.x = LGlobal.width - s;
        d.y = w1 * 0.5;
        addChild(d);
        b.arrow.x = s * 1.5 + w1;
    };
    LGlobal.onShow = function () {
        if (LGlobal.canvas == null) {
            return;
        }
        if(LGlobal._outStageCheckCount <= 0){
            LGlobal._outStageCheckCount--;
            if(LGlobal._outStageCheckCount < -2){
                LGlobal.stage.dispatchEvent(new LEvent(LFocusEvent.FOCUS_OUT));
                LGlobal._outStageCheckCount = 1;
            }
        }
        if (LGlobal.fpsStatus) {
            LGlobal.fpsStatus.reset();
        }
        if (LGlobal.stage.onresizeEvent) {
            if(LGlobal.stage.onresizeListener){
                LGlobal.stage.onresizeListener(LGlobal.stage.onresizeEvent);
            }
            if(LGlobal.stage.onorientationchangeListener){
                LGlobal.stage.onorientationchangeListener({orientation:(window.innerWidth > window.innerHeight ? LANDSCAPE : PORTRAIT)});
            }
            delete LGlobal.stage.onresizeEvent;
        }
        if (LGlobal.forceRefresh) {
            LGlobal.canvasObj.width = LGlobal.canvasObj.width;
            LGlobal.forceRefresh = false;
        }
        LGlobal.canvas.beginPath();
        if (LGlobal.box2d != null) {
            LGlobal.box2d.ll_show();
            if (!LGlobal.traceDebug && LGlobal.keepClear) {
                LGlobal.canvas.clearRect(0, 0, LGlobal.width + 1, LGlobal.height + 1);
            }
        } else {
            if (LGlobal.keepClear) {
                LGlobal.canvas.clearRect(0, 0, LGlobal.width + 1, LGlobal.height + 1);
            }
            if (LGlobal.backgroundColor !== null) {
                LGlobal.canvas.fillStyle = LGlobal.backgroundColor;
                LGlobal.canvas.fillRect(0, 0, LGlobal.width, LGlobal.height);
            }
        }
        LGlobal.show(LGlobal.childList, LGlobal.canvas);
    };
    LGlobal.show = function (s, ctx) {
        ctx = ctx || LGlobal.canvas;
        for (var i = 0, l = s.length, c; i < l; i++) {
            c = s[i];
            if (c && c.ll_show) {
                c.ll_show(ctx);
                if(c._ll_removeFromSelf){
                    i--;
                    l--;
                }
            }
        }
    };
    LGlobal.divideCoordinate = function (w, h, row, col) {
        var i, j, cw = w / col, ch = h / row, r = [], c;
        for (i = 0; i < row; i++) {
            c = [];
            for (j = 0; j < col; j++) {
                c.push({x : cw * j, y : ch * i, width : cw, height : ch});
            }
            r.push(c);
        }
        return r;
    };
    LGlobal._create_loading_color = function () {
        var co = LGlobal.canvas.createRadialGradient(LGlobal.width / 2, LGlobal.height, 0, LGlobal.width / 2, 0, LGlobal.height);
        co.addColorStop(0, "red");
        co.addColorStop(0.3, "orange");
        co.addColorStop(0.4, "yellow");
        co.addColorStop(0.5, "green");
        co.addColorStop(0.8, "blue");
        co.addColorStop(1, "violet");
        return co;
    };
    LGlobal.hitPolygon = function (list, x, y) {
        var c = 0, p0 = list[0], b0x = (x <= p0[0]), b0y = (y <= p0[1]), i, l, p1, b1x, b1y;
        for (i = 1, l = list.length; i < l + 1; i++) {
            p1 = list[i % l];
            b1x = (x <= p1[0]);
            b1y = (y <= p1[1]);
            if (b0y != b1y) {
                if (b0x == b1x) {
                    if (b0x) {
                        c += (b0y ? -1 : 1);
                    }
                } else {
                    if (x <= (p0[0] + (p1[0] - p0[0]) * (y - p0[1] ) / (p1[1] - p0[1]))) {
                        c += (b0y ? -1 : 1);
                    }
                }
            }
            p0 = p1;
            b0x = b1x;
            b0y = b1y;
        }
        return 0 != c;
    };
    LGlobal.hitTestPolygon = function (p1, p2) {
        var i, j, l, listA, normals, vecs, list = [[p1, [], []], [p2, [], []]];
        for (j = 0; j < list.length; j++) {
            listA = list[j][0], normals = list[j][1];
            for (i = 0, l = listA.length; i < l; i++) {
                list[j][2].push(new LVec2(listA[i][0], listA[i][1]));
                if (i < l - 1) {
                    normals.push((new LVec2(listA[i + 1][0] - listA[i][0], listA[i + 1][1] - listA[i][1])).normL());
                }
            }
            normals.push((new LVec2(listA[0][0] - listA[l - 1][0], listA[0][1] - listA[l - 1][1])).normL());
        }
        for (j = 0; j < list.length; j++) {
            normals = list[j][1];
            for (i = 0, l = normals.length; i < l; i++) {
                var r1 = LVec2.getMinMax(list[0][2], normals[i]);
                var r2 = LVec2.getMinMax(list[1][2], normals[i]);
                if (r1.max_o < r2.min_o || r1.min_o > r2.max_o) {
                    return false;
                }
            }
        }
        return true;
    };
    LGlobal.hitTestPolygonArc = function (vs, arc) {
        if (LGlobal.hitPolygon(vs, arc[0], arc[1])) {
            return true;
        }
        var i, j, l, p1, p2, v1, v2, ext, inn, l2;
        for (i = 0, l = vs.length; i < l; i++) {
            j = i < l - 1 ? i + 1 : 0;
            p1 = vs[i], p2 = vs[j];
            v1 = new LVec2(arc[0] - p1[0], arc[1] - p1[1]), v2 = new LVec2(p2[0] - p1[0], p2[1] - p1[1]);
            l2 = v2.normalize();
            inn = LVec2.dot(v1, l2);
            if (inn <= 0) {
                if (v1.x * v1.x + v1.y * v1.y < arc[3]) {
                    return true;
                }
            } else if (inn * inn < v2.x * v2.x + v2.y * v2.y) {
                ext = LVec2.cross(v1, l2);
                if (ext * ext < arc[3]) {
                    return true;
                }
            }
        }
        return false;
    };
    LGlobal.hitTestArc = function (objA, objB, objAR, objBR) {
        var rA = objA.getWidth() * 0.5
            ,rB = objB.getWidth() * 0.5
            ,xA = objA._startX ? objA._startX() : objA.startX()
            ,xB = objB._startX ? objB._startX() : objB.startX()
            ,yA = objA._startY ? objA._startY() : objA.startY()
            ,yB = objB._startY ? objB._startY() : objB.startY();
        if (typeof objAR != UNDEFINED) {
            xA += (rA - objAR);
            yA += (rA - objAR);
            rA = objAR;
        }
        if (typeof objBR != UNDEFINED) {
            xB += (rB - objBR);
            yB += (rB - objBR);
            rB = objBR;
        }
        var disx = xA + rA - xB - rB
            ,disy = yA + rA - yB - rB;
        return disx * disx + disy * disy < (rA + rB) * (rA + rB);
    };
    LGlobal.hitTestRect = function (objA, objB, vecA, vecB) {
        var wA = objA.getWidth()
            ,wB = objB.getWidth()
            ,hA = objA.getHeight()
            ,hB = objB.getHeight()
            ,xA = objA._startX ? objA._startX() : objA.startX()
            ,xB = objB._startX ? objB._startX() : objB.startX()
            ,yA = objA._startY ? objA._startY() : objA.startY()
            ,yB = objB._startY ? objB._startY() : objB.startY();
        if (typeof vecA != UNDEFINED) {
            xA += (wA - vecA[0]) * 0.5;
            yA += (hA - vecA[1]) * 0.5;
            wA = vecA[0];
            hA = vecA[1];
        }
        if (typeof vecB != UNDEFINED) {
            xB += (wB - vecB[0]) * 0.5;
            yB += (hB - vecB[1]) * 0.5;
            wB = vecB[0];
            hB = vecB[1];
        }
        var minx = xA > xB ? xA : xB
            ,miny = yA > yB ? yA : yB
            ,maxx = (xA + wA) > (xB + wB) ? (xB + wB) : (xA + wA)
            ,maxy = (yA + hA) > (yB + hB) ? (yB + hB) : (yA + hA);
        return minx <= maxx && miny <= maxy;
    };
    LGlobal.hitTest = LGlobal.hitTestRect;
    LGlobal.setFrameRate = function (s) {
        if (LGlobal.frameRate) {
            clearInterval(LGlobal.frameRate);
        }
        LGlobal.speed = s;
        LGlobal.frameRate = setInterval(function () {
            LGlobal.onShow();
        }, s);
    };
    LGlobal.ll_scaleX = function (v) {
        return (v - LGlobal.left) * LGlobal.width/LGlobal.canvasStyleWidth;
    };
    LGlobal.ll_scaleY = function (v) {
        return (v - LGlobal.top) * LGlobal.height / LGlobal.canvasStyleHeight;
    };
    LGlobal.ll_setStageSize = function (w, h) {
        w =  Math.ceil(w);
        h =  Math.ceil(h);
        LGlobal.canvasObj.style.width = w + "px";
        LGlobal.canvasObj.style.height = h + "px";
        LGlobal.canvasStyleWidth = w;
        LGlobal.canvasStyleHeight = h;
    };
    LGlobal.resize = function (canvasW, canvasH) {
        var w, h, t = 0, l = 0, ww = window.innerWidth, wh = window.innerHeight;
        LGlobal.innerWidth = ww;
        LGlobal.innerHeight = wh;
        if (canvasW) {
            w = canvasW;
        }
        if (canvasH) {
            h = canvasH;
        }
        if (LGlobal.stageScale == "noScale") {
            w = canvasW || LGlobal.width;
            h = canvasH || LGlobal.height;
        }
        switch (LGlobal.stageScale) {
            case "exactFit":
                w = canvasW || ww;
                h = canvasH || wh;
                break;
            case "noBorder":
                w = canvasW || ww;
                h = canvasH || LGlobal.height*ww/LGlobal.width;
                switch (LGlobal.align) {
                    case LStageAlign.BOTTOM:
                    case LStageAlign.BOTTOM_LEFT:
                    case LStageAlign.BOTTOM_RIGHT:
                    case LStageAlign.BOTTOM_MIDDLE:
                        t = wh - h;
                        break;
                }
                break;
            case "showAll":
                if (ww / wh > LGlobal.width / LGlobal.height) {
                    h = canvasH || wh;
                    w = canvasW || LGlobal.width * wh / LGlobal.height;
                } else {
                    w = canvasW || ww;
                    h = canvasH || LGlobal.height * ww / LGlobal.width;
                }
            case "noScale":
            default:
                switch (LGlobal.align) {
                    case LStageAlign.BOTTOM:
                    case LStageAlign.BOTTOM_LEFT:
                        t = wh - h;
                        break;
                    case LStageAlign.RIGHT:
                    case LStageAlign.TOP_RIGHT:
                        l = ww - w;
                        break;
                    case LStageAlign.TOP_MIDDLE:
                        l = (ww - w) * 0.5;
                        break;
                    case LStageAlign.BOTTOM_RIGHT:
                        t = wh - h;
                        l = ww - w;
                        break;
                    case LStageAlign.BOTTOM_MIDDLE:
                        t = wh - h;
                        l = (ww - w) * 0.5;
                        break;
                    case LStageAlign.MIDDLE:
                        t = (wh - h) * 0.5;
                        l = (ww - w) * 0.5;
                        break;
                    case LStageAlign.TOP:
                    case LStageAlign.LEFT:
                    case LStageAlign.TOP_LEFT:
                    default:
                }
        }
        LGlobal.canvasObj.style.marginTop = t + "px";
        LGlobal.canvasObj.style.marginLeft = l + "px";
        if (LGlobal.isOldFirefox) {
            LGlobal.left = parseInt(LGlobal.canvasObj.style.marginLeft);
            LGlobal.top = parseInt(LGlobal.canvasObj.style.marginTop);
        }
        LGlobal.ll_setStageSize(w, h);
    };
    LGlobal.sleep = function (s) {
        var d = new Date();
        while ((new Date().getTime() - d.getTime()) < s) {}
    };
    LGlobal.screen = function (a) {
        LGlobal.displayState = a;
        if (LGlobal.stage) {
            if (typeof LGlobal.displayState == "number") {
                LGlobal.resize(LGlobal.width * LGlobal.displayState, LGlobal.height * LGlobal.displayState);
            } else {
                LGlobal.resize();
            }
        }
    };
    return LGlobal;
})();
*/
