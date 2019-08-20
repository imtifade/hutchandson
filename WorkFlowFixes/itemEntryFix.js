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

        function itemEntryCheck(context) {


            var record = currentRecord.get();

            unitType = record.getValue({
                fieldId: 'unitstype'           // defines the customer entity
            });

            prefLocal = record.getValue({
                fieldId: 'preferredlocation'           // defines the perfered location
            });



            if (!prefLocal || !unitType && !selected) {

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
                    message: "Looks like units and/or perfered Location is not set!",
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
            saveRecord: itemEntryCheck

        };

    });