export const deleteSearchResults = () => {
    const parentElement = document.getElementById("serachresults");

    let child = parentElement.lastElementChild;

    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
};


export const buildSearchResultArray = (resultArray) => {
    resultArray.forEach((result) => {
        const resultItem = createResultItem(result);
        const resultContents = document.createElement("div");
        resultContents.classList.add("resultContains");
        if (result.img) {
            const resultImg = createResultImg(result);
            resultContents.append(resultImg);
        }
        const resultText = createResultText(result);
        resultContents.append(resultText);
        resultItem.append(resultContents);
        const serachResult = document.getElementById("serachresults");
        serachResult.append(resultItem);
    })
}

const createResultItem = (result) => {

    const resultItem = document.createElement("div");
    resultItem.classList.add("resultsItem");
    const resultTitle = document.createElement("div");
    resultTitle.classList.add("resultTitle");
    const link = document.createElement("a");
    link.href = `https://en.wikipedia.org/?curid=${result.id}`;
    link.textContent = result.title;
    link.target = "_blank";
    resultTitle.append(link);
    resultItem.append(resultTitle);
    return resultItem;
}
const createResultImg = (result) => {
    const resultImage = document.createElement("div");
    resultImage.classList.add("resultImg");
    const img = document.createElement("img");
    img.src = result.img;
    img.alt = result.title;
    resultImage.append(img);
    return resultImage;
}
const createResultText = (result) => {
    const resultText = document.createElement("div");
    resultText.classList.add("resultText");
    const resultDescription = document.createElement("p");
    resultDescription.classList.add("resultDescription");
    resultDescription.textContent = result.text;
    resultText.append(resultDescription);
    return resultText;
}
export const clearStatsLine = () => {
    document.getElementById("stats").textContent = "";
};

export const setStatsLine = (numberOfResults) => {
    const statLine = document.getElementById("stats");
    if (numberOfResults) {
        statLine.textContent = `Displaying ${numberOfResults} results.`;
    } else {
        statLine.textContent = "Sorry, no results.";
    }
};