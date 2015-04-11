/** @jsx React.DOM */

var React = require('react/addons');
var ReactWinJS = require('react-winjs');

debugger;

var App = React.createClass({
	render: function() {
		return (
			<div>
				Hello, world
			</div>
		);
	}
});

React.render(<App />, document.getElementById("app"));
