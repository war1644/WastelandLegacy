<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta name="description" content="废土战记">
    <meta name="author" content="路漫漫">
    <title>Title</title>
    <script src="http://cdn.bootcss.com/jquery/3.1.1/jquery.min.js"></script>
</head>
<style>
    @keyframes aniMove{
        100%{background-position-x:72px;}
    }

    @keyframes aniFrame{
        100%{background-position-x:72px;}
    }

    #sprite {
        width: 24px;
        height: 24px;
        background-image: url("images/charasets/NPC (6).png");
        animation: aniMove steps(3,end) 0.3s infinite;
        animation-play-state:paused;
    }

</style>
<body>
<!--<div id="sprite"></div>-->
<!--<button id="restart" onclick="reset();">重新开始</button>-->

</body>
<script src="javascript/mapTest.js"></script>
<script src="javascript/resources.js"></script>
<script src="javascript/sprite.js"></script>


<script>
    var eventData=[],
        netPlayersInMap=[],
        netPlayers=[],
        backgroundImgUrl=[],
        mapPass=[],
        mapWidth,
        mapHeight,
        tileSize=24,
        img,
        mapSize = {x:0,y:0},
        urlArr = [];

    //地图
    <?php foreach ( $data['mapImg'] as $v){ ?>
        urlArr.push('<?php echo $v; ?>');
    <?php } ?>
    urlArr.push('images/charasets/<?php echo $data['pageVar']['CHARASET']; ?>');

    //地图碰撞标识
    <?php
        foreach ( $data['downMapPass'] as $v) {
            if ($v['x'] == 0) echo "mapPass[$v[y]] = [];";
            echo "mapPass[$v[y]][$v[x]] = $v[pass];";
        }

        foreach ( $data['upMapPass'] as $v){
            if(!$v['pass']){
                echo "mapPass[$v[y]][$v[x]] = $v[pass];";
            }
        }

        foreach ( $data['eventData'] as $v){
            echo "addEvent($v[id], $v[x], $v[y], $v[layer], $v[width], $v[height], '$v[picUrl]', $v[dir]);";
        }

        foreach ( $data['players'] as $v){
            echo "addPlayer($v[id],'$v[name]', '$v[charaset]', $v[y], $v[x], $v[y], $v[layer], '$v[charaset]', $v[dir]);";
        }
    ?>



    //加载资源
    resources.load(urlArr);
    resources.onReady(init);

    function init() {
        img = resources.get();
        console.log(img);
        mapHeight = img[urlArr[0]].height;
        mapWidth = img[urlArr[0]].width;
        mapSize.x = mapWidth/tileSize;
        mapSize.y = mapHeight/tileSize;
        lastTime = Date.now();
        createCanavs();
        main();
    }

    // 页面重绘前，通知浏览器调用一个指定的函数
    // 具体看https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
    var requestAnimFrame = (function(){
        return window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback){
                window.setTimeout(callback, 1000 / 60);//一秒60帧
            };
    })();
    var canvas,canvas2,ctx,ctx2,terrainPattern,terrainPattern1,terrainPattern2;
    function createCanavs() {
        // Create the canvas
        canvas = document.createElement("canvas");
        canvas2 = document.createElement("canvas");
        ctx = canvas.getContext("2d");
        ctx2 = canvas2.getContext("2d");
        canvas2.width = canvas.width = mapWidth;
        canvas2.height = canvas.height = mapHeight;
        document.body.appendChild(canvas);
        document.body.appendChild(canvas2);
        $(canvas).css({
            "position": "absolute",
            "z-index": 1
        });
        $(canvas2).css({
            "position": "absolute",
            "z-index": 1
        });

        terrainPattern  = ctx.createPattern(img[urlArr[0]],'no-repeat');
        terrainPattern1  = ctx.createPattern(img[urlArr[1]],'no-repeat');
        terrainPattern2  = ctx.createPattern(img[urlArr[2]],'no-repeat');

        ctx2.fillStyle = terrainPattern1;
        ctx2.fillRect(0, 0, mapWidth, mapHeight);

    }

    // The main game loop
    var lastTime;
    function main() {
        var now = Date.now();
        var dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;
        requestAnimFrame(main);
    }

    // Game state
    var player = {
        pos: [0, 0],
        p: {x:0,y:0},
        dir:1,
        sprite: new Sprite(urlArr[3], [0, 0], [tileSize,tileSize], 10, [0, 1, 2, 3])
    };

    var gameTime = 0;
    var playerSpeed = 100;

    function update(dt) {
        gameTime += dt;
        handleInput(dt);
        player.sprite.update(dt);
    }


    function handleInput(dt) {
        if (input.isDown('DOWN') || input.isDown('s')) {
            player.sprite.running = true;
            player.sprite.pos = [0, 0 * tileSize];
            player.dir = 1;
            var isMove = checkCollisions(player.p.x, player.p.y + tileSize,1);
            if (isMove) {
                player.p.y += playerSpeed * dt;
//                $("#sprite").css({
//                    "background-position-y": "0px",
//                    "animation-play-state": "running"
//                });
            }
        }

        if (input.isDown('LEFT') || input.isDown('a')) {
            player.sprite.running = true;
            player.sprite.pos = [0, 1 * tileSize];
            player.dir = 2;
            var isMove = checkCollisions(player.p.x - tileSize, player.p.y,2);
            if (isMove) {
                player.p.x -= playerSpeed * dt;
//                $("#sprite").css({
//                    "background-position-y": "72px",
//                    "animation-play-state": "running"
//                });
            }
        }

        if (input.isDown('RIGHT') || input.isDown('d')) {
            player.dir = 3;
            player.sprite.running = true;
            player.sprite.pos = [0, 2 * tileSize];
            var isMove = checkCollisions(player.p.x + tileSize, player.p.y,3);
            if (isMove) {
                player.p.x += playerSpeed * dt;
//                $("#sprite").css({
//                    "background-position-y": "48px",
//                    "animation-play-state": "running"
//                });
            }
        }

        if (input.isDown('UP') || input.isDown('w')) {
            player.dir = 4;
            player.sprite.running = true;
            player.sprite.pos = [0, 3 * tileSize];
            var isMove = checkCollisions(player.p.x, player.p.y - tileSize,4);
            if (isMove) {
                player.p.y -= playerSpeed * dt;
//                $("#sprite").css({
//                    "background-position-y": "24px",
//                    "animation-play-state": "running"
//                });
            }
        }

        if (input.isDown('SPACE') || input.isDown('ENTER')) {
//            player.dir
        }


    }

    // Draw everything
    function render() {
        ctx.fillStyle = terrainPattern;
        ctx.fillRect(0, 0, mapWidth, mapHeight);
        ctx.fillStyle = terrainPattern2;
        ctx.fillRect(0, 0, mapWidth, mapHeight);
        renderEntity(player);
        renderEntities(eventData);
    }

    function renderEntities(list) {
//        var len = list.length;
//        for(var i=0; i<len; i++) {
//            renderEntity(list[i]);
//        }
        for (var k in list) {
            renderEntity(list[k]);
        }
    }

    function renderEntity(entity) {
        ctx.save();
        ctx.translate(entity.p.x, entity.p.y);
        entity.sprite.render(ctx);
        ctx.restore();
    }



</script>
<script src="javascript/input.js"></script>
<script src="javascript/collision.js"></script>
</html>