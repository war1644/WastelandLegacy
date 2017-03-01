<?php 


/**
* 
*/
class api
{
	
	function __construct()
	{

	}

	public function test()
	{
		echo "string";
	}


	//获取用户物品 '物品名'=> 数量
	public function equipment_list()
	{
		echo json_encode(user_equipment_list());
	}



}