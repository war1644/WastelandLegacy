<?php
namespace Base\Tool;

use App\C\User;

/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED█WOLF☆████▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * WebSocket工具类，PHP跟websocket交互咋就这么泪奔呢？
 * 客户端在Public/V/Base
 * 调用示例：
 * new WebSocket('127.0.0.1',2416);
 * @param $address 连接地址
 * @param $port 端口
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/04/12      增加对客户端信息的转发处理
 * v2017/04/08      增加发送到指定客户端
 *                  改进CPU占用99%的问题
 *                  单例模式，感觉用处不大
 * v2017/01/17      初版
 */

class TankWebSocket {
    private $sockets;//socket数组
    private $users;
    private $userName=[];
    private $master;
    private static $obj = null;

    //关闭clone
    private function __clone() {}

    private function __construct($address, $port){
        //$cfg = Config('socket');后期读取配置host,端口
        //开启端口，并监听
        $this->master=$this->openSocket($address, $port);
        $this->sockets=['s'=>$this->master];
        $this->run();
    }

    public static function ins($address, $port){
        if (self::$obj===null){
            self::$obj = new self($address, $port);
        }
        return self::$obj;
    }

    private function run(){
        while(true){
            //拿所有的连接
            $changes=$this->sockets;
            $null = null;
            socket_select($changes,$null,$null,0);

            //遍历连接
            foreach($changes as $sock){
                if($sock==$this->master){
                    //接受一个Socket连接
                    $client=socket_accept($this->master);
                    //把该连接存到数组
                    $this->sockets[]=$client;
                    //给该连接一个识别符
                    $this->users[]=[
                        'socket'=>$client,
                        'isShakeHand'=>false
                    ];
                }else{
                    //从连接里拿出请求信息
                    $len = socket_recv($sock,$buffer,2048,0);
                    $user = $this->search($sock);
                    if($len<7){
                        $this->close($sock,$user);
                        continue;
                    }
                    if(!$this->users[$user]['isShakeHand']){
                        //先握手
                        $this->woshou($user,$buffer);
                    }else{
                        //握手后，处理请求数据
                        $buffer = $this->uncode($buffer);

                        $result = $this->notify($buffer,$user);
                        if (!$result) continue;

//                        if ($result === -233){
//                            $this->close($sock,$user);
//                        }else{
//                            if (!$result) $result = $buffer;
                            $this->e($result);
                            //返给指定客户端
//                            $this->send($result,$user);
                            //返回给所有客户端
                            $this->send($result);
//                        }
                    }
                }
            }
            //避免对锁，cpu占用99%等
            usleep(100);
        }
    }

    //关闭连接
    private function close($sock,$user){
        socket_close($sock);
        $name = $this->userName[$user];
        $this->e("$user,$name 的连接关闭");
        unset($this->sockets[$user],$this->users[$user],$this->userName[$user]);
        $this->send(['msg'=>'','name'=>$name,'type'=>'removeUser']);
        $this->send(['code'=>1,'msg'=>"玩家【 $name 】下线",'type'=>'talk']);
    }

    //获取发送socket的客户端
    private function search($sock){
        foreach ($this->users as $k=>$v){
            if($sock==$v['socket'])
                return $k;
        }
        return false;
    }
    //建立端口监听
    private function openSocket($address,$port){
        $server = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        //阻塞模式
        //        socket_set_block($server);
        socket_set_option($server, SOL_SOCKET, SO_REUSEADDR, 1);
        socket_bind($server, $address, $port);
        socket_listen($server);
        $this->e('socket服务已开启 : '.date('Y-m-d H:i:s'));
        $this->e('开始监听 : '.$address.' ,端口 : '.$port);
        return $server;
    }

    //php的websocket特殊处理,比起node.js哎,说多了都是泪
    private function woshou($k,$buffer){
        $buf  = substr($buffer,strpos($buffer,'Sec-WebSocket-Key:')+18);
        $key  = trim(substr($buf,0,strpos($buf,"\r\n")));

        $new_key = base64_encode(sha1($key."258EAFA5-E914-47DA-95CA-C5AB0DC85B11",true));

        $new_message = "HTTP/1.1 101 Switching Protocols\r\n";
        $new_message .= "Upgrade: websocket\r\n";
        $new_message .= "Sec-WebSocket-Version: 13\r\n";
        $new_message .= "Connection: Upgrade\r\n";
        $new_message .= "Sec-WebSocket-Accept: " . $new_key . "\r\n\r\n";
        //告诉客户端握手成功
        socket_write($this->users[$k]['socket'],$new_message,strlen($new_message));
        $this->users[$k]['isShakeHand']=true;
        return true;
    }

