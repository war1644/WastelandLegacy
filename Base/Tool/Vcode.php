<?php
namespace Base\Tool;
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED█WOLF☆████▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 验证码
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v0.9 2016/12/19   初版
 */

class Vcode {
	public $width = 100;
	public $height = 40;

	protected $im = null;
	protected $dict = '我人有的和工科为这而已离原上草一二三甲乙丙丁四五六七八九十鼠牛虎兔龙蛇马羊猴鸡狗猪';

	public function __construct() {
		session_start();
		$this->base();
		$this->fill();
		$this->line();
	}

	protected function base() {
		$this->im = imagecreatetruecolor($this->width, $this->height);
	}

	// 简单验证码
	public function scode($len = 4) {
		$str = 'ABCDEFGHIJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
		$code = substr(str_shuffle($str) , 0 , $len);

		$_SESSION['vcode'] = $code;

		$color = imagecolorallocate($this->im, mt_rand(0,100),  mt_rand(0,100),  mt_rand(0,100));
		imagestring($this->im, 5 , 10, 5, $code, $color);
		header('content-type:image/png');
		imagepng($this->im);
		imagedestroy($this->im);
	}

	// 中文验证码
	public function ccode($len = 4) {
		$max = mb_strlen($this->dict , 'utf-8');
		$code = '';
		for($i=0 ; $i<$len ; $i++) {
			$code .= mb_substr($this->dict, mt_rand(0 , $max-1) , 1, 'utf-8');
		}

		$_SESSION['vcode'] = $code;

		$color = imagecolorallocate($this->im, mt_rand(0,100),  mt_rand(0,100),  mt_rand(0,100));
		
		imagettftext($this->im, 18, 0, 5, 32, $color, MFPATH . 'Base/Tool/yy.ttf', $code);

		header('content-type:image/png');
		imagepng($this->im);
		imagedestroy($this->im);
	}

	// 判断验证码是否正确
	public static function check($code) {
		session_start();
		return strtolower($_SESSION['vcode']) === strtolower($code);
	}


	// 填充底色
	public function fill() {
		$bg = imagecolorallocate($this->im, mt_rand(150,250),  mt_rand(150,250),  mt_rand(150,250));
		imagefill($this->im, 0, 0, $bg);
	}

	// 生成干扰线
	public function line() {
		for($i = 0; $i<3; $i++) {
			$color = imagecolorallocate($this->im, mt_rand(0,100),  mt_rand(0,100),  mt_rand(0,100));
			imageline($this->im , mt_rand(0,10), mt_rand(0,$this->height), mt_rand($this->width-10 , $this->width), mt_rand(0 , $this->height), $color);
		}
	}
	// 生成干扰点

}
