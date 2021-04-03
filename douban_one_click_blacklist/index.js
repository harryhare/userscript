// ==UserScript==
// @name         douban one click blacklist
// @namespace    https://github.com/harryhare/
// @version      0.0.1
// @description  add button to douban to delete follower
// @author       harryhare
// @license      GPL 3.0
// @downloadURL  https://github.com/harryhare/userscript/raw/master/douban_follower_delete/index.js
// @icon         https://raw.githubusercontent.com/harryhare/userscript/master/index.png
// @match        https://www.douban.com/contacts/rlist**
// @grant        none
// ==/UserScript==


var i = 0;
var button;
var ck = "";
var url_ban = "/j/contact/addtoblacklist";
var url_unban = "/j/contact/unban";

//time delay
var interval = 2000;
var interval_id;

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

var user_list = [];
var name_map = {};
var node_map = {};
var href_map = {};
var button_list = [];
var cur = 0;


function ban(userid, name, node, href) {
    var xmlhttp = new XMLHttpRequest();
    var url = url_ban;
    var data = "people=" + userid + "&ck=" + ck;
    console.log('ban:', data);
    node.innerHTML = "<a href='" + href + "'>正在ban:" + name + "</a>";
    xmlhttp.open("POST", url, asyn);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

        }
    };
    xmlhttp.send(data);
}


// 评论
function process_comment() {
    let items = document.querySelectorAll("div.item .meta-header");
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let a = item.children[0];
        let href = a.href;
        let name = a.title;
        if (href[href.length - 1] === "/") {
            href = href.substr(0, href.length - 1)
        }
        const j = href.lastIndexOf("/");
        let user_id = href.substr(j + 1, href.length - j);
        let b = document.createElement('a');
        //b.class = "a-btn-add mr10 add_contact";
        //b.class = "react-btn";
        //b.class="action-bar-group";
        //b.class="report-comment-btn";
        b.id = user_id;
        b.innerHTML = '加入黑名单';
        //b.onclick = click_unfollow;
        //b.style = "align: right;";
        b.onmouseover = (e) => {
            e.target.style.opacity = 1;
            //e.target.style.visibility = visible;
        };
        b.onmouseout = (e) => {
            e.target.style.opacity = 0;
            //e.target.style.visibility = hidden;
        };
        b.style = "float: right; opacity: 0;";
        //b.style = "float: right; visibility: hidden;"; // 点不到
        item.append(b);
    }
}

// 点赞
function process_like() {

}

// 转发
function process_rec() {

}

// 收藏
function process_collect() {

}


(function () {
    'use strict';

    ck = getCookie("ck");
    let url = window.location.href;
    url = url.replace("#sep", "");
    const i = url.indexOf("?");
    const page = url.substr(0, i);
    const arg = url.substr(i + 1, url.length - i);
    const status_reg = /https:\/\/www\.douban\.com\/people\/[^\/]+\/status\/\d+\//g;
    const note_reg = /https:\/\/www\.douban\.com\/note\/\d+\//g;
    let page_mode = "None";
    if (status_reg.test(page)) {
        page_mode = "status";
    } else if (note_reg.test(page)) {
        page_mode = "node";
    } else {
        return;
    }

    let tab_mode = "comment";
    if (arg.indexOf("tab=comment") !== -1) {
        tab_mode = "comment";
    } else if (arg.indexOf("tab=like") !== -1) {
        tab_mode = "like";
    } else if (arg.indexOf("tab=rec") !== -1) {
        tab_mode = "rec";
    } else if (arg.indexOf("tab=collect") !== -1) {
        tab_mode = "collect";
    }


    if (tab_mode === "comment") {
        process_comment();
    } else if (tab_mode === "like") {
        process_like();
    } else if (tab_mode === "rec") {
        process_rec();
    } else if (tab_mode === "collect") {
        process_collect();
    }
})();