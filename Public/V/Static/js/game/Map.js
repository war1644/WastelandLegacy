//地图图片数组
var map,
    mapdata,//地图地形数组
    mapPass=[[]],
    mapWidth,
    mapHeight,
    tileSet,
    imgObj,
    tileSize=24,
    eventObj,
    eventArr={};



function getMapData () {
    LAjax.get('http://e.cn/Public/getMapTest', {mapId:2}, function (result) {
        console.log(typeof result);
        mapDataProcess(JSON.parse(result));
        delete result;
    });
}

/**
 * Tile map data process
 */
function mapDataProcess(data) {
    console.log(data);
    //get tile set data
    tileSet = data.tilesets[0];
    delete data.tilesets;

    //get tile map data
    map = data;
    delete data;

    //get tile map pass array
    mapPassProcess();
    mapEventProcess();

    //load resources
    var load = new LLoader();
    load.load('/V/Static/assets/'+tileSet.image);
    load.addEventListener(LLoader.COMPLETE,function () {

    });
}

/**
 * tile map pass array
 */
function mapPassProcess() {
    eventObj = map.layers.pop().objects;
    var layer = map.layers.pop().data,layerLen;
    layerLen = layer.length;
    var j=0,x=0,width=map.width;
    for (var i = 0; i < layerLen; i++,x++) {
        var y = Math.floor(i/width);
        if (j !== y){x=0;j=y;mapPass.push([]);}
        mapPass[j].push(layer[i]);
    }
}

/**
 * tile map event data process
 */
function mapEventProcess() {
    var len = eventObj.length;
    for (var i = 0; i < len; i++) {
        // addEvent(eventObj[i]);
    }
    delete eventObj;
}