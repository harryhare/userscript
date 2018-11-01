// ==UserScript==
// @name         Remove Zhihu Copyright
// @namespace    https://github.com/harryhare
// @version      0.2
// @description  remove copyright protection on zhihu.com
// @author       harryhare
// @match        https://www.zhihu.com/**
// @include      https://www.zhihu.com/**
// @grant        none
// ==/UserScript==

function rewrite_html(e){
    let inner=e.innerHTML;
    e.innerHTML=inner;
}

(function() {
    'use strict';
    document.body.oncopy=(e)=>{e.stopPropagation();};
    /*
    var targets=document.querySelectorAll('span.RichText.CopyrightRichText-richText');
    for(let i=0;i<targets.length;i++){
        //rewrite_html(targets[i].parentElement);
        targets[i].oncopy=(e)=>{e.stopPropagation();};
        targets[i].parentElement.oncopy=(e)=>{e.stopPropagation();};
        targets[i].parentElement.parentElement.oncopy=(e)=>{e.stopPropagation();};
    }*/
})();
