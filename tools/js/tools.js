/**
 * getUrlParame 获取当前URL中某一项参数的值
 * @data 2020-03-04 
 * @param str
 * @return str
 * @author cjun.nino@gmail.com
 */
function getUrlParame(key) {
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
 * @param str
 * @return {Object}
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