// ==UserScript==
// @name         Remove Annoying Copyright Claim On Copy
// @namespace    https://github.com/harryhare
// @version      0.4.1
// @description  remove copyright protection on zhihu.com, jianshu.com, douban.com
// @author       harryhare
// @license      GPL 3.0
// @icon         https://raw.githubusercontent.com/harryhare/userscript/master/index.png
// @match        https://*.zhihu.com/**
// @match        https://*.jianshu.com/**
// @match        https://*.douban.com/**
// @match        https://*.csdn.net/**
// @match        https://*.ftchinese.com/**
// @include      https://*.zhihu.com/**
// @include      https://*.jianshu.com/**
// @include      https://*.douban.com/**
// @include      https://*.csdn.net/**
// @match        https://*.ftchinese.com/**
// @grant        none
// ==/UserScript==

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

(function() {
    'use strict';
    if(location.href.match("https://[a-z]+.douban.com")!=null){
        do_douban();
    }else if(location.href.match("https://[a-z]+.csdn.net")!=null){
        do_csdn();
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
