/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */

//Release Codename: fuck the flow
define(['N/record', 'N/redirect', "N/ui/serverWidget", 'N/search', 'N/file'],
    function (record, redirect, serverWidget, search, file) {
        function beforeLoad(context) {

            if (context.type == 'create') {

                var superSaved = context.newRecord.getValue({
                    fieldId: 'custbody_supersaved'
                });

                if (superSaved) {

                    var createdfrom = context.newRecord.getValue({
                        fieldId: 'createdfrom'
                    });

                    var originalSO = record.load({
                        type: record.Type.SALES_ORDER,
                        id: createdfrom,
                        isDynamic: true,
                    });

                    terms = originalSO.getValue({
                        fieldId: 'terms'           // defines the customer entity
                    });

                    if (!terms || terms == 4) {

                        var objFulfillment = record.transform({
                            fromType: record.Type.SALES_ORDER,
                            fromId: createdfrom,
                            toType: record.Type.ITEM_FULFILLMENT,
                            isDynamic: true,
                        });
                      
                        objFulfillment.setValue({
                            fieldId: 'shipstatus',
                            value: "C",
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        var fulfillmentID = objFulfillment.save({
                            enableSourcing: true,
                            ignoreMandatoryFields: true
                        });

                        var objCashSale = record.transform({
                            fromType: record.Type.SALES_ORDER,
                            fromId: createdfrom,
                            toType: record.Type.CASH_SALE,
                            isDynamic: true,
                        });

                        var cashSaleID = objCashSale.save({
                            enableSourcing: true,
                            ignoreMandatoryFields: true
                        });

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

                    else {

                        var objFulfillment = record.transform({
                            fromType: record.Type.SALES_ORDER,
                            fromId: createdfrom,
                            toType: record.Type.ITEM_FULFILLMENT,
                            isDynamic: true,
                        });
                      
                      objFulfillment.setValue({
                            fieldId: 'shipstatus',
                            value: "C",
                            ignoreFieldChange: true,
                            forceSyncSourcing: true
                        });

                        var fulfillmentID = objFulfillment.save({
                            enableSourcing: true,
                            ignoreMandatoryFields: true
                        });

                        var objInvoice = record.transform({
                            fromType: record.Type.SALES_ORDER,
                            fromId: createdfrom,
                            toType: record.Type.INVOICE,
                            isDynamic: true,
                        });

                        var InvoiceID = objInvoice.save({
                            enableSourcing: true,
                            ignoreMandatoryFields: true
                        });

                        var cashSaleURL = 'https://1204410.app.netsuite.com/app/accounting/transactions/custinvc.nl?id=' + InvoiceID + '&e=T&whence=';

                        var redirect_value = '<html><body><script language="javascript">window.location.replace("' + cashSaleURL + '");</script></body></html>';

                        var field = context.form.addField({
                            id: 'custpage_redirect',
                            type: serverWidget.FieldType.INLINEHTML,
                            label: 'Redirect'
                        });


                        field.defaultValue = redirect_value;

                    }

                    //redirect.toRecord({
                    //    type: record.Type.CASH_SALE,
                    //    id: cashSaleID
                    //});


                }

            }
        }

        return {
            beforeLoad: beforeLoad
        }

    });