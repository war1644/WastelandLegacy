<?php
namespace Base\Tool;
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
 * new WebSocket('127.0.0.1',8416);
 * @param $address 连接地址
 * @param $port 端口
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v0.9 2017/01/17   初版
 */

class WebSocket {
    private $sockets;//socket数组
    private $users;
    private $master;

    public function __construct($address, $port){

        //开启端口，并监听
        $this->master=$this->WebSocket($address, $port);
        $this->sockets=array('s'=>$this->master);
        $this->run();
    }

    public function run(){
        while(true){
            //拿所有的连接
            $changes=$this->sockets;
            socket_select($changes,$write,$except,0);
            //遍历连接
            foreach($changes as $sock){
                if($sock==$this->master){
                    //接受一个Socket连接
                    $client=socket_accept($this->master);
                    //把该连接存到数组
                    $this->sockets[]=$client;
                    //给该连接一个识别符
                    $this->users[]=array(
                        'socket'=>$client,
                        'isShakeHand'=>false
                    );
                }else{
                    //从连接里拿出请求信息
                    $len = socket_recv($sock,$buffer,2048,0);
                    $k = $this->search($sock);
                    if($len<7){
                        $this->close($sock);
                        continue;
                    }
                    if(!$this->users[$k]['isShakeHand']){
                        //先握手
                        $this->woshou($k,$buffer);
                    }else{
                        //握手后，处理请求数据
                        $buffer = $this->uncode($buffer);
                        //推送给所有客户端
                        $this->send($k,$buffer);
                    }
                }
            }
        }
    }

    //关闭连接
    private function close($sock){
        $k=array_search($sock, $this->sockets);
        socket_close($sock);
        unset($this->sockets[$k]);
        unset($this->users[$k]);
        $this->e("连接:$k 关闭");
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
    private function WebSocket($address,$port){
        $server = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        socket_set_option($server, SOL_SOCKET, SO_REUSEADDR, 1);
        socket_bind($server, $address, $port);
        socket_listen($server);
        $this->e('服务开启 : '.date('Y-m-d H:i:s'));
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
        $msg = json_encode($msg);
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
    //$k为识别客户端（发送指定客户端），暂时不用，以后再扩展
    private function send($k,$msg){
//        $msg = json_encode($msg);
        $msg = $this->code($msg);
        $this->e($msg,1);
        foreach($this->users as $v){
            //发送到客户端
            socket_write($v['socket'],$msg,strlen($msg));
        }
    }

    //记录到log
    private function e($str,$flag=0){
        $path=RUN_PATH.'WebSocket.log';
        if ($flag) $str = json_decode($str);
        $str=$str."\n";
        error_log($str,3,$path);
        $str = mb_convert_encoding($str,'GBK','UTF-8');
        echo $str;
    }
}

