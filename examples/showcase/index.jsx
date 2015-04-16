/** @jsx React.DOM */

var React = require('react/addons');
var ReactWinJS = require('react-winjs');

// title is:
//   - Displayed as the title of the sample
//   - Used as the anchor ID of the sample
//   - Used to find the path to the source code of the sample. Specifically:
//     './examples/<title>.jsx'
var examples = [
    { title: "AppBar", componenent: require('./examples/AppBar.jsx') },
    { title: "AutoSuggestBox", componenent: require('./examples/AutoSuggestBox.jsx') },
    { title: "BackButton", componenent: require('./examples/BackButton.jsx') },
    { title: "ContentDialog", componenent: require('./examples/ContentDialog.jsx') },
    { title: "DatePicker", componenent: require('./examples/DatePicker.jsx') },
    { title: "FlipView", componenent: require('./examples/FlipView.jsx') },
    { title: "Flyout", componenent: require('./examples/Flyout.jsx') },
    { title: "Hub", componenent: require('./examples/Hub.jsx') },
    { title: "ItemContainer", componenent: require('./examples/ItemContainer.jsx') },
    //{ title: "ListView", componenent: require('./examples/ListView.jsx') },
    { title: "Menu", componenent: require('./examples/Menu.jsx') }
];

var baseSourceUrl = "https://github.com/rigdern/react-winjs/tree/master/examples/" +
    "showcase/examples/";
var styles = {
    viewport: { height: "100%", overflow: "auto" },
    surface: { paddingBottom: 48 + 10 }, // Leave room for bottom AppBar
    example: { paddingBottom: 30 },
    exampleTitle: { paddingBottom: 10 },
    sourceLink: { paddingLeft: 5 }
};

var App = React.createClass({
    render: function() {
        var tableOfContents = examples.map(function (example) {
            return <li><a href={"#" + example.title}>{example.title}</a></li>;
        });

        var exampleMarkup = examples.map(function (example) {
            var sourceUrl = baseSourceUrl + example.title + ".jsx";

            return (
                <div style={styles.example} id={example.title} className="example">
                    <h3 style={styles.exampleTitle}>
                        {example.title}
                        <a
                            style={styles.sourceLink}
                            href={sourceUrl}
                            className="win-type-x-small">
                            (view source)
                        </a>
                    </h3>
                    <example.componenent />
                </div>
            );
        });

        return (
            <div className="viewport" style={styles.viewport}>
                <div className="surface" style={styles.surface}>
                    <h1>react-winjs Control Showcase</h1>

                    <h3>Table of Contents</h3>
                    <ul>{tableOfContents}</ul>

                    {exampleMarkup}
                </div>
            </div>
        );
    }
});

React.render(<App />, document.getElementById("app"));
