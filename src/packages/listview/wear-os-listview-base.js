"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var trace_1 = require("tns-core-modules/trace");
var builder_1 = require("tns-core-modules/ui/builder");
var view_1 = require("tns-core-modules/ui/core/view");
var weak_event_listener_1 = require("tns-core-modules/ui/core/weak-event-listener");
var label_1 = require("tns-core-modules/ui/label/label");
__export(require("tns-core-modules/ui/core/view"));
exports.ITEMLOADING = 'itemLoading';
exports.LOADMOREITEMS = 'loadMoreItems';
exports.ITEMTAP = 'itemTap';
exports.SCROLLEVENT = 'scroll';
exports.ITEMSELECTED = 'itemSelected';
exports.ITEMSELECTING = 'itemSelecting';
exports.ITEMDESELECTED = 'itemDeselected';
exports.ITEMDESELECTING = 'itemDeselecting';
exports.PULLTOREFRESHINITIATEDEVENT = 'pullToRefreshInitiated';
var knownTemplates;
(function (knownTemplates) {
    knownTemplates.itemTemplate = 'itemTemplate';
})(knownTemplates = exports.knownTemplates || (exports.knownTemplates = {}));
var knownMultiTemplates;
(function (knownMultiTemplates) {
    knownMultiTemplates.itemTemplates = 'itemTemplates';
})(knownMultiTemplates = exports.knownMultiTemplates || (exports.knownMultiTemplates = {}));
var knownCollections;
(function (knownCollections) {
    knownCollections.items = 'items';
})(knownCollections = exports.knownCollections || (exports.knownCollections = {}));
exports.wearOsListViewTraceCategory = 'ns-wear-os-listview';
function WearOsListViewLog(message) {
    trace_1.write(message, exports.wearOsListViewTraceCategory);
}
exports.WearOsListViewLog = WearOsListViewLog;
function WearOsListViewError(message) {
    trace_1.write(message, exports.wearOsListViewTraceCategory, trace_1.messageType.error);
}
exports.WearOsListViewError = WearOsListViewError;
var autoEffectiveItemHeight = 100;
var autoEffectiveItemWidth = 100;
var WearOsListViewBase = (function (_super) {
    __extends(WearOsListViewBase, _super);
    function WearOsListViewBase() {
        var _this = _super.call(this) || this;
        _this.pullToRefresh = false;
        _this._defaultTemplate = {
            key: 'default',
            createView: function () {
                if (_this.itemTemplate) {
                    return builder_1.parse(_this.itemTemplate, _this);
                }
                return undefined;
            }
        };
        _this._itemTemplatesInternal = new Array(_this._defaultTemplate);
        _this._innerWidth = 0;
        _this._innerHeight = 0;
        _this._itemTemplateSelectorBindable = new label_1.Label();
        _this.itemReorder = false;
        _this.selectionBehavior = 'None';
        _this.multipleSelection = false;
        _this._itemIdGenerator = function (_item, index) { return index; };
        return _this;
    }
    Object.defineProperty(WearOsListViewBase.prototype, "itemIdGenerator", {
        get: function () {
            return this._itemIdGenerator;
        },
        set: function (generatorFn) {
            this._itemIdGenerator = generatorFn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WearOsListViewBase.prototype, "itemTemplateSelector", {
        get: function () {
            return this._itemTemplateSelector;
        },
        set: function (value) {
            var _this = this;
            if (typeof value === 'string') {
                this._itemTemplateSelectorBindable.bind({
                    sourceProperty: null,
                    targetProperty: 'templateKey',
                    expression: value
                });
                this._itemTemplateSelector = function (item, index, items) {
                    item['$index'] = index;
                    _this._itemTemplateSelectorBindable.bindingContext = item;
                    return _this._itemTemplateSelectorBindable.get('templateKey');
                };
            }
            else if (typeof value === 'function') {
                this._itemTemplateSelector = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    WearOsListViewBase.prototype.onLayout = function (left, top, right, bottom) {
        _super.prototype.onLayout.call(this, left, top, right, bottom);
        this._innerWidth =
            right - left - this.effectivePaddingLeft - this.effectivePaddingRight;
        this._innerHeight =
            bottom - top - this.effectivePaddingTop - this.effectivePaddingBottom;
        this._effectiveItemWidth = view_1.PercentLength.toDevicePixels(this.itemWidth, autoEffectiveItemWidth, this._innerWidth);
        this._effectiveItemHeight = view_1.PercentLength.toDevicePixels(this.itemHeight, autoEffectiveItemHeight, this._innerHeight);
    };
    WearOsListViewBase.prototype._getItemTemplate = function (index) {
        var templateKey = 'default';
        if (this.itemTemplateSelector) {
            var dataItem = this._getDataItem(index);
            templateKey = this._itemTemplateSelector(dataItem, index, this.items);
        }
        for (var i = 0, length_1 = this._itemTemplatesInternal.length; i < length_1; i++) {
            if (this._itemTemplatesInternal[i].key === templateKey) {
                return this._itemTemplatesInternal[i];
            }
        }
        return this._itemTemplatesInternal[0];
    };
    WearOsListViewBase.prototype._prepareItem = function (item, index) {
        if (item) {
            item.bindingContext = this._getDataItem(index);
        }
    };
    WearOsListViewBase.prototype._getDefaultItemContent = function (index) {
        var lbl = new label_1.Label();
        lbl.bind({
            targetProperty: 'text',
            sourceProperty: '$value'
        });
        return lbl;
    };
    WearOsListViewBase.prototype._updateNativeItems = function (args) {
        this.refresh();
    };
    WearOsListViewBase.prototype._getDataItem = function (index) {
        var thisItems = this.items;
        return thisItems && thisItems.getItem
            ? thisItems.getItem(index)
            : thisItems[index];
    };
    WearOsListViewBase.knownFunctions = ['itemTemplateSelector', 'itemIdGenerator'];
    WearOsListViewBase.itemLoadingEvent = exports.ITEMLOADING;
    WearOsListViewBase.itemTapEvent = exports.ITEMTAP;
    WearOsListViewBase.loadMoreItemsEvent = exports.LOADMOREITEMS;
    WearOsListViewBase.scrollEvent = exports.SCROLLEVENT;
    WearOsListViewBase = __decorate([
        view_1.CSSType('WearOsListView'),
        __metadata("design:paramtypes", [])
    ], WearOsListViewBase);
    return WearOsListViewBase;
}(view_1.View));
exports.WearOsListViewBase = WearOsListViewBase;
var LayoutTypeOptions;
(function (LayoutTypeOptions) {
    LayoutTypeOptions["GRID"] = "grid";
    LayoutTypeOptions["LINEAR"] = "linear";
    LayoutTypeOptions["STAGGERED"] = "staggered";
})(LayoutTypeOptions = exports.LayoutTypeOptions || (exports.LayoutTypeOptions = {}));
exports.itemsProperty = new view_1.Property({
    name: 'items',
    valueChanged: function (target, oldValue, newValue) {
        if (oldValue instanceof observable_1.Observable) {
            weak_event_listener_1.removeWeakEventListener(oldValue, observable_array_1.ObservableArray.changeEvent, target._updateNativeItems, target);
        }
        if (newValue instanceof observable_1.Observable) {
            weak_event_listener_1.addWeakEventListener(newValue, observable_array_1.ObservableArray.changeEvent, target._updateNativeItems, target);
        }
        target.refresh();
    }
});
exports.itemsProperty.register(WearOsListViewBase);
exports.itemTemplateProperty = new view_1.Property({
    name: 'itemTemplate',
    affectsLayout: true,
    valueChanged: function (target) {
        target.refresh();
    }
});
exports.itemTemplateProperty.register(WearOsListViewBase);
exports.itemTemplatesProperty = new view_1.Property({
    name: 'itemTemplates',
    affectsLayout: true,
    valueConverter: function (value) {
        if (typeof value === 'string') {
            return builder_1.parseMultipleTemplates(value);
        }
        return value;
    }
});
exports.itemTemplatesProperty.register(WearOsListViewBase);
exports.layoutTypeProperty = new view_1.Property({
    name: 'layoutType',
    affectsLayout: true
});
exports.layoutTypeProperty.register(WearOsListViewBase);
exports.spanCountProperty = new view_1.Property({
    name: 'spanCount',
    defaultValue: 1,
    affectsLayout: true,
    valueConverter: function (v) { return parseInt(v, 10); }
});
exports.spanCountProperty.register(WearOsListViewBase);
var defaultItemWidth = 'auto';
exports.itemWidthProperty = new view_1.CoercibleProperty({
    name: 'itemWidth',
    affectsLayout: true,
    defaultValue: { value: 1, unit: '%' },
    equalityComparer: view_1.PercentLength.equals,
    valueConverter: view_1.PercentLength.parse,
    coerceValue: function (target, value) {
        return target.nativeView ? value : defaultItemWidth;
    },
    valueChanged: function (target, oldValue, newValue) {
        target._itemWidth = newValue;
        target._effectiveItemWidth = view_1.PercentLength.toDevicePixels(newValue, autoEffectiveItemWidth, target._innerWidth);
        target.refresh();
    }
});
exports.itemWidthProperty.register(WearOsListViewBase);
var defaultItemHeight = 'auto';
exports.itemHeightProperty = new view_1.CoercibleProperty({
    name: 'itemHeight',
    affectsLayout: true,
    defaultValue: { value: 0.2, unit: '%' },
    coerceValue: function (target, value) {
        return target.nativeView ? value : defaultItemHeight;
    },
    equalityComparer: view_1.PercentLength.equals,
    valueConverter: view_1.PercentLength.parse,
    valueChanged: function (target, oldValue, newValue) {
        target._itemHeight = newValue;
        target._effectiveItemHeight = view_1.PercentLength.toDevicePixels(newValue, autoEffectiveItemHeight, target._innerHeight);
        target.refresh();
    }
});
exports.itemHeightProperty.register(WearOsListViewBase);
var converter = view_1.makeParser(view_1.makeValidator('horizontal', 'vertical'));
exports.orientationProperty = new view_1.Property({
    name: 'orientation',
    defaultValue: 'vertical',
    affectsLayout: true,
    valueChanged: function (target, oldValue, newValue) {
        target.refresh();
    },
    valueConverter: converter
});
exports.orientationProperty.register(WearOsListViewBase);
exports.maxProperty = new view_1.Property({
    name: 'max',
    affectsLayout: true,
    defaultValue: { value: 1, unit: '%' },
    equalityComparer: view_1.PercentLength.equals,
    valueConverter: view_1.PercentLength.parse
});
exports.maxProperty.register(WearOsListViewBase);
exports.minProperty = new view_1.Property({
    name: 'min',
    affectsLayout: true,
    defaultValue: { value: 1 / 3, unit: '%' },
    equalityComparer: view_1.PercentLength.equals,
    valueConverter: view_1.PercentLength.parse
});
exports.minProperty.register(WearOsListViewBase);
exports.hideScrollBarProperty = new view_1.Property({
    name: 'hideScrollBar'
});
exports.hideScrollBarProperty.register(WearOsListViewBase);
exports.circularScrollingEnabled = new view_1.Property({
    name: 'circularScrollingEnabled',
    defaultValue: false
});
exports.circularScrollingEnabled.register(WearOsListViewBase);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vhci1vcy1saXN0dmlldy1iYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2Vhci1vcy1saXN0dmlldy1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0RBQThEO0FBQzlELDJFQUFzRjtBQUN0RixnREFBNEQ7QUFDNUQsdURBQTRFO0FBQzVFLHNEQUE4SjtBQUM5SixvRkFBNkc7QUFDN0cseURBQXdEO0FBRXhELG1EQUE4QztBQUVqQyxRQUFBLFdBQVcsR0FBRyxhQUFhLENBQUM7QUFDNUIsUUFBQSxhQUFhLEdBQUcsZUFBZSxDQUFDO0FBQ2hDLFFBQUEsT0FBTyxHQUFHLFNBQVMsQ0FBQztBQUNwQixRQUFBLFdBQVcsR0FBRyxRQUFRLENBQUM7QUFDdkIsUUFBQSxZQUFZLEdBQUcsY0FBYyxDQUFDO0FBQzlCLFFBQUEsYUFBYSxHQUFHLGVBQWUsQ0FBQztBQUNoQyxRQUFBLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQztBQUNsQyxRQUFBLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQztBQUNwQyxRQUFBLDJCQUEyQixHQUFHLHdCQUF3QixDQUFDO0FBR3BFLElBQWlCLGNBQWMsQ0FFOUI7QUFGRCxXQUFpQixjQUFjO0lBQ2hCLDJCQUFZLEdBQUcsY0FBYyxDQUFDO0FBQzdDLENBQUMsRUFGZ0IsY0FBYyxHQUFkLHNCQUFjLEtBQWQsc0JBQWMsUUFFOUI7QUFFRCxJQUFpQixtQkFBbUIsQ0FFbkM7QUFGRCxXQUFpQixtQkFBbUI7SUFDckIsaUNBQWEsR0FBRyxlQUFlLENBQUM7QUFDL0MsQ0FBQyxFQUZnQixtQkFBbUIsR0FBbkIsMkJBQW1CLEtBQW5CLDJCQUFtQixRQUVuQztBQUVELElBQWlCLGdCQUFnQixDQUVoQztBQUZELFdBQWlCLGdCQUFnQjtJQUNsQixzQkFBSyxHQUFHLE9BQU8sQ0FBQztBQUMvQixDQUFDLEVBRmdCLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBRWhDO0FBRVksUUFBQSwyQkFB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QWU7Q0FDdEIsQ0FBQyxDQUFDO0FBQ0gsNkJBQXFCLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFdEMsUUFBQSx3QkFBd0IsR0FBRyxJQUFJLGVBQVEsQ0FHbEQ7SUFDQSxJQUFJLEVBQUUsMEJBQTBCO0lBQ2hDLFlBQVksRUFBRSxLQUFLO0NBQ3BCLENBQUMsQ0FBQztBQUNILGdDQUF3QixDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IENoYW5nZWREYXRhLCBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheSc7XG5pbXBvcnQgeyBtZXNzYWdlVHlwZSwgd3JpdGUgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3RyYWNlJztcbmltcG9ydCB7IHBhcnNlLCBwYXJzZU11bHRpcGxlVGVtcGxhdGVzIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9idWlsZGVyJztcbmltcG9ydCB7IENvZXJjaWJsZVByb3BlcnR5LCBDU1NUeXBlLCBLZXllZFRlbXBsYXRlLCBtYWtlUGFyc2VyLCBtYWtlVmFsaWRhdG9yLCBQZXJjZW50TGVuZ3RoLCBQcm9wZXJ0eSwgVGVtcGxhdGUsIFZpZXcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlldyc7XG5pbXBvcnQgeyBhZGRXZWFrRXZlbnRMaXN0ZW5lciwgcmVtb3ZlV2Vha0V2ZW50TGlzdGVuZXIgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvd2Vhay1ldmVudC1saXN0ZW5lcic7XG5pbXBvcnQgeyBMYWJlbCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvbGFiZWwvbGFiZWwnO1xuXG5leHBvcnQgKiBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlldyc7XG5cbmV4cG9ydCBjb25zdCBJVEVNTE9BRElORyA9ICdpdGVtTG9hZGluZyc7XG5leHBvcnQgY29uc3QgTE9BRE1PUkVJVEVNUyA9ICdsb2FkTW9yZUl0ZW1zJztcbmV4cG9ydCBjb25zdCBJVEVNVEFQID0gJ2l0ZW1UYXAnO1xuZXhwb3J0IGNvbnN0IFNDUk9MTEVWRU5UID0gJ3Njcm9sbCc7XG5leHBvcnQgY29uc3QgSVRFTVNFTEVDVEVEID0gJ2l0ZW1TZWxlY3RlZCc7XG5leHBvcnQgY29uc3QgSVRFTVNFTEVDVElORyA9ICdpdGVtU2VsZWN0aW5nJztcbmV4cG9ydCBjb25zdCBJVEVNREVTRUxFQ1RFRCA9ICdpdGVtRGVzZWxlY3RlZCc7XG5leHBvcnQgY29uc3QgSVRFTURFU0VMRUNUSU5HID0gJ2l0ZW1EZXNlbGVjdGluZyc7XG5leHBvcnQgY29uc3QgUFVMTFRPUkVGUkVTSElOSVRJQVRFREVWRU5UID0gJ3B1bGxUb1JlZnJlc2hJbml0aWF0ZWQnO1xuZXhwb3J0IHR5cGUgT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnO1xuXG5leHBvcnQgbmFtZXNwYWNlIGtub3duVGVtcGxhdGVzIHtcbiAgZXhwb3J0IGNvbnN0IGl0ZW1UZW1wbGF0ZSA9ICdpdGVtVGVtcGxhdGUnO1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIGtub3duTXVsdGlUZW1wbGF0ZXMge1xuICBleHBvcnQgY29uc3QgaXRlbVRlbXBsYXRlcyA9ICdpdGVtVGVtcGxhdGVzJztcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBrbm93bkNvbGxlY3Rpb25zIHtcbiAgZXhwb3J0IGNvbnN0IGl0ZW1zID0gJ2l0ZW1zJztcbn1cblxuZXhwb3J0IGNvbnN0IHdlYXJPc0xpc3RWaWV3VHJhY2VDYXRlZ29yeSA9ICducy13ZWFyLW9zLWxpc3R2aWV3JztcblxuZXhwb3J0IGZ1bmN0aW9uIFdlYXJPc0xpc3RWaWV3TG9nKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICB3cml0ZShtZXNzYWdlLCB3ZWFyT3NMaXN0Vmlld1RyYWNlQ2F0ZWdvcnkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gV2Vhck9zTGlzdFZpZXdFcnJvcihtZXNzYWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgd3JpdGUobWVzc2FnZSwgd2Vhck9zTGlzdFZpZXdUcmFjZUNhdGVnb3J5LCBtZXNzYWdlVHlwZS5lcnJvcik7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSXRlbUV2ZW50RGF0YSB7XG4gIGV2ZW50TmFtZTogc3RyaW5nO1xuICBvYmplY3Q6IGFueTtcbiAgaW5kZXg6IG51bWJlcjtcbiAgdmlldzogVmlldztcbiAgYW5kcm9pZDogYW55O1xuICBpb3M6IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJdGVtc1NvdXJjZSB7XG4gIGxlbmd0aDogbnVtYmVyO1xuXG4gIGdldEl0ZW0oaW5kZXg6IG51bWJlcik6IGFueTtcbn1cblxuY29uc3QgYXV0b0VmZmVjdGl2ZUl0ZW1IZWlnaHQgPSAxMDA7XG5jb25zdCBhdXRvRWZmZWN0aXZlSXRlbVdpZHRoID0gMTAwO1xuXG5AQ1NTVHlwZSgnV2Vhck9zTGlzdFZpZXcnKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFdlYXJPc0xpc3RWaWV3QmFzZSBleHRlbmRzIFZpZXcge1xuICBhYnN0cmFjdCByZWZyZXNoKCk6IHZvaWQ7XG5cbiAgLy8gVE9ETzogZ2V0IHJpZCBvZiBzdWNoIGhhY2tzLlxuICBwdWJsaWMgc3RhdGljIGtub3duRnVuY3Rpb25zID0gWydpdGVtVGVtcGxhdGVTZWxlY3RvcicsICdpdGVtSWRHZW5lcmF0b3InXTsgLy8gU2VlIGNvbXBvbmVudC1idWlsZGVyLnRzIGlzS25vd25GdW5jdGlvblxuICBwdWJsaWMgaGlkZVNjcm9sbEJhcjogYm9vbGVhbjtcbiAgcHVibGljIG1heDogUGVyY2VudExlbmd0aDtcbiAgcHVibGljIG1pbjogUGVyY2VudExlbmd0aDtcbiAgcHVibGljIF9pdGVtV2lkdGg6IGFueTtcbiAgcHVibGljIF9pdGVtSGVpZ2h0OiBhbnk7XG4gIHB1YmxpYyBpdGVtV2lkdGg6IFBlcmNlbnRMZW5ndGg7XG4gIHB1YmxpYyBpdGVtSGVpZ2h0OiBQZXJjZW50TGVuZ3RoO1xuICBwdWJsaWMgbGF5b3V0VHlwZTogTGF5b3V0VHlwZTtcbiAgcHVibGljIHNwYW5Db3VudDogbnVtYmVyO1xuICBwdWJsaWMgaXRlbXM6IGFueVtdIHwgSXRlbXNTb3VyY2U7XG4gIHB1YmxpYyBpdGVtVGVtcGxhdGU6IHN0cmluZyB8IFRlbXBsYXRlO1xuICBwdWJsaWMgc3RhdGljIGl0ZW1Mb2FkaW5nRXZlbnQgPSBJVEVNTE9BRElORztcbiAgcHVibGljIHN0YXRpYyBpdGVtVGFwRXZlbnQgPSBJVEVNVEFQO1xuICBwdWJsaWMgc3RhdGljIGxvYWRNb3JlSXRlbXNFdmVudCA9IExPQURNT1JFSVRFTVM7XG4gIHB1YmxpYyBzdGF0aWMgc2Nyb2xsRXZlbnQgPSBTQ1JPTExFVkVOVDtcbiAgcHVibGljIHB1bGxUb1JlZnJlc2g6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIF9kZWZhdWx0VGVtcGxhdGU6IEtleWVkVGVtcGxhdGUgPSB7XG4gICAga2V5OiAnZGVmYXVsdCcsXG4gICAgY3JlYXRlVmlldzogKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXRlbVRlbXBsYXRlKSB7XG4gICAgICAgIHJldHVybiBwYXJzZSh0aGlzLml0ZW1UZW1wbGF0ZSwgdGhpcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfTtcbiAgcHVibGljIF9pdGVtVGVtcGxhdGVzSW50ZXJuYWwgPSBuZXcgQXJyYXk8S2V5ZWRUZW1wbGF0ZT4oXG4gICAgdGhpcy5fZGVmYXVsdFRlbXBsYXRlXG4gICk7XG4gIHB1YmxpYyBpdGVtVGVtcGxhdGVzOiBzdHJpbmcgfCBBcnJheTxLZXllZFRlbXBsYXRlPjtcbiAgcHVibGljIF9pbm5lcldpZHRoOiBudW1iZXIgPSAwO1xuICBwdWJsaWMgX2lubmVySGVpZ2h0OiBudW1iZXIgPSAwO1xuICBwdWJsaWMgX2VmZmVjdGl2ZUl0ZW1IZWlnaHQ6IG51bWJlcjtcbiAgcHVibGljIF9lZmZlY3RpdmVJdGVtV2lkdGg6IG51bWJlcjtcbiAgcHVibGljIG9yaWVudGF0aW9uOiBPcmllbnRhdGlvbjtcbiAgcHJpdmF0ZSBfaXRlbVRlbXBsYXRlU2VsZWN0b3JCaW5kYWJsZSA9IG5ldyBMYWJlbCgpO1xuICBwdWJsaWMgaXRlbVJlb3JkZXI6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHNlbGVjdGlvbkJlaGF2aW9yOiAnTm9uZScgfCAnUHJlc3MnIHwgJ0xvbmdQcmVzcycgPSAnTm9uZSc7XG4gIHB1YmxpYyBtdWx0aXBsZVNlbGVjdGlvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBnZXQgaXRlbUlkR2VuZXJhdG9yKCk6IChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIsIGl0ZW1zOiBhbnkpID0+IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1JZEdlbmVyYXRvcjtcbiAgfVxuXG4gIHNldCBpdGVtSWRHZW5lcmF0b3IoXG4gICAgZ2VuZXJhdG9yRm46IChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIsIGl0ZW1zOiBhbnkpID0+IG51bWJlclxuICApIHtcbiAgICB0aGlzLl9pdGVtSWRHZW5lcmF0b3IgPSBnZW5lcmF0b3JGbjtcbiAgfVxuXG4gIGdldCBpdGVtVGVtcGxhdGVTZWxlY3RvcigpOlxuICAgIHwgc3RyaW5nXG4gICAgfCAoKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgaXRlbXM6IGFueSkgPT4gc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1UZW1wbGF0ZVNlbGVjdG9yO1xuICB9XG5cbiAgc2V0IGl0ZW1UZW1wbGF0ZVNlbGVjdG9yKFxuICAgIHZhbHVlOiBzdHJpbmcgfCAoKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgaXRlbXM6IGFueSkgPT4gc3RyaW5nKVxuICApIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5faXRlbVRlbXBsYXRlU2VsZWN0b3JCaW5kYWJsZS5iaW5kKHtcbiAgICAgICAgc291cmNlUHJvcGVydHk6IG51bGwsXG4gICAgICAgIHRhcmdldFByb3BlcnR5OiAndGVtcGxhdGVLZXknLFxuICAgICAgICBleHByZXNzaW9uOiB2YWx1ZVxuICAgICAgfSk7XG4gICAgICB0aGlzLl9pdGVtVGVtcGxhdGVTZWxlY3RvciA9IChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIsIGl0ZW1zOiBhbnkpID0+IHtcbiAgICAgICAgaXRlbVsnJGluZGV4J10gPSBpbmRleDtcbiAgICAgICAgdGhpcy5faXRlbVRlbXBsYXRlU2VsZWN0b3JCaW5kYWJsZS5iaW5kaW5nQ29udGV4dCA9IGl0ZW07XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtVGVtcGxhdGVTZWxlY3RvckJpbmRhYmxlLmdldCgndGVtcGxhdGVLZXknKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuX2l0ZW1UZW1wbGF0ZVNlbGVjdG9yID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uTGF5b3V0KGxlZnQ6IG51bWJlciwgdG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyKSB7XG4gICAgc3VwZXIub25MYXlvdXQobGVmdCwgdG9wLCByaWdodCwgYm90dG9tKTtcbiAgICB0aGlzLl9pbm5lcldpZHRoID1cbiAgICAgIHJpZ2h0IC0gbGVmdCAtIHRoaXMuZWZmZWN0aXZlUGFkZGluZ0xlZnQgLSB0aGlzLmVmZmVjdGl2ZVBhZGRpbmdSaWdodDtcblxuICAgIHRoaXMuX2lubmVySGVpZ2h0ID1cbiAgICAgIGJvdHRvbSAtIHRvcCAtIHRoaXMuZWZmZWN0aXZlUGFkZGluZ1RvcCAtIHRoaXMuZWZmZWN0aXZlUGFkZGluZ0JvdHRvbTtcblxuICAgIHRoaXMuX2VmZmVjdGl2ZUl0ZW1XaWR0aCA9IFBlcmNlbnRMZW5ndGgudG9EZXZpY2VQaXhlbHMoXG4gICAgICB0aGlzLml0ZW1XaWR0aCxcbiAgICAgIGF1dG9FZmZlY3RpdmVJdGVtV2lkdGgsXG4gICAgICB0aGlzLl9pbm5lcldpZHRoXG4gICAgKTtcblxuICAgIHRoaXMuX2VmZmVjdGl2ZUl0ZW1IZWlnaHQgPSBQZXJjZW50TGVuZ3RoLnRvRGV2aWNlUGl4ZWxzKFxuICAgICAgdGhpcy5pdGVtSGVpZ2h0LFxuICAgICAgYXV0b0VmZmVjdGl2ZUl0ZW1IZWlnaHQsXG4gICAgICB0aGlzLl9pbm5lckhlaWdodFxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgX2dldEl0ZW1UZW1wbGF0ZShpbmRleDogbnVtYmVyKTogS2V5ZWRUZW1wbGF0ZSB7XG4gICAgbGV0IHRlbXBsYXRlS2V5ID0gJ2RlZmF1bHQnO1xuICAgIGlmICh0aGlzLml0ZW1UZW1wbGF0ZVNlbGVjdG9yKSB7XG4gICAgICBjb25zdCBkYXRhSXRlbSA9IHRoaXMuX2dldERhdGFJdGVtKGluZGV4KTtcbiAgICAgIHRlbXBsYXRlS2V5ID0gdGhpcy5faXRlbVRlbXBsYXRlU2VsZWN0b3IoZGF0YUl0ZW0sIGluZGV4LCB0aGlzLml0ZW1zKTtcbiAgICB9XG5cbiAgICBmb3IgKFxuICAgICAgbGV0IGkgPSAwLCBsZW5ndGggPSB0aGlzLl9pdGVtVGVtcGxhdGVzSW50ZXJuYWwubGVuZ3RoO1xuICAgICAgaSA8IGxlbmd0aDtcbiAgICAgIGkrK1xuICAgICkge1xuICAgICAgaWYgKHRoaXMuX2l0ZW1UZW1wbGF0ZXNJbnRlcm5hbFtpXS5rZXkgPT09IHRlbXBsYXRlS2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtVGVtcGxhdGVzSW50ZXJuYWxbaV07XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFRoaXMgaXMgdGhlIGRlZmF1bHQgdGVtcGxhdGVcbiAgICByZXR1cm4gdGhpcy5faXRlbVRlbXBsYXRlc0ludGVybmFsWzBdO1xuICB9XG5cbiAgcHVibGljIF9wcmVwYXJlSXRlbShpdGVtOiBWaWV3LCBpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGl0ZW0uYmluZGluZ0NvbnRleHQgPSB0aGlzLl9nZXREYXRhSXRlbShpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIF9nZXREZWZhdWx0SXRlbUNvbnRlbnQoaW5kZXg6IG51bWJlcik6IFZpZXcge1xuICAgIGNvbnN0IGxibCA9IG5ldyBMYWJlbCgpO1xuICAgIGxibC5iaW5kKHtcbiAgICAgIHRhcmdldFByb3BlcnR5OiAndGV4dCcsXG4gICAgICBzb3VyY2VQcm9wZXJ0eTogJyR2YWx1ZSdcbiAgICB9KTtcbiAgICByZXR1cm4gbGJsO1xuICB9XG5cbiAgX3VwZGF0ZU5hdGl2ZUl0ZW1zKGFyZ3M6IENoYW5nZWREYXRhPGFueT4pOiB2b2lkIHtcbiAgICAvKiBVc2UgYXJncyB0byByZWxvYWQvaW5zZXJ0L2RlbGV0ZVxuICAgICAgIGlmKGFyZ3MuYWN0aW9uID09PSBDaGFuZ2VUeXBlLlVwZGF0ZSl7XG4gICAgICAgICAgIGNvbnNvbGUubG9nKGFyZ3MuYWRkZWRDb3VudCk7XG4gICAgICAgICAgIGNvbnNvbGUubG9nKGFyZ3MucmVtb3ZlZCk7XG4gICAgICAgfSovXG5cbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldERhdGFJdGVtKGluZGV4OiBudW1iZXIpOiBhbnkge1xuICAgIGNvbnN0IHRoaXNJdGVtcyA9IDxJdGVtc1NvdXJjZT50aGlzLml0ZW1zO1xuICAgIHJldHVybiB0aGlzSXRlbXMgJiYgdGhpc0l0ZW1zLmdldEl0ZW1cbiAgICAgID8gdGhpc0l0ZW1zLmdldEl0ZW0oaW5kZXgpXG4gICAgICA6IHRoaXNJdGVtc1tpbmRleF07XG4gIH1cblxuICBwcml2YXRlIF9pdGVtSWRHZW5lcmF0b3I6IChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIsIGl0ZW1zOiBhbnkpID0+IG51bWJlciA9IChcbiAgICBfaXRlbTogYW55LFxuICAgIGluZGV4OiBudW1iZXJcbiAgKSA9PiBpbmRleDtcblxuICBwcml2YXRlIF9pdGVtVGVtcGxhdGVTZWxlY3RvcjogKFxuICAgIGl0ZW06IGFueSxcbiAgICBpbmRleDogbnVtYmVyLFxuICAgIGl0ZW1zOiBhbnlcbiAgKSA9PiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIExheW91dFR5cGUgPSAnZ3JpZCcgfCAnbGluZWFyJyB8ICdzdGFnZ2VyZWQnO1xuXG5leHBvcnQgZW51bSBMYXlvdXRUeXBlT3B0aW9ucyB7XG4gIEdSSUQgPSAnZ3JpZCcsXG4gIExJTkVBUiA9ICdsaW5lYXInLFxuICBTVEFHR0VSRUQgPSAnc3RhZ2dlcmVkJ1xufVxuXG5leHBvcnQgY29uc3QgaXRlbXNQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxcbiAgV2Vhck9zTGlzdFZpZXdCYXNlLFxuICBhbnlbXSB8IEl0ZW1zU291cmNlXG4+KHtcbiAgbmFtZTogJ2l0ZW1zJyxcbiAgdmFsdWVDaGFuZ2VkOiAodGFyZ2V0LCBvbGRWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55KSA9PiB7XG4gICAgaWYgKG9sZFZhbHVlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZSkge1xuICAgICAgcmVtb3ZlV2Vha0V2ZW50TGlzdGVuZXIoXG4gICAgICAgIG9sZFZhbHVlLFxuICAgICAgICBPYnNlcnZhYmxlQXJyYXkuY2hhbmdlRXZlbnQsXG4gICAgICAgIHRhcmdldC5fdXBkYXRlTmF0aXZlSXRlbXMsXG4gICAgICAgIHRhcmdldFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAobmV3VmFsdWUgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICBhZGRXZWFrRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgbmV3VmFsdWUsXG4gICAgICAgIE9ic2VydmFibGVBcnJheS5jaGFuZ2VFdmVudCxcbiAgICAgICAgdGFyZ2V0Ll91cGRhdGVOYXRpdmVJdGVtcyxcbiAgICAgICAgdGFyZ2V0XG4gICAgICApO1xuICAgIH1cbiAgICB0YXJnZXQucmVmcmVzaCgpO1xuICB9XG59KTtcbml0ZW1zUHJvcGVydHkucmVnaXN0ZXIoV2Vhck9zTGlzdFZpZXdCYXNlKTtcblxuZXhwb3J0IGNvbnN0IGl0ZW1UZW1wbGF0ZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFxuICBXZWFyT3NMaXN0Vmlld0Jhc2UsXG4gIHN0cmluZyB8IFRlbXBsYXRlXG4+KHtcbiAgbmFtZTogJ2l0ZW1UZW1wbGF0ZScsXG4gIGFmZmVjdHNMYXlvdXQ6IHRydWUsXG4gIHZhbHVlQ2hhbmdlZDogdGFyZ2V0ID0+IHtcbiAgICB0YXJnZXQucmVmcmVzaCgpO1xuICB9XG59KTtcbml0ZW1UZW1wbGF0ZVByb3BlcnR5LnJlZ2lzdGVyKFdlYXJPc0xpc3RWaWV3QmFzZSk7XG5cbmV4cG9ydCBjb25zdCBpdGVtVGVtcGxhdGVzUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8XG4gIFdlYXJPc0xpc3RWaWV3QmFzZSxcbiAgc3RyaW5nIHwgQXJyYXk8S2V5ZWRUZW1wbGF0ZT5cbj4oe1xuICBuYW1lOiAnaXRlbVRlbXBsYXRlcycsXG4gIGFmZmVjdHNMYXlvdXQ6IHRydWUsXG4gIHZhbHVlQ29udmVydGVyOiB2YWx1ZSA9PiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBwYXJzZU11bHRpcGxlVGVtcGxhdGVzKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59KTtcbml0ZW1UZW1wbGF0ZXNQcm9wZXJ0eS5yZWdpc3RlcihXZWFyT3NMaXN0Vmlld0Jhc2UpO1xuXG5leHBvcnQgY29uc3QgbGF5b3V0VHlwZVByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFdlYXJPc0xpc3RWaWV3QmFzZSwgTGF5b3V0VHlwZT4oe1xuICBuYW1lOiAnbGF5b3V0VHlwZScsXG4gIGFmZmVjdHNMYXlvdXQ6IHRydWVcbn0pO1xubGF5b3V0VHlwZVByb3BlcnR5LnJlZ2lzdGVyKFdlYXJPc0xpc3RWaWV3QmFzZSk7XG5cbmV4cG9ydCBjb25zdCBzcGFuQ291bnRQcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eTxXZWFyT3NMaXN0Vmlld0Jhc2UsIG51bWJlcj4oe1xuICBuYW1lOiAnc3BhbkNvdW50JyxcbiAgZGVmYXVsdFZhbHVlOiAxLFxuICBhZmZlY3RzTGF5b3V0OiB0cnVlLFxuICB2YWx1ZUNvbnZlcnRlcjogdiA9PiBwYXJzZUludCh2LCAxMClcbn0pO1xuc3BhbkNvdW50UHJvcGVydHkucmVnaXN0ZXIoV2Vhck9zTGlzdFZpZXdCYXNlKTtcblxuY29uc3QgZGVmYXVsdEl0ZW1XaWR0aDogUGVyY2VudExlbmd0aCA9ICdhdXRvJztcbmV4cG9ydCBjb25zdCBpdGVtV2lkdGhQcm9wZXJ0eSA9IG5ldyBDb2VyY2libGVQcm9wZXJ0eTxcbiAgV2Vhck9zTGlzdFZpZXdCYXNlLFxuICBQZXJjZW50TGVuZ3RoXG4+KHtcbiAgbmFtZTogJ2l0ZW1XaWR0aCcsXG4gIGFmZmVjdHNMYXlvdXQ6IHRydWUsXG4gIGRlZmF1bHRWYWx1ZTogeyB2YWx1ZTogMSwgdW5pdDogJyUnIH0sXG4gIGVxdWFsaXR5Q29tcGFyZXI6IFBlcmNlbnRMZW5ndGguZXF1YWxzLFxuICB2YWx1ZUNvbnZlcnRlcjogUGVyY2VudExlbmd0aC5wYXJzZSxcbiAgY29lcmNlVmFsdWU6ICh0YXJnZXQsIHZhbHVlKSA9PiB7XG4gICAgLy8gV2UgY29lcmNlIHRvIGRlZmF1bHQgdmFsdWUgaWYgd2UgZG9uJ3QgaGF2ZSBkaXNwbGF5IGRlbnNpdHkuXG4gICAgcmV0dXJuIHRhcmdldC5uYXRpdmVWaWV3ID8gdmFsdWUgOiBkZWZhdWx0SXRlbVdpZHRoO1xuICB9LFxuICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZTogYW55KSA9PiB7XG4gICAgdGFyZ2V0Ll9pdGVtV2lkdGggPSBuZXdWYWx1ZTtcbiAgICB0YXJnZXQuX2VmZmVjdGl2ZUl0ZW1XaWR0aCA9IFBlcmNlbnRMZW5ndGgudG9EZXZpY2VQaXhlbHMoXG4gICAgICBuZXdWYWx1ZSxcbiAgICAgIGF1dG9FZmZlY3RpdmVJdGVtV2lkdGgsXG4gICAgICB0YXJnZXQuX2lubmVyV2lkdGhcbiAgICApO1xuICAgIHRhcmdldC5yZWZyZXNoKCk7XG4gIH1cbn0pO1xuaXRlbVdpZHRoUHJvcGVydHkucmVnaXN0ZXIoV2Vhck9zTGlzdFZpZXdCYXNlKTtcblxuY29uc3QgZGVmYXVsdEl0ZW1IZWlnaHQ6IFBlcmNlbnRMZW5ndGggPSAnYXV0byc7XG5leHBvcnQgY29uc3QgaXRlbUhlaWdodFByb3BlcnR5ID0gbmV3IENvZXJjaWJsZVByb3BlcnR5PFxuICBXZWFyT3NMaXN0Vmlld0Jhc2UsXG4gIFBlcmNlbnRMZW5ndGhcbj4oe1xuICBuYW1lOiAnaXRlbUhlaWdodCcsXG4gIGFmZmVjdHNMYXlvdXQ6IHRydWUsXG4gIGRlZmF1bHRWYWx1ZTogeyB2YWx1ZTogMC4yLCB1bml0OiAnJScgfSxcbiAgY29lcmNlVmFsdWU6ICh0YXJnZXQsIHZhbHVlKSA9PiB7XG4gICAgLy8gV2UgY29lcmNlIHRvIGRlZmF1bHQgdmFsdWUgaWYgd2UgZG9uJ3QgaGF2ZSBkaXNwbGF5IGRlbnNpdHkuXG4gICAgcmV0dXJuIHRhcmdldC5uYXRpdmVWaWV3ID8gdmFsdWUgOiBkZWZhdWx0SXRlbUhlaWdodDtcbiAgfSxcbiAgZXF1YWxpdHlDb21wYXJlcjogUGVyY2VudExlbmd0aC5lcXVhbHMsXG4gIHZhbHVlQ29udmVydGVyOiBQZXJjZW50TGVuZ3RoLnBhcnNlLFxuICB2YWx1ZUNoYW5nZWQ6ICh0YXJnZXQsIG9sZFZhbHVlLCBuZXdWYWx1ZSkgPT4ge1xuICAgIHRhcmdldC5faXRlbUhlaWdodCA9IG5ld1ZhbHVlO1xuICAgIHRhcmdldC5fZWZmZWN0aXZlSXRlbUhlaWdodCA9IFBlcmNlbnRMZW5ndGgudG9EZXZpY2VQaXhlbHMoXG4gICAgICBuZXdWYWx1ZSxcbiAgICAgIGF1dG9FZmZlY3RpdmVJdGVtSGVpZ2h0LFxuICAgICAgdGFyZ2V0Ll9pbm5lckhlaWdodFxuICAgICk7XG4gICAgdGFyZ2V0LnJlZnJlc2goKTtcbiAgfVxufSk7XG5cbml0ZW1IZWlnaHRQcm9wZXJ0eS5yZWdpc3RlcihXZWFyT3NMaXN0Vmlld0Jhc2UpO1xuXG5jb25zdCBjb252ZXJ0ZXIgPSBtYWtlUGFyc2VyPE9yaWVudGF0aW9uPihcbiAgbWFrZVZhbGlkYXRvcignaG9yaXpvbnRhbCcsICd2ZXJ0aWNhbCcpXG4pO1xuZXhwb3J0IGNvbnN0IG9yaWVudGF0aW9uUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8XG4gIFdlYXJPc0xpc3RWaWV3QmFzZSxcbiAgT3JpZW50YXRpb25cbj4oe1xuICBuYW1lOiAnb3JpZW50YXRpb24nLFxuICBkZWZhdWx0VmFsdWU6ICd2ZXJ0aWNhbCcsXG4gIGFmZmVjdHNMYXlvdXQ6IHRydWUsXG4gIHZhbHVlQ2hhbmdlZDogKFxuICAgIHRhcmdldDogV2Vhck9zTGlzdFZpZXdCYXNlLFxuICAgIG9sZFZhbHVlOiBPcmllbnRhdGlvbixcbiAgICBuZXdWYWx1ZTogT3JpZW50YXRpb25cbiAgKSA9PiB7XG4gICAgdGFyZ2V0LnJlZnJlc2goKTtcbiAgfSxcbiAgdmFsdWVDb252ZXJ0ZXI6IGNvbnZlcnRlclxufSk7XG5cbm9yaWVudGF0aW9uUHJvcGVydHkucmVnaXN0ZXIoV2Vhck9zTGlzdFZpZXdCYXNlKTtcblxuZXhwb3J0IGNvbnN0IG1heFByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFdlYXJPc0xpc3RWaWV3QmFzZSwgUGVyY2VudExlbmd0aD4oe1xuICBuYW1lOiAnbWF4JyxcbiAgYWZmZWN0c0xheW91dDogdHJ1ZSxcbiAgZGVmYXVsdFZhbHVlOiB7IHZhbHVlOiAxLCB1bml0OiAnJScgfSxcbiAgZXF1YWxpdHlDb21wYXJlcjogUGVyY2VudExlbmd0aC5lcXVhbHMsXG4gIHZhbHVlQ29udmVydGVyOiBQZXJjZW50TGVuZ3RoLnBhcnNlXG59KTtcblxubWF4UHJvcGVydHkucmVnaXN0ZXIoV2Vhck9zTGlzdFZpZXdCYXNlKTtcblxuZXhwb3J0IGNvbnN0IG1pblByb3BlcnR5ID0gbmV3IFByb3BlcnR5PFdlYXJPc0xpc3RWaWV3QmFzZSwgUGVyY2VudExlbmd0aD4oe1xuICBuYW1lOiAnbWluJyxcbiAgYWZmZWN0c0xheW91dDogdHJ1ZSxcbiAgZGVmYXVsdFZhbHVlOiB7IHZhbHVlOiAxIC8gMywgdW5pdDogJyUnIH0sXG4gIGVxdWFsaXR5Q29tcGFyZXI6IFBlcmNlbnRMZW5ndGguZXF1YWxzLFxuICB2YWx1ZUNvbnZlcnRlcjogUGVyY2VudExlbmd0aC5wYXJzZVxufSk7XG5cbm1pblByb3BlcnR5LnJlZ2lzdGVyKFdlYXJPc0xpc3RWaWV3QmFzZSk7XG5cbmV4cG9ydCBjb25zdCBoaWRlU2Nyb2xsQmFyUHJvcGVydHkgPSBuZXcgUHJvcGVydHk8V2Vhck9zTGlzdFZpZXdCYXNlLCBib29sZWFuPih7XG4gIG5hbWU6ICdoaWRlU2Nyb2xsQmFyJ1xufSk7XG5oaWRlU2Nyb2xsQmFyUHJvcGVydHkucmVnaXN0ZXIoV2Vhck9zTGlzdFZpZXdCYXNlKTtcblxuZXhwb3J0IGNvbnN0IGNpcmN1bGFyU2Nyb2xsaW5nRW5hYmxlZCA9IG5ldyBQcm9wZXJ0eTxcbiAgV2Vhck9zTGlzdFZpZXdCYXNlLFxuICBib29sZWFuXG4+KHtcbiAgbmFtZTogJ2NpcmN1bGFyU2Nyb2xsaW5nRW5hYmxlZCcsXG4gIGRlZmF1bHRWYWx1ZTogZmFsc2Vcbn0pO1xuY2lyY3VsYXJTY3JvbGxpbmdFbmFibGVkLnJlZ2lzdGVyKFdlYXJPc0xpc3RWaWV3QmFzZSk7XG4iXX0=