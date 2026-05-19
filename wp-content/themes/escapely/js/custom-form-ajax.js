jQuery(document).ready(function () {

    $("#datepicker").datepicker({
        dateFormat: "mm/dd/yy",
        minDate: 0, // Display format in the input field
        onSelect: function (dateText, inst) {
            // Parse the selected date and format it as YYYY-MM-DD for HubSpot

            var date = $(this).datepicker('getDate');
            var formattedDate1 = $.datepicker.formatDate('mm/dd/yy', date);
            var month = ('0' + (date.getMonth() + 1)).slice(-2); // getMonth() is 0-indexed
            var day = ('0' + date.getDate()).slice(-2);
            var year = String(date.getFullYear()).slice(-2); // Get last two digits of year

            // Format it as mm/dd/yy
            var formattedDate = month + '/' + day + '/' + year;

            console.log(formattedDate1); // Output: 10/12/24
            console.log(jQuery.type(formattedDate));

            // Set the formatted date to the hidden field
            $(this).val(formattedDate1);
            $("#date").val(formattedDate1);
        }
    });

    setTimeout(function () {
        // Check if the input is empty
        //if ($("#datepicker").val() === "") {
        // Insert the desired value (for example, today's date)
        $("#placeholder").hide();
        //  }
    }, 3000);

    // jQuery("#datepicker").datepicker({            
    //        dateFormat: 'mm/dd/yy', // You can use 'mm/dd/yy' or other formats too
    //        onSelect: function(dateText) {
    //        // Convert 'mm-dd-yy' to 'yyyy-mm-dd' format for the API
    //        var parts = dateText.split("/");
    //        var month = parts[0];
    //        var day = parts[1];
    //        var year = parts[2]; // Add century to 'yy'

    //        // Create the correct date format 'yyyy-mm-dd'
    //        var formattedDate = month + '/' + day + '/' + year;
    //         $(this).val(formattedDate);
    //                $("#date").val(formattedDate);
    //            }
    //        });

    //        setTimeout(function() {
    //            // Check if the input is empty
    //            //if ($("#datepicker").val() === "") {
    //                // Insert the desired value (for example, today's date)
    //                $("#placeholder").hide();
    //          //  }
    //        }, 3000);


    jQuery("body").on("click", '.close', function () {
        var idvl = jQuery(this).attr('idval');
        var iframe = $('#videoIframe-' + idvl);

        console.log(iframe + "test " + iframe.attr('src'));

        // Stop the video by resetting the src attribute
        iframe.attr('src', iframe.attr('src'));

        // Optionally hide the modal as well
        $('#sliderModal-' + idvl).hide();

        //location.reload();

    });
    jQuery("body").on("click", '.modelopen', function () {
        var modelval = jQuery(this).attr('modelval');

        // Optionally hide the modal as well
        $('#' + modelval).show();

        //location.reload();

    });





    jQuery('#staffed_or_digital').on('change', function () {
        // Get the selected value


        var head_countValue = $('#head_count').val();
        var selectedValue = $(this).val();
        if (selectedValue != "") {
            var staffed = [
                { "Under 10": "$500" },
                { "10-15": "$750" },
                { "15-20": "$1000" },
                { "20-25": "$1250" },
                { "25-30": "$1500" },
                { "30-40": "$2000" },
                { "40-50": "$2500" },
                { "50-60": "$3000" },
                { "60-70": "$3500" },
                { "70-80": "$4000" },
                { "80-90": "$4500" },
                { "90-100": "$5000" },
                { "100+": "CUSTOM PRICING" }
            ];

            var digital = [
                { "Under 10": "$250" },
                { "10-15": "$375" },
                { "15-20": "$500" },
                { "20-25": "$625" },
                { "25-30": "$750" },
                { "30-40": "$1000" },
                { "40-50": "$1250" },
                { "50-60": "$1500" },
                { "60-70": "$1750" },
                { "70-80": "$2000" },
                { "80-90": "$2250" },
                { "90-100": "$2500" },
                { "100+": "CUSTOM PRICING" }
            ];

            console.log("selectedValue" + selectedValue);
            if (selectedValue == "Staffed") {
                var quote = staffed.find(function (item) {
                    // Check if the key in the object matches the head_countValue
                    // 
                    //console.log(Object.keys(item)[0]+'  '+head_countValue);
                    return Object.keys(item)[0] === head_countValue;
                });
            } else {
                var quote = digital.find(function (item) {
                    // Check if the key in the object matches the head_countValue
                    // 
                    //console.log(Object.keys(item)[0]+'  '+head_countValue);
                    return Object.keys(item)[0] === head_countValue;
                });



            }

            //      		   var quote = headquote.find(function(item) {
            // 					// Check if the key in the object matches the head_countValue
            // 					// 
            // 					console.log(Object.keys(item)[0]+'  '+selectedValue);
            // 					return Object.keys(item)[0] === selectedValue;
            // 				});

            // Extract and use the quote value if found
            //console.log(quote);
            if (quote) {
                var quoteValue = Object.values(quote)[0];
                if (quoteValue == "CUSTOM PRICING") {


                    jQuery('#totalcustomquote').show();
                    jQuery('#totalamount').hide();

                } else {
                    jQuery('#totalcustomquote').hide();
                    jQuery('#totalamount').show();

                    jQuery('#totalamount').html(quoteValue);
                }

                // Perform any further actions with quoteValue here
            }



        }
    });


    jQuery(document).on('change', '#staffed_or_digital, #activity', function () {
        jQuery('#head_count').trigger('change');
    });

    jQuery('#head_count').on('change', function () {
        // Get the selected value
        var head_countValue = $('#head_count').val();

        if ($('#staffed_or_digital').length > 0) {
            var selectedValue = $('#staffed_or_digital').val();

            console.log(['staffed', selectedValue]);
            if (selectedValue != "") {
                var staffed = [
                    { "Under 10": "$500" },
                    { "10-15": "$750" },
                    { "15-20": "$1000" },
                    { "20-25": "$1250" },
                    { "25-30": "$1500" },
                    { "30-40": "$2000" },
                    { "40-50": "$2500" },
                    { "50-60": "$3000" },
                    { "60-70": "$3500" },
                    { "70-80": "$4000" },
                    { "80-90": "$4500" },
                    { "90-100": "$5000" },
                    { "100+": "CUSTOM PRICING" }
                ];

                var digital = [
                    { "Under 10": "$250" },
                    { "10-15": "$375" },
                    { "15-20": "$500" },
                    { "20-25": "$625" },
                    { "25-30": "$750" },
                    { "30-40": "$1000" },
                    { "40-50": "$1250" },
                    { "50-60": "$1500" },
                    { "60-70": "$1750" },
                    { "70-80": "$2000" },
                    { "80-90": "$2250" },
                    { "90-100": "$2500" },
                    { "100+": "CUSTOM PRICING" }
                ];

                // console.log("selectedValue"+selectedValue);
                if (selectedValue == "Staffed") {
                    var quote = staffed.find(function (item) {
                        // Check if the key in the object matches the head_countValue
                        // 
                        // console.log(Object.keys(item)[0]+'  '+head_countValue);
                        return Object.keys(item)[0] === head_countValue;
                    });
                } else {
                    var quote = digital.find(function (item) {
                        // Check if the key in the object matches the head_countValue
                        // 
                        // console.log(Object.keys(item)[0]+'  '+head_countValue);
                        return Object.keys(item)[0] === head_countValue;
                    });



                }

                //                 var quote = headquote.find(function(item) {
                //                  // Check if the key in the object matches the head_countValue
                //                  // 
                //                  console.log(Object.keys(item)[0]+'  '+selectedValue);
                //                  return Object.keys(item)[0] === selectedValue;
                //              });

                // Extract and use the quote value if found
                //console.log(quote);
                if (quote) {
                    var quoteValue = Object.values(quote)[0];
                    if (quoteValue == "CUSTOM PRICING") {


                        jQuery('#totalcustomquote').show();
                        jQuery('#totalamount').hide();

                    } else {
                        jQuery('#totalcustomquote').hide();
                        jQuery('#totalamount').show();

                        jQuery('#totalamount').html(quoteValue);
                    }
                    // Perform any further actions with quoteValue here
                }



            } else {
                jQuery('#totalamount').hide();
            }
        }

        if ($('#activity').length > 0) {
            var selectedValue = $('#activity').val();
            console.log(['activity', selectedValue]);
            if (selectedValue != "") {
                var HolidayEscapeRoom = [
                    { "Under 10": "$250-$500" },
                    { "10-15": "$375-$750" },
                    { "15-20": "$500-$1000" },
                    { "20-25": "$625-$1250" },
                    { "25-30": "$750-$1500" },
                    { "30-40": "$1000-$2000" },
                    { "40-50": "$1250-$2500" },
                    { "50-60": "$1500-$3000" },
                    { "60-70": "1750-$3500" },
                    { "70-80": "$2000-$4000" },
                    { "80-90": "$2250-$4500" },
                    { "90-100": "$2500-$5000" },
                    { "100+": "CUSTOM PRICING" }
                ];

                var HolidayMurderMystery = [
                    { "Under 10": "$2400" },
                    { "10-15": "$2400" },
                    { "15-20": "$2400" },
                    { "20-25": "$2400" },
                    { "25-30": "$2400" },
                    { "30-40": "$2400" },
                    { "40-50": "$3000" },
                    { "50-60": "$3600" },
                    { "60-70": "$4200" },
                    { "70-80": "$4800" },
                    { "80-90": "$5400" },
                    { "90-100": "$6000" },
                    { "100+": "CUSTOM PRICING" }
                ];
                var HolidayTrivia = [
                    { "Under 10": "$500" },
                    { "10-15": "$750" },
                    { "15-20": "$1000" },
                    { "20-25": "$1250" },
                    { "25-30": "$1500" },
                    { "30-40": "$2000" },
                    { "40-50": "$2500" },
                    { "50-60": "$3000" },
                    { "60-70": "$3500" },
                    { "70-80": "$4000" },
                    { "80-90": "$4500" },
                    { "90-100": "$5000" },
                    { "100+": "CUSTOM PRICING" }
                ];

                // console.log("selectedValue"+selectedValue);
                if (selectedValue == "Holiday escape room") {
                    var quote = HolidayEscapeRoom.find(function (item) {
                        // Check if the key in the object matches the head_countValue
                        // 
                        // console.log(Object.keys(item)[0]+'  '+head_countValue);
                        return Object.keys(item)[0] === head_countValue;
                    });
                } else if (selectedValue == "Holiday murder mystery") {
                    var quote = HolidayMurderMystery.find(function (item) {
                        // Check if the key in the object matches the head_countValue
                        // 
                        // console.log(Object.keys(item)[0]+'  '+head_countValue);
                        return Object.keys(item)[0] === head_countValue;
                    });



                } else {
                    var quote = HolidayTrivia.find(function (item) {
                        // Check if the key in the object matches the head_countValue
                        // 
                        // console.log(Object.keys(item)[0]+'  '+head_countValue);
                        return Object.keys(item)[0] === head_countValue;
                    });

                }

                //                 var quote = headquote.find(function(item) {
                //                  // Check if the key in the object matches the head_countValue
                //                  // 
                //                  console.log(Object.keys(item)[0]+'  '+selectedValue);
                //                  return Object.keys(item)[0] === selectedValue;
                //              });

                // Extract and use the quote value if found
                //console.log(quote);
                if (quote) {
                    var quoteValue = Object.values(quote)[0];
                    if (quoteValue == "CUSTOM PRICING") {


                        jQuery('#totalcustomquote').show();
                        jQuery('#totalamount').hide();

                    } else {
                        jQuery('#totalcustomquote').hide();
                        jQuery('#totalamount').show();

                        jQuery('#totalamount').html(quoteValue);
                    }
                    // Perform any further actions with quoteValue here
                }



            } else {
                jQuery('#totalamount').hide();
            }
        }
    });

});

