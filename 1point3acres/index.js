// ==UserScript==
// @name         一亩三分地 Anti Anti Adblock
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description  在开启Adblock 插件后，浏览网站会出现烦人的弹窗，这个插件会抑制弹窗出现
// @author       harryhare
// @license      GPL 3.0
// @downloadURL  https://github.com/harryhare/userscript/raw/master/1point3acres/index.js
// @icon         https://raw.githubusercontent.com/harryhare/userscript/master/index.png
// @match        https://www.1point3acres.com/**
// @grant        none
// ==/UserScript==


var callback = function (records) {
	records.map(function (record) {
		if (record.addedNodes.length != 0) {
			// console.log('Mutation type: ' + record.type);
			// console.log('Mutation target: ');
			// console.log(record.target);
			// console.log(record.addedNodes);
			for(var i=0;i<record.addedNodes.length;i++){
				var node=record.addedNodes[i];
				if(node.className=="fc-ab-root"){
					// 直接删掉页面会卡住
					// node.parentElement.removeChild(node);
					// 模仿点击关闭
					document.querySelector("button.fc-close").click();
				}
			}
		}
	});
};

(function () {
	'use strict';

	var mo = new MutationObserver(callback);

	var option = {
		'childList': true,
		'subtree': false,
	};

	mo.observe(document.body, option);

})();
