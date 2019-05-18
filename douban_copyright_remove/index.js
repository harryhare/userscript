// ==UserScript==
// @name         Remove Douban Copyright
// @namespace    https://github.com/harryhare
// @version      0.1.4
// @description  for Bonnae broadcast on douban.com
// @author       harryhare
// @license      GPL 3.0
// @downloadURL  https://github.com/harryhare/userscript/raw/master/douban_copyright_remove/index.js
// @icon         https://raw.githubusercontent.com/harryhare/userscript/master/index.png
// @match        https://www.douban.com/note/**
// @match        https://*.douban.com/review/**
// @include      https://www.douban.com/node/**
// @include      https://*.douban.com/review/**
// @grant        none
// ==/UserScript==



(function() {
    'use strict';

    document.body.oncopy=(e)=>{e.stopPropagation();};
    var targets=document.querySelectorAll('div#link-report .note,div.review-content.clearfix');
    for(let i=0;i<targets.length;i++){
        targets[i].oncopy=(e)=>{e.stopPropagation();};
    }
})();
