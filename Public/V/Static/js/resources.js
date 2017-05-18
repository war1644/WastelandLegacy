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
window.userInfo = localStorage.getItem('userInfo');
if(userInfo===null){
    location.href = '/';
}
userInfo = JSON.parse(userInfo);

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

var LoadManage = (function () {
    function LLoadManage(){
        var s = this;
        LExtends(s, LEventDispatcher, []);
        s.llname="ll.file.";
        s.llload="ll.load.";
    }
    p = {
        load : function (l, u, c) {
            var s = this;
            if (!l || l.length == 0) {
                var event = new LEvent(LEvent.COMPLETE);
                event.currentTarget = s;
                event.target = {};
                s.dispatchEvent(event);
                return;
            }
            s.list = l, s.onupdate = u, s.oncomplete = c;
            s.loader = s, s.index = 0, s.loadIndex = 0, s.result = [], s.lresult = [];
            s.loadInit();
        },
        loadInit : function () {
            var s = this;
            if(s.index >= s.list.length){
                return;
            }
            s.loadIndex = 0;
            s.loadStart();
        },
        loadStart : function () {
            var s = this, d, ph, phs, ext;
            if (s.loadIndex >= s.list.length) {
                return;
            }
            d = s.list[s.loadIndex];
            d.progress = 0;
            if (!d.name) {
                d.name = s.llname + s.loadIndex;
            }
            if (!s.lresult[s.llload + d.name]) {
                if (!d["type"]) {
                    ext = getExtension(d.path);
                    if (ext == "txt") {
                        d["type"] = LURLLoader.TYPE_TEXT;
                    } else if (ext == "js") {
                        d["type"] = LURLLoader.TYPE_JS;
                    } else if ((new Array("mp3", "ogg", "wav", "m4a")).indexOf(ext) >= 0) {
                        d["type"] = LSound.TYPE_SOUND;
                    }
                }
                if (d["type"] == LURLLoader.TYPE_TEXT || d["type"] == LURLLoader.TYPE_JS) {
                    s.loader = new LURLLoader();
                    s.loader.parent = s;
                    s.loader.name = d.name;
                    s.loader.addEventListener(LEvent.PROGRESS, s._loadProgress);
                    s.loader.addEventListener(LEvent.ERROR, s._loadError);
                    s.loader.addEventListener(LEvent.COMPLETE, s._loadComplete);
                    s.loader.load(s.url(d.path), d["type"]);
                } else if (d["type"] == LSound.TYPE_SOUND) {
                    s.loader = new LSound();
                    s.loader.parent = s;
                    s.loader.name = d.name;
                    s.loader.addEventListener(LEvent.PROGRESS, s._loadProgress);
                    s.loader.addEventListener(LEvent.ERROR, s._loadError);
                    s.loader.addEventListener(LEvent.COMPLETE, s._loadComplete);
                    s.loader.load(d.path);
                } else if (d["type"] == LFontLoader.TYPE_FONT) {
                    s.loader = new LFontLoader();
                    s.loader.parent = s;
                    s.loader.name = d.name;
                    s.loader.addEventListener(LEvent.ERROR, s._loadError);
                    s.loader.addEventListener(LEvent.COMPLETE, s._loadComplete);
                    s.loader.load(d.path, d.name);
                } else {
                    s.loader = new LLoader();
                    s.loader.parent = s;
                    s.loader.name = d.name;
                    s.loader.addEventListener(LEvent.PROGRESS, s._loadProgress);
                    s.loader.addEventListener(LEvent.ERROR, s._loadError);
                    s.loader.addEventListener(LEvent.COMPLETE, s._loadComplete);
                    s.loader.load(s.url(d.path), LLoader.TYPE_BITMAPDATE, d.useXHR);
                }
                s.loader._loadIndex = s.loadIndex;
            }
            s.loadIndex++;
            s.loadStart();
        },
        _loadProgress : function (e) {
            var loader = e.currentTarget;
            var s = loader.parent;
            d = s.list[loader._loadIndex];
            d.progress = e.loaded / e.total;
            var progress = 0;
            for(var i = 0, l=s.list.length;i<l;i++){
                progress += s.list[i].progress;
            }
            var event = new LEvent(LEvent.PROGRESS);
            event.currentTarget = s;
            event.target = e.currentTarget;
            event.loaded = progress;
            event.total = s.list.length;
            event.responseURL = e.responseURL;
            s.dispatchEvent(event);
        },
        _loadError : function (e) {
            var loader = e.currentTarget;
            var s = loader.parent;
            delete loader.parent;
            loader.removeEventListener(LEvent.ERROR, s._loadError);
            var event = new LEvent(LEvent.ERROR);
            event.currentTarget = s;
            event.target = e.target;
            event.responseURL = e.responseURL;
            s.dispatchEvent(event);
        },
        _loadComplete : function (e) {
            var s = e.currentTarget.parent;
            if(!s){
                return;
            }
            if (e  && e.currentTarget.name) {
                e.currentTarget.removeEventListener(LEvent.COMPLETE, s._loadComplete);
                if (e.currentTarget.name.indexOf(s.llname) >= 0) {
                    e.target = 1;
                }
                if (s.lresult[s.llload + e.currentTarget.name]) {
                    return;
                }
                s.result[e.currentTarget.name] = e.target;
                s.lresult[s.llload + e.currentTarget.name] = 1;
            }
            s.index++;
            e.loaded = e.total = 1;
            s._loadProgress(e);
            delete e.currentTarget.parent;
            if (s.index >= s.list.length) {
                var event = new LEvent(LEvent.COMPLETE);
                event.currentTarget = s;
                event.target = s.result;
                s.dispatchEvent(event);
                LGlobal.forceRefresh = true;
            }
        },
        url : function (u) {
            if (!LGlobal.traceDebug) {
                return u;
            }
            return u + (u.indexOf('?') >= 0 ? '&' : '?') + 't=' + (new Date()).getTime();
        }
    };
    for (var k in p) {
        LLoadManage.prototype[k] = p[k];
    }
    LLoadManage.load = function(l, u, c, e){
        var loadObj = new LLoadManage();
        if(u){
            loadObj.addEventListener(LEvent.PROGRESS, function(event){
                u((event.loaded * 100 / event.total).toFixed(2));
            });
        }
        if(c){
            loadObj.addEventListener(LEvent.COMPLETE, function(event){
                c(event.target);
            });
        }
        if(e){
            loadObj.addEventListener(LEvent.ERROR, e);
        }
        loadObj.load(l);
    };
    return LLoadManage;
})();