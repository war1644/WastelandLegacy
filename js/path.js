/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅█████☆█☆█☆███████▄▄▃▂
 *  ███████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * @Author: 路漫漫
 * @Link: ahmerry@qq.com
 * @Date: 2018/11/26 上午10:21
 * @Last Modified by:
 * @Last Modified time: 2018/11/26 上午10:21
 */


class StarQuery {
    constructor() {
        this._map = [];//地图
        this._w = 0;//地图的宽
        this._h = 0;//地图的高
        this._open = [];//开放列表
        this._starPoint = null;//起点
        this._endPoint = null;//目标点
        this._path = [];//计算出的路径
        this.queryType = 0;//寻路方式[0：八方向，1：上下四方向，2：斜角四方向]
    }

    drawPath(node) {

        let pathNode = node;
        //倒过来得到路径
        while (pathNode != this._starPoint) {
            this._path.unshift(pathNode);
            pathNode = pathNode.nodeparent;
        }
    }

    setStart() {

        for (let y = 0; y < this._h; y++) {
            for (let x = 0; x < this._w; x++) {
                this._map[y][x].init();
            }
        }
        this._open = [];
    }

    /*计算每个节点*/
    count(neighboringNode, centerNode, eight) {
        //是否已经检测过
        if (neighboringNode.isChecked) return;
        let g = eight ? centerNode.value_g + 14 : centerNode.value_g + 10;
        //不在关闭列表里才开始判断
        if (neighboringNode.open) {
            //如果该节点已经在开放列表里
            if (neighboringNode.value_g >= g) {
                //如果新G值小于或者等于旧值，则表明该路更优，更新其值
                neighboringNode.value_g = g;
                this.ghf(neighboringNode);
                neighboringNode.nodeparent = centerNode;
                this.setOpen(neighboringNode);
            }
        } else {
            //如果该节点未在开放列表里
            //计算GHF值
            neighboringNode.value_g = g;
            this.ghf(neighboringNode);
            neighboringNode.nodeparent = centerNode;
            //添加至列表
            this.setOpen(neighboringNode, true);
        }
    }

    /*计算ghf各值*/
    ghf(node) {

        let dx = Math.abs(node.x - this._endPoint.x);
        let dy = Math.abs(node.y - this._endPoint.y);
        node.value_h = 10 * (dx + dy);
        node.value_f = node.value_g + node.value_h;
    }

    /*加入开放列表*/
    setOpen(newNode, newFlg) {

        let new_index;
        if (newFlg) {
            newNode.open = true;
            let new_f = newNode.value_f;
            this._open.push(newNode);
            new_index = this._open.length - 1;
        } else {
            new_index = newNode.index;
        }
        while (true) {
            //找到父节点
            let f_note_index = new_index * 0.5 >>> 0;
            if (f_note_index <= 0) break;
            //如果父节点的F值较大，则与父节点交换
            if (this._open[new_index].value_f >= this._open[f_note_index].value_f) break;
            let obj_note = this._open[f_note_index];
            this._open[f_note_index] = this._open[new_index];
            this._open[new_index] = obj_note;
            this._open[f_note_index].index = f_note_index;
            this._open[new_index].index = new_index;
            new_index = f_note_index;
        }
    }

    /*取开放列表里的最小值*/
    getOpen() {

        let change_note;
        //将第一个节点，即F值最小的节点取出，最后返回
        let obj_note = this._open[1];
        this._open[1] = this._open[this._open.length - 1];
        this._open[1].index = 1;
        this._open.pop();
        let this_index = 1;
        while (true) {
            let left_index = this_index * 2;
            let right_index = this_index * 2 + 1;
            if (left_index >= this._open.length) break;
            if (left_index == this._open.length - 1) {
                //当二叉树只存在左节点时，比较左节点和父节点的F值，若父节点较大，则交换
                if (this._open[this_index].value_f <= this._open[left_index].value_f) break;
                change_note = this._open[left_index];
                this._open[left_index] = this._open[this_index];
                this._open[this_index] = change_note;
                this._open[left_index].index = left_index;
                this._open[this_index].index = this_index;
                this_index = left_index;
            } else if (right_index < this._open.length) {
                //找到左节点和右节点中的较小者
                if (this._open[left_index].value_f <= this._open[right_index].value_f) {
                    //比较左节点和父节点的F值，若父节点较大，则交换
                    if (this._open[this_index].value_f <= this._open[left_index].value_f) break;
                    change_note = this._open[left_index];
                    this._open[left_index] = this._open[this_index];
                    this._open[this_index] = change_note;
                    this._open[left_index].index = left_index;
                    this._open[this_index].index = this_index;
                    this_index = left_index;
                } else {
                    //比较右节点和父节点的F值，若父节点较大，则交换
                    if (this._open[this_index].value_f <= this._open[right_index].value_f) break;
                    change_note = this._open[right_index];
                    this._open[right_index] = this._open[this_index];
                    this._open[this_index] = change_note;
                    this._open[right_index].index = right_index;
                    this._open[this_index].index = this_index;
                    this_index = right_index;
                }
            }
        }
        return obj_note;
    }

    /*开始寻路*/
    queryPath(star, end) {

        this._path = [];
        if (end.x >= this._map[0].length) end.x = this._map[0].length - 2;
        if (end.y >= this._map.length) end.y = this._map.length - 2;
        if (star.x == end.x && star.y == end.y) return this._path;
        this.setStart();
        this._starPoint = this._map[star.y][star.x];
        this._endPoint = this._map[end.y][end.x];
        this._open = [];
        this._open.push(null);
        let isOver = false;
        let thisPoint = this._starPoint;
        let firstCheck = true;
        while (!isOver) {
            thisPoint.isChecked = true;
            let checkList = [];
            if (this.queryType == 0 || this.queryType == 2) {
                if (thisPoint.x > 0 && thisPoint.y > 0) {
                    checkList.push(this._map[(thisPoint.y - 1)][thisPoint.x - 1]);
                }
                if (thisPoint.x < this._w - 1 && thisPoint.y < this._h - 1) {
                    checkList.push(this._map[thisPoint.y + 1][(thisPoint.x + 1)]);
                }
                if (thisPoint.x > 0 && thisPoint.y < this._h - 1) {
                    checkList.push(this._map[(thisPoint.y + 1)][thisPoint.x - 1]);
                }
                if (thisPoint.x < this._w - 1 && thisPoint.y > 0) {
                    checkList.push(this._map[(thisPoint.y - 1)][thisPoint.x + 1]);
                }
            }
            if (this.queryType == 0 || this.queryType == 1) {
                if (thisPoint.y > 0) {
                    checkList.push(this._map[(thisPoint.y - 1)][thisPoint.x]);
                }
                if (thisPoint.x > 0) {
                    checkList.push(this._map[thisPoint.y][(thisPoint.x - 1)]);
                }
                if (thisPoint.x < this._w - 1) {
                    checkList.push(this._map[thisPoint.y][(thisPoint.x + 1)]);
                }
                if (thisPoint.y < this._h - 1) {
                    checkList.push(this._map[(thisPoint.y + 1)][thisPoint.x]);
                }
            }
            //检测开始
            let startIndex = checkList.length;
            for (let i = 0; i < startIndex; i++) {
                //周围的每一个节点
                let checkPoint = checkList[i];
                if (this.isWay(checkPoint, thisPoint)) {
                    //如果坐标可以通过，则首先检查是不是目标点
                    if (checkPoint == this._endPoint) {
                        //如果搜索到目标点，则结束搜索
                        checkPoint.nodeparent = thisPoint;
                        isOver = true;
                        break;
                    }
                    this.count(checkPoint, thisPoint);
                }
            }
            if (!isOver) {
                //如果未到达指定地点则取出f值最小的点作为循环点
                if (this._open.length > 1) {
                    thisPoint = this.getOpen();
                } else {
                    //开发列表为空，寻路失败
                    return [];
                }
            }
        }
        //路径做成
        this.drawPath(this._endPoint);
        return this._path;

    }

    /*判断是否可通过*/
    isWay(checkPoint, thisPoint) {

        if (this.queryType == 0) {
            if (this._map[checkPoint.y][thisPoint.x].value == 0 && this._map[thisPoint.y][checkPoint.x].value == 0 && this._map[checkPoint.y][checkPoint.x].value == 0) return true;
        } else if (this.queryType == 1) {
            if (this._map[checkPoint.y][checkPoint.x].value == 0) return true;
        } else if (this.queryType == 2) {
            if (this._map[checkPoint.y][checkPoint.x].value == 0) return true;
        }
        return false;
    }

}

class Node
{
    constructor (_x,_y,_v)
    {
        this.x = _x;
        this.y = _y;
        this.value = _v?_v:0;
        this.isChecked = false;
        this.value_g = 0;
        this.value_h = 0;
        this.value_f = 0;
        this.nodeparent = null;
        this.index = 0;
        this.open = false;
    }

    init(){
        this.open = false;
        this.isChecked = false;
        this.value_g = 0;
        this.value_h = 0;
        this.value_f = 0;
        this.nodeparent = null;
        this.index = -1;
    }
}