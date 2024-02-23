// ==UserScript==
// @name         douban patch
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  prevent the redirect when click on reboradcast
// @author       harryhare
// @license      GPL 3.0
// @downloadURL  https://github.com/harryhare/userscript/raw/master/douban_patch/index.js
// @icon         https://raw.githubusercontent.com/harryhare/userscript/master/index.png
// @match        https://www.douban.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var x=document.getElementsByClassName("status-real-wrapper say");
    for(var i=0;i<x.length;i++){
        //console.log(x[i].attributes["data-status-url"]);
        //x[i].setAttribute("data-status-url",null);
        x[i].removeAttribute("data-status-url",null);
        //console.log(x[i].attributes["data-status-url"]);
    }

    x=document.getElementsByClassName("hd");
    for(var i=0;i<x.length;i++){
        //console.log(x[i].attributes["data-status-url"]);
        //x[i].setAttribute("data-status-url",null);
        x[i].removeAttribute("data-status-url",null);
        //console.log(x[i].attributes["data-status-url"]);
    }

    x=document.getElementsByClassName("block note-block");
    for(var i=0;i<x.length;i++){
        x[i].getElementsByClassName("content")[0].className=""
    }


})();