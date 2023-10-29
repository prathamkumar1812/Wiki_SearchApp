export const getSearchTerm = () => {
    const rawSearchTerm = document.getElementById("search").value.trim();
    const regex = /[]{2,}/gi;
    const searchTerm = rawSearchTerm.replaceAll(regex, " ");
    return searchTerm;
}
export const retrieveSearchResults = async(searchTerm) => {
    const wikiSearchTerm = getWikiSearchString(searchTerm);
    const wikiSearchResult = await requestData(wikiSearchTerm);
    let resultsArray = [];
    if (wikiSearchResult.hasOwnProperty("query")) {
        resultsArray = processWikiResults(wikiSearchResult.query.pages);
    }
    return resultsArray;
}
const getWikiSearchString = (searchTerm) => {
    const maxCharacter = getMaxChars();
    const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&
    gsrlimit=20&prop=pageimages|extracts&exchars=${maxCharacter}&exintro&explaintext&exlimit=max&format=json&origin=*`;
    const searchString = encodeURI(rawSearchString);
    return searchString;

}
const getMaxChars = () => {
    const width = window.innerWidth || document.body.clientWidth;
    let maxChar;
    if (width < 414) maxChar = 45;
    if (width >= 414 && width < 1400) maxChar = 100;

    if (width >= 1400) maxChar = 130;
    return maxChar;
}

const requestData = async(searchString) => {
    try {
        const responce = await fetch(searchString);
        const data = await responce.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}
const processWikiResults = (results) => {
    const resultArray = [];
    Object.keys(results).forEach((key) => {
        const id = key;
        const title = results[key].title;
        const text = results[key].extract;
        const img = results[key].hasOwnProperty("thumbnail") ?
            results[key].thumbnail.source :
            null;
        const item = {
            id: id,
            title: title,
            img: img,
            text: text
        };
        resultArray.push(item);
    });
    return resultArray;
}