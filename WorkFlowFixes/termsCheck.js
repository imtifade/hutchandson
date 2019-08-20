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

        function termsCheck(context) {


            var record = currentRecord.get();

            terms = record.getValue({
                fieldId: 'terms'           // defines the customer entity
            });



            if (terms = 1 && !selected) {

                console.log(terms);

                var button1 = {
                    label: 'Got it',
                    value: 1
                };
                var button2 = {
                    label: 'Leave me alone',
                    value: 2
                };

                var options = {
                    title: "Oh shit",
                    message: "Didn't change terms. You sure bro?",
                    buttons: [button1, button2]
                };

                function success(result) {
                    console.log("Success with value " + result);

                    if (result == 1) {

                        selected = true;

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
            saveRecord: termsCheck

        };

    });