/*! Tomcat360.com (c) 2015 
	Author: Renzhao
*/
define("test/nav",["log"],function(t){"use strict";var n=t("log");n.log;!function(){$(".nav a").mouseover(function(){var t=$(".nav a").index(this);$(".hover").stop().animate({left:90*t+180+"px"},200,function(){$(this).animate({left:90*t+50+"px"},100,function(){$(this).animate({left:90*t+100+"px"},100)})})}),$(".nav a").mouseout(function(){$(".hover").stop().animate({left:"-20px"},200,function(){$(".hover").animate({left:"20px"},200)})})}()});