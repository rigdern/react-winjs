/** @jsx React.DOM */
//var React = require('react');
var ReactWinJS = require('react-winjs');
var React = ReactWinJS.React;

var suggestionList = ["Shanghai", "Istanbul", "Karachi", "Delhi", "Mumbai", "Moscow", "S?o Paulo", "Seoul", "Beijing", "Jakarta",
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

var App = React.createClass({
	getInitialState: function () {
		return {
			splitViewHidden: true,
			dialogResult: "",
			itemContainerSelected: false,
			userRating: undefined,
			hubCounter: 0,
			showSectionTwo: false,
			mode: "hub"
		}
	},
	handleTogglePane: function () {
		var splitView = this.refs.splitView.winControl;
		splitView.paneHidden = !splitView.paneHidden;
	},
	handleSplitViewShown: function () {
		this.setState({ splitViewHidden: false });
	},
	handleSplitViewHidden: function () {
		this.setState({ splitViewHidden: true });
	},
	handleQuerySubmitted: function (ev) {
		console.log("query submitted: " + ev.detail.queryText);
	},
	handleSuggestionsRequested: function (eventObject) {
	    var queryText = eventObject.detail.queryText,
	        query = queryText.toLowerCase(),
	        suggestionCollection = eventObject.detail.searchSuggestionCollection;
	    if (queryText.length > 0) {
	        suggestionCollection.appendSearchSeparator("Recommendations");
	        suggestionCollection.appendResultSuggestion("Mint", "Minty Mint", null, WinJS.UI.SearchBox.createResultSuggestionImage("http://try.buildwinjs.com/images/fruits/60Mint.png"), "");
	        suggestionCollection.appendResultSuggestion("Strawberry", "Fresh Strawberry", null, WinJS.UI.SearchBox.createResultSuggestionImage("http://try.buildwinjs.com/images/fruits/60Strawberry.png"), "");
	        suggestionCollection.appendSearchSeparator("Search");
	        for (var i = 0, len = suggestionList.length; i < len; i++) {
	            if (suggestionList[i].substr(0, query.length).toLowerCase() === query) {
	                suggestionCollection.appendQuerySuggestion(suggestionList[i]);
	            }
	        }
	    }
	},
	handleItemContainerInvoked: function () {
		this.setState({ itemContainerSelected: !this.state.itemContainerSelected });
	},
	handleShowDialog: function () {
		this.refs.dialog.winControl.show().then(function (ev) {
			this.setState({ dialogResult: ev.result });
		}.bind(this));
	},
	handleRatingChange: function (ev) {
		this.setState({ userRating: ev.detail.tentativeRating });
	},
	handleDecreaseRating: function () {
		this.setState({ userRating: this.state.userRating - 1 });
	},
	handleIncreaseRating: function () {
		this.setState({ userRating: this.state.userRating + 1 });
	},
	handleIncreaseHubCounter: function () {
		this.setState({ hubCounter: this.state.hubCounter + 1 });
	},
	handleToggleSection: function () {
		this.setState({ showSectionTwo: !this.state.showSectionTwo });
	},
	handleSwitchMode: function () {
		this.setState({ mode: this.state.mode === "hub" ? "kitchenSink" : "hub" });
	},
	render: function () {
		var pane = (
			<div>
				Pane<br />
				Hidden?<br />
				{this.state.splitViewHidden.toString()}<br />
				<button onClick={this.handleTogglePane}>Toggle Pane</button>
			</div>
		);
		var content = (
			<div>
				<ReactWinJS.BackButton />
				<br />

				<button onClick={this.handleSwitchMode}>Switch Mode</button><br />
				<button onClick={this.handleTogglePane}>Toggle Pane</button>
				<button onClick={this.handleShowDialog}>Show Dialog</button>
				<br />
				Dialog result: '{this.state.dialogResult}'
				<br />

				<ReactWinJS.AutoSuggestBox
					onQuerySubmitted={this.handleQuerySubmitted}
	    			onSuggestionsRequested={this.handleSuggestionsRequested}
					placeholderText="Get a suggestion" />

				<ReactWinJS.SearchBox
					onQuerySubmitted={this.handleQuerySubmitted}
	    			onSuggestionsRequested={this.handleSuggestionsRequested}
					placeholderText="Perform a search" />

				<ReactWinJS.DatePicker
					current={new Date(1990, 8, 1, 0, 0, 0, 0)}
					minYear={1988}
					maxYear={2016} />
				<br />

				<ReactWinJS.TimePicker
					current={new Date(1990, 8, 1, 12, 34, 0, 0)}
					minuteIncrement={2} />
				<br />

				<ReactWinJS.Rating
					averageRating={2.4}
					maxRating={7}
					userRating={this.state.userRating}
					onChange={this.handleRatingChange} />
				<button onClick={this.handleDecreaseRating} style={{minWidth: 0}}>-</button>
				{this.state.userRating}
				<button onClick={this.handleIncreaseRating} style={{minWidth: 0}}>+</button>
				<br />

				<ReactWinJS.ItemContainer
					selected={this.state.itemContainerSelected}
					onInvoked={this.handleItemContainerInvoked}>
					<div>
						Hello<br />
						Selected?: {this.state.itemContainerSelected.toString()}
					</div>
				</ReactWinJS.ItemContainer>
			</div>
		);

		var kitchenSink = (
			<div>
				<ReactWinJS.SplitView
					ref="splitView"
					paneComponent={pane}
					contentComponent={content}
					onAfterHide={this.handleSplitViewHidden}
					onAfterShow={this.handleSplitViewShown} />

				<ReactWinJS.ContentDialog
					ref="dialog"
					title="A title"
					primaryCommandText="OK"
					secondaryCommandText="Cancel">
					<div>Hello, world!</div>
				</ReactWinJS.ContentDialog>
			</div>
		);

		var hub = (
			<ReactWinJS.Hub>
				<ReactWinJS.HubSection
					key="one"
					header="Section One"
					isHeaderStatic={true}>
					<div>
						<button onClick={this.handleSwitchMode}>Switch Mode</button><br />
						Hello Hello Hello Hello Hello Hello<br />
						<button onClick={this.handleIncreaseHubCounter}>{this.state.hubCounter}</button>
					</div>
				</ReactWinJS.HubSection>
				{this.state.showSectionTwo ?
					<ReactWinJS.HubSection
						key="two"
						header="Section Two"
						isHeaderStatic={true}>
						<div>
							I am Section Two
							<button onClick={this.handleToggleSection}>Toggle Section</button>
						</div>
					</ReactWinJS.HubSection> :
					null}
				<ReactWinJS.HubSection
					key="three"
					header="Section Three"
					isHeaderStatic={true}>
					<div>
						I am Section Three
						<button onClick={this.handleToggleSection}>Toggle Section</button>
					</div>
				</ReactWinJS.HubSection>
			</ReactWinJS.Hub>
		);

		return this.state.mode === "hub" ? hub : kitchenSink;
	}
});

React.renderComponent(<App />, document.getElementById("app"));
