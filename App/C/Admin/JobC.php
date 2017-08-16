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

namespace App\C\Admin;
use App\M\JobsM;

class JobC extends AdminC{
    public function index(){
        $m = new JobsM();
        if(isset($_GET['id'])){
            echo ResultFormat($m->find($_GET['id']));
        }else{
            echo ResultFormat($m->getList());
        }
    }

    public function edit(){
        if(!isset($_POST['name'])) die();
        $m = new JobsM();
        if(isset($_POST['id'])){
            $result = $m->save(     $_POST);
        }else{
            $result = $m->add($_POST);
        }
        echo ResultFormat($result);
    }

    public function drawCurve(){
        $function = $_GET['curve'];
        $level = 1;
        $curve = [];
        $type = $_GET['type'];
        $function = str_replace('Math.', '', $function);
        while ( $level < 100 ){

            eval('$curve[$level] = '.str_replace('lv', $level, $function).';');
            if($level===1){
                $level_1 = $curve[$level];
            }
            if($level===99){
                $level_99 = $curve[$level];
            }
            $level++;
        }

        $max = max($curve);
        $divide = 1;
        while ( ($max / $divide) + 1 > 399 ){
            $divide++;
        }

        $width = 850;
        $height = 550;
        $max = 450;

        $picture = imagecreate($width, $height);
        $white = imagecolorallocate($picture, 255, 255, 255); // background
        $black = imagecolorallocate($picture, 0, 0, 0);
        $gray = imagecolorallocate($picture, 128, 128, 128);

        switch($type){
            case 'maxHpCurve':
            case 'attackCurve':
            case 'defendCurve':
                $color = imagecolorallocate($picture, 255, 0, 0);
                imagestring($picture, 5, 25, 25, $type, $color);
                break;
            case 'driveCurve':
            case 'speedCurve':
                $color = imagecolorallocate($picture, 0, 0, 255);
                imagestring($picture, 5, 25, 25, $type, $color);
                break;
            case 'maxExpCurve':
                $color = imagecolorallocate($picture, 0, 180, 0);
                imagestring($picture, 5, 25, 25, $type, $color);
                break;
            default:
                $color = $gray;
                break;

        }

        foreach ( $curve as $key => $val )
        {
            $val = ceil($val / $divide) + 1;
            imagerectangle($picture, $key * 8 + 5, $max - $val, $key * 8 + 8, $max, $color);
            imagerectangle($picture, $key * 8 + 6, $max - $val + 1, $key * 8 + 7, $max - 1, $color);
        }

        imagestring($picture, 5, 25, $max + 15, $level_1 . ' -> ' . $level_99, $black);
        imagestring($picture, 5, 25, $max + 30, $function, $gray);

        header('Content-type: image/png');
        imagepng($picture);
        imagedestroy($picture);
    }
}