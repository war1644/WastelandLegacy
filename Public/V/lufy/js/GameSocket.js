/**
 * Created by 路漫漫.
 * Link: ahmerry@qq.com
 * Date: 2017/7/23 13:26
 *
 */
let socket,gameInfo = $(".information");
let GameSocket = {

    sendMsg:(text)=> {
        if (socket.readyState === WebSocket.OPEN) {
            let value = $('#userMsg').val();
            if (value) {
                $('#userMsg').val('');
                let text = "<li>" + value + "</li>" + $('.information').html();
                $('.information').html(text);
            }
            let to = document.getElementById("to").value;
            let msg = document.getElementById("message").value;
            socket.wlSend('talk', {target: to, msg: msg});
            document.getElementById("message").value = "";
        } else {
            alert('连接服务器失败。');
        }
    },

    doOpen:()=> {
        if (document.querySelector('#name').value == "") {
            alert('请输入用户姓名。');
            return;
        }
        socket = new WebSocket("ws://127.0.0.1:2416");
        socket.onopen = function () {
            console.log("握手成功");
            if (socket.readyState == 1) {
                selfName = document.getElementById("name").value;
                socket.wlSend('login');
            }
        };
        socket.onmessage = function (e) {
            let data = JSON.parse(e.data);
            console.log(data);
            haveMsg(data);
        };
        socket.onerror = function (e) {
            console.log('err', e);
        };
        socket.onclose = function (e) {
            msg.innerHTML = "<li>服务器断开</li>" + msg.innerHTML;
            document.getElementById("name").disabled = false;
            document.getElementById("openbtn").disabled = false;
            document.getElementById("closebtn").disabled = true;
        };
//            msg.innerHTML = "<li>连接服务器成功</li>" + msg.innerHTML;
        document.getElementById("name").disabled = true;
        document.getElementById("openbtn").disabled = true;
        document.getElementById("closebtn").disabled = false;
        //addTank("vvv",100,200,"left","#000000");
    },

    haveMsg:(value)=> {
        let text;
        switch (value["type"]) {
            case "error":
                text = "<li>" + value["error"] + "</li>" + msg.innerHTML;
                break;
            case "login":
                document.getElementById("name").value = value["name"];
                text = "<li>" + "登录成功" + "</li>" + msg.innerHTML;
                socket.wlSend(
                    'addUser',
                    {x:1, y:1, direction:1}
                );
                break;
            case "talk":
                text = "<li>" + value["msg"] + "</li>" + msg.innerHTML;
                break;
            case "removeUser":
                removeUser(value["name"]);
                break;
            case "setUserList":
                removeAllUser();
                let list = value["list"];
                for (let i in list) {
                    addUser(list[i]);
                }
                break;
            case "addTank":
                addTank(value["name"], value["x"], value["y"], value["direction"], value["color"]);
                break;
            case "move":
                move(value["name"], value["x"], value["y"]);
                break;
            case "shoot":
                shoot(value["name"], value["direction"]);
                break;
            case "kill":
                kill(value["killName"]);
                break;

        }
        if (text) msg.innerHTML = text;
    }

};
$(".gameMsg").click(function(){
    if($(this).data("num")){
        $(this).data("num" , 0);
        $("#box").css({"width":"100px","height":"50px"});
        $(".information").hide();
        $(".footBtn").hide();
    }else {
        $(this).data("num" , 1);
        $("#box").css({"width":"300px","height":"316px"});
        $(".information").show();
        $(".footBtn").show();
    }
});

$('#send').click(function () {
    GameSocket.sendMsg();
});


$("#box").on("mousedown touchstart" , function (ev) {
    let box,leftMouse,topMouse;
    ev = ev || event;
    box = ev.currentTarget;
    if(ev.clientX == undefined || ev.clientY == undefined ){
        leftMouse= parseInt(ev.changedTouches[0].clientX) - box.offsetLeft;
        topMouse = parseInt(ev.changedTouches[0].clientY) - box.offsetTop;
    }else {
        leftMouse= ev.clientX - box.offsetLeft;
        topMouse = ev.clientY - box.offsetTop;
    }
    $(document).on("mousemove touchmove" , function (ev){
        ev = ev || event ;
        let boxLeft, boxTop;
        if(ev.clientX == undefined || ev.clientY == undefined ){
            boxLeft= parseInt(ev.changedTouches[0].clientX) - leftMouse;
            boxTop = parseInt(ev.changedTouches[0].clientY) - topMouse;
        }else {
            boxLeft = ev.clientX - leftMouse;
            boxTop = ev.clientY - topMouse;
        }
        if(boxLeft > window.innerWidth || boxLeft<0){
            return false;
        }
        if(boxTop > window.innerHeight || boxTop<0){
            return false;
        }
        box.style.left = boxLeft  + 'px';
        box.style.top = boxTop  + 'px';
    })
});

$("#box").on("mouseup touchend" , function(){
    $(document).off("mousemove touchmove" , null);
});