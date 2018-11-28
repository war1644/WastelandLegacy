let LEGEND_FILE_PHP = './php/file.php',
    OS_PC = "pc",
    OS_IPHONE = "iPhone",
    OS_IPOD = "iPod",
    OS_IPAD = "iPad",
    OS_ANDROID = "Android",
    STR_ZERO = "0",
    ON = "on",
    E = "e",
    NONE = "none",
    SUPER = "super",
    UNDEFINED = "undefined";
let LTweenLite = null,
    LLoadManage = null;

/*-------------------LEvent begin-----------------------*/
let LEvent = function () {
    this.type = "LEvent";
};
LEvent.INIT = "init";
LEvent.COMPLETE = "complete";
LEvent.ENTER_FRAME = "enter_frame";
LEvent.END_CONTACT = "endContact";
LEvent.PRE_SOLVE = "preSolve";
LEvent.POST_SOLVE = "postSolve";
LEvent.BEGIN_CONTACT = "beginContact";
LEvent.currentTarget = null;

//兼容IE和Webkit的事件函数
LEvent.addEventListener = function (node, type, fun, boo) {
    if (boo == null)  boo = false;
    if (node.addEventListener) {
        node.addEventListener (type, fun, false);
    }else{
        console.log('不支持的类型');
    }
};

let LMouseEvent = function () {
    this.type = "LMouseEvent";
};

LMouseEvent.MOUSE_DOWN = "mousedown";
LMouseEvent.MOUSE_UP = "mouseup";
LMouseEvent.TOUCH_START = "touchstart";
LMouseEvent.TOUCH_MOVE = "touchmove";
LMouseEvent.TOUCH_END = "touchend";
LMouseEvent.MOUSE_MOVE = "mousemove";
LMouseEvent.MOUSE_OUT = "mouseout";
let LKeyboardEvent = function () {
    this.type = "LKeyboardEvent";
};
LKeyboardEvent.KEY_DOWN = "keydown";
LKeyboardEvent.KEY_UP = "keyup";
LKeyboardEvent.KEY_PASS = "keypass";
let LAccelerometerEvent = function () {
    this.type = "LAccelerometerEvent";
};
LAccelerometerEvent.DEVICEMOTION = "devicemotion";
/*---------------------LEvent end-----------------------------*/

/*---------------------LMath start-----------------------------*/
let LMath = {
    trim: function (str) {
        return str.replace (/(^\s*)|(\s*$)|(\n)/g, "");
    },
    leftTrim: function (str) {
        return str.replace (/(^\s*)|(^\n)/g, "");
    },
    rightTrim: function (str) {
        return str.replace (/(\s*$)|(\n$)/g, "");
    },
    //数字格式化，例如:123123 --> 123,123
    numberFormat: function (source, length) {
        if (! length || length < 1) {
            length = 3;
        }
        source = String (source).split (".");
        //使用了零宽断言(?=...)
        source[0] = source[0].replace (new RegExp ('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), "$1,");
        return source.join (".");
    },
    isString: function (s) {
        //作者是写as3.0，所以这块的处理不太好啊....
        //更简单的方式Object.prototype.toString.call(s) == "[object String]"
        //下同
        let patrn = /^([a-z]|[A-Z])+$/;
        return patrn.exec (s);
    },
    isNumber: function (s) {
        let patrn = /^\d+\.\d+$/;
        return patrn.exec (s);
    },
    isInt: function (s) {
        let patrn = /^\d+$/;
        return patrn.exec (s);
    }
};
/*---------------------LMath end-----------------------------*/

/*---------------------LGlobal start-----------------------------*/
//抽象函数，类似于as3.0的interface
let LGlobal = function () {
};
LGlobal.type = "LGlobal";
LGlobal.traceDebug = false;
LGlobal.script = null;
LGlobal.stage = null;
LGlobal.canvas = null;
LGlobal.width = 0;
LGlobal.height = 0;
LGlobal.box2d = null;

//lufylegends采用了setTimeout的方式，
//其实我也比较推荐setTimeout方式，毕竟requestAnimationFrame有一些比较显著的问题（所以jQuery没用
LGlobal.speed = 50;
LGlobal.IS_MOUSE_DOWN = false;
LGlobal.objectIndex = 0;
LGlobal.preventDefault = true;

//因为lufylegends是要去模拟as3.0的显示列表，所以这里设定了childList字段
LGlobal.childList = new Array ();
LGlobal.buttonList = new Array ();
//场景缩放
LGlobal.stageScale = false;
LGlobal.setDebug = function (value) {
    LGlobal.traceDebug = value;
};

LGlobal.setCanvas = function (id, width, height) {
    //判断是否是移动平台，是则启用触摸
    LGlobal.canTouch = false;
    LGlobal.os = OS_PC;
    if (navigator.userAgent.indexOf (OS_IPHONE) > 0) {
        LGlobal.os = OS_IPHONE;
        LGlobal.canTouch = true;
    }
    else if (navigator.userAgent.indexOf (OS_IPOD) > 0) {
        LGlobal.os = OS_IPOD;
        LGlobal.canTouch = true;
    }
    else if (navigator.userAgent.indexOf (OS_IPAD) > 0) {
        LGlobal.os = OS_IPAD;
        LGlobal.canTouch = true;
    }
    else if (navigator.userAgent.indexOf (OS_ANDROID) > 0) {
        LGlobal.os = OS_ANDROID;
        LGlobal.canTouch = true;
    }
    
    //创建并保留canvas的DOM引用
    LGlobal.id = id;
    LGlobal.window = window;
    LGlobal.object = document.getElementById (id);
    LGlobal.object.innerHTML = '<div style="position:absolute;margin:0px 0px 0px 0px;width:' + width + 'px;height:' + height + 'px;z-index:0;"><canvas id="' + LGlobal.id + '_canvas">' + '<div id="noCanvas">' + "<p>Hey there, it looks like you're using Microsoft's Internet Explorer. Microsofthates the Web and doesn't support HTML5 :(</p>" + '<p>' + 'To play this game you need a good Browser, like' + '<a href="http://www.opera.com/">Opera</a>,' + '<a href="http://www.google.com/chrome">Chrome</a>,' + '<a href="http://www.mozilla.com/firefox/">Firefox</a> or' + '<a href="http://www.apple.com/safari/">Safari</a>.' + '</p>' + '</div>' + '</canvas></div>' + '<div id="' + LGlobal.id + '_InputText" style="position:absolute;margin:0px 0px 0px 0px;z-index:10;display:none;"><textarea rows="1" id="' + LGlobal.id + '_InputTextBox" /></div>';
    LGlobal.canvasObj = document.getElementById (LGlobal.id + "_canvas");
    LGlobal.inputBox = document.getElementById (LGlobal.id + '_InputText');
    LGlobal.inputTextBox = document.getElementById (LGlobal.id + '_InputTextBox');
    LGlobal.inputTextField = null;
    if (width) {
        LGlobal.canvasObj.width = width;
    }
    if (height) {
        LGlobal.canvasObj.height = height;
    }
    LGlobal.width = LGlobal.canvasObj.width;
    LGlobal.height = LGlobal.canvasObj.height;
    LGlobal.canvas = LGlobal.canvasObj.getContext ("2d");
    LGlobal.offsetX = 0;
    LGlobal.offsetY = 0;
    
    //根据平台注册不同的事件
    if (LGlobal.canTouch) {
        //下面的代码可重复的地方非常多，所以可以抽象出一个通用的TouchHandler出来
        LEvent.addEventListener (LGlobal.canvasObj, LMouseEvent.TOUCH_START, function (event) {
            if (LGlobal.inputBox.style.display != NONE) {
                LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
                LGlobal.inputBox.style.display = NONE;
            }
            
            //首先获取canvas的位置以及宽高
            let canvasX = parseInt (STR_ZERO + LGlobal.object.style.left);
            let canvasY = parseInt (STR_ZERO + LGlobal.object.style.top);
            let scale = 1;
            let eve;
            if (LGlobal.stageScale) {
                let height;
                let width;
                if (LGlobal.os == OS_ANDROID) {
                    //android为全屏
                    height = window.screen.height;
                    width = window.screen.width;
                }
                else {
                    let de = document.documentElement;
                    let db = document.body;
                    width = de.clientWidth == 0 ? db.clientWidth : de.clientWidth;
                    height = de.clientHeight == 0 ? db.clientHeight : de.clientHeight;
                }
                if (width > height) {
                    scale = 320 / width;
                }
            }
            //计算在canvas上的相对点击位置
            eve = {
                offsetX: event.touches[0].pageX * scale - canvasX,
                offsetY: event.touches[0].pageY * scale - canvasY
            };
            LGlobal.offsetX = eve.offsetX;
            LGlobal.offsetY = eve.offsetY;
            LGlobal.mouseEvent (eve, LMouseEvent.MOUSE_DOWN);
            LGlobal.IS_MOUSE_DOWN = true;
            //box2d的处理，这块没必要去看
            if (LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null) {
                if (! LGlobal.box2d.mouseJoint) {
                    let mouseX = eve.offsetX / LGlobal.box2d.drawScale,
                        mouseY = eve.offsetY / LGlobal.box2d.drawScale;
                    let body = LGlobal.box2d.getBodyAtMouse (mouseX, mouseY);
                    if (body && body.mouseJoint) {
                        let md = new LGlobal.box2d.b2MouseJointDef ();
                        md.bodyA = LGlobal.box2d.world.GetGroundBody ();
                        md.bodyB = body;
                        md.target.Set (mouseX, mouseY);
                        md.collideConnected = true;
                        md.maxForce = 300000.0 * body.GetMass ();
                        LGlobal.box2d.mouseJoint = LGlobal.box2d.world.CreateJoint (md);
                        body.SetAwake (true);
                    }
                }
            }
            LGlobal.touchHandler (event);
        });
        LEvent.addEventListener (document, LMouseEvent.TOUCH_END, function (event) {
            let eve = {
                offsetX: LGlobal.offsetX,
                offsetY: LGlobal.offsetY
            };
            LGlobal.mouseEvent (eve, LMouseEvent.MOUSE_UP);
            LGlobal.touchHandler (event);
            LGlobal.IS_MOUSE_DOWN = false;
            if (LGlobal.box2d != null) {
                if (LGlobal.box2d.mouseJoint) {
                    LGlobal.box2d.world.DestroyJoint (LGlobal.box2d.mouseJoint);
                    LGlobal.box2d.mouseJoint = null;
                }
            }
        });
        LEvent.addEventListener (document, LMouseEvent.TOUCH_MOVE, function (event) {
            let canvasX = parseInt (STR_ZERO + LGlobal.object.style.left);
            let canvasY = parseInt (STR_ZERO + LGlobal.object.style.top);
            let scale = 1;
            let eve;
            if (LGlobal.stageScale) {
                let height;
                let width;
                if (LGlobal.os == OS_ANDROID) {
                    height = window.screen.height;
                    width = window.screen.width;
                }
                else {
                    let de = document.documentElement;
                    let db = document.body;
                    width = de.clientWidth == 0 ? db.clientWidth : de.clientWidth;
                    height = de.clientHeight == 0 ? db.clientHeight : de.clientHeight;
                }
                if (width > height) {
                    scale = 320 / width;
                }
            }
            eve = {
                offsetX: event.touches[0].pageX * scale - canvasX,
                offsetY: event.touches[0].pageY * scale - canvasY
            };
            LGlobal.mouseMoveEvent = eve;
            LGlobal.offsetX = eve.offsetX;
            LGlobal.offsetY = eve.offsetY;
            LGlobal.mouseEvent (eve, LMouseEvent.MOUSE_MOVE);
            LGlobal.touchHandler (event);
            if (LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null) {
                let mouseX = eve.offsetX / LGlobal.box2d.drawScale,
                    mouseY = eve.offsetY / LGlobal.box2d.drawScale;
                if (LGlobal.box2d.mouseJoint) {
                    LGlobal.box2d.mouseJoint.SetTarget (new LGlobal.box2d.b2Vec2 (mouseX, mouseY));
                }
            }
        });
    }
    else {
        //这一块与上面的区别基本不大
        LEvent.addEventListener (LGlobal.canvasObj, LMouseEvent.MOUSE_DOWN, function (event) {
            if (event.offsetX == null && event.layerX != null) {
                event.offsetX = event.layerX;
                event.offsetY = event.layerY;
            }
            if (LGlobal.inputBox.style.display != NONE) {
                LGlobal.inputTextField.text = LGlobal.inputTextBox.value;
                LGlobal.inputBox.style.display = NONE;
            }
            LGlobal.mouseEvent (event, LMouseEvent.MOUSE_DOWN);
            LGlobal.IS_MOUSE_DOWN = true;
            if (LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null) {
                if (! LGlobal.box2d.mouseJoint) {
                    let mouseX = event.offsetX / LGlobal.box2d.drawScale,
                        mouseY = event.offsetY / LGlobal.box2d.drawScale;
                    let body = LGlobal.box2d.getBodyAtMouse (mouseX, mouseY);
                    if (body && body.mouseJoint) {
                        let md = new LGlobal.box2d.b2MouseJointDef ();
                        md.bodyA = LGlobal.box2d.world.GetGroundBody ();
                        md.bodyB = body;
                        md.target.Set (mouseX, mouseY);
                        md.collideConnected = true;
                        md.maxForce = 300000.0 * body.GetMass ();
                        LGlobal.box2d.mouseJoint = LGlobal.box2d.world.CreateJoint (md);
                        body.SetAwake (true);
                    }
                }
            }
        });
        LEvent.addEventListener (LGlobal.canvasObj, LMouseEvent.MOUSE_MOVE, function (event) {
            if (event.offsetX == null && event.layerX != null) {
                event.offsetX = event.layerX;
                event.offsetY = event.layerY;
            }
            LGlobal.mouseMoveEvent = event;
            LGlobal.offsetX = event.offsetX;
            LGlobal.offsetY = event.offsetY;
            LGlobal.mouseEvent (event, LMouseEvent.MOUSE_MOVE);
            if (LGlobal.IS_MOUSE_DOWN && LGlobal.box2d != null) {
                let mouseX = event.offsetX / LGlobal.box2d.drawScale,
                    mouseY = event.offsetY / LGlobal.box2d.drawScale;
                if (LGlobal.box2d.mouseJoint) {
                    LGlobal.box2d.mouseJoint.SetTarget (new LGlobal.box2d.b2Vec2 (mouseX, mouseY));
                }
            }
        });
        LEvent.addEventListener (LGlobal.canvasObj, LMouseEvent.MOUSE_UP, function (event) {
            if (event.offsetX == null && event.layerX != null) {
                event.offsetX = event.layerX;
                event.offsetY = event.layerY;
            }
            LGlobal.mouseEvent (event, LMouseEvent.MOUSE_UP);
            LGlobal.IS_MOUSE_DOWN = false;
            if (LGlobal.box2d != null) {
                if (LGlobal.box2d.mouseJoint) {
                    LGlobal.box2d.world.DestroyJoint (LGlobal.box2d.mouseJoint);
                    LGlobal.box2d.mouseJoint = null;
                }
            }
        });
        LEvent.addEventListener (LGlobal.canvasObj, LMouseEvent.MOUSE_OUT, function (event) {
            if (event.offsetX == null && event.layerX != null) {
                event.offsetX = event.layerX;
                event.offsetY = event.layerY;
            }
            LGlobal.mouseEvent (event, LMouseEvent.MOUSE_OUT);
            LGlobal.IS_MOUSE_DOWN = false;
        });
    }
};

//停止向上层DOM节点进行冒泡
LGlobal.touchHandler = function (event) {
    event.stopPropagation ();
    if (LGlobal.preventDefault) {
        event.preventDefault ();
    }
    if (event.stopImmediatePropagation) {
        event.stopImmediatePropagation ();
    }
    return event;
};

//触发子显示对象的个子的事件
LGlobal.mouseEvent = function (event, type) {
    let key = null;
    for (key in LGlobal.childList) {
        if (LGlobal.childList[key].mouseEvent) {
            LGlobal.childList[key].mouseEvent (event, type);
        }
    }
};

//lufylegends的绘制方法
LGlobal.onShow = function () {
    if (LGlobal.canvas == null) {
        return;
    }
    if (LGlobal.box2d != null) {
        LGlobal.box2d.show ();
        if (! LGlobal.traceDebug) {
            LGlobal.canvas.clearRect (0, 0, LGlobal.width, LGlobal.height);
        }
    }
    else {
        LGlobal.canvas.clearRect (0, 0, LGlobal.width, LGlobal.height);
    }
    LGlobal.buttonShow (LGlobal.buttonList);
    LGlobal.show (LGlobal.childList);
};

LGlobal.buttonShow = function (buttonlist) {
    let key = null;
    for (key in buttonlist) {
        if (buttonlist[key].buttonModeChange) {
            buttonlist[key].buttonModeChange ();
        }
    }
};

LGlobal.show = function (showlist, cood) {
    if (cood == null) {
        cood = {
            x: 0,
            y: 0
        };
    }
    let key = null;
    for (key in showlist) {
        if (showlist[key].show) {
            showlist[key].show (cood);
        }
    }
};

//用于制作sprite animation的分割函数
LGlobal.divideCoordinate = function (w, h, row, col) {
    let i,
        j;
    let cWidth = w / col;
    let cHeight = h / row;
    let resultArray = new Array ();
    for (i = 0; i < row; i ++) {
        let childArray = new Array ();
        for (j = 0; j < col; j ++) {
            childArray.push ({
                x: cWidth * j,
                y: cHeight * i
            });
        }
        resultArray.push (childArray);
    }
    return resultArray;
};

/*---------------------LGlobal end-----------------------------*/

function legendLoadOver () {
}

//as3.0的打印函数...蛮奇葩的，这个都要封装...
function trace () {
    if (! LGlobal.traceDebug) {
        return;
    }
    let traceObject = document.getElementById ("traceObject");
    if (trace.arguments.length > 0 && traceObject == null) {
        traceObject = document.createElement ("div");
        traceObject.id = "traceObject";
        traceObject.style.position = "absolute";
        traceObject.style.top = LGlobal.height + 20 + "px";
        document.body.appendChild (traceObject);
    }
    for (let i = 0; i < trace.arguments.length; i ++) {
        traceObject.innerHTML = traceObject.innerHTML + trace.arguments[i] + "<br />";
    }
}

//添加子显示对象
function addChild (DisplayObject) {
    DisplayObject.parent = "root";
    LGlobal.childList.push (DisplayObject);
}

//删除子显示对象
function removeChild (DisplayObject) {
    for (let i = 0; i < LGlobal.childList.length; i ++) {
        if (DisplayObject.objectindex == LGlobal.childList[i].objectindex) {
            if (DisplayObject.die) {
                //这里应该是个递归调用删除子显示对象
                DisplayObject.die ();
            }
            LGlobal.childList.splice (i, 1);
            break;
        }
    }
}

//程序入口，初始化方法
function init (speed, canvasName, width, height, func, type) {
    LGlobal.speed = speed;
    // if (type != null && type == LEvent.INIT) {
    //     setInterval (function () {
    //         LGlobal.onShow ();
    //     }, speed);
    //     LGlobal.setCanvas (canvasName, width, height);
    //     func();
    // } else {
        LGlobal.setCanvas (canvasName, width, height);
        func();
        //设置主循环
        window._requestAF = (function() {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, ~~(1000/60));
                };
        })();
        LGlobal.speed = speed;
        let lastTime,then=0;
        let gameLoop = function() {
            let now = Date.now();
            lastTime = now - then;
            if (lastTime>speed){
                LGlobal.onShow();
                then = now - (lastTime%speed);
            }
            window._requestAF(gameLoop);
        };

        if (document.readyState === "complete") {
            gameLoop();
        }else{
            LEvent.addEventListener(window, "load", function () {
                gameLoop();
            });
        }
        // LEvent.addEventListener (window, "load", function () {
        //     setInterval (function () {
        //         LGlobal.onShow ();
        //     }, speed);
        //     LGlobal.setCanvas (canvasname, width, height);
        //     func ();
        // });
    // }
}

