/*! Tomcat360.com (c) 2015 
	Author: Renzhao
*/
define("modules/verify-img",[],function(i,t,s){"use strict";var n=function(i){return this.version="0.0.1",this.box=i||".verifyimg-box","string"==typeof this.box&&(this.box=$(this.box)),this.box.size()?(this.input=this.box.children("input"),this.img=this.box.children("img"),this._init()):this};n.prototype={_init:function(){var i=this;return this.img.click(function(){i.update()}),i},update:function(){var i=this.img.attr("src").split("?")[0];return i+="?"+Math.random(),this.img.attr("src",i),this}},s.exports=n});