jQuery("body").on("click", "#backtofirst", function () {
    jQuery('#form-step-1').addClass('active');
    jQuery('#form-step-2').removeClass('active');

});
jQuery("body").on("click", "#backtofirst1", function () {
    jQuery('#form-step-11').addClass('active');
    jQuery('#form-step-12').removeClass('active');

});

jQuery("body").on("click", "#backtosecond", function () {
    jQuery('#form-step-2').addClass('active');
    jQuery('#form-step-3').removeClass('active');

});



// jQuery("body").on("click", "#backtofirst", function() {
//         jQuery('#form-step-1').addClass('active');
//         jQuery('#form-step-2').removeClass('active');

// });

jQuery("body").on("click", "#email-my-quote-next", function () {
    var head_countValue = $('#head_count').val();


    if (head_countValue == "") {
        jQuery('#head_count').addClass("wpcf7-not-valid");
    } else {
        jQuery('#head_count').removeClass("wpcf7-not-valid");
    }

    if ($('#staffed_or_digital').length > 0) {

        var staffed_or_digitalvalue = $('#staffed_or_digital').val();
        if (staffed_or_digitalvalue == "") {
            jQuery('#staffed_or_digital').addClass("wpcf7-not-valid");
        } else {
            jQuery('#staffed_or_digital').removeClass("wpcf7-not-valid");
        }

        if (head_countValue != '' && staffed_or_digitalvalue != "") {
            // 	alert(head_countValue+' '+staffed_or_digitalvalue);

            jQuery('#form-step-1').removeClass('active');
            jQuery('#form-step-2').addClass('active');
            jQuery('#dateform').hide();
            jQuery('#emailform').show();
        }
    }

    if ($('#activity').length > 0) {

        var activityvalue = $('#activity').val();
        if (activityvalue == "") {
            jQuery('#activity').addClass("wpcf7-not-valid");
        } else {
            jQuery('#activity').removeClass("wpcf7-not-valid");
        }

        if (head_countValue != '' && activityvalue != "") {
            // 	alert(head_countValue+' '+staffed_or_digitalvalue);

            jQuery('#form-step-1').removeClass('active');
            jQuery('#form-step-2').addClass('active');
            jQuery('#dateform').hide();
            jQuery('#emailform').show();
        }
    }


});

