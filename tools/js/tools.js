/**
 * getUrlParme 获取当前URL中某一项参数的值
 * @data 2020-03-04 
 * @param str
 * @return str
 * @author cjun.nino@gmail.com
 */
function getUrlParme(key) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == key) {
            return pair[1];
        }
    }
    return (false);
}

/**
 * getAfterUpdateUrl 根据当前URL与新的参数列表形成新的URL - 方法组
 * @data 2020-03-04 
 * @param str, {Object}
 * @return str
 * @author cjun.nino@gmail.com
 */

// 传入参数，防止参数丢失
function getAfterUpdateUrl(baseUrl, parmesNew) {
    var parmesOldList = getParmesList(window.location.search);
    var url = baseUrl;
    var baseUrlArr = url.split("?");
    if (baseUrlArr.length > 0) {
        url = baseUrlArr[0];
    }
    var paramsUrlList = {};
    if (baseUrlArr.length >= 2) {
        paramsUrlList = getParmesList("?" + baseUrlArr[1]);
    }
    var parmesNewList = Object.assign(parmesOldList, paramsUrlList, parmesNew);
    return url + "?" + mosaicParmesList(parmesNewList);
}

//获取URL中的参数列表
function getParmesList(parmesOld) {
    var url = parmesOld;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

// 拼接参数列表
function mosaicParmesList(obj) {
    var params = [];
    Object.keys(obj).forEach((key) => {
        var value = obj[key];
        if (typeof value === 'undefined') {
            value = '';
        }
        params.push([key, encodeURIComponent(value)].join('='));
    })
    return params.join('&');
}

/**
 * deleteUrlParme 删除一个url中的某一个字段
 * @data 2020-03-11 
 * @param str, str
 * @return str
 * @author cjun.nino@gmail.com
 */
function deleteUrlParme(url, ref) {
    var str = "";

    if (url.indexOf('?') != -1)
        str = url.substr(url.indexOf('?') + 1);
    else
        return url;
    var arr = [];
    var returnurl = "";
    var setparam = "";
    if (str.indexOf('&') != -1) {
        arr = str.split('&');
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].split('=')[0] != ref) {
                returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
            }
        }
        return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
    }
    else {
        arr = str.split('=');
        if (arr[0] == ref)
            return url.substr(0, url.indexOf('?'));
        else
            return url;
    }
}
/**
 * 正则表达式组
 * @data 2020-03-04 
 * @author cjun.nino@gmail.com
 */
function regExpGroup() {
    // 汉字
    this.isChinese = /^[\u4e00-\u9fa5]{0,}$/;
    // 邮箱
    this.isEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    // 18位身份证号码
    this.isCard = /^((\d{18})|([0-9x]{18})|([0-9X]{18}))$/;
    // IP地址(由 @飞龙三少 提供)
    this.isIPAddress = /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/;
}

/**
 * ios文本框获取焦点再失去焦点元素与实际位置不符的问题处理
 * @data 2020-04-14 
 * @author cjun.nino@gmail.com
 */
function iosInputFocus() {
    var u = navigator.userAgent;
    var flag;
    var myFunction;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIOS) {
        document.body.addEventListener('focusin', function () {
            flag = true;
            clearTimeout(myFunction);
        });
        document.body.addEventListener('focusout', function () {
            flag = false;
            if (!flag) {
                myFunction = setTimeout(function () {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }, 200);
            } else {
                return
            }
        });
    }
}