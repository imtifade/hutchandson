/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */

// version 1.0
// release codename: ColdWaffles 

//define modules
define(['N/ui/dialog', 'N/currentRecord'],
    //Callback for modules
    function (dialog, currentRecord) {
        //some global variables
        var imgData;
        var imgWidth = 500;
        var imgHeight = 100;

        //Callback for when the signature button is hit
        function signatureButtonHit(context) {
            
            //Start the signature dialog
        	startSign();
        	
        }
        
        //Call back for when the clear signature button is hit(currently in the actions sub tab)
        function clearButtonHit(context){

            imgData = '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'

            var record = currentRecord.get();
            record.setValue({
                fieldId: 'custbodysigdata',
                value: imgData,
                ignoreFieldChange: true,
                forceSyncSourcing: true
            });

        }

        //Call back for page load
        function pageInit(context) {


            var objRecord = currentRecord.get();

            var imgvalue = objRecord.getValue({
                fieldId: 'custbodysigdata'
            });
            var superSaved = objRecord.getValue({
                fieldId: 'custbody_supersaved'
            });

            if (superSaved) {

                var tranID = objRecord.getValue({
                    fieldId: 'tranid'
                });

                if (tranID == "To Be Generated") {

                startSign();

                }

            }

            if (imgvalue.length <= 40){
        	
            
                imgData = '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'
               
                var record = currentRecord.get();
                record.setValue({
                    fieldId: 'custbodysigdata',
                    value: imgData,
                    ignoreFieldChange: true,
                    forceSyncSourcing: true
                });
            }
        }

        //Callback for when signature dialog is finished 
        function SignResponse(event) {
            var str = event.target.getAttribute("msgAttribute");
            var obj = JSON.parse(str);
            //Call set values to....set values
            SetValues(obj, imgWidth, imgHeight);
            //Process the response

            NLMultiButton_doAction('multibutton_submitter', 'saveprint');

        }

        //Set values with this function
        function SetValues(objResponse, imageWidth, imageHeight) {
            var obj = null;
            //checking responce data type and setting to string
            if (typeof (objResponse) === 'string') {
                obj = JSON.parse(objResponse);
            } else {
                obj = JSON.parse(JSON.stringify(objResponse));
            }
            //Checking is isSigned is true in return object and inputing in to record if it is
            if (obj.isSigned) {
                imgData = obj.imageData;

                var record = currentRecord.get();
                record.setValue({
                    fieldId: 'custbodysigdata',
                    value: imgData,
                    ignoreFieldChange: false,
                    forceSyncSourcing: true
                });

                    
            }
            //If not signed call them a dumbass
            else {

                var options = {
                    title: "Oh shit",
                    message: "Signature not captured.... Dumbass..."
                };

                dialog.confirm(options).then(success);
            }


        }
        //Call back Functions
        return {
            signatureButtonHit:signatureButtonHit,
            clearButtonHit:clearButtonHit,
        	pageInit:pageInit
        	
        };

        //Some functions

        function startSign() {
            var isInstalled = document.documentElement.getAttribute('SigPlusExtLiteExtension-installed');
            if (!isInstalled) {
                alert("SigPlusExtLite extension is either not installed or disabled. Please install or enable extension.");
                return;
            }
            //Create the return message
            var message = {
                "firstName": "", "lastName": "", "eMail": "", "location": "", "imageFormat": 1, "imageX": imgWidth,
                "imageY": imgHeight, "imageTransparency": false, "imageScaling": false, "maxUpScalePercent": 0.0,
                "rawDataFormat": "ENC", "minSigPoints": 25
            };
            //adds event listener and the event to trigger signature responce.
            top.document.addEventListener('SignResponse', SignResponse, false);
            var messageData = JSON.stringify(message);
            var element = document.createElement("MyExtensionDataElement");
            element.setAttribute("messageAttribute", messageData);
            document.documentElement.appendChild(element);
            var evt = document.createEvent("Events");
            evt.initEvent("SignStartEvent", true, false);
            element.dispatchEvent(evt);
        }

        
    });