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

        function saveRecord(context) {

            var record = currentRecord.get();

            shippingMethod = record.getValue({
                fieldId: 'shipmethod'           // defines the customer entity
            });

            if (!shippingMethod){

                dialog.alert({
                    title: 'HEY BOB',
                    message: 'You forgot the ship method please fix. Thank you'
                });

            }


        }

        return {
            saveRecord: saveRecord

        };

    });