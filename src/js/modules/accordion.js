/**
 *  手风琴模块
 *
 *  @description: 与 div.accordion 使用。没什么特别要说明的。
 *
 *  @parameters:
 *      id: String          // id 默认为 ".accordion"，只取第一个。
 *
 *  @usage:
 *  ```html
 *      <div class="accordion" data-selected="{{index}}"> <!-- index(Number) 表示为默认展开第几项 -->
 *  ```
 *
 *  ```javascript
 *      new accordion("id");
 *  ```
 *
 */

define(function(require, exports, module){
    "use strict";

    // var $ = require("jquery");

    var Accordion = function(id){
        this.accordion = id || ".accordion";
        this.version = "0.0.1";

        if("string" === typeof this.accordion){
            this.accordion = $(this.accordion).first();
        }

        if(!this.accordion.length){
            return this;
        }

        this.params = {};
        this.params.selected = this.accordion.data("selected") || -1;
        this.headers = this.accordion.find(".title");
        this.index = -1;

        return this._init();
    };

    Accordion.prototype = {
        _init: function(params){
            var self = this;
            self.headers.on("click", function(){
                self._bindEvents($(this));
            });

            return self.select(self.params.selected);
        },

        _bindEvents: function(header){
            var index = this.headers.index(header);

            return this.select(index);
        },

        _slideUpAll: function(){
            var self = this;
            self.headers.each(function(index, item){
                var header = $(item);
                var toggle = header.children(".toggle");
                header.next(".content").slideUp();
                toggle.removeClass("fa-minus").addClass("fa-plus");
            });

            return self;
        },

        select: function(nextIndex){
            var self = this;
            if(0 > nextIndex || self.headers.length <= nextIndex){
                return self;
            }

            if(this.index === nextIndex){
                var header = self.headers.eq(this.index);
                header.next(".content").slideToggle();
                header.children(".toggle")
                    .toggleClass("fa-minus")
                    .toggleClass("fa-plus");
                return self;
            }

            self._slideUpAll();

            var header = self.headers.eq(nextIndex);
            header.children(".toggle").removeClass("fa-plus").addClass("fa-minus");
            header.next(".content").slideDown();

            this.index = nextIndex;

            return self;
        }
    };

    module.exports = Accordion;
});
