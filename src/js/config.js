(function(){
	var int2str = function(num){
		if(typeof num !== 'number'){
			return '00';
		}
		else{
			return num > 9 ? num.toString() : num > 0 ? '0' + num : '00';
		}
	};
	var int3str = function(num){
		if(typeof num !== 'number'){
			return '000';
		}
		else{
			return num > 99 ? num.toString() : '0' + int2str(num);
		}
	};
	var getTime = function(){
		var date = new Date();
		var timeStr = int2str(date.getHours()) + ':' +
				int2str(date.getMinutes()) + ':' +
				int2str(date.getSeconds()) + ' ' + int3str(date.getMilliseconds());
		return timeStr;
	};

	var ua = navigator.userAgent;
	var isIE = /(Trident|MSIE)/i.test(ua);
	var lowIEVersion = /MSIE\s?(\d+\.\d+)/i.exec(ua);
	var isLowIE = lowIEVersion !== null ? parseInt(lowIEVersion[1]) > 8 ? false : true : false;
	var log = console.log;
	var error = function(){
		var args = arguments;
		var str;
		var i;
		var len;
		if(isLowIE){
			str = '[' + getTime() + ']';
			for(i = 0, len = args.length; i < len; i++){
				str += ' ' + args[i];
			}
			log(str);
		}
		else{
			str = isIE ? ['[%s]', getTime()] :
				['%c[%s]%c', 'color:red;font-weight:bold;', getTime(), 'color:inherit;'];
			for(i = 0, len = args.length; i < len; i++){
				str.push(args[i]);
			}
			log.apply(console, str);
		}
	};

	if(typeof ROOT_URL !== 'string'){
		error('base url is not defined');
	}
	else{
		var jquery = 'jquery-1.11.3.min.js';
		var raphael = 'raphael' + (seajsEnv.mode === 'development' ? '-2.1.4.js' : '-2.1.4.min.js');
		var eve = 'eve.min.js';
		if(typeof seajs !== 'undefined'){
			window.seajsEnv = window.seajsEnv || {
				'mode': 'development',
				//'mode': 'production',
				'debug': !true
			};
			seajs.config({
				'base': ROOT_URL + (seajsEnv.mode === 'development' ? '/src' : '/public') + '/js',
				'vars': {
					'locate': 'zh_CN'
				},
				'alias': {
					'jQuery': ROOT_URL + '/public/libs/js/' + jquery,
					'raphael': ROOT_URL + '/public/libs/js/' + raphael,
					'eve': ROOT_URL + '/public/libs/js/' + eve,
					'rich-editor': ROOT_URL + '/public/libs/kindeditor/kindeditor-min.js',
					'fancybox-mousewheel': ROOT_URL + '/public/libs/fancybox/jquery.mousewheel-3.0.6.pack',
					'fancybox': ROOT_URL + '/public/libs/fancybox/jquery.fancybox.min',
					'fancybox-buttons': ROOT_URL + '/public/libs/fancybox/helpers/jquery.fancybox-buttons',
					"mx-slide": "/public/libs/mx-slide-min.js",
					"fullPage": "/public/libs/jquery.fullPage.min.js",
					"easie": "/public/libs/jquery.easie.js",

					'utils': 'modules/utils',
					'lang': 'i18n/{locate}/sys',
					'log': 'modules/log',
					'cookie': 'modules/cookie',

					'validator': 'modules/validator',
					'form-validator': 'modules/form-validator',
					'form': 'modules/form',
					'verify-tel': 'modules/verify-tel',
					'verify-img': 'modules/verify-img',
					'tab': 'modules/tab',
					'ring': 'modules/ring',
					'accordion': 'modules/accordion',
					'slides': 'modules/slides',
					'editor': 'modules/editor',
					'progress': 'modules/progress',
					'lightbox': 'modules/fancybox',
					'dialog': 'modules/dialog',

					//css
					'fancyboxCss': [ ROOT_URL +'/lib/fancybox/jquery.fancybox.css', ROOT_URL + '/lib/fancybox/helpers/jquery.fancybox-buttons.css'],
				},
				'preload': [
					Function.prototype.bind ? "" : "es5-safe"
				]
			});
			seajs.use('log', function(_){
				_.log('Seajs is ready, version:', seajs.version);
			});
		}
		else{
			error('Can not find Seajs. Please check the network or script tags.');
		}
	}
})();