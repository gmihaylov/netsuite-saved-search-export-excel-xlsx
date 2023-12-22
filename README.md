# NetSuite Saved Search Export in Excel (XLSX)
Proof of concept Suitelet that exports Saved Search rows to Excel (XLSX file format) using xlsx.js library

## Script flow
- Rows & Column data is taken from saved search
- Array of sheets is created, each sheet has feed array (see Example feed array)

## Options / Features
- Saved search column labels are used for sheet headers
- xlsx.js & jszip libraries are used for excel file generation
- Concept can be used in Scheduled / MAP Reduce Scripts

## Performance
- Tested up to ~50k rows (5 columns)

## Example feed array (array of arrays):
```javascript
[["Name","Document Number"],["1221","1"],["267","1"],["998","1"],["1249","1"],["83","1"],["472","1"],["842","1"],["1149","1"],["824","1"],["748","1"],["907","1"],["631","1"],["92","1"],["1044","1"],["823","1"],["630","1"],["1508","1"],["1049","1"],["1036","1"],["562","1"],["512","1"],["1670","2"],["1668","2"],["-5","2"]]
```

## Screenshots
![App Screenshot](src/FileCabinet/SuiteScripts/NetSuite%20Saved%20Search%20Export%20Excel%20XLSX/screenshots/screenshot3.png)
![App Screenshot](src/FileCabinet/SuiteScripts/NetSuite%20Saved%20Search%20Export%20Excel%20XLSX/screenshots/screenshot2.png)
![App Screenshot](src/FileCabinet/SuiteScripts/NetSuite%20Saved%20Search%20Export%20Excel%20XLSX/screenshots/screenshot1.png)