//原型继承方法
function base (derive, baseSprite, baseArgs) {
    baseSprite.apply (derive, baseArgs);
    for (prop in baseSprite.prototype) {
        let proto = derive.constructor.prototype;
        if (! proto[prop]) {
            proto[prop] = baseSprite.prototype[prop];
        }
        proto[prop][SUPER] = baseSprite.prototype;
    }
}

/*---------------------LLoader start------------------------------*/
//LLoader构造函数
function LLoader () {
    let self = this;
    self.objectindex = ++ LGlobal.objectIndex;
    self.type = "LLoader";
    self.loadtype = "";
    self.content = null;
    self.oncomplete = null;
    self.event = {};
}

LLoader.prototype = {
    addEventListener: function (type, listener) {
        let self = this;
        if (type == LEvent.COMPLETE) {
            self.oncomplete = listener;
        }
    },
    load: function (src, loadtype) {
        let self = this;
        self.loadtype = loadtype;
        if (self.loadtype == "bitmapData") {
            self.content = new Image ();
            self.content.onload = function () {
                if (self.oncomplete) {
                    self.event.currentTarget = self.content;
                    self.oncomplete (self.event);
                }
            };
            self.content.src = src;
        }
    }
};
/*---------------------LLoader end-------------------------------*/

/*---------------------LURLLoader start------------------------------*/
function LURLLoader () {
    let self = this;
    self.objectindex = ++ LGlobal.objectIndex;
    self.type = "LURLLoader";
    self.loadtype = "";
    self.content = null;
    self.oncomplete = null;
    self.event = {};
}
LURLLoader.prototype = {
    addEventListener: function (type, listener) {
        let self = this;
        if (type == LEvent.COMPLETE) {
            self.oncomplete = listener;
        }
    },
    load: function (path, loadtype) {
        let self = this;
        self.loadtype = loadtype;
        if (self.loadtype == "text") {
            $.post (LEGEND_FILE_PHP, {
                flg: "read",
                file: path
            }, function (data) {
                if (self.oncomplete) {
                    self.event.currentTarget = data;
                    self.event.target = self;
                    self.data = data;
                    self.oncomplete (self.event);
                }
            });
        }
    },
    die: function () {
    }
};
/*---------------------LURLLoader end------------------------------*/

/*---------------------LGraphics start------------------------------*/
function LGraphics () {
    let self = this;
    self.objectindex = ++ LGlobal.objectIndex;
    self.type = "LGraphics";
    self.color = "#000000";
    self.i = 0;
    self.alpha = 1;
    self.setList = new Array ();
    self.showList = new Array ();
}

