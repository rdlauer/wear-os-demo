"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable/observable");
var utils_1 = require("tns-core-modules/utils/utils");
var tns_custom_scrolling_layout_callback_1 = require("./tns-custom-scrolling-layout-callback");
var tns_wear_os_adapter_1 = require("./tns-wear-os-adapter");
var tns_wearable_recyclerview_1 = require("./tns-wearable-recyclerview");
var BASE = require("./wear-os-listview-base");
__export(require("./wear-os-listview-base"));
var WearOsListView = (function (_super) {
    __extends(WearOsListView, _super);
    function WearOsListView() {
        var _this = _super.call(this) || this;
        _this.circularScrollingEnabled = false;
        _this._realizedItems = new Map();
        _this._androidViewId = -1;
        return _this;
    }
    Object.defineProperty(WearOsListView.prototype, "android", {
        get: function () {
            return this.listView;
        },
        enumerable: true,
        configurable: true
    });
    WearOsListView.prototype.createNativeView = function () {
        this._itemsSelected = [];
        this._staggeredMap = new Map();
        this._random = new java.util.Random();
        this.listView = new tns_wearable_recyclerview_1.TNS_WearableRecyclerView(this._context, new WeakRef(this));
        return this.listView;
    };
    WearOsListView.prototype.initNativeView = function () {
        _super.prototype.initNativeView.call(this);
        var that = new WeakRef(this);
        this.nativeViewProtected.setEnabled(false);
        if (this._androidViewId < 0) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this.nativeViewProtected.setId(this._androidViewId);
        this.listView.setEdgeItemsCenteringEnabled(true);
        tns_wear_os_adapter_1.ensureWearOsListViewAdapterClass();
        var adapter = new tns_wear_os_adapter_1.TNS_WearOsListViewAdapterClass(new WeakRef(this));
        adapter.owner = that;
        adapter.setHasStableIds(true);
        this.listView.setAdapter(adapter);
        this.listView.adapter = adapter;
        var androidConfig = utils_1.ad.getApplicationContext()
            .getResources()
            .getConfiguration();
        var isCircleWatch = androidConfig.isScreenRound();
        if (isCircleWatch === true) {
            var customScrollingLayoutCallback = new tns_custom_scrolling_layout_callback_1.TNS_CustomScrollingLayoutCallback();
            this.listView.setLayoutManager(new android.support.wear.widget.WearableLinearLayoutManager(this._context, customScrollingLayoutCallback));
        }
        else {
            this.listView.setLayoutManager(new android.support.wear.widget.WearableLinearLayoutManager(this._context));
        }
        if (this.circularScrollingEnabled === true) {
            this.listView.setCircularScrollingGestureEnabled(true);
        }
        var params = new android.support.v7.widget.RecyclerView.LayoutParams(android.support.v7.widget.RecyclerView.LayoutParams.MATCH_PARENT, android.support.v7.widget.RecyclerView.LayoutParams.MATCH_PARENT);
        this.listView.setLayoutParams(params);
        this.listView.setVerticalScrollBarEnabled(true);
        this.listView.setScrollBarSize(20);
        BASE.itemWidthProperty.coerce(this);
        BASE.itemHeightProperty.coerce(this);
    };
    WearOsListView.prototype.disposeNativeView = function () {
        var nativeView = this.nativeViewProtected;
        nativeView.setAdapter(null);
        this.eachChildView(function (view) {
            if (view && view.parent) {
                view.parent._removeView(view);
            }
            return true;
        });
        nativeView.adapter.owner = null;
        this._clearRealizedCells();
        _super.prototype.disposeNativeView.call(this);
    };
    WearOsListView.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        this.requestLayout();
    };
    WearOsListView.prototype.onLayout = function (left, top, right, bottom) {
        _super.prototype.onLayout.call(this, left, top, right, bottom);
        this.refresh();
    };
    WearOsListView.prototype.refresh = function () {
        var nativeView = this.listView;
        if (!nativeView || !nativeView.getAdapter()) {
            return;
        }
        this._realizedItems.forEach(function (view, nativeView) {
            if (!(view.bindingContext instanceof observable_1.Observable)) {
                view.bindingContext = null;
            }
        });
        nativeView.getAdapter().notifyDataSetChanged();
    };
    WearOsListView.prototype.scrollToIndex = function (index) {
        var nativeView = this.nativeViewProtected;
        if (nativeView) {
            nativeView.setSelection(index);
        }
    };
    WearOsListView.prototype.scrollToIndexAnimated = function (index) {
        var nativeView = this.nativeViewProtected;
        if (nativeView) {
            nativeView.smoothScrollToPosition(index);
        }
    };
    Object.defineProperty(WearOsListView.prototype, "_childrenCount", {
        get: function () {
            return this._realizedItems.size;
        },
        enumerable: true,
        configurable: true
    });
    WearOsListView.prototype.eachChildView = function (callback) {
        this._realizedItems.forEach(function (view, nativeView) {
            if (view.parent instanceof WearOsListView) {
                callback(view);
            }
            else {
                if (view.parent) {
                    callback(view.parent);
                }
            }
        });
    };
    WearOsListView.prototype._clearRealizedCells = function () {
        var _this = this;
        this._realizedItems.forEach(function (view, nativeView) {
            if (view.parent) {
                if (!(view.parent instanceof WearOsListView)) {
                    _this._removeView(view.parent);
                }
                view.parent._removeView(view);
            }
        });
        this._realizedItems.clear();
        this._staggeredMap.clear();
    };
    WearOsListView.prototype[BASE.itemTemplatesProperty.getDefault] = function () {
        return null;
    };
    WearOsListView.prototype[BASE.itemTemplatesProperty.setNative] = function (value) {
        this._itemTemplatesInternal = new Array(this._defaultTemplate);
        if (value) {
            this._itemTemplatesInternal = this._itemTemplatesInternal.concat(value);
        }
        this.listView.setAdapter(new tns_wear_os_adapter_1.TNS_WearOsListViewAdapterClass(new WeakRef(this)));
        this.refresh();
    };
    WearOsListView.itemLoadingEvent = BASE.ITEMLOADING;
    WearOsListView.itemTapEvent = BASE.ITEMTAP;
    return WearOsListView;
}(BASE.WearOsListViewBase));
exports.WearOsListView = WearOsListView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vhci1vcy1saXN0dmlldy5hbmRyb2lkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2Vhci1vcy1saXN0dmlldy5hbmRyb2lkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMEVBQXlFO0FBRXpFLHNEQUFrRDtBQUNsRCwrRkFBMkY7QUFDM0YsNkRBQXlHO0FBQ3pHLHlFQUF1RTtBQUN2RSw4Q0FBZ0Q7QUFHaEQsNkNBQXdDO0FBRXhDO0lBQW9DLGtDQUF1QjtJQXVCekQ7UUFBQSxZQUNFLGlCQUFPLFNBQ1I7UUFwQkQsOEJBQXdCLEdBQVksS0FBSyxDQUFDO1FBUTFDLG9CQUFjLEdBQUcsSUFBSSxHQUFHLEVBQTJCLENBQUM7UUFJNUMsb0JBQWMsR0FBVyxDQUFDLENBQUMsQ0FBQzs7SUFRcEMsQ0FBQztJQU5ELHNCQUFJLG1DQUFPO2FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFNTSx5Q0FBZ0IsR0FBdkI7UUFDRSxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxvREFBd0IsQ0FDMUMsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FDbEIsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sdUNBQWMsR0FBckI7UUFDRSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztRQUN2QixJQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvQixJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FB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QUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELHlCQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsR0FBdkM7UUFDRSxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCx5QkFBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLEdBQXRDLFVBQXVDLEtBQXNCO1FBQzNELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLEtBQUssQ0FDckMsSUFBSSxDQUFDLGdCQUFnQixDQUN0QixDQUFDO1FBQ0YsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6RTtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUN0QixJQUFJLG9EQUE4QixDQUFDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQ3RELENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQWhOTSwrQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQ3BDLDJCQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQWdOckMscUJBQUM7Q0FBQSxBQWxORCxDQUFvQyxJQUFJLENBQUMsa0JBQWtCLEdBa04xRDtBQWxOWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IEtleWVkVGVtcGxhdGUsIFBlcmNlbnRMZW5ndGgsIFRlbXBsYXRlLCBWaWV3IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXcnO1xuaW1wb3J0IHsgYWQgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3V0aWxzL3V0aWxzJztcbmltcG9ydCB7IFROU19DdXN0b21TY3JvbGxpbmdMYXlvdXRDYWxsYmFjayB9IGZyb20gJy4vdG5zLWN1c3RvbS1zY3JvbGxpbmctbGF5b3V0LWNhbGxiYWNrJztcbmltcG9ydCB7IGVuc3VyZVdlYXJPc0xpc3RWaWV3QWRhcHRlckNsYXNzLCBUTlNfV2Vhck9zTGlzdFZpZXdBZGFwdGVyQ2xhc3MgfSBmcm9tICcuL3Rucy13ZWFyLW9zLWFkYXB0ZXInO1xuaW1wb3J0IHsgVE5TX1dlYXJhYmxlUmVjeWNsZXJWaWV3IH0gZnJvbSAnLi90bnMtd2VhcmFibGUtcmVjeWNsZXJ2aWV3JztcbmltcG9ydCAqIGFzIEJBU0UgZnJvbSAnLi93ZWFyLW9zLWxpc3R2aWV3LWJhc2UnO1xuXG4vLyBOZWVkIHRvIG1ha2Ugc3VyZSB0aGUgYmFzZSBpcyBhbGwgZXhwb3NlZFxuZXhwb3J0ICogZnJvbSAnLi93ZWFyLW9zLWxpc3R2aWV3LWJhc2UnO1xuXG5leHBvcnQgY2xhc3MgV2Vhck9zTGlzdFZpZXcgZXh0ZW5kcyBCQVNFLldlYXJPc0xpc3RWaWV3QmFzZSB7XG4gIHN0YXRpYyBpdGVtTG9hZGluZ0V2ZW50ID0gQkFTRS5JVEVNTE9BRElORztcbiAgc3RhdGljIGl0ZW1UYXBFdmVudCA9IEJBU0UuSVRFTVRBUDtcbiAgbmF0aXZlVmlld1Byb3RlY3RlZDogYW55O1xuICBsaXN0VmlldzogVE5TX1dlYXJhYmxlUmVjeWNsZXJWaWV3O1xuICBjaXJjdWxhclNjcm9sbGluZ0VuYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgX2l0ZW1XaWR0aDogYW55O1xuICBfaXRlbUhlaWdodDogYW55O1xuICBpdGVtV2lkdGg6IFBlcmNlbnRMZW5ndGg7XG4gIGl0ZW1IZWlnaHQ6IFBlcmNlbnRMZW5ndGg7XG4gIHNwYW5Db3VudDogbnVtYmVyO1xuICBpdGVtczogYW55W10gfCBCQVNFLkl0ZW1zU291cmNlO1xuICBpdGVtVGVtcGxhdGU6IHN0cmluZyB8IFRlbXBsYXRlO1xuICBfcmVhbGl6ZWRJdGVtcyA9IG5ldyBNYXA8YW5kcm9pZC52aWV3LlZpZXcsIFZpZXc+KCk7XG4gIF9yYW5kb206IGphdmEudXRpbC5SYW5kb207XG4gIF9pdGVtc1NlbGVjdGVkOiBhbnlbXTtcbiAgX3N0YWdnZXJlZE1hcDogTWFwPG51bWJlciwgbnVtYmVyPjtcbiAgcHJpdmF0ZSBfYW5kcm9pZFZpZXdJZDogbnVtYmVyID0gLTE7XG5cbiAgZ2V0IGFuZHJvaWQoKTogVE5TX1dlYXJhYmxlUmVjeWNsZXJWaWV3IHtcbiAgICByZXR1cm4gdGhpcy5saXN0VmlldztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlTmF0aXZlVmlldygpIHtcbiAgICB0aGlzLl9pdGVtc1NlbGVjdGVkID0gW107XG4gICAgdGhpcy5fc3RhZ2dlcmVkTWFwID0gbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKTtcbiAgICB0aGlzLl9yYW5kb20gPSBuZXcgamF2YS51dGlsLlJhbmRvbSgpO1xuICAgIHRoaXMubGlzdFZpZXcgPSBuZXcgVE5TX1dlYXJhYmxlUmVjeWNsZXJWaWV3KFxuICAgICAgdGhpcy5fY29udGV4dCxcbiAgICAgIG5ldyBXZWFrUmVmKHRoaXMpXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLmxpc3RWaWV3O1xuICB9XG5cbiAgcHVibGljIGluaXROYXRpdmVWaWV3KCkge1xuICAgIHN1cGVyLmluaXROYXRpdmVWaWV3KCk7XG4gICAgY29uc3QgdGhhdCA9IG5ldyBXZWFrUmVmKHRoaXMpO1xuXG4gICAgdGhpcy5uYXRpdmVWaWV3UHJvdGVjdGVkLnNldEVuYWJsZWQoZmFsc2UpO1xuXG4gICAgaWYgKHRoaXMuX2FuZHJvaWRWaWV3SWQgPCAwKSB7XG4gICAgICB0aGlzLl9hbmRyb2lkVmlld0lkID0gYW5kcm9pZC52aWV3LlZpZXcuZ2VuZXJhdGVWaWV3SWQoKTtcbiAgICB9XG4gICAgdGhpcy5uYXRpdmVWaWV3UHJvdGVjdGVkLnNldElkKHRoaXMuX2FuZHJvaWRWaWV3SWQpO1xuXG4gICAgLy8gVG8gYWxpZ24gdGhlIGVkZ2UgY2hpbGRyZW4gKGZpcnN0IGFuZCBsYXN0KSB3aXRoIHRoZSBjZW50ZXIgb2YgdGhlIHNjcmVlblxuICAgIHRoaXMubGlzdFZpZXcuc2V0RWRnZUl0ZW1zQ2VudGVyaW5nRW5hYmxlZCh0cnVlKTtcblxuICAgIGVuc3VyZVdlYXJPc0xpc3RWaWV3QWRhcHRlckNsYXNzKCk7XG4gICAgY29uc3QgYWRhcHRlciA9IG5ldyBUTlNfV2Vhck9zTGlzdFZpZXdBZGFwdGVyQ2xhc3MobmV3IFdlYWtSZWYodGhpcykpO1xuICAgIGFkYXB0ZXIub3duZXIgPSB0aGF0O1xuICAgIGFkYXB0ZXIuc2V0SGFzU3RhYmxlSWRzKHRydWUpO1xuICAgIHRoaXMubGlzdFZpZXcuc2V0QWRhcHRlcihhZGFwdGVyKTtcbiAgICAoPGFueT50aGlzLmxpc3RWaWV3KS5hZGFwdGVyID0gYWRhcHRlcjtcblxuICAgIC8vIE9ubHkgc3F1YXJlIHdhdGNoZXMgeW91IHR5cGljYWxseSBkb24ndCB3YW50IHRvIHVzZSB0aGUgY3VzdG9tIGxheW91dCBzY2FsaW5nIGZvciBpdGVtcyB0byByb3RhdGUgYXJvdW5kIHRoZSBjaXJjbGVcbiAgICAvLyBzbyB3ZSdsbCBjaGVjayBpZiB0aGUgZGV2aWNlIHNjcmVlbiBpcyByb3VuZCBvciBub3RcbiAgICBjb25zdCBhbmRyb2lkQ29uZmlnID0gKGFkLmdldEFwcGxpY2F0aW9uQ29udGV4dCgpIGFzIGFuZHJvaWQuY29udGVudC5Db250ZXh0KVxuICAgICAgLmdldFJlc291cmNlcygpXG4gICAgICAuZ2V0Q29uZmlndXJhdGlvbigpO1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLmFuZHJvaWQuY29tL3JlZmVyZW5jZS9hbmRyb2lkL2NvbnRlbnQvcmVzL0NvbmZpZ3VyYXRpb24uaHRtbCNpc1NjcmVlblJvdW5kKClcbiAgICBjb25zdCBpc0NpcmNsZVdhdGNoID0gKGFuZHJvaWRDb25maWcgYXMgYW55KS5pc1NjcmVlblJvdW5kKCk7XG5cbiAgICBpZiAoaXNDaXJjbGVXYXRjaCA9PT0gdHJ1ZSkge1xuICAgICAgLy8gY3JlYXRlIHRoZSBjdXN0b20gc2Nyb2xsaW5nIGxheW91dCBjYWxsYmFjayAtIHRoaXMgaXMgaG93IHRoZSBpdGVtcyBhcmUgc2NhbGVkL2FuaW1hdGVkIG9uIHNjcm9sbGluZ1xuICAgICAgY29uc3QgY3VzdG9tU2Nyb2xsaW5nTGF5b3V0Q2FsbGJhY2sgPSBuZXcgVE5TX0N1c3RvbVNjcm9sbGluZ0xheW91dENhbGxiYWNrKCk7XG4gICAgICB0aGlzLmxpc3RWaWV3LnNldExheW91dE1hbmFnZXIoXG4gICAgICAgIG5ldyAoYW5kcm9pZC5zdXBwb3J0LndlYXIud2lkZ2V0LldlYXJhYmxlTGluZWFyTGF5b3V0TWFuYWdlciBhcyBhbnkpKFxuICAgICAgICAgIHRoaXMuX2NvbnRleHQsXG4gICAgICAgICAgY3VzdG9tU2Nyb2xsaW5nTGF5b3V0Q2FsbGJhY2tcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbm9ybWFsIGxheW91dCBtYW5hZ2VyIHdpdGggbm8gYW5pbWF0aW9uIG9uIHNxdWFyZSB3YXRjaGVzXG4gICAgICB0aGlzLmxpc3RWaWV3LnNldExheW91dE1hbmFnZXIoXG4gICAgICAgIG5ldyAoYW5kcm9pZC5zdXBwb3J0LndlYXIud2lkZ2V0LldlYXJhYmxlTGluZWFyTGF5b3V0TWFuYWdlciBhcyBhbnkpKFxuICAgICAgICAgIHRoaXMuX2NvbnRleHRcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBCeSBkZWZhdWx0LCBjaXJjdWxhciBzY3JvbGxpbmcgaXMgZGlzYWJsZWQgaW4gdGhlIFdlYXJhYmxlUmVjeWNsZXJWaWV3LiBJZiB5b3Ugd2FudCB0byBlbmFibGUgYSBjaXJjdWxhciBzY3JvbGxpbmcgZ2VzdHVyZSBpbiB5b3VyIGNoaWxkIHZpZXcsIHVzZSB0aGUgV2VhcmFibGVSZWN5Y2xlclZpZXfigJlzIHNldENpcmN1bGFyU2Nyb2xsaW5nR2VzdHVyZUVuYWJsZWQoKSBtZXRob2QuXG4gICAgaWYgKHRoaXMuY2lyY3VsYXJTY3JvbGxpbmdFbmFibGVkID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmxpc3RWaWV3LnNldENpcmN1bGFyU2Nyb2xsaW5nR2VzdHVyZUVuYWJsZWQodHJ1ZSk7XG4gICAgfVxuXG4gICAgY29uc3QgcGFyYW1zID0gbmV3IGFuZHJvaWQuc3VwcG9ydC52Ny53aWRnZXQuUmVjeWNsZXJWaWV3LkxheW91dFBhcmFtcyhcbiAgICAgIGFuZHJvaWQuc3VwcG9ydC52Ny53aWRnZXQuUmVjeWNsZXJWaWV3LkxheW91dFBhcmFtcy5NQVRDSF9QQVJFTlQsXG4gICAgICBhbmRyb2lkLnN1cHBvcnQudjcud2lkZ2V0LlJlY3ljbGVyVmlldy5MYXlvdXRQYXJhbXMuTUFUQ0hfUEFSRU5UXG4gICAgKTtcbiAgICB0aGlzLmxpc3RWaWV3LnNldExheW91dFBhcmFtcyhwYXJhbXMpO1xuXG4gICAgdGhpcy5saXN0Vmlldy5zZXRWZXJ0aWNhbFNjcm9sbEJhckVuYWJsZWQodHJ1ZSk7XG4gICAgdGhpcy5saXN0Vmlldy5zZXRTY3JvbGxCYXJTaXplKDIwKTtcblxuICAgIEJBU0UuaXRlbVdpZHRoUHJvcGVydHkuY29lcmNlKHRoaXMpO1xuICAgIEJBU0UuaXRlbUhlaWdodFByb3BlcnR5LmNvZXJjZSh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBkaXNwb3NlTmF0aXZlVmlldygpIHtcbiAgICBjb25zdCBuYXRpdmVWaWV3ID0gdGhpcy5uYXRpdmVWaWV3UHJvdGVjdGVkO1xuICAgIG5hdGl2ZVZpZXcuc2V0QWRhcHRlcihudWxsKTtcblxuICAgIHRoaXMuZWFjaENoaWxkVmlldyh2aWV3ID0+IHtcbiAgICAgIGlmICh2aWV3ICYmIHZpZXcucGFyZW50KSB7XG4gICAgICAgIHZpZXcucGFyZW50Ll9yZW1vdmVWaWV3KHZpZXcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gICAgLy8gKDxhbnk+bmF0aXZlVmlldykuaXRlbUNsaWNrTGlzdGVuZXIub3duZXIgPSBudWxsO1xuICAgICg8YW55Pm5hdGl2ZVZpZXcpLmFkYXB0ZXIub3duZXIgPSBudWxsO1xuICAgIHRoaXMuX2NsZWFyUmVhbGl6ZWRDZWxscygpO1xuICAgIHN1cGVyLmRpc3Bvc2VOYXRpdmVWaWV3KCk7XG4gIH1cblxuICBwdWJsaWMgb25Mb2FkZWQoKSB7XG4gICAgc3VwZXIub25Mb2FkZWQoKTtcbiAgICAvLyBXaXRob3V0IHRoaXMgY2FsbCBpdGVtQ2xpY2sgd29uJ3QgYmUgZmlyZWQuLi4gOihcbiAgICB0aGlzLnJlcXVlc3RMYXlvdXQoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkxheW91dChsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlcikge1xuICAgIHN1cGVyLm9uTGF5b3V0KGxlZnQsIHRvcCwgcmlnaHQsIGJvdHRvbSk7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICBwdWJsaWMgcmVmcmVzaCgpOiB2b2lkIHtcbiAgICBjb25zdCBuYXRpdmVWaWV3ID0gdGhpcy5saXN0VmlldztcbiAgICBpZiAoIW5hdGl2ZVZpZXcgfHwgIW5hdGl2ZVZpZXcuZ2V0QWRhcHRlcigpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGNsZWFyIGJpbmRpbmdDb250ZXh0IHdoZW4gaXQgaXMgbm90IG9ic2VydmFibGUgYmVjYXVzZSBvdGhlcndpc2UgYmluZGluZ3MgdG8gaXRlbXMgd29uJ3QgcmVldmFsdWF0ZVxuICAgIHRoaXMuX3JlYWxpemVkSXRlbXMuZm9yRWFjaCgodmlldywgbmF0aXZlVmlldykgPT4ge1xuICAgICAgaWYgKCEodmlldy5iaW5kaW5nQ29udGV4dCBpbnN0YW5jZW9mIE9ic2VydmFibGUpKSB7XG4gICAgICAgIHZpZXcuYmluZGluZ0NvbnRleHQgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIHRoaXMuc2V0TGF5b3V0VHlwZSh0aGlzLmxheW91dFR5cGUpO1xuICAgIC8vIHRoaXMubGlzdFZpZXcucmVxdWVzdExheW91dCgpO1xuICAgIG5hdGl2ZVZpZXcuZ2V0QWRhcHRlcigpLm5vdGlmeURhdGFTZXRDaGFuZ2VkKCk7XG4gIH1cblxuICBwdWJsaWMgc2Nyb2xsVG9JbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgY29uc3QgbmF0aXZlVmlldyA9IHRoaXMubmF0aXZlVmlld1Byb3RlY3RlZDtcbiAgICBpZiAobmF0aXZlVmlldykge1xuICAgICAgbmF0aXZlVmlldy5zZXRTZWxlY3Rpb24oaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzY3JvbGxUb0luZGV4QW5pbWF0ZWQoaW5kZXg6IG51bWJlcikge1xuICAgIGNvbnN0IG5hdGl2ZVZpZXcgPSB0aGlzLm5hdGl2ZVZpZXdQcm90ZWN0ZWQ7XG4gICAgaWYgKG5hdGl2ZVZpZXcpIHtcbiAgICAgIG5hdGl2ZVZpZXcuc21vb3RoU2Nyb2xsVG9Qb3NpdGlvbihpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IF9jaGlsZHJlbkNvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWxpemVkSXRlbXMuc2l6ZTtcbiAgfVxuXG4gIHB1YmxpYyBlYWNoQ2hpbGRWaWV3KGNhbGxiYWNrOiAoY2hpbGQ6IFZpZXcpID0+IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9yZWFsaXplZEl0ZW1zLmZvckVhY2goKHZpZXcsIG5hdGl2ZVZpZXcpID0+IHtcbiAgICAgIGlmICh2aWV3LnBhcmVudCBpbnN0YW5jZW9mIFdlYXJPc0xpc3RWaWV3KSB7XG4gICAgICAgIGNhbGxiYWNrKHZpZXcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaW4gc29tZSBjYXNlcyAobGlrZSBpdGVtIGlzIHVubG9hZGVkIGZyb20gYW5vdGhlciBwbGFjZSAobGlrZSBhbmd1bGFyKSB2aWV3LnBhcmVudCBiZWNvbWVzIHVuZGVmaW5lZClcbiAgICAgICAgaWYgKHZpZXcucGFyZW50KSB7XG4gICAgICAgICAgY2FsbGJhY2soPFZpZXc+dmlldy5wYXJlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9jbGVhclJlYWxpemVkQ2VsbHMoKTogdm9pZCB7XG4gICAgLy8gY2xlYXIgdGhlIGNhY2hlXG4gICAgdGhpcy5fcmVhbGl6ZWRJdGVtcy5mb3JFYWNoKCh2aWV3LCBuYXRpdmVWaWV3KSA9PiB7XG4gICAgICBpZiAodmlldy5wYXJlbnQpIHtcbiAgICAgICAgLy8gVGhpcyBpcyB0byBjbGVhciB0aGUgU3RhY2tMYXlvdXQgdGhhdCBpcyB1c2VkIHRvIHdyYXAgbm9uIExheW91dEJhc2UgJiBQcm94eVZpZXdDb250YWluZXIgaW5zdGFuY2VzLlxuICAgICAgICBpZiAoISh2aWV3LnBhcmVudCBpbnN0YW5jZW9mIFdlYXJPc0xpc3RWaWV3KSkge1xuICAgICAgICAgIHRoaXMuX3JlbW92ZVZpZXcodmlldy5wYXJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHZpZXcucGFyZW50Ll9yZW1vdmVWaWV3KHZpZXcpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5fcmVhbGl6ZWRJdGVtcy5jbGVhcigpO1xuICAgIHRoaXMuX3N0YWdnZXJlZE1hcC5jbGVhcigpO1xuICB9XG5cbiAgW0JBU0UuaXRlbVRlbXBsYXRlc1Byb3BlcnR5LmdldERlZmF1bHRdKCk6IEtleWVkVGVtcGxhdGVbXSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBbQkFTRS5pdGVtVGVtcGxhdGVzUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogS2V5ZWRUZW1wbGF0ZVtdKSB7XG4gICAgdGhpcy5faXRlbVRlbXBsYXRlc0ludGVybmFsID0gbmV3IEFycmF5PEtleWVkVGVtcGxhdGU+KFxuICAgICAgdGhpcy5fZGVmYXVsdFRlbXBsYXRlXG4gICAgKTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX2l0ZW1UZW1wbGF0ZXNJbnRlcm5hbCA9IHRoaXMuX2l0ZW1UZW1wbGF0ZXNJbnRlcm5hbC5jb25jYXQodmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLmxpc3RWaWV3LnNldEFkYXB0ZXIoXG4gICAgICBuZXcgVE5TX1dlYXJPc0xpc3RWaWV3QWRhcHRlckNsYXNzKG5ldyBXZWFrUmVmKHRoaXMpKVxuICAgICk7XG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cbn1cbiJdfQ==