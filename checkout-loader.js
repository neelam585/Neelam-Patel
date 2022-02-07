/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
define([
    'rjsResolver',
    'jquery',
    'Magento_Checkout/js/action/get-totals',
    'Magento_Customer/js/customer-data',
    'Magento_Checkout/js/model/cart/totals-processor/default',
    'Magento_Checkout/js/model/cart/cache',
    'mage/url',
], function (resolver, $, getTotalsAction, customerData, defaultTotal, cartCache, url) {
    'use strict';

    /**
     * Removes provided loader element from DOM.
     *
     * @param {HTMLElement} $loader - Loader DOM element.
     */
    function hideLoader($loader) {
        $loader.parentNode.removeChild($loader);
    }

    /**
     * Initializes assets loading process listener.
     *
     * @param {Object} config - Optional configuration
     * @param {HTMLElement} $loader - Loader DOM element.
     */
    function init(config, $loader) {
        resolver(hideLoader.bind(null, $loader));
        reloadSidebar();
        convertMobileToUS();
    }
	
	function convertMobileToUS() {
		
		$(document).on('input', '.fieldset.address input[name="telephone"]',function(){
			var dInput = this.value;
			var mobileNo = dInput;
			console.log(dInput);
			if(mobileNo.length >0) {
				
				var convertedNo = (mobileNo.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
				
				$(".fieldset.address input[name='telephone']").val(convertedNo);
				if(convertedNo.length == 12){
				$('.field-error').css('display','none');
				$('.fieldset.address input[name="telephone"]').removeClass('.field-error');
				$('.fieldset.address input[name="telephone"]').removeClass('.aria-invalid');
				
				
				}
				else{
				$('.field-error').css('display','block');
				
				
				}
			}
		});

		
	}

    function reloadSidebar() {
        $(document).ready(function() {
            var routeUrl = url.build('additionalPayment/index/index');
            window.setTimeout(function() {
                $('body').trigger('processStart');
                $.ajax({
                    url: routeUrl,
                    data:  {},
                    type: "post",
                    cache: false,
                    success: function (data) {
                        var deferred = $.Deferred();
                        getTotalsAction([], deferred); //this will reload the order summary section I have used it in my custom module 

                        var sections = ['checkout-data'];
                        customerData.invalidate(sections);
                        customerData.reload(sections, true);

                        cartCache.set('totals',null);
                        defaultTotal.estimateTotals();

                        $('.opc-block-summary .items-in-cart .title strong>span:first').html(data);
                        $('body').trigger('processStop');

                    },
                    error : function(request, error)
                    {
                        alert("Error");
                        $('body').trigger('processStop');
                    }
                });
            },3000);
        });
    }

    return init;
});
