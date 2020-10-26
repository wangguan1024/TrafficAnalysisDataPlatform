import "./css/main.css";
import "./css/alert.css";
import "./css/left.css";
import "./css/middle.css";
import "./css/right.css";
import "./css/lib/horn.css";
import "./css/lib/quit_btn.css";

//设置隐藏菜单显示按钮
import { setHideMenuBtn } from "./js/hideMenu/hideMenu.js";
setHideMenuBtn();

//获取沈阳地图json数据
import { getShenYangMapJson } from "./js/chartsOption/registerMap";
getShenYangMapJson();

import { setMainMap } from "./js/middle/mainMap.js";
setMainMap();

import { setMessageFlow } from "./js/middle/messageFlow.js";
setMessageFlow();

import { setMigrationMap } from "./js/left/migrationMap.js";
setMigrationMap();

import { setTrimNum } from "./js/left/tripNum.js";
setTrimNum();

import { setRegionStayNum } from "./js/right/regionStayNum.js";
setRegionStayNum();

import { setVehicleType } from "./js/right/vehicleType.js";
setVehicleType();
