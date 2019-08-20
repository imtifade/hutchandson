/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
define(['N/runtime', 'N/sftp', 'N/record', 'N/search', 'N/file'],
    function (runtime, sftp, record, search, file) {
        function beforeLoad(context) {

            if (context.type == 'create') {

                var shippingMethod = context.newRecord.getValue({
                    fieldId: 'shipmethod'
                });

                if (shippingMethod != "2" && shippingMethod) {

                    var csvFile = CSVGet(false);


                    var createdFrom = context.newRecord.getValue({
                        fieldId: 'createdfrom'
                    });

                    var csvLineData = getLine(csvFile, getCreatedFromTranID(createdFrom));

                    // force download if SO isn't on the current CSV
                    if (!csvLineData) {

                        var csvFile = CSVGet(true);


                        var createdFrom = context.newRecord.getValue({
                            fieldId: 'createdfrom'
                        });

                        var csvLineData = getLine(csvFile, getCreatedFromTranID(createdFrom));
                    }

                    if (csvLineData) {

                        var curRecord = context.newRecord;

                        fillForm(curRecord, csvLineData);
                    }

                    else {
                        log.error("Failed to find the information in UPS export data giving up");
                    }

                }
            }

        }

        return {
            beforeLoad: beforeLoad
        }

        //save CSV to file cabinate and replaces it if it's old

        function CSVGet(force) {

            var dateNow = new Date();

            var dayOfWeek = dateNow.getDay();

            var CSVNameDate = dayOfWeek + '.csv'

            var currentCSVSearch = search.create({
                type: 'file',
                columns: ['name'],
                filters: [{
                    name: 'folder',
                    operator: 'is',
                    values: 1250
                }],
            }).run().getRange({ start: 0, end: 1 });

            //Name of the current CSV in the cabinet
            var currentCSVName = currentCSVSearch[0].getValue({
                name: 'name'
            })

            var currentCSVID = currentCSVSearch[0].id;

            log.debug({
                title: "File we are looking for.",
                details: currentCSVName + ' ' + currentCSVID
            });

            //if the file in cabinate isn't the newest one grab it from the SFTP
            if (currentCSVName != CSVNameDate || force || !currentCSVID) {

                var myPwdGuid = "56276fd09a4c4cb6ae1ef155f65c0c0c";
                var myHostKey = "AAAAB3NzaC1yc2EAAAADAQABAAABgQDWergycmQOXBIpX69KCOsjzFTON9ZC5LqYKf5lDEUzuASNFtpiHNzBr8bk10pduxrn9TLj9GNFJMvuNzs/XeJYAxrFw3pqaaFrUutNHN9Yd3pweQiL0WecgICiwH+zLnzwxKhlShJsiwRu8KSpk1j7Ipo7R0Ac1NlqeM2fJ/20EZyIGSr3xPVrV5B86bXIVBcG7kL+24jEuMkgmqUk5fxqFNYvmf/2jE10pchJN5uLJxsIAT0yTIPqXcxDtBlM+0jPYa9e32NMiL2WmvmBGL/gBDJmOknzQcDCZVi1INK9clUu5lppBRnNpquHjlXnjkdoLjpmVOJKIuwRAqKcZWh2cBrsZrRr4XaX85bpNsQJ6n9ItG9WNqDiZhK8FNkBLIYxkttW/WXRnTM4V31m56TKHJQc0cnVE0ZC4Qja3Kir1mofezVPRtCHP8WGgnIv2zhqtc6LNHkinbmusfLAbJGo4jirvAroRfifCF5NqKEwGxaTmR/qQaUVYEFQ1xJnK1s=";

                // establish connection to remote FTP server

                var connection = sftp.createConnection({
                    username: 'netsuite',
                    passwordGuid: myPwdGuid,
                    port: 58389,
                    url: '23.28.217.26',
                    hostKey: myHostKey,
                    timeout: 20
                });

                var CSVFile = '';

                try {

                    CSVFile = connection.download({
                        directory: 'UPSData',
                        filename: 'UPS_CSV_EXPORT.csv',
                        timeout: 60
                    });

                }
                catch (e) {
                    log.error({
                        title: "error",
                        details: e
                    });
                    return false;
                }

                var csvFile = file.create({
                    name: dayOfWeek + '.csv',
                    fileType: file.Type.PLAINTEXT,
                    contents: CSVFile.getContents(),
                    description: 'UPS WorldShip Data',
                    encoding: file.Encoding.UTF8,
                    folder: 1250,
                    isOnline: true
                });

                file.delete({
                    id: currentCSVID
                });

                var csvID = csvFile.save();
            }

            else {

                //load what should be todays CSV
                var fileInCab = file.load({
                    id: "SuiteScripts/UPS/UPSImports/" + dayOfWeek + ".csv"
                });

                var csvFile = fileInCab;
            }

            return csvFile

        }

        //Takes CSV data and the current form and fill in the information.
        function fillForm(CSVData, csvCurLineData) {

            var curRecord = CSVData;

            var numLines = curRecord.getLineCount({
                sublistId: 'item'
            });

            curRecord.setValue({
                fieldId: 'trackingnumbers',
                value: csvCurLineData[1],
                ignoreFieldChange: true
            });

            curRecord.insertLine({
                sublistId: 'item',
                line: numLines,
            });

            curRecord.setSublistValue({
                sublistId: 'item',
                fieldId: 'item',
                line: numLines,
                value: 37640
            });

            curRecord.setSublistValue({
                sublistId: 'item',
                fieldId: 'quantity',
                line: numLines,
                value: 1
            });

            curRecord.setSublistValue({
                sublistId: 'item',
                fieldId: 'rate',
                line: numLines,
                value: csvCurLineData[2]
            });

            curRecord.setSublistValue({
                sublistId: 'item',
                fieldId: 'description',
                line: numLines,
                value: "SHIPPING CHARGES"
            });


        }

        //Takes internalID and returns the Tranid for the record. (parameter must be a number)
        function getCreatedFromTranID(createdFromID) {

            var Record = record.load({
                type: record.Type.SALES_ORDER,
                id: createdFromID,
                isDynamic: true,
            });

            //Find created from ID value
            var tranID = Record.getValue({
                fieldId: 'tranid'
            });

            return tranID;


        }

        //Returns the line of data in the CSV file that matches the transID in the parameter
        function getLine(csvFiledata, compareID) {
            var iterator = csvFiledata.lines.iterator();

            var dataOut = [];

            iterator.each(function (line) {
                //split each line by the column delimiter
                var lineValues = line.value.split(',');

                for (var i = 0; i < lineValues.length; i++) {
                    lineValues[i] = lineValues[i].replace(/"/g, "");
                }

                //do something with the data
                var tranID = lineValues[0];

                var trackingNum = lineValues[2];

                var shippingCost = lineValues[3];

                var lineVoid = lineValues[4];

                //if a tranID on the export data equals the transID returned with the interenalID of the created from field
                if (tranID == compareID && lineVoid != "Y") {

                    //Push data to dataOut
                    dataOut.push(tranID);
                    dataOut.push(trackingNum);
                    dataOut.push(shippingCost);

                }


                //return true to continue to the next line
                return true;
            });

            if (!Array.isArray(dataOut) || !dataOut.length) {
                log.error("Failed to find the information in UPS export data");

                return false;
            }

            return dataOut;
        }
    });


/*

//WIP Reading csv
functon readCSVFile(csvFileId) {
   var csvFile = file.load({
       id: csvFileId
   });
   var iterator = csvFile.lines.iterator();

   //Skip the first line (CSV header)
   iterator.each(function() {
       return false; //return false to only process the first line
   });

   var total = 0;

   iterator.each(function(line) {
       //split each line by the column delimiter
       var lineValues = line.value.split(',');

       //do something with the data
       var lineAmount = parseFloat(lineValues[1]);
       total += lineAmount;

       //return true to continue to the next line
       return true;
   });

   return total;
}
//loading a record
record.load({
   type: record.Type.SALES_ORDER,
   id: 157,
   isDynamic: true,
}); */