"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var BoxInsetLayout = (function (_super) {
    __extends(BoxInsetLayout, _super);
    function BoxInsetLayout() {
        return _super.call(this) || this;
    }
    Object.defineProperty(BoxInsetLayout.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    BoxInsetLayout.prototype.createNativeView = function () {
        this._android = new android.support.wear.widget.BoxInsetLayout(this._context);
        this._holder = new android.widget.LinearLayout(this._context);
        if (!this._androidViewId) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._android.setId(this._androidViewId);
        this._holder.setOrientation(android.widget.LinearLayout.VERTICAL);
        this._holder.setGravity(android.view.Gravity.FILL_VERTICAL);
        this._holder.setLayoutParams(new android.support.wear.widget.BoxInsetLayout.LayoutParams(android.view.ViewGroup.LayoutParams.FILL_PARENT, android.view.ViewGroup.LayoutParams.FILL_PARENT, android.view.Gravity.FILL_VERTICAL, android.support.wear.widget.BoxInsetLayout.LayoutParams.BOX_ALL));
        this._android.addView(this._holder);
        return this._android;
    };
    BoxInsetLayout.prototype.initNativeView = function () {
        _super.prototype.initNativeView.call(this);
    };
    BoxInsetLayout.prototype.disposeNativeView = function () {
        _super.prototype.disposeNativeView.call(this);
    };
    BoxInsetLayout.prototype.onLoaded = function () {
        var _this = this;
        _super.prototype.onLoaded.call(this);
        this._childViews.forEach(function (value) {
            if (!value.parent) {
                _this._addView(value);
                _this._holder.addView(value.nativeView);
            }
        });
    };
    BoxInsetLayout.prototype._addChildFromBuilder = function (name, value) {
        if (!this._childViews) {
            this._childViews = new Map();
        }
        if (!value.parent) {
            this._childViews.set(value._domId, value);
        }
    };
    return BoxInsetLayout;
}(view_1.View));
exports.BoxInsetLayout = BoxInsetLayout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxzREFBMEU7QUFFMUU7SUFBb0Msa0NBQUk7SUFNdEM7ZUFDRSxpQkFBTztJQUNULENBQUM7SUFFRCxzQkFBSSxtQ0FBTzthQUFYO1lBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBRUQseUNBQWdCLEdBQWhCO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQzVELElBQUksQ0FBQyxRQUFRLENBQ2QsQ0FBQztRQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUMxRDtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsT0FBZSxDQUFDLGVBQWUsQ0FDbkMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FDekQsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFDL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFDL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUNsQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQ2hFLENBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVwQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELHVDQUFjLEdBQWQ7UUFDRSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsMENBQWlCLEdBQWpCO1FBQ0UsaUJBQU0saUJBQWlCLFdBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEMsaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO1lBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUNqQixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQixLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDeEM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw2Q0FBb0IsR0FBcEIsVUFBcUIsSUFBWSxFQUFFLEtBQVc7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEdBQUcsRUFBZ0IsQ0FBQztTQUM1QztRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDM0M7SUFDSCxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBbEVELENBQW9DLFdBQUksR0FrRXZDO0FBbEVZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy90bnMtcGxhdGZvcm0tZGVjbGFyYXRpb25zL2FuZHJvaWQuZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vdHlwaW5ncy93ZWFyLTI3LjEuMS5kLnRzXCIgLz5cblxuaW1wb3J0IHsgQWRkQ2hpbGRGcm9tQnVpbGRlciwgVmlldyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3JztcblxuZXhwb3J0IGNsYXNzIEJveEluc2V0TGF5b3V0IGV4dGVuZHMgVmlldyBpbXBsZW1lbnRzIEFkZENoaWxkRnJvbUJ1aWxkZXIge1xuICBwcml2YXRlIF9hbmRyb2lkOiBhbmRyb2lkLnN1cHBvcnQud2Vhci53aWRnZXQuQm94SW5zZXRMYXlvdXQ7XG4gIHByaXZhdGUgX2hvbGRlcjogYW5kcm9pZC53aWRnZXQuTGluZWFyTGF5b3V0O1xuICBwcml2YXRlIF9hbmRyb2lkVmlld0lkOiBudW1iZXI7XG4gIHByaXZhdGUgX2NoaWxkVmlld3M6IE1hcDxudW1iZXIsIFZpZXc+O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBnZXQgYW5kcm9pZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYW5kcm9pZDtcbiAgfVxuXG4gIGNyZWF0ZU5hdGl2ZVZpZXcoKSB7XG4gICAgdGhpcy5fYW5kcm9pZCA9IG5ldyBhbmRyb2lkLnN1cHBvcnQud2Vhci53aWRnZXQuQm94SW5zZXRMYXlvdXQoXG4gICAgICB0aGlzLl9jb250ZXh0XG4gICAgKTtcbiAgICB0aGlzLl9ob2xkZXIgPSBuZXcgYW5kcm9pZC53aWRnZXQuTGluZWFyTGF5b3V0KHRoaXMuX2NvbnRleHQpO1xuXG4gICAgaWYgKCF0aGlzLl9hbmRyb2lkVmlld0lkKSB7XG4gICAgICB0aGlzLl9hbmRyb2lkVmlld0lkID0gYW5kcm9pZC52aWV3LlZpZXcuZ2VuZXJhdGVWaWV3SWQoKTtcbiAgICB9XG4gICAgdGhpcy5fYW5kcm9pZC5zZXRJZCh0aGlzLl9hbmRyb2lkVmlld0lkKTtcbiAgICB0aGlzLl9ob2xkZXIuc2V0T3JpZW50YXRpb24oYW5kcm9pZC53aWRnZXQuTGluZWFyTGF5b3V0LlZFUlRJQ0FMKTtcbiAgICB0aGlzLl9ob2xkZXIuc2V0R3Jhdml0eShhbmRyb2lkLnZpZXcuR3Jhdml0eS5GSUxMX1ZFUlRJQ0FMKTtcbiAgICAodGhpcy5faG9sZGVyIGFzIGFueSkuc2V0TGF5b3V0UGFyYW1zKFxuICAgICAgbmV3IGFuZHJvaWQuc3VwcG9ydC53ZWFyLndpZGdldC5Cb3hJbnNldExheW91dC5MYXlvdXRQYXJhbXMoXG4gICAgICAgIGFuZHJvaWQudmlldy5WaWV3R3JvdXAuTGF5b3V0UGFyYW1zLkZJTExfUEFSRU5ULFxuICAgICAgICBhbmRyb2lkLnZpZXcuVmlld0dyb3VwLkxheW91dFBhcmFtcy5GSUxMX1BBUkVOVCxcbiAgICAgICAgYW5kcm9pZC52aWV3LkdyYXZpdHkuRklMTF9WRVJUSUNBTCxcbiAgICAgICAgYW5kcm9pZC5zdXBwb3J0LndlYXIud2lkZ2V0LkJveEluc2V0TGF5b3V0LkxheW91dFBhcmFtcy5CT1hfQUxMXG4gICAgICApXG4gICAgKTtcblxuICAgIHRoaXMuX2FuZHJvaWQuYWRkVmlldyh0aGlzLl9ob2xkZXIpO1xuXG4gICAgcmV0dXJuIHRoaXMuX2FuZHJvaWQ7XG4gIH1cblxuICBpbml0TmF0aXZlVmlldygpIHtcbiAgICBzdXBlci5pbml0TmF0aXZlVmlldygpO1xuICB9XG5cbiAgZGlzcG9zZU5hdGl2ZVZpZXcoKSB7XG4gICAgc3VwZXIuZGlzcG9zZU5hdGl2ZVZpZXcoKTtcbiAgfVxuXG4gIG9uTG9hZGVkKCk6IHZvaWQge1xuICAgIHN1cGVyLm9uTG9hZGVkKCk7XG4gICAgdGhpcy5fY2hpbGRWaWV3cy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIGlmICghdmFsdWUucGFyZW50KSB7XG4gICAgICAgIHRoaXMuX2FkZFZpZXcodmFsdWUpO1xuICAgICAgICB0aGlzLl9ob2xkZXIuYWRkVmlldyh2YWx1ZS5uYXRpdmVWaWV3KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIF9hZGRDaGlsZEZyb21CdWlsZGVyKG5hbWU6IHN0cmluZywgdmFsdWU6IFZpZXcpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2NoaWxkVmlld3MpIHtcbiAgICAgIHRoaXMuX2NoaWxkVmlld3MgPSBuZXcgTWFwPG51bWJlciwgVmlldz4oKTtcbiAgICB9XG4gICAgaWYgKCF2YWx1ZS5wYXJlbnQpIHtcbiAgICAgIHRoaXMuX2NoaWxkVmlld3Muc2V0KHZhbHVlLl9kb21JZCwgdmFsdWUpO1xuICAgIH1cbiAgfVxufVxuIl19