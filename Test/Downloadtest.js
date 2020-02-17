/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 *@NModuleScope Public
 */
define(['N/runtime', 'N/sftp', 'N/record', 'N/search', 'N/file'],
    function (runtime, sftp, record, search, file) {
        function UPSload(context) {



            var myPwdGuid = "535e9680e9c64b4db81e723057c962d3";
            var myHostKey = "AAAAB3NzaC1yc2EAAAADAQABAAABgQDWergycmQOXBIpX69KCOsjzFTON9ZC5LqYKf5lDEUzuASNFtpiHNzBr8bk10pduxrn9TLj9GNFJMvuNzs/XeJYAxrFw3pqaaFrUutNHN9Yd3pweQiL0WecgICiwH+zLnzwxKhlShJsiwRu8KSpk1j7Ipo7R0Ac1NlqeM2fJ/20EZyIGSr3xPVrV5B86bXIVBcG7kL+24jEuMkgmqUk5fxqFNYvmf/2jE10pchJN5uLJxsIAT0yTIPqXcxDtBlM+0jPYa9e32NMiL2WmvmBGL/gBDJmOknzQcDCZVi1INK9clUu5lppBRnNpquHjlXnjkdoLjpmVOJKIuwRAqKcZWh2cBrsZrRr4XaX85bpNsQJ6n9ItG9WNqDiZhK8FNkBLIYxkttW/WXRnTM4V31m56TKHJQc0cnVE0ZC4Qja3Kir1mofezVPRtCHP8WGgnIv2zhqtc6LNHkinbmusfLAbJGo4jirvAroRfifCF5NqKEwGxaTmR/qQaUVYEFQ1xJnK1s=";

            // establish connection to remote FTP server

            var connection = sftp.createConnection({
                username: 'netsuite',
                passwordGuid: myPwdGuid,
                port: 58389,
                url: '23.28.217.26',
                hostKey: myHostKey
            });


            var csvFile = '';
            var resultsArray = [[]];
            var columnHeadingsArray = [];
            var colummNamesArray = [];

            try {

                csvFile = connection.download({
                    directory: 'UPSData',
                    filename: 'UPS_CSV_EXPORT.csv'
                });

                log.debug({
                    title: 'CSV Vommit',
                    details: getLine(csvFile, 'SO311691')
                });

                log.debug({
                    title: 'TranID test',
                    details: getCreatedFromTranID(44741)
                });

            }
            catch (e) {
                log.debug(e);
                return false;
            }



        }

        return {
            onRequest: UPSload
        }

        //Takes internalID and returns the Tranid for the record. (parameter must be a number)
        function getCreatedFromTranID(interenalID) {

            //Load current invoie
            var Record = record.load({
                type: record.Type.INVOICE,
                id: interenalID,
                isDynamic: true,
            });

            //Find created from ID value
            var createdFromID = Record.getValue({
                fieldId: 'createdfrom'
            });


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