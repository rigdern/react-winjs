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
// - Enable setting of classNames and inline styles on control roots?

var React = require('react');

var ReactWinJS = {};
ReactWinJS.React = React;

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
        if (obj.hasOwnProperty(k)) {
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
    var mounts = options.mounts || [];

    ReactWinJS[controlName] = React.createClass({
        shouldComponentUpdate: function () {
            return false;
        },
        componentDidMount: function () {
            this.winControl = new WinJS.UI[controlName](
                this.getDOMNode(),
                selectKeys(ControlApis[controlName].properties, this.props)
            );
            ControlApis[controlName].events.forEach(function (eventName) {
                if (this.props.hasOwnProperty(eventName)) {
                    this.winControl[eventName.toLowerCase()] = this.props[eventName];
                }
            }, this);
            Object.keys(mounts).forEach(function (propName) {
                var getMountPoint = mounts[propName];
                React.render(this.props[propName], getMountPoint(this.winControl));
            }, this);
        },
        componentWillUnmount: function () {
            this.winControl.dispose && this.winControl.dispose();
        },
        componentWillReceiveProps: function (nextProps) {
            ControlApis[controlName].properties.forEach(function (propName) {
                if (nextProps.hasOwnProperty(propName) && this.winControl[propName] !== nextProps[propName]) {
                    this.winControl[propName] = nextProps[propName];
                }
            }, this);
            ControlApis[controlName].events.forEach(function (eventName) {
                var lowerEventName = eventName.toLowerCase();
                if (nextProps.hasOwnProperty(eventName) && this.winControl[lowerEventName] !== nextProps[eventName]) {
                    this.winControl[lowerEventName] = nextProps[eventName];
                }
            }, this);
            Object.keys(mounts).forEach(function (propName) {
                var getMountPoint = mounts[propName];
                React.render(nextProps[propName], getMountPoint(this.winControl));
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
defineControl("ContentDialog", {
    mounts: {
        children: function (winControl) {
            return winControl.element.querySelector(".win-contentdialog-content");
        }
    }
});
defineControl("DatePicker");
// TODO: FlipView
// TODO: Flyout
// TODO: GridLayout

// TODO: Revisit all of this diffing stuff:
//   - Make it more efficient
//   - It's currently hard to understand because it makes aggressive
//     assumptions (e.g. each item has a key and each item has a winControl)
//   - Is it correct?
//   - Should we just sync an array with a binding list instead of computing
//     edits based on 2 arrays and then applying them to a binding list?
function buildIndex(array) {
    var index = {};
    array.forEach(function (item, i) {
        index[item.key] = i;
    });
    return index;
}
function indexOfKey(array, key) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].key === key) {
            return i;
        }
    }
    return -1;
}
function diffArraysByKey(old, latest) {
    old = old.slice(0);
    var oldIndex = buildIndex(old);
    var latestIndex = buildIndex(latest);
    var edits = [];

    // Handle removals
    for (i = old.length - 1; i >= 0; i--) {
        var item = old[i];
        if (!latestIndex.hasOwnProperty(item.key)) {
            edits.push({ type: "delete", index: i });
            console.log(JSON.stringify(edits[edits.length - 1]));
            old.splice(i, 1);
        }
    }

    // Handle insertions and moves
    for (i = 0; i < latest.length; i++) {
        var item = latest[i];
        if (!oldIndex.hasOwnProperty(item.key)) {
            // Insertion
            edits.push({ type: "insert", index: i, value: item });
            console.log(JSON.stringify({ type: "insert", index: i, value: item.key }));
            old.splice(i, 0, item);
        } else if (old[i].key !== item.key) {
            // Move
            //edits.push({ type: "move", from: oldIndex[item.key], to: i });
            //old.splice(oldIndex[item.key], 1);

            var fromIndex = indexOfKey(old, item.key);
            edits.push({ type: "move", from: fromIndex, to: i });
            console.log(JSON.stringify(edits[edits.length - 1]));
            old.splice(fromIndex, 1);
            old.splice(i, 0, item);
        }
    }

    return edits;
}
function applyEditsToBindingList(list, edits) {
    edits.forEach(function (edit) {
        if (edit.type === "delete") {
            list.splice(edit.index, 1);
        } else if (edit.type === "insert") {
            list.splice(edit.index, 0, edit.value.winControl);
        } else if (edit.type === "move") {
            list.move(edit.from, edit.to);
        } else {
            throw "Unsupported edit type: " + edit.type;
        }
    }, this);
}

ReactWinJS.Hub = React.createClass({
    shouldComponentUpdate: function () {
        return false;
    },
    componentDidMount: function () {
        this.winControl = new WinJS.UI.Hub(
            this.getDOMNode(),
            selectKeys(ControlApis.Hub.properties, this.props)
        );
        ControlApis.Hub.events.forEach(function (eventName) {
            if (this.props.hasOwnProperty(eventName)) {
                this.winControl[eventName.toLowerCase()] = this.props[eventName];
            }
        }, this);
        this.hubSectionRoots = [];
        this.hubSectionRootsMap = {};
        React.Children.forEach(this.props.children, function (component) {
            if (component) {
                var root = new HubSectionRoot(component);
                this.hubSectionRoots.push(root);
                this.hubSectionRootsMap[component.key] = root;
                this.winControl.sections.push(root.winControl);
            }
        }, this);
    },
    componentWillUnmount: function () {
        this.winControl.dispose && this.winControl.dispose();
    },
    componentWillReceiveProps: function (nextProps) {
        ControlApis.Hub.properties.forEach(function (propName) {
            if (nextProps.hasOwnProperty(propName) && this.winControl[propName] !== nextProps[propName]) {
                this.winControl[propName] = nextProps[propName];
            }
        }, this);
        ControlApis.Hub.events.forEach(function (eventName) {
            var lowerEventName = eventName.toLowerCase();
            if (nextProps.hasOwnProperty(eventName) && this.winControl[lowerEventName] !== nextProps[eventName]) {
                this.winControl[lowerEventName] = nextProps[eventName];
            }
        }, this);

        var newHubSectionRoots = [];
        var newHubSectionRootsMap = {};
        React.Children.forEach(nextProps.children, function (component) {
            if (component) {
                var root = this.hubSectionRootsMap[component.key];
                if (root) {
                    root.update(component);
                } else {
                    root = new HubSectionRoot(component);
                }
                newHubSectionRoots.push(root);
                newHubSectionRootsMap[component.key] = root;
            }
        }, this);

        applyEditsToBindingList(
            this.winControl.sections,
            diffArraysByKey(this.hubSectionRoots, newHubSectionRoots)
        );
        
        this.hubSectionRoots = newHubSectionRoots;
        this.hubSectionRootsMap = newHubSectionRootsMap;
    },
    render: function() {
        return React.DOM.div();
    }
});
var HubSectionRoot = function (component) {
    this.winControl = new WinJS.UI.HubSection(
        null,
        selectKeys(ControlApis.HubSection.properties, component.props)
    );
    this.key = component.key;

    component.winControl = this.winControl;
    React.render(component, this.winControl.contentElement);
};
HubSectionRoot.prototype.update = function (component) {
    var nextProps = component.props;
    ControlApis.HubSection.properties.forEach(function (propName) {
        if (nextProps.hasOwnProperty(propName) && this.winControl[propName] !== nextProps[propName]) {
            this.winControl[propName] = nextProps[propName];
        }
    }, this);

    component.winControl = this.winControl;
    React.render(component, this.winControl.contentElement);
};
ReactWinJS.HubSection = React.createClass({
    render: function() {
        return this.props.children;
    }
});

defineControl("ItemContainer", {
    mounts: {
        children: function (winControl) {
            return winControl.element.querySelector(".win-item");
        }
    }
});
// TODO: ListLayout
// TODO: ListView
// TODO: Menu
// TODO: MenuCommand
// TODO: NavBar
// TODO: NavBarCommand
// TODO: NavBarContainer
// TODO: Pivot
// TODO: PivotItem
defineControl("Rating");
defineControl("SearchBox");
// TODO: SemanticZoom
defineControl("SplitView", {
    mounts: {
        paneComponent: function (winControl) {
            return winControl.paneElement;
        },
        contentComponent: function (winControl) {
            return winControl.contentElement;
        }
    }
});
defineControl("TimePicker");
// TODO: ToggleSwitch
// TODO: Tooltip

module.exports = ReactWinJS;