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

            imgData = 'iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAIAAAAkfEPpAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAERSURBVHhe7dAxAQAwEAOh+jeduvhbQAJvnJMekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6Qfm77q5OGTspOFOwAAAAASUVORK5CYII='

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
            

            if (imgvalue.length <= 40){
            
                imgData = 'iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAIAAAAkfEPpAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAERSURBVHhe7dAxAQAwEAOh+jeduvhbQAJvnJMekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6QHpAekB6Qfm77q5OGTspOFOwAAAAASUVORK5CYII='
               
                var record = currentRecord.get();
                record.setValue({
                    fieldId: 'custbodysigdata',
                    value: imgData,
                    ignoreFieldChange: true,
                    forceSyncSourcing: true
                });

                var superSaved = objRecord.getValue({
                    fieldId: 'custbody_supersaved'
                });
    
                if (superSaved) {
    
                    startSign();
    
                }
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