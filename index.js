// ==UserScript==
// @name         Bonnae News
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  for Bonnae broadcast on douban.com
// @author       harryhare
// @match        https://www.douban.com/**
// @grant        none
// ==/UserScript==



(function() {
    'use strict';

    // Your code here...
    var targets=$('.new-status[data-uid="1540691"] .status-item .mod .bd .status-saying blockquote p');

	/*
		http://upaste.me/xxxxx
		https://slexy.org/view/xxxxx
		https://paste2.org/xxxxx (注意代码区分大小写)
	*/
	var url_prefix=new Map();
	url_prefix['upaste.me']='http://upaste.me/';
	url_prefix['slexy.org']='https://slexy.org/view/';
	url_prefix['paste2.org']='https://paste2.org/';
	const default_prefix='upaste.me';
	const max_code_length=100;
	
	for(let i=0;i<targets.length;i++){
		var t=targets[i];
		var content=t.textContent;
		if(content.length>max_code_length){
			continue;
		}
		var reg=/([a-zA-Z0-9]{4,})\s*\(([a-z0-9]+.[a-z]+)\)/g;
		var reg2=/([a-zA-Z0-9]{10,})/g;
		var result=reg.exec(content);
		var href='';
		var find=false;
		if(result && result.length>2 && result[2]){
			href=url_prefix[result[2]]+result[1];
			find=true;
		}
		if(!find){
			result=reg2.exec(content);
			if(result && result.length>1){
				href=url_prefix[default_prefix]+result[1];
				find=true;
			}
		}
		if(find){
			var n1=document.createElement('a');
			var n2=document.createElement('p');
			n2.appendChild(n1);
			//todo jsonp get the html content
			n1.textContent=href;
			n1.setAttribute('href',href);
			t.parentElement.parentElement.appendChild(n2);
		}
	}
})();