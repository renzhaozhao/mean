/**
 * Module Polyfill v0.1
 * polyfill
 *
 * @author: Jerry
 * @email: superzcj_001@163.com
 * Copyright 2015
 */
define(function(require, exports, module){
	var _ = require('log');
	var log = _.log;
	var error = _.error;
	log('es5-safe is loading...');
	require('es5-safe');
	log('es5-safe is loaded.');
	module.exports = {};
});