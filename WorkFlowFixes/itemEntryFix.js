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

        function pageInit(context) {

            var record = currentRecord.get();

            var transID = record.getValue({
                fieldId: 'id'
            })

            if (!transID){
                record.selectLine({
                    sublistId: 'locations',
                    line: 0
                });

                record.setCurrentSublistValue({
                    sublistId: 'locations',
                    fieldId: 'preferredstocklevel',
                    value: 0,
                    ignoreFieldChange: true
                });

                record.setCurrentSublistValue({
                    sublistId: 'locations',
                    fieldId: 'reorderpoint',
                    value: 0,
                    ignoreFieldChange: true
                });

                record.commitLine({
                    sublistId: 'locations'
                });
            }

        }

        function itemEntryCheck(context) {


            var record = currentRecord.get();

            /*var quantity = record.getSublistValue({
                sublistId: 'item',
                fieldId: 'quantity',
                line: 0
            });*/

            if (!hasAPerferedVender (record) && !selected) {

                var button1 = {
                    label: 'Fixing it',
                    value: 1
                };
                var button2 = {
                    label: 'Leave alone',
                    value: 2
                };

                var options = {
                    title: "Oh shit",
                    message: "Looks like there is no perfered vender!!!",
                    buttons: [button1, button2]
                };

                function success(result) {
                    console.log("Success with value " + result);

                    if (result == 1) {

                        selected = false;

                    } else {

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
            saveRecord: itemEntryCheck,
            pageInit: pageInit

        };

        function hasAPerferedVender(Record) {

            var numLines = Record.getLineCount({
                sublistId: 'itemvendor'
            });

            if (numLines != 0) {

                for (var i = 0; i <= numLines - 1; i++) {

                    var perferedBool = Record.getSublistValue({
                        sublistId: 'itemvendor',
                        fieldId: 'preferredvendor',
                        line: i
                    });

                    if (perferedBool){
                        return true;
                    }
                }
            }
            return false;
        }

    });