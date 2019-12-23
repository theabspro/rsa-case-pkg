app.component('aspActivitiesHeader', {
    templateUrl: activity_status_view_tab_header_template_url,
    bindings: {
        data: '<',
    },
    controller: function($http, HelperService, $scope, $rootScope, $routeParams, $location) {
        $scope.loading = true;
        var self = this;
        //self.data = activity;
        //end

    }
});

//----------------------------------------------------------------------------------------------------------------------------

app.component('aspDetails', {
    templateUrl: activity_status_view_asp_details_template_url,
    bindings: {
        data: '<',
    },
    controller: function($http, HelperService, $scope, $rootScope, $routeParams, $location) {
        $scope.loading = true;
        var self = this;
        //self.data = activity;

    }
});
//----------------------------------------------------------------------------------------------------------------------------
app.component('ticketHeader', {
    templateUrl: activity_status_view_ticket_header2_template_url,
    bindings: {
        data: '<',
    },
    controller: function($http, HelperService, $scope, $rootScope, $routeParams, $location) {
        $scope.loading = true;
        var self = this;
        //self.data = activity;

    }
});
//----------------------------------------------------------------------------------------------------------------------------

app.component('serviceDetails', {
    templateUrl: activity_status_view_service_details_template_url,
    bindings: {
        data: '<',
    },
    controller: function($http, HelperService, $scope, $rootScope, $routeParams, $location) {
        $scope.loading = true;
        var self = this;
        //self.data = activity;
        $(".km_value").keyup(function(){
            var entry = parseInt($(this).val());
            var asp = parseInt($(".asp_value").text());
            console.log('entry');
            console.log(entry);
            console.log('asp');
            console.log(asp);
            if(entry > asp){ $(this).val(""); $(".alert-danger").show(); }else {  $(".alert-danger").hide(); }

        });
    $(".collected_amount").keyup(function(){
            var entry = parseInt($(this).val());
            var asp = parseInt($(".collected_value").text());
            if(entry > asp){ 
                $(this).val(""); $(".alert-danger1").show(); 
            }else { 
                console.log(entry);
                $("#info-1 .collected_by_asp").val(entry); 
                $(".alert-danger1").hide(); 
            }

        });
    $(".non_collected_amount").keyup(function(){
            var entry = parseInt($(this).val());
            var asp = parseInt($(".other_value").text());
            if(entry > asp){ $(this).val(""); $(".alert-danger2").show(); }else { console.log(entry); $("#info-1 .not_collected_by_asp").val(entry); $(".alert-danger2").hide(); }

        });

    }
});

//----------------------------------------------------------------------------------------------------------------------------

app.component('priceInfo', {
    templateUrl: activity_status_view_price_info_template_url,
    bindings: {
        data: '<',
    },
    controller: function($http, HelperService, $scope, $rootScope, $routeParams, $location) {
        $scope.loading = true;
        var self = this;
        //self.data = activity;

    }
});

//----------------------------------------------------------------------------------------------------------------------------

app.component('serviceTotalSummaryView', {
    templateUrl: activity_status_view_service_total_summary_view_template_url,
    bindings: {
        data: '<',
    },
    controller: function($http, HelperService, $scope, $rootScope, $routeParams, $location) {
        $scope.loading = true;
        var self = this;
        //self.data = activity;

    }
});

//----------------------------------------------------------------------------------------------------------------------------

app.component('serviceTotalSummary', {
    templateUrl: activity_status_view_service_total_summary_template_url,
    bindings: {
        data: '<',
    },
    controller: function($http, HelperService, $scope, $rootScope, $routeParams, $location) {
        $scope.loading = true;
        var self = this;
        //self.data = activity;

    }
});


//----------------------------------------------------------------------------------------------------------------------------

app.component('ticketTotalSummaryView', {
    templateUrl: activity_status_view_ticket_total_summary_view_template_url,
    bindings: {
        data: '<',
    },
    controller: function($http, HelperService, $scope, $rootScope, $routeParams, $location) {
        $scope.loading = true;
        var self = this;
        //self.data = activity;
        /*self.data.style_modal_close_image_url = style_modal_close_image_url;
        self.data.style_question_image_url = style_question_image_url;*/


    }
});

//----------------------------------------------------------------------------------------------------------------------------

app.component('ticketTotalSummary', {
    templateUrl: activity_status_view_ticket_total_summary_template_url,
    bindings: {
        data: '<',
    },
    controller: function($http, HelperService, $scope, $rootScope, $routeParams, $location) {
        $scope.loading = true;
        var self = this;
        //self.data = activity;

    }
});


//----------------------------------------------------------------------------------------------------------------------------

