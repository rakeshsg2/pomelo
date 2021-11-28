const package = require('../package.json');

// swagger configuation manamement
const SwaggerOption = {
	plugin: require('hapi-swagger'),
	options: {
		info: {
			title: 'API documentation',
			description: 'Documentation for Pomelo code challenge',
			version: package.version,
		},
		documentationPath: '/documentation',
		jsonEditor: true,
		tags: [{
			'name': 'formatjson',
			'description': 'Restructure input json into tree format',
		}, {
			'name': 'githubsearch',
			'description': 'Web page allowing github repository search'
		}]
	}
};

module.exports = SwaggerOption;