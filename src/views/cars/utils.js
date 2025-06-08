import {CAR_DATA} from "./data.js";

export async function fetchImage(searchQuery) {
    const serpApiKey = import.meta.env.VITE_SERP_API_KEY;
    const query = encodeURIComponent(searchQuery);
    //https://cors-anywhere.herokuapp.com/corsdemo
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const targetUrl = `https://serpapi.com/search.json?q=${query}&engine=google_images&ijn=0&api_key=${serpApiKey}`;
    const url = proxyUrl + targetUrl;

    try {
        const response = await fetch(url);
        const json = await response.json();
        return json.images_results[0].thumbnail;
    } catch (error) {
        return null;
    }
}

export function getChartRanges(isUsValue) {
    const data = getValidData();
    const maxFuelEfficiency = Math.max(...data.map(car => isUsValue ? car.mpg : car.litersPer100Km));
    const maxHorsepower = Math.max(...data.map(car => car.horsepower));
    const maxWeight = Math.max(...data.map(car => isUsValue ? car.weight : car.weightEu));
    return {
        yAxisTicks: roundRange(maxFuelEfficiency),
        xAxisTicks: roundRange(maxHorsepower),
        zRange: roundRange(maxWeight),
    }
}

export function getValidData() {
    return CAR_DATA.filter(car => typeof car.litersPer100Km === 'number' && typeof car.horsepower === 'number' && typeof car.weightEu === 'number');
}

function roundRange(value) {
    return Math.ceil(value / 50) * 50;
}