app.component('activityDetails', {
    templateUrl: activity_status_view_activity_details_view_template_url,
    bindings: {
        data: '<',
    },
    controller: function($http, HelperService, $scope, $rootScope, $routeParams, $location) {
        $scope.loading = true;
        var self = this;
        //self.data = activity;

    }
});

//----------------------------------------------------------------------------------------------------------------------------

app.component('locationDetails', {
    templateUrl: activity_status_view_location_details_view_template_url,
    bindings: {
        data: '<',
    },
    controller: function($http, HelperService, $scope, $rootScope, $routeParams, $location) {
        $scope.loading = true;
        var self = this;
        //self.data = activity;

    }
});
//----------------------------------------------------------------------------------------------------------------------------

app.component('kmDetails', {
    templateUrl: activity_status_view_km_details_view_template_url,
    bindings: {
        data: '<',
    },
    controller: function($http, HelperService, $scope, $rootScope, $routeParams, $location) {
        $scope.loading = true;
        var self = this;
        //self.data = activity;

    }
});
//----------------------------------------------------------------------------------------------------------------------------

app.component('invoiceDetails', {
    templateUrl: activity_status_view_invoice_details_view_template_url,
    bindings: {
        data: '<',
    },
    controller: function($http, HelperService, $scope, $rootScope, $routeParams, $location) {
        $scope.loading = true;
        var self = this;
        //self.data = activity;

    }
});
//----------------------------------------------------------------------------------------------------------------------------

app.component('financialDetails', {
    templateUrl: activity_status_view_financial_details_view_template_url,
    bindings: {
        data: '<',
    },
    controller: function($http, HelperService, $scope, $rootScope, $routeParams, $location) {
        $scope.loading = true;
        var self = this;
        //self.data = activity;

    }
});
//----------------------------------------------------------------------------------------------------------------------------

app.component('caseDetails', {
    templateUrl: activity_status_view_case_details_view_template_url,
    bindings: {
        data: '<',
    },
    controller: function($http, HelperService, $scope, $rootScope, $routeParams, $location) {
        $scope.loading = true;
        var self = this;
        //self.data = activity;

    }
});

//----------------------------------------------------------------------------------------------------------------------------

