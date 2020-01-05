app.component('invoiceList', {
    templateUrl: invoice_list_template_url,
    controller: function($http, $window, HelperService, $scope, $rootScope, $routeParams) {
        $scope.loading = true;
        var self = this;
        self.hasPermission = HelperService.hasPermission;
        self.filter_img_url = filter_img_url;
        if (typeof($routeParams.type_id) == 'undefined') {
            $location.path('/page-not-found');
            $scope.$apply();
            return;
        }

        if ($routeParams.type_id != 1 && $routeParams.type_id != 2 && $routeParams.type_id != 3) {
            $location.path('/page-not-found');
            $scope.$apply();
            return;
        }
        self.type_id = $routeParams.type_id;
        self.export_invoices_url = export_invoices;
        self.csrf = token;
        self.canExport = canExport;

        $http.get(
            invoice_filter_url + '/' + $routeParams.type_id
        ).then(function(response) {
            self.extras = response.data.extras;

            if (self.type_id == 1 && self.canExport) {
                var col1 = [
                    { data: 'action', searchable: false },
                ];
            } else {
                var col1 = [];
            }

            var col2 = [
                { data: 'invoice_no', name: 'invoice_no', searchable: true },
                { data: 'invoice_date', searchable: false },
                { data: 'asp_code', name: 'asps.asp_code', searchable: true },
                { data: 'workshop_name', name: 'asps.workshop_name', searchable: true },
                { data: 'no_of_activities', searchable: false },
                { data: 'payment_status', name: 'invoice_statuses.name', searchable: true },
                { data: 'invoice_amount', searchable: false },
            ];

            var cols = $.merge(col1, col2);

            var activities_status_dt_config = JSON.parse(JSON.stringify(dt_config));

            $('#invoice_table').DataTable(
                $.extend(activities_status_dt_config, {
                    columns: cols,
                    ordering: false,
                    processing: true,
                    serverSide: true,
                    "scrollX": true,
                    stateSave: true,
                    stateSaveCallback: function(settings, data) {
                        localStorage.setItem('SIDataTables_' + settings.sInstance, JSON.stringify(data));
                    },
                    stateLoadCallback: function(settings) {
                        var state_save_val = JSON.parse(localStorage.getItem('SIDataTables_' + settings.sInstance));
                        if (state_save_val) {
                            $('.filterTable').val(state_save_val.search.search);
                        }
                        return JSON.parse(localStorage.getItem('SIDataTables_' + settings.sInstance));
                    },
                    ajax: {
                        url: invoice_get_list_url,
                        data: function(d) {
                            d.date = $('#date').val();
                            d.type_id = self.type_id;
                        }
                    },
                    infoCallback: function(settings, start, end, max, total, pre) {
                        $('.count').html(total + ' / ' + max + ' listings');
                        if ($('#submit').length > 0) {
                            if (!total) {
                                $('#submit').hide();
                            } else {
                                $('#submit').show();
                            }
                        }
                    },
                    initComplete: function() {},
                }));

            $('.dataTables_length select').select2();

            var dataTable = $('#invoice_table').dataTable();

            $(".filterTable").keyup(function() {
                dataTable.fnFilter(this.value);
            });

            $('#date').on('change', function() {
                dataTable.fnFilter();
            });

            $('.reset-filter').on('click', function() {
                $('#date').val('');
                dataTable.fnFilter();
            });

            $scope.refresh = function() {
                $('#invoice_table').DataTable().ajax.reload();
            };

            $('.filterToggle').click(function() {
                $('#filterticket').toggleClass('open');
            });

            $('.close-filter, .filter-overlay').click(function() {
                $(this).parents('.filter-wrapper').removeClass('open');
            });

            $('.date-picker').datepicker({
                format: 'dd-mm-yyyy',
                autoclose: true,
            });

            $('#select_all_checkbox').click(function() {
                if ($(this).prop("checked")) {
                    $(".child_select_all").prop("checked", true);
                } else {
                    $(".child_select_all").prop("checked", false);
                }
            });

            var form_id = '#invoice_export';
            var v = jQuery(form_id).validate({
                rules: {
                    'invoice_ids[]': {
                        required: true,
                    },
                },
                messages: {
                    'invoice_ids[]': {
                        required: "Please Select Invoice",
                    },
                },
                errorPlacement: function(error, element) {
                    $noty = new Noty({
                        type: 'error',
                        layout: 'topRight',
                        text: 'Please Select Invoice',
                        animation: {
                            speed: 500 // unavailable - no need
                        },
                    }).show();
                    setTimeout(function() {
                        $noty.close();
                    }, 1000);
                },
                submitHandler: function(form) {
                    $('#invoice_export').submit();
                }
            });


            $rootScope.loading = false;
        });
    }
});

//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

app.component('invoiceView', {
    templateUrl: invoice_view_template_url,
    controller: function($http, $location, $window, HelperService, $scope, $routeParams, $rootScope, $location) {
        $scope.loading = true;
        var self = this;
        self.hasPermission = HelperService.hasPermission;
        self.filter_img_url = filter_img_url;
        self.type_id = $routeParams.type_id;
        self.invoice_pdf_generate_url = invoice_pdf_generate_url;
        get_view_data_url = typeof($routeParams.id) == 'undefined' ? invoice_view_data_url : invoice_view_data_url + '/' + $routeParams.id;
        $http.get(
            get_view_data_url
        ).then(function(response) {
            // console.log(response.data);
            self.period = response.data.period;
            self.asp = response.data.asp;
            self.rsa_address = response.data.rsa_address;
            self.activities = response.data.activities;
            self.invoice_amount = response.data.invoice_amount;
            self.invoice_amount_in_word = response.data.invoice_amount_in_word;
            self.signature_attachment = response.data.signature_attachment;
            self.signature_attachment_path = response.data.signature_attachment_path;
            self.invoice_attachment_file = response.data.invoice_attachment_file;
            self.invoice = response.data.invoice;
            self.inv_no = response.data.inv_no;
            self.invoice_availability = response.data.invoice_availability;

            if (self.asp.tax_calculation_method == '1') {
                self.asp.tax_calculation_method = true;
            } else {
                self.asp.tax_calculation_method = false;
            }

            setTimeout(function() {
                var dataTable = $('#aspLogin-table').DataTable({
                    "bLengthChange": false,
                    "paginate": false,
                    "oLanguage": { "sZeroRecords": "", "sEmptyTable": "" },
                });
            }, 1000);

            $('.viewData-toggle--inner.noToggle .viewData-threeColumn--wrapper').slideDown();
            $('.viewData-toggle--btn').click(function() {
                $(this).toggleClass('viewData-toggle--btn_reverse');
                $('.viewData-toggle--inner .viewData-threeColumn--wrapper').slideToggle();
            });

            $rootScope.loading = false;
        });



    }
});