LGraphics.prototype = {
    show: function (cood) {
        //初始化坐标
        if (cood == null || cood == UNDEFINED) {
            cood = {
                x: 0,
                y: 0
            };
        }
        let self = this;
        if (self.setList.length == 0) {
            return;
        }
        let key = null;
        //循环设置，例如设置lineWidth，strokeStyle等
        //其实这里应该是参考了Flex的render优化
        //同一个render周期里面，不应该进行多次渲染
        for (key in self.setList) {
            self.setList[key] (cood.x, cood.y);
        }
    },
    //下面的一对函数都是基本函数的封装，为了迎合show方法
    lineWidth: function (thickness) {
        let self = this;
        self.setList.push (function () {
            LGlobal.canvas.lineWidth = thickness;
        });
    },
    strokeStyle: function (color) {
        let self = this;
        self.setList.push (function () {
            LGlobal.canvas.strokeStyle = color;
        });
    },
    stroke: function () {
        let self = this;
        self.setList.push (function () {
            LGlobal.canvas.stroke ();
        });
    },
    beginPath: function () {
        let self = this;
        self.setList.push (function () {
            LGlobal.canvas.beginPath ();
        });
    },
    closePath: function () {
        let self = this;
        self.setList.push (function () {
            LGlobal.canvas.closePath ();
        });
    },
    moveTo: function (x, y) {
        let self = this;
        self.setList.push (function () {
            LGlobal.canvas.moveTo (x, y);
        });
    },
    lineTo: function (x, y) {
        let self = this;
        self.setList.push (function () {
            LGlobal.canvas.lineTo (x, y);
        });
    },
    //没有使用canvas的clearRect，而是直接清除子显示对象
    //反正下一个render周期就已经不渲染了嘛
    clear: function () {
        let self = this;
        self.setList.splice (0, self.setList.length);
        self.showList.splice (0, self.showList.length);
    },
    rect: function (x, y, width, height) {
        let self = this;
        self.setList.push (function () {
            LGlobal.canvas.rect (x, y, width, height);
        });
        self.showList.push ({
            type: "rect",
            value: [x, y, width, height]
        });
    },
    fillStyle: function (color) {
        let self = this;
        self.setList.push (function () {
            LGlobal.canvas.fillStyle = color;
        });
    },
    fill: function (color) {
        let self = this;
        self.setList.push (function () {
            LGlobal.canvas.fill ();
        });
    },
    arc: function (x, y, radius, startAngle, endAngle, anticlockwise) {
        let self = this;
        self.setList.push (function () {
            LGlobal.canvas.arc (x, y, radius, startAngle, endAngle, anticlockwise);
        });
    },
    drawArc: function (thickness, lineColor, pointArray, isfill, color) {
        let self = this;
        self.setList.push (function (cx, cy) {
            LGlobal.canvas.beginPath ();
            LGlobal.canvas.arc (pointArray[0] + cx, pointArray[1] + cy, pointArray[2], pointArray[3], pointArray[4], pointArray[5]);
            if (isfill) {
                LGlobal.canvas.fillStyle = color;
                LGlobal.canvas.fill ();
            }
            LGlobal.canvas.lineWidth = thickness;
            LGlobal.canvas.strokeStyle = lineColor;
            LGlobal.canvas.stroke ();
        });
        self.showList.push ({
            type: "arc",
            value: pointArray
        });
    },
    drawRect: function (thickness, lineColor, pointArray, isfill, color) {
        let self = this;
        self.setList.push (function (cx, cy) {
            LGlobal.canvas.beginPath ();
            LGlobal.canvas.rect (pointArray[0] + cx, pointArray[1] + cy, pointArray[2], pointArray[3]);
            if (isfill) {
                LGlobal.canvas.fillStyle = color;
                LGlobal.canvas.fill ();
            }
            LGlobal.canvas.lineWidth = thickness;
            LGlobal.canvas.strokeStyle = lineColor;
            LGlobal.canvas.stroke ();
        });
        self.showList.push ({
            type: "rect",
            value: pointArray
        });
    },
    drawVertices: function (thickness, lineColor, vertices, isfill, color) {
        let self = this;
        if (vertices.length < 3) {
            return;
        }
        self.setList.push (function (cx, cy) {
            LGlobal.canvas.beginPath ();
            LGlobal.canvas.moveTo (vertices[0][0] + cx, vertices[0][1] + cy);
            let i,
                length = vertices.length;
            for (i = 1; i < length; i ++) {
                pointArray = vertices[i];
                LGlobal.canvas.lineTo (pointArray[0] + cx, pointArray[1] + cy);
            }
            LGlobal.canvas.lineTo (vertices[0][0] + cx, vertices[0][1] + cy);
            if (isfill) {
                LGlobal.canvas.fillStyle = color;
                LGlobal.canvas.fill ();
            }
            LGlobal.canvas.lineWidth = thickness;
            LGlobal.canvas.strokeStyle = lineColor;
            LGlobal.canvas.closePath ();
            LGlobal.canvas.stroke ();
        });
        self.showList.push ({
            type: "vertices",
            value: vertices
        });
    },
    drawLine: function (thickness, lineColor, pointArray) {
        let self = this;
        self.setList.push (function (cx, cy) {
            LGlobal.canvas.beginPath ();
            LGlobal.canvas.moveTo (pointArray[0] + cx, pointArray[1] + cy);
            LGlobal.canvas.lineTo (pointArray[2] + cx, pointArray[3] + cy);
            LGlobal.canvas.lineWidth = thickness;
            LGlobal.canvas.strokeStyle = lineColor;
            LGlobal.canvas.closePath ();
            LGlobal.canvas.stroke ();
        });
    },
    lineStyle: function (thickness, color, alpha) {
        let self = this;
        if (color == null) {
            color = self.color;
        }
        if (alpha == null) {
            alpha = self.alpha;
        }
        self.color = color;
        self.alpha = alpha;
        self.setList.push (function () {
            LGlobal.canvas.lineWidth = thickness;
            LGlobal.canvas.strokeStyle = color;
        });
    },
    add: function (fun) {
        let self = this;
        self.setList.push (fun);
    },
    //唯一有点看头的时ismouseon方法，
    //ismouseon方法主要是判断是否被点击触发了
    //判断方法也不是太复杂，也就不用细说了
    ismouseon: function (event, cood) {
        let self = this;
        let key = null;
        if (event == null || event == UNDEFINED) {
            return false;
        }
        if (cood == null || cood == UNDEFINED) {
            cood = {
                x: 0,
                y: 0
            };
        }
        let ox,
            oy;
        if (event.offsetX == UNDEFINED) {
            ox = event.touches[0].pageX;
            oy = event.touches[0].pageY;
        }
        else {
            ox = event.offsetX;
            oy = event.offsetY;
        }
        for (key in self.showList) {
            if (self.showList[key].type == "rect") {
                if (ox >= self.showList[key].value[0] + cood.x && ox <= self.showList[key].value[0] + cood.x + self.showList[key].value[2] && oy >= self.showList[key].value[1] + cood.y && oy <= self.showList[key].value[1] + cood.y + self.showList[key].value[3]) {
                    return true;
                }
            }
            else if (self.showList[key].type == "arc") {
                let xl = self.showList[key].value[0] + cood.x - ox;
                let yl = self.showList[key].value[1] + cood.y - oy;
                return xl * xl + yl * yl <= self.showList[key].value[2] * self.showList[key].value[2];
            }
        }
        return false;
    }
};
/*---------------------LGraphics end------------------------------*/

