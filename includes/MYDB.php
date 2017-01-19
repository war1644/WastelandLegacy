<?php
/**
 * 数据库PDO操作
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version V1.0
 * @since
 * <p>v0.9 2016/12/15 13:52  初版</p>
 * <p>v1.0 2016/12/28 9:21  数据连接采用单例模式,添加事务方法</p>
 */

class MFDB {
    protected static $obj = null;
    protected $db;

    private function __construct() {
        if (!class_exists('PDO')) throw new \Exception("你的环境不支持:PDO");

        $cfg = include(INC . 'config.php');
        $dsn = 'mysql:host=' . $cfg['host'] . ';dbname=' . $cfg['dbname'];
        try {
            $this->db = new \PDO($dsn, $cfg['user'], $cfg['password']);
            $this->charset($cfg['charset']);
        }catch (\PDOException $e){
            throw new \Exception($e);
        }
    }
    //单例目的就是统一管理对象，所以直接关闭clone
    //想要对象？去找Ins()
    private function __clone() {}

    public static function Ins(){
        if (self::$obj===null){
            self::$obj = new self();
        }
        return self::$obj;
    }

	/**
	* 选择数据库
	*/
	public function useDb($db) {
        $this->db->exec('use ' . $db);
	}

	/**
	* 设置字符集
	*/
	public function charset($char) {
        $this->db->exec('set names ' . $char);
        $this->db->exec('SET character_set_connection='.$char.', character_set_results='.$char.', character_set_client=binary');
	}

	/**
	* 查询1行
	*/
	public function getRow($sql , $params=[]) {
		$st = $this->db->prepare($sql);
		if($st->execute($params)) {
			return $st->fetch(\PDO::FETCH_ASSOC);
		} else {
			list(,$errno , $errstr) = $st->errorinfo();
			throw new \Exception($errstr, $errno);
		}
	}

	/**
	* 查询多行
	*/
	public function getAll($sql , $params=[]) {
		$st = $this->db->prepare($sql);
		if($st->execute($params)) {
			return $st->fetchAll(\PDO::FETCH_ASSOC);
		} else {
			list(,$errno , $errstr) = $st->errorinfo();
			throw new \Exception($errstr, $errno);
		}
	}

	/**
	* 删除数据
	*/
	public function delete($sql , $params=[]) {
		$st = $this->db->prepare($sql);
		if($st->execute($params)) {
			return $st->rowCount();
		} else {
			list(,$errno , $errstr) = $st->errorinfo();
			throw new \Exception($errstr, $errno);
		}
	}

	/**
	* 添加记录
	*/
	public function insert($sql , $params=[]) {
		$st = $this->db->prepare($sql);
		if($st->execute($params)) {
			return $this->db->lastInsertId();
		} else {
			list(,$errno , $errstr) = $st->errorinfo();
			throw new \Exception($errstr, $errno);
		}
	}

	/**
	* 修改记录
	*/
	public function update($sql , $params=[]) {
		$st = $this->db->prepare($sql);
		if($st->execute($params)) {
			return $st->rowCount();
		} else {
			list(,$errno , $errstr) = $st->errorinfo();
			throw new \Exception($errstr, $errno);
		}
	}

    /**
     * beginTransaction 开始事务
     */
    public function BeginTransaction() {
        $this->db->beginTransaction();
    }

    /**
     * commit 提交事务
     */
    public function Commit() {
        $this->db->commit();
    }

    /**
     * rollback 回滚事务
     */
    public function Rollback() {
        $this->db->rollback();
    }

    function sql_query($sql = '') {
        return $this->db->query($sql);
    }

    function lastId() {
        return $this->db->lastInsertId();
    }

    function sql_fetchrow($rs = null) {
        return $rs->fetch(\PDO::FETCH_ASSOC);
    }

    function sql_fetchrows($rs = null) {
        return $rs->fetchAll(\PDO::FETCH_ASSOC);
    }

    function sql_affectedrows($rs = null) {
        return $rs->rowCount();
    }

    function sql_fetchobject($rs = null) {
        return $rs->fetch(\PDO::FETCH_OBJ);
    }

}
