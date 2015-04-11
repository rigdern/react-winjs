/** @jsx React.DOM */

var React = require('react/addons');
var ReactWinJS = require('react-winjs');

var suggestionList = ["Shanghai", "Istanbul", "Karachi", "Delhi", "Mumbai", "Moscow", "Seoul", "Beijing", "Jakarta",
"Tokyo", "Mexico City", "Kinshasa", "New York City", "Lagos", "London", "Lima", "Bogota", "Tehran", "Ho Chi Minh City", "Hong Kong",
"Bangkok", "Dhaka", "Cairo", "Hanoi", "Rio de Janeiro", "Lahore", "Chonquing", "Bengaluru", "Tianjin", "Baghdad", "Riyadh", "Singapore",
"Santiago", "Saint Petersburg", "Surat", "Chennai", "Kolkata", "Yangon", "Guangzhou", "Alexandria", "Shenyang", "Hyderabad", "Ahmedabad",
"Ankara", "Johannesburg", "Wuhan", "Los Angeles", "Yokohama", "Abidjan", "Busan", "Cape Town", "Durban", "Pune", "Jeddah", "Berlin",
"Pyongyang", "Kanpur", "Madrid", "Jaipur", "Nairobi", "Chicago", "Houston", "Philadelphia", "Phoenix", "San Antonio", "San Diego",
"Dallas", "San Jose", "Jacksonville", "Indianapolis", "San Francisco", "Austin", "Columbus", "Fort Worth", "Charlotte", "Detroit",
"El Paso", "Memphis", "Baltimore", "Boston", "Seattle Washington", "Nashville", "Denver", "Louisville", "Milwaukee", "Portland",
"Las Vegas", "Oklahoma City", "Albuquerque", "Tucson", "Fresno", "Sacramento", "Long Beach", "Kansas City", "Mesa", "Virginia Beach",
"Atlanta", "Colorado Springs", "Omaha", "Raleigh", "Miami", "Cleveland", "Tulsa", "Oakland", "Minneapolis", "Wichita", "Arlington",
"Bakersfield", "New Orleans", "Honolulu", "Anaheim", "Tampa", "Aurora", "Santa Ana", "St. Louis", "Pittsburgh", "Corpus Christi",
"Riverside", "Cincinnati", "Lexington", "Anchorage", "Stockton", "Toledo", "St. Paul", "Newark", "Greensboro", "Buffalo", "Plano",
"Lincoln", "Henderson", "Fort Wayne", "Jersey City", "St. Petersburg", "Chula Vista", "Norfolk", "Orlando", "Chandler", "Laredo", "Madison",
"Winston-Salem", "Lubbock", "Baton Rouge", "Durham", "Garland", "Glendale", "Reno", "Hialeah", "Chesapeake", "Scottsdale", "North Las Vegas",
"Irving", "Fremont", "Irvine", "Birmingham", "Rochester", "San Bernardino", "Spokane", "Toronto", "Montreal", "Vancouver", "Ottawa-Gatineau",
"Calgary", "Edmonton", "Quebec City", "Winnipeg", "Hamilton"];

var AutoSuggestBoxExample = React.createClass({
	handleSuggestionsRequested: function (eventObject) {
		var queryText = eventObject.detail.queryText,
	    	query = queryText.toLowerCase(),
	    	suggestionCollection = eventObject.detail.searchSuggestionCollection;

	    if (queryText.length > 0) {
	        for (var i = 0, len = suggestionList.length; i < len; i++) {
	            if (suggestionList[i].substr(0, query.length).toLowerCase() === query) {
	                suggestionCollection.appendQuerySuggestion(suggestionList[i]);
	            }
	        }
	    }
	},
	handleQuerySubmitted: function (eventObject) {
    	this.setState({ query: eventObject.detail.queryText });
	},
	getInitialState: function () {
		return {
			query: null
		};
	},
	render: function () {
		var submittedQuery = this.state.query ?
			<div>Submitted Query: {this.state.query}</div> :
			null;

		return (
			<div>
				<ReactWinJS.AutoSuggestBox
					placeholderText="Type a city"
					onSuggestionsRequested={this.handleSuggestionsRequested}
					onQuerySubmitted={this.handleQuerySubmitted} />

				{submittedQuery}
			</div>
		);
	}
});

var ContentDialogExample = React.createClass({
	handleShow: function () {
		this.refs.dialog.winControl.show().then(function (eventObject) {
			this.setState({ dialogResult: eventObject.result });
		}.bind(this));
	},
	getInitialState: function () {
		return {
			dialogResult: null
		};
	},
	render: function () {
		var dialogResult = this.state.dialogResult ?
			<div>Dialog Result: {this.state.dialogResult}</div> :
			null;

		return (
			<div>
				<button onClick={this.handleShow}>Show ContentDialog</button>
				{dialogResult}

				<ReactWinJS.ContentDialog
			  		ref="dialog"
			  		title="Urgent Message"
			  		primaryCommandText="OK"
			  		secondaryCommandText="Cancel">
				  	<div>
				    	This content will appear in the body of the ContentDialog. You can put <i>arbitrary</i> HTML in here.
				  	</div>
				</ReactWinJS.ContentDialog>
			</div>
		);
	}
});

var DatePickerExample = React.createClass({
	handleDateChange: function (eventObject) {
		var datePicker = eventObject.currentTarget.winControl;
		this.setState({ date: datePicker.current });
	},
	getInitialState: function () {
		return {
			date: new Date()
		};
	},
	render: function () {
		return (
			<div>
				<p>Date: {this.state.date.toDateString()}</p>
				<ReactWinJS.DatePicker
					current={this.state.date}
					onChange={this.handleDateChange}
					minYear={1980}
					maxYear={2050} />
			</div>
		);
	}
});

var FlipViewExample = React.createClass({
	flipViewItemRenderer: ReactWinJS.reactRenderer(function (item) {
		return (
			<div style={{height: 200}}>
				The rating of this flip view item is: {item.data.rating}
			</div>
		);
	}),
	getInitialState: function () {
		return {
			ratingsList: new WinJS.Binding.List([
				{ rating: 4 },
				{ rating: 2 }
			])
		};
	},
	render: function () {
		return (
			<ReactWinJS.FlipView
				style={{height: 200}}
			  	itemDataSource={this.state.ratingsList.dataSource}
				itemTemplate={this.flipViewItemRenderer} />
		);
	}
});

var FlyoutExample = React.createClass({
	handleShow: function (eventObject) {
		var anchor = eventObject.currentTarget;
		this.refs.flyout.winControl.show(anchor);
	},
	getInitialState: function () {
		return {
			dialogResult: null
		};
	},
	render: function () {
		var dialogResult = this.state.dialogResult ?
			<div>Dialog Result: {this.state.dialogResult}</div> :
			null;

		return (
			<div>
				<button onClick={this.handleShow}>Show Flyout</button>

				<ReactWinJS.Flyout
					ref="flyout">
				  	<div>This is the flyout content!!</div>
				</ReactWinJS.Flyout>
			</div>
		);
	}
});

var App = React.createClass({
    render: function() {
        return (
            <div className="viewport" style={{height: "100%", overflow: "auto"}}>
            	<div className="surface" style={{
            		paddingBottom: 48 + 10 // Leave room for bottom AppBar
            	}}>
	            	<h1>react-winjs Control Showcase</h1>

	            	<h3>Table of Contents</h3>
	            	<ul>
	            		<li><a href="#AppBar">AppBar</a></li>
	            		<li><a href="#AutoSuggestBox">AutoSuggestBox</a></li>
	            		<li><a href="#BackButton">BackButton</a></li>
	            		<li><a href="#ContentDialog">ContentDialog</a></li>
	            		<li><a href="#DatePicker">DatePicker</a></li>
	            		<li><a href="#FlipView">FlipView</a></li>
	            		<li><a href="#Flyout">Flyout</a></li>
	        		</ul>

	            	<div id="AppBar" className="example">
		            	<h3>AppBar</h3>
		            	TODO
		            	<ReactWinJS.AppBar>
						    <ReactWinJS.AppBar.Button key="home" icon="home" label="Home" />
						    <ReactWinJS.AppBar.Button key="save" icon="save" label="Save" />
						</ReactWinJS.AppBar>
	            	</div>

	            	<div id="AutoSuggestBox" className="example">
	    	        	<h3>AutoSuggestBox</h3>
		            	<AutoSuggestBoxExample />
	            	</div>
	            	
	            	<div id="BackButton" className="example">
		            	<h3>BackButton</h3>
		            	<ReactWinJS.BackButton />
	            	</div>

	            	<div id="ContentDialog" id="ContentDialog" className="example">
		            	<h3>ContentDialog</h3>
		            	<ContentDialogExample />
	            	</div>

	            	<div id="DatePicker" className="example">
	            		<h3>DatePicker</h3>
	            		<DatePickerExample />
            		</div>

            		<div id="FlipView" className="example">
	            		<h3>FlipView</h3>
	            		<FlipViewExample />
            		</div>

            		<div id="Flyout" className="example">
	            		<h3>Flyout</h3>
	            		<FlyoutExample />
            		</div>
            	</div>
            </div>
        );
    }
});

React.render(<App />, document.getElementById("app"));
