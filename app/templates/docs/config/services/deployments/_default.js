'use strict';

module.exports = function defaultDeployment() {
	return {
		name: 'default',
		examples: {
			commonFiles: {
				scripts: [<% if (props.jQuery.name !== null) { %>
					'../../deps/<%= props.jQuery.name %>/dist/<%=props.jQuery.name %>.min.js',<% } %>
					'../../deps/angular/angular.min.js',<% _.forEach(props.angularModules, function (module) { %>
          '../../deps/<%= module.name %>/<%= module.name %>.min.js',<% }); if (props.resource.name === 'angular-resource') {%>
          '../../deps/angular-resource/angular-resource.min.js',<% } %>
					'../../modules.js'
				],
				stylesheets: []
			},
			dependencyPath: '../../deps'
		},
	};
};
