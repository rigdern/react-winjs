/** @jsx React.DOM */

var React = require('react/addons');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                TODO
                <ReactWinJS.AppBar>
                    <ReactWinJS.AppBar.Button key="home" icon="home" label="Home" />
                    <ReactWinJS.AppBar.Button key="save" icon="save" label="Save" />
                </ReactWinJS.AppBar>
            </div>
        );
    }
});