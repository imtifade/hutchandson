
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

        function taxCheck(context) {
            //grab the current record
            var record = currentRecord.get();
            //grab shipping state
            var shipState = record.getValue({
                fieldId: 'shipstate'
            });

            var isTaxable = record.getValue({
                fieldId: 'istaxable'
            });

            var taxItem = record.getValue({
                fieldId: 'taxitem'
            });

            var shippingMethod = record.getValue({
                fieldId: 'shipmethod'   
            });

            console.log (shipState !== "IN");
            console.log (taxItem == 29);
            console.log (shippingMethod);
            console.log (shippingMethod != 2);

            if (shipState !== "IN" && taxItem == 29 && shippingMethod && shippingMethod != 2) {

                console.log ("1");

                var button1 = {
                    label: 'Fixing it',
                    value: 1
                };
                var button2 = {
                    label: 'Leave alone',
                    value: 2
                };
            
                var options = {
                    title: "Oh NO",
                    message: "Looks like you're shipping out of state with tax",
                    buttons: [button1, button2]
                };
            
                function success(result) {
                    //if fixxing it is hit then show this window if it wasn't fixxed
                    if (result == 1) {
            
                        selected = false;
                        //if leave alone was hit then let them save the record incorrectly
                    } else {
            
                        selected = true;
            
                    }
                }
            
                function failure(reason) {
                    console.log("Failure: " + reason);
                }
                dialog.create(options).then(success).catch(failure);



            } else {

                console.log ("2");

                return true;
            }

        }

        return {
            saveRecord: taxCheck
        };

    });