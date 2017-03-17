<?php include 'head.php';?>
    <div class="container">
        <div id="dragLayer" onmouseover="actual_layer=this.id" style="position:absolute;left:0;top:0;z-index:9999">
            <div id="chat_hidden" class="hidden_layer">
                <div id="chatbox"></div>
                <form class="form-inline" onsubmit="submitChat();return false;">
                    <input type="text" class="form-control" id="msg" onkeypress="if(event.keyCode==13)submitChat();">
                    <button type="submit" class="btn btn-primary">发送</button>
                </form>
            </div>
            <div id="chat_show" style="display:inline"></div>
        </div>
    </div><!-- /.container -->

    <script>
        var WS,name;
        window.onload = function (){
            startDrag('dragLayer');
            //请求服务器握手
            WS = new WebSocket("ws://127.0.0.1:8416");
            name = prompt('来个名字吧：');
            //握手成功触发
            WS.onopen = function(){
                console.log("握手成功");
                if(WS.readyState==1){
                    WS.send(name+"加入房间");
                }
            };
            //服务器发送消息，触发
            WS.onmessage = function(e){
                //e就是服务器发送的信息
                console.log( JSON.parse(e.data) );
                //接下来爱干嘛干嘛去、
                //...code...
            };
            //出错时触发方法
            WS.onerror = function(e){
                console.log("error:"+e);
            };

            $("#basic-addon2").click(function(){

            });
        }

        function startDrag(layer_name) {
            actual_layer = layer_name;

            if ( document.all )
            {
                // 在按下鼠标按钮时启动 ma_fonction
                document.getElementById(layer_name).onmousedown = dragFunc;
            }
            else
            {
                // 在按下鼠标按钮时启动 ma_fonction
                document.getElementById(layer_name).addEventListener('mousedown', dragFunc, false);
            }
        }

        function dragFunc(e)
        {
            if ( document.all )
            {
                window.lastX = event.clientX;
                window.lastY = event.clientY;
                document.onmousemove = doDrag;
                document.onmouseup = endDrag;
            }
            else
            {
                window.lastX = e.clientX;
                window.lastY = e.clientY;
                window.onmousemove = doDrag;
                window.onmouseup = endDrag;
            }
        }

        function doDrag(e)
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

        function endDrag(e)
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

        function submitChat() {
            var msg = $("#msg").val();
            //发送消息给服务器
            WS.send(encodeURI(name+' : '+msg));
            $("#msg").val('');
        }

        function changeChatBoxState() {
            if ( chat_state == 1 )
            {
                document.getElementById('chat_hidden').innerHTML = document.getElementById('chat_show').innerHTML;
                document.getElementById('chat_show').innerHTML = '';
                document.getElementById('chat_title').innerHTML = chatbox_header.increase;
                chat_state = 0;
            }
            else
            {
                document.getElementById('chat_show').innerHTML = document.getElementById('chat_hidden').innerHTML;
                document.getElementById('chat_hidden').innerHTML = '';
                document.getElementById('chat_title').innerHTML = chatbox_header.reduce;
                chat_state = 1;
            }
        }
    </script>
<?php include 'foot.php';?>