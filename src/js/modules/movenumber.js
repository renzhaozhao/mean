/**
 *  页面加载时数字变化
 *
 *  @description: 写的比较渣，杰神有空就重写了吧。
 *
 *  @parameters:
 *      selector: String      // 默认为 '.movenumber'，可取所有。
 *
 *  @usage:
 *  ```html
 *      <span class='movenumber'>1541541</span>
 *  ```
 *
 *  ```javascript
        var Movenumber = require("modules/movenumber");
        new Movenumber;
 *  ```
 *  @author: Renzhao
 */
define(function(require, exports, module){
    "use strict";

    var Movenumber = function(selector){
        this.movenumber = selector || ".movenumber";
        this.version = "0.0.1";

        if("string" === typeof this.movenumber){
            this.movenumber = $(this.movenumber);
        }

        if(!this.movenumber.length){
            return this;
        }

        return this._init();
    };
    Movenumber.prototype = {
        _init : function(){
            var self = this;
            self.movenumber.each(function(index, item){
                var el = self.movenumber.eq(index);
                self.show(el);
            });

            return self;
        },
        show : function(el){
            var self = this;
            var action = 0;
            var timer = null;
            
            var number = parseInt(el.text());
            var step = Math.round(number/200)+1;
            timer = setInterval(function(){
                action += step;
                el.text(action);
                if (action > number) {
                    clearInterval(timer);
                    el.text(number.toLocaleString());
                };
            },1);

            return self;
        }
    };
    
    module.exports = Movenumber;
});