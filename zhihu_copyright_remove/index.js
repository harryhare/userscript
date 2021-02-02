// ==UserScript==
// @name         Remove Annoying Copyright Claim On Copy
// @namespace    https://github.com/harryhare
// @version      0.4.2
// @description  remove copyright protection on zhihu.com, jianshu.com, douban.com
// @author       harryhare
// @license      GPL 3.0
// @icon         https://raw.githubusercontent.com/harryhare/userscript/master/index.png
// @match        https://*.zhihu.com/**
// @match        https://*.jianshu.com/**
// @match        https://*.douban.com/**
// @match        https://*.csdn.net/**
// @match        https://*.ftchinese.com/**
// @match        https://*.1point3acres.com/**
// @match        https://blog.skk.moe/**
// @match        https://www.bilibili.com/**
// @grant        none
// ==/UserScript==

// use match instead of include
// https://stackoverflow.com/questions/31817758/what-is-the-difference-between-include-and-match-in-userscripts


function rewrite_html(e){
	let inner=e.innerHTML;
	e.innerHTML=inner;
}

function do_douban(){
	var targets=document.querySelectorAll('div#link-report .note,div.review-content.clearfix');
	for(let i=0;i<targets.length;i++){
		targets[i].oncopy=(e)=>{e.stopPropagation();};
	}
}

function do_csdn(){
	//article_content
	var targets=document.querySelectorAll('div#article_content');
	for(let i=0;i<targets.length;i++){
		targets[i].oncopy=(e)=>{e.stopPropagation();};
	}
}

function do_bilibili(){

	async function clean(e) {
		e.preventDefault();
		var copytext = window.getSelection().toString();
		console.log(await navigator.clipboard.readText());
		await navigator.clipboard.writeText(window.getSelection().toString());


		// 没有效果
		// var clipdata = e.clipboardData || window.clipboardData;
		// console.log(clipdata.getData('Text'));
		// console.log(clipdata.getData('text/plain'));
		// let clipboardItems = [];
		// console.log("items begin");
		// for (const item of e.clipboardData.items) {
			// console.log(item);
			// if (!item.type.startsWith('image/')) {
				// continue;
			// }
			// clipboardItems.push(
				// new ClipboardItem({
					// [item.type]: item,
				// })
			// );
		// }
		// if (clipdata) {
			// clipdata.setData('text/plain', copytext);
			// clipdata.setData('Text', copytext);
		// }
	}
	var targets=document.querySelectorAll('div.article-holder');
	for(let i=0;i<targets.length;i++){
		targets[i].oncopy=clean;
	}
	
	// 没有效果
	// document.body.addEventListener('copy', clean);
	// document.body.oncopy=clean;
}



(function() {
	'use strict';
	if(location.href.match("https://[a-z]+.douban.com")!=null){
		do_douban();
	}else if(location.href.match("https://[a-z]+.csdn.net")!=null){
		do_csdn();
	}else if(location.href.match("https://[a-z]+.bilibili.com")!=null){
		do_bilibili();
	}else{
		document.body.oncopy=(e)=>{e.stopPropagation();};
		//document.documentElement.addEventListener('copy',function(e){e.stopImmediatePropagation()});
		//document.documentElement.addEventListener('copy',function(e){e.stopPropagation()});
		//document.body.addEventListener('copy',function(e){e.stopPropagation()});
		//document.body.oncopy=function(e){e.stopPropagation()};
	}


	/*
	var targets=document.querySelectorAll('span.RichText.CopyrightRichText-richText');
	for(let i=0;i<targets.length;i++){
		//rewrite_html(targets[i].parentElement);
		targets[i].oncopy=(e)=>{e.stopPropagation();};
		targets[i].parentElement.oncopy=(e)=>{e.stopPropagation();};
		targets[i].parentElement.parentElement.oncopy=(e)=>{e.stopPropagation();};
	}*/
})();
