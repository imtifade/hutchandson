/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */

// version 1.1
// release codename: ColdWaffles 

//define modules
define(['N/ui/dialog', 'N/record', 'N/currentRecord'],
    function (dialog, record, currentRecord) {
        //triggered when the super delete button is hit
        function superDelete(context) {
            //setting up the dialog
            var options = {
                title: "Super Delete",
                message: "Deleting all generated documents and returning to sales order."
            };
            function success(result) {

                console.log("Success with value " + result);

                if (result == true) {
                    //if confirm was hit then run this
                    deleteCS_INV_IF();
                }

                if (result == false) {
                    //cancle was hit stop the script
                    return false;
                }

            }
            function failure(reason) {
                console.log("Failure: " + reason);
            }

            dialog.confirm(options).then(success).catch(failure);

        }

        function pageInit(context) {
            //do something when page is loaded
        }




        return {
            superDelete: superDelete,
            pageInit: pageInit

        };


        function deleteCS_INV_IF() {
            //grabbing the record object
            var curRecord = currentRecord.get();

            //returns as lowercase and no space example : cashcale
            var curRecordType = curRecord.type;

            //if current record isn't the sales order load it
            if (curRecordType != "salesorder") {

                var salesOrderID = curRecord.getValue({
                    fieldId: 'createdfrom'
                });
                                                                //this is probably useless but we will leave it
            }
            //or just grab the ID
            else {

                var salesOrderID = curRecord.id;

            }
            //load the original sales order
            var originalSO = record.load({
                type: record.Type.SALES_ORDER,
                id: salesOrderID,
                isDynamic: true,
            });
            //get the ammount of related records
            var numLines = originalSO.getLineCount({
                sublistId: 'links'
            });
            //for each related record do this
            for (var i = 0; i < numLines; i++) {
                //grab the internal id for the record
                var recordID = originalSO.getSublistValue({
                    sublistId: 'links',
                    fieldId: 'id',
                    line: i
                });
                //grab the type of record
                var recordType = originalSO.getSublistValue({
                    sublistId: 'links',
                    fieldId: 'type',
                    line: i
                });
                //change the recordType results in to the correct option for the following function
                if (recordType == "Item Fulfillment") {
                    recordType = record.Type.ITEM_FULFILLMENT;
                }

                if (recordType == "Cash Sale") {
                    recordType = record.Type.CASH_SALE;
                }

                if (recordType == "Invoice") {
                    recordType = record.Type.INVOICE;
                }
            

                var deletedID = record.delete({
                    type: recordType,
                    id: recordID,
                });

            }

            //go back to the orginal sales order
            //format the url to get there
            var cashSaleURL = 'https://1204410.app.netsuite.com/app/accounting/transactions/salesord.nl?id=' + salesOrderID + '&whence=&e=T';
            //redirect to url
            window.location.replace(cashSaleURL);

        }


    });