jQuery("body").on('keypress', 'input[type=number]', function (evt) {
    if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
        evt.preventDefault();
    }

});

jQuery("body").on("click", "#email-to-quote-submit", function () {
    // $('#wpcf7-f11370-o1').on('submit', function(event) {
    //                 event.preventDefault(); // Prevent the default form submission
    var head_countVal = $('#head_count').val();
    if (head_countVal == '100+') {
        head_countValue = '100 Plus';
    } else {
        head_countValue = head_countVal;
    }
    var staffed_or_digitalvalue = jQuery('#staffed_or_digital').val();
    var fullName = $('#quoteFullname').val();
    var companyEmail = jQuery('#CompanyEmail').val();
    var phoneNumber = jQuery('#PhoneNumber').val();

    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

    if (fullName == "") {
        jQuery('#quoteFullname').addClass("wpcf7-not-valid");
    } else {
        jQuery('#quoteFullname').removeClass("wpcf7-not-valid");
    }
    if (companyEmail == "" || !pattern.test(companyEmail)) {
        jQuery('#CompanyEmail').addClass("wpcf7-not-valid");
    } else {
        jQuery('#CompanyEmail').removeClass("wpcf7-not-valid");
    }
    if (phoneNumber == "") {
        jQuery('#PhoneNumber').addClass("wpcf7-not-valid");
    } else {
        jQuery('#PhoneNumber').removeClass("wpcf7-not-valid");
    }

    console.log("email to quote fields value  FullName " + fullName + " email:" + companyEmail + "Phone Number " + phoneNumber + "head count: " + head_countValue + " staffed_or_digital  " + staffed_or_digitalvalue);

    if (fullName != '' && companyEmail != "" && pattern.test(companyEmail) && phoneNumber != "") {
        jQuery('#form-step-2').removeClass('active');
        jQuery('#form-step-3').addClass('active');

        jQuery('#emailthanksform').show();
        jQuery('#dateformcustomer').hide();
        jQuery('#backbtnsecond').hide();
        var currentpageurl = jQuery('#currentpageurl').val();

        jQuery.ajax({
            url: customFormAjax.ajax_url,
            type: 'POST',
            data: {
                action: 'instant_quote_form_submit',
                head_count: head_countValue,
                currentpageurl: currentpageurl,
                staffed_or_digital: staffed_or_digitalvalue,
                full_name: fullName,
                CompanyEmail: companyEmail,
                PhoneNumber: phoneNumber
            },
            success: function (response) {
                jQuery('#formMessage').html(response);
            },
            error: function () {
                jQuery('#formMessage').html('There was an error processing your request.');
            }
        });

    }






});




