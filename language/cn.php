<?php
class CN
{
    function __construct() {
        $this->this_language = 'cn';
        $this->screenDirection = 'ltr';
        $this->encoding = 'UTF-8';
        $this->loaded_cats = array();
    }

	function load_keys($cat, $force_reload = false) {
        global $config;
        if ( isset( $this->loaded_cats[$cat] ) && !$force_reload ) {
            return true;
        }
        if ( !preg_match( '`^([a-z0-9\-_]+)$`', $cat ) ) {
            return false;
        }
        if ( $cat == 'common' )
        {
            $this->validate = '确定';
            $this->connection = '连接';
            $this->register = '角色创建';
            $this->page_map = 'Map';
            $this->access_denied = '拒绝访问';
            $this->guest = '访客';
            $this->session_stop = '会话结束';
            $this->session_stop_explain = '会话停止，因其他用户新建了该会话';
            $this->left = 'Left';
            $this->right = 'Right';
            $this->up = 'Up';
            $this->down = 'Down';
            $this->center = 'Center';
            $this->justify = 'Justified';
            $this->yes = 'Yes';
            $this->no = 'No';
            $this->javascript_required = '浏览器必须支持JavaScript哦.';
            $this->chatbox = '消息';
            $this->chatbox_reduce = '隐藏';
            $this->chatbox_increase = '显示';
            $this->post_message = '发送';
            $this->flood_alert = '大量弹窗';
            $this->redirect_at = '正在读取数据...';
            $this->redirection = '读取数据完成';
            $this->character_name = '帐号';
            $this->password = '密码';
            $this->go_to_reception = 'Home页';
            $this->do_not_wait = '不等啦';
            $this->click_to_continue = '单击此处可继续';
            $this->go_to_admin_panel = '去管理面板';
            $this->quit_map = '退出Map';
            $this->join_map = '进入Map';
            $this->error = '错误';
            $this->infos = '信息';
            $this->hp = 'HP';
            $this->mp = 'MP';
            $this->attack = '攻击';
            $this->defense = '防御';
            $this->mind = '智慧';
            $this->agility = '敏捷';
            $this->exp = 'Exp';
            $this->level = 'Lv.';
            $this->class = '职业';
            $this->points = '得分';
            $this->hp1 = 'HP';
            $this->mp1 = 'MP';
            $this->attack1 = '攻击';
            $this->defense1 = '防御';
            $this->mind1 = '智慧';
            $this->agility1 = '敏捷';
            $this->exp1 = 'Exp';
            $this->level1 = 'Lv.';
            $this->class1 = '职业';
            $this->points1 = '得分';
            $this->nav_reception = '首页';
            $this->nav_map = 'Map';
            $this->nav_profile = '简介';
            $this->nav_battle = '战斗';
        } elseif ( $cat == 'chat' ) {
            // Who is slash command [Nuladion]
            $this->whois_char_not_found = '字符没找到!';
        } elseif ( $cat == 'battle' ) // combat !
        {
            $this->post_message = '发送';
            $this->join_battle = '加入战斗';
            $this->battle = '战斗';
            $this->allies = '队友';
            $this->opponents = '敌人';
            $this->battle_failure = '战斗失败';
            $this->you_disconnect_battle = '你已离开战斗，不知道是因为意外还是你就是个逃兵？总之，你输掉了战斗。';
            $this->battle_menu = '战斗菜单';
            $this->wait_turn = '等待';
            $this->click_to_attack = '单击要攻击的敌人';
            $this->click_opponent = '点击一个敌人!';
            $this->you_won_battle = '胜利!';
            $this->you_win_exp = '获得Exp %s .';
            $this->you_win_points = '获得 %s G' . $this->points1;
            $this->you_win_exp_gain_level = '获得Exp %s， 并升级到 %s !';
            $this->x_inflict_y_to_z = '%s 对 %s 造成 %s 伤害';
            $this->x_died = '%s 死了';
            $this->basic_action = '普通攻击';
            $this->tank_action = '坦克攻击';
            $this->tankMainCannon = '主炮';
            $this->tankSE = 'S-E';
            $this->tankSubCannon = '副炮';
            $this->tankShells = '特殊炮弹';
            $this->act_attack = '发起攻击';
            $this->act_defend = '进行防御';
            $this->act_flee = '逃跑';
        } elseif ( $cat == 'default' ) {
            $this->reception = '首页';
            $this->register_now = '创建一个角色';
            $this->if_no_account = '没有帐号？注册一个吧';
            $this->connection_explain = '如果你已有角色，你可以输入角色名称和密码，开始战斗吧.';
            $this->character_stats = '角色状态';
            $this->logout = '退出游戏';
            $this->go_to_map = '进入地图';
        } elseif ( $cat == 'synchro_pic' ) {
            $this->synchro_pic_title = '同步服务器数据中...';
            $this->synchro_pic_success = '同步完成';
        } elseif ( $cat == 'profile' ) {
            $this->registering = '注册';
            $this->register_explain = '这只是一个简单的版本，我会保持每周更新，祝你玩的开心。';
            $this->password_confirm = '确认密码';
            $this->email = '邮箱地址';
            $this->logout_succeeded = '已退出!';
            $this->login_succeeded = '登录成功!';
            $this->login_failed = '登录失败...';
            $this->invalid_name_or_password = '名字或密码长度不够!';
            $this->you_are_now_logged_in = '<strong>%s</strong>，欢迎来到废土世界.';
            $this->you_are_already_logged_in = '你已经登录为 <strong>%s</strong>.';
            $this->you_are_logged_out = '你已注销！';
            $this->empty_name = '名字不能为空';
            $this->invalid_email = 'Email无效';
            $this->user_with_same_email_or_name = 'name或email已被注册';
            $this->not_equal_passwords = '两次密码不一致';
            $this->registration_succeeded = '注册成功!';
            $this->you_can_login = '你可以登录啦';
        } elseif ( $cat == 'map' ) {
            $this->map_loading = '正在加载地图...';
            $this->close_message = 'OK';
        } elseif ( $cat == 'general_config' )
        {
            $this->general_config = '基本配置';
            $this->config_updated = '配置更新';
            $this->config_updated_explain = '已在数据库中更新的站点配置信息.';
            $this->website_options = '网站选项';
            $this->site_name = '网站名称';
            $this->site_desc = '网站描述';
            $this->time_zone = '网站时区';
            $this->language = '网站语言';
            $this->template = '网站模版';
            $this->use_cache = '激活缓存';
            $this->cache_dir = '缓存目录';
            $this->use_gzip = '启用 gzip 压缩';
            $this->optimize_maps = '优化地图 (需要 GD库支持)';
            $this->tileset_options = '瓦片设置选项';
            $this->tile_size = '瓦片大小';
            $this->tileset_tiles_lower = '在底层的瓦片数';
            $this->tileset_tiles_upper = '在上层的瓦片数';
            $this->tileset_cols = '瓦片地图列数';
            $this->tileset_bgcolor = '瓦片地图背景颜色';
            $this->misc_options = '其他选项';
            $this->refresh_method = '刷新方法';
            $this->refresh_iframe = '通过iframe刷新';
            $this->refresh_ajax = '通过ajax刷新';
            $this->chat_history = '聊天记录中的消息数';
            $this->chat_history_time = '消息存活时间';
            $this->default_location = '人物起始位置 (ID,X,Y dir)';
            $this->variables = '变量';
            $this->preset_teleport_sprite = '传送图标';
        } elseif ( $cat == 'admin_panel' )
        {
            $this->admin_menu = '菜单管理';
            $this->admin_panel = '面板管理';
            $this->admin_maps = '地图管理';
            $this->admin_tilesets = '瓦片编辑器管理';
            $this->admin_events = '事件管理';
            $this->admin_general = '全部管理';
            $this->admin_panel_explain = '欢迎来到的ORE管理面板 <br /> 你可以在这里修改设置你的游戏，创建地图，人物等等......';
            $this->not_saved_continue_question = '你未保存，确定继续么?';
            $this->mod_map = '地图模块';
            $this->map_editor = '地图编辑器';
            $this->create_map = '创建地图';
            $this->resize_map = '重置地图大小';
            $this->tileset_editor = '瓦片编辑器';
            $this->create_tileset = '创建瓦片集';
            $this->export_tileset = '导出瓦片集';
            $this->import_tileset = '导入瓦片集';
            $this->event_editor = '事件编辑器';
            $this->create_event = '创建事件';
            $this->synchro_pic = '同步图片';
            $this->delete_tileset = '删除瓦片集';
            $this->delete_map = '删除地图';
            $this->delete_event = '删除事件';
            $this->general_config = '基本配置';
            $this->user_editor = '角色编辑器';
            $this->delete_user = '删除角色';
            $this->class_editor = '职业编辑器';
            $this->delete_class = '删除职业';
            $this->create_class = '创建职业';
            $this->equipmentr_editor = '物品编辑器';
            $this->create_equipment = '创建物品';
            $this->editor_equipment = '物品编辑';
        } elseif ( $cat == 'user_editor' )
        {
            $this->user_editor = '角色编辑器';
            $this->user_updated = '更新角色';
            $this->user_updated_explain = '已在数据库更新该角色数据。';
            $this->account_options = '帐号选项';
            $this->name = '名字';
            $this->change_password = '更改密码';
            $this->email = 'Email';
            $this->administrator = '管理员';
            $this->character_properties = '人物属性';
            $this->start_location = '人物起始位置 (ID,X,Y dir)';
            $this->variables = '变量';
            $this->charaset = '精灵图';
            $this->battler = '战斗图片';
            $this->gender = '性别';
            $this->male = '男';
            $this->female = '女';
            $this->biography = '传记';
            $this->space_storage = '存储容量';
            $this->modify_location = '更改角色位置';
            $this->map_id = 'Map ID';
            $this->map_x = 'Map X';
            $this->map_y = 'Map Y';
            $this->direction = '方向';
        } elseif ( $cat == 'class_editor' ) {
            $this->class_editor = '职业编辑器';
            $this->class_updated = '更新职业';
            $this->class_updated_explain = '已在数据库更新该职业数据。';
            $this->view_curve = '查看曲线';
            $this->class_identification = '职业名称的标识';
            $this->class_title = '职业标题';
            $this->selectable_when_start = '可选择登录';
            $this->description = '描述';
            $this->hp_plus = '职业增加 ' . $this->hp1;
            $this->mp_plus = '职业增加 ' . $this->mp1;
            $this->attack_plus = '职业增加 ' . $this->attack1;
            $this->defense_plus = '职业增加 ' . $this->defense1;
            $this->mind_plus = '职业增加 ' . $this->mind1;
            $this->agility_plus = '职业增加 ' . $this->agility1;
            $this->experience_curve = '公式 ' . $this->exp1;
            $this->hp_curve = '公式 ' . $this->hp1;
            $this->mp_curve = '公式 ' . $this->mp1;
            $this->attack_curve = '公式 ' . $this->attack1;
            $this->defense_curve = '公式 ' . $this->defense1;
            $this->mind_curve = '公式 ' . $this->mind1;
            $this->agility_curve = '公式 ' . $this->agility1;
            $this->charaset = '精灵图';
            $this->battler = '战斗';
        } elseif ( $cat == 'map_editor' ) {
            $this->map_editor = '地图编辑器';
            $this->map_tileset = '地图瓦片集';
            $this->map_properties = '地图属性';
            $this->map_name = '名字';
            $this->map_music = '背景音乐';
            $this->save_map = '保存';
            $this->select_tile = '选择瓦片';
            $this->map_saved = '已保存的Map';
            $this->no_tileset = '未找到瓦片集';
            $this->lower_layer = '低层';
            $this->upper_layer = '上层';
            $this->mode_tile = '瓦片模式';
            $this->mode_event = '事件模式';
            $this->tools = '工具';
            $this->preset_event = '预定义事件';
            $this->action = '操作';
            $this->action_done = '执行操作';
            $this->teleport_here = '传送点';
            $this->set_default_start_position = '注册玩家的初始位置';
            $this->set_players_position = '已注册玩家的初始位置';
            $this->teleport = '传送';
            $this->width_tiles_copy = '复制瓦片数W';
            $this->height_tiles_copy = '复制瓦片数H';
            $this->width_tiles_paste = '粘贴到Map的W';
            $this->height_tiles_paste = '粘贴到Map的H';
        } elseif ( $cat == 'select_map_to_edit' )
        {
            $this->edit_map = '地图编辑器';
            $this->select_map_to_edit = '选择要编辑的Map';
        } elseif ( $cat == 'resize_map' )
        {
            $this->resize_map = '调整地图大小';
            $this->map_resized = '调整后的地图大小';
            $this->map_to_resize = '若要调整大小的地图';
            $this->map_width = 'MapW';
            $this->map_height = 'MapH';
            $this->are_you_sure_to_resize_map = 'Map将被重新调整，你确定要继续吗？';
        } elseif ( $cat == 'select_event_to_edit' )
        {
            $this->edit_event = '事件编辑器';
            $this->select_event_to_edit = '选择要编辑的事件';
        } elseif ( $cat == 'select_user_to_edit' )
        {
            $this->edit_user = '角色编辑';
            $this->select_user_to_edit = '选择要编辑的角色';
        } elseif ( $cat == 'select_class_to_edit' )
        {
            $this->edit_class = '编辑职业';
            $this->select_class_to_edit = '选择要编辑的职业';
        } elseif ( $cat == 'select_tileset_to_edit' )
        {
            $this->edit_tileset = '编辑瓦片集';
            $this->select_tileset_to_edit = '选择要编辑的瓦片集';
        } elseif ( $cat == 'select_tileset_to_export' )
        {
            $this->export_tileset = '导出瓦片集';
            $this->select_tileset_to_export = '选择要导出的瓦片集';
        } elseif ( $cat == 'import_tileset' ) {
            $this->import_tileset = '导入瓦片集';
            $this->invalid_file = '该文件是无效的。';
            $this->upload_error = '传输失败......';
            $this->importation_succeeded = '导入成功 !';
            $this->importation_succeeded_explain = '导入成功 ！现在，您可以编辑它了。';
        } elseif ( $cat == 'delete_map' )
        {
            $this->delete_map = '删除Map';
            $this->select_map_to_delete = '选择要删除的Map';
            $this->are_you_sure_to_delete_map = '这张Map将从数据库永久删除，你确定要继续吗？';
            $this->map_deleted = '已删除Map';
        } elseif ( $cat == 'delete_tileset' ) {
            $this->delete_tileset = '删除瓦片集';
            $this->select_tileset_to_delete = '选择要删除的瓦片集';
            $this->are_you_sure_to_delete_tileset = '该素材将从数据库永久删除，你确定要继续吗？';
            $this->tileset_deleted = '已删除瓦片集';
            $this->not_delete_tileset = '删除失败';
            $this->this_is_last_tileset = '这是最后一个瓦片集，服务器至少需要一个瓦片集';
        } elseif ( $cat == 'delete_class' ) {
            $this->delete_class = '删除职业';
            $this->select_class_to_delete = '选择要删除的职业';
            $this->are_you_sure_to_delete_class = '该职业将从数据库永久删除，你确定要继续吗？';
            $this->class_deleted = '已删除职业';
            $this->not_delete_class = '删除失败';
            $this->this_is_last_class = '这是最后一个职业，服务器至少需要一个职业';
        } elseif ( $cat == 'delete_event' )
        {
            $this->delete_event = '删除事件';
            $this->select_event_to_delete = '选择要删除的事件';
            $this->are_you_sure_to_delete_event = '该事件将从数据库永久删除，你确定要继续吗？';
            $this->event_deleted = '已删除事件';
        } elseif ( $cat == 'delete_user' )
        {
            $this->delete_user = '删除角色';
            $this->select_user_to_delete = '选择要删除的角色';
            $this->are_you_sure_to_delete_user = '该角色将从数据库永久删除，你确定要继续吗？';
            $this->user_deleted = '已删除';
        } elseif ( $cat == 'create_map' )
        {
            $this->create_map = '创建Map';
            $this->map_name = '名字';
            $this->map_tileset = '瓦片集';
            $this->map_width = 'W';
            $this->map_height = 'H';
        } elseif ( $cat == 'create_event' )
        {
            $this->create_event = '创建事件';
            $this->event_name = '名字';
        } elseif ( $cat == 'create_class' )
        {
            $this->create_class = '创建职业';
            $this->classname = '名字';
            $this->class_title = '标题';
        } elseif ( $cat == 'create_tileset' )
        {
            $this->create_tileset = '创建瓦片集';
            $this->tileset_name = '名字';
            $this->tileset_tiles_lower = '下层瓦片数';
            $this->tileset_tiles_upper = '上层瓦片数';
            $this->tileset_cols = '瓦片列数';
        } elseif ( $cat == 'tileset_editor' )
        {
            $this->tileset_editor = '瓦片集编辑器';
            $this->tileset_properties = '属性';
            $this->tileset_name = '名字';
            $this->tileset_tiles_lower = '下层瓦片数';
            $this->tileset_tiles_upper = '上层瓦片数';
            $this->resize_tileset = '调整瓦片集大小';
            $this->save_tileset = '保存';
            $this->select_tile = '选择瓦片';
            $this->tileset_saved = '瓦片集已保存';
            $this->lower_layer = '下图层';
            $this->upper_layer = '上图层';
            $this->mode_tile = '瓦片模式';
            $this->mode_layer = '图层模式';
            $this->click_to_change_layer = '点击切换图层';
            $this->layer_below = '下图层';
            $this->layer_same = '碰撞图层(不能行走层)';
            $this->layer_above = '上图层';
        } elseif ( $cat == 'event_editor' )
        {
            $this->event_editor = '事件编辑器';
            $this->save_event = '保存';
            $this->event_saved = '已保存';
            $this->message_content = '消息内容';
            $this->event_script = '事件脚本';
            $this->event_name = '事件名字';
            $this->event_picture = '事件图片';
            $this->event_picture_type = '事件图片类型';
            $this->event_charaset = '精灵图';
            $this->event_dir = '方向';
            $this->event_sprite = '事件精灵';
            $this->event_layer = '事件层';
            $this->dynamic = '动态';
            $this->static = '静态';
            $this->time_limit = '时间限制';
            $this->validation = '确定';
            $this->show_face = '显示头像';
            $this->stored_in_var = '存储在变量中';
            $this->number = '数量';
            $this->text = '文本';
            $this->variable = '变量';
            $this->value = '值';
            $this->var_set = '设置变量';
            $this->var_increase = '加';
            $this->var_decrease = '减';
            $this->var_multiply = '乘';
            $this->var_divide = '除';
            $this->var_concat = '连接';
            $this->map_dir = 'Map方向';
            $this->do_not_change = '不更改';
            $this->warning_function = '注意，此功能使用不当将导致网站部分或全部挂掉>_< ';
            $this->condition_equal = '等于';
            $this->condition_different = '不等于';
            $this->condition_smaller = '小于';
            $this->condition_bigger = '大于';
            $this->condition_smaller_or_equal = '小于或等于';
            $this->condition_bigger_or_equal = '大于或等于';
            $this->condition_with_else = '否则为 + 结束条件';
            $this->condition_without_else = '结束条件';
            $this->event_properties = '事件属性';
            $this->script_editor = '脚本编辑器';
            $this->html_activated = '激活HTML';
            $this->show_message = '显示一条消息';
            $this->set_message_align = '消息对齐方式';
            $this->set_message_time = '结束消息类型';
            $this->set_message_face = '选择其他人头像';
            $this->wait = '稍等片刻';
            $this->display_choice = '显示选择';
            $this->input_string = '输入字符';
            $this->modify_var = '修改变量';
            $this->teleport_character = '传送字符';
            $this->create_condition = '创建条件';
            $this->stop_condition = '结束条件';
            $this->condition_else = '如果条件为 false';
            $this->exec_javascript = '执行javascript';
            $this->exec_php = '执行php';
            $this->start_combat = '开始战斗';
        } elseif ( $cat == 'compile_script' ) {
            $this->syntax_error_at_line = '在 %s 行语法错误';
            $this->not_closed_condition = '脚本中的条件有误';
            $this->not_closed_javascript = 'javascript 代码有误';
            $this->not_closed_php = 'php 代码有误';
            $this->not_closed_message = '消息脚本有误';
            $this->not_closed_choice = 'choice不在脚本范围';
            $this->no_choice = '没有选择';
        } elseif ( !empty( $cat ) && is_file( $config->path . 'language/' . $config->language . '/' . $cat . '.' . $config->phpex ) ) {
            include($config->path . 'language/' . $config->language . '/' . $cat . '.' . $config->phpex);
        } else {
            message_die( 'Error', '没有该语言的数据' . $cat );
        }
        $this->loaded_cats[$cat] = true;
        return true;
    }
}

$lang = new CN();
