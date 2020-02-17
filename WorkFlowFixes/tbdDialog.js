//Combined in to superSaveButton


/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */

// version 1.1
// release codename: Fuck the defualts 

//define modules
define(['N/record', 'N/currentRecord', 'N/ui/dialog'],
    //Callback for modules
    function (record, currentRecord, dialog) {


        var selected = false;

        function pageInit(context) {

            //catches  the payment meathod on page load and brings up the
            //payment method dialog

            var curRecord = currentRecord.get();

            var paymentMethod = curRecord.getValue({
                fieldId: 'custbody3'
            });


            if (paymentMethod == "TBD") {

                var createdfrom = curRecord.getValue({
                    fieldId: 'createdfrom'
                });

                var originalSO = record.load({
                    type: record.Type.SALES_ORDER,
                    id: createdfrom,
                    isDynamic: true,
                });

                var originalSO = record.load({
                    type: record.Type.SALES_ORDER,
                    id: createdfrom,
                    isDynamic: true,
                });

                if (!checkForBackorder(originalSO)) {

                    paymentDialog (originalSO, curRecord);

                }
                //If orginal slaes order dose have a back order
                else{

                    var button1 = {
                        label: 'I know',
                        value: 1
                    };
                    var button2 = {
                        label: 'Fixxing stuff',
                        value: 2
                    };

                    var options = {
                        title: "Oh shit",
                        message: "Looks like there is a backorder",
                        buttons: [button1, button2]
                    };
            
                    function success(result) {

                        if (result == 1){
                        
                            paymentDialog (originalSO, curRecord);

                            return true;
                        
                        }
                        else{
                            return true;
                        }
                    }
                    
                    function failure(reason) {
                        console.log("Failure: " + reason);
                    }

                    dialog.create(options).then(success).catch(failure);

                }
            }

            else {
                return true;
            }
        }

        return {
            pageInit: pageInit
        };

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

        function paymentDialog (originalSO, curRecord){

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

        var cancle = {
            label: 'Cancel',
            value: 8
        };

        var total = curRecord.getValue({
            fieldId: 'total'
        });

        var options = {
            title: "Oh shit",
            message: "Total is:" + total + " How are dem guys payin?",
            buttons: [button1, button2, button3, button4, button5, button6, cancle]
        };

        function success(result) {
            console.log("Success with value " + result);

            if (result == 1) {

                curRecord.setValue({
                    fieldId: 'paymentmethod',
                    value: 1,
                    ignoreFieldChange: false,
                    forceSyncSourcing: true
                });

                curRecord.setValue({
                    fieldId: 'terms',
                    value: "",
                    ignoreFieldChange: false,
                    forceSyncSourcing: true
                });

                curRecord.setValue({
                    fieldId: 'custbody3',
                    value: "CASH",
                    ignoreFieldChange: false,
                    forceSyncSourcing: true
                });

                originalSO.setValue({
                    fieldId: 'custbody3',
                    value: "CASH",
                    ignoreFieldChange: false
                });

                var recordId = originalSO.save({
                    enableSourcing: false,
                    ignoreMandatoryFields: true
                });

                selected = true;

            }

            else if (result == 2) {

                curRecord.setValue({
                    fieldId: 'paymentmethod',
                    value: 1,
                    ignoreFieldChange: false,
                    forceSyncSourcing: true
                });

                curRecord.setValue({
                    fieldId: 'terms',
                    value: "",
                    ignoreFieldChange: false,
                    forceSyncSourcing: true
                });

                curRecord.setValue({
                    fieldId: 'custbody3',
                    value: "VISA",
                    ignoreFieldChange: false,
                    forceSyncSourcing: true
                });

                originalSO.setValue({
                    fieldId: 'custbody3',
                    value: "VISA",
                    ignoreFieldChange: false
                });

                var recordId = originalSO.save({
                    enableSourcing: false,
                    ignoreMandatoryFields: true
                });

                selected = true;

            }

            else if (result == 3) {

                curRecord.setValue({
                    fieldId: 'paymentmethod',
                    value: 1,
                    ignoreFieldChange: false,
                    forceSyncSourcing: true
                });

                curRecord.setValue({
                    fieldId: 'terms',
                    value: "",
                    ignoreFieldChange: false,
                    forceSyncSourcing: true
                });

                curRecord.setValue({
                    fieldId: 'custbody3',
                    value: "M/C",
                    ignoreFieldChange: false,
                    forceSyncSourcing: true
                });

                originalSO.setValue({
                    fieldId: 'custbody3',
                    value: "M/C",
                    ignoreFieldChange: false
                });

                var recordId = originalSO.save({
                    enableSourcing: false,
                    ignoreMandatoryFields: true
                });

                selected = true;

            }

            else if (result == 4) {

                curRecord.setValue({
                    fieldId: 'paymentmethod',
                    value: 1,
                    ignoreFieldChange: false,
                    forceSyncSourcing: true
                });

                curRecord.setValue({
                    fieldId: 'terms',
                    value: "",
                    ignoreFieldChange: false,
                    forceSyncSourcing: true
                });

                curRecord.setValue({
                    fieldId: 'custbody3',
                    value: "DISCOVER",
                    ignoreFieldChange: false,
                    forceSyncSourcing: true
                });

                originalSO.setValue({
                    fieldId: 'custbody3',
                    value: "DISCOVER",
                    ignoreFieldChange: false
                });

                var recordId = originalSO.save({
                    enableSourcing: false,
                    ignoreMandatoryFields: true
                });

                selected = true;

            }

            else if (result == 5) {

                curRecord.setValue({
                    fieldId: 'paymentmethod',
                    value: 1,
                    ignoreFieldChange: false,
                    forceSyncSourcing: true
                });

                curRecord.setValue({
                    fieldId: 'terms',
                    value: "",
                    ignoreFieldChange: false,
                    forceSyncSourcing: true
                });

                curRecord.setValue({
                    fieldId: 'custbody3',
                    value: "AM/EX",
                    ignoreFieldChange: false,
                    forceSyncSourcing: true
                });

                originalSO.setValue({
                    fieldId: 'custbody3',
                    value: "AM/EX",
                    ignoreFieldChange: false
                });

                var recordId = originalSO.save({
                    enableSourcing: false,
                    ignoreMandatoryFields: true
                });

                selected = true;

            }


            else if (result == 6) {

                curRecord.setValue({
                    fieldId: 'paymentmethod',
                    value: 1,
                    ignoreFieldChange: false,
                    forceSyncSourcing: true
                });

                curRecord.setValue({
                    fieldId: 'terms',
                    value: "",
                    ignoreFieldChange: false,
                    forceSyncSourcing: true
                });

                curRecord.setValue({
                    fieldId: 'custbody3',
                    value: "CHECK",
                    ignoreFieldChange: false,
                    forceSyncSourcing: true
                });

                var checkNum = curRecord.getValue({
                    fieldId: 'otherrefnum'           // defines the customer entity
                });

                if (!checkNum || checkNum == "") {

                    checkNum = window.prompt("Enter check number", "");

                    curRecord.setValue({
                        fieldId: 'otherrefnum',
                        value: checkNum,
                        ignoreFieldChange: false,
                        forceSyncSourcing: true
                    });

                    originalSO.setValue({
                        fieldId: 'custbody3',
                        value: "CHECK",
                        ignoreFieldChange: false
                    });

                    originalSO.setValue({
                        fieldId: 'otherrefnum',
                        value: checkNum,
                        ignoreFieldChange: false
                    });

                    var recordId = originalSO.save({
                        enableSourcing: false,
                        ignoreMandatoryFields: true
                    });

                }

                selected = true;

            }

            else if (result == 8) {

                selected = false;

            }

            if (result != 8) {

                NLMultiButton_doAction('multibutton_submitter', 'saveprint');
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

        else {

            return true;

        }
    }

    });