jQuery("body").on("click", "#check-date-time-next", function () {
    var head_countValue = jQuery('#head_count').val();
    var staffed_or_digitalvalue = jQuery('#staffed_or_digital').val();

    if (head_countValue == "") {
        jQuery('#head_count').addClass("wpcf7-not-valid");
    } else {
        jQuery('#head_count').removeClass("wpcf7-not-valid");
    }

    if (staffed_or_digitalvalue == "") {
        jQuery('#staffed_or_digital').addClass("wpcf7-not-valid");
    } else {
        jQuery('#staffed_or_digital').removeClass("wpcf7-not-valid");
    }

    if (head_countValue != '' && staffed_or_digitalvalue != "") {
        jQuery('#form-step-1').removeClass('active');
        jQuery('#form-step-2').addClass('active');
        jQuery('#emailform').hide();
        jQuery('#dateformcustomer').hide();
        jQuery('#dateform').show();


    }
});


jQuery("body").on("click", "#email-to-activity-quote-submit", function () {
    // $('#wpcf7-f11370-o1').on('submit', function(event) {
    //                 event.preventDefault(); // Prevent the default form submission
    var head_countVal = $('#head_count').val();
    if (head_countVal == '100+') {
        head_countValue = '100 Plus';
    } else {
        head_countValue = head_countVal;
    }
    var activityvalue = jQuery('#activity').val();
    var fullName = $('#quoteFullname').val();
    var companyEmail = jQuery('#CompanyEmail').val();
    var phoneNumber = jQuery('#PhoneNumber').val();


    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

    if (fullName == "") {
        jQuery('#quoteFullname').addClass("wpcf7-not-valid");
    } else {
        jQuery('#quoteFullname').removeClass("wpcf7-not-valid");
    }
    if (companyEmail == "" || !pattern.test(companyEmail)) {
        jQuery('#CompanyEmail').addClass("wpcf7-not-valid");
    } else {
        jQuery('#CompanyEmail').removeClass("wpcf7-not-valid");
    }
    if (phoneNumber == "") {
        jQuery('#PhoneNumber').addClass("wpcf7-not-valid");
    } else {
        jQuery('#PhoneNumber').removeClass("wpcf7-not-valid");
    }

    console.log("email to quote fields value  FullName " + fullName + " email:" + companyEmail + "Phone Number " + phoneNumber + "head count: " + head_countValue + " activity  " + activityvalue);

    if (fullName != '' && companyEmail != "" && pattern.test(companyEmail) && phoneNumber != "") {
        jQuery('#form-step-2').removeClass('active');
        jQuery('#form-step-3').addClass('active');

        jQuery('#emailthanksform').show();
        jQuery('#dateformcustomer').hide();
        jQuery('#backbtnsecond').hide();
        var currentpageurl = jQuery('#currentpageurl').val();

        jQuery.ajax({
            url: customFormAjax.ajax_url,
            type: 'POST',
            data: {
                action: 'instant_activity_quote_form_submit',
                head_count: head_countValue,
                currentpageurl: currentpageurl,
                activity: activityvalue,
                full_name: fullName,
                CompanyEmail: companyEmail,
                PhoneNumber: phoneNumber
            },
            success: function (response) {
                jQuery('#formMessage').html(response);
            },
            error: function () {
                jQuery('#formMessage').html('There was an error processing your request.');
            }
        });

    }






});

