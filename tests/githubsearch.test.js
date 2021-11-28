const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const githubSearchRepos = require('../controllers/githubSearchController');

const { expect } = Code;
const { it, experiment, test} = exports.lab = Lab.script();

experiment('/search testing', () => {
    let pageNo = 1;
    let q =  "nodejs";
    let o =  "desc";
    let s =  "updated";
    test('returns search results', () => {
        return githubSearchRepos(q, o, s, pageNo)
            .then((result) => {
                expect(result.items).to.be.an.array();
            });
    });
});