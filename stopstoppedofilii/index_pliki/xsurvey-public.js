(function($) {
    'use strict';
    /**
     * All of the code for your public-facing JavaScript source
     * should reside in this file.
     *
     * Note: It has been assumed you will write jQuery code here, so the
     * $ function reference has been prepared for usage within the scope
     * of this function.
     *
     * This enables you to define handlers, for when the DOM is ready:
     *
     * $(function() {
     *
     * });
     *
     * When the window is loaded:
     *
     * $( window ).load(function() {
     *
     * });
     *
     * ...and/or other possibilities.
     *
     * Ideally, it is not considered best practise to attach more than a
     * single DOM-ready or window-load handler for a particular page.
     * Although scripts in the WordPress core, Plugins and Themes may be
     * practising this, we should strive to set a better example in our own work.
     */
    $(document).ready(function() {
        const XSurveyForms = $('.xsurvey-survey-form');
        XSurveyForms.each(function() {
            let XSurveyForm = $(this),
                currentTabIndex = 0; // Current tab is set to be the first tab (0)
            showTab(currentTabIndex); // Display the current tab
            XSurveyForm.find('.prev-btn').click(function() {
                nextPrev(-1);
            });
            XSurveyForm.find('.next-btn').click(function() {
                XSurveyForm.parent('.xsurvey-response-container').find('.notice').hide();
                nextPrev(1);
            });

            function showTab(n) {
                const prevButton = XSurveyForm.find('.prev-btn'),
                    nextButton = XSurveyForm.find('.next-btn'),
                    tabs = XSurveyForm.find('.tab');
                // This function will display the specified tab of the form ...
                tabs.eq(n).css('display', 'block');
                // ... and fix the Previous/Next buttons:
                if (n === 0) {
                    prevButton.css("display", "none");
                } else {
                    prevButton.css("display", "inline");
                }
                if (n === (tabs.length - 1)) {
                    nextButton.text(translations.submit);
                } else {
                    nextButton.text(translations.next);
                }
                // ... and run a function that displays the correct step indicator:
                fixStepIndicator(n)
            }

            function nextPrev(n) {
                // This function will figure out which tab to display
                const tabs = XSurveyForm.find('.tab');
                // Exit the function if any field in the current tab is invalid:
                if (n === 1 && !validateForm()) return false;
                // Hide the current tab:
                tabs.eq(currentTabIndex).css('display', 'none');
                // Increase or decrease the current tab by 1:
                currentTabIndex = currentTabIndex + n;
                // if you have reached the end of the form... :
                if (currentTabIndex >= tabs.length) {
                    //...the form gets submitted:
                    XSurveyForm.submit();
                    XSurveyForm.replaceWith( '<p class="xsurvey-form-processing">' + translations.processing + '</p>');
                    return false;
                }
                // Otherwise, display the correct tab:
                showTab(currentTabIndex);
            }

            function validateForm() {
                // This function deals with validation of the form fields
                const tabs = XSurveyForm.find('.tab'),
                    currentTab = tabs.eq(currentTabIndex),
                    inputs = currentTab.find("input"),
                    steps = XSurveyForm.find(".step");
                let i,
                    valid = false;
                // A loop that checks every input field in the current tab:
                if (currentTab.hasClass('question')) {
                    for(i = 0; i < inputs.length; i++) {
                        // If a field is empty...
                        if(inputs.eq(i).is(':checked') === true) {
                            valid = true;
                            break;
                        }
                    }
                } else if (currentTab.hasClass('finalize')) {
                    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    valid = true;
                    for(i = 0; i < inputs.length; i++) {
                        if (inputs.eq(i).attr('type') === 'email' && (inputs.eq(i).val() === '' || !inputs.eq(i).val().match(emailRegEx))) {
                            currentTab.find("label[for='" + inputs.eq(i).attr('id') + "']").addClass('invalid');
                            valid = false;
                        } else if(inputs.eq(i).hasClass('field-required') && (inputs.eq(i).attr('type') === 'checkbox' && !inputs.eq(i).is(':checked'))) {
                            currentTab.find("label[for='" + inputs.eq(i).attr('id') + "']").addClass('invalid');
                            valid = false;
                        } else {
                            currentTab.find("label[for='" + inputs.eq(i).attr('id') + "']").removeClass('invalid');
                        }
                    }
                }
                // If the valid status is true, mark the step as finished and valid:
                if (valid) {
                    steps.eq(currentTabIndex).addClass('finish');
                    currentTab.removeClass('invalid');
                } else {
                    currentTab.addClass('invalid');
                }
                return valid; // return the valid status
            }

            function fixStepIndicator(n) {
                // This function removes the "active" class of all steps...
                const steps = XSurveyForm.find(".step");
                let i;
                for(i = 0; i < steps.length; i++) {
                    steps.eq(i).removeClass('active');
                }
                //... and adds the "active" class to the current step:
                steps.eq(n).addClass('active');
            }
        });
        /**
         * SURVEY RESULTS
         */
        /* CONFIRMED RESULTS CHART */
        let responsesCharts = $('.chart-results');
        responsesCharts.each(function() {
            const responsesChartLabels = $(this).data('labels'),
                responsesChartResults = $(this).data('results'),
                responsesChart = new Chart($(this), {
                    type: 'bar',
                    data: {
                        labels: responsesChartLabels,
                        datasets: [{
                            label: '# of Votes',
                            data: responsesChartResults,
                            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                            borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        layout: {
                            padding: {
                                bottom: 20
                            }
                        },
                        legend: {
                            display: false
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                maxBarThickness: 40,
                                offset: true,
                                ticks: {
                                    autoSkip: false,
                                    callback: function(value, index, values) {
                                        if(Array.isArray(value) && value.length > 1) {
                                            return value[0] + '...';
                                        } else {
                                            return value;
                                        }
                                    }
                                }
                            }]
                        },
                        tooltips: {
                            enabled: true,
                            mode: 'single',
                            callbacks: {
                                title: function(tooltipItem, data) {
                                    return data.labels[tooltipItem[0].index];
                                },
                                label: function(tooltipItem, data) {
                                    const singleAmount = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index],
                                        reducer = (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue),
                                        totalAmount = responsesChartResults.reduce(reducer),
                                        percent = ((parseInt(singleAmount) / totalAmount) * 100).toFixed(2);
                                    return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + ' (' + percent + '%)';
                                }
                            }
                        },
                    }
                });
        });
        /* END CONFIRMED RESULTS CHART */
    })
})(jQuery);