/*---------------------LBox2d start------------------------------*/
//没啥看的，这个基于box2d，下面做的只是封了一层API外界调用而已
function LBox2d () {
    let self = this;
    self.IBroadPhase = Box2D.Collision.IBroadPhase, self.b2AABB = Box2D.Collision.b2AABB, self.b2ContactID = Box2D.Collision.b2ContactID, self.b2ContactPoint = Box2D.Collision.b2ContactPoint, self.b2DistanceInput = Box2D.Collision.b2DistanceInput, self.b2DistanceOutput = Box2D.Collision.b2DistanceOutput, self.b2DistanceProxy = Box2D.Collision.b2DistanceProxy, self.b2DynamicTree = Box2D.Collision.b2DynamicTree, self.b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase, self.b2Manifold = Box2D.Collision.b2Manifold, self.b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint, self.b2OBB = Box2D.Collision.b2OBB, self.b2RayCastInput = Box2D.Collision.b2RayCastInput, self.b2RayCastOutput = Box2D.Collision.b2RayCastOutput, self.b2Segment = Box2D.Collision.b2Segment, self.b2SimplexCache = Box2D.Collision.b2SimplexCache, self.b2TOIInput = Box2D.Collision.b2TOIInput, self.b2WorldManifold = Box2D.Collision.b2WorldManifold, self.Features = Box2D.Collision.Features, self.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape, self.b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef, self.b2MassData = Box2D.Collision.Shapes.b2MassData, self.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape, self.b2Shape = Box2D.Collision.Shapes.b2Shape, self.b2Color = Box2D.Common.b2Color, self.b2Settings = Box2D.Common.b2Settings, self.b2Mat22 = Box2D.Common.Math.b2Mat22, self.b2Mat33 = Box2D.Common.Math.b2Mat33, self.b2Sweep = Box2D.Common.Math.b2Sweep, self.b2Transform = Box2D.Common.Math.b2Transform, self.b2Vec2 = Box2D.Common.Math.b2Vec2, self.b2Vec3 = Box2D.Common.Math.b2Vec3, self.b2Body = Box2D.Dynamics.b2Body, self.b2BodyDef = Box2D.Dynamics.b2BodyDef, self.b2ContactFilter = Box2D.Dynamics.b2ContactFilter, self.b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse, self.b2ContactListener = Box2D.Dynamics.b2ContactListener, self.b2DebugDraw = Box2D.Dynamics.b2DebugDraw, self.b2DestructionListener = Box2D.Dynamics.b2DestructionListener, self.b2FilterData = Box2D.Dynamics.b2FilterData, self.b2Fixture = Box2D.Dynamics.b2Fixture, self.b2FixtureDef = Box2D.Dynamics.b2FixtureDef, self.b2World = Box2D.Dynamics.b2World, self.b2Contact = Box2D.Dynamics.Contacts.b2Contact, self.b2ContactEdge = Box2D.Dynamics.Contacts.b2ContactEdge, self.b2ContactResult = Box2D.Dynamics.Contacts.b2ContactResult, self.b2BuoyancyController = Box2D.Dynamics.Controllers.b2BuoyancyController, self.b2ConstantAccelController = Box2D.Dynamics.Controllers.b2ConstantAccelController, self.b2ConstantForceController = Box2D.Dynamics.Controllers.b2ConstantForceController, self.b2Controller = Box2D.Dynamics.Controllers.b2Controller, self.b2ControllerEdge = Box2D.Dynamics.Controllers.b2ControllerEdge, self.b2GravityController = Box2D.Dynamics.Controllers.b2GravityController, self.b2TensorDampingController = Box2D.Dynamics.Controllers.b2TensorDampingController, self.b2DistanceJoint = Box2D.Dynamics.Joints.b2DistanceJoint, self.b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef, self.b2FrictionJoint = Box2D.Dynamics.Joints.b2FrictionJoint, self.b2FrictionJointDef = Box2D.Dynamics.Joints.b2FrictionJointDef, self.b2GearJoint = Box2D.Dynamics.Joints.b2GearJoint, self.b2GearJointDef = Box2D.Dynamics.Joints.b2GearJointDef, self.b2Joint = Box2D.Dynamics.Joints.b2Joint, self.b2JointDef = Box2D.Dynamics.Joints.b2JointDef, self.b2JointEdge = Box2D.Dynamics.Joints.b2JointEdge, self.b2LineJoint = Box2D.Dynamics.Joints.b2LineJoint, self.b2LineJointDef = Box2D.Dynamics.Joints.b2LineJointDef, self.b2MouseJoint = Box2D.Dynamics.Joints.b2MouseJoint, self.b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef, self.b2PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJoint, self.b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef, self.b2PulleyJoint = Box2D.Dynamics.Joints.b2PulleyJoint, self.b2PulleyJointDef = Box2D.Dynamics.Joints.b2PulleyJointDef, self.b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint, self.b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef, self.b2WeldJoint = Box2D.Dynamics.Joints.b2WeldJoint, self.b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef;
    self.drawScale = 30;
    self.selectedBody = null;
    self.mouseJoint = null;
    self.mousePVec = null;
    self.contactListener = null;
    self.world = new self.b2World (new self.b2Vec2 (0, 9.8), true);
    if (LGlobal.traceDebug) {
        let debug = new self.b2DebugDraw ();
        debug.SetSprite (LGlobal.canvas);
        debug.SetLineThickness (1);
        debug.SetFillAlpha (0.5);
        debug.SetAlpha (1);
        debug.SetDrawScale (self.drawScale);
        debug.SetFlags (self.b2DebugDraw.e_shapeBit | self.b2DebugDraw.e_jointBit);
        self.world.SetDebugDraw (debug);
    }
}
LBox2d.prototype = {
    setEvent: function (type_value, fun_value) {
        let self = this;
        if (! self.contactListener) {
            self.contactListener = new self.b2ContactListener ();
            self.world.SetContactListener (self.contactListener);
        }
        switch (type_value) {
            case LEvent.END_CONTACT:
                self.contactListener.EndContact = fun_value;
                break;
            case LEvent.PRE_SOLVE:
                self.contactListener.PreSolve = fun_value;
                break;
            case LEvent.POST_SOLVE:
                self.contactListener.PostSolve = fun_value;
                break;
            case LEvent.BEGIN_CONTACT:
            default:
                self.contactListener.BeginContact = fun_value;
        }
    },
    addCircle: function (radius, cx, cy, type, density, friction, restitution) {
        let self = this;
        self.bodyDef = new self.b2BodyDef ();
        self.bodyDef.type = type;
        self.fixDef = new self.b2FixtureDef ();
        if (type == self.b2Body.b2_dynamicBody) {
            self.fixDef.density = density;
            self.fixDef.friction = friction;
            self.fixDef.restitution = restitution;
        }
        self.fixDef.shape = new self.b2CircleShape (radius);
        self.bodyDef.position.x = cx;
        self.bodyDef.position.y = cy;
        let shape = self.world.CreateBody (self.bodyDef);
        shape.CreateFixture (self.fixDef);
        return shape;
    },
    addPolygon: function (w, h, cx, cy, type, density, friction, restitution) {
        let self = this;
        self.bodyDef = new self.b2BodyDef ();
        self.bodyDef.type = type;
        self.fixDef = new self.b2FixtureDef ();
        if (type == self.b2Body.b2_dynamicBody) {
            self.fixDef.density = density;
            self.fixDef.friction = friction;
            self.fixDef.restitution = restitution;
        }
        self.fixDef.shape = new self.b2PolygonShape ();
        self.fixDef.shape.SetAsBox (w, h);
        self.bodyDef.position.x = cx;
        self.bodyDef.position.y = cy;
        let shape = self.world.CreateBody (self.bodyDef);
        shape.CreateFixture (self.fixDef);
        return shape;
    },
    addVertices: function (vertices, cx, cy, type, density, friction, restitution) {
        let self = this;
        self.bodyDef = new self.b2BodyDef ();
        self.bodyDef.type = type;
        let shape = self.world.CreateBody (self.bodyDef);
        for (let i = 0; i < vertices.length; i ++) {
            self.createShapeAsArray (shape, vertices[i], type, density, friction, restitution);
        }
        return shape;
    },
    createShapeAsArray: function (container, vertices, type, density, friction, restitution) {
        let self = this;
        let shape = new self.b2PolygonShape ();
        let shapeVertices = self.createVerticesArray (vertices);
        shape.SetAsArray (shapeVertices, 0);
        let shapeFixtureDef = new self.b2FixtureDef ();
        shapeFixtureDef.shape = shape;
        if (type == self.b2Body.b2_dynamicBody) {
            shapeFixtureDef.density = density;
            shapeFixtureDef.friction = friction;
            shapeFixtureDef.restitution = restitution;
        }
        container.CreateFixture (shapeFixtureDef);
    },
    createVerticesArray: function (arr) {
        let self = this;
        let vertices = new Array ();
        if (arr.length < 3) {
            return vertices;
        }
        for (let i = 0; i < arr.length; i ++) {
            let vertice = new self.b2Vec2 (arr[i][0] / self.drawScale, arr[i][1] / self.drawScale);
            vertices.push (vertice);
        }
        return vertices;
    },
    getBodyAtMouse: function (mouseX, mouseY) {
        let self = this;
        self.mousePVec = new self.b2Vec2 (mouseX, mouseY);
        let aabb = new self.b2AABB ();
        aabb.lowerBound.Set (mouseX - 0.001, mouseY - 0.001);
        aabb.upperBound.Set (mouseX + 0.001, mouseY + 0.001);
        self.selectedBody = null;
        self.world.QueryAABB (self.getBodyCallBack, aabb);
        return self.selectedBody;
    },
    getBodyCallBack: function (fixture) {
        let self = LGlobal.box2d;
        if (fixture.GetBody ().GetType () != self.b2Body.b2_staticBody) {
            if (fixture.GetShape ().TestPoint (fixture.GetBody ().GetTransform (), self.mousePVec)) {
                self.selectedBody = fixture.GetBody ();
                return false;
            }
        }
        return true;
    },
    show: function () {
        let self = this;
        self.world.Step (1 / 30, 10, 10);
        self.world.ClearForces ();
        if (LGlobal.traceDebug) {
            self.world.DrawDebugData ();
        }
    }
};
/*---------------------LBox2d end------------------------------*/