jQuery("body").on("click", "#check-date-time-activity-next", function () {
    var head_countValue = jQuery('#head_count').val();
    var activityvalue = jQuery('#activity').val();

    if (head_countValue == "") {
        jQuery('#head_count').addClass("wpcf7-not-valid");
    } else {
        jQuery('#head_count').removeClass("wpcf7-not-valid");
    }

    if (activityvalue == "") {
        jQuery('#activity').addClass("wpcf7-not-valid");
    } else {
        jQuery('#activity').removeClass("wpcf7-not-valid");
    }

    if (head_countValue != '' && activityvalue != "") {
        jQuery('#form-step-1').removeClass('active');
        jQuery('#form-step-2').addClass('active');
        jQuery('#emailform').hide();
        jQuery('#dateformcustomer').hide();
        jQuery('#dateform').show();
    }
});



jQuery("body").on("click", "#checkdate-time-next", function () {

    // $('#wpcf7-f11370-o1').on('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    var date = jQuery('#date').val();


    var timezone = jQuery('#timezone').val();
    var timeofday = jQuery('#timeofday').val();

    if (date == "") {
        jQuery('#datepicker').addClass("wpcf7-not-valid");
    } else {
        jQuery('#datepicker').removeClass("wpcf7-not-valid");
    }
    if (timezone == "") {
        jQuery('#timezone').addClass("wpcf7-not-valid");
    } else {
        jQuery('#timezone').removeClass("wpcf7-not-valid");
    }
    if (timeofday == "") {
        jQuery('#timeofday').addClass("wpcf7-not-valid");
    } else {
        jQuery('#timeofday').removeClass("wpcf7-not-valid");
    }

    if (date != '' && timezone != "" && timeofday != "") {
        jQuery('#form-step-2').removeClass('active');
        jQuery('#form-step-3').addClass('active');
        jQuery('#emailthanksform').hide();
        jQuery('#dateformcustomer').show();


    }

});



