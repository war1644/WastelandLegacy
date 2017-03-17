<!--
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED█WOLF☆████▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * @author 路漫漫
 * @link ahmerry@qq.com
 */
-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>404</title>
</head>
<style>
    *{
        margin: 0;
        padding: 0;

    }
    body{
        background: #000;
    }
    .box{
        width: 200px;
        height: 200px;
        margin: 200px auto 0;
        position: relative;
    }
    .box img{
        width: 200px;
        height: 200px;
    }
    .show{
        width: 200px;
        height: 200px;
        transform-style:preserve-3d;
        -webkit-animation:play 4s linear infinite;
        -moz-animation:play 2s linear infinite;
        -o-animation:play 2s linear infinite;
        -ms-animation:play 2s linear infinite;
    }
    .show div{
        width: 200px;
        height: 200px;
        position: absolute;
        top: 0;
        left: 0;
        color: #fff;
        opacity: 0.9;/*透明度为90%*/
        font-size: 100px;
        text-align: center;
        line-height: 200px;
    }
    .show div:nth-child(1){
        background: #f00;
        transform:translateZ(100px);
    }
    .show div:nth-child(2){
        background: #ff0;
        transform:translateX(100px) rotateY(90deg);
    }
    .show div:nth-child(3){
        background: green;
        transform:translateY(100px) rotateX(90deg);
    }
    .show div:nth-child(4){
        background: #f0f;
        transform:translateZ(-100px);
    }
    .show div:nth-child(5){
        background: #00f;
        transform:translateX(-100px) rotateY(90deg);
    }
    .show div:nth-child(6){
        background: pink;
        transform:translateY(-100px) rotateX(90deg);
    }

    @-webkit-keyframes play{
        0%{transform:rotateX(0deg) rotateY(0deg) rotateZ(0deg);}
        100%{transform:rotateX(360deg) rotateY(360deg) rotateZ(360deg);}
    }
    @-moz-keyframes play{
        0%{transform:rotateX(0deg) rotateY(0deg) rotateZ(0deg);}
        100%{transform:rotateX(360deg) rotateY(360deg) rotateZ(360deg);}
    }
    @-o-keyframes play{
        0%{transform:rotateX(0deg) rotateY(0deg) rotateZ(0deg);}
        100%{transform:rotateX(360deg) rotateY(360deg) rotateZ(360deg);}
    }
    @-ms-keyframes play{
        0%{transform:rotateX(0deg) rotateY(0deg) rotateZ(0deg);}
        100%{transform:rotateX(360deg) rotateY(360deg) rotateZ(360deg);}
    }
    .text{color: white;text-align: center;margin-top: 200px;font-size: 26px;}

</style>
<body>
<a href="\">
    <div class="box">
        <div class="show">
            <div>404</div>
            <div>404</div>
            <div>404</div>
            <div>404</div>
            <div>404</div>
            <div>404</div>
        </div>
    </div>
</a>
<p><?php echo $data['err'];?></p>
</body>
</html>
