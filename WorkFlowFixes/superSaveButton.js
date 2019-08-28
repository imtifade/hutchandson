/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */

 //Release Codename: fuck the flow
define(['N/currentRecord'],
    function (currentRecord) {
        function superSave(context) {

            var curRecord = currentRecord.get();

            curRecord.setValue({
                fieldId: 'custbody_supersaved',
                value: true,
                ignoreFieldChange: true,
                forceSyncSourcing: true
            });

            NLMultiButton_doAction('multibutton_submitter', 'submitfulfill');
            

            
            return false;

            
        }

        function pageInit (context){

            


        }

        return {
            pageInit: pageInit,
            superSave: superSave
        }


    });