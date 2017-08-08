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
    let rem = 20/750*doc.documentElement.clientWidth;
    doc.documentElement.style.fontSize=rem+'px';
    win.addEventListener('resize',function(){
        let rem = 20/750*doc.documentElement.clientWidth;
        doc.documentElement.style.fontSize = rem+'px';
    },false)
})(window,document);


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

