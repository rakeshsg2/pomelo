const jsonTransformController = require('../controllers/jsonTransformController');
const githubSearchRepos = require('../controllers/githubSearchController');
const config = require('../config');
const Joi = require('joi');

// define all routes for the application
const routes = () => [{
    method: 'GET', // home page route
    path: '/',
    handler: (req, h) => { 
        return h.view('home', {
            heading: config.APP_HEADING,
            nav: config.NAV
        });
    }
}, {
    method: 'GET', // upload json route
    path: '/upload',
    handler: (req, h) => { 
        return h.view('upload');
    }
}, {
    method: 'POST', // transform json API
    path: '/formatjson',
    options: {
        tags: ['api','v1','formatjson'],
        description: 'Restructure input json into tree format',
        handler: (req, h) => {
            let output = [];
            try {
                const {jsondata} = req.payload;
                output = jsonTransformController.transformJSON(jsondata);
            } catch(err) {
                console.log('error in /format handler: ', err);
            }
            return output;
        },
        validate: { 
            payload: Joi.object({
                jsondata: Joi.required()
                            .description('json input')
            })
        }
    }
}, {
    method: 'GET', //Github search route
    path: '/search', 
    options: {
            plugins: {
                'hapi-swagger': {
                    payloadType: 'form'
                }
            },
            handler: async (req, h) => {
            let pageNo = parseInt(req.query.p) || 1;
            let q = req.query.q || "nodejs";
            let o = req.query.o || "desc";
            let s = req.query.s || "updated";

            let results = await githubSearchRepos(q, o, s, pageNo);

            return h.view('search', {
                results: results
            });
        }
    }
}]

module.exports = routes;
