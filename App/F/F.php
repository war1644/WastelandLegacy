<?php
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 扩展框架外的常量和方法
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/03/27 初版
 */
defined('MAP_CACHE') || define('MAP_CACHE',RUN_PATH.'Map/');

/**
 * 保存文件
 * @param $content 内容
 * @param $name 文件名
 * @param $path 路径
 */
function SaveFile($content, $name, $path='') {
    $path = UP_PATH. $path;
    if (!$name) return false;
    CheckDir($path);
    $file = $path.$name;
    return file_put_contents($file,$content);
}

function base64ToImg($base64,$name='') {
    //data:image/png;base64,asdfasdfasdf
    $tmp = explode(',',substr($base64,5),2);
    $tmp2 = explode(';',$tmp[0],2);
    $ext = explode('/', $tmp2[0],2);
    $extension = $ext[1];
    if( $extension == 'jpeg' ) $extension='jpg';
    if ($name==='') $name = date('YmdHis').RandStr(4).'.'.$extension;
    SaveFile( base64_decode($tmp[1]),$name.'.'.$extension);
    return $name;
}