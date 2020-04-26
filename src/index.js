import React, {Component} from "react";
import ReactDom from "react-dom";
import RouteMap from "./router";
import "./index.less";
import constant from "./services/request/constant";
// 引入组件
import common from "common";
window.common = common;
// 把权限进行本次存储
// import "./services/db";
// 工具类
import Utile from "./services/utile";
const tool = new Utile();
import db from "db";
window.db = db;
window.tool = tool;
// api接口配置10.16.126.136:8123
const url = new constant.Constant();
window.url = url;
ReactDom.render(<RouteMap />,document.getElementById("root"));