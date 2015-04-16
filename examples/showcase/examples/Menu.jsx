/** @jsx React.DOM */

var React = require('react/addons');
var ReactWinJS = require('react-winjs');

module.exports = React.createClass({
    handleShowMenu: function (eventObject) {
        var anchor = eventObject.currentTarget;
        this.refs.menu.winControl.show(anchor);
    },
    handleUpdateResult: function (result) {
        this.setState({ result: result });
    },
    handleToggleMe: function (eventObject) {
        var toggleCommand = eventObject.currentTarget.winControl;
        this.setState({ toggleSelected: toggleCommand.selected });
    },
    getInitialState: function () {
        return {
            result: null,
            toggleSelected: true
        };
    },
    render: function () {
        var resultComponent = this.state.result ?
            <div>Clicked: "{this.state.result}"</div> :
            null;
        var subMenu = (
            <ReactWinJS.Menu>
                <ReactWinJS.Menu.Button
                    key="commandA"
                    label="Or Choose Me"
                    onClick={this.handleUpdateResult.bind(null, "Or Choose Me")} />
            </ReactWinJS.Menu>
        );

        return (
            <div>
                <button onClick={this.handleShowMenu}>Show Menu</button>
                {resultComponent}
                
                <ReactWinJS.Menu ref="menu">

                    <ReactWinJS.Menu.Button
                        key="chooseMe"
                        label="Choose Me"
                        onClick={this.handleUpdateResult.bind(null, "Choose Me")} />

                    <ReactWinJS.Menu.Toggle
                        key="toggleMe"
                        label={"Toggle Me (selected: " + this.state.toggleSelected.toString() + ")"}
                        selected={this.state.toggleSelected}
                        onClick={this.handleToggleMe} />

                    <ReactWinJS.Menu.Separator key="separator" />

                    <ReactWinJS.Menu.FlyoutCommand
                        key="more"
                        label="More"
                        flyoutComponent={subMenu} />

                </ReactWinJS.Menu>
            </div>
        );
    }
});