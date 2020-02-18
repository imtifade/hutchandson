/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */ 

//define modules
define(['N/currentRecord', 'N/ui/dialog'],
    //Callback for modules
    function (currentRecord, dialog) {

        //the work around for dialog windows
        var selected = false;
        //on load
        function pageInit(context) {
            //grab the current record object
            var record = currentRecord.get();
            //grab the record ID
            var transID = record.getValue({
                fieldId: 'id'
            })
            //if the transID is undefined the record has never been saved, do this
            if (!transID){
                //select a line of a sublist
                record.selectLine({
                    sublistId: 'locations',
                    line: 0
                });
                //set the preferred stock level to 0
                record.setCurrentSublistValue({
                    sublistId: 'locations',
                    fieldId: 'preferredstocklevel',
                    value: 0,
                    ignoreFieldChange: true
                });
                //set the reorder point to 0
                record.setCurrentSublistValue({
                    sublistId: 'locations',
                    fieldId: 'reorderpoint',
                    value: 0,
                    ignoreFieldChange: true
                });
                //commit the new values to record. Very important
                record.commitLine({
                    sublistId: 'locations'
                });
            }

        }
        //on save
        function itemEntryCheck(context) {

            //grab the current record
            var record = currentRecord.get();
            //if there is no perfered vendor set do this 
            if (!hasAPerferedVender (record) && !selected) {

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
                    message: "Looks like there is no perfered vender!",
                    buttons: [button1, button2]
                };

                function success(result) {
                    console.log("Success with value " + result);
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

                if (selected) {

                    return true;

                }

            } else {

                return true;

            }

        }

        return {
            saveRecord: itemEntryCheck,
            pageInit: pageInit

        };
        //function that returns true if there is a perfered vendor set and false if not
        function hasAPerferedVender(Record) {

            var numLines = Record.getLineCount({
                sublistId: 'itemvendor'
            });

            if (numLines != 0) {
                //check each line
                for (var i = 0; i <= numLines - 1; i++) {
                    //grab the perfered vendor field value
                    var perferedBool = Record.getSublistValue({
                        sublistId: 'itemvendor',
                        fieldId: 'preferredvendor',
                        line: i
                    });
                    // if one was set return true
                    if (perferedBool){
                        return true;
                    }
                }
            }
            //if non are set then return false
            return false;
        }

    });