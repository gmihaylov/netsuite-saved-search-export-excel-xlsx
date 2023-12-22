/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @NAmdConfig ./requireConfig.json
 */
define([
        'N/ui/serverWidget',
        'NetSuiteSavedSearchExportExcelXLSX_SL_Config',
        'N/search',
        'N/file',
        'jszip',
        'xlsx',
        'N/log'
    ],

    (
        ui,
        CONFIG,
        search,
        file,
        JSZIP,
        XLSX,
        log
    ) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {

            if(scriptContext.request.method === 'GET') {
                const form = ui.createForm({
                    title: CONFIG.APP.NAME,
                    hideNavBar: false
                });

                form.addField({
                    id: CONFIG.SUITELET.FIELDS.SAVED_SEARCH.ID,
                    type: ui.FieldType.INTEGER,
                    label: CONFIG.SUITELET.FIELDS.SAVED_SEARCH.LABEL
                });

                form.addSubmitButton(CONFIG.SUITELET.BUTTONS.GENERATE.LABEL);

                scriptContext.response.writePage(form);
            }

            if(scriptContext.request.method === 'POST') {
                const savedSearchId =
                    scriptContext.request.parameters[CONFIG.SUITELET.FIELDS.SAVED_SEARCH.ID];

                const savedSearchResults = getSavedSearchResults(loadSearch(savedSearchId));

                let searchData = [];
                searchData.push(savedSearchResults.columns);
                searchData = searchData.concat(savedSearchResults.rows);

                let sheets = [];

                sheets.push({
                    sheetName: 'Example Sheet Name',
                    rows: searchData
                });

                const file = createExcelFile(sheets, `Saved Search ${savedSearchId} Export.xlsx`);

                scriptContext.response.writeFile(file);
            }

        }

        let createExcelFile = (sheets, fileName) => {
            let workbook = XLSX.utils.book_new();

            for (sheet in sheets) {
                workbook.SheetNames.push(sheets[sheet].sheetName);
                workbook.Sheets[sheets[sheet].sheetName] = XLSX.utils.aoa_to_sheet(sheets[sheet].rows);
            }

            let workbookOutput = XLSX.write(workbook, {
                booktype: 'xlsx',
                type: 'base64'
            });

            return file.create({
                name: fileName,
                fileType: file.Type.EXCEL,
                contents: workbookOutput
            });
        }

        const getSavedSearchResults = (savedSearch) => {
            const result = {
                rows: [],
                columns: []
            }

            savedSearch.columns.forEach(column => {
                result.columns.push(column.label);
            });

            savedSearch.rows.forEach(savedSearchResult => {
                const row = []
                savedSearch.columns.forEach(column => {
                    row.push(savedSearchResult.getValue({name: column}));
                });
                result.rows.push(row);
            });

            return result;
        }


        const loadSearch = (searchId) => {
            const savedSearch = search.load({
                id : searchId,
            });

            let result = [];
            let count = 0;
            const pageSize = 1000;
            let start = 0;

            do {
                const resultSet = savedSearch.run().getRange({
                    start : start,
                    end : start + pageSize
                });

                result = result.concat(resultSet);
                count = resultSet.length;
                start += pageSize;

            } while (count === pageSize);

            return { columns: savedSearch.columns, rows: result};
        }

        return {onRequest}

    });
