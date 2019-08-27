/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */

 //Release Codename: fuck the flow
define(['N/record', 'N/redirect', "N/ui/serverWidget", 'N/search', 'N/file'],
    function (record, redirect, serverWidget,  search, file) {
        function beforeLoad(context) {

            if (context.type == 'create') {


                var entity = context.newRecord.getValue({
                    fieldId: 'entity'
                });

                var createdfrom = context.newRecord.getValue({
                    fieldId: 'createdfrom'
                });



                if (entity == 509 && !checkForBackorder(createdfrom, context.form)) {

                    var objFulfillment = record.transform({
                        fromType: record.Type.SALES_ORDER,
                        fromId: createdfrom,
                        toType: record.Type.ITEM_FULFILLMENT,
                        isDynamic: true,
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

                      var redirect_value = '<html><body><script language="javascript">window.open("' + printURL +'", "mywindow","location=1,status=1,scrollbars=1, resizable=1, directories=1, toolbar=1, titlebar=1");</script></body></html>';

                      var field = context.form.addField({
                          id : 'custpage_redirect',
                          type : serverWidget.FieldType.INLINEHTML,
                          label : 'Redirect'
                      });
              
              
                      field.defaultValue = redirect_value;

                      var cashSaleURL = 'https://1204410.app.netsuite.com/app/accounting/transactions/cashsale.nl?id='+ cashSaleID +'&whence=' ;

                      var redirect2_value = '<html><body><script language="javascript">window.location.replace("'+ cashSaleURL +'");</script></body></html>';

                      var field2 = context.form.addField({
                          id : 'custpage_redirect2',
                          type : serverWidget.FieldType.INLINEHTML,
                          label : 'Redirect2'
                      });
              
              
                      field2.defaultValue = redirect2_value;
                      
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

        function checkForBackorder(salesOrder,Form) {

            var originalSO = record.load({
                type: record.Type.SALES_ORDER, 
                id: salesOrder,
                isDynamic: true,
            });

            var numLines = originalSO.getLineCount({
                sublistId: 'item'
            });

            for (var i = 0; i < numLines; i++) {

                var sublistFieldValue = originalSO.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantitybackordered',
                    line: i
                });

                if (sublistFieldValue > 0 ){

                    var alert_value = "<html><body><script type='text/javascript'>window.alert('Items Backordered!!!')</script></body></html>";

                    var field = Form.addField({
                        id : 'custpage_alertfield',
                        type : serverWidget.FieldType.INLINEHTML,
                        label : 'Warning'
                    });
            
            
                    field.defaultValue = alert_value;

                    return true;
                }

            }
            return false;
        }

    });