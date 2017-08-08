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
            <nav class="navbar navbar-inverse">
                <div class="container">
                    <div class="navbar-header">
                        <img src="./../../favicon.ico" alt="">
                        <a class="navbar-brand" href="#">废土战记</a>
                    </div>
                </div>
            </nav>
            
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h3 class="panel-title">菜单面板</h3>
                    </div>
                    
                    <ul class="nav nav-pills nav-stacked">
                        <div class="list-group">
                          <a class="list-group-item" href="ItemsList.html">物品装备列表</a>
                          <a class="list-group-item" href="ItemsEdit.html">新增物品装备</a>
                          <a class="list-group-item" href="MapsList.html">地图场景列表</a>
                          <a class="list-group-item" href="MapsEdit.html">新增地图场景</a>
                          <a class="list-group-item" href="EventsList.html">事件脚本列表</a>
                          <a class="list-group-item" href="EventsEdit.html">新增事件脚本</a>
                        </div>
                    </ul>
                </div>
                 
            </div>
             `;
         let style = `
            <style>
                /*body {*/
                    /*padding-top: 50px;*/
                /*}*/
            
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