/** @jsx React.DOM */

var React = require('react/addons');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
    render: function () {
        var appBar = (
            <ReactWinJS.AppBar>
                <ReactWinJS.AppBar.Button key="home" icon="home" label="Home" />
                <ReactWinJS.AppBar.Button key="save" icon="save" label="Save" />
            </ReactWinJS.AppBar>
        );

        return (
            <div>
                <p>This AppBar renders at the bottom of the screen.</p>
                <button onClick={this.props.onToggleAppBar}>
                    {this.props.appBarShown ? "Hide" : "Show"} AppBar
                </button>
                {this.props.appBarShown ? appBar : null}
            </div>
        );
    }
});