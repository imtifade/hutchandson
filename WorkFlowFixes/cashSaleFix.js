
/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */

// version 1.1
// release codename: Fuck the defualts 

//define modules
define(['N/currentRecord','SuiteScripts/customModules/workflowModules'],
    //Callback for modules
    function (currentRecord, workflowModules) {

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
                if (terms == 4 || !terms && paymentMethod != 1) {

                    if (workflowModules.paymentDialog (false)) {
                        return true;
                    }
                    else {
                        return false;
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