import csv from "csvtojson";

export default class CSVParser {
    async getDataFromCSV() {
        let response = await fetch('data.csv');
        let text = await response.text();
        let result = await csv({ delimiter: ';' }).fromString(text);
        return result;
    }
}