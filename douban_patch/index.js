// ==UserScript==
// @name         douban patch
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  prevent the redirect when click on reboradcast
// @author       harryhare
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

})();