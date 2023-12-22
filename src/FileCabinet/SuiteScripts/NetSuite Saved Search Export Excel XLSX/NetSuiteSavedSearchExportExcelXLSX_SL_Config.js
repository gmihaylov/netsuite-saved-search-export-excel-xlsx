/**
 * @NApiVersion 2.1
 */
define([],

    () => {

        const PARAMETERS = {
            APP: {},
            SCRIPT_PARAMETERS: {},
            SUITELET: {
                FIELDS: {},
                BUTTONS: {}
            }
        };

        // App
        PARAMETERS.APP.NAME = 'NetSuite Saved Search Export Excel XLSX';

        // Suitelet / GET
        PARAMETERS.SUITELET.FIELDS.SAVED_SEARCH = {
            ID: 'custpage_saved_search',
            LABEL: 'Saved Search Internal ID:'
        }

        PARAMETERS.SUITELET.BUTTONS.GENERATE = {
            LABEL: 'Generate'
        }

        return PARAMETERS;

    });
