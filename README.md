WastelandLegacy (废土战记)
======
每一个程序员的浪漫里应该都有一个游戏梦吧？我正在为自己的梦想努力着！联机，打怪，城镇，荒野，一样不少。有后台管理系统，可开放给玩家自己DIY剧情，换装，拼新地图，造新大陆等等。
## 说明
* github这个是包含了事件编辑器版本的,游戏内容编辑／管理（想着应该没人跑去用网页编辑游戏脚本等，就整合了docker镜像版）
* docker镜像版里自带源码，路径／var/www/
* github版 = docker镜像版 + 游戏内容编辑／管理器
* github版dev分支游戏脚本内容是从本地js文件里获取（方便开发）
* github版master分支游戏脚本内容是从后端的api里获取（方便上线后，在线修改游戏内容）

## 游戏说明
* 战斗系统
* 人车系统
* 装备系统
* 事件脚本
* 场景切换
* 做了一小章剧情
* 两幅世界地图绘制完毕
* 城镇村庄完成了 3 个，包括拉多镇
* 玩家通讯(websocket),后端用的 Workerman
* 玩家之间战斗支援
* 玩家在大地图的数据同步
* 其他

## 环境说明
```shell
# 本地 hosts
sudo echo '127.0.0.1 mmr.game.com' >> /etc/hosts 

# 拉取镜像
docker pull registry.cn-beijing.aliyuncs.com/dxq_docker/nginx_php7:mmr

# run
docker run --restart unless-stopped --name mmr -itd -p 9001:9001 -p 80:80 registry.cn-beijing.aliyuncs.com/dxq_docker/nginx_php7:mmr

# 浏览器开启模拟手机模式，横屏，然后访问 mmr.game.com
```