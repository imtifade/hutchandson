/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */

// version 1.0
// release codename: Fuck the defualts 

//define modules
define(['N/currentRecord', 'N/ui/dialog'],
    //Callback for modules
    function (currentRecord, dialog) {


        var selected = false;

        function billingCheck(context) {


            var record = currentRecord.get();

            customerEntity = record.getValue({
                fieldId: 'entity'           // defines the customer entity
            });

            paymentMethod = record.getValue({
                fieldId: 'paymentmethod'           // defines the customer entity
            });

            terms = record.getValue({
                fieldId: 'terms'           // defines the customer entity
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
                    label: 'Cancel',
                    value: 6
                };

                var options = {
                    title: "Oh shit",
                    message: "How are dem guys payin?",
                    buttons: [button1, button2, button3, button4, button5, button6]
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
    
                        selected = true;
    
                    }

                    else {

                        selected = true;

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

                return true;

            }

        }

        return {
            saveRecord: billingCheck

        };

    });