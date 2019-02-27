"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var stack_layout_1 = require("tns-core-modules/ui/layouts/stack-layout");
var proxy_view_container_1 = require("tns-core-modules/ui/proxy-view-container");
var tns_wear_os_listview_holder_1 = require("./tns-wear-os-listview-holder");
var wear_os_listview_base_1 = require("./wear-os-listview-base");
function ensureWearOsListViewAdapterClass() {
    if (exports.TNS_WearOsListViewAdapterClass) {
        return;
    }
    var TNS_WearOsListViewAdapter = (function (_super) {
        __extends(TNS_WearOsListViewAdapter, _super);
        function TNS_WearOsListViewAdapter(owner) {
            var _this = _super.call(this) || this;
            _this.owner = owner;
            return global.__native(_this);
        }
        TNS_WearOsListViewAdapter.prototype.onCreateViewHolder = function (parent, viewType) {
            var owner = this.owner ? this.owner.get() : null;
            if (!owner) {
                return null;
            }
            var template = owner._itemTemplatesInternal[viewType];
            var view = template.createView() || owner._getDefaultItemContent(viewType);
            if (view instanceof view_1.View && !(view instanceof proxy_view_container_1.ProxyViewContainer)) {
                owner._addView(view);
            }
            else {
                var sp = new stack_layout_1.StackLayout();
                sp.addChild(view);
                owner._addView(sp);
            }
            owner._realizedItems.set(view.nativeView, view);
            return new tns_wear_os_listview_holder_1.TNS_WearOsListViewHolder(new WeakRef(view), new WeakRef(owner));
        };
        TNS_WearOsListViewAdapter.prototype.onBindViewHolder = function (holder, index) {
            var owner = this.owner ? this.owner.get() : null;
            if (owner) {
                var args = {
                    eventName: wear_os_listview_base_1.ITEMLOADING,
                    object: owner,
                    android: holder,
                    ios: undefined,
                    index: index,
                    view: holder.view
                };
                owner.notify(args);
                if (owner.layoutType === wear_os_listview_base_1.LayoutTypeOptions.STAGGERED) {
                    var random = void 0;
                    var max = wear_os_listview_base_1.layout.toDeviceIndependentPixels(owner._effectiveItemHeight);
                    var min = wear_os_listview_base_1.layout.toDeviceIndependentPixels(owner._effectiveItemHeight) *
                        (1 / 3);
                    if (min && max) {
                        if (owner._staggeredMap && owner._staggeredMap.has(index)) {
                            random = owner._staggeredMap.get(index);
                        }
                        else {
                            random =
                                owner._random.nextInt(max - min + min) +
                                    min;
                            if (!owner._staggeredMap) {
                                owner._staggeredMap = new Map();
                            }
                            owner._staggeredMap.set(index, random);
                        }
                        holder.view.height = random;
                    }
                }
                else {
                    if (owner._itemHeight) {
                        holder.view.height = wear_os_listview_base_1.layout.toDeviceIndependentPixels(owner._effectiveItemHeight);
                    }
                    if (owner._itemWidth) {
                        holder.view.width = wear_os_listview_base_1.layout.toDeviceIndependentPixels(owner._effectiveItemWidth);
                    }
                }
                owner._prepareItem(holder.view, index);
            }
        };
        TNS_WearOsListViewAdapter.prototype.getItemId = function (i) {
            var owner = this.owner ? this.owner.get() : null;
            var id = i;
            if (owner && owner.items) {
                var item = owner.items.getItem
                    ? owner.items.getItem(i)
                    : owner.items[i];
                if (item) {
                    id = owner.itemIdGenerator(item, i, owner.items);
                }
            }
            return long(id);
        };
        TNS_WearOsListViewAdapter.prototype.getItemCount = function () {
            var owner = this.owner ? this.owner.get() : null;
            return owner && owner.items && owner.items.length
                ? owner.items.length
                : 0;
        };
        TNS_WearOsListViewAdapter.prototype.getItemViewType = function (index) {
            var owner = this.owner ? this.owner.get() : null;
            if (owner) {
                var template = owner._getItemTemplate(index);
                return owner._itemTemplatesInternal.indexOf(template);
            }
            return 0;
        };
        return TNS_WearOsListViewAdapter;
    }(android.support.v7.widget.RecyclerView
        .Adapter));
    exports.TNS_WearOsListViewAdapterClass = TNS_WearOsListViewAdapter;
}
exports.ensureWearOsListViewAdapterClass = ensureWearOsListViewAdapterClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG5zLXdlYXItb3MtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRucy13ZWFyLW9zLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzREFBcUQ7QUFDckQseUVBQXVFO0FBQ3ZFLGlGQUE4RTtBQUM5RSw2RUFBeUU7QUFDekUsaUVBQWdHO0FBS2hHO0lBQ0UsSUFBSSxzQ0FBOEIsRUFBRTtRQUNsQyxPQUFPO0tBQ1I7SUFFRDtRQUF3Qyw2Q0FDekI7UUFHYixtQ0FBWSxLQUE4QjtZQUExQyxZQUNFLGlCQUFPLFNBR1I7WUFGQyxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUVNLHNEQUFrQixHQUF6QixVQUNFLE1BQThCLEVBQzlCLFFBQWdCO1lBRWhCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuRCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDRCxJQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEQsSUFBTSxJQUFJLEdBQ1IsUUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVsRSxJQUFJLElBQUksWUFBWSxXQUFJLElBQUksQ0FBQyxDQUFDLElBQUksWUFBWSx5Q0FBa0IsQ0FBQyxFQUFFO2dCQUNqRSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNMLElBQU0sRUFBRSxHQUFHLElBQUksMEJBQVcsRUFBRSxDQUFDO2dCQUM3QixFQUFFLENBQUMs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Q0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0MsT0FBTyxLQUFLLENBQUMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3ZEO1lBQ0QsT0FBTyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBQ0gsZ0NBQUM7SUFBRCxDQUFDLEFBekhELENBQXdDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZO1NBQzNFLE9BQU8sR0F3SFQ7SUFFRCxzQ0FBOEIsR0FBRyx5QkFBeUIsQ0FBQztBQUM3RCxDQUFDO0FBaklELDRFQWlJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlldyc7XG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXQnO1xuaW1wb3J0IHsgUHJveHlWaWV3Q29udGFpbmVyIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wcm94eS12aWV3LWNvbnRhaW5lcic7XG5pbXBvcnQgeyBUTlNfV2Vhck9zTGlzdFZpZXdIb2xkZXIgfSBmcm9tICcuL3Rucy13ZWFyLW9zLWxpc3R2aWV3LWhvbGRlcic7XG5pbXBvcnQgeyBJdGVtRXZlbnREYXRhLCBJVEVNTE9BRElORywgbGF5b3V0LCBMYXlvdXRUeXBlT3B0aW9ucyB9IGZyb20gJy4vd2Vhci1vcy1saXN0dmlldy1iYXNlJztcbmltcG9ydCB7IFdlYXJPc0xpc3RWaWV3IH0gZnJvbSAnLi93ZWFyLW9zLWxpc3R2aWV3LmFuZHJvaWQnO1xuXG5leHBvcnQgbGV0IFROU19XZWFyT3NMaXN0Vmlld0FkYXB0ZXJDbGFzcztcblxuZXhwb3J0IGZ1bmN0aW9uIGVuc3VyZVdlYXJPc0xpc3RWaWV3QWRhcHRlckNsYXNzKCkge1xuICBpZiAoVE5TX1dlYXJPc0xpc3RWaWV3QWRhcHRlckNsYXNzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY2xhc3MgVE5TX1dlYXJPc0xpc3RWaWV3QWRhcHRlciBleHRlbmRzIGFuZHJvaWQuc3VwcG9ydC52Ny53aWRnZXQuUmVjeWNsZXJWaWV3XG4gICAgLkFkYXB0ZXI8YW55PiB7XG4gICAgb3duZXI6IFdlYWtSZWY8V2Vhck9zTGlzdFZpZXc+O1xuXG4gICAgY29uc3RydWN0b3Iob3duZXI6IFdlYWtSZWY8V2Vhck9zTGlzdFZpZXc+KSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgICAgcmV0dXJuIGdsb2JhbC5fX25hdGl2ZSh0aGlzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DcmVhdGVWaWV3SG9sZGVyKFxuICAgICAgcGFyZW50OiBhbmRyb2lkLnZpZXcuVmlld0dyb3VwLFxuICAgICAgdmlld1R5cGU6IG51bWJlclxuICAgICkge1xuICAgICAgY29uc3Qgb3duZXIgPSB0aGlzLm93bmVyID8gdGhpcy5vd25lci5nZXQoKSA6IG51bGw7XG4gICAgICBpZiAoIW93bmVyKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgY29uc3QgdGVtcGxhdGUgPSBvd25lci5faXRlbVRlbXBsYXRlc0ludGVybmFsW3ZpZXdUeXBlXTtcbiAgICAgIGNvbnN0IHZpZXc6IFZpZXcgPVxuICAgICAgICB0ZW1wbGF0ZS5jcmVhdGVWaWV3KCkgfHwgb3duZXIuX2dldERlZmF1bHRJdGVtQ29udGVudCh2aWV3VHlwZSk7XG5cbiAgICAgIGlmICh2aWV3IGluc3RhbmNlb2YgVmlldyAmJiAhKHZpZXcgaW5zdGFuY2VvZiBQcm94eVZpZXdDb250YWluZXIpKSB7XG4gICAgICAgIG93bmVyLl9hZGRWaWV3KHZpZXcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc3AgPSBuZXcgU3RhY2tMYXlvdXQoKTtcbiAgICAgICAgc3AuYWRkQ2hpbGQodmlldyk7XG4gICAgICAgIG93bmVyLl9hZGRWaWV3KHNwKTtcbiAgICAgIH1cblxuICAgICAgb3duZXIuX3JlYWxpemVkSXRlbXMuc2V0KHZpZXcubmF0aXZlVmlldywgdmlldyk7XG5cbiAgICAgIHJldHVybiBuZXcgVE5TX1dlYXJPc0xpc3RWaWV3SG9sZGVyKFxuICAgICAgICBuZXcgV2Vha1JlZih2aWV3KSxcbiAgICAgICAgbmV3IFdlYWtSZWYob3duZXIpXG4gICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkJpbmRWaWV3SG9sZGVyKGhvbGRlcjogVE5TX1dlYXJPc0xpc3RWaWV3SG9sZGVyLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICBjb25zdCBvd25lciA9IHRoaXMub3duZXIgPyB0aGlzLm93bmVyLmdldCgpIDogbnVsbDtcbiAgICAgIGlmIChvd25lcikge1xuICAgICAgICBjb25zdCBhcmdzID0gPEl0ZW1FdmVudERhdGE+e1xuICAgICAgICAgIGV2ZW50TmFtZTogSVRFTUxPQURJTkcsXG4gICAgICAgICAgb2JqZWN0OiBvd25lcixcbiAgICAgICAgICBhbmRyb2lkOiBob2xkZXIsXG4gICAgICAgICAgaW9zOiB1bmRlZmluZWQsXG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgdmlldzogaG9sZGVyLnZpZXdcbiAgICAgICAgfTtcblxuICAgICAgICBvd25lci5ub3RpZnkoYXJncyk7XG5cbiAgICAgICAgaWYgKG93bmVyLmxheW91dFR5cGUgPT09IExheW91dFR5cGVPcHRpb25zLlNUQUdHRVJFRCkge1xuICAgICAgICAgIGxldCByYW5kb207XG4gICAgICAgICAgY29uc3QgbWF4ID0gbGF5b3V0LnRvRGV2aWNlSW5kZXBlbmRlbnRQaXhlbHMoXG4gICAgICAgICAgICBvd25lci5fZWZmZWN0aXZlSXRlbUhlaWdodFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgbWluID1cbiAgICAgICAgICAgIGxheW91dC50b0RldmljZUluZGVwZW5kZW50UGl4ZWxzKG93bmVyLl9lZmZlY3RpdmVJdGVtSGVpZ2h0KSAqXG4gICAgICAgICAgICAoMSAvIDMpO1xuICAgICAgICAgIGlmIChtaW4gJiYgbWF4KSB7XG4gICAgICAgICAgICBpZiAob3duZXIuX3N0YWdnZXJlZE1hcCAmJiBvd25lci5fc3RhZ2dlcmVkTWFwLmhhcyhpbmRleCkpIHtcbiAgICAgICAgICAgICAgcmFuZG9tID0gb3duZXIuX3N0YWdnZXJlZE1hcC5nZXQoaW5kZXgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmFuZG9tID1cbiAgICAgICAgICAgICAgICAob3duZXIuX3JhbmRvbSBhcyBqYXZhLnV0aWwuUmFuZG9tKS5uZXh0SW50KG1heCAtIG1pbiArIG1pbikgK1xuICAgICAgICAgICAgICAgIG1pbjtcbiAgICAgICAgICAgICAgaWYgKCFvd25lci5fc3RhZ2dlcmVkTWFwKSB7XG4gICAgICAgICAgICAgICAgb3duZXIuX3N0YWdnZXJlZE1hcCA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgb3duZXIuX3N0YWdnZXJlZE1hcC5zZXQoaW5kZXgsIHJhbmRvbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBob2xkZXIudmlldy5oZWlnaHQgPSByYW5kb207XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChvd25lci5faXRlbUhlaWdodCkge1xuICAgICAgICAgICAgaG9sZGVyLnZpZXcuaGVpZ2h0ID0gbGF5b3V0LnRvRGV2aWNlSW5kZXBlbmRlbnRQaXhlbHMoXG4gICAgICAgICAgICAgIG93bmVyLl9lZmZlY3RpdmVJdGVtSGVpZ2h0XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChvd25lci5faXRlbVdpZHRoKSB7XG4gICAgICAgICAgICBob2xkZXIudmlldy53aWR0aCA9IGxheW91dC50b0RldmljZUluZGVwZW5kZW50UGl4ZWxzKFxuICAgICAgICAgICAgICBvd25lci5fZWZmZWN0aXZlSXRlbVdpZHRoXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG93bmVyLl9wcmVwYXJlSXRlbShob2xkZXIudmlldywgaW5kZXgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJdGVtSWQoaTogbnVtYmVyKSB7XG4gICAgICBjb25zdCBvd25lciA9IHRoaXMub3duZXIgPyB0aGlzLm93bmVyLmdldCgpIDogbnVsbDtcbiAgICAgIGxldCBpZCA9IGk7XG4gICAgICBpZiAob3duZXIgJiYgb3duZXIuaXRlbXMpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IChvd25lciBhcyBhbnkpLml0ZW1zLmdldEl0ZW1cbiAgICAgICAgICA/IChvd25lciBhcyBhbnkpLml0ZW1zLmdldEl0ZW0oaSlcbiAgICAgICAgICA6IG93bmVyLml0ZW1zW2ldO1xuICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgIGlkID0gb3duZXIuaXRlbUlkR2VuZXJhdG9yKGl0ZW0sIGksIG93bmVyLml0ZW1zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGxvbmcoaWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJdGVtQ291bnQoKTogbnVtYmVyIHtcbiAgICAgIGNvbnN0IG93bmVyID0gdGhpcy5vd25lciA/IHRoaXMub3duZXIuZ2V0KCkgOiBudWxsO1xuICAgICAgcmV0dXJuIG93bmVyICYmIG93bmVyLml0ZW1zICYmIG93bmVyLml0ZW1zLmxlbmd0aFxuICAgICAgICA/IG93bmVyLml0ZW1zLmxlbmd0aFxuICAgICAgICA6IDA7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEl0ZW1WaWV3VHlwZShpbmRleDogbnVtYmVyKSB7XG4gICAgICBjb25zdCBvd25lciA9IHRoaXMub3duZXIgPyB0aGlzLm93bmVyLmdldCgpIDogbnVsbDtcbiAgICAgIGlmIChvd25lcikge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IG93bmVyLl9nZXRJdGVtVGVtcGxhdGUoaW5kZXgpO1xuICAgICAgICByZXR1cm4gb3duZXIuX2l0ZW1UZW1wbGF0ZXNJbnRlcm5hbC5pbmRleE9mKHRlbXBsYXRlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxuXG4gIFROU19XZWFyT3NMaXN0Vmlld0FkYXB0ZXJDbGFzcyA9IFROU19XZWFyT3NMaXN0Vmlld0FkYXB0ZXI7XG59XG4iXX0=