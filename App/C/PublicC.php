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
use App\M\UsersM;
use Base\C;
use Base\Tool\Vcode;
use Base\Tool\Page;

class PublicC extends C {

    protected $WX;

    public function index(){

    }

    public function test(){
        echo implode(',',  array_keys(['key'=>1]) );
        $this->view();
    }

    public function run(){
        define('IS_LOGIN',true);
        $this->view('KSWechat/running');
    }


    /**
     * 登录
     */
    public function login(){
        if (Vcode::check($_POST['vcode'])){
            $u = new UsersM();
            return resFormat($u->login());
        }else{
            return resFormat(['code'=>-1,'msg'=>'验证码错误']);
        }
    }

    /**
     * 注册
     */
    public function register(){
        if (Vcode::check($_POST['vcode'])){
            $u = new UsersM();
            return resFormat($u->register());
        }else{
            return resFormat(['code'=>-1,'msg'=>'验证码错误']);
        }
    }

    /**
     * 退出登录 ,清除 session
     */
    public function logout(){

    }



    /**
     * 微信debug调试回调方法
     * 方法名在config定义
     */
    public static function wxDebug($text){
        MFLog($text,'WxDebug','Wechat/');
    }

    //接收微信
    public function wechat(){
        new WechatC();
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