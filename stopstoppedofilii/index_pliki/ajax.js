(function($){
    "use strict";
	if(!(window.elementor)){return false;}
	var ajax_running = false;
	var AjaxEl = {
		
		init: function(){
			
			var widgets = {
				'magazinify-mag-tiles.default' : AjaxEl.ajaxCall,
			};

			$.each( widgets, function( widget, callback ) {
				elementor.hooks.addAction( 'panel/open_editor/widget', callback );
			});
			
		},
		
		ajaxCall: function(panel, model, view){	
			
			// panel:  	The Panel object
			// model:  	The Backbone model instance
			// view:  	The Backbone view instance
			if(model && view){} // just for removing not used error
			var mz_post_terms 		= panel.$el.find( '.elementor-control-input-wrapper select[data-setting="mz_post_terms"]' );
			AjaxEl.doAjaxCallTerms('post', mz_post_terms);

		},
		
		// AJAX CALL TERMS
		doAjaxCallTerms:	function (current_post_type, current_categories){
			
			
			var requestData = {
				action: 'mz_action_post_terms',
				current_post_type: current_post_type,
			};
			
			
			$.ajax({
				type: 		'POST',
				url: 		mz_ajax_object.mz_ajax_url,
				cache:		true,
				data: 		requestData,
				success: 	function(data) {
					AjaxEl.AjaxProcessTerms(data, current_categories);
				},
				error: 		function(MLHttpRequest, textStatus, errorThrown) {
					console.log(textStatus + ': ' + errorThrown);
				}
			});	
	
		},

		// AJAX PROCESS TERMS
		AjaxProcessTerms: function(data, current_categories){
			
			
			//console.log(data);
			
			//read the server response
			var result = '';
			var queriedObj = $.parseJSON(data); //get the data object
			var slugs = queriedObj.data_slugs;
			var names = queriedObj.data_names;
			var numberOfCats = slugs.length;
			
			
			for(var i = 0; i < numberOfCats; i++){
				result += '<option value="'+slugs[i]+'">'+names[i]+'</option>';
			}
			
			current_categories.html(result);
			
			//current_categories.parent().find('span.select2 *').css({opacity:1,maxWidth:'100%',maxHeight:'100%'});
			ajax_running = false; // finish the loading for this block
		},
		
	};
	
	$( window ).on( 'elementor/frontend/init', AjaxEl.init );
	
	
})(jQuery);
// experiment
(function($){
    "use strict";
	if(!(window.elementor)){return false;}
	var ajax_running = false;
	var AjaxEl = {
		
		init: function(){
			
			var widgets = {
				'magazinify-mag-list.default' : AjaxEl.ajaxCall,
			};

			$.each( widgets, function( widget, callback ) {
				elementor.hooks.addAction( 'panel/open_editor/widget', callback );
			});
			
		},
		
		ajaxCall: function(panel, model, view){	
			
			// panel:  	The Panel object
			// model:  	The Backbone model instance
			// view:  	The Backbone view instance
			if(model && view){} // just for removing not used error
			var mz_parent_terms 		= panel.$el.find( '.elementor-control-input-wrapper select[data-setting="mz_parent_terms"]' );
			AjaxEl.doAjaxCallTerms('post', mz_parent_terms);

		},
		
		// AJAX CALL TERMS
		doAjaxCallTerms:	function (current_post_type, current_categories){
			
			
			var requestData = {
				action: 'mz_action_parent_terms',
				current_post_type: current_post_type,
			};
			
			
			$.ajax({
				type: 		'POST',
				url: 		mz_ajax_object.mz_ajax_url,
				cache:		true,
				data: 		requestData,
				success: 	function(data) {
					AjaxEl.AjaxProcessTerms(data, current_categories);
				},
				error: 		function(MLHttpRequest, textStatus, errorThrown) {
					console.log(textStatus + ': ' + errorThrown);
				}
			});	
	
		},

		// AJAX PROCESS TERMS
		AjaxProcessTerms: function(data, current_categories){
			
			
			//console.log(data);
			
			//read the server response
			var result = '';
			var queriedObj = $.parseJSON(data); //get the data object
			var slugs = queriedObj.data_slugs;
			var names = queriedObj.data_names;
			var numberOfCats = slugs.length;
			
			
			for(var i = 0; i < numberOfCats; i++){
				result += '<option value="'+slugs[i]+'">'+names[i]+'</option>';
			}
			
			current_categories.html(result);
			
			//current_categories.parent().find('span.select2 *').css({opacity:1,maxWidth:'100%',maxHeight:'100%'});
			ajax_running = false; // finish the loading for this block
		},
		
	};
	
	$( window ).on( 'elementor/frontend/init', AjaxEl.init );
	
	
})(jQuery);