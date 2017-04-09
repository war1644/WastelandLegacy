<?php
namespace App\M;
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 游戏用户模型
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/03/18 初版
 */
class UsersM extends AppModel {
    protected $tables = null;
    protected $uid = null;

    public function __construct() {
        parent::__construct();
        $this->tables[] = $this->prefix . 'jobs';//职业表
        $this->tables[] = $this->prefix . 'guilds';//组织势力表
        $this->uid = Seesion('uid') ?: 0;
    }

    public function userInfo() {
        if ($this->uid) return parent::find($this->uid);

        //初始用户数据

    }

    public function logout() {

    }

    public function login() {
//        global $lang, $config, $db;

        if ( !empty($_POST['name']) && !empty($_POST['password']) ) {
            $this->name = $_POST['name'];
            $sql = "SELECT id,salt,password FROM $this->table WHERE `name` = ?";
            $result = $this->executeSql($sql, [$_POST['name']], 'row');
            if ($result) {
                $pwd = md5($_POST['password'] . $result['salt']);
                if ($result['password'] === $pwd) {
                    $result = $this->find($result['id']);
                    if ($result) {
                        Session('uid', $result['id']);
                        Session('mapId', $result['map_id']);
                        return ['code' => 1, 'msg' => '', 'data' => $result];
                    } else {
                        return ['code' => -1, 'msg' => 'mysql error'];
                    }
                }
            } else {
                return ['code' => -1, 'msg' => '无效数据'];
            }
        }
    }

    public function register() {
        $this->name = $_POST['name'];
        $this->email = $_POST['email'];

        $sql = "SELECT id FROM $this->table WHERE `name` = ? OR email = ?";
        if ($this->executeSql($sql, [$this->name, $this->email], 'row')) return ['code' => 1, 'msg' => '数据已存在'];
        $this->salt = RandStr();
        $this->jobName = $_POST['jobName'];
        $this->password = md5($_POST['pwd'] . $this->salt);

        if ($this->uid = $this->add()) {

        }
    }

    public function checkPwd() {
        return md5($_POST['pwd'] . $this->salt) === $this->password;
    }


    public function setVar($key, $val) {
        $this->vars[$key] = $val;
    }

    public function update() {
        $this->save();
    }

    public function checkExp($gain_exp) {

        $this->exp += $gain_exp;
        $level = $this->level + 1;
        $exp_next_level = str_replace('X', $level, $this->exp_curve);

        $gain_hp = 0;
        $gain_mp = 0;
        $gain_attack = 0;
        $gain_defense = 0;
        $gain_mind = 0;
        $gain_agility = 0;

        while ($this->exp >= $exp_next_level) {

            eval('$gain_hp += ceil((' . str_replace('X', $level, $this->hp_curve) . ') - (' . str_replace('X', ($level - 1), $this->hp_curve) . '));');

            eval('$gain_mp += ceil((' . str_replace('X', $level, $this->mp_curve) . ') - (' . str_replace('X', ($level - 1), $this->mp_curve) . '));');

            eval('$gain_attack += ceil((' . str_replace('X', $level, $this->attack_curve) . ') - (' . str_replace('X', ($level - 1), $this->attack_curve) . '));');

            eval('$gain_defense += ceil((' . str_replace('X', $level, $this->defense_curve) . ') - (' . str_replace('X', ($level - 1), $this->defense_curve) . '));');

            eval('$gain_mind += ceil((' . str_replace('X', $level, $this->mind_curve) . ') - (' . str_replace('X', ($level - 1), $this->mind_curve) . '));');

            eval('$gain_agility += ceil((' . str_replace('X', $level, $this->agility_curve) . ') - (' . str_replace('X', ($level - 1), $this->agility_curve) . '));');

            $level++;
            eval('$exp_next_level = ceil(' . str_replace('X', $level, $this->exp_curve) . ');');
        }

        $gain_level = $level - $this->level - 1;

        if ($gain_level > 0) {
            $this->hp += $gain_hp;
            $this->mp += $gain_mp;
            $this->attack += $gain_attack;
            $this->defense += $gain_defense;
            $this->mind += $gain_mind;
            $this->agility += $gain_hp;
            $this->level += $gain_level;
            $this->exp += $gain_exp;
        } else {
            $this->exp += $gain_exp;
        }
    }

}