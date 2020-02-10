/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */

//Release Codename: fuck the flow
define(['N/currentRecord', 'N/ui/message', 'N/ui/dialog'],
    function (currentRecord, message, dialog) {
        function superSave(context) {

            var curRecord = currentRecord.get();

            if (!checkForBackorder(curRecord)) {

                curRecord.setValue({
                    fieldId: 'custbody_supersaved',
                    value: true,
                    ignoreFieldChange: true,
                    forceSyncSourcing: true
                });

                var tranID = curRecord.getValue({
                    fieldId: 'tranid'           // defines the customer entity
                });

                if (tranID == "To Be Generated") {

                    billingCheck(context, tranID);

                }

                else if (tranID != "To Be Generated") {

                    billingCheck(context, tranID);

                    //if the record isn't new do the thing
                } else {
                    return true;
                }



            }
            else {

                var backOrderError = message.create({
                    title: "Whoa There Buddy",
                    message: "You have a back ordered item. Fix dat.",
                    type: message.Type.ERROR,
                    duration: 5000
                });


                backOrderError.show(); // will stay up until hide is called.

            }

            return false;


        }

        function pageInit(context) {



        }

        var selected = false;



        return {
            pageInit: pageInit,
            superSave: superSave
        }

        function billingCheck(context, tranid) {


            var record = currentRecord.get();

            var paymentMethod = record.getValue({
                fieldId: 'paymentmethod'           // defines the customer entity
            });

            var terms = record.getValue({
                fieldId: 'terms'           // defines the terms entity
            });



            if (terms == 4 && !selected || !terms && paymentMethod != 1 && !selected) {

                var button1 = {
                    label: 'Cash',
                    value: 1
                };
                var button2 = {
                    label: 'Visa',
                    value: 2
                };

                var button3 = {
                    label: 'M/C',
                    value: 3
                };

                var button4 = {
                    label: 'Discover',
                    value: 4
                };

                var button5 = {
                    label: 'AM/EX',
                    value: 5
                };

                var button6 = {
                    label: 'Check',
                    value: 6
                };

                var button7 = {
                    label: 'Cancel',
                    value: 7
                };

                var options = {
                    title: "Oh shit",
                    message: "How are dem guys payin?",
                    buttons: [button1, button2, button3, button4, button5, button6, button7]
                };

                function success(result) {
                    console.log("Success with value " + result);

                    if (result == 1) {

                        record.setValue({
                            fieldId: 'paymentmethod',
                            value: 1,
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        record.setValue({
                            fieldId: 'terms',
                            value: "",
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        record.setValue({
                            fieldId: 'custbody3',
                            value: "CASH",
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        selected = true;

                    }

                    else if (result == 2) {

                        record.setValue({
                            fieldId: 'paymentmethod',
                            value: 1,
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        record.setValue({
                            fieldId: 'terms',
                            value: "",
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        record.setValue({
                            fieldId: 'custbody3',
                            value: "VISA",
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        selected = true;

                    }

                    else if (result == 3) {

                        record.setValue({
                            fieldId: 'paymentmethod',
                            value: 1,
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        record.setValue({
                            fieldId: 'terms',
                            value: "",
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        record.setValue({
                            fieldId: 'custbody3',
                            value: "M/C",
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        selected = true;

                    }

                    else if (result == 4) {

                        record.setValue({
                            fieldId: 'paymentmethod',
                            value: 1,
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        record.setValue({
                            fieldId: 'terms',
                            value: "",
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        record.setValue({
                            fieldId: 'custbody3',
                            value: "DISCOVER",
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        selected = true;

                    }

                    else if (result == 5) {

                        record.setValue({
                            fieldId: 'paymentmethod',
                            value: 1,
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        record.setValue({
                            fieldId: 'terms',
                            value: "",
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        record.setValue({
                            fieldId: 'custbody3',
                            value: "AM/EX",
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        selected = true;

                    }

                    else if (result == 6) {

                        record.setValue({
                            fieldId: 'paymentmethod',
                            value: 1,
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        record.setValue({
                            fieldId: 'terms',
                            value: "",
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        record.setValue({
                            fieldId: 'custbody3',
                            value: "CHECK",
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        var checkNum = record.getValue({
                            fieldId: 'otherrefnum'           // defines the customer entity
                        });

                        if (!checkNum || checkNum == "") {

                            checkNum = window.prompt("Enter check number", "");

                            record.setValue({
                                fieldId: 'otherrefnum',
                                value: checkNum,
                                ignoreFieldChange: true,
                                forceSyncSourcing: true
                            });

                        }

                        selected = true;

                    }

                    else if (result == 7) {

                        selected = false;

                    }

                    else {

                        selected = true;

                    }

                    if (result != 7 && tranid != "To Be Generated") {

                        //do this if it a pre exsisting sales order

                        http.request.promise({
                            method: http.Method.GET, //Get should be OK
                            url: 'http://www.google.com', //Replace with the Suitelet URL
                            body: 'My REQUEST Data', //Replace with the tranID
                            headers: headerObj // Probably don't need this
                        })
                            .then(function (response) {
                                log.debug({
                                    title: 'Response',
                                    details: response
                                });
                            })
                            .catch(function onRejected(reason) {
                                log.debug({
                                    title: 'Invalid Request: ',
                                    details: reason
                                });
                            })

                        NLMultiButton_doAction('multibutton_submitter', 'submitter');

                    }

                    else if (result != 7) {

                        NLMultiButton_doAction('multibutton_submitter', 'submitfulfill');

                    }

                    else {

                    }
                }

                function failure(reason) {
                    console.log("Failure: " + reason);
                }
                dialog.create(options).then(success).catch(failure);

                if (selected) {

                    return true;

                }

            } else {

                if (tranid == "To Be Generated"){

                NLMultiButton_doAction('multibutton_submitter', 'submitfulfill');
                }

                return true;

            }

        }


        function checkForBackorder(originalSO) {


            var numLines = originalSO.getLineCount({
                sublistId: 'item'
            });

            for (var i = 0; i < numLines; i++) {

                var QUANTITY = originalSO.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: i
                });

                var AVAILABLE = originalSO.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantityavailable',
                    line: i
                });

                var backorderMath = AVAILABLE - QUANTITY;

                if (backorderMath < 0) {

                    return true;

                }

            }
            return false;
        }


    });