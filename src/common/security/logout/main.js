/*
* 功能：单点注销回调处理页面，打包后的界面地址为logout.html
* 1、清理state中的用户信息（sessionStorage中）
* */

import SecurityService from '../SecurityService';

let mgr = new SecurityService();
mgr.signOut();