/*---------------------LSprite start（精髓）------------------------------*/
function LSprite () {
    let self = this;
    self.objectindex = ++ LGlobal.objectIndex;
    self.type = "LSprite";
    self.x = 0;
    self.y = 0;
    self.rotatex;
    self.rotatey;
    self.rotate = 0;
    self.alpha = 1;
    self.visible = true;
    self.childList = new Array ();
    self.frameList = new Array ();
    self.mouseList = new Array ();
    //as3.0里面，sprite是可以包含graphics的
    //当然，graphics也是可以是单独的new Graphics()
    self.graphics = new LGraphics ();
    self.graphics.parent = self;
    self.width = 0;
    self.height = 0;
    self.scaleX = 1;
    self.scaleY = 1;
    self.box2d = null;
    self.mask = null;
}
LSprite.prototype = {
    setRotate: function (angle) {
        let self = this;
        if (self.box2dBody) {
            self.box2dBody.SetAngle (angle);
        }
        else {
            self.rotate = angle;
        }
    },
    show: function (cood) {
        //默认坐标
        if (cood == null) {
            cood = {
                x: 0,
                y: 0
            };
        }
        let self = this,
            saveflg = false,
            rotateFlag = Math.PI / 180;
        
        //不可显示的显示对象不需要进行渲染操作
        //为了保证渲染性能
        if (! self.visible) {
            return;
        }
        
        //只要进行了变化操作，那么就保存当前的渲染上下文
        if (self.mask != null && self.mask.show || self.alpha < 1 || self.rotate != 0 || self.scaleX != 1 || self.scaleY != 1 || self.box2dBody) {
            LGlobal.canvas.save ();
            saveflg = true;
        }
        
        //下面就是各种渲染操作了
        //为什么先执行自身的渲染操作呢？
        //其实是为了减少渲染的复杂性
        //从后面得到代码可以看到，其实后面还有graphics和childList的渲染操作
        if (self.box2dBody) {
            self.x = self.box2dBody.GetPosition ().x * LGlobal.box2d.drawScale - cood.x - self.rotatex;
            self.y = self.box2dBody.GetPosition ().y * LGlobal.box2d.drawScale - cood.y - self.rotatey;
            self.rotate = self.box2dBody.GetAngle ();
            rotateFlag = 1;
        }
        if (self.mask != null && self.mask.show) {
            self.mask.show ();
            LGlobal.canvas.clip ();
        }
        if (self.alpha < 1) {
            LGlobal.canvas.globalAlpha = self.alpha;
        }
        if (self.rotate != 0) {
            if (typeof self.rotatex == "undefined") {
                self.getRotateXY ();
            }
            LGlobal.canvas.translate (cood.x + self.x + self.rotatex, cood.y + self.y + self.rotatey);
            LGlobal.canvas.rotate (self.rotate * rotateFlag);
            LGlobal.canvas.translate (- (cood.x + self.x + self.rotatex), - (cood.y + self.y + self.rotatey));
        }
        if (self.scaleX != 1 || self.scaleY != 1) {
            LGlobal.canvas.scale (self.scaleX, self.scaleY);
        }
        
        //graphics进行渲染
        self.graphics.show ({
            x: self.x + cood.x,
            y: self.y + cood.y
        });
        
        //内部的子显示对象进行渲染
        LGlobal.show (self.childList, {
            x: self.x + cood.x,
            y: self.y + cood.y,
            scaleX: self.scaleX
        });
        
        //如果有操作，并且操作完毕了，那么就回到上一层渲染上下文
        if (saveflg) {
            LGlobal.canvas.restore ();
        }
        self.loopframe ();
    },
    //获取旋转中心
    getRotateXY: function (w, h) {
        let self = this;
        //默认是sprite的中点
        if (w != null && h != null) {
            self.rotatex = w / 2;
            self.rotatey = h / 2;
            return;
        }
        w = 0;
        h = 0;
        let key = null,
            w1,
            h1;
            
        //获取子显示对象的maxWidth和maxHeight，取中心
        for (key in self.childList) {
            if (self.childList[key].getWidth) {
                w1 = self.childList[key].getWidth ();
                w = w < w1 ? w1 : w;
            }
            if (self.childList[key].getHeight) {
                h1 = self.childList[key].getHeight ();
                h = h < h1 ? h1 : h;
            }
        }
        self.rotatex = w / 2;
        self.rotatey = h / 2;
    },
    //获取宽度，因为sprite的性质是高宽随子显示对象变化的
    //所以每次回去是需要动态的计算获取的
    getWidth: function () {
        let self = this,
            v = 0,
            v1 = 0,
            key = null;
        for (key in self.childList) {
            if (self.childList[key].getWidth) {
                v1 = self.childList[key].getWidth ();
                v = v < v1 ? v1 : v;
            }
        }
        return v;
    },
    //同上
    getHeight: function () {
        let self = this,
            v = 0,
            v1 = 0,
            key = null;
        for (key in self.childList) {
            if (self.childList[key].getHeight) {
                v1 = self.childList[key].getHeight ();
                v = v < v1 ? v1 : v;
            }
        }
        return v;
    },
    
    //box2d的，不看
    setBodyMouseJoint: function (value) {
        let self = this;
        if (! self.box2dBody) {
            return;
        }
        self.box2dBody.mouseJoint = true;
    },
    clearBody: function () {
        let self = this;
        if (! self.box2dBody) {
            return;
        }
        LGlobal.box2d.world.DestroyBody (self.box2dBody);
        self.box2dBody = null;
    },
    addBodyCircle: function (radius, cx, cy, type, density, friction, restitution) {
        let self = this;
        self.rotatex = radius;
        self.rotatey = radius;
        self.box2dBody = LGlobal.box2d.addCircle (radius / LGlobal.box2d.drawScale, (self.x + cx) / LGlobal.box2d.drawScale, (self.y + cy) / LGlobal.box2d.drawScale, type == 1 ? LGlobal.box2d.b2Body.b2_dynamicBody : LGlobal.box2d.b2Body.b2_staticBody, density == null ? .5 : density, friction == null ? 0.4 : friction, restitution == null ? 0.8 : restitution);
        self.box2dBody.SetUserData (self);
    },
    addBodyPolygon: function (w, h, type, density, friction, restitution) {
        let self = this;
        self.rotatex = w / 2;
        self.rotatey = h / 2;
        self.box2dBody = LGlobal.box2d.addPolygon (w * 0.5 / LGlobal.box2d.drawScale, h * 0.5 / LGlobal.box2d.drawScale, self.x / LGlobal.box2d.drawScale, self.y / LGlobal.box2d.drawScale, type == 1 ? LGlobal.box2d.b2Body.b2_dynamicBody : LGlobal.box2d.b2Body.b2_staticBody, density == null ? .5 : density, friction == null ? 0.4 : friction, restitution == null ? 0.8 : restitution);
        self.box2dBody.SetUserData (self);
    },
    addBodyVertices: function (vertices, cx, cy, type, density, friction, restitution) {
        let self = this;
        self.rotatex = 0;
        self.rotatey = 0;
        self.box2dBody = LGlobal.box2d.addVertices (vertices, (self.x - cx) / LGlobal.box2d.drawScale, (self.y - cy) / LGlobal.box2d.drawScale, type == 1 ? LGlobal.box2d.b2Body.b2_dynamicBody : LGlobal.box2d.b2Body.b2_staticBody, density, friction, restitution);
        self.box2dBody.SetUserData (self);
    },
    
    loopframe: function () {
        let self = this;
        let key = null;
        for (key in self.frameList) {
            self.frameList[key] ();
        }
    },
    //sprite内部是可以包含sprite（loader等）的
    addChild: function (DisplayObject) {
        let self = this;
        DisplayObject.parent = self;
        self.childList.push (DisplayObject);
        //每次添加，计算一下宽高
        self.resize ();
    },
    removeChild: function (DisplayObject) {
        let self = this;
        for (let i = 0; i < self.childList.length; i ++) {
            if (DisplayObject.objectindex == self.childList[i].objectindex) {
                if (DisplayObject.die) {
                    DisplayObject.die ();
                }
                self.childList.splice (i, 1);
                break;
            }
        }
        self.resize ();
    },
    getChildAt: function (i) {
        let self = this;
        if (self.childList.length == 0 || self.childList.length <= i) {
            return null;
        }
        return self.childList[i];
    },
    removeChildAt: function (i) {
        let self = this;
        if (self.childList.length >= i) {
            return;
        }
        self.childList[i].die ();
        self.childList.splice (i, 1);
        self.resize ();
    },
    resize: function () {
        let self = this;
        let sx = 0,
            sy = 0,
            ex = 0,
            ey = 0;
        for (let i = 0; i < self.childList.length; i ++) {
            if (sx > self.childList[i].x) {
                sx = self.childList[i].x;
            }
            if (ex < self.childList[i].width + self.childList[i].x) {
                ex = self.childList[i].width + self.childList[i].x;
            }
            if (sy > self.childList[i].y) {
                sy = self.childList[i].y;
            }
            if (ey < self.childList[i].height + self.childList[i].y) {
                ey = self.childList[i].height + self.childList[i].y;
            }
        }
        self.width = ex - sx;
        self.height = ey - sy;
    },
    removeAllChild: function () {
        let self = this;
        for (let i = 0; i < self.childList.length; i ++) {
            if (self.childList[i].die) {
                self.childList[i].die ();
            }
        }
        self.childList.splice (0, self.childList.length);
        self.width = 0;
        self.height = 0;
    },
    addEventListener: function (type, listener) {
        let self = this;
        if (type == LEvent.ENTER_FRAME) {
            self.frameList.push (listener);
        }
        else if (type.indexOf ("mouse") >= 0) {
            self.mouseList.push ({
                listener: listener,
                type: type
            });
        }
        else if (type.indexOf ("touch") >= 0) {
            self.mouseList.push ({
                listener: listener,
                type: type
            });
        }
    },
    removeEventListener: function (type, listener) {
        let self = this;
        let i,
            length = self.frameList.length;
        for (i = 0; i < length; i ++) {
            if (type == LEvent.ENTER_FRAME && self.frameList[i] == listener) {
                self.frameList.splice (i, 1);
                break;
            }
        }
        length = self.mouseList.length;
        for (i = 0; i < length; i ++) {
            if (type == self.mouseList[i].type && self.mouseList[i].listener == listener) {
                self.mouseList.splice (i, 1);
                break;
            }
        }
    },
    mouseEvent: function (event, type, cood) {
        //1.4版本前的方式，其实可以看做是模拟了捕获阶段
        //但是在as3.0里面还存在冒泡阶段
        //但是从这里也可以看得出来，冒泡阶段的大体思路也是如此
        //因此及时stopPropogation很重要
        if (event == null || event == UNDEFINED) {
            return false;
        }
        if (cood == null) {
            cood = {
                x: 0,
                y: 0
            };
        }
        let self = this;
        let isok;
        let ox,
            oy;
        if (event.offsetX == UNDEFINED) {
            ox = event.touches[0].pageX;
            oy = event.touches[0].pageY;
        }
        else {
            ox = event.offsetX;
            oy = event.offsetY;
        }
        for (key in self.childList) {
            if (self.childList[key].mouseEvent) {
                isok = self.childList[key].mouseEvent (event, type, {
                    x: self.x + cood.x,
                    y: self.y + cood.y
                });
                if (isok) {
                    return true;
                }
            }
        }
        if (self.mouseList.length == 0) {
            return false;
        }
        let key = null;
        let isclick = self.ismouseon (event, cood);
        if (isclick) {
            for (key in self.mouseList) {
                let obj = self.mouseList[key];
                if (obj.type == type) {
                    event.selfX = ox - (self.x + cood.x);
                    event.selfY = oy - (self.y + cood.y);
                    event.clickTarget = self;
                    obj.listener (event, self);
                    return true;
                }
            }
            return false;
        }
        else {
            return false;
        }
    },
    ismouseon: function (event, cood) {
        let self = this;
        if (! self.visible || event == null) {
            return false;
        }
        let key = null;
        let isclick = false;
        
        //这里是循环childList和graphics来判断其坐标
        //在lufylegends 1.8之后有优化，
        //优化的分类思想和模拟DOM的冒泡特别赞！！！！
        for (key in self.childList) {
            if (self.childList[key].ismouseon) {
                isclick = self.childList[key].ismouseon (event, {
                    x: self.x + cood.x,
                    y: self.y + cood.y
                });
            }
            if (isclick) {
                break;
            }
        }
        if (! isclick && self.graphics) {
            isclick = self.graphics.ismouseon (event, {
                x: self.x + cood.x,
                y: self.y + cood.y
            });
        }
        return isclick;
    },
    die: function () {
        let self = this;
        self.graphics.clear ();
        self.frameList.splice (0, self.frameList.length);
        self.mouseList.splice (0, self.mouseList.length);
        let key = null;
        for (key in self.childList) {
            if (self.childList[key].die) {
                self.childList[key].die ();
            }
        }
    }
};
/*---------------------LSprite end------------------------------*/

/*---------------------LButton start------------------------------*/
function LButton (bitmap_up, bitmap_over) {
    //继承自spirte类，这里其实主要是为了保证事件的响应
    base (this, LSprite, []);
    let self = this;
    self.type = "LButton";
    self.bitmap_up = bitmap_up;
    self.addChild (bitmap_up);
    if (bitmap_over == null) {
        bitmap_over = bitmap_up;
    }
    else {
        self.addChild (bitmap_over);
    }
    self.bitmap_over = bitmap_over;
    self.bitmap_over.visible = false;
    self.bitmap_up.visible = true;
    LGlobal.buttonList.push (self);
}

//最主要是按钮的3态变化
LButton.prototype.buttonModeChange = function () {
    let self = this;
    let cood = {
        x: 0,
        y: 0
    };
    let parent = self.parent;
    while (parent != "root") {
        cood.x += parent.x;
        cood.y += parent.y;
        parent = parent.parent;
    }
    if (self.ismouseon (LGlobal.mouseMoveEvent, cood)) {
        self.bitmap_up.visible = false;
        self.bitmap_over.visible = true;
    }
    else {
        self.bitmap_over.visible = false;
        self.bitmap_up.visible = true;
    }
};
LButton.prototype.die = function () {
    let self = this;
    arguments.callee[SUPER].die.call (this);
    for (let i = 0; i < LGlobal.buttonList.length; i ++) {
        if (LGlobal.buttonList[i].objectindex == self.objectindex) {
            LGlobal.buttonList.splice (i, 1);
            break;
        }
    }
};
/*---------------------LButton end------------------------------*/

/*---------------------LTextField start------------------------------*/
let LTextFieldType = function () {
};
LTextFieldType.type = "LTextFieldType";
LTextFieldType.INPUT = "input";
LTextFieldType.DYNAMIC = null;

