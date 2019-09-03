/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */

//Release Codename: fuck the flow
define(['N/currentRecord', 'N/ui/message'],
    function (currentRecord, message) {
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

                console.log (tranID);

                if (tranID == "To Be Generated"){

                    NLMultiButton_doAction('multibutton_submitter', 'submitfulfill');

                }

                if (tranID){
                    //if the record isn't new 
                    //
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

        return {
            pageInit: pageInit,
            superSave: superSave
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