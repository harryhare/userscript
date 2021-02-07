// ==UserScript==
// @name         一亩三分地 Anti Anti Adblock
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  豆瓣广播详情页点赞坏掉，增加备用点赞按钮
// @author       harryhare
// @license      GPL 3.0
// @downloadURL  https://github.com/harryhare/userscript/raw/master/1point3acres/index.js
// @icon         https://raw.githubusercontent.com/harryhare/userscript/master/index.png
// @match        https://www.1point3acres.com/**
// @grant        none
// ==/UserScript==


var callback = function (records){
  records.map(function(record){
    console.log('Mutation type: ' + record.type);
    console.log('Mutation target: ' + record.target);
  });
};




(function() {
    'use strict';
	var observer = new MutationObserver(callback);

})();