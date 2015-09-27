/**
 *  校验器
 *
 *  @description: 提供最基本的校验方法，没什么特殊的技巧
 *
 *  @usage:
 *  ```javascript
 *      var result = validator.isEmpty("text");
 *  ```
 */

define(function(require, exports, module){
    "use strict";

    var Validator = {};
    Validator.version = "1.0.2";

    // 消除左右边两空格
    Validator.trim = function(text){
        var reg = /^\s+|\s+$/g;
        return text.replace(reg, "");
    };

    // 是否为空
    Validator.isEmpty = function(text){
        if(undefined === text || null === text){
            return true;
        }

        text = this.trim(text);
        return (0 === text.length ? true : false);
    };

    // 文本长度是否在一个区间，也可以用于判定长度
    Validator.isInRange = function(text, begin, end){
        text = this.trim(text);
        var l = text.length;
        return (begin <= l && end >= l ? true : false);
    };

    // 两条文本是否相同
    Validator.isTheSame = function(firstString, lastString){
        firstString = this.trim(firstString);
        lastString = this.trim(lastString);

        return firstString === lastString;
    };

    // 获取字符串长度，一个汉字表示两个长度
    Validator.getCharsLength = function(text){
        text = this.trim(text);

        var charsLength = 0;
        for(var i = 0, l = text.length; i < l; ++i){
            if(0 <= text.charCodeAt(i) && 128 >= text.charCodeAt(i)){
                ++charsLength;
            }
            else{
                charsLength += 2;
            }
        }

        return charsLength;
    };

    // 是否为手机号码
    Validator.isTelNumber = function(text){
        text = this.trim(text);
        var reg = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
        return reg.test(text);
    };

    //是否包含空格
    Validator.hasBlank = function(text){
        var reg = /\s/;
        return reg.test(text);
    };

    // 是否为数字序列
    Validator.isNumeric = function(text){
        text = this.trim(text);
        var reg = /^-?[0-9]+$/;
        return reg.test(text);
    };

    // 是否为字母序列
    Validator.isLetter = function(text){
        text = this.trim(text);
        var reg = /^[a-zA-Z]+$/;
        return reg.test(text);
    };

    // 是否为符点数
    Validator.isFloat = function(text){
        text = this.trim(text);
        var reg = /^(?:-?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/;
        return reg.test(text);
    };

    // 是否包含多字节字符 => 对我们来说就是汉字啦
    Validator.isMultibyte = function(text){
        text = this.trim(text);
        var reg = /[^\x00-\x7F]/;
        return reg.test(text);
    };

    //密码强度低
    Validator.isEnough = function(text){
        text = this.trim(text);
        var reg = /^(?=.{6,}).*$/;
        return reg.test(text);
    };
    //密码强度中
    Validator.isMedium = function(text){
        text = this.trim(text);
        var reg = /^(?=.{7,})(?:(?:(?=.*[a-z])(?=.*[A-Z]))|(?:(?=.*[a-z])(?=.*[0-9]))|(?:(?=.*[a-z])(?=.*[^a-zA-Z0-9]))|(?:(?=.*[A-Z])(?=.*[0-9]))|(?:(?=.*[A-Z])(?=.*[^a-zA-Z0-9]))|(?:(?=.*[0-9])(?=.*[^a-zA-Z0-9]))).*$/;
        return reg.test(text);
    };
    //密码强度高
    Validator.isStrong = function(text){
        text = this.trim(text);
        var reg = /^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).*$/;
        return reg.test(text);
    };

    module.exports = Validator;
});