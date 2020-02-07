/**
 *@NApiVersion 2.x
 *@NScriptType Portlet
 */
define([],
    function() {
        function render(params) {
            params.portlet.title = 'Wat';
            var content = '<td><span><img src="https://lh3.googleusercontent.com/_44LmmoK7mKGlqeN_dGupncewJaZydT8d6wvQ9GFFl08Rx_VHhX1t1FfOoEJcj20AWpImFUnS0t1ztxaJJSEsqSbXEcfsoeZnj46qEHkGY4xGqwPAHW07qRhP8eQT5qBgzF0W4wpWXR_yrS5gOgVuXJk54OXgzw7DL44oFDEkEGyJkUYalgtH_rCyn8vlyHzJJBSeh2--vrG-U_JTHWAiyfZbvKM-gdeW-Loo6h14L3ZOjkwO8uwbw_UMXPPE2s0ac3W9LfpQM5TmKkcYl1G7In2JnL9la0h5C3iRZNG1B4fpZBsfFXLUcO-cfWMygySt0P_Yp-MfOBtFgpH2kpUsvK4SZ2pBwr1AlxRuIS8VzRS2h-QX-GC6WDhUUwMhPFc1H4yEfeGnitkwHld1CEIR6_CyAhZvhxseShFJpMKdoxQY-UYnEEteFwihUXUkhWRXIYNOlj_A4yxf6pPSpJMN8zObVykHJTVGzLVwJE6qASk2b22P_-TISeLgt8jpSeBkFgfl7CIjHDN-35Ba9jYqfNBQaycbfNRBsjVCU4vu1njz_vxEooZOzX88C8ZV8HQrJhKD4nlI3aRIhDOKBEigsDoud2RlW_H5V3iQUpT1d3Z3PaBRLJfRaT3n6uyYiPOiN61VatT0sHBoTdwmYifJvbK-3VSci76MosCRbq5fd39NOrZthcLmA=w491-h492-no" alt="Smiley face"></span></td>';
            params.portlet.html = content;
        }
        return {
            render: render
        };
    });