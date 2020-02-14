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
            //grab record data
            var record = currentRecord.get();
            //grab the shipping info
            shippingMethod = record.getValue({
                fieldId: 'shipmethod'   
            });
            // defines the customer entity
            entity = record.getValue({
                fieldId: 'entity'
            });
            //if shipping method is blank or the profit of the line item is =< 0 
            if (!shippingMethod || checkProfit(record).bool) {
                //if ship method is blank
                if (!shippingMethod) {
                    //call back of the dialog successly being closed
                    function success(result) {
                        //the url of the customer assosiated with the record
                        var customerURL = 'https://1204410.app.netsuite.com/app/common/entity/custjob.nl?id=' + entity + "&e=T&selectedtab=preferences&stage=Customer";
                        //open a new browser window with the customerURL
                        windowObjectReference = window.open(
                            customerURL,
                            "Customer",
                            "resizable,scrollbars,status"
                        );

                    }
                    function failure(reason) { console.log('Failure: ' + reason) }
                    //set up the alert dialog
                    dialog.alert({
                        title: 'HEY BOB',
                        message: "Looks like you missed the ship method. Lets set the defualt. You just need to scroll down in this new window and set the right SHIPMETHOD and save it and exit the window. Then just fix the ship Method on this page."
                    }).then(success).catch(failure);
                }
                //if the profit of the line item is =< 0
                else if (checkProfit(record).bool){

                    function success(result) {}
                    function failure(reason) { console.log('Failure: ' + reason) }
                    //setup the message for the dialog
                    var profitMessage = "Looks like " + checkProfit(record).line + "'s rate is lower than cost.";
                    //send alert to window
                    dialog.alert({
                        title: 'HEY BOB',
                        message: profitMessage
                    }).then(success).catch(failure);

                }

            }

            else {

                return true;

            }

        }

        return {
            saveRecord: saveRecord
        };
        //this takes the original SO object as an argument and returns true and the item part number if the rate is lower than cost, if not the false
        function checkProfit(originalSO) {
            //get the number of line items on record
            var numLines = originalSO.getLineCount({
                sublistId: 'item'
            });
            //loop through each line item and check
            for (var i = 0; i < numLines; i++) {

                var cost = originalSO.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'costestimate',
                    line: i
                });

                var rate = originalSO.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate',
                    line: i
                });

                if (rate < cost) {

                    var lineitem = originalSO.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'item_display',
                        line: i
                    });

                    return {
                        //returning true and item's part number
                        bool: true,
                        line: lineitem,
                    };

                }

            }
            return false;
        }

    });