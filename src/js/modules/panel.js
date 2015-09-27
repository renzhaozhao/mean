/**
 *  面板模块
 *
 *  @description: 面板模块，点击头部可以实现展开与收缩。
 *
 *  @parameters:
 *      id: String      // 默认为 ".panel"，只取第一个。
 *
 *  @usage:
 *
 *  ```html
 *      <div class="panel">
            <header>
                <h3 class="title">标题</h3>
            </header>
            <div class="panel-content">内容</div>
        </div>
 *  ```
 *
 *  ```javascript
 *      new panel;
 *  ```
 */

define(function(require, exports, module){
    "use strict";

    // var $ = require("jquery");

    var Panel = function(id){
        this.panel = id || ".panel";

        if("string" === typeof this.panel){
            this.panel = $(this.panel).first();
        }

        if(!this.panel.length){
            return this;
        }

        return this._init();
    };

    Panel.prototype = {
        _init: function(){
            this.body = this.panel.find(".panel-content").first();
            this.toggler = this.panel.find(".title .toggle").first();
            this._bindEvents();

            return this;
        },

        _bindEvents: function(){
            var self = this;
            this.panel.children("header").click(function(){
                self.toggle();
            });

            return self;
        },

        _isDisplay: function(){
            return ("none" === this.body.css("display") ? false : true);
        },

        toggle: function(){
            var isDisplay = this._isDisplay();
            return (isDisplay ? this.hide() : this.show());
        },

        show: function(){
            this.body.slideDown();

            return this;
        },

        hide: function(){
            this.body.slideUp();

            return this;
        }
    };

    module.exports = Panel;
});
