/*
* @NApiVersion 2.x
* @NModuleSc​o​p​e Public
*/

define(['N/currentRecord', 'N/ui/dialog'], function (currentRecord, dialog) {


    function paymentDialog(buttonHit) {

        //grab the current record
        var curRecord = currentRecord.get();

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

        var paymentMethod = curRecord.getValue({
            fieldId: 'custbody3'
        })

        var total = curRecord.getValue({
            fieldId: 'total'
        });

        if (paymentMethod == "TBD") {

            var options = {
                title: "Payment",
                message: "Total is:" + total + " How are they payin?",
                buttons: [button1, button2, button3, button4, button5, button6, cancle]
            };

        }
        else {

            var options = {
                title: "Payment",
                message: "Total is:" + total + " How are they payin?",
                buttons: [button1, button2, button3, button4, button5, button6, button7, cancle]
            };

        }

        function success(result) {

            if (result == 1) {

                setPaymentValues('CASH');

            }

            else if (result == 2) {

                setPaymentValues('VISA');

            }

            else if (result == 3) {

                setPaymentValues('M/C');

            }

            else if (result == 4) {

                setPaymentValues('DISC');

            }

            else if (result == 5) {

                setPaymentValues('AM/EX');

            }


            else if (result == 6) {

                setPaymentValues('CHECK');

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

                    curRecord.setValue({
                        fieldId: 'custbody3',
                        value: "CHECK",
                        ignoreFieldChange: false
                    });

                    curRecord.setValue({
                        fieldId: 'otherrefnum',
                        value: checkNum,
                        ignoreFieldChange: false
                    });

                }

            }

            else if (result == 7) {

                setPaymentValues('TBD');

                curRecord.setValue({
                    fieldId: 'custbody_supersaved',
                    value: true,
                    ignoreFieldChange: true,
                    forceSyncSourcing: true
                });

                NLMultiButton_doAction('multibutton_submitter', 'saveprint');
            }

            if (result != 8 && result != 7) {
                //if it's a target for the TBD
                if (curRecord.type == "CASH_SALE") {

                    NLMultiButton_doAction('multibutton_submitter', 'saveprint');

                }
                //if the actual save button is hit
                else if (!buttonHit) {

                    NLMultiButton_doAction('multibutton_submitter', 'submitter');

                }
                //if the super save button was hit
                else if (buttonHit) {

                    NLMultiButton_doAction('multibutton_submitter', 'submitfulfill');

                }
            }
            return true;
        }

        function failure(reason) {

            console.log("Failure: " + reason);

        }

        dialog.create(options).then(success).catch(failure);

        return false;

    }

    function setPaymentValues(fieldvalue) {

        //grab the current record
        var curRecord = currentRecord.get();


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
            value: fieldvalue,
            ignoreFieldChange: false
        });

    }

    return {
        paymentDialog: paymentDialog
    };

});