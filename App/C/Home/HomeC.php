<?php
namespace App\C\Home;
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
 * v1.0 2017/02/26 邮件SMTP及表格导出测试
 * v0.9 2016/12/8 初版
 */
use Base\Lib\C;

class HomeC extends C{
    public function __construct() {
        parent::__construct();
        if (!Session('uid')) die();
    }


}