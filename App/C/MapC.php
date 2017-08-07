<?php
namespace App\C;
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 客户端访客类
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @since
 * v2017/04/08 初版
 */

namespace App\C;
use App\M\MapsM;

class MapC extends AppC{
    public function index(){
        $m = new MapsM();
        echo ResultFormat($m->getList());
    }

    public function edit(){
        if(!isset($_POST['name'])) die();
        $m = new MapsM();
        if(isset($_POST['id'])){
            $result = $m->save();
        }else{
            $result = $m->add($_POST);
        }
        echo ResultFormat($result);
    }
}