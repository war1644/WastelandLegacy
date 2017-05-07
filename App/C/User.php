<?php
/**
 *
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version V0.9
 * @since
 * <p>v0.9 2017/5/7 11:26  初版</p>
 */

namespace App\C;

class User {
    private $name = "";
    private $color = "";
    private $x = 0;
    private $y = 0;
    private $direction = '';

    /**
     * 获取属性值
     */
    public function __get($per) {
        return isset($this->$per) ? $this->$per : NULL;
    }

    /**
     * 设置属性值
     */
    public function __set($per , $value) {
        $this->$per = $value;
    }

//    public function getColor() {
//        return $this->color;
//    }
//
//    public function setColor($color) {
//        $this->color = $color;
//    }
//
//    public function getX() {
//        return $this->x;
//    }
//
//    public function setX($x) {
//        $this->x = $x;
//    }
//
//    public function getY() {
//        return $this->y;
//    }
//
//    public function setY($y) {
//        $this->y = $y;
//    }
//
//
//    public function getName() {
//        return $this->name;
//    }
//
//    public function setName($name) {
//        $this->name = $name;
//    }

}