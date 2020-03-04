/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 *@NModuleScope Public
 */

var currentRecordModule, dialogModule, httpsModule, serverWidgetModule;

define(['N/search', 'N/record', 'n/https', "N/ui/serverWidget"], runSuitelet);

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
    //add header and summit button
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
            form = addHostKeyFields(form);
        }
        else if (selectaction == 'test2') {
            form = addDownloadFileFields(form);
        } else {

        }

    }

}


//back end functions 
function displayNegSearch() {

    var drivenNegSearch = search.load({
        id: 'customsearch326'
    });

    var drivenNegResult = drivenNegSearch.run();


}


//web UI stuff
function getFormTemplate() {
    var form = serverWidgetModule.createForm({
        title: 'Cool Tool'
    });

    var htmlHeader = form.addField({
        id: 'custpage_header',
        type: serverWidget.FieldType.INLINEHTML,
        label: ' '
 }).updateLayoutType({
        layoutType: serverWidget.FieldLayoutType.OUTSIDEABOVE
 }).updateBreakType({
        breakType: serverWidget.FieldBreakType.STARTROW
 }).defaultValue = '<td><span><img src="https://lh3.googleusercontent.com/_44LmmoK7mKGlqeN_dGupncewJaZydT8d6wvQ9GFFl08Rx_VHhX1t1FfOoEJcj20AWpImFUnS0t1ztxaJJSEsqSbXEcfsoeZnj46qEHkGY4xGqwPAHW07qRhP8eQT5qBgzF0W4wpWXR_yrS5gOgVuXJk54OXgzw7DL44oFDEkEGyJkUYalgtH_rCyn8vlyHzJJBSeh2--vrG-U_JTHWAiyfZbvKM-gdeW-Loo6h14L3ZOjkwO8uwbw_UMXPPE2s0ac3W9LfpQM5TmKkcYl1G7In2JnL9la0h5C3iRZNG1B4fpZBsfFXLUcO-c' +
    'fWMygySt0P_Yp-MfOBtFgpH2kpUsvK4SZ2pBwr1AlxRuIS8VzRS2h-QX-GC6WDhUUwMhPFc1H4yEfeGnitkwHld1CEIR6_CyAhZvhxseShFJpMKdoxQY-UYnEEteFwihUXUkhWRXIYNOlj_A4yxf6pPSpJMN8zObVykHJTVGzLVwJE6qASk2b22P_-TISeLgt8jpSeBkFgfl7CIjHDN-35Ba9jYqfNBQaycbfNRBsjVCU4vu1njz_vxEooZOzX88C8ZV8HQrJhKD4nlI3aRIhDOKBEigsDoud2RlW_H5V3iQUpT1d3Z3PaBRLJfRaT3n6uyYiPOiN61VatT0sHBoTdwmYifJvbK-3VSci76MosCRbq5fd39NOrZthcLmA=w491-h492-no" alt="Smiley face"></span></td>';

    form.addSubmitButton({
        label: 'Submit'
    });

    return form;
}

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

function negTo0(form) {

    form.addField({
        id: 'restricttoscriptids',
        type: SERVERWIDGETMODULE.FieldType.TEXT,
        label: 'Restrict To Script Ids',
    }).isMandatory = true;
    form.addField({
        id: 'restricttodomains',
        type: SERVERWIDGETMODULE.FieldType.TEXT,
        label: 'Restrict To Domains',
    }).isMandatory = true;

    return form;

}