//LTextField没有直接使用canvas来画
//而是配合了input标签，每次LTextField点击，那么input就跑过去，然后sprite做了背景
//恩...这种其实没必要，直接input就好了
//但是作者在这里是考虑到了性能，canvas渲染的字体，性能更高
function LTextField () {
    let self = this;
    self.objectindex = ++ LGlobal.objectIndex;
    self.type = "LTextField";
    self.texttype = null;
    self.x = 0;
    self.y = 0;
    self.text = "";
    self.font = "utf-8";
    self.size = "11";
    self.color = "#000000";
    self.weight = "normal";
    self.textAlign = "left";
    self.textBaseline = "top";
    self.lineWidth = 1;
    self.width = 150;
    self.height = 20;
    self.stroke = false;
    self.visible = true;
}
LTextField.prototype = {
    show: function (cood) {
        if (cood == null) {
            cood = {
                x: 0,
                y: 0
            };
        }
        let self = this;
        if (! self.visible) {
            return;
        }
        if (self.mask != null && self.mask.show) {
            LGlobal.canvas.beginPath ();
            LGlobal.canvas.save ();
            self.mask.show ();
            LGlobal.canvas.clip ();
        }
        if (self.texttype == LTextFieldType.INPUT) {
            self.inputBackLayer.show ({
                x: self.x + cood.x,
                y: self.y + cood.y
            });
            if (LGlobal.inputBox.name == "input" + self.objectindex) {
                LGlobal.inputBox.style.marginTop = self.y + cood.y + "px";
                LGlobal.inputBox.style.marginLeft = self.x + cood.x + "px";
            }
        }
        LGlobal.canvas.font = self.weight + " " + self.size + "pt " + self.font;
        LGlobal.canvas.textAlign = self.textAlign;
        LGlobal.canvas.textBaseline = self.textBaseline;
        LGlobal.canvas.lineWidth = self.lineWidth;
        if (self.stroke) {
            LGlobal.canvas.strokeStyle = self.color;
            LGlobal.canvas.strokeText (self.text, parseFloat (cood.x) + parseFloat (self.x), parseFloat (cood.y) + parseFloat (self.y), LGlobal.canvas.measureText (self.text).width);
        }
        else {
            LGlobal.canvas.fillStyle = self.color;
            LGlobal.canvas.fillText (self.text, parseFloat (cood.x) + parseFloat (self.x), parseFloat (cood.y) + parseFloat (self.y), LGlobal.canvas.measureText (self.text).width);
        }
        if (self.wind_flag) {
            self.windRun ();
        }
        if (self.mask != null && self.mask.show) {
            LGlobal.canvas.restore ();
        }
    },
    setType: function (type) {
        let self = this;
        if (self.texttype != type && type == LTextFieldType.INPUT) {
            self.inputBackLayer = new LSprite ();
            self.inputBackLayer.graphics.drawRect (1, "black", [0, 0, (self.width), (self.height)], true, "#cccccc");
            self.inputBackLayer.addEventListener (LMouseEvent.MOUSE_DOWN, function () {
                if (self.texttype != LTextFieldType.INPUT) {
                    return;
                }
                LGlobal.inputBox.style.display = "";
                LGlobal.inputBox.name = "input" + self.objectindex;
                LGlobal.inputTextField = self;
                LGlobal.inputTextBox.value = self.text;
                LGlobal.inputTextBox.style.height = self.height + "px";
                LGlobal.inputTextBox.style.width = self.width + "px";
            });
        }
        else {
            self.inputBackLayer = null;
        }
        self.texttype = type;
    },
    mouseEvent: function (event, type, cood) {
        if (cood == null) {
            cood = {
                x: 0,
                y: 0
            };
        }
        let self = this;
        if (self.inputBackLayer == null) {
            return;
        }
        self.inputBackLayer.mouseEvent (event, type, {
            x: self.x + cood.x,
            y: self.y + cood.y
        });
    },
    getWidth: function () {
        let self = this;
        LGlobal.canvas.font = self.size + "pt " + self.font;
        return LGlobal.canvas.measureText (self.text).width;
    },
    wind: function (listener) {
        let self = this;
        self.wind_over_function = listener;
        self.wind_flag = true;
        self.wind_text = self.text;
        self.text = "";
        self.wind_length = 0;
    },
    windRun: function () {
        let self = this;
        if (self.wind_length > self.wind_text.length) {
            self.wind_flag = false;
            if (self.wind_over_function) {
                self.wind_over_function ();
            }
            return;
        }
        self.text = self.wind_text.substring (0, self.wind_length);
        self.wind_length ++;
    }
};
/*---------------------LTextField end------------------------------*/

/*---------------------LLabel end------------------------------*/
//LLabel跟LTextField很类似，只是不可以响应事件罢了
function LLabel () {
    let self = this;
    base (self, LTextField, []);
    self.width = LGlobal.width;
}
/*---------------------LLabel end------------------------------*/

/*---------------------LBitmap end------------------------------*/
//LBitmap是LBitmapdata的容器
function LBitmap (bitmapdata) {
    let self = this;
    self.objectindex = ++ LGlobal.objectIndex;
    self.type = "LBitmap";
    self.x = 0;
    self.y = 0;
    self.width = 0;
    self.height = 0;
    self.scaleX = 1;
    self.scaleY = 1;
    self.alpha = 1;
    self.visible = true;
    self.rotate = 0;
    self.bitmapData = bitmapdata;
    if (self.bitmapData) {
        self.width = self.bitmapData.width;
        self.height = self.bitmapData.height;
    }
}
LBitmap.prototype = {
    show: function (cood) {
        if (cood == null) {
            cood = {
                x: 0,
                y: 0
            };
        }
        let self = this;
        if (! self.visible) {
            return;
        }
        if (self.rotate != 0) {
            let rx,
                ry;
            rx = cood.x + self.x + self.bitmapData.width * self.scaleX / 2;
            ry = cood.y + self.y + self.bitmapData.height * self.scaleY / 2;
            //这个技巧蛮有用的，围绕中心旋转
            LGlobal.canvas.save ();
            LGlobal.canvas.translate (rx, ry);
            LGlobal.canvas.rotate (self.rotate * Math.PI / 180);
            LGlobal.canvas.translate (0 - rx, 0 - ry);
            if (self.alpha < 1) {
                LGlobal.canvas.globalAlpha = self.alpha;
            }
            LGlobal.canvas.drawImage (self.bitmapData.image, self.bitmapData.x, self.bitmapData.y, self.bitmapData.width, self.bitmapData.height, cood.x + self.x, cood.y + self.y, self.width * self.scaleX, self.height * self.scaleY);
            LGlobal.canvas.restore ();
        }
        else {
            if (self.alpha < 1) {
                LGlobal.canvas.save ();
                LGlobal.canvas.globalAlpha = self.alpha;
            }
            LGlobal.canvas.drawImage (self.bitmapData.image, self.bitmapData.x, self.bitmapData.y, self.bitmapData.width, self.bitmapData.height, cood.x + self.x, cood.y + self.y, self.width * self.scaleX, self.height * self.scaleY);
            if (self.alpha < 1) {
                LGlobal.canvas.restore ();
            }
        }
    },
    ismouseon: function (event, cood) {
        let self = this;
        if (cood == null) {
            cood = {
                x: 0,
                y: 0
            };
        }
        if (event == null || event == UNDEFINED) {
            return false;
        }
        let ox,
            oy;
        if (event.offsetX == UNDEFINED) {
            ox = event.touches[0].pageX;
            oy = event.touches[0].pageY;
        }
        else {
            ox = event.offsetX;
            oy = event.offsetY;
        }
        if (event.offsetX >= self.x + cood.x && ox <= self.x + cood.x + self.bitmapData.width * self.scaleX && event.offsetY >= self.y + cood.y && oy <= self.y + cood.y + self.bitmapData.height * self.scaleY) {
            return true;
        }
        else {
            return false;
        }
    },
    getWidth: function () {
        let self = this;
        return self.bitmapData != null ? self.bitmapData.width * self.scaleX : 0;
    },
    getHeight: function () {
        let self = this;
        return self.bitmapData != null ? self.bitmapData.height * self.scaleY : 0;
    }
};
/*---------------------LBitmap end------------------------------*/

/*---------------------LBitmapData start------------------------------*/
//图片啦，渲染交给Bitmap了
function LBitmapData (image, x, y, width, height) {
    let self = this;
    self.objectindex = ++ LGlobal.objectIndex;
    self.type = "LBitmapData";
    self.oncomplete = null;
    if (image) {
        self.image = image;
        self.x = x == null ? 0 : x;
        self.y = y == null ? 0 : y;
        self.width = width == null ? self.image.width : width;
        self.height = height == null ? self.image.height : height;
    }
    else {
        self.x = 0;
        self.y = 0;
        self.width = 0;
        self.height = 0;
        self.image = new Image ();
    }
}
LBitmapData.prototype = {
    setProperties: function (x, y, width, height) {
        let self = this;
        self.x = x;
        self.y = y;
        self.width = width;
        self.height = height;
    },
    setCoordinate: function (x, y) {
        let self = this;
        self.x = x;
        self.y = y;
    }
};
/*---------------------LBitmapData end------------------------------*/

/*---------------------LAnimation start------------------------------*/
//LAnimation主要是用来做时序帧动画
function LAnimation (layer, data, list) {
    base (this, LSprite, []);
    let self = this;
    self.rowIndex = 0;
    self.colIndex = 0;
    self.overActionFun = null;
    self.bitmap = new LBitmap (data);
    self.imageArray = list;
    self.addChild (self.bitmap);
    if (layer != null) {
        layer.addChild (self);
    }
}
LAnimation.prototype.setAction = function (rowIndex, colIndex) {
    let self = this;
    if (rowIndex != null && rowIndex >= 0 && rowIndex < self.imageArray.length) {
        self.rowIndex = rowIndex;
    }
    if (colIndex != null && colIndex >= 0 && colIndex < self.imageArray[rowIndex].length) {
        self.colIndex = colIndex;
    }
};
LAnimation.prototype.getAction = function () {
    let self = this;
    return [(self.rowIndex), (self.colIndex)];
};

//这里可以看到，其实LSprite的onloop方法其实是为了LAnimation以及下面的LAnimationMovie服务的
LAnimation.prototype.onframe = function () {
    let self = this;
    //换sprite的坐标达到运动效果
    self.bitmap.bitmapData.setCoordinate (self.imageArray[self.rowIndex][self.colIndex].x, self.imageArray[self.rowIndex][self.colIndex].y);
    self.colIndex ++;
    if (self.colIndex >= self.imageArray[self.rowIndex].length) {
        self.colIndex = 0;
        if (self.overActionFun != null) {
            self.overActionFun (self);
        }
    }
};
LAnimation.prototype.addEventListener = function (type, listener) {
    let self = this;
    arguments.callee[SUPER].die.call (this);
    if (type == LEvent.COMPLETE) {
        self.overActionFun = listener;
    }
};
LAnimation.prototype.removeEventListener = function (type, listener) {
    let self = this;
    arguments.callee[SUPER].die.call (this);
    if (type == LEvent.COMPLETE) {
        self.overActionFun = null;
    }
};
/*---------------------LAnimation end------------------------------*/
function LAnimationMovie (data, imgArray, speed) {
    if (speed == null) {
        speed = 1;
    }
    //也继承了spirte类...我觉得这块其实可以和LAnimation合并
    base (this, LSprite, []);
    let self = this;
    self.animation = new LAnimation (self, data, imgArray);
    self.speedIndex = 1;
    self.speed = speed;
    self.addEventListener (LEvent.ENTER_FRAME, self.onFrame);
}
LAnimationMovie.prototype.onFrame = function (event) {
    let self = this;
    if (! (self.speedIndex ++ % self.speed == 0)) {
        return;
    }
    self.speedIndex -= self.speed;
    self.animation.onframe ();
};
LAnimationMovie.prototype.action = function (value) {
    let self = this;
    self.animation.setAction (value);
};
/*---------------------LAnimation end------------------------------*/

/*---------------------LDisplay start------------------------------*/
function LDisplay () {
}
LDisplay.drawRect = function (_target, pointArray, fill, color, alpha, thickness) {
    if (fill == null) {
        fill = false;
    }
    if (color == null) {
        color = "#000000";
    }
    if (alpha == null) {
        alpha = 1;
    }
    if (thickness == null) {
        thickness = 1;
    }
    _target.drawRect (1, color, pointArray, fill, color);
};
/*---------------------LDisplay end------------------------------*/

