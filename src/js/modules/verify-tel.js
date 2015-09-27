/**
 *  发送短信息模块
 *
 *  @description: 注册、找回密码需要发短息模块。
 *
 *  @parameters:
 *      id: String              // 默认为 ".verifytel-box"
 *      target: String          // 默认为 "#telphone"，获取到手机 input。
 *      username: String        // 默认为 "#username", 找回密码需要一同发送用户名，该参数用等获取用户名的 input。
 *      type: String            // 默认为 "normal"，仅依靠电话发送短信，"forget" 则找回密码类型，则会提交 `username` 参数一同发送。
 *      totalTime: Number       // 默认为 60，重新发送时间间隔
 *      url: String             // 默认为 "/sendvcode.html"，发送短息的请求地址
 *      done: Function          // 默认开始倒计时，短息成功发送之后的回调函数，用于处理发送成功后的事项。
 *
 *  @functions:
 *      setConfig: Object       // 与 @parameters 相同
 *
 *  @usage:
 *  ```html
 *      <input id="telphone">
 *      <input id="username">
 *
 *      <div class="verifytel-box" data-target="{{String}}" data-username="{{string}}"> <!-- 详见 `target` 与 `username` 参数 -->
 *          <input>
 *          <button type="button">Send</button>
 *      </div>
 *  ```
 *
 *  ```javascript
 *      new verifyTel;
 *  ```
 */

define(function(require, exports, module){
    "use strict";

    if(!String.prototype.hasOwnProperty('trim')){
        String.prototype.trim = function(){
            return this.replace(/^\s+|\s+$/g, '');
        };
    }

    // var $ = require("jquery");
    var formValidator = require("form-validator");

    var VerifyTel = function(selector, params){
        this.version = "0.0.5";
        this.params = {};
        this.errorStatus = {
            1: null,
            2: "该手机已被注册",
            3: "系统错误",
            4: "用户不存在",
            5: "手机与用户不符"
        };

        this.box = selector || ".verifytel-box";
        if("string" === typeof this.box){
            this.box = $(this.box).first();
        }

        if(!this.box.size()){
            return this;
        }

        this.input = this.box.find("input");
        this.btn = this.box.find(".pure-button");
        this.btn.prop("disable", false);
        
        this.setConfig(params);

        return this._init();
    };

    VerifyTel.prototype = {
        _init: function(){
            var self = this;

            self.btn.prop("disabled", false);
            self.btn.click(function(){
                self.sendCode();
            });

            return self;
        },

        setConfig: function(params){
            var self = this;
            params = params || {};
            this.params.telphone = params.target || this.box.data("target") || "#telphone";
            this.params.username = params.username || this.box.data("username") || "#username";
            this.params.imgCode = "#imgCode";
            this.params.totalTime = params.totalTime || 60;
            this.params.type = params.type || "normal";
            this.params.url = params.url || "/sendvcode.html";
            this.params.done = params.done || function(res){
                var curSeconds = self.params.totalTime;
                var id = window.setInterval(function(){
                    self.btn.text(curSeconds + "秒后可重发");
                    if(0 > curSeconds){
                        window.clearInterval(id);
                        self.btn.text("重新发送");
                        self.btn.prop("disabled", false);
                        var url = $('#yzmimg').attr("src").split("?")[0];
                        url += "?" + Math.random();
                        $('#yzmimg').attr("src", url);
                        $('#imgCode').val("");
                    }
                    --curSeconds;
                }, 1000);
            };

            return self;
        },

        _alert: function(msg){
            var parent = this.box.parents(".pure-control-group");
            var alert = parent.find(".xlabel");
            alert.size() && alert.remove();
            alert = $("<div class='xlabel'></div>");
            alert.addClass("error").text(msg);
            parent.append(alert);

            return self;
        },

        sendCode: function(){
            this.ajaxReq && this.ajaxReq.abort();

            var self = this;
            var telNumber = $(self.params.telphone).val().trim();
            var phoneValidator = formValidator["telphone"];
            var status = phoneValidator(telNumber);

            var imgCode = $(self.params.imgCode).val().trim();
            var imgValidator = formValidator["imgCode"];
            var verifyImg = imgValidator(imgCode);
            if(!status.result){
                self._alert(status.msg);
                return self;
            }
            if(!verifyImg.result){
                var alert = $("<div class='xlabel'>请填写正确的验证码</div>");
                $('#imgCode').parent().parent().find('.xlabel').remove();
                $('#imgCode').parent().parent().append(alert);
                return false;
            }

            var data = {
                phone: telNumber
            };

            if("forget" === self.params.type){
                /*data["forgetname"] = $(self.params.username).val().trim();*/
                data["cto"] = "hehe";
                data["forgetname"] = telNumber;
                /*var status = formValidator["username"](data["forgetname"]);
                if(!status.result){
                    self._alert(status.msg);
                    return false;
                }*/
            }

            /*var flag = false;
            this.ajaxReq1 = $.ajax({
                url: ROOT_URL + "/txyzm.html",
                async: false,
                dataType: "json",
                data: {
                    imgCode: $("#imgCode").val()
                },
                success: function(res1){
                   var result1 = res1;
                   if (1 === result1) {
                      flag = true;
                   };                   
                   
                },
                error: function(){ 
                    alert("失败");
                }
            });
            if(!flag){
                var alert = $("<div class='xlabel'>请填写正确的验证码</div>");
                $('#imgCode').parent().parent().find('.xlabel').remove();
                $('#imgCode').parent().parent().append(alert);
                return;
            }*/

            this.ajaxReq = $.ajax({
                url: ROOT_URL + self.params.url + "?t=" + Math.random(),
                data: data,
                dataType: "json",
                success: function(res){
                    var result = res;
                    if(1 === result){
                        self.btn.prop("disabled", true);
                        self.params.done(res);
                    }
                    else{
                        self._alert(self.errorStatus[result]);
                    }
                },
                error: function(){
                    alert("短信发送失败，可能是网络原因");
                }
            });
        }
    };

    module.exports = VerifyTel;
});
