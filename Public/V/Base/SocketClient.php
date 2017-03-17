<!DOCTYPE html>
<html>
<head>
    <title>Console聊天室</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta charset="utf-8"/>
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap-theme.min.css">
    <script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
</head>
<body>
<div id="box" style="margin:0 auto;">
    <div class="panel panel-default">
        <div class="panel-heading"><h2>聊天室</h2><span style="color:green">(当前在线:<span id="length">0</span>人)</span></div>
        <div class="panel-body" id="body" style="height:400px;overflow-y:auto;">
        </div>
    </div>
    <div class="input-group">

    </div>
</div>
<div class="modal fade bs-example-modal-sm" data-backdrop="static" id="model" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
        <div class="input-group">
            <input type="text" class="form-control" id="name" placeholder="请输入您的昵称" aria-describedby="basic-addon3">
            <span class="input-group-addon" id="basic-addon3" style="cursor:pointer;">开始聊天</span>
        </div>
    </div>
  </div>
</div>
</body>
<script>
window.onload = function (){
    start_drag('box');
    //请求服务器握手
    var ws = new WebSocket("ws://127.0.0.1:8416");
    var name = prompt('来个名字吧：');
    //握手成功触发
    ws.onopen = function(){
        console.log("握手成功");
        if(ws.readyState==1){
            ws.send(name+"加入房间");
        }
    };
    //服务器发送消息，触发
    ws.onmessage = function(e){
        //e就是服务器发送的信息
        console.log( JSON.parse(e.data) );
        //接下来爱干嘛干嘛去、
        //...code...
    };
    //出错时触发方法
    ws.onerror = function(){
        console.log("error");
    };

    $("#basic-addon2").click(function(){
            var msg = $("#in").val();
            //发送消息给服务器
            ws.send(name+' : '+msg);
            $("#in").val('');
    });
}

function start_drag(layer_name)
{
    actual_layer = layer_name;

    if ( document.all )
    {
        // 在按下鼠标按钮时启动 ma_fonction
        document.getElementById(layer_name).onmousedown = drag_func;
    }
    else
    {
        // 在按下鼠标按钮时启动 ma_fonction
        document.getElementById(layer_name).addEventListener('mousedown', drag_func, false);
    }
}

function drag_func(e)
{
    if ( document.all )
    {
        window.lastX = event.clientX;
        window.lastY = event.clientY;
        document.onmousemove = do_drag;
        document.onmouseup = end_drag;
    }
    else
    {
        window.lastX = e.clientX;
        window.lastY = e.clientY;
        window.onmousemove = do_drag;
        window.onmouseup = end_drag;
    }
}

function do_drag(e)
{
    if ( document.all )
    {
        var difX = event.clientX - window.lastX;
        var difY = event.clientY - window.lastY;
        if ( actual_layer == 'message_layer' )
        {
            window_x += difX;
            window_y += difY;
        }
        var newX1 = parseInt(document.getElementById(actual_layer).style.left) + difX;
        var newY1 = parseInt(document.getElementById(actual_layer).style.top) + difY;
        document.getElementById(actual_layer).style.left = newX1 + 'px';
        document.getElementById(actual_layer).style.top = newY1 + 'px';
        window.lastX = event.clientX;
        window.lastY = event.clientY;
    }
    else
    {
        var difX = e.clientX - window.lastX;
        var difY = e.clientY - window.lastY;
        if ( actual_layer == 'message_layer' )
        {
            window_x += difX;
            window_y += difY;
        }
        var newX1 = parseInt(document.getElementById(actual_layer).style.left) + difX;
        var newY1 = parseInt(document.getElementById(actual_layer).style.top) + difY;
        document.getElementById(actual_layer).style.left = newX1 + 'px';
        document.getElementById(actual_layer).style.top = newY1 + 'px';
        window.lastX = e.clientX;
        window.lastY = e.clientY;
    }
}

function end_drag(e)
{
    if ( document.all )
    {
        document.onmousemove = null;
    }
    else
    {
        window.onmousemove = null;
    }
}
</script>
</html>