/*---------------------各种loading组件 start------------------------------*/
//看不懂这些组件的算法，特别是那个矩阵，其实没必要，DOM写起来更容易的东西，何必canvas写呢
function LoadingSample1 (step, background, color) {
    base (this, LSprite, []);
    let self = this;
    self.numberList = new Array (
                                [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1], 
                                [0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0], 
                                [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1], 
                                [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], 
                                [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1], 
                                [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1], 
                                [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1], 
                                [1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1], 
                                [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1], 
                                [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1]
                            );
                                
    self.backgroundColor = background == null ? "#000000" : background;
    self.color = color == null ? "#ffffff" : color;
    self.progress = 0;
    self.step = step == null ? LGlobal.width * 0.5 / 15 : step;
    self.back = new LSprite ();
    self.addChild (self.back);
    self.num = new LSprite ();
    self.addChild (self.num);
    self.num.mask = new LSprite ();
    self.screenX = (LGlobal.width - self.step * 15) / 2;
    self.screenY = (LGlobal.height - self.step * 5) / 2;
    self.back.x = self.screenX;
    self.back.y = self.screenY;
    self.num.x = self.screenX;
    self.num.y = self.screenY;
    self.setProgress (self.progress);
}
LoadingSample1.prototype.setProgress = function (value) {
    let self = this;
    let num_0 = "",
        num_1,
        num_2,
        i;
    let s_x = self.step;
    if (value >= 100) {
        num_0 = self.getNumber (1);
        num_1 = self.getNumber (0);
        num_2 = self.getNumber (0);
        s_x = self.step * 3;
    }
    else if (value >= 10) {
        num_1 = self.getNumber (Math.floor (value / 10));
        num_2 = self.getNumber (value % 10);
    }
    else {
        num_1 = self.getNumber (0);
        num_2 = self.getNumber (value);
    }
    self.back.graphics.clear ();
    self.back.graphics.add (function () {
        LGlobal.canvas.beginPath ();
        LGlobal.canvas.fillStyle = self.backgroundColor;
        LGlobal.canvas.fillRect (0, 0, LGlobal.width, LGlobal.height);
        LGlobal.canvas.beginPath ();
        LGlobal.canvas.fillStyle = self.color;
        if (value >= 100) {
            for (i = 0; i < num_0.length; i ++) {
                if (num_0[i] == 0) {
                    continue;
                }
                LGlobal.canvas.fillRect (self.screenX + Math.floor (i % 3) * self.step, self.screenY + Math.floor (i / 3) * self.step, self.step, self.step);
            }
        }
        for (i = 0; i < num_1.length; i ++) {
            if (num_1[i] == 0) {
                continue;
            }
            LGlobal.canvas.fillRect (self.screenX + s_x + Math.floor (i % 3) * self.step, self.screenY + Math.floor (i / 3) * self.step, self.step, self.step);
        }
        for (i = 0; i < num_2.length; i ++) {
            if (num_2[i] == 0) {
                continue;
            }
            LGlobal.canvas.fillRect (self.screenX + s_x + Math.floor (i % 3) * self.step + self.step * 4, self.screenY + Math.floor (i / 3) * self.step, self.step, self.step);
        }
        LGlobal.canvas.moveTo (self.screenX + s_x + self.step * 9.7, self.screenY);
        LGlobal.canvas.lineTo (self.screenX + s_x + self.step * 10.5, self.screenY);
        LGlobal.canvas.lineTo (self.screenX + s_x + self.step * 9.3, self.screenY + self.step * 5);
        LGlobal.canvas.lineTo (self.screenX + s_x + self.step * 8.5, self.screenY + self.step * 5);
        LGlobal.canvas.lineTo (self.screenX + s_x + self.step * 9.7, self.screenY);
        LGlobal.canvas.fill ();
        LGlobal.canvas.moveTo (self.screenX + s_x + self.step * 8.5, self.screenY + self.step);
        LGlobal.canvas.arc (self.screenX + s_x + self.step * 8.5, self.screenY + self.step, self.step * 0.6, 0, 360 + Math.PI / 180);
        LGlobal.canvas.moveTo (self.screenX + s_x + self.step * 10.5, self.screenY + self.step * 4);
        LGlobal.canvas.arc (self.screenX + s_x + self.step * 10.5, self.screenY + self.step * 4, self.step * 0.6, 0, 360 + Math.PI / 180);
        LGlobal.canvas.fill ();
    });
    self.num.mask.graphics.clear ();
    self.num.mask.graphics.add (function () {
        if (value >= 100) {
            for (i = 0; i < num_0.length; i ++) {
                if (num_0[i] == 0) {
                    continue;
                }
                LGlobal.canvas.rect (self.screenX + Math.floor (i % 3) * self.step, self.screenY + Math.floor (i / 3) * self.step, self.step, self.step);
            }
        }
        for (let i = 0; i < num_1.length; i ++) {
            if (num_1[i] == 0) {
                continue;
            }
            LGlobal.canvas.rect (self.screenX + s_x + Math.floor (i % 3) * self.step, self.screenY + Math.floor (i / 3) * self.step, self.step, self.step);
        }
        for (let i = 0; i < num_2.length; i ++) {
            if (num_2[i] == 0) {
                continue;
            }
            LGlobal.canvas.rect (self.screenX + s_x + Math.floor (i % 3) * self.step + self.step * 4, self.screenY + Math.floor (i / 3) * self.step, self.step, self.step);
        }
    });
    let grd = LGlobal.canvas.createRadialGradient (LGlobal.width / 2, LGlobal.height, 0, LGlobal.width / 2, 0, LGlobal.height);
    grd.addColorStop (0, "red");
    grd.addColorStop (0.3, "orange");
    grd.addColorStop (0.4, "yellow");
    grd.addColorStop (0.5, "green");
    grd.addColorStop (0.8, "blue");
    grd.addColorStop (1, "violet");
    LGlobal.canvas.fillStyle = grd;
    self.num.graphics.clear ();
    self.num.graphics.drawRect (1, grd, [0, (self.step * 5 * (100 - value) * 0.01), (LGlobal.width), (LGlobal.height)], true, grd);
};
LoadingSample1.prototype.getNumber = function (value) {
    return this.numberList[value];
};
function LoadingSample2 (size, background, color) {
    base (this, LSprite, []);
    let self = this;
    self.backgroundColor = background == null ? "#000000" : background;
    self.graphics.drawRect (1, self.backgroundColor, [0, 0, (LGlobal.width), (LGlobal.height)], true, self.backgroundColor);
    if (color == null) {
        color = LGlobal.canvas.createRadialGradient (LGlobal.width / 2, LGlobal.height, 0, LGlobal.width / 2, 0, LGlobal.height);
        color.addColorStop (0, "red");
        color.addColorStop (0.3, "orange");
        color.addColorStop (0.4, "yellow");
        color.addColorStop (0.5, "green");
        color.addColorStop (0.8, "blue");
        color.addColorStop (1, "violet");
    }
    self.color = color;
    self.progress = 0;
    self.size = size == null ? LGlobal.height * 0.2 : size;
    self.backLabel = new LTextField ();
    self.backLabel.text = "Loading...";
    self.addChild (self.backLabel);
    self.backLabel.size = self.size;
    self.backLabel.color = "#ffffff";
    self.backLabel.x = (LGlobal.width - self.backLabel.getWidth ()) / 2;
    self.backLabel.y = (LGlobal.height - self.size) / 2;
    self.progressLabel = new LTextField ();
    self.addChild (self.progressLabel);
    self.progressLabel.text = "***%";
    self.progressLabel.size = self.size * 0.3;
    self.progressLabel.color = color;
    self.progressLabel.x = (LGlobal.width - self.progressLabel.getWidth ()) / 2;
    self.progressLabel.y = (LGlobal.height - self.size) / 2 - self.size * 0.4;
    self.showLabel = new LTextField ();
    self.showLabel.text = "Loading...";
    self.addChild (self.showLabel);
    self.showLabel.size = self.size;
    self.showLabel.color = self.color;
    self.showLabel.x = (LGlobal.width - self.showLabel.getWidth ()) / 2;
    self.showLabel.y = (LGlobal.height - self.size) / 2;
    self.showLabel.mask = new LGraphics ();
    self.screenX = self.showLabel.x;
    self.screenY = self.showLabel.y;
    self.screenWidth = self.showLabel.getWidth ();
    LGlobal.canvas.shadowOffsetX = 2;
    LGlobal.canvas.shadowOffsetY = 2;
    LGlobal.canvas.shadowColor = "blue";
    self.setProgress (self.progress);
}
LoadingSample2.prototype.setProgress = function (value) {
    let self = this;
    self.progressLabel.text = value + "%";
    self.showLabel.mask.clear ();
    self.showLabel.mask.add (function () {
        LGlobal.canvas.rect (self.screenX, 0, self.screenWidth * value * 0.01, LGlobal.height);
    });
    if (value >= 100) {
        LGlobal.canvas.shadowOffsetX = 0;
        LGlobal.canvas.shadowOffsetY = 0;
    }
};
function LoadingSample3 (height, background, color) {
    base (this, LSprite, []);
    let self = this;
    self.backgroundColor = background == null ? "#000000" : background;
    self.graphics.drawRect (1, self.backgroundColor, [0, 0, (LGlobal.width), (LGlobal.height)], true, self.backgroundColor);
    if (color == null) {
        color = LGlobal.canvas.createRadialGradient (LGlobal.width / 2, LGlobal.height, 0, LGlobal.width / 2, 0, LGlobal.height);
        color.addColorStop (0, "red");
        color.addColorStop (0.3, "orange");
        color.addColorStop (0.4, "yellow");
        color.addColorStop (0.5, "green");
        color.addColorStop (0.8, "blue");
        color.addColorStop (1, "violet");
    }
    self.color = color;
    self.progress = 0;
    self.screenWidth = LGlobal.width * 0.75;
    self.screenHeight = height == null ? LGlobal.height * 0.1 : height;
    if (self.screenHeight > 5) {
        self.screenHeight = 5;
    }
    self.screenX = (LGlobal.width - self.screenWidth) / 2;
    self.screenY = (LGlobal.height - self.screenHeight) / 2;
    self.back = new LSprite ();
    self.addChild (self.back);
    self.label = new LTextField ();
    self.label.color = "#ffffff";
    self.label.weight = "bolder";
    self.label.size = self.screenHeight * 2;
    self.label.x = self.screenX + (self.screenWidth - self.label.getWidth ()) * 0.5;
    self.label.y = self.screenY - self.screenHeight * 4;
    self.addChild (self.label);
    self.star = new Array ();
    LGlobal.LoadingSample3 = self;
    self.interval = setInterval (self.onframe, LGlobal.speed < 50 ? 50 : LGlobal.speed);
    self.setProgress (self.progress);
}
LoadingSample3.prototype.onframe = function () {
    let self = LGlobal.LoadingSample3;
    let i,
        star;
    if (self.progress >= 100) {
        if (self.star.length > 0) {
            for (i = 0; i < self.star.length; i ++) {
                self.removeChild (self.star[i]);
            }
            self.star.splice (0, self.star.length);
        }
        return;
    }
    for (i = 0; i < self.star.length; i ++) {
        star = self.star[i];
        star.alpha -= 0.1;
        star.x += star.speedx;
        star.y += star.speedy;
        if (star.alpha <= 0) {
            self.star.splice (i, 1);
            self.removeChild (star);
            i --;
        }
    }
    if (self.star.length < 10) {
        self.addStar ();
    }
};
LoadingSample3.prototype.die = function () {
    let self = this;
    arguments.callee[SUPER].die.call (this);
    clearInterval (self.interval);
    LGlobal.LoadingSample3 = null;
};
LoadingSample3.prototype.addStar = function () {
    let self = this;
    let star = new LSprite ();
    let step = 1 + Math.floor (Math.random () * 4);
    star.graphics.add (function (coodx, coody) {
        LGlobal.canvas.beginPath ();
        LGlobal.canvas.fillStyle = "#ffffff";
        LGlobal.canvas.lineTo (coodx + step * 2, coody + step);
        LGlobal.canvas.lineTo (coodx + step * 4, coody);
        LGlobal.canvas.lineTo (coodx + step * 3, coody + step * 2);
        LGlobal.canvas.lineTo (coodx + step * 4, coody + step * 4);
        LGlobal.canvas.lineTo (coodx + step * 2, coody + step * 3);
        LGlobal.canvas.lineTo (coodx, coody + step * 4);
        LGlobal.canvas.lineTo (coodx + step, coody + step * 2);
        LGlobal.canvas.lineTo (coodx, coody);
        LGlobal.canvas.fill ();
    });
    star.x = self.screenX + self.screenWidth * self.progress * 0.01;
    star.y = self.screenY;
    star.speedx = 4 - 8 * Math.random ();
    star.speedy = 4 - 8 * Math.random ();
    self.star.push (star);
    self.addChild (star);
};
LoadingSample3.prototype.setProgress = function (value) {
    let self = this;
    if (value > 100) {
        value = 100;
    }
    self.progress = value;
    self.back.graphics.clear ();
    self.back.graphics.add (function () {
        LGlobal.canvas.beginPath ();
        LGlobal.canvas.fillStyle = "#00FFFF";
        LGlobal.canvas.rect (self.screenX - 3, self.screenY - 3, self.screenWidth + 6, self.screenHeight + 6);
        LGlobal.canvas.fill ();
        LGlobal.canvas.beginPath ();
        LGlobal.canvas.fillStyle = "#990033";
        LGlobal.canvas.rect (self.screenX, self.screenY, self.screenWidth, self.screenHeight);
        LGlobal.canvas.fill ();
        LGlobal.canvas.beginPath ();
        LGlobal.canvas.fillStyle = self.color;
        LGlobal.canvas.rect (self.screenX, self.screenY, self.screenWidth * value * 0.01, self.screenHeight);
        LGlobal.canvas.fill ();
    });
    self.label.text = value + "%";
};
/*---------------------各种loading组件 end------------------------------*/

/*---------------------$LoadManage start------------------------------*/
function $LoadManage () {
}
$LoadManage.prototype = {
    load: function ($list, $onupdate, $oncomplete) {
        this.list = $list, this.onupdate = $onupdate, this.oncomplete = $oncomplete;
        this.loader = null, this.loadIndex = 0, this.result = [];
        this.loadStart ();
    },
    loadStart: function () {
        let self = LLoadManage;
        if (self.loadIndex >= self.list.length) {
            self.oncomplete (self.result);
            return;
        }
        self.loader = new LLoader ();
        self.loader.addEventListener (LEvent.COMPLETE, self.loadComplete);
        self.loader.load (self.list[self.loadIndex].path, "bitmapData");
    },
    loadComplete: function () {
        let self = LLoadManage;
        self.result[self.list[self.loadIndex].name] = self.loader.content;
        self.loadIndex ++;
        if (self.onupdate) {
            self.onupdate (Math.floor (self.loadIndex * 100 / self.list.length));
        }
        self.loadStart ();
    }
};
/*---------------------$LoadManage end------------------------------*/

/*---------------------LEasing start------------------------------*/
//继承了jQuery animation plus的运动函数，
//这些运动函数都是前人闲得没事儿凑出来（不信自己查）的，没有什么数学原理
//下面只是直接封装了一层类似as的API，没啥好看的
let LEasing = {
    Quad: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function (t, b, c, d) {
            return - c * (t /= d) * (t - 2) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t + b;
            }
            return - c / 2 * (-- t * (t - 2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t + b;
            }
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return - c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t * t + b;
            }
            return - c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    },
    Quint: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t * t * t + b;
            }
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {
        easeIn: function (t, b, c, d) {
            return - c * Math.cos (t / d * (Math.PI / 2)) + c + b;
        },
        easeOut: function (t, b, c, d) {
            return c * Math.sin (t / d * (Math.PI / 2)) + b;
        },
        easeInOut: function (t, b, c, d) {
            return - c / 2 * (Math.cos (Math.PI * t / d) - 1) + b;
        }
    },
    Strong: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t * t * t + b;
            }
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Expo: {
        easeIn: function (t, b, c, d) {
            return t == 0 ? b : c * Math.pow (2, 10 * (t / d - 1)) + b;
        },
        easeOut: function (t, b, c, d) {
            return t == d ? b + c : c * (- Math.pow (2, - 10 * t / d) + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if (t == 0) {
                return b;
            }
            if (t == d) {
                return b + c;
            }
            if ((t /= d / 2) < 1) {
                return c / 2 * Math.pow (2, 10 * (t - 1)) + b;
            }
            return c / 2 * (- Math.pow (2, - 10 * -- t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function (t, b, c, d) {
            return - c * (Math.sqrt (1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function (t, b, c, d) {
            return c * Math.sqrt (1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return - c / 2 * (Math.sqrt (1 - t * t) - 1) + b;
            }
            return c / 2 * (Math.sqrt (1 - (t -= 2) * t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function (t, b, c, d, a, p) {
            let s;
            if (t == 0) {
                return b;
            }
            if ((t /= d) == 1) {
                return b + c;
            }
            if (! p) {
                p = d * .3;
            }
            if (! a || a < Math.abs (c)) {
                a = c;
                s = p / 4;
            }
            else {
                s = p / (2 * Math.PI) * Math.asin (c / a);
            }
            return - (a * Math.pow (2, 10 * (t -= 1)) * Math.sin ((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function (t, b, c, d, a, p) {
            let s;
            if (t == 0) {
                return b;
            }
            if ((t /= d) == 1) {
                return b + c;
            }
            if (! p) {
                p = d * .3;
            }
            if (! a || a < Math.abs (c)) {
                a = c;
                s = p / 4;
            }
            else {
                s = p / (2 * Math.PI) * Math.asin (c / a);
            }
            return a * Math.pow (2, - 10 * t) * Math.sin ((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        easeInOut: function (t, b, c, d, a, p) {
            let s;
            if (t == 0) {
                return b;
            }
            if ((t /= d / 2) == 2) {
                return b + c;
            }
            if (! p) {
                p = d * (.3 * 1.5);
            }
            if (! a || a < Math.abs (c)) {
                a = c;
                s = p / 4;
            }
            else {
                s = p / (2 * Math.PI) * Math.asin (c / a);
            }
            if (t < 1) {
                return - .5 * (a * Math.pow (2, 10 * (t -= 1)) * Math.sin ((t * d - s) * (2 * Math.PI) / p)) + b;
            }
            return a * Math.pow (2, - 10 * (t -= 1)) * Math.sin ((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        }
    },
    Back: {
        easeIn: function (t, b, c, d, s) {
            if (s == undefined) {
                s = 1.70158;
            }
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function (t, b, c, d, s) {
            if (s == undefined) {
                s = 1.70158;
            }
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function (t, b, c, d, s) {
            if (s == undefined) {
                s = 1.70158;
            }
            if ((t /= d / 2) < 1) {
                return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
            }
            return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function (t, b, c, d) {
            return c - LEasing.Bounce.easeOut (d - t, 0, c, d) + b;
        },
        easeOut: function (t, b, c, d) {
            if ((t /= d) < 1 / 2.75) {
                return c * (7.5625 * t * t) + b;
            }
            else if (t < 2 / 2.75) {
                return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
            }
            else if (t < 2.5 / 2.75) {
                return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
            }
            else {
                return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
            }
        },
        easeInOut: function (t, b, c, d) {
            if (t < d / 2) {
                return LEasing.Bounce.easeIn (t * 2, 0, c, d) * .5 + b;
            }
            else {
                return LEasing.Bounce.easeOut (t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }
};
let Quad = LEasing.Quad;
let Cubic = LEasing.Cubic;
let Quart = LEasing.Quart;
let Quint = LEasing.Quint;
let Sine = LEasing.Sine;
let Strong = LEasing.Strong;
let Expo = LEasing.Expo;
let Circ = LEasing.Circ;
let Elastic = LEasing.Elastic;
let Back = LEasing.Back;
let Bounce = LEasing.Bounce;
function $LTweenLiteChild ($target, $duration, $vars) {
    let self = this,
        key = null;
    self.target = $target;
    self.duration = $duration || 0.001;
    self.vars = $vars;
    self.currentTime = new Date ().getTime () / 1000;
    self.delay = self.vars.delay || 0;
    self.combinedTimeScale = self.vars.timeScale || 1;
    self.active = self.duration == 0 && self.delay == 0;
    self.varsto = {};
    self.varsfrom = {};
    if (typeof self.vars.ease != "function") {
        self.vars.ease = self.easeOut;
    }
    self.ease = self.vars.ease;
    delete self.vars.ease;
    if (self.vars.onComplete) {
        self.onComplete = self.vars.onComplete;
        delete self.vars.onComplete;
    }
    if (self.vars.onUpdate) {
        self.onUpdate = self.vars.onUpdate;
        delete self.vars.onUpdate;
    }
    if (self.vars.onStart) {
        self.onStart = self.vars.onStart;
        delete self.vars.onStart;
    }
    for (key in self.vars) {
        self.varsto[key] = self.vars[key];
        self.varsfrom[key] = self.target[key];
    }
    self.initTime = self.currentTime;
    self.startTime = self.initTime + self.delay;
}
$LTweenLiteChild.prototype = {
    init: function () {
    },
    initTweenVals: function () {
    },
    easeOut: function ($t, $b, $c, $d) {
        return - $c * ($t /= $d) * ($t - 2) + $b;
    },
    tween: function () {
        let self = this;
        let time = new Date ().getTime () / 1000,
            etime;
        etime = time - self.startTime;
        if (etime < 0) {
            return;
        }
        let tweentype = null;
        for (tweentype in self.varsto) {
            let v = self.ease (etime, self.varsfrom[tweentype], self.varsto[tweentype] - self.varsfrom[tweentype], self.duration);
            self.target[tweentype] = v;
        }
        if (etime >= self.duration) {
            if (self.onComplete) {
                self.onComplete ();
            }
            return true;
        }
        else if (self.onUpdate) {
            self.onUpdate ();
        }
        return false;
    }
};
function $LTweenLite () {
}
$LTweenLite.prototype = {
    tweens: [],
    show: null,
    frame: function () {
        let self = this;
        let i,
            length = self.tweens.length;
        for (i = 0; i < length; i ++) {
            if (self.tweens[i].tween ()) {
                self.tweens.splice (i, 1);
                i --;
            }
        }
        if (self.tweens.length == 0) {
            self.show = null;
        }
    },
    to: function ($target, $duration, $vars) {
        if (! $target) {
            return;
        }
        let self = this;
        let tween = new $LTweenLiteChild ($target, $duration, $vars);
        self.tweens.push (tween);
        self.show = self.frame;
    }
};
(function () {
    LLoadManage = new $LoadManage ();
    LTweenLite = new $LTweenLite ();
    //保证在一个渲染中进行运动渲染
    LGlobal.childList.push (LTweenLite);
}) ();
/*---------------------LEasing end------------------------------*/
