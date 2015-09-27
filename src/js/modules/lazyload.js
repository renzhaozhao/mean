define(function(require, exports, module){
	var $ = require('jQuery');
	var _ = require('log');
	var log = _.log;
	var error = _.error;

	if(typeof $ !== 'undefined' && typeof $.fn !== 'undefined' && typeof $.fn.jquery === 'string'){
		_.$();
		log('Module lazyload is loading...');
	}
	else{
		error('Can not find jQuery.');
		return;
	}

	var showImg = function($obj){
		var top = $obj[0].getBoundingClientRect().top;
		var h = $(window).height();
		if(top >= 0 && top <= h){
			$obj.attr('src', $obj.attr('original'));
			$obj.removeAttr('original');
		}
	};
	
	module.exports = function(){
		$('img[original]');
		$(window).on('scroll', function(){
			$('img[original]').each(function(index, el){
				showImg($(el));
			});
		});

		$('img[original]').each(function(index, el){
			showImg($(el));
		});
	};

	log('Module lazyload is loaded.');
});