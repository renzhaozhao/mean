/**
 *  表单验证，一次仅绑定一个 form，若能取到多个，仅取第一个表单。
 *
 *  @description: 表单验证，绑定一个表单，然后进 input 验证自动处理，解放双手。
 *
 *  @parameters:
 *      id: String                  // 默认为 "form"，只取第一个。
 *      isBlurValidate: Boolean     // 默认为 true，input 在 blur 时是否触发校验。
 *      rulers: Array               // 默认为 []，用户自定义行为规则。
 *
 *  @usage:
 *
 *  ```html
 *      <form id="form">
 *          <input type="text" data-validator="username" name="name">
 *      </form>
 *  ```
 *
 *  ```javascript
 *  new form("id", {
 *      // 此处添加自定义规行，对 input 的 name 相匹配。
 *      // 如果存在 data-validator，则先校验内置校验器，如果通过则再继续校验自定义校验器。
 *      rulers: [
 *          {
 *              name: "username",
 *              validator: function(text, validator, input){
 *                  if(validaotr.isMultiText(text)){
 *                      return {
 *                          result: false,
 *                          msg: "用户名不能带中文"
 *                      };
 *                  }
 *
 *                  return { result: true };
 *              }
 *          }
 *      ]
 *  });
 *  ```
 */

define(function(require, exports, module){
	"use strict";

	var validator = require("validator");
    var formValidator = require("form-validator");

	var Form = function(id, params){
		this.version = "0.1.4";
		this.form = id || "form";
        this.params = {};
        this.rulers = [];

		// 如果传入是一个 selector，则从 DOM 中取出
		if("string" === typeof this.form){
			this.form = $(this.form).first();
		}

		// 如果找不到就算了
		if(!this.form.size()){
			return this;
		}

		return this._init(params);
	}

	Form.prototype = {
		_init: function(params){
			var self = this;
			this.inputlist = this.form.find("input:not([disabled]):not([type=hidden]):not([type='checkbox']):not([type='radio'])");

            params = params || {};
            this.params.isBlurValidate = (false === params.isBlurValidate ? false : true);
            this.rulers = params.rulers || [];

            this.params.isBlurValidate && this.inputlist.blur(function(e){
				var input = $(this);
				self._validateInput(input);
			});

            this.inputlist.focus(function(){
                self.closeAlert($(this));
            });

            this.form.submit(function(){
                for(var i = 0, l = self.inputlist.size(); i < l; ++i){
                    var input = self.inputlist.eq(i);

                    if(!self._validateInput(input)){
                        return false;
                    }
                }

                return true;
            });

            return self;
		},

        // 验证输入
		_validateInput: function(input){
            var self = this;
            var inputName = input.attr("name");
			var validatorType = input.data("validator");
            var fnArray = formValidator[validatorType] ? [formValidator[validatorType]] : [];

            for(var i = 0, l = self.rulers.length; i < l; ++i){
                var ruler = self.rulers[i];
                if(ruler["name"] === inputName){
                    if(typeof ruler['validator'] === 'function'){
                        fnArray.push(ruler["validator"]);
                    }

                    break;
                }
            }


            var action = true;
            for(var i = 0, l = fnArray.length; i < l; ++i){
                var fn = fnArray[i];
                var status = fn(input.val(), validator, input);

                if(!status.result){
                    self.alert(input, status);
                    action = false;
                }
            }

            return action;
		},

        _getAlert: function(input){
            var parent = input.parents(".pure-control-group");
            return parent.find(".xlabel");
        },

        submit: function(callback){
            this.form.submit(callback);
            return this;
        },

        // 弹出提示
        alert: function(input, assign){
            this.closeAlert(input);

            var statusClass = assign.status ? "success" : "error";

            var alert = $("<div></div>");
            alert.addClass("xlabel")
                .addClass(statusClass)
                .html(assign.msg);

            input.parents(".pure-control-group")
                .append(alert);

            return self;
        },

        closeAlert: function(input){
            var alert = this._getAlert(input);
            if(alert.size()){
                alert.remove();
            }

            return self;
        }
	};

	module.exports = Form;
});