jQuery("body").on("click", "#datetime-to-quote-submit", function () {




    // $('#wpcf7-f11370-o1').on('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    var fullName = jQuery('#full-name').val();
    var companyEmail = jQuery('#company-Email').val();
    var phoneNumber = jQuery('#phone-Number').val();
    // var head_countValue = $('#head_count').val();


    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

    var head_countVal = jQuery('#head_count').val();
    if (head_countVal == '100+') {
        head_countValue = '100 Plus';
    } else {
        head_countValue = head_countVal;
    }
    var staffed_or_digitalvalue = jQuery('#staffed_or_digital').val();
    // var date = jQuery('#date').val();
    var date = jQuery('#date').val();
    //var realdate =new Date(date);
    // var dateStr = date; // Original date string
    //    var dateParts = dateStr.split("/"); // Split the date by '/'

    //    var day = dateParts[0];
    //    var month = dateParts[1];
    //    var year = dateParts[2]; // Get the last two digits of the year

    //    var formattedDate = new Date(month + "/" +day+ "/" + year); 
    var timezone = jQuery('#timezone').val();
    var timeofday = jQuery('#timeofday').val();

    //  alert(date);

    if (fullName == "") {
        jQuery('#full-name').addClass("wpcf7-not-valid");
    } else {
        jQuery('#full-name').removeClass("wpcf7-not-valid");
    }
    if (companyEmail == "" || !pattern.test(companyEmail)) {
        jQuery('#company-Email').addClass("wpcf7-not-valid");
    } else {
        jQuery('#company-Email').removeClass("wpcf7-not-valid");
    }
    if (phoneNumber == "") {
        jQuery('#phone-Number').addClass("wpcf7-not-valid");
    } else {
        jQuery('#phone-Number').removeClass("wpcf7-not-valid");
    }

    console.log("Date to quote fields value  FullName " + fullName + " email:" + companyEmail + "Phone Number " + phoneNumber + "head count: " + head_countValue + " staffed_or_digital  " + staffed_or_digitalvalue + " date " + date + " timezone " + timezone + " time of day" + timeofday);
    if (fullName != '' && companyEmail != "" && pattern.test(companyEmail) && phoneNumber != "") {
        jQuery('#form-step-3').removeClass('active');
        jQuery('#form-step-4').addClass('active');
        // jQuery('#dateformcustomer').hide();

        jQuery.ajax({
            url: customFormAjax.ajax_url,
            type: 'POST',
            data: {
                action: 'instant_date_form_submit',
                head_count: head_countValue,
                staffed_or_digital: staffed_or_digitalvalue,
                full_name: fullName,
                CompanyEmail: companyEmail,
                PhoneNumber: phoneNumber,
                date: date,
                timezone: timezone,
                timeofday: timeofday
            },
            success: function (response) {
                jQuery('#formMessage').html(response);
            },
            error: function () {
                jQuery('#formMessage').html('There was an error processing your request.');
            }
        });

    }




});

jQuery("body").on("click", "#datetime-to-quote-activity-submit", function () {




    // $('#wpcf7-f11370-o1').on('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    var fullName = jQuery('#full-name').val();
    var companyEmail = jQuery('#company-Email').val();
    var phoneNumber = jQuery('#phone-Number').val();
    // var head_countValue = $('#head_count').val();

    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

    var head_countVal = jQuery('#head_count').val();
    if (head_countVal == '100+') {
        head_countValue = '100 Plus';
    } else {
        head_countValue = head_countVal;
    }
    var activityvalue = jQuery('#activity').val();
    // var date = jQuery('#date').val();
    var date = jQuery('#date').val();
    //var realdate =new Date(date);
    // var dateStr = date; // Original date string
    //    var dateParts = dateStr.split("/"); // Split the date by '/'

    //    var day = dateParts[0];
    //    var month = dateParts[1];
    //    var year = dateParts[2]; // Get the last two digits of the year

    //    var formattedDate = new Date(month + "/" +day+ "/" + year); 
    var timezone = jQuery('#timezone').val();
    var timeofday = jQuery('#timeofday').val();

    //  alert(date);

    if (fullName == "") {
        jQuery('#full-name').addClass("wpcf7-not-valid");
    } else {
        jQuery('#full-name').removeClass("wpcf7-not-valid");
    }
    if (companyEmail == "" || !pattern.test(companyEmail)) {
        jQuery('#company-Email').addClass("wpcf7-not-valid");
    } else {
        jQuery('#company-Email').removeClass("wpcf7-not-valid");
    }
    if (phoneNumber == "") {
        jQuery('#phone-Number').addClass("wpcf7-not-valid");
    } else {
        jQuery('#phone-Number').removeClass("wpcf7-not-valid");
    }

    console.log("Date to quote fields value  FullName " + fullName + " email:" + companyEmail + "Phone Number " + phoneNumber + "head count: " + head_countValue + " activity  " + activityvalue + " date " + date + " timezone " + timezone + " time of day" + timeofday);
    if (fullName != '' && companyEmail != "" && pattern.test(companyEmail) && phoneNumber != "") {
        jQuery('#form-step-3').removeClass('active');
        jQuery('#form-step-4').addClass('active');
        // jQuery('#dateformcustomer').hide();

        jQuery.ajax({
            url: customFormAjax.ajax_url,
            type: 'POST',
            data: {
                action: 'instant_date_activity_form_submit',
                head_count: head_countValue,
                activity: activityvalue,
                full_name: fullName,
                CompanyEmail: companyEmail,
                PhoneNumber: phoneNumber,
                date: date,
                timezone: timezone,
                timeofday: timeofday
            },
            success: function (response) {
                console.log(response);
                jQuery('#formMessage').html(response);
            },
            error: function () {
                jQuery('#formMessage').html('There was an error processing your request.');
            }
        });

    }




});


function dateToUnixTimestamp(dateString, timezone) {
    // Parse the date string into a Date object
    const dateParts = dateString.split("/");
    const month = parseInt(dateParts[0]) - 1; // Months are 0-indexed
    const day = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);
    const date = new Date(year, month, day);

    const timezoneOffset = getTimeZoneOffset(timezone);

    // Adjust the date for the specified time zone
    date.setTime(date.getTime() + timezoneOffset);

    // Get the UNIX timestamp in seconds
    const unixTimestamp = Math.floor(date.getTime() / 1000);

    return unixTimestamp;
}

function getTimeZoneOffset(timezone) {
    // Implement logic to get timezone offset based on the selected timezone
    // You can use a library like Luxon or Moment.js for more accurate time zone handling
    // For this example, we'll use a simple mapping:

    const timezones = {
        "US Pacific": -28800000, // -8 hours
        "US Mountain": -25200000, // -7 hours
        "US Central": -21600000, // -6 hours
        "US Eastern": -18000000, // -5 hours
        "GMT/BST": 0,
        "IST": 19800000, // +5:30 hours
        // Add other time zones as needed
    };

    return timezones[timezone] || 0; // Default to 0 if timezone is not found
}

