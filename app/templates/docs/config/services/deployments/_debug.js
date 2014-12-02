'use strict';

module.exports = function debugDeployment() {
	return {
		name: 'debug',
		examples: {
			commonFiles: {
				scripts: [<% if (props.jQuery.name !== null) { %>
					'../../deps/<%= props.jQuery.name %>/dist/<%=props.jQuery.name %>.js',<% } %>
					'../../deps/angular/angular.js',
					'../../modules.js'
				],
				stylesheets: []
			},
			dependencyPath: '../../deps'
		}
	};
}
