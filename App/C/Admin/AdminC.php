<?php
namespace App\C\Admin;
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * demo 示例
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2016/12/09 初版
 */
use Base\Lib\C;
class AdminC extends C {
    function __construct() {
        if (!defined('IS_ADMIN') || !IS_ADMIN || !Session('ADMIN')){
            die();
        }
    }

}