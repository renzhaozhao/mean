/**
 *  表单校验器
 *
 * @description: 仅仅做为校验作用。
 *
 * @usage: 
 * 
 *  ```javascript
 *      var usernameChecking = Formvalidator["username"];
 *      var result = usernameChecking("your text");
 *  ```
 */

define(function(require, exports, module){
    "use strict";

    var validator = require("validator");

    var FormValidator = {
        version: "0.0.2"
    };

    // 普通用户名
    FormValidator["username"] = function(text){
        var min = 4;
        var max = 16;

        if(validator.isEmpty(text)){
            return {
                result: false,
                msg: "用户名不能为空"
            };
        }
        if(!validator.isInRange(text, min, max)){
            return {
                result: false,
                msg: "用户名长度在" + min + "位到" + max + "位之间"
            };
        }

        return {
            result: true,
        };
    };

    // 密码
    FormValidator["password"] = function(text){
        if(validator.isEmpty(text)){
            return {
                result: false,
                msg: "密码不能为空"
            };
        }

        if(!validator.isInRange(text, 6, 16)){
            return {
                result: false,
                msg: "密码应该在6-16位"
            }
        }

        if(validator.isNumeric(text)){
            return {
                result: false,
                msg: "不能为纯数字"
            }
        }

        if(validator.isLetter(text)){
            return {
                result: false,
                msg: "不能为纯字母"
            }
        }

        if(validator.hasBlank(text)){
            return {
                result: false,
                msg: "不能包含空格"
            }
        }

        return {
            result: true
        };
    };

    // 手机号
    FormValidator["telphone"] = function(text){
        if(validator.isEmpty(text)){
            return {
                result: false,
                msg: "手机号不能为空"
            };
        }
        if(!validator.isInRange(text, 11, 11)){
            return {
                result: false,
                msg: "手机号格式不正确"
            };
        }

        return {
            result: true
        };
    };

    //邮箱
    FormValidator["email"] = function(text){
        if(validator.isEmpty(text)){
            return {
                result: false,
                msg: "邮箱不能为空"
            };
        }
        if(!validator.isEmail(text)){
            return {
                result: false,
                msg: "邮箱格式不正确"
            };
        }

        return {
            result: true
        };
    };

    //验证码
    FormValidator["imgCode"] = function(text){
        if(validator.isEmpty(text)){
            return {
                result: false,
                msg: "请填写验证码"
            };
        }
        if(!validator.isInRange(text, 4, 4)){
            return {
                result: false,
                msg: "验证码格式不正确"
            };
        }
        

        return {
            result: true
        };
    }

    //金额
    FormValidator["sum"] = function(text){
        if(validator.isEmpty(text)){
            return {
                result: false,
                msg: "提现金额不能为空"
            };
        }
        
        if(!validator.isSum(text)){
            return {
                result: false,
                msg: "提现金额格式不正确"
            }
        }

        return {
            result: true
        };
    }

    // 必填项
    FormValidator["notempty"] = function(text){
        if(validator.isEmpty(text)){
            return {
                result: false,
                msg: "请填写该项"
            };
        }

        return {
            result: true
        };
    };

    module.exports = FormValidator;
});
