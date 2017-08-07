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
 * v2017/8/7 10:13 初版
 */

const API = 'http://zregs.com/';

let Lib = {
     insertBase:function(){
         let content = `
             <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">废土战记</a>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li><a href="ItemsList.html">物品装备</a></li>
                    <li><a href="MapsList.html">地图场景</a></li>
                    <li><a href="EventsList.html">事件脚本</a></li>
                </ul>
            </div><!--/.nav-collapse -->
        </div>
    </div>
             `;
         let style = `
            <style>
                body {
                    padding-top: 50px;
                }
            
                .MF {
                    padding: 40px 15px;
                    text-align: center;
                }
            </style>
         `;

         $('body').prepend(content);
         $('body').before(style);
     },
};

window.onload = function () {
    Lib.insertBase();
};