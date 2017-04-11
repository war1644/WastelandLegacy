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
 * v2016/12/9 初版
 */
use App\M\JobsM;
use App\M\UsersM;
use Base\Tool\Vcode;
use Base\Tool\Page;

class PublicC extends AppC {

    public function index($param){
        return ResultFormat($param);
    }

    public function test(){
        $this->view('Base/chat.html');
    }
    /**
     * 游戏职业获取
     */
    public function jobs(){
        $job = new JobsM();
        echo ResultFormat($job->getCurr());
    }

    /**
     * 登录
     */
    public function login(){
        if (Vcode::check($_POST['vcode'])){
            $u = new UsersM();
            echo ResultFormat($u->login());
        }else{
            echo ResultFormat(['code'=>-1,'msg'=>'验证码错误']);
        }
    }

    /**
     * 注册
     */
    public function register(){
        if (Vcode::check($_POST['vcode'])){
            $u = new UsersM();
            echo ResultFormat($u->register());
        }else{
            echo ResultFormat(['code'=>-1,'msg'=>'验证码错误']);
        }
    }

    /**
     * 退出登录 ,清除 session
     */
    public function logout(){
        unset($_SESSION);
        unset($_COOKIE);
    }

    /**
     * 分页功能
     */
    public function page() {
        $page = new Page(345);
        print_r($page->show());
    }

    /**
     * 验证码功能
     */
    public function vcode() {
        $vcode = new Vcode();
        $vcode->scode();
    }

}