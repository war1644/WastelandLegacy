<?php
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * PHP框架,有了路由就有了一切
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/01/09  增加该路由防御体系(cookie,get,post),若不想防御过滤,增加第三个参数为false
 * v2017/03/09  初版
 */

use Base\Lib\Macaw;

Macaw::$error_callback = function() {
    throw new \Exception("路由无匹配项 404 Not Found",404);
};

//处理当前 URL ,匹配直接回调闭包方法，不匹配再用正则匹配，还没有就404
Macaw::dispatch();