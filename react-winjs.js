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
// - Instead of diffing nextProps and current winControl value, should
//   we diff nextProps and this.props when deciding whether or not to
//   set the value on winControl? This would benefit FlipView.itemTemplate because currently
//   getting FlipView.itemTemplate does not necessarily give you the value you wrote to it.
// - What if we modeled dismissables like this? Instead of the app having to call hide/show,
//   the app could render a special element for all dismissables (e.g. Dismissables) and when
//   a dismissable is rendered into there, it will be shown. When it is no longer rendered
//   in there, it will be hidden and removed from the DOM when its hide animation completes.
//   This only makes sense for things that hide/show not for things that close/open because
//   the latter need to be rendered even they're closed. Example:
//     <Dismissables>
//       <Flyout key="myFlyout">
//         This is a Flyout!
//       </Flyout>
//       <ContentDialog key="myDialog">
//         This is a ContentDialog!
//       </ContentDialog>
//     </Dismissables>

var React = require('react');

var ReactWinJS = {};

// Generated from https://github.com/rigdern/winjs-control-apis
var RawControlApis = {
    AppBar: [
        "closedDisplayMode",
        "commands",
        "disabled",
        "element",
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
        "element",
        "extraClass",
        "firstElementFocus",
        "flyout",
        "hidden",
        "icon",
        "id",
        "label",
        "lastElementFocus",
        "onClick",
        "section",
        "selected",
        "tooltip",
        "type"
    ],
    AutoSuggestBox: [
        "chooseSuggestionOnEnter",
        "disabled",
        "element",
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
        "element"
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
        "element",
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
        "element",
        "maxYear",
        "minYear",
        "monthPattern",
        "onChange",
        "yearPattern"
    ],
    FlipView: [
        "currentPage",
        "element",
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
        "element",
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
        "element",
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
        "contentElement",
        "element",
        "header",
        "isHeaderStatic"
    ],
    ItemContainer: [
        "draggable",
        "element",
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
        "element",
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
        "element",
        "hidden",
        "onAfterHide",
        "onAfterShow",
        "onBeforeHide",
        "onBeforeShow",
        "placement"
    ],
    MenuCommand: [
        "disabled",
        "element",
        "extraClass",
        "flyout",
        "hidden",
        "id",
        "label",
        "onClick",
        "selected",
        "type"
    ],
    NavBar: [
        "commands",
        "disabled",
        "element",
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
        "element",
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
        "element",
        "fixedSize",
        "layout",
        "maxRows",
        "onInvoked",
        "onSplitToggle",
        "template"
    ],
    Pivot: [
        "element",
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
        "contentElement",
        "element",
        "header"
    ],
    Rating: [
        "averageRating",
        "disabled",
        "element",
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
        "element",
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
        "element",
        "enableButton",
        "isDeclarativeControlContainer",
        "locked",
        "onZoomChanged",
        "zoomFactor",
        "zoomedOut"
    ],
    SplitView: [
        "contentElement",
        "element",
        "hiddenDisplayMode",
        "onAfterHide",
        "onAfterShow",
        "onBeforeHide",
        "onBeforeShow",
        "paneElement",
        "paneHidden",
        "panePlacement",
        "shownDisplayMode"
    ],
    TimePicker: [
        "clock",
        "current",
        "disabled",
        "element",
        "hourPattern",
        "minuteIncrement",
        "minutePattern",
        "onChange",
        "periodPattern"
    ],
    ToggleSwitch: [
        "checked",
        "disabled",
        "element",
        "labelOff",
        "labelOn",
        "onChange",
        "title"
    ],
    Tooltip: [
        "contentElement",
        "element",
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

function merge(a, b) {
    var result = {};
    for (k in a) { result[k] = a[k]; }
    for (k in b) { result[k] = b[k]; }
    return result;
}

function endsWith(s, suffix) {
    return s.length >= suffix.length && s.substr(-suffix.length) === suffix;
}

function keepProperty(propertyName) {
    return !endsWith(propertyName.toLowerCase(), "element");
}

var ControlApis = (function processRawApis() {
    var result = {};
    Object.keys(RawControlApis).forEach(function (controlName) {
        var entry = {
            properties: [],
            events: []
        };
        RawControlApis[controlName].forEach(function (propName) {
            if (isEvent(propName)) {
                entry.events.push(propName);
            } else if (keepProperty(propName)) {
                entry.properties.push(propName);
            }
        });
        result[controlName] = entry;
    });
    return result;
})();

function defineControl(controlName, options) {
    options = options || {};
    var tagName = options.tagName || "div";
    var mounts = options.mounts || {};
    var render = options.render || function () {
        return React.createElement(tagName);
    };

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
                React.render(this.props[propName], getMountPoint(this));
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
                React.render(nextProps[propName], getMountPoint(this));
            }, this);
        },
        render: function() {
            return render();
        }
    });
}

// TODO: AppBar
// TODO: AppBarCommand
defineControl("AutoSuggestBox");
defineControl("BackButton", { tagName: "button" });
// CellSpanningLayout: Not a component so just use off of WinJS.UI?
defineControl("ContentDialog", {
    mounts: {
        children: function (component) {
            return component.winControl.element.querySelector(".win-contentdialog-content");
        }
    }
});
defineControl("DatePicker");
defineControl("FlipView");
defineControl("Flyout", {
    // The WinJS Flyout control doesn't come with a good mount point.
    // App content and control content are siblings in Flyout.element.
    // Consequently, if React rendered to Flyout.element, it would destroy
    // some of Flyout's elements. To fix this, we give Flyout a div (ref="content")
    // which will contain only app content. The React component renders into this
    // div so it doesn't destroy any control content.
    render: function () {
        return React.DOM.div(null, React.DOM.div({ ref: "content"}));
    },
    mounts: {
        children: function (component) {
            return component.refs.content.getDOMNode();
        }
    }
});
// GridLayout: Not a component so just use off of WinJS.UI?

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
        children: function (component) {
            return component.winControl.element.querySelector(".win-item");
        }
    }
});
// ListLayout: Not a component so just use off of WinJS.UI?
defineControl("ListView");
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
        paneComponent: function (component) {
            return component.winControl.paneElement;
        },
        contentComponent: function (component) {
            return component.winControl.contentElement;
        }
    }
});
defineControl("TimePicker");
defineControl("ToggleSwitch");
/*defineControl("Tooltip", {
    mounts: {
        children: function (component) {
            return component.winControl.element;
        }
    }
});*/
// TODO: Refactor. Instead of "mounts", perhaps defineControl needs a way
// to specify arbitrary functions for handling props. A "mount" would be 1
// way to handle a prop. How can Tooltip component intialize contentElement?
// Should defineControl have an init/componentDidMount hook?
ReactWinJS.Tooltip = React.createClass({
    shouldComponentUpdate: function () {
        return false;
    },
    componentDidMount: function () {
        this.winControl = new WinJS.UI.Tooltip(
            this.getDOMNode(),
            selectKeys(ControlApis.Tooltip.properties, this.props)
        );
        ControlApis.Tooltip.events.forEach(function (eventName) {
            if (this.props.hasOwnProperty(eventName)) {
                this.winControl[eventName.toLowerCase()] = this.props[eventName];
            }
        }, this);
        React.render(this.props.children, this.winControl.element);
        var contentElement = document.createElement("div");
        React.render(this.props.contentComponent, contentElement);
        this.winControl.contentElement = contentElement;
    },
    componentWillUnmount: function () {
        this.winControl.dispose && this.winControl.dispose();
    },
    componentWillReceiveProps: function (nextProps) {
        ControlApis.Tooltip.properties.forEach(function (propName) {
            if (nextProps.hasOwnProperty(propName) && this.winControl[propName] !== nextProps[propName]) {
                this.winControl[propName] = nextProps[propName];
            }
        }, this);
        ControlApis.Tooltip.events.forEach(function (eventName) {
            var lowerEventName = eventName.toLowerCase();
            if (nextProps.hasOwnProperty(eventName) && this.winControl[lowerEventName] !== nextProps[eventName]) {
                this.winControl[lowerEventName] = nextProps[eventName];
            }
        }, this);
        React.render(nextProps.children, this.winControl.element);
        React.render(nextProps.contentComponent, this.winControl.contentElement);
    },
    render: function() {
        return React.DOM.div();
    }
});

// Given a function that returns a React component,
// returns an item renderer function that can be used
// with WinJS controls. Useful for describing FlipView
// and ListView item templates as React components.
ReactWinJS.reactRenderer = function reactRenderer(componentFunction) {
    return function itemRenderer(itemPromise) {
        return itemPromise.then(function (item) {
            var element = document.createElement("div");
            React.render(componentFunction(item), element);
            return element;
        });
    }
};

module.exports = ReactWinJS;