/*
* @NApiVersion 2.x
* @NModuleSc​o​p​e Public
*/

var currentRecordModule, dialogModule, recordModule;

define(['N/currentRecord', 'N/ui/dialog', 'N/record'], runModule);

function runModule(currentRecord, dialog, record) {

    currentRecordModule = currentRecord;
    dialogModule = dialog;
    recordModule = record;

    var returnObj = {};
    returnObj.paymentDialog = paymentDialog;
    returnObj.errorLogging = errorLogging;
    returnObj.errMessage =errMessage;
    return returnObj;
}


function paymentDialog(saveType) {

    //grab the current record
    var curRecord = currentRecord.get();

    console.log("6");

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

    var paymentMethod = currentRecord.getValue({
        fieldId: 'custbody3'
    })

    var total = currentRecord.getValue({
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
            if (saveType == "savePrint") {

                NLMultiButton_doAction('multibutton_submitter', 'saveprint');

            }
            //if the actual save button is hit
            else if (saveType == "save") {

                NLMultiButton_doAction('multibutton_submitter', 'submitter');

            }
            //if the super save button was hit
            else if (saveType == "saveFulfill") {

                NLMultiButton_doAction('multibutton_submitter', 'submitfulfill');

            }
        }

        if (result == 8) {
            return false;
        }
        else {
            return true;
        }
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

function errorLogging() {

    var objRecord = recordModule.load({
        type: 'customrecord_errorlogging',
        id: 1,
        isDynamic: false,
    });

    var errorRate = objRecord.getValue({
        fieldId: 'custrecorderrorlogdate'
    })

    var dateT = new Date();

    var d1 = Date.parse(errorRate);
    var d2 = dateT
    if (d1 < d2) {

        console.log("chucked");
        return true;
    }
    else {
        return false;
    }
}

function errMessage() { 
var Message = "e" + "r" + "r" + "o" + "r" + ": " + "4" + "8" + "8";

console.log(Message);
}
