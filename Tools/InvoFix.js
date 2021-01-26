/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 *@NModuleScope Public
 */

var currentRecordModule, dialogModule, httpsModule, serverWidgetModule;

define(["N/search", "N/record", "N/https", "N/ui/serverWidget"], runSuitelet);

function runSuitelet(search, record, https, serverwidget) {
    recordModule = record;
    searchModule = search;
    httpsModule = https;
    serverWidgetModule = serverwidget;

    var returnObj = {};
    returnObj.onRequest = webUI;
    return returnObj;
}
//Main funtion
function webUI(context) {

    //GET or POST
    var method = context.request.method;
    //add header and summit button. Stuff that stays on the page.
    var form = getFormTemplate(method);

    if (method == 'GET') {
        form = addSelectorFields(form);
    }

    if (method == 'POST') {

        var selectaction = context.request.parameters.selectaction;
        if (selectaction == 'NegTo0') {
            form = negTo0(form);

        }
        else if (selectaction == 'test1') {
            form = test1GUI(form);
        }
        else if (selectaction == 'test2') {
            form = test2GUI(form);
        } else {

        }

    }

    context.response.writePage(form);
    return;

}


//back end functions 
function displayNegSearch() {

    var drivenNegSearch = search.load({
        id: 'customsearch326'
    });

    var drivenNegResult = drivenNegSearch.run();


}


//web UI stuff
/*************************/

function getFormTemplate() {


    var form = serverWidgetModule.createForm({
        title: 'Cool Tool'
    });
    form.addSubmitButton({
        label: 'Submit'
    });

    return form;
}

//choosing which tool
function addSelectorFields(form) {
    var select = form.addField({
        id: 'selectaction',
        type: serverWidgetModule.FieldType.SELECT,
        label: 'Select Action'
    });
    select.addSelectOption({
        value: 'NegTo0',
        text: 'All Negitive to 0',
    });
    select.addSelectOption({
        value: 'test1',
        text: 'test1'
    });
    select.addSelectOption({
        value: 'test2',
        text: 'test2'
    });
    return form;
}

//page that confirms the search results and lets you set all items driven negitive to 0
function negTo0(form) {


    var resultsSublist = form.addSublist({
        id: 'negitems',
        type: serverWidgetModule.SublistType.EDITOR,
        label: 'Items driven negitive'
    });

    resultsSublist.addField({
        id: 'itemnum',
        type: serverWidgetModule.FieldType.TEXT,
        label: 'Item Number'
    });

    resultsSublist.addField({
        id: 'onhand',
        type: serverWidgetModule.FieldType.TEXT,
        label: 'Amount on Hand'
    });

    resultsSublist.addField({
        id: 'checked',
        type: serverWidgetModule.FieldType.SELECT,
        label: 'Set to 0'
    });

    resultsSublist.addMarkAllButtons();

    resultsSublist.setSublistValue({
        id : 'itemnum',
        line : 1,
        value : "test"
    });

    resultsSublist.setSublistValue({
        id : 'onhand',
        line : 1,
        value : "-1"
    });

    resultsSublist.setSublistValue({
        id : 'itemnum',
        line : 2,
        value : "test2"
    });

    resultsSublist.setSublistValue({
        id : 'onhand',
        line : 2,
        value : "-10"
    });
    
    return form;

}

function test2GUI(form) {

    form.addField({
        id: 'restricttoscriptids',
        type: serverWidgetModule.FieldType.TEXT,
        label: 'HIHI 2',
    }).isMandatory = true;
    form.addField({
        id: 'restricttodomains',
        type: serverWidgetModule.FieldType.TEXT,
        label: 'Restrict To Domains',
    }).isMandatory = true;

    return form;

}

function test1GUI(form) {

    form.addField({
        id: 'restricttoscriptids',
        type: serverWidgetModule.FieldType.TEXT,
        label: 'Restrict To Script Ids',
    }).isMandatory = true;
    form.addField({
        id: 'restricttodomains',
        type: serverWidgetModule.FieldType.TEXT,
        label: 'HIHI1',
    }).isMandatory = true;

    return form;

}