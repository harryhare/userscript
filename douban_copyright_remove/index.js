// ==UserScript==
// @name         Remove Douban Copyright
// @namespace    https://github.com/harryhare
// @version      0.1.3
// @description  for Bonnae broadcast on douban.com
// @author       harryhare
// @match        https://www.douban.com/note/**
// @match        https://*.douban.com/review/**
// @include      https://www.douban.com/node/**
// @include      https://*.douban.com/review/**
// @grant        none
// ==/UserScript==



(function() {
    'use strict';

    var targets=document.querySelectorAll('div#link-report.note,div.review-content.clearfix');
    for(let i=0;i<targets.length;i++){
        targets[i].oncopy=(e)=>{e.stopPropagation();};
    }
})();
