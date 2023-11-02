/*
* 功能：单点登录的回调处理页面，打包后的界面地址为callback.html
* 1、接收单点登录验证后的返回数据（通过url返回）
* 2、根据返回的access_token获取用户信息（仍然是调用iam站点获取），存在本地storage中
* 3、因为第一次返回的数据只包含了scope: 'openid profile' 数据，没有用户信息（太大，无法通过url返回），所以再次获取
* */

import SecurityService from '../SecurityService';
let mgr = new SecurityService();
mgr.saveProfile().then(() => {
        let search = new URLSearchParams(window.location.search);
        window.location.href = search.get("redirect_uri");

}).catch(() => {
        window.location.href = import.meta.env.VITE_LOGIN_URL;
});