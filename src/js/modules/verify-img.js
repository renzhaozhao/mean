/**
 *  图形验证码模块
 *
 *  @description: 点击图形自动刷新验码
 *
 *  @parameters:
 *      id: String      // 默认为 ".verifyimg-box"
 *
 *  @functions:
 *      update: Null    // 更新验证码
 *
 *  @usage:
 *  ```html
 *      <div class="verifyimg-box">
 *          <input>
 *          <img>
 *      </div>
 *  ```
 *
 *  ```javascript
 *      new verifyImg;
 *  ```
 *
 */

define(function(require, exports, module){
    "use strict";

    // var $ = requre("jquery");

    var VerifyImg = function(selector){
        this.version = "0.0.1";
        this.box = selector || ".verifyimg-box";
        if("string" === typeof this.box){
            this.box = $(this.box);
        }
        if(!this.box.size()){
            return this;
        }

        this.input = this.box.children("input");
        this.img = this.box.children("img");

        return this._init();
    };

    VerifyImg.prototype = {
        _init: function(){
            var self = this;
            this.img.click(function(){
                self.update()
            });
            return self;
        },

        update: function(){
            var url = this.img.attr("src").split("?")[0];
            url += "?" + Math.random();
            this.img.attr("src", url);

            return this;
        }
    };

    module.exports = VerifyImg;
});
