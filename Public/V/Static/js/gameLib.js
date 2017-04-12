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

if (!window.localStorage) {
    window.localStorage = {
        getItem: function (sKey) {
            if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
            return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
        },
        key: function (nKeyId) {
            return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
        },
        setItem: function (sKey, sValue) {
            if(!sKey) { return; }
            document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
            this.length = document.cookie.match(/\=/g).length;
        },
        length: 0,
        removeItem: function (sKey) {
            if (!sKey || !this.hasOwnProperty(sKey)) { return; }
            document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            this.length--;
        },
        hasOwnProperty: function (sKey) {
            return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        }
    };
    window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
}
var Lib = function () {
    this.warning = '封装搞事情啦'
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

