/*! Tomcat360.com (c) 2015 
	Author: Renzhao
*/
define("index",["log"],function(a){"use strict";var n=a("log");n.log;!function(){$(".signup-form").submit(function(a){a.preventDefault();var n={name:$("#name").val(),password:$("#password").val(),email:$("#email").val()};$.ajax({type:"get",dataType:"json",url:ROOT_URL+"public/js/signup",data:n,success:function(a){alert("注册成功！"),window.location.href=ROOT_URL+"index.html"},error:function(){alert("ajax失败")}})})}()});