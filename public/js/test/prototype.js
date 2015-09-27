/*! Tomcat360.com (c) 2015 
	Author: Renzhao
*/
define("test/prototype",["log"],function(t){"use strict";var e=t("log");e.log;!function(){function t(){for(var t=0;t<$(".tabsbar a").length;t++)e[t].className="",n[t].style.display="none";this.className="active";n.index(this);n[this.index].style.display="block"}for(var e=$(".tabsbar a"),n=$(".content .item"),a=0;a<e.length;a++)e[a].index=a,e[a].onclick=t}()});