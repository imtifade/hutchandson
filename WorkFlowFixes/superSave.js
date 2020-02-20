/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */

//Release Codename: fuck the flow

/* 
This one is kinda complicated. It is ran on server side before an item fulfillment is loaded.
It checks the super save status then generates the correct records with record.transform and redirects you to the new invoice or cash sale.
It throws a new line of html in the webpage to get the redirects done. 
*/

define(['N/record', "N/ui/serverWidget"],
    function (record, serverWidget) {
        function beforeLoad(context) {
            //if the record is being created (not saved yet) do this
            if (context.type == 'create') {
                //grab super save status
                var superSaved = context.newRecord.getValue({
                    fieldId: 'custbody_supersaved'
                });
                //if super save is checked then do this
                if (superSaved) {
                    //grab the internal id of the sales order the fulfillment
                    var createdfrom = context.newRecord.getValue({
                        fieldId: 'createdfrom'
                    });
                    //load the original sales order to an object
                    var originalSO = record.load({
                        type: record.Type.SALES_ORDER,
                        id: createdfrom,
                        isDynamic: true,
                    });
                    //load the terms of payment
                    terms = originalSO.getValue({
                        fieldId: 'terms'
                    });

                    //if the terms are unset or set to due on reciept 
                    if (!terms || terms == 4) {
                        
                        cashSaleGen (createdfrom, originalSO, context);
                    
                    }
                    
                    //if it's not suppose to be a cash sale do this
                    else {
                        
                        invoiceGen (createdfrom, context);

                    }

                }

            }
        }

        return {
            beforeLoad: beforeLoad
        }

        function cashSaleGen (createdfrom, originalSO, context){
            //check if the payment type is TBD
            var paymentType = originalSO.getValue({
                fieldId: 'custbody3'
            });
                //turn it in to an item fulfillment
                var objFulfillment = record.transform({
                    fromType: record.Type.SALES_ORDER,
                    fromId: createdfrom,
                    toType: record.Type.ITEM_FULFILLMENT,
                    isDynamic: true,
                });
                //set ship status to shipped
                objFulfillment.setValue({
                    fieldId: 'shipstatus',
                    value: "C",
                    ignoreFieldChange: true,
                    forceSyncSourcing: true
                });
                //save the fulfillment
                var fulfillmentID = objFulfillment.save({
                    enableSourcing: true,
                    ignoreMandatoryFields: true
                });
                //turn the same sales order in to a cash sale.
                var objCashSale = record.transform({
                    fromType: record.Type.SALES_ORDER,
                    fromId: createdfrom,
                    toType: record.Type.CASH_SALE,
                    isDynamic: true,
                });
                //save the cash sale
                var cashSaleID = objCashSale.save({
                    enableSourcing: true,
                    ignoreMandatoryFields: true
                });

                //if it is TBD only redirect
            if (paymentType == "TBD") {
                
                var cashSaleURL = 'https://1204410.app.netsuite.com/app/accounting/transactions/cashsale.nl?id=' + cashSaleID + '&whence=&e=T';

                var redirect2_value = '<html><body><script language="javascript">window.location.replace("' + cashSaleURL + '");</script></body></html>';

                var field2 = context.form.addField({
                    id: 'custpage_redirect2',
                    type: serverWidget.FieldType.INLINEHTML,
                    label: 'Redirect2'
                });

                field2.defaultValue = redirect2_value;
                
            }
            //else redirect to cash sale and print form
            else {

                //https://1204410.app.netsuite.com/app/accounting/print/hotprint.nl?regular=T&sethotprinter=T&formnumber=136&trantype=cashsale&&id=49986&label=Cash+Sale&printtype=transaction

                var printURL = 'https://1204410.app.netsuite.com/app/accounting/print/hotprint.nl?regular=T&sethotprinter=T&formnumber=136&trantype=cashsale&&id=' + cashSaleID + "&label=Cash+Sale&printtype=transaction";

                var redirect_value = '<html><body><script language="javascript">window.open("' + printURL + '", "mywindow","location=1,status=1,scrollbars=1, resizable=1, directories=1, toolbar=1, titlebar=1");</script></body></html>';

                var field = context.form.addField({
                    id: 'custpage_redirect',
                    type: serverWidget.FieldType.INLINEHTML,
                    label: 'Redirect'
                });


                field.defaultValue = redirect_value;

                var cashSaleURL = 'https://1204410.app.netsuite.com/app/accounting/transactions/cashsale.nl?id=' + cashSaleID + '&whence=';

                var redirect2_value = '<html><body><script language="javascript">window.location.replace("' + cashSaleURL + '");</script></body></html>';

                var field2 = context.form.addField({
                    id: 'custpage_redirect2',
                    type: serverWidget.FieldType.INLINEHTML,
                    label: 'Redirect2'
                });


                field2.defaultValue = redirect2_value;

            }
        }

        function invoiceGen (createdfrom, context) {

            //turn it in to an item fulfillment
            var objFulfillment = record.transform({
                fromType: record.Type.SALES_ORDER,
                fromId: createdfrom,
                toType: record.Type.ITEM_FULFILLMENT,
                isDynamic: true,
            });
            //set the ship status to shipped
            objFulfillment.setValue({
                fieldId: 'shipstatus',
                value: "C",
                ignoreFieldChange: true,
                forceSyncSourcing: true
            });
            //save the fulfillment
            var fulfillmentID = objFulfillment.save({
                enableSourcing: true,
                ignoreMandatoryFields: true
            });
            //turn the sales order in to an invoice
            var objInvoice = record.transform({
                fromType: record.Type.SALES_ORDER,
                fromId: createdfrom,
                toType: record.Type.INVOICE,
                isDynamic: true,
            });
            //save the invoice
            var InvoiceID = objInvoice.save({
                enableSourcing: true,
                ignoreMandatoryFields: true
            }); 

            //redirect using inserted HTML to the new invoice

            var cashSaleURL = 'https://1204410.app.netsuite.com/app/accounting/transactions/custinvc.nl?id=' + InvoiceID + '&e=T&whence=';

            var redirect_value = '<html><body><script language="javascript">window.location.replace("' + cashSaleURL + '");</script></body></html>';

            var field = context.form.addField({
                id: 'custpage_redirect',
                type: serverWidget.FieldType.INLINEHTML,
                label: 'Redirect'
            });


            field.defaultValue = redirect_value;

        }

    });