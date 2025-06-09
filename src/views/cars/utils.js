import {CAR_DATA, MANUFACTURER_DATA, COUNTRY_DATA} from "./data.js";

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

export function getChartRanges(isUsValue, data) {
    const maxFuelEfficiency = Math.max(...data.map(car => isUsValue ? car.mpg : car.litersPer100Km));
    const minFuelEfficiency = Math.min(...data.map(car => isUsValue ? car.mpg : car.litersPer100Km));
    const maxHorsepower = Math.max(...data.map(car => car.horsepower));
    const minHorsepower = Math.min(...data.map(car => car.horsepower));
    const maxWeight = Math.max(...data.map(car => isUsValue ? car.weight : car.weightEu));
    const minWeight = Math.min(...data.map(car => isUsValue ? car.weight : car.weightEu));
    return {
        yAxisTicks: calcRange(minFuelEfficiency, maxFuelEfficiency, 10),
        xAxisTicks: calcRange(minHorsepower, maxHorsepower, 10),
        zRange: calcRange(minWeight, maxWeight, 500)
    }
}

export function getValidData(view) {
    const data = {
        manufacturers: MANUFACTURER_DATA,
        countries: COUNTRY_DATA,
        cars: CAR_DATA
    }[view] || CAR_DATA;
    return data.filter((car) => {
        return (
            typeof car.litersPer100Km === 'number' &&
            typeof car.horsepower === 'number' &&
            typeof car.weightEu === 'number'
        );
    });
}

export function normalizeValue(value, max, min, size) {
    return ((value - min) / (max - min)) * size;
}

export function getColor(country) {
    return countryToColor[country];
}

export function getBubbleSize(value, range) {
    console.log(range)
    switch(true) {
        case value < range[3]:
            return 15;
        case value < range[2]:
            return 35;
        case value < range[1]:
            return 55;
        case value < range[0]:
            return 75;
        default:
            return 15;
    }
}

function calcRange(min, max, step) {
    let maxRound = Math.ceil(max / step) * step;
    const minRound = Math.floor(min / step) * step;
    const stepSize = (maxRound - minRound) / 4;
    const values = [];
    for (maxRound; maxRound >= minRound; maxRound -= stepSize) {
        values.push(Math.round(maxRound));
    }
    return values;
}

export const countryToColor = {
    USA: "bg-[#0173b2]",
    France: "bg-[#de8f05]",
    Japan: "bg-[#ffb7c5]",
    Germany: "bg-[#9467bd]",
    Sweden: "bg-[#ca9161]",
    Italy: "bg-[#8c564b]",
    UK: "bg-[#949494]",
};



