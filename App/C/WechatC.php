<?php
namespace App\C;
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 微信相关处理类demo 示例
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v1.1 2017/03/02 微信智能设备相关处理
 * v1.0 2017/02/26 Oauth授权处理
 * v0.9 2016/12/08 初版
 */
use Base\C;
use Base\Tool\MFWechat;
use Base\Tool\Wechat\Wechat;

class WechatC extends C {

    protected $WX;
    protected $jsApi;
    protected $userInfo;
    const DEBUG = true;

    public function __construct() {
        MFLog('收到微信请求');
        if (!$this->WX) {
            $option = Config('wx');
            if (REDIS){
                $this->WX = new MFWechat($option);
            }else{
                $this->WX = new Wechat($option);
                
                if (!$this->WX->getCache($this->WX->tokenName))
                    //获取access_token,并进行全局缓存
                    $this->WX->checkAuth();
                
            }
        }
//        $this->WX->valid();
        //处理请求内容
        $this->receiveEvent();

        //开启JSAPI
        $this->jsApi();
    }

    /**
     * 微信debug调试回调方法
     * 方法名在config定义
     */
    public static function wxDebug($text){
        MFLog($text,'WxDebug','Wechat/');
    }

    public function auth(){
        MFLog('auth完成');
    }

    public function setMenu(){

        //设置菜单
        $buttons =  [
            ['type'=>'view','name'=>'连接智能设备','url'=>'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6834f279296c34e2&redirect_uri=http%3A%2F%2Fwx.duanxq.cn%2FWechat%2FgetKSUserInfo&response_type=code&scope=snsapi_userinfo&state='],
            [
                'name'=>'智能设备', 'sub_button'=>[
                    ['type'=>'view','name'=>'已绑设备','url'=>'https://hw.weixin.qq.com/devicectrl/panel/device-list.html?appid=wx6834f279296c34e2'],
                ]
            ],
            [
                'name'=>'页面测试', 'sub_button'=>[
                    ['type'=>'view','name'=>'test','url'=>'http://wx.duanxq.cn/Wechat/test'],
                ]
            ]
        ];
        Dump($this->WX->createMenu($buttons));
    }

    //接收微信信息
    protected function receiveEvent() {
        if ($_REQUEST) {
            $type = $this->WX->getRev()->getRevType();
            switch ( $type ) {
                case Wechat::MSGTYPE_TEXT:
                    $this->WX->text( "欢迎来到KS智能设备世界" )->reply();
                    break;
                case Wechat::MSGTYPE_EVENT:
                    $event = $this->WX->getRevEvent();
                    $this->wxDebug('收到微信事件 : '.json_encode($event));
                    break;
                case Wechat::MSGTYPE_BIND:
                    $event = $this->WX->getRevDevice();
                    $this->wxDebug('收到微信绑定事件 : '.json_encode($event));
                    break;
                default:
                    if (self::DEBUG) {
                        $this->wxDebug("收到微信请求 : ".json_encode($_REQUEST)."\n数据 : ".json_encode($this->WX->getRevData()));
                    }
                    if (isset($_REQUEST['code'])){
                        $this->WX->getOauthAccessToken();
                        $this->userInfo = $this->WX->getOauthUserinfo();
                    }
                    $this->WX->text( "help info" )->reply();
                    break;
            }
            MFLog('响应微信完成');
        }
    }

    protected function jsApi() {
        $tick = $this->WX->getJsTicket();
        if (!$tick) {
            echo $tmp = "\n获取js_ticket失败<br>";
            echo $errCode = "\n错误码：".$this->WX->errCode;
            echo $errCode = "\n错误原因：".ErrCode::getErrText($this->WX->errCode);
            MFLog($tmp.$errCode.$errCode);
            exit;
        }
        $this->jsApi = $this->WX->getJsSign();
    }

    /**
     * 排行榜
     * @return Wechat
     */
    public function getCode() {
        $redirect_uri = 'http://wx.duanxq.cn/Wechat/getKSUserInfo';
        $url = $this->WX->getOauthRedirect($redirect_uri);
        Dump($url);
    }

    /**
     * 获取用户信息
     * @return Wechat
     */
    public function getKSUserInfo() {
        $userInfo = $this->userInfo;
        $arr = Session($userInfo['unionid']);
        if (!$arr){
            $jsonData = json_encode([
                "service"=>"user.weixin",
                "wx_openid"=>$userInfo['openid'],
                "wx_unionid"=>$userInfo['unionid'],
                "brand"=>"wechat",
                "wx_nickname"=>$userInfo['nickname'],
                "avatar"=>$userInfo['headimgurl'],
            ]);
            $res = PostMan(API_URL,$jsonData);
            $res = json_decode($res,true);
            if ($res['ret']==200){
                $arr = ['ksid'=>$res['data']['info']['ksid'],'uid'=>$userInfo['unionid'],'oid'=>$userInfo['openid']];
                Session($userInfo['unionid'],json_encode($arr));
                $this->endRun($arr);
            }else{
                Dump('服务器获取信息失败,请刷新页面');
            }
        }else{
            $this->endRun(json_decode($arr,true));
        }
        //https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6834f279296c34e2&redirect_uri=http%3A%2F%2Fwx.duanxq.cn%2FWechat%2FgetKSUserInfo&response_type=code&scope=snsapi_userinfo&state=
        //https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx91e7b6ade546e6a4&redirect_uri=http%3A%2F%2Fwx.duanxq.cn%2FWechat%2FgetKSUserInfo&response_type=code&scope=snsapi_userinfo&state=

    }

    /**
     * 排行榜
     * @return Wechat
     */
    public function ranking() {
        $url = $this->WX->getRanking();
//        $data['title'] = 'KS,为跑步而生';
//        $data['jsSign'] = $this->jsApi;
//        $this->view('KSWechat/device',$data);
    }
    
    /**
     * 跑步机交互页
     * @return Wechat
     */
    public function test() {
        $data['title'] = 'KS,为跑步而生';
        $data['jsSign'] = $this->jsApi;
        $this->view('KSWechat/device.php',$data);
    }

    /**
     * 绑定跑步机
     * @return Wechat
     */
    public function bindDevice() {
        $data['title'] = 'KS,为跑步而生';
        $postData = [
            "ticket"=> $_POST['ticket'],
            "device_id"=> $_POST['deviceId'],
            "openid"=> $_POST['oid'],
        ];
        echo $this->WX->bindDevice($postData);
    }

    /**
     * 连接跑步机页面
     * @return Wechat
     */
    public function index() {
        $data['title'] = 'KS,为跑步而生';
        $data['jsSign'] = $this->jsApi;
        $this->view('KSWechat/endRunning.php',$data);
    }

    /**
     * 连接跑步机页面
     * @return Wechat
     */
    public function endRun($arr) {
        $data['title'] = 'KS,为跑步而生';
        $data['jsSign'] = $this->jsApi;
        $data['ksid'] = $arr['ksid'];
        $data['oid'] = $arr['oid'];
        $this->view('KSWechat/endRunning.php',$data);
    }

    /**
     * 循环添加mac
     * @return Wechat
     */
    public function addMac() {
        return;
        $log = [];
        for ($i=9;$i<=19;$i++){

            $mac = dechex($i);
            if (strlen($mac)==1){
                $mac = "0$mac";
            }
            $name = strtoupper($mac);
            $data = [
                "device_num"=>"1",
                "device_list"=>[[
                    "id"=>"KSP1V1-$name",
                    "mac"=>"14580f0000$mac",
                    "connect_protocol"=>"3",
                    "auth_key"=>"",
                    "close_strategy"=>"2",
                    "conn_strategy"=>"1",
                    "crypt_method"=>"0",
                    "auth_ver"=>"0",
                    "manu_mac_pos"=>"-1",
                    "ser_mac_pos"=>"-2"
                ]],
                "product_id"=>"27569"
            ];
            if ($this->WX->addDeviceMac($data)){
                $log[$i] = "$mac 添加成功";
            }else{
                $log[$i] = "$mac 添加失败";
                $data = [
                    "device_num"=>"1",
                    "device_list"=>[[
                        "id"=>"KSP1V1-$name",
                        "mac"=>"14580f0000$mac",
                        "connect_protocol"=>"3",
                        "auth_key"=>"",
                        "close_strategy"=>"2",
                        "conn_strategy"=>"1",
                        "crypt_method"=>"0",
                        "auth_ver"=>"0",
                        "manu_mac_pos"=>"-1",
                        "ser_mac_pos"=>"-2"
                    ]],
                    "product_id"=>"27569",
                    "op_type"=>"1"

                ];
                if ($this->WX->addDeviceMac($data)){
                    $log[$i] = "$mac 添加成功";
                }else{
                    $log[$i] = "$mac 添加失败";
                }
            }
        }
        MFLog($log);
    }



}