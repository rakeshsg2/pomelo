const SwaggerOption = require('./swagger'),
	Inert = require('@hapi/inert'),
	Vision = require('@hapi/vision');

// plugin management
module.exports = [Inert, Vision, SwaggerOption];