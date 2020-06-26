import csv from "csvtojson";

export default class CSVParser {
    getDataFromCSV() {
        return fetch('data.csv').then(function (response) {
            let reader = response.body.getReader();
            let decoder = new TextDecoder('utf-8');

            return reader.read().then(function (result) {
                let data = decoder.decode(result.value);
                return csv({
                    delimiter:';'
                })
                    .fromString(data)
                    .then((jsonObj) => {
                        return jsonObj;
                    })
            });
        });
    }
}