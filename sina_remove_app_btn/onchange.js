// ==UserScript==
// @name         新浪网页端去掉"app 打开"
// @namespace    https://github.com/harryhare
// @version      0.1
// @description  去掉 新浪网页端的 app 打开，浏览完整内容
// @author       harryhare
// @license      GPL 3.0
// @icon         https://raw.githubusercontent.com/harryhare/userscript/master/index.png
// @match        https://*.sina.cn/*
// @match        https://sina.cn/*
// @grant        none
// ==/UserScript==


var counter = 0;

function clean_page() {
    counter += 1;
    console.log("****", counter);
    var x = document.getElementsByClassName("callApp_fl_btn")[0];
    //x.style.position="relative";
    if (x) {
        x.style.display = "none";
    }
    x = document.querySelectorAll(".s_card.z_c1")[0];
    //x.style.overflow="scroll";
    if (x) {
        x.style.height = "auto";
    }

    x = document.querySelectorAll(".look_more")[0];
    if (x) {
        x.style.display = "none";
    }
}

function onchange(records) {
    clean_page();
}

(function () {
    'use strict';
    // onload 太慢了，sina 网页加载太慢
    // window.onload=clean_page;
    clean_page();
    var mo = new MutationObserver(onchange);

    var option = {
        'childList': true,
        'subtree': false,
    };
    mo.observe(document.body, option);
})();

