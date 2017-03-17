<?php
namespace Base\DB;
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 数据库PDO操作
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v1.1 2017/1/17 23:04  增加非预处理的执行，查询语句，增加debug模式，增加判断表引擎，以方便事务处理
 * v1.0 2016/12/28 9:21  数据连接采用单例模式
 * v0.9 2016/12/15 13:52  初版
 */

class DB {
    protected static $obj = null;
    protected $db;
    protected $dbName;
    public $prefix;

    private function __construct() {
        if (!class_exists('PDO')) throw new \Exception("你的环境不支持:PDO");

        $cfg = Config('db');
        $this->dbName = $cfg['dbname'];
        $dsn = 'mysql:host=' . $cfg['host'] . ';dbname=' . $cfg['dbname'];
        $this->prefix = $cfg['prefix'];

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
	private function charset($char) {
        $this->db->exec('set names ' . $char);
        $this->db->exec('SET character_set_connection='.$char.', character_set_results='.$char.', character_set_client=binary');
	}

    /**
     * 获取表引擎
     *
     * @param String $tableName 表名
     * @param Boolean $debug
     * @return String
     */
    public function getTableEngine($tableName) {
        $strSql = "SHOW TABLE STATUS FROM $this->dbName WHERE Name='".$tableName."'";
        $arrayTableInfo = $this->query($strSql);
        $this->getPDOError();
        return $arrayTableInfo[0]['Engine'];
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
     * @return 插入的id
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
     * @return 修改的行数
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
     * execSql 执行SQL语句
     *
     * @param String $strSql
     * @param Boolean $debug
     * @return Int
     */
    public function execSql($strSql, $debug = false) {
        if ($debug === true) $this->debug($strSql);
        $result = $this->db->exec($strSql);
        $this->getPDOError();
        return $result;
    }

    /**
     * Query 查询
     *
     * @param String $strSql SQL语句
     * @param String $queryMode 查询方式(All or Row)
     * @param Boolean $debug
     * @return Array
     */
    public function query($strSql, $queryMode = 'all', $debug = false) {
        if ($debug === true) $this->debug($strSql);
        $recordset = $this->db->query($strSql);
        $this->getPDOError();
        if ($recordset) {
            $recordset->setFetchMode(\PDO::FETCH_ASSOC);
            if ($queryMode == 'all') {
                $result = $recordset->fetchAll();
            } elseif ($queryMode == 'row') {
                $result = $recordset->fetch();
            }
        } else {
            $result = null;
        }
        return $result;
    }

    /**
     * 获取最后插入行的ID
     */
    public function lastId() {
        return $this->db->lastInsertId();
    }

    /**
     * beginTransaction 开始事务
     */
    public function beginTransaction() {
        $this->db->beginTransaction();
    }

    /**
     * commit 提交事务
     */
    public function commit() {
        $this->db->commit();
    }

    /**
     * rollback 回滚事务
     */
    public function rollback() {
        $this->db->rollback();
    }

    /**
     * debug
     *
     * @param mixed $debuginfo
     */
    private function debug($info) {
        var_dump($info);
        exit();
    }

    /**
     * getPDOError 捕获PDO错误信息
     */
    private function getPDOError() {
        if ($this->db->errorCode() != '00000') {
            $arrayError = $this->db->errorInfo();
            $this->outputError($arrayError[2]);
        }
    }

    /**
     * 错误信息异常抛出
     *
     * @param String $strErrMsg
     */
    private function outputError($strErrMsg) {
        throw new \Exception('MySQL Error: '.$strErrMsg);
    }

    /**
     * 关闭数据库连接
     */
    public function destruct(){
        $this->db = null;
    }

}
