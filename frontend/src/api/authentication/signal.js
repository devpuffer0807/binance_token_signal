import axios from "axios";

export const testFunc = () => {
    return new Promise((resolve, reject) => {
        axios.get("https://whalehuntapp.com/api/signals/all-usdt?skip=0&take=20&requireTotalCount=true&sort=%5B%7B%22selector%22%3A%22signalTime%22%2C%22desc%22%3Atrue%7D%5D&totalSummary=%5B%7B%22selector%22%3A%22symbol%22%2C%22summaryType%22%3A%22count%22%7D%5D&_=1664976644684")
            .then((res) => {
                resolve(res);
            })
    });
}