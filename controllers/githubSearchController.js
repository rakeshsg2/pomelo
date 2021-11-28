const config = require("../config");
const Axios = require('axios');

// async function which makes call to github API and returns the JSON response
const githubSearchRepos = async (q, o, s, pageNo) => {
    return await Axios({
        method: 'get',
        url: `${config.GITHUB_SEARCH_URL}/${config.GITHUB_SEARCH_TYPE[0]}?o=${o}&q=${q}&s=${s}&per_page=${config.PERPAGE}&page=${pageNo}`,
        headers: {
            'Authorization': config.GITHUB_TOKEN,
            'Content-Type': 'application/vnd.github.v3+json'
        },
    })
    .then((res) => {
        let data = res.data;

        // Enrich the data object to hold other keys required for displaying repository inform, pagination etc on the page.
        data.q = q;
        data.o = o;
        data.s = s;
        data.currentPageNo = pageNo;
        data.totalCount = data.total_count;
        data.totalPages = parseInt(data.totalCount/config.PERPAGE); // calculate total pages for pagination purpose

        // calculate previous page numbers for pagination
        data.previousPage = (pageNo > 1) ? pageNo-1 : 1;
        data.previousPage1 = (pageNo > 1) ? pageNo-1 : null;
        data.previousPage2 = (pageNo > 2) ? pageNo-2 : null;
        data.previousPage3 = (pageNo > 3) ? pageNo-3 : null;
        data.previousPage4 = (pageNo > 4) ? pageNo-4 : null;

        // calculate next page numbers for pagination
        data.nextPage = (data.totalPages > 1 && pageNo<data.totalPages) ? pageNo+1 : null;
        data.nextPage1 = (data.totalPages > 2 && pageNo<data.totalPages &&  pageNo+1 <= config.MAX_PAGES) ? pageNo+1 : null;
        data.nextPage2 = (data.totalPages > 2 && pageNo<data.totalPages &&  pageNo+2 <= config.MAX_PAGES) ? pageNo+2 : null;
        data.nextPage3 = (data.totalPages > 3 && pageNo<data.totalPages &&  pageNo+3 <= config.MAX_PAGES) ? pageNo+3 : null;
        data.nextPage4 = (data.totalPages > 4 && pageNo<data.totalPages &&  pageNo+4 <= config.MAX_PAGES) ? pageNo+4 : null;

        data.lastPage = (data.totalPages > config.MAX_PAGES) ? config.MAX_PAGES : data.totalPages;  

        // Flag used in view to disbale/enable next/privous links
        data.lastPageDisabled = (pageNo === data.lastPage) ? true : false;
        data.previousPageDisabled = (pageNo === 1) ? true : false;
        
        return data;
    })
    .catch((err) => {
        console.log(`error while fetching data ${err}`);
        return `Error occured!`;
    })
}

module.exports = githubSearchRepos;