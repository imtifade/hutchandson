/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */

// version 1.0
// release codename: ColdWaffles 

//define modules
define(['N/ui/dialog', 'N/record', 'N/currentRecord'],
    //Callback for modules
    function (dialog, record, currentRecord) {

        function superDelete(context) {

            var options = {
                title: "Super Delete",
                message: "Deleteing all generated documents and returning to sales order."
            };
            function success(result) {

                console.log("Success with value " + result);

                if (result == true) {
                    deleteCS_INV_IF();
                }

                if (result == false) {
                    return false;
                }

            }
            function failure(reason) {
                console.log("Failure: " + reason);
            }

            dialog.confirm(options).then(success).catch(failure);

        }

        function pageInit(context) {

        }




        return {
            superDelete: superDelete,
            pageInit: pageInit

        };


        function deleteCS_INV_IF() {

            var curRecord = currentRecord.get();

            //returns as lowercase and no space example : cashcale
            var curRecordType = curRecord.type;

            console.log(curRecordType);

            //if current record isn't the sales order load it
            if (curRecordType != "salesorder") {

                var salesOrderID = curRecord.getValue({
                    fieldId: 'createdfrom'
                });

                console.log("record not sales order");

            }
            //or just grab the ID
            else {

                console.log("record is sales order");

                var salesOrderID = curRecord.id;

            }

            var originalSO = record.load({
                type: record.Type.SALES_ORDER,
                id: salesOrderID,
                isDynamic: true,
            });

            var numLines = originalSO.getLineCount({
                sublistId: 'links'
            });

            console.log("Number of lines in record " + numLines);

            for (var i = 0; i < numLines; i++) {

                var recordID = originalSO.getSublistValue({
                    sublistId: 'links',
                    fieldId: 'id',
                    line: i
                });

                var recordType = originalSO.getSublistValue({
                    sublistId: 'links',
                    fieldId: 'type',
                    line: i
                });

                if (recordType == "Item Fulfillment") {
                    recordType = record.Type.ITEM_FULFILLMENT;
                    console.log("Is a Fulfillment");
                }

                if (recordType == "Cash Sale") {
                    recordType = record.Type.CASH_SALE;
                    console.log("Is a Cash sale");
                }

                if (recordType == "Invoice") {
                    recordType = record.Type.INVOICE;
                    console.log("Is a Is an invoice");
                }

                console.log("Redord deleting:" + recordType + recordID);

                var deletedID = record.delete({
                    type: recordType,
                    id: recordID,
                });

                console.log("Deleted:" + deletedID);
            }

            var cashSaleURL = 'https://1204410.app.netsuite.com/app/accounting/transactions/salesord.nl?id=' + salesOrderID + '&whence=&e=T';

            window.location.replace(cashSaleURL);

        }


    });