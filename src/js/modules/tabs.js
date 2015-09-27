/**
 *	标签切换
 *
 *	@description: 标签切换组件。
 *
 *	@parameters:
 *		id: String 			// 默认为 ".tabs"
 *
 *	@usage:
 *	```html
 *		<div class="tabs">
 *			<nav class="tabsbar" data-selected="{{Number}}"> <!-- 默认选择第几个选项卡 -->
 *				<a>item</a>
 *				<a>item</a>
 *			</nav>
 *			<div class="content">
 *				<div class="item">
 *					this is the content of TAB 1
 *				</div>
 *				<div class="item">
 *					this is the content of TAB 2
 *				</div>
 *			</div>
 *		</div>
 *	```
 *
 *	```javascript
 *		var tabs = require("tabs");
 *		new tabs;
 *	```
 */

define(function(require, exports, module){
	"use strict";

	// var $ = require("jquery");

	var Tabs = function(selector){
		this.tabs = selector || ".tabs";
		this.version = "0.0.1";

		if("string" === typeof this.tabs){
			this.tabs = $(this.tabs).first();
		}

		for(var i = 0, l = this.tabs.length; i < l; ++i){
			this._init(this.tabs.eq(i));
		}

		return this;
	};

	Tabs.prototype = {
		_init: function(tab){
			var index = tab.data("selected") || 0;
			this.setTab(index);

			this._bindEvents(tab);

			return this;
		},

		_getTabItems: function(tab){
			return tab.children(".tabsbar").children('a');
		},

		_getContentItems: function(tab){
			return tab.children(".content").children(".item");
		},

		_bindEvents: function(tab){
			var self = this;
			var tabItems = self._getTabItems(tab);
			for(var i = 0, l = tabItems.length; i < l; ++i){
				var item = tabItems.eq(i);
				(function(index){
					item.click(function(){
						self.setTab(index);
						return false;
					});
				})(i);
			}
		},

		selectedIndex: function(tab){
			tab = tab || this.tabs.first();
			var tabItems = this._getTabItems(tab);
			var curIndex = -1;
			for(var i = 0, l = tabItems.length; i < l; ++i){
				var tabItem = tabItems.eq(i);
				if(tabItem.hasClass("active")){
					curIndex = i;
					return curIndex;
				}
			}

			return curIndex;
		},

		setTab: function(nextIndex, tab){
			tab = tab || this.tabs.first();
			var curIndex = this.selectedIndex(tab);
			if(nextIndex === curIndex){
				return this;
			}

			var tabItems = this._getTabItems(tab);
			var contentItems = this._getContentItems(tab);

			tabItems.removeClass("active")
				.eq(nextIndex).addClass("active");
			contentItems.hide()
				.eq(nextIndex).show();

			return this;
		}
	};

	module.exports = Tabs;
});