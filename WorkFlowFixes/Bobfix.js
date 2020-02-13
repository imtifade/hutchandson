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

            entity = record.getValue({
                fieldId: 'entity'           // defines the customer entity
            });

            if (!shippingMethod || checkProfit(record).bool) {

                if (!shippingMethod) {
                    function success(result) {

                        var customerURL = 'https://1204410.app.netsuite.com/app/common/entity/custjob.nl?id=' + entity + "&e=T&selectedtab=preferences&stage=Customer";

                        windowObjectReference = window.open(
                            customerURL,
                            "Customer",
                            "resizable,scrollbars,status"
                        );

                    }
                    function failure(reason) { console.log('Failure: ' + reason) }

                    dialog.alert({
                        title: 'HEY BOB',
                        message: "Looks like you missed the ship method. Lets set the defualt. You just need to scroll down in this new window and set the right SHIPMETHOD and save it and exit the window. Then just fix the ship Method on this page."
                    }).then(success).catch(failure);
                }

                else if (checkProfit(record).bool){

                    function success(result) {

                    }
                    function failure(reason) { console.log('Failure: ' + reason) }

                    var profitMessage = "Looks like " + checkProfit(record).line + "'s rate is lower than cost.";

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

        function checkProfit(originalSO) {


            var numLines = originalSO.getLineCount({
                sublistId: 'item'
            });

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
                        bool: true,
                        line: lineitem,
                    };

                }

            }
            return false;
        }

    });