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
var DGlobal = (
    //
    ()=>{
        DGlobal.width = screen.width;
        DGlobal.height = screen.height;
        //
        ((userAgent)=>{
            if (userAgent.indexOf(OS_IPHONE) > 0) {
                DGlobal.os = OS_IPHONE;
                DGlobal.canTouch = true;
                DGlobal.ios = true;
            } else if (userAgent.indexOf(OS_IPOD) > 0) {
                DGlobal.os = OS_IPOD;
                DGlobal.canTouch = true;
                DGlobal.ios = true;
            } else if (userAgent.indexOf(OS_IPAD) > 0) {
                DGlobal.os = OS_IPAD;
                DGlobal.ios = true;
                DGlobal.canTouch = true;
            } else if (userAgent.indexOf(OS_ANDROID) > 0) {
                DGlobal.os = OS_ANDROID;
                DGlobal.canTouch = true;
                DGlobal.android = true;
                let i = userAgent.indexOf(OS_ANDROID);
                if(parseInt(userAgent.substr(i + 8, 1)) > 3){
                    DGlobal.android_new = true;
                }
            } else if (userAgent.indexOf(OS_WINDOWS_PHONE) > 0) {
                DGlobal.os = OS_WINDOWS_PHONE;
                DGlobal.canTouch = true;
            }
            DGlobal.mobile = DGlobal.canTouch;
        })(navigator.userAgent);
    }
)();

//扩展send方法
WebSocket.prototype.wlSend = (type,params)=>{
    params = params || {};
    params.type = type;
    params.name = selfName;
    this.send(JSON.stringify(params));
};

