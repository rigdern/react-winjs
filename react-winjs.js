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
// - Adaptive apps. In adaptive apps, you want to render certain components at some screen
//   sizes but not at others. For cheap WinJS controls, reinstantiating the control during
//   resize when it is needed may be fine. However, this pattern may not work well for
//   expensive controls like the ListView. We'd want more of a lazy init pattern:
//     - If the control isn't needed at this screen size, don't render it.
//     - When the control is needed, instatiate it.
//     - When the control isn't needed anymore, hide it (display: none).
//     - When the control is needed again, show it (display: block) and call forceLayout()
//   react-winjs could add a special prop to handle all of the details of this pattern for
//   you with a special prop (e.g. displayNone). It could look like this:
//     <ListView
//       displayNone={this.state.shouldHideListViewAtThisScreenSize}
//       itemDataSource={this.state.itemDataSource}
//       itemTemplate={this.itemTemplate} />
// - What do we do when a prop is removed from one render to the next? Do we need to pass
//   undefined to the underlying control for that one render? (if the prop is omitted from
//   the next render as well, we shouldn't have to pass it along because we already "cleared"
//   it)
// - Should have special initialization propHandlers that would get to influence what gets
//   passed in the options parameter to the control's constructer? Use cases:
//   - Initialize Hub's BindingList (rather than editing it immediately after construction)
//   - Initialize-only parameters (e.g. Command's type). Ideally, the control would just
//     rerender/reinstantiate itself as needed but I'm not sure how to do that in the
//     ICommand.type case.

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
    Command: [
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
    ToolBar: [
        "data",
        "element",
        "extraClass",
        "shownDisplayMode"
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

function arraysShallowEqual(a, b) {
    if (a === b) {
        return true;
    } else if (a.length !== b.length) {
        return false;
    } else {
        for (var i = 0, len = a.length; i < len; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
        return true;
    }
}

function makeClassSet(className) {
    var classSet = {};
    className && className.split(" ").forEach(function (aClass) {
        if (aClass) {
            classSet[aClass] = true;
        }
    });
    return classSet;
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

// interface IWinJSComponent {
//     winControl
//     data
// }

// interface IWinJSChildComponent extends IWinJSComponent {
//     key
// }

var PropHandlers = {
    mountTo: function PropHandlers_mountTo(getMountPoint) {
        return function mountTo(winjsComponent, propValue) {
            React.render(propValue, getMountPoint(winjsComponent));
        };
    },
    syncChildrenWithBindingList: function PropHandlers_syncChildrenWithBindingList(bindingListName) {
        return function syncChildrenWithBindingList(winjsComponent, propValue) {
            var oldChildComponents = winjsComponent.data.winjsChildComponents || [];
            var oldChildComponentsMap = winjsComponent.data.winjsChildComponentsMap || {};
            var newChildComponents = [];
            var newChildComponentsMap = {};

            React.Children.forEach(propValue, function (component) {
                if (component) {
                    var winjsChildComponent = oldChildComponentsMap[component.key];
                    if (winjsChildComponent) {
                        winjsChildComponent.update(component);
                    } else {
                        winjsChildComponent = new WinJSChildComponent(component);
                    }
                    newChildComponents.push(winjsChildComponent);
                    newChildComponentsMap[component.key] = winjsChildComponent;
                }
            });

            var bindingList = winjsComponent.winControl[bindingListName];
            if (bindingList) {
                applyEditsToBindingList(
                    bindingList,
                    diffArraysByKey(oldChildComponents, newChildComponents)
                );
            } else {
                winjsComponent.winControl[bindingListName] = new WinJS.Binding.List(newChildComponents.map(function (winjsChildComponent) {
                    return winjsChildComponent.winControl;
                }));
            }
            
            winjsComponent.data.winjsChildComponents = newChildComponents;
            winjsComponent.data.winjsChildComponentsMap = newChildComponentsMap;
        };
    }
};

function defineControl(controlName, options) {
    options = options || {};
    var propHandlers = options.propHandlers || {};
    var render = options.render || function (component) {
        return React.DOM.div();
    };

    function update(winjsComponent, nextProps) {
        var winControl = winjsComponent.winControl;

        // Properties
        //
        ControlApis[controlName].properties.forEach(function (propName) {
            if (nextProps.hasOwnProperty(propName) && winControl[propName] !== nextProps[propName]) {
                winControl[propName] = nextProps[propName];
            }
        });

        // Events
        //
        ControlApis[controlName].events.forEach(function (eventName) {
            var lowerEventName = eventName.toLowerCase();
            if (nextProps.hasOwnProperty(eventName) && winControl[lowerEventName] !== nextProps[eventName]) {
                winControl[lowerEventName] = nextProps[eventName];
            }
        });

        // propHandlers
        //
        Object.keys(propHandlers).forEach(function (propName) {
            if (nextProps.hasOwnProperty(propName)) {
                var handleProp = propHandlers[propName];
                handleProp(winjsComponent, nextProps[propName]);
            }
        });

        // className
        //  Enable the addition and removal of CSS classes on the root of the winControl
        //  but don't clobber whatever CSS classes the underlying control may have added
        //  (e.g. don't clobber win-listview).
        //
        var elementClassList = winjsComponent.winControl.element.classList;
        var oldClassSet = winjsComponent.data.classSet;
        var newClassSet = makeClassSet(nextProps.className);
        for (var className in oldClassSet) {
            if (!newClassSet[className]) {
                elementClassList.remove(className);
            }
        }
        for (var className in newClassSet) {
            if (!oldClassSet[className]) {
                elementClassList.add(className);
            }
        }
        winjsComponent.data.classSet = newClassSet;
    }

    ReactWinJS[controlName] = React.createClass({
        displayName: controlName,
        statics: {
            update: update
        },
        shouldComponentUpdate: function () {
            return false;
        },
        componentDidMount: function () {
            this.data = {};

            // Properties
            //
            this.winControl = new WinJS.UI[controlName](
                this.getDOMNode(),
                selectKeys(ControlApis[controlName].properties, this.props)
            );

            // Events
            //
            ControlApis[controlName].events.forEach(function (eventName) {
                if (this.props.hasOwnProperty(eventName)) {
                    this.winControl[eventName.toLowerCase()] = this.props[eventName];
                }
            }, this);

            // propHandlers
            //
            Object.keys(propHandlers).forEach(function (propName) {
                if (this.props.hasOwnProperty(propName)) {
                    var handleProp = propHandlers[propName];
                    handleProp(this, this.props[propName]);
                }
            }, this);

            // className
            //
            this.data.classSet = makeClassSet(this.props.className);
            if (this.props.className) {
                this.getDOMNode().className += " " + this.props.className;
            }
        },
        componentWillUnmount: function () {
            this.winControl.dispose && this.winControl.dispose();
        },
        componentWillReceiveProps: function (nextProps) {
            update(this, nextProps);
        },
        render: function() {
            return render(this);
        }
    });
}

// TODO: Is there a better way to solve this problem that WinJSChildComponent solves?
function WinJSChildComponent(component) { // implements IWinJSChildComponent
    var instance = React.render(component, document.createElement("div"));
    // TODO: The technique of the above line causes React to generate warnings that look
    // like this:
    //   ReactMount: Root element has been removed from its original container. New container: 
    this.winControl = instance.winControl;
    this.data = instance.data;
    this.key = component.key;
};
WinJSChildComponent.prototype.update = function (component) {
    // TODO: Because we're not going thru React's lifecycle, we're missing out on
    // validation of propTypes.
    // TODO: I don't think winControl will be available on component
    // if an app decides to use component as a ref...
    component.type.update(this, component.props);
};

defineControl("AppBar", {
    propHandlers: {
        children: function (winjsComponent, propValue) {
            var oldChildComponents = winjsComponent.data.winjsChildComponents || [];
            var oldChildComponentsMap = winjsComponent.data.winjsChildComponentsMap || {};
            var newChildComponents = [];
            var newChildComponentsMap = {};

            React.Children.forEach(propValue, function (component) {
                if (component) {
                    var winjsChildComponent = oldChildComponentsMap[component.key];
                    if (winjsChildComponent) {
                        winjsChildComponent.update(component);
                    } else {
                        winjsChildComponent = new WinJSChildComponent(component);
                    }
                    newChildComponents.push(winjsChildComponent);
                    newChildComponentsMap[component.key] = winjsChildComponent;
                }
            });

            if (!arraysShallowEqual(oldChildComponents, newChildComponents)) {
                winjsComponent.winControl.commands = newChildComponents.map(function (winjsChildComponent) {
                    return winjsChildComponent.winControl;
                });
            
                winjsComponent.data.winjsChildComponents = newChildComponents;
                winjsComponent.data.winjsChildComponentsMap = newChildComponentsMap;
            }
        }
    }
});
// TODO: Can't change AppBarCommand.type on the fly (initialize only)
// TODO: AppBarCommand.flyout doesn't work
var appBarCommandSpec = {
    render: function (component) {
        var tagName =
            component.props.type === "content" ?
            "div" :
            component.props.type === "separator" ?
            "hr" :
            "button";
        return React.createElement(tagName);
    }
};
defineControl("AppBarCommand", appBarCommandSpec);
defineControl("AutoSuggestBox");
defineControl("BackButton", {
    render: function (component) {
        return React.DOM.button();
    }
});
// CellSpanningLayout: Not a component so just use off of WinJS.UI?
// TODO: Can't change Command.type on the fly (initialize only)
// TODO: Command.flyout doesn't work
defineControl("Command", appBarCommandSpec);
defineControl("ContentDialog", {
    propHandlers: {
        children: PropHandlers.mountTo(function (winjsComponent) {
            return winjsComponent.winControl.element.querySelector(".win-contentdialog-content");
        })
    }
});
defineControl("DatePicker");
defineControl("FlipView");
defineControl("Flyout", {
    // The WinJS Flyout control doesn't come with a good mount point.
    // App content and control content are siblings in Flyout.element.
    // Consequently, if React rendered to Flyout.element, it would destroy
    // some of Flyout's elements. To fix this, we give Flyout a div
    // (className="win-react-flyout-mount-point") which will contain only
    // app content. The React component renders into this div so it doesn't
    // destroy any control content.
    render: function (component) {
        return React.DOM.div(null, React.DOM.div({ className: "win-react-flyout-mount-point" }));
    },
    propHandlers: {
        children: PropHandlers.mountTo(function (winjsComponent) {
            return winjsComponent.winControl.element.querySelector(".win-react-flyout-mount-point");
        })
    }
});
// GridLayout: Not a component so just use off of WinJS.UI?
defineControl("Hub", {
    propHandlers: {
        children: PropHandlers.syncChildrenWithBindingList("sections")
    }
});
defineControl("HubSection", {
    propHandlers: {
        children: PropHandlers.mountTo(function (winjsComponent) {
            return winjsComponent.winControl.contentElement;
        })
    }
});
defineControl("ItemContainer", {
    propHandlers: {
        children: PropHandlers.mountTo(function (winjsComponent) {
            return winjsComponent.winControl.element.querySelector(".win-item");
        })
    }
});
// ListLayout: Not a component so just use off of WinJS.UI?
defineControl("ListView");
defineControl("Menu", {
    propHandlers: {
        children: function (winjsComponent, propValue) {
            React.render(React.DOM.div(null, propValue), winjsComponent.winControl.element);
        }
    }
});
// TODO: Can't change MenuCommand.type on the fly (initialize only)
// TODO: MenuCommand.flyout doesn't work
defineControl("MenuCommand", {
    render: function (component) {
        var tagName = component.props.type === "separator" ?
            "hr" :
            "button";
        return React.createElement(tagName);
    }
});
defineControl("NavBar", {
    // The WinJS NavBar control doesn't come with a good mount point.
    // App content and control content are siblings in NavBar.element.
    // Consequently, if React rendered to NavBar.element, it would destroy
    // some of NavBar's elements. To fix this, we give NavBar a div
    // (className="win-react-navbar-mount-point") which will contain only
    // app content. The React component renders into this div so it doesn't
    // destroy any control content.
    render: function (component) {
        return React.DOM.div(null, React.DOM.div({ className: "win-react-navbar-mount-point" }));
    },
    propHandlers: {
        children: PropHandlers.mountTo(function (winjsComponent) {
            return winjsComponent.winControl.element.querySelector(".win-react-navbar-mount-point");
        })
    }
});
defineControl("NavBarCommand");
defineControl("NavBarContainer", {
    propHandlers: {
        children: PropHandlers.syncChildrenWithBindingList("data")
    }
});
defineControl("Pivot", {
    propHandlers: {
        children: PropHandlers.syncChildrenWithBindingList("items")
    }
});
defineControl("PivotItem", {
    propHandlers: {
        children: PropHandlers.mountTo(function (winjsComponent) {
            return winjsComponent.winControl.contentElement;
        })
    }
});
defineControl("Rating");
defineControl("SearchBox");
// TODO: SemanticZoom
defineControl("SplitView", {
    propHandlers: {
        paneComponent: PropHandlers.mountTo(function (winjsComponent) {
            return winjsComponent.winControl.paneElement;
        }),
        contentComponent: PropHandlers.mountTo(function (winjsComponent) {
            return winjsComponent.winControl.contentElement;
        })
    }
});
defineControl("TimePicker");
defineControl("ToggleSwitch");
defineControl("ToolBar", {
    propHandlers: {
        children: PropHandlers.syncChildrenWithBindingList("data")
    }
});
defineControl("Tooltip", {
    propHandlers: {
        children: PropHandlers.mountTo(function (winjsComponent) {
            return winjsComponent.winControl.element;
        }),
        contentComponent: function (winjsComponent, propValue) {
            if (!winjsComponent.winControl.contentElement) {
                winjsComponent.winControl.contentElement = document.createElement("div");
            }
            React.render(propValue, winjsComponent.winControl.contentElement);
        }
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