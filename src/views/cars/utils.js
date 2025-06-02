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

