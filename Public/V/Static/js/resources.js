/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 游戏客户端资源载入库
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/02/10 初版
 */
// var userInfo = localStorage.getItem('userInfo');
// if(userInfo===null){
//     location.href = '/';
// }
// userInfo = JSON.parse(userInfo);

(function() {


    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    // Load an image url or an array of image urls
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        } else {
            _load(urlOrArr);
        }
    }

    function _load(url) {
        if(resourceCache[url]) {
            return resourceCache[url];
        } else {
            var img = new Image();
            img.onload = function() {
                resourceCache[url] = img;
                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                    // readyCallbacks[readyCallbacks.length-1]();
                }
            };
            resourceCache[url] = false;
            img.src = url;
        }
    }

    function get(url) {
        if(url){
            return resourceCache[url];
        } else {
            return resourceCache;
        }
    }

    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    function onReady(func) {
        readyCallbacks.push(func);
    }

    window.resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();