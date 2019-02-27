"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("tns-core-modules/platform");
var view_1 = require("tns-core-modules/ui/core/view");
var utils_1 = require("tns-core-modules/utils/utils");
var WearOsLayout = (function (_super) {
    __extends(WearOsLayout, _super);
    function WearOsLayout() {
        return _super.call(this) || this;
    }
    Object.defineProperty(WearOsLayout.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    WearOsLayout.prototype.createNativeView = function () {
        this._android = new android.widget.ScrollView(this._context);
        this._holder = new android.widget.LinearLayout(this._context);
        if (!this._androidViewId) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._android.setId(this._androidViewId);
        this._holder.setOrientation(android.widget.LinearLayout.VERTICAL);
        this._holder.setGravity(android.view.Gravity.FILL_VERTICAL);
        this._holder.setLayoutParams(new android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.FILL_PARENT, android.view.ViewGroup.LayoutParams.FILL_PARENT));
        var inset = this._adjustInset();
        if (inset) {
            this._holder.setPadding(inset, inset, inset, inset);
        }
        this._android.addView(this._holder);
        return this._android;
    };
    WearOsLayout.prototype.initNativeView = function () {
        _super.prototype.initNativeView.call(this);
    };
    WearOsLayout.prototype.disposeNativeView = function () {
        _super.prototype.disposeNativeView.call(this);
    };
    WearOsLayout.prototype.onLoaded = function () {
        var _this = this;
        _super.prototype.onLoaded.call(this);
        this._childViews.forEach(function (value) {
            if (!value.parent) {
                _this._addView(value);
                _this._holder.addView(value.nativeView);
            }
        });
    };
    WearOsLayout.prototype._addChildFromBuilder = function (name, value) {
        if (!this._childViews) {
            this._childViews = new Map();
        }
        if (!value.parent) {
            this._childViews.set(value._domId, value);
        }
    };
    WearOsLayout.prototype._adjustInset = function () {
        var result = null;
        var androidConfig = utils_1.ad.getApplicationContext()
            .getResources()
            .getConfiguration();
        var isCircleWatch = androidConfig.isScreenRound();
        if (isCircleWatch) {
            result = WearOsLayout.SCALE_FACTOR * platform_1.screen.mainScreen.widthPixels;
        }
        return result;
    };
    WearOsLayout.SCALE_FACTOR = 0.146467;
    return WearOsLayout;
}(view_1.View));
exports.WearOsLayout = WearOsLayout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzREFBbUQ7QUFFbkQsc0RBQXFEO0FBQ3JELHNEQUFrRDtBQUVsRDtJQUFrQyxnQ0FBSTtJQU9wQztlQUNFLGlCQUFPO0lBQ1QsQ0FBQztJQUVELHNCQUFJLGlDQUFPO2FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFRCx1Q0FBZ0IsR0FBaEI7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxRDtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUV6QyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FDMUIsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQ3JDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQy9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQ2hELENBQ0YsQ0FBQztRQUdGLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNsQyxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3JEO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXBDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0scUNBQWMsR0FBckI7UUFDRSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztJQUN6QixDQUFDO0lBRU0sd0NBQWlCLEdBQXhCO1FBQ0UsaUJBQU0saUJBQWlCLFdBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0sK0JBQVEsR0FBZjtRQUFBLGlCQVFDO1FBUEMsaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUNqQixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQixLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDeEM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwyQ0FBb0IsR0FBcEIsVUFBcUIsSUFBWSxFQUFFLEtBQVc7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBZ0IsQ0FBQztTQUM1QztRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDM0M7SUFDSCxDQUFDO0lBS08sbUNBQVksR0FBcEI7UUFDRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbEIsSUFBTSxhQUFhLEdBQUksVUFBRSxDQUFDLHFCQUFxQixFQUE4QjthQUMxRSxZQUFZLEVBQUU7YUFDZCxnQkFBZ0IsRUFBRSxDQUFDO1FBRXRCLElBQU0sYUFBYSxHQUFJLGFBQXFCLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFN0QsSUFBSSxhQUFhLEVBQUU7WUFDakIsTUFBTSxHQUFHLFlBQVksQ0FBQyxZQUFZLEdBQUcsaUJBQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO1NBQ3BFO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQWpGYyx5QkFBWSxHQUFHLFFBQVEsQ0FBQztJQWtGekMsbUJBQUM7Q0FBQSxBQXZGRCxDQUFrQyxXQUFJLEdBdUZyQztBQXZGWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNjcmVlbiB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQWRkQ2hpbGRGcm9tQnVpbGRlciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvY29udGVudC12aWV3JztcbmltcG9ydCB7IFZpZXcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlldyc7XG5pbXBvcnQgeyBhZCB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdXRpbHMvdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgV2Vhck9zTGF5b3V0IGV4dGVuZHMgVmlldyBpbXBsZW1lbnRzIEFkZENoaWxkRnJvbUJ1aWxkZXIge1xuICBwcml2YXRlIF9hbmRyb2lkOiBhbmRyb2lkLndpZGdldC5TY3JvbGxWaWV3O1xuICBwcml2YXRlIF9ob2xkZXI6IGFuZHJvaWQud2lkZ2V0LkxpbmVhckxheW91dDtcbiAgcHJpdmF0ZSBfYW5kcm9pZFZpZXdJZDogbnVtYmVyO1xuICBwcml2YXRlIF9jaGlsZFZpZXdzOiBNYXA8bnVtYmVyLCBWaWV3PjtcbiAgcHJpdmF0ZSBzdGF0aWMgU0NBTEVfRkFDVE9SID0gMC4xNDY0Njc7IC8vIGMgPSBhICogc3FydCgyKVxuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBnZXQgYW5kcm9pZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYW5kcm9pZDtcbiAgfVxuXG4gIGNyZWF0ZU5hdGl2ZVZpZXcoKSB7XG4gICAgdGhpcy5fYW5kcm9pZCA9IG5ldyBhbmRyb2lkLndpZGdldC5TY3JvbGxWaWV3KHRoaXMuX2NvbnRleHQpO1xuICAgIHRoaXMuX2hvbGRlciA9IG5ldyBhbmRyb2lkLndpZGdldC5MaW5lYXJMYXlvdXQodGhpcy5fY29udGV4dCk7XG4gICAgaWYgKCF0aGlzLl9hbmRyb2lkVmlld0lkKSB7XG4gICAgICB0aGlzLl9hbmRyb2lkVmlld0lkID0gYW5kcm9pZC52aWV3LlZpZXcuZ2VuZXJhdGVWaWV3SWQoKTtcbiAgICB9XG4gICAgdGhpcy5fYW5kcm9pZC5zZXRJZCh0aGlzLl9hbmRyb2lkVmlld0lkKTtcblxuICAgIHRoaXMuX2hvbGRlci5zZXRPcmllbnRhdGlvbihhbmRyb2lkLndpZGdldC5MaW5lYXJMYXlvdXQuVkVSVElDQUwpO1xuICAgIHRoaXMuX2hvbGRlci5zZXRHcmF2aXR5KGFuZHJvaWQudmlldy5HcmF2aXR5LkZJTExfVkVSVElDQUwpO1xuICAgIHRoaXMuX2hvbGRlci5zZXRMYXlvdXRQYXJhbXMoXG4gICAgICBuZXcgYW5kcm9pZC52aWV3LlZpZXdHcm91cC5MYXlvdXRQYXJhbXMoXG4gICAgICAgIGFuZHJvaWQudmlldy5WaWV3R3JvdXAuTGF5b3V0UGFyYW1zLkZJTExfUEFSRU5ULFxuICAgICAgICBhbmRyb2lkLnZpZXcuVmlld0dyb3VwLkxheW91dFBhcmFtcy5GSUxMX1BBUkVOVFxuICAgICAgKVxuICAgICk7XG5cbiAgICAvLyBDaGVjayBmb3IgaW5zZXQgaGVyZSBhbmQgaWYgd2UgaGF2ZSBpdCBhcHBseSBoZSBkZWZhdWx0IHBhZGRpbmcgZm9yIGNpcmNsZSB3YXRjaGVzXG4gICAgY29uc3QgaW5zZXQgPSB0aGlzLl9hZGp1c3RJbnNldCgpO1xuICAgIGlmIChpbnNldCkge1xuICAgICAgdGhpcy5faG9sZGVyLnNldFBhZGRpbmcoaW5zZXQsIGluc2V0LCBpbnNldCwgaW5zZXQpO1xuICAgIH1cblxuICAgIHRoaXMuX2FuZHJvaWQuYWRkVmlldyh0aGlzLl9ob2xkZXIpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2FuZHJvaWQ7XG4gIH1cblxuICBwdWJsaWMgaW5pdE5hdGl2ZVZpZXcoKSB7XG4gICAgc3VwZXIuaW5pdE5hdGl2ZVZpZXcoKTtcbiAgfVxuXG4gIHB1YmxpYyBkaXNwb3NlTmF0aXZlVmlldygpIHtcbiAgICBzdXBlci5kaXNwb3NlTmF0aXZlVmlldygpO1xuICB9XG5cbiAgcHVibGljIG9uTG9hZGVkKCk6IHZvaWQge1xuICAgIHN1cGVyLm9uTG9hZGVkKCk7XG4gICAgdGhpcy5fY2hpbGRWaWV3cy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIGlmICghdmFsdWUucGFyZW50KSB7XG4gICAgICAgIHRoaXMuX2FkZFZpZXcodmFsdWUpO1xuICAgICAgICB0aGlzLl9ob2xkZXIuYWRkVmlldyh2YWx1ZS5uYXRpdmVWaWV3KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIF9hZGRDaGlsZEZyb21CdWlsZGVyKG5hbWU6IHN0cmluZywgdmFsdWU6IFZpZXcpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2NoaWxkVmlld3MpIHtcbiAgICAgIHRoaXMuX2NoaWxkVmlld3MgPSBuZXcgTWFwPG51bWJlciwgVmlldz4oKTtcbiAgICB9XG4gICAgaWYgKCF2YWx1ZS5wYXJlbnQpIHtcbiAgICAgIHRoaXMuX2NoaWxkVmlld3Muc2V0KHZhbHVlLl9kb21JZCwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgd2F0Y2ggaXMgYSByb3VuZC9jaXJjbGUgdGhlbiB0aGUgaW5zZXQgdmFsdWUgd2lsbCBiZSByZXR1cm5lZC5cbiAgICovXG4gIHByaXZhdGUgX2FkanVzdEluc2V0KCkge1xuICAgIGxldCByZXN1bHQgPSBudWxsO1xuXG4gICAgY29uc3QgYW5kcm9pZENvbmZpZyA9IChhZC5nZXRBcHBsaWNhdGlvbkNvbnRleHQoKSBhcyBhbmRyb2lkLmNvbnRlbnQuQ29udGV4dClcbiAgICAgIC5nZXRSZXNvdXJjZXMoKVxuICAgICAgLmdldENvbmZpZ3VyYXRpb24oKTtcbiAgICAvLyBodHRwczovL2RldmVsb3Blci5hbmRyb2lkLmNvbS9yZWZlcmVuY2UvYW5kcm9pZC9jb250ZW50L3Jlcy9Db25maWd1cmF0aW9uLmh0bWwjaXNTY3JlZW5Sb3VuZCgpXG4gICAgY29uc3QgaXNDaXJjbGVXYXRjaCA9IChhbmRyb2lkQ29uZmlnIGFzIGFueSkuaXNTY3JlZW5Sb3VuZCgpO1xuXG4gICAgaWYgKGlzQ2lyY2xlV2F0Y2gpIHtcbiAgICAgIHJlc3VsdCA9IFdlYXJPc0xheW91dC5TQ0FMRV9GQUNUT1IgKiBzY3JlZW4ubWFpblNjcmVlbi53aWR0aFBpeGVscztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19