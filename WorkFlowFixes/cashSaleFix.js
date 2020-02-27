

//Combined in to superSaveButton


/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */

// version 1.1
// release codename: Fuck the defualts 

//define modules
define(['N/currentRecord', 'N/ui/dialog'],
    //Callback for modules
    function (currentRecord, dialog) {

        //this for the work around that keep the whole server from crashing. May or may not be needed anymore. Still don't touch it!
        var selected = false;
        //call by function from record save 
        function billingCheck(context) {
            //grab the current record
            var record = currentRecord.get();
            //grab super save status
            var superSaved = record.getValue({
                fieldId: 'custbody_supersaved'
            });
            //if it wasn't super saved alreadt
            if (!superSaved) {
                //grab payment method
                var paymentMethod = record.getValue({
                    fieldId: 'paymentmethod'
                });
                //grab payment terms
                var terms = record.getValue({
                    fieldId: 'terms'
                });

                //if terms are due on reciept or terms are blank and the payment meathod isn't cash
                if (terms == 4 && !selected || !terms && paymentMethod != 1 && !selected) {
                    //setting up the buttons
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
                        label: 'Disc',
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
                        label: 'TBD',
                        value: 7
                    };

                    var cancle = {
                        label: 'Cancel',
                        value: 8
                    };
                    //combine everthing for the options for the dialog pop up
                    var options = {
                        title: "Payment?",
                        message: "How are they paying?",
                        buttons: [button1, button2, button3, button4, button5, button6, button7, cancle]
                    };
                    //do this when a dialog button is hit
                    function success(result) {
                        console.log("Success with value " + result);
                        //look for each buttons result and set the record correctly accordingly
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
                        //TBD option
                        else if (result == 7) {

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
                                value: "TBD",
                                ignoreFieldChange: true,
                                forceSyncSourcing: true
                            });

                            record.setValue({
                                fieldId: 'custbody_supersaved',
                                value: true,
                                ignoreFieldChange: true,
                                forceSyncSourcing: true
                            });

                            selected = true;

                        }
                        //if cancel is hit stop
                        else if (result == 8) {

                            selected = false;

                        }

                        if (result != 8) {
                            //hack to make is save after a button is hit
                            //a command called to a seperate javascript file on the page
                            NLMultiButton_doAction('multibutton_submitter', 'submitter');

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
            } else {

                return true;

            }

        }

        return {
            saveRecord: billingCheck
        };

    });