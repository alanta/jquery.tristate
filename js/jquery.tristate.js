/*
 *	Tri-state checkbox input using jQuery
 *	Version 1.0
 *
 *	Author  : Marnix van Valen, Alanta, Tilburg
 *	E-mail  : marnix@alanta.nl
 *	Source  : github.com/alanta/jquery.tristate
 *
 *	License : MIT - http://www.opensource.org/licenses/mit-license.php
 *
 */
(function ($){
	var methods = {
		init : function( options ) {
			return this.each(function(){
				//var config = {};
				//var opts = $.extend(config,options);
				var obj = $(this);
				obj.click(methods.onClick);
				var initialState = methods.getState.call(this);
                methods._apply.call(this, initialState);
			});
		},
		onClick: function(e) {
			e.preventDefault();
			var state = methods.getState.call(this);
			switch( state ){
				case 'on':
					methods._apply.call(this,'off');
					break;
				case 'intermediate':
				case 'off':
				default:
					methods._apply.call(this,'on');
					break;
			}
		},
		getState : function(){
			var obj = $(this);
			return obj.hasClass('on') ? 'on' : 
			( obj.hasClass('intermediate') ? 'intermediate' : 'off' );
		},
		setState : function(value){
			methods._apply.call(this,value);
			return $(this);
		},
		_apply : function(newState){
			var obj = $(this);
			var newValue = 'true';
			switch(newState){
				case 'on':
				case true:
					obj.removeClass('off intermediate').addClass('on');
					break;
				case 'intermediate':
					obj.removeClass('off on').addClass('intermediate');
					break;
				default:
					obj.removeClass('on intermediate').addClass('off');
					newValue = 'false';
					break;
			}
			var input = $('input[type=hidden]', obj);
			if( input.val() !== newValue ) {
				input.val(newValue).trigger('change');
			}
		}
	};

	$.fn.tristate = function(method) {  
		// Method calling logic
		if ( methods[method] ) {
		  return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( method === 'intermediate' || method === 'on' || method === 'off' || method === true || method === false ) {
			return methods.setState.call(this,method);
		} else if ( typeof method === 'object' || ! method ) {
		  return methods.init.apply( this, arguments );
		} else {
		  $.error( 'Method ' +  method + ' does not exist on jQuery.tristate' );
		} 
	};
})(jQuery)