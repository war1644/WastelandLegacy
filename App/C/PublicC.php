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
use App\M\EventsM;
use App\M\JobsM;
use App\M\MapsM;
use App\M\TilesetsM;
use App\M\UsersM;
use Base\Tool\TileMapProcess;
use Base\Tool\Vcode;
use Base\Tool\Page;

class PublicC extends AppC {

    public function upload(){

    }

    public function getEventTest(){
        $id = intval($_GET['testEventId']);
        $event = new EventsM(2);
        $eventTestData = [
            //对话事件测试
            '[[1,["呜呜...儿子啊，为什么你要一个人去讨伐山贼们呢"]],[1,["这位勇士，求求你，救救我的儿子吧"]],[-1,[]]]',
            //传送事件测试
            '[[2,[41,6,14,0]],[-1,[]]]',
            //玩家选择事件测试
            '[[1,["喝水吗？"]],[3,["choix",["是","否"]]],[0,["choix",1,false,0]],[1,["你喝了一口水，清凉的水里微微带着一丝甜意"]],[1,["你的口不渴了"]],[0,[false]],[0,[false,false]],[-1,[]]]'
        ];

        //传送事件测试
        $script = json_decode($eventTestData[$id],true);
        $result = $event->execScript($script);
        if ($result){
            echo $result;
        }else{
            echo ResultFormat(['code'=>-1]);
        }
    }

    public function getMap(){
        $respond = ['code' => -1, 'msg' => '无效数据'];
        if (!isset($_POST['uid'])) return $respond;
        $u = new UsersM();
        $mapId = $u->userInfo($_POST['uid'],'mapId')['mapId'];
        if ($mapId) {
            $map = new MapsM();
            $result = $map->getMap($mapId);
            if (!$result['code']) return $respond;
            echo ResultFormat(file_get_contents(RUN_PATH."Assets/$result[data][name].json"));
        } else {
            return $respond;
        }
    }
    public function getMapTest() {
        $mapId = intval($_GET['mapId']);
        echo ResultFormat( file_get_contents(V_PATH . "Static/assets/home$mapId.json"));

    }

    public function test(){
        if ($_POST['textScript']){
            $event = new EventsM();
            list($compiled, $result) = $event->enScript($_POST['textScript']);
            MFLog($result);
        }

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
//        if (Vcode::check($_POST['vcode'])){
            $u = new UsersM();
            echo ResultFormat($u->login());
//        }else{
//            echo ResultFormat(['code'=>-1,'msg'=>'验证码错误']);
//        }
    }

    /**
     * 注册
     */
    public function register(){
//        if (Vcode::check($_POST['vcode'])){
            $u = new UsersM();
            echo ResultFormat($u->register());
//        }else{
//            echo ResultFormat(['code'=>-1,'msg'=>'验证码错误']);
//        }
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