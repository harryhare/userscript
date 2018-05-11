// ==UserScript==
// @name         Bonnae News With Text
// @namespace    https://github.com/harryhare/Bonnae-News
// @version      0.6.2
// @description  for Bonnae broadcast on douban.com
// @author       harryhare
// @license      GPL 3.0
// @downloadURL  https://raw.githubusercontent.com/harryhare/Bonnae-News/master/index2.js
// @icon         https://raw.githubusercontent.com/harryhare/Bonnae-News/master/index.png
// @match        https://www.douban.com/**
// @include      https://www.douban.com/**
// @grant        GM_xmlhttpRequest
// @connect      upaste.me
// @connect      slexy.org
// @connect      paste2.org
// ==/UserScript==

/*
	http://upaste.me/xxxxx
	https://slexy.org/view/xxxxx
	https://paste2.org/xxxxx
*/
var url_prefix=new Map();
url_prefix['upaste.me']='http://upaste.me/';
url_prefix['slexy.org']='https://slexy.org/view/';
url_prefix['paste2.org']='https://paste2.org/';
const default_prefix='upaste.me';
const max_code_length=100;
var url_getContent=new Map();
url_getContent['upaste.me']=getContent1;
url_getContent['slexy.org']=getContent2;
url_getContent['paste2.org']=getContent3;
var url_node=new Map();
var url_node_multi=new Map();

function getContent1(doc){
    return doc.getElementsByTagName('textarea')[0].innerHTML;
}
function getContent2(doc){
    return doc.getElementsByClassName('text')[0].innerHTML;
}
function getContent3(doc){
    return doc.getElementsByClassName('highlight code')[0].innerHTML;
}
function getContent(response){
    var parser=new window.DOMParser();
    var x=response.response;
    var xmlDoc=parser.parseFromString(x,"text/html");
    var url=response.finalUrl;
    var text='';
    var reg=/https?:\/\/([a-zA-Z0-9]+\.[a-z]+)\//g;
    var result=reg.exec(url);
    if(result && result.length>1 && result[1] && url_getContent[result[1]]){
        return url_getContent[result[1]](xmlDoc);
    }
    return "";
}

function attachContent(response){
    if(response.status!=200){
        return;
    }
    if(!url_node[response.finalUrl]){
        return;
    }
    for(var i=0;i<url_node[response.finalUrl].length;i++){
        var node=url_node[response.finalUrl][i]
        if(!node){
            return;
        }
        var text=getContent(response);
        if(!text){
            return;
        }
        node.innerHTML=text;
        node.style='height:52px; overflow: hidden;';
    }
}

function onClick(e){
    //console.log(e.target.attachId);
    var n3=url_node_multi[e.target.attachId];
    if(e.target.innerHTML=='收起'){
        e.target.innerHTML='展开';
        n3.style='height:52px; overflow: hidden;';
    }else{
        e.target.innerHTML='收起';
        n3.style='';
    }
    e.stopPropagation();
}

(function() {
    'use strict';
    var targets=document.querySelectorAll('.new-status .status-item[data-uid="1540691"] .mod .bd .status-saying blockquote p');

	for(let i=0;i<targets.length;i++){
		var t=targets[i];
		var content=t.textContent;
		if(content.length>max_code_length){
			continue;
		}
		var reg=/([a-zA-Z0-9]{4,})\s*\(\s*([a-z0-9]+.[a-z]+)\s*\)/g;
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
            t=t.parentElement;
			var n0=document.createElement('div');
			var n1=document.createElement('blockquote');
			var a=document.createElement('a');
            var b=document.createElement('button');
			t.parentElement.appendChild(n0);
			n0.appendChild(n1);
			n1.appendChild(a);
            n1.appendChild(b);
			a.textContent=href;
			a.setAttribute('href',href);
            b.innerHTML='展开';
            b.onclick=onClick;
            var text=document.createElement('blockquote');
            n0.appendChild(text);
            if(url_node[href]){
                url_node[href].push(text);
            }else{
                url_node[href]=[text];
            }
            b.attachId=href+url_node[href].length;
            url_node_multi[b.attachId]=text;
            text.id=href;
            GM_xmlhttpRequest({
                method: "GET",
                url: href,
                onload: attachContent,
            });
        }
	}
})();
