define(function(require){
    "use strict";

    var _ = require('log');
    var log = _.log;

    var form = require("form");
    new form("#signup-form", {
        rulers: [
            {
                name: "repassword",
                validator: function(text, validator){
                    var password = text;
                    var lastPassword = $("#password").val();
                    if(!validator.isTheSame(password, lastPassword)){
                        return {
                            result: false,
                            msg: "两次输入的密码不一致"
                        };

                    }

                    return {
                        result: true
                    }
                }
            },

            {
                name: "password",
                validator: function(text, validator){

                    if(validator.isEnough(text)){
                        $(".qiangdu span").eq(0).addClass("active").siblings().removeClass('active');
                    }
                    if(validator.isMedium(text)){
                        $(".qiangdu span").eq(1).addClass("active").siblings().removeClass('active');
                    }
                    if(validator.isStrong(text)){
                        $(".qiangdu span").eq(2).addClass("active").siblings().removeClass('active');
                    }

                    return {
                        result: true
                    };
                }
            }
        ]
    });
    
    (function(){
        log("test");
        $(".signup-form").submit(function(e){
            e.preventDefault();
            var sInfo = {
                name: $("#name").val(),
                password: $("#password").val(),
                email: $("#email").val()
            };
            
            $.ajax({
                type: "get",
                dataType: "json",
                url: ROOT_URL +"public/js/signup",
                data: sInfo,
                success: function(msg){  
                    alert("注册成功！");
                    window.location.href = ROOT_URL;
                },
                error: function(){
                    alert("ajax失败");
                }
            });        
        });
    })();

    (function(){
        var uTils = require("modules/utils");
        $('#telphone').focusout(function(event) {
            var checkTelphone = $(this).val();
            var result = uTils.checkMobile(checkTelphone);
            if(!result.status){
                alert(result.msg);
                $('#telphone').val("")
            }
        });
        
    })();

	(function(){
        //判断浏览器是否支持placeholder属性
        var supportPlaceholder='placeholder'in document.createElement('input');
        var placeholder=function(input){
            var text = input.attr('placeholder'),
            defaultValue = input.defaultValue;
         
            if(!defaultValue){
         
              input.val(text).addClass("phcolor");
            }
         
            input.focus(function(){
         
              if(input.val() == text){
           
                $(this).val("");
              }
            });
         
          
            input.blur(function(){
         
              if(input.val() == ""){
               
                $(this).val(text).addClass("phcolor");
              }
            });
         
            //输入的字符不为灰色
            input.keydown(function(){
          
              $(this).removeClass("phcolor");
            });
          };
          //当浏览器不支持placeholder属性时，调用placeholder函数
          if(!supportPlaceholder){
         
            $('input').each(function(){
         
              text = $(this).attr("placeholder");
         
              if($(this).attr("type") == "text"){
         
                placeholder($(this));
              }
              if($(this).attr("type") == "password"){
         
                placeholder($(this));
              }
            });
          }
    })();
});
