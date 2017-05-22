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

(()=>{
    let resourceCache = {};
    let loading = [];
    let readyCallbacks = [];

    // Load an image url or an array of image urls
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            urlOrArr.forEach(function(urlObj) {
                _load(urlObj);
            });
        } else {
            _load(urlOrArr);
        }
    }

    function _load(urlObj) {
        if(resourceCache[urlObj.name]) {
            return resourceCache[urlObj.name];
        } else {
            let img = new Image();
            img.onload = function() {
                resourceCache[urlObj.name] = img;
                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };
            resourceCache[urlObj.name] = false;
            img.src = urlObj.path;
        }
    }

    function get(name) {
        if(name){
            return resourceCache[name];
        } else {
            return resourceCache;
        }
    }

    function isReady() {
        let ready = true;
        // for(let k in resourceCache) {
        //     console.log(k);
        //     if(!resourceCache[k]) {
        //         ready = false;
        //     }
        // }
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

var Ajax = (()=>{
    function Ajax () {
        this.responseType = null;
        window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
        this.canUseBlob = window.Blob || window.BlobBuilder;
        let protocol = location.protocol;
        this.local = !(protocol == "http:" || protocol == "https:");
    }
    Ajax.prototype = {
        TEXT : "text",
        JSON : "json",
        ARRAY_BUFFER : "arraybuffer",
        BLOB : "blob",
        get : function (url, data, oncomplete, onerror) {
            this.getRequest("GET", url, data, oncomplete, onerror);
        },
        post : function (url, data, oncomplete, onerror) {
            this.getRequest("POST", url, data, oncomplete, onerror);
        },
        getRequest : function (t, url, d, oncomplete, err) {
            let k, data = "", a = "";
            this.err = err;
            var ajax = this.getHttp();
            if (!ajax) {
                return;
            }
            if (d) {
                for (k in d) {
                    data += (a + k + "=" + d[k]);
                    a = "&";
                }
            }
            if (t.toLowerCase() == "get" && data.length > 0) {
                url += ((url.indexOf('?') >= 0 ? '&' : '?') + data);
                data = null;
            }
            ajax.onerror = function(e){
                if(err){
                    err(e);
                    err = null;
                }
            };
            let progress = this.progress;
            this.progress = null;
            ajax.addEventListener("progress", function(e){
                if(e.currentTarget.status == 404){
                    if (err) {
                        err(e.currentTarget);
                        err = null;
                    }
                }else if(e.currentTarget.status == 200){
                    if(progress){
                        progress(e);
                    }
                }
            }, false);
            ajax.open(t, url, true);
            if (this.responseType) {
                if(this.responseType == this.JSON){
                    try{
                        ajax.responseType = this.responseType;
                    }catch(e){
                        ajax.responseType = this.TEXT;
                        ajax._responseType = "json";
                    }
                }else{
                    ajax.responseType = this.responseType;
                }
                this.responseType = this.TEXT;
            }
            ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            ajax.onreadystatechange = function (e) {
                var request = e.currentTarget;
                if (request.readyState == 4) {
                    if (request.status >= 200 && request.status < 300 || request.status === 304) {
                        if (oncomplete) {
                            if(request._responseType == s.JSON){
                                request._responseType = s.TEXT;
                                oncomplete(JSON.parse(request.responseText));
                            }else if (request.responseType == s.ARRAY_BUFFER || request.responseType == s.BLOB || request.responseType == s.JSON) {
                                oncomplete(request.response);
                            } else if (request.responseText.length > 0) {
                                oncomplete(request.responseText);
                            } else {
                                oncomplete(null);
                            }
                        }
                    } else {
                        if (err) {
                            err(request);
                            err = null;
                        }
                    }
                }
            };
            ajax.send(data);
        },
        getHttp : function () {
            if (typeof XMLHttpRequest != UNDEFINED) {
                return new XMLHttpRequest();
            }
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    if (!this.err) {
                        this.err(e);
                    }
                }
            }
            return false;
        }
    };
    return new Ajax();
})();
