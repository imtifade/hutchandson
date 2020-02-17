/**
 *@NApiVersion 2.x
 *@NScriptType ScheduledScript
 */

//V1.0
//codename: Shitlips
define(['N/runtime', 'N/sftp', 'N/search', 'N/file'],
    function (runtime, sftp, search, file) {
        function UPSsave(context) {


            try {
                // FTP Parameters

                var scriptObj = runtime.getCurrentScript();

                var fieldSeperator = scriptObj.getParameter({ name: 'custscript_fieldSeperator' }) == null ? ',' : scriptObj.getParameter({ name: 'custscript_fieldSeperator' });
                var textQualifier = scriptObj.getParameter({ name: 'custscript_textQualifier' }) == null ? "" : scriptObj.getParameter({ name: 'custscript_textQualifier' });
            }
            catch (e) {
                log.debug('Error loading FTP Parameters from Script');
                return false;
            }

            try {

                var myPwdGuid = "51ec10c18c5c4a4ba4e98bd128761e6c";
                var myHostKey = "AAAAB3NzaC1yc2EAAAADAQABAAABgQDWergycmQOXBIpX69KCOsjzFTON9ZC5LqYKf5lDEUzuASNFtpiHNzBr8bk10pduxrn9TLj9GNFJMvuNzs/XeJYAxrFw3pqaaFrUutNHN9Yd3pweQiL0WecgICiwH+zLnzwxKhlShJsiwRu8KSpk1j7Ipo7R0Ac1NlqeM2fJ/20EZyIGSr3xPVrV5B86bXIVBcG7kL+24jEuMkgmqUk5fxqFNYvmf/2jE10pchJN5uLJxsIAT0yTIPqXcxDtBlM+0jPYa9e32NMiL2WmvmBGL/gBDJmOknzQcDCZVi1INK9clUu5lppBRnNpquHjlXnjkdoLjpmVOJKIuwRAqKcZWh2cBrsZrRr4XaX85bpNsQJ6n9ItG9WNqDiZhK8FNkBLIYxkttW/WXRnTM4V31m56TKHJQc0cnVE0ZC4Qja3Kir1mofezVPRtCHP8WGgnIv2zhqtc6LNHkinbmusfLAbJGo4jirvAroRfifCF5NqKEwGxaTmR/qQaUVYEFQ1xJnK1s=";

                // establish connection to remote FTP server

                var connection = sftp.createConnection({
                    username: 'netsuite',
                    passwordGuid: myPwdGuid,
                    port: 58389,
                    url: '23.28.217.26',
                    hostKey: myHostKey
                });

                // specify the file to upload using the N/file module

                var csvFile = '';
                var resultsArray = [[]];
                var columnHeadingsArray = [];
                var colummNamesArray = [];

                var UPSsearch = search.load({
                    id: 'customsearch355'
                });

                // Run search in Paged mode to handle large results
                var pagedResults = UPSsearch.runPaged();

                // Get Row Values and add to CSV array
                pagedResults.searchDefinition.columns.forEach(function (col) { // log each column
                    columnHeadingsArray.push(addTextQualifier(col.label, textQualifier));
                    colummNamesArray.push(col.name); // Array of column names
                });

                for (var i = 0; i < columnHeadingsArray.length; i++) {
                    columnHeadingsArray[i] = columnHeadingsArray[i].replace(/ /g, "_");
                }

                columnHeadingsArray[1] = "PO";

                columnHeadingsArray[7] = "State";



                resultsArray[0] = columnHeadingsArray;
                csvFile += columnHeadingsArray.join(fieldSeperator) + '\n';

                // Get the Rows Data and add to CSV array
                pagedResults.pageRanges.forEach(function (pageRange) {
                    var myPage = pagedResults.fetch({ index: pageRange.index });
                    myPage.data.forEach(function (result) {
                        var rowDataArray = [];
                        // need to cycle through columns and get values.
                        for (var i = 0; i < colummNamesArray.length; i++) {
                            var data = (result.getText(result.columns[i]) == null) ? result.getValue(result.columns[i]) : result.getText(result.columns[i]);
                            data = addTextQualifier(data, textQualifier);
                            rowDataArray.push(data);
                        }
                        resultsArray.push(rowDataArray);
                        csvFile += rowDataArray.join(fieldSeperator) + '\n';
                    });



                    /*// download the file from the remote server
        
                    var downloadedFile = connection.download({
                        directory: 'relative/path/to/file',
                        filename: 'downloadMe.js'
                    });*/
                });
                //create the file
                var myFileToUpload = file.create({
                    name: 'upsData.csv',
                    fileType: file.Type.PLAINTEXT,
                    encoding: file.Encoding.UTF8,
                    contents: csvFile
                });

                // upload the file to the remote server

                connection.upload({
                    directory: 'UPSData',
                    filename: 'upsData.csv',
                    file: myFileToUpload,
                    replaceExisting: true
                });
            }

            catch (e) {
                log.debug('Failed to upload file');
                return false;
            }

        }
        return {
            execute: UPSsave
        }
    });

function addTextQualifier(str, qualifier) {
    str = qualifier + str + qualifier;
    return str;
}