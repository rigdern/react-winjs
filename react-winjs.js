// Notes
// - What's the most common way to distribute React components? webpack? requirejs?
// - Control options use DOM level 0 events while its property setters use DOM level 2 events.
//   This is problematic if React is using a different mechanism to initialize events than to
//   change them.
// - React appears to restore focus after componentWillReceiveProps. This is problematic for
//   overlays like Flyout that are synchronously shown and take focus in componentWillReceiveProps.
// - Rename to react-winjs to be consistent with angular-winjs
// - Event handler names are completely lowercase
// - propTypes
// - Should React be listed as a peerDependency instead of as a dependency?
// - Does this project need a webpack config file?

var React = require('react');

var ReactWinJS = {};

// Generated from https://github.com/rigdern/winjs-control-apis
var RawControlApis = {
    AppBar: [
        "closedDisplayMode",
        "commands",
        "disabled",
        "hidden",
        "layout",
        "onAfterHide",
        "onAfterShow",
        "onBeforeHide",
        "onBeforeShow",
        "placement",
        "sticky"
    ],
    AppBarCommand: [
        "disabled",
        "extraClass",
        "firstElementFocus",
        "flyout",
        "hidden",
        "icon",
        "id",
        "label",
        "lastElementFocus",
        "onclick",
        "section",
        "selected",
        "tooltip",
        "type"
    ],
    AutoSuggestBox: [
        "chooseSuggestionOnEnter",
        "disabled",
        "onQueryChanged",
        "onQuerySubmitted",
        "onResultSuggestionsChosen",
        "onSuggestionsRequested",
        "placeholderText",
        "queryText",
        "searchHistoryContext",
        "searchHistoryDisabled"
    ],
    BackButton: [
    ],
    CellSpanningLayout: [
        "groupHeaderPosition",
        "groupInfo",
        "itemInfo",
        "maximumRowsOrColumns",
        "numberOfItemsPerItemsBlock",
        "orientation"
    ],
    ContentDialog: [
        "hidden",
        "onAfterHide",
        "onAfterShow",
        "onBeforeHide",
        "onBeforeShow",
        "primaryCommandDisabled",
        "primaryCommandText",
        "secondaryCommandDisabled",
        "secondaryCommandText",
        "title"
    ],
    DatePicker: [
        "calendar",
        "current",
        "datePattern",
        "disabled",
        "maxYear",
        "minYear",
        "monthPattern",
        "onChange",
        "yearPattern"
    ],
    FlipView: [
        "currentPage",
        "itemDataSource",
        "itemSpacing",
        "itemTemplate",
        "onDataSourceCountChanged",
        "onPageCompleted",
        "onPageSelected",
        "onPageVisibilityChanged",
        "orientation"
    ],
    Flyout: [
        "alignment",
        "anchor",
        "hidden",
        "onAfterHide",
        "onAfterShow",
        "onBeforeHide",
        "onBeforeShow",
        "placement"
    ],
    GridLayout: [
        "backdropColor",
        "disableBackdrop",
        "groupHeaderPosition",
        "groupInfo",
        "horizontal",
        "itemInfo",
        "maxRows",
        "maximumRowsOrColumns",
        "numberOfItemsPerItemsBlock",
        "orientation"
    ],
    Hub: [
        "headerTemplate",
        "indexOfFirstVisible",
        "indexOfLastVisible",
        "loadingState",
        "onContentAnimating",
        "onHeaderInvoked",
        "onLoadingStateChanged",
        "orientation",
        "scrollPosition",
        "sectionOnScreen",
        "sections",
        "zoomableView"
    ],
    HubSection: [
        "header",
        "isHeaderStatic"
    ],
    ItemContainer: [
        "draggable",
        "onInvoked",
        "onSelectionChanged",
        "onSelectionChanging",
        "selected",
        "selectionDisabled",
        "swipeBehavior",
        "swipeOrientation",
        "tapBehavior"
    ],
    ListLayout: [
        "backdropColor",
        "disableBackdrop",
        "groupHeaderPosition",
        "groupInfo",
        "horizontal",
        "itemInfo",
        "numberOfItemsPerItemsBlock",
        "orientation"
    ],
    ListView: [
        "automaticallyLoadPages",
        "currentItem",
        "footer",
        "groupDataSource",
        "groupHeaderTapBehavior",
        "groupHeaderTemplate",
        "header",
        "indexOfFirstVisible",
        "indexOfLastVisible",
        "itemDataSource",
        "itemTemplate",
        "itemsDraggable",
        "itemsReorderable",
        "layout",
        "loadingBehavior",
        "loadingState",
        "maxDeferredItemCleanup",
        "onContentAnimating",
        "onGroupHeaderInvoked",
        "onItemDragBetween",
        "onItemDragChanged",
        "onItemDragDrop",
        "onItemDragEnd",
        "onItemDragEnter",
        "onItemDragLeave",
        "onItemDragStart",
        "onItemInvoked",
        "onKeyboardNavigating",
        "onLoadingStateChanged",
        "onSelectionChanged",
        "onSelectionChanging",
        "pagesToLoad",
        "pagesToLoadThreshold",
        "scrollPosition",
        "selection",
        "selectionMode",
        "swipeBehavior",
        "tapBehavior",
        "zoomableView"
    ],
    Menu: [
        "alignment",
        "anchor",
        "commands",
        "hidden",
        "onAfterHide",
        "onAfterShow",
        "onBeforeHide",
        "onBeforeShow",
        "placement"
    ],
    MenuCommand: [
        "disabled",
        "extraClass",
        "flyout",
        "hidden",
        "id",
        "label",
        "onclick",
        "selected",
        "type"
    ],
    NavBar: [
        "commands",
        "disabled",
        "hidden",
        "layout",
        "onAfterHide",
        "onAfterShow",
        "onBeforeHide",
        "onBeforeShow",
        "onChildrenProcessed",
        "placement",
        "sticky"
    ],
    NavBarCommand: [
        "icon",
        "label",
        "location",
        "splitButton",
        "splitOpened",
        "state",
        "tooltip"
    ],
    NavBarContainer: [
        "currentIndex",
        "data",
        "fixedSize",
        "layout",
        "maxRows",
        "onInvoked",
        "onSplitToggle",
        "template"
    ],
    Pivot: [
        "items",
        "locked",
        "onItemAnimationEnd",
        "onItemAnimationStart",
        "onSelectionChanged",
        "selectedIndex",
        "selectedItem",
        "title"
    ],
    PivotItem: [
        "header"
    ],
    Rating: [
        "averageRating",
        "disabled",
        "enableClear",
        "maxRating",
        "onCancel",
        "onChange",
        "onPreviewChange",
        "tooltipStrings",
        "userRating"
    ],
    SearchBox: [
        "chooseSuggestionOnEnter",
        "disabled",
        "focusOnKeyboardInput",
        "onQueryChanged",
        "onQuerySubmitted",
        "onReceivingFocusOnKeyboardInput",
        "onResultSuggestionsChosen",
        "onSuggestionsRequested",
        "placeholderText",
        "queryText",
        "searchHistoryContext",
        "searchHistoryDisabled"
    ],
    SemanticZoom: [
        "enableButton",
        "isDeclarativeControlContainer",
        "locked",
        "onZoomChanged",
        "zoomFactor",
        "zoomedOut"
    ],
    SplitView: [
        "hiddenDisplayMode",
        "onAfterHide",
        "onAfterShow",
        "onBeforeHide",
        "onBeforeShow",
        "paneHidden",
        "panePlacement",
        "shownDisplayMode"
    ],
    TimePicker: [
        "clock",
        "current",
        "disabled",
        "hourPattern",
        "minuteIncrement",
        "minutePattern",
        "onChange",
        "periodPattern"
    ],
    ToggleSwitch: [
        "checked",
        "disabled",
        "labelOff",
        "labelOn",
        "onChange",
        "title"
    ],
    Tooltip: [
        "extraClass",
        "infotip",
        "innerHTML",
        "onBeforeClose",
        "onBeforeOpen",
        "onClosed",
        "onOpened",
        "placement"
    ]
};

function isEvent(propName) {
    return propName[0] === "o" && propName[1] === "n";
}


function selectKeys(keys, obj) {
    var result = {};
    keys.forEach(function (k) {
        if (obj[k] !== undefined) {
            result[k] = obj[k];
        }
    });
    return result;
}

var ControlApis = (function processRawApis() {
    var result = {};
    Object.keys(RawControlApis).forEach(function (controlName) {
        var entry = {
            properties: [],
            events: []
        };
        RawControlApis[controlName].forEach(function (propName) {
            (isEvent(propName) ? entry.events : entry.properties).push(propName);
        });
        result[controlName] = entry;
    });
    return result;
})();

function defineControl(controlName, options) {
    options = options || {};
    var tagName = options.tagName || "div";

    ReactWinJS[controlName] = React.createClass({
        shouldComponentUpdate: function () {
            return false;
        },
        componentDidMount: function () {
            this.winControl = new WinJS.UI[controlName](
                this.getDOMNode(),
                selectKeys(ControlApis[controlName].properties, this.props)
            );
            Object.keys(selectKeys(ControlApis[controlName].events, this.props)).forEach(function (eventName) {
                this.winControl[eventName.toLowerCase()] = this.props[eventName];
            }, this);
        },
        componentWillUnmount: function () {
            this.winControl.dispose && this.winControl.dispose();
        },
        componentWillReceiveProps: function (nextProps) {
            Object.keys(selectKeys(ControlApis[controlName].properties, nextProps)).forEach(function (propName) {
                if (this.winControl[propName] !== nextProps[propName]) {
                    this.winControl[propName] = nextProps[propName];
                }
            }, this);
            Object.keys(selectKeys(ControlApis[controlName].events, nextProps)).forEach(function (eventName) {
                var lowerEventName = eventName.toLowerCase();
                if (this.winControl[lowerEventName] !== nextProps[eventName]) {
                    this.winControl[lowerEventName] = nextProps[eventName];
                }
            }, this);
        },
        render: function() {
            return React.createElement(tagName);
        }
    });
}

// TODO: AppBar
// TODO: AppBarCommand
defineControl("AutoSuggestBox");
defineControl("BackButton", { tagName: "button" });
// TODO: CellSpanningLayout
// TODO: ContentDialog
// TODO: DatePicker
// TODO: FlipView
// TODO: Flyout
// TODO: GridLayout
// TODO: Hub
// TODO: HubSection
// TODO: ItemContainer
// TODO: ListLayout
// TODO: ListView
// TODO: Menu
// TODO: MenuCommand
// TODO: NavBar
// TODO: NavBarCommand
// TODO: NavBarContainer
// TODO: Pivot
// TODO: PivotItem
// TODO: Rating
// TODO: SearchBox
// TODO: SemanticZoom
// TODO: SplitView
// TODO: TimePicker
// TODO: ToggleSwitch
// TODO: Tooltip

module.exports = ReactWinJS;