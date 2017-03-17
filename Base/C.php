<?php
namespace Base;
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 变量输出
 * 视图引入
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v1.2 2017/03/08   扩展view的后缀支持（.php,.html,自定）
 * v1.1 2016/12/13   简化view方法为一个
 * v1.0 2016/12/12   增加默认视图
 * v0.9 2016/12/08   初版
 */

class C {
    protected $m = null;
    public $method = null;
    /**
     * 载入视图,输出变量到视图
     * @param $template 视图文件名,若为空则为方法名
     * @param $data 输出到视图的变量
     * @param $path 视图路径
     */
    public function view($template='',$data='') {
        //数据输出到view
        if (!isset($data['title'])){
            $data['title'] = '废土战记';
        }

        //载入view
        if (!$template){
            $template = $this->method;
            if (file_exists(V_PATH.$template . '.php')){
                include V_PATH.$template . '.php';
            }else{
                include V_PATH.$template . '.html';
            }
        }else{
            //引入视图
            include V_PATH.$template;
        }

    }
}