app.component('billingDetails', {
    templateUrl: activity_status_view_billing_details_view_template_url,
    bindings: {
        data: '<',
    },
    controller: function($http, HelperService, $scope, $rootScope, $routeParams, $location) {
        $scope.loading = true;
        var self = this;
        //self.data = activity;
         setTimeout(function(){ 
            $scope.deferTicket = function(){
                $("#reject-modal").modal();
            }

        $scope.approveTicket = function(){
            $("#confirm-ticket-modal").modal();
            
        }
     /*   var form_id = "#defer_form";
        var v = jQuery("#defer_form").validate({
        rules: {
            reason: {
                        required: true,
                    },
        },
        submitHandler: function(form) {
                let formData = new FormData($(form_id)[0]);
                $('#submit').button('loading');
                $.ajax({
                        url: laravel_routes['saveActivityDiffer'],
                        method: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                    })
                    .done(function(res) {
                        if (res.success == true) {
                            $noty = new Noty({
                                type: 'success',
                                layout: 'topRight',
                                text: res.message,
                            }).show();
                            setTimeout(function() {
                                $noty.close();
                            }, 3000);
                            $location.path('/customer-pkg/customer/list');
                            $scope.$apply();
                        } else {
                            if (!res.success == true) {
                                $('#submit').button('reset');
                                var errors = '';
                                for (var i in res.errors) {
                                    errors += '<li>' + res.errors[i] + '</li>';
                                }
                                $noty = new Noty({
                                    type: 'error',
                                    layout: 'topRight',
                                    text: errors
                                }).show();
                                setTimeout(function() {
                                    $noty.close();
                                }, 3000);
                            } else {
                                $('#submit').button('reset');
                                $location.path('/customer-pkg/customer/list');
                                $scope.$apply();
                            }
                        }
                    })
                    .fail(function(xhr) {
                        $('#submit').button('reset');
                        $noty = new Noty({
                            type: 'error',
                            layout: 'topRight',
                            text: 'Something went wrong at server',
                        }).show();
                        setTimeout(function() {
                            $noty.close();
                        }, 3000);
                    });
            }
    });*/


var form_id = '#confirm-ticket-modal';
        var v = jQuery(form_id).validate({
            ignore: '',
            rules: {
                /*'code': {
                    required: true,
                    minlength: 3,
                    maxlength: 255,
                },
                'name': {
                    required: true,
                    minlength: 3,
                    maxlength: 255,
                },
                'cust_group': {
                    maxlength: 100,
                },
                'gst_number': {
                    required: true,
                    maxlength: 100,
                },
                'dimension': {
                    maxlength: 50,
                },
                'address_line1': {
                    minlength: 3,
                    maxlength: 255,
                },
                'address_line2': {
                    minlength: 3,
                    maxlength: 255,
                },
                'pincode': {
                    required: true,
                    minlength: 6,
                    maxlength: 6,
                },*/
            },
            
            invalidHandler: function(event, validator) {
                $noty = new Noty({
                    type: 'error',
                    layout: 'topRight',
                    text: 'You have errors,Please check all tabs'
                }).show();
                setTimeout(function() {
                    $noty.close();
                }, 3000)
            },
            submitHandler: function(form) {
                let formData = new FormData($(form_id)[0]);
                $('#submit').button('loading');
                $.ajax({
                        url: laravel_routes['saveActivityDiffer'],
                        method: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                    })
                    .done(function(res) {
                        if (res.success == true) {
                            $noty = new Noty({
                                type: 'success',
                                layout: 'topRight',
                                text: res.message,
                            }).show();
                            setTimeout(function() {
                                $noty.close();
                            }, 3000);
                            $location.path('/case-pkg/case/list');
                            $scope.$apply();
                        } else {
                            if (!res.success == true) {
                                $('#submit').button('reset');
                                var errors = '';
                                for (var i in res.errors) {
                                    errors += '<li>' + res.errors[i] + '</li>';
                                }
                                $noty = new Noty({
                                    type: 'error',
                                    layout: 'topRight',
                                    text: errors
                                }).show();
                                setTimeout(function() {
                                    $noty.close();
                                }, 3000);
                            } else {
                                $('#submit').button('reset');
                                $location.path('/case-pkg/case/list');
                                $scope.$apply();
                            }
                        }
                    })
                    .fail(function(xhr) {
                        $('#submit').button('reset');
                        $noty = new Noty({
                            type: 'error',
                            layout: 'topRight',
                            text: 'Something went wrong at server',
                        }).show();
                        setTimeout(function() {
                            $noty.close();
                        }, 3000);
                    });
            }
        });
    
        $scope.calculate = function(){
            var amount = 0;
            if(self.data.asp_service_type_data.range_limit >self.data.bo_km_travelled){
                amount = self.data.asp_service_type_data.below_range_price;
            }else{
                excess = self.data.bo_km_travelled - self.data.asp_service_type_data.range_limit;
                amount = parseFloat(self.data.asp_service_type_data.below_range_price) + (parseFloat(excess)*parseFloat(self.data.asp_service_type_data.above_range_price));
            }
            self.data.bo_po_amount =  parseFloat(amount);
            self.data.bo_deduction = !$.isNumeric(self.data.bo_deduction) ? 0 : parseFloat(self.data.bo_deduction);
            //alert(self.data.bo_km_travelled);
            total = 0;
            if(self.data.asp.tax_calculation_method){
            total = parseFloat(amount) - (parseFloat(self.data.raw_bo_collected) + parseFloat(self.data.bo_deduction))

            }else{
            total = (parseFloat(amount) + parseFloat(self.data.raw_bo_not_collected)) - (parseFloat(self.data.raw_bo_collected) + parseFloat(self.data.bo_deduction))

            }
            self.data.bo_net_amount =  self.data.bo_amount = total /*parseFloat(amount)- parseFloat(self.data.raw_bo_collected)*/;
            //self.data.bo_amount = parseFloat(self.data.bo_net_amount) + parseFloat(self.data.raw_bo_not_collected);
            //inv_amount = parseFloat(self.data.bo_net_amount);
            total_tax = 0;
            taxes = self.data.asp.tax_group.taxes;
            if(self.data.asp.has_gst== "TRUE"){
                total_tax = 0;
                angular.forEach(taxes, function (value, key) { 
                    console.log(value); 
                    total_tax = parseFloat(total_tax) + parseFloat(value.tax_rate);
                }); 
                self.data.bo_tax_amount = parseFloat(((parseFloat(self.data.bo_net_amount) * parseFloat(total_tax)) / 100));
                self.data.bo_amount = parseFloat(self.data.bo_net_amount) + self.data.bo_tax_amount;
            }else{
                self.data.bo_tax_amount = 0;
                self.data.bo_amount = parseFloat(self.data.bo_net_amount) + self.data.bo_tax_amount;
            }
            
            console.log(total_tax);
            console.log(self.data.bo_amount);
            if(self.data.asp.tax_calculation_method == 0){
                self.data.bo_amount = parseFloat(self.data.bo_amount) + parseFloat(self.data.raw_bo_not_collected);
            }
            //console.log(self.data.bo_amount);

        }
          }, 3000);
    }
});
