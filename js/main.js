console.log("state");

import { setSearchFocus, clearPushListener, clearSearchText, showClearTextButton } from "./serachBar.js";
import { getSearchTerm, retrieveSearchResults } from "./dataFuntion.js";
import { deleteSearchResults, buildSearchResultArray, clearStatsLine, setStatsLine } from "./searchResults.js";



document.addEventListener('readystatechange', (event) => {
    if (event.target.readyState === "complete") {
        initApp();

    }
});
const initApp = () => {
    console.log("init")

    setSearchFocus();

    const search = document.getElementById("search");
    search.addEventListener("input", showClearTextButton);
    const clear = document.getElementById("clear");
    clear.addEventListener("click", clearSearchText);
    clear.addEventListener("keydown", clearPushListener);
    const form = document.getElementById("serachbar");
    form.addEventListener("submit", submitSearch);
};
const submitSearch = (event) => {
    event.preventDefault();
    deleteSearchResults();
    processTheSearch();
    setSearchFocus();
}

const processTheSearch = async() => {
    clearStatsLine();
    const searchTerm = getSearchTerm();
    if (searchTerm == "") return;
    const resultArray = await retrieveSearchResults(searchTerm);
    if (resultArray.length) {
        buildSearchResultArray(resultArray);
    }
    setStatsLine(resultArray.length);
}