    //帧数据解码,php在流泪
    private function uncode($str){
        $mask = array();
        $data = '';
        $msg = unpack('H*',$str);
        $head = substr($msg[1],0,2);
        if (hexdec($head{1}) === 8) {
            $data = false;
        }else if (hexdec($head{1}) === 1){
            $mask[] = hexdec(substr($msg[1],4,2));
            $mask[] = hexdec(substr($msg[1],6,2));
            $mask[] = hexdec(substr($msg[1],8,2));
            $mask[] = hexdec(substr($msg[1],10,2));

            $s = 12;
            $e = strlen($msg[1])-2;
            $n = 0;
            for ($i=$s; $i<= $e; $i+= 2) {
                $data .= chr($mask[$n%4]^hexdec(substr($msg[1],$i,2)));
                $n++;
            }
        }
        return $data;
    }

    //帧数据编码（发回客户端用），php还是在流泪
    private function code($msg){
        $msg = json_encode($msg,JSON_UNESCAPED_UNICODE);
        $msg = preg_replace(array('/\r$/','/\n$/','/\r\n$/',), '', $msg);
        $frame = array();
        $frame[0] = '81';
        $len = strlen($msg);
        $frame[1] = $len<16?'0'.dechex($len):dechex($len);
        $frame[2] = $this->ord_hex($msg);
        $data = implode('',$frame);
        return pack("H*", $data);
    }
    private function ord_hex($data)  {
        $msg = '';
        $l = strlen($data);
        for ($i= 0; $i<$l; $i++) {
            $msg .= dechex(ord($data{$i}));
        }
        return $msg;
    }

    //编码后发回到客户端
    //$user为客户端识别
    private function send($msg,$user=null){
        $msg = $this->code($msg);
        if (is_null($user)){
            foreach($this->users as $v){
                //发送给所有客户端
                socket_write($v['socket'],$msg,strlen($msg));
            }
        }else{
            //发送给指定客户端
            socket_write($this->users[$user]['socket'],$msg,strlen($msg));
        }
    }

    //通知对应控制器处理
    private function notify($msg='',$key){
        $info = json_decode($msg,true);
        switch($info["type"]){
            case "login":
                if (in_array($info["name"],$this->userName)){
                    $info['msg'] = '重复登录';
                    $info['code'] = -1;
                }else{
                    $this->userName[$key] = $info["name"];
                    $user = new User();
                    $user->name = $info["name"];
                    $this->users[$key]['obj'] = $user;
                    $info['msg'] = '登录成功';
                    $info['code'] = 1;
                    $this->send($info,$key);
                }
                $this->send(['type'=>'setUserList','list'=>$this->userName]);
                $this->send(['type'=>'talk','msg'=>"玩家【$info[name]】进入游戏"]);
                return false;
                break;
            case "talk":
                if($info['target'] == null) return false;
                if($info['target'] != "all"){
                    $k = array_search($info['target'],$this->userName);
                    if (!is_numeric($k)) return false;
                    $this->send($info,$k);
                }
                break;
            case "addTank":
                foreach ($this->users as $v){
                    //把已经在线的玩家发送给当前登录玩家
                    $obj = $v['obj'];
                    if ($obj->name==$info['name'])continue;
                    $add['name'] = $obj->name;
                    $add['x'] = $obj->x;
                    $add['y'] = $obj->y;
                    $add['color'] = $obj->color;
                    $add['direction'] = $obj->direction;
                    $add['type'] = 'addTank';
                    $this->send($add,$key);
                }
                //把登录玩家推送给所有玩家
                $user = $this->users[$key]['obj'];
                $user->x = $info['x'];
                $user->y = $info['y'];
                $user->color = $info['color'];
                $user->direction = $info['direction'];
                $this->send($info);
                return false;
                break;
            case "move":
                break;
            case "shoot":
                break;
        }
        return $info;
    }

    //记录到log
    private function e($str){
        MFLog($str,'socket');
    }
}

