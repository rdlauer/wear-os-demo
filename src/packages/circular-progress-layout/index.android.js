"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("tns-core-modules/color");
var view_1 = require("tns-core-modules/ui/core/view");
var CircularProgressLayout = (function (_super) {
    __extends(CircularProgressLayout, _super);
    function CircularProgressLayout() {
        return _super.call(this) || this;
    }
    Object.defineProperty(CircularProgressLayout.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CircularProgressLayout.prototype, "strokeWidth", {
        set: function (value) {
            if (value) {
                this.android.setStrokeWidth(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CircularProgressLayout.prototype, "indeterminate", {
        set: function (value) {
            if (value) {
                this.android.setIndeterminate(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CircularProgressLayout.prototype, "totalTime", {
        set: function (value) {
            if (value) {
                this.android.setTotalTime(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CircularProgressLayout.prototype, "backgroundColor", {
        set: function (value) {
            console.log(value);
            this.android.setBackgroundColor(new color_1.Color(value).android);
        },
        enumerable: true,
        configurable: true
    });
    CircularProgressLayout.prototype.createNativeView = function () {
        this._android = new android.support.wear.widget.CircularProgressLayout(this._context);
        if (!this._androidViewId) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._android.setId(this._androidViewId);
        return this._android;
    };
    CircularProgressLayout.prototype.initNativeView = function () {
        _super.prototype.initNativeView.call(this);
        if (this.totalTime) {
            this.android.setTotalTime(this.totalTime);
        }
        var timerFinishedListener = new android.support.wear.widget.CircularProgressLayout.OnTimerFinishedListener({
            onTimerFinished: function (param0) {
                console.log('timer finished');
            }
        });
        this.android.setOnTimerFinishedListener(timerFinishedListener);
    };
    CircularProgressLayout.prototype.disposeNativeView = function () {
        _super.prototype.disposeNativeView.call(this);
    };
    CircularProgressLayout.prototype.startTimer = function () {
        this.android.startTimer();
    };
    CircularProgressLayout.prototype.stopTimer = function () {
        this.android.stopTimer();
    };
    CircularProgressLayout.prototype.onLoaded = function () {
        var _this = this;
        _super.prototype.onLoaded.call(this);
        this._childViews.forEach(function (value) {
            _this._addView(value);
            _this._holder.addView(value.nativeView);
        });
    };
    CircularProgressLayout.prototype._addChildFromBuilder = function (name, value) {
        if (!this._childViews) {
            this._childViews = new Map();
        }
        if (!value.parent) {
            this._childViews.set(value._domId, value);
        }
    };
    return CircularProgressLayout;
}(view_1.View));
exports.CircularProgressLayout = CircularProgressLayout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYW5kcm9pZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LmFuZHJvaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSxnREFBK0M7QUFDL0Msc0RBQTBFO0FBRTFFO0lBQTRDLDBDQUFJO0lBTzlDO2VBQ0UsaUJBQU87SUFDVCxDQUFDO0lBRUQsc0JBQUksMkNBQU87YUFBWDtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLCtDQUFXO2FBQWYsVUFBZ0IsS0FBYTtZQUMzQixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQztRQUNILENBQUM7OztPQUFBO0lBRUQsc0JBQUksaURBQWE7YUFBakIsVUFBa0IsS0FBYztZQUM5QixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RDO1FBQ0gsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw2Q0FBUzthQUFiLFVBQWMsS0FBSztZQUNqQixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNsQztRQUNILENBQUM7OztPQUFBO0lBRUQsc0JBQUksbURBQWU7YUFBbkIsVUFBb0IsS0FBSztZQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxhQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUQsQ0FBQzs7O09BQUE7SUFFTSxpREFBZ0IsR0FBdkI7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUNwRSxJQUFJLENBQUMsUUFBUSxDQUNkLENBQUM7UUFHRixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzFEO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBY3pDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sK0NBQWMsR0FBckI7UUFDRSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztRQUV2QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzNDO1FBRUQsSUFBTSxxQkFBcUIsR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyx1QkFBdUIsQ0FDMUc7WUFDRSxlQUFlLFlBQUMsTUFBTTtnQkFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2hDLENBQUM7U0FDRixDQUNGLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVNLGtEQUFpQixHQUF4QjtRQUNFLGlCQUFNLGlCQUFpQixXQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVNLDJDQUFVLEdBQWpCO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0sMENBQVMsR0FBaEI7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFTSx5Q0FBUSxHQUFmO1FBQUEsaUJBTUM7UUFMQyxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7WUFDNUIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQscURBQW9CLEdBQXBCLFVBQXFCLElBQVksRUFBRSxLQUFXO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxHQUFHLEVBQWdCLENBQUM7U0FDNUM7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQztJQUNILDZCQUFDO0FBQUQsQ0FBQyxBQTdHRCxDQUE0QyxXQUFJLEdBNkcvQztBQTdHWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbm9kZV9tb2R1bGVzL3Rucy1wbGF0Zm9ybS1kZWNsYXJhdGlvbnMvYW5kcm9pZC5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL3R5cGluZ3Mvd2Vhci0yNy4xLjEuZC50c1wiIC8+XHJcblxyXG5pbXBvcnQgeyBDb2xvciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvY29sb3InO1xyXG5pbXBvcnQgeyBBZGRDaGlsZEZyb21CdWlsZGVyLCBWaWV3IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXcnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENpcmN1bGFyUHJvZ3Jlc3NMYXlvdXQgZXh0ZW5kcyBWaWV3XHJcbiAgaW1wbGVtZW50cyBBZGRDaGlsZEZyb21CdWlsZGVyIHtcclxuICBwcml2YXRlIF9hbmRyb2lkOiBhbmRyb2lkLnN1cHBvcnQud2Vhci53aWRnZXQuQ2lyY3VsYXJQcm9ncmVzc0xheW91dDtcclxuICBwcml2YXRlIF9ob2xkZXI6IGFuZHJvaWQud2lkZ2V0LkxpbmVhckxheW91dDtcclxuICBwcml2YXRlIF9hbmRyb2lkVmlld0lkOiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBfY2hpbGRWaWV3czogTWFwPG51bWJlciwgVmlldz47XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcblxyXG4gIGdldCBhbmRyb2lkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FuZHJvaWQ7XHJcbiAgfVxyXG5cclxuICBzZXQgc3Ryb2tlV2lkdGgodmFsdWU6IG51bWJlcikge1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuYW5kcm9pZC5zZXRTdHJva2VXaWR0aCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXQgaW5kZXRlcm1pbmF0ZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuYW5kcm9pZC5zZXRJbmRldGVybWluYXRlKHZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldCB0b3RhbFRpbWUodmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLmFuZHJvaWQuc2V0VG90YWxUaW1lKHZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldCBiYWNrZ3JvdW5kQ29sb3IodmFsdWUpIHtcclxuICAgIGNvbnNvbGUubG9nKHZhbHVlKTtcclxuICAgIHRoaXMuYW5kcm9pZC5zZXRCYWNrZ3JvdW5kQ29sb3IobmV3IENvbG9yKHZhbHVlKS5hbmRyb2lkKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjcmVhdGVOYXRpdmVWaWV3KCkge1xyXG4gICAgdGhpcy5fYW5kcm9pZCA9IG5ldyBhbmRyb2lkLnN1cHBvcnQud2Vhci53aWRnZXQuQ2lyY3VsYXJQcm9ncmVzc0xheW91dChcclxuICAgICAgdGhpcy5fY29udGV4dFxyXG4gICAgKTtcclxuICAgIC8vIHRoaXMuX2hvbGRlciA9IG5ldyBhbmRyb2lkLndpZGdldC5MaW5lYXJMYXlvdXQodGhpcy5fY29udGV4dCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLl9hbmRyb2lkVmlld0lkKSB7XHJcbiAgICAgIHRoaXMuX2FuZHJvaWRWaWV3SWQgPSBhbmRyb2lkLnZpZXcuVmlldy5nZW5lcmF0ZVZpZXdJZCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fYW5kcm9pZC5zZXRJZCh0aGlzLl9hbmRyb2lkVmlld0lkKTtcclxuICAgIC8vIHRoaXMuX2hvbGRlci5zZXRPcmllbnRhdGlvbihhbmRyb2lkLndpZGdldC5MaW5lYXJMYXlvdXQuVkVSVElDQUwpO1xyXG4gICAgLy8gdGhpcy5faG9sZGVyLnNldEdyYXZpdHkoYW5kcm9pZC52aWV3LkdyYXZpdHkuRklMTF9WRVJUSUNBTCk7XHJcbiAgICAvLyAodGhpcy5faG9sZGVyIGFzIGFueSkuc2V0TGF5b3V0UGFyYW1zKFxyXG4gICAgLy8gICBuZXcgYW5kcm9pZC5zdXBwb3J0LndlYXIud2lkZ2V0LkJveEluc2V0TGF5b3V0LkxheW91dFBhcmFtcyhcclxuICAgIC8vICAgICBhbmRyb2lkLnZpZXcuVmlld0dyb3VwLkxheW91dFBhcmFtcy5GSUxMX1BBUkVOVCxcclxuICAgIC8vICAgICBhbmRyb2lkLnZpZXcuVmlld0dyb3VwLkxheW91dFBhcmFtcy5GSUxMX1BBUkVOVCxcclxuICAgIC8vICAgICBhbmRyb2lkLnZpZXcuR3Jhdml0eS5GSUxMX1ZFUlRJQ0FMLFxyXG4gICAgLy8gICAgIGFuZHJvaWQuc3VwcG9ydC53ZWFyLndpZGdldC5Cb3hJbnNldExheW91dC5MYXlvdXRQYXJhbXMuQk9YX0FMTFxyXG4gICAgLy8gICApXHJcbiAgICAvLyApO1xyXG5cclxuICAgIC8vIHRoaXMuX2FuZHJvaWQuYWRkVmlldyh0aGlzLl9ob2xkZXIpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLl9hbmRyb2lkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluaXROYXRpdmVWaWV3KCkge1xyXG4gICAgc3VwZXIuaW5pdE5hdGl2ZVZpZXcoKTtcclxuXHJcbiAgICBpZiAodGhpcy50b3RhbFRpbWUpIHtcclxuICAgICAgdGhpcy5hbmRyb2lkLnNldFRvdGFsVGltZSh0aGlzLnRvdGFsVGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGltZXJGaW5pc2hlZExpc3RlbmVyID0gbmV3IGFuZHJvaWQuc3VwcG9ydC53ZWFyLndpZGdldC5DaXJjdWxhclByb2dyZXNzTGF5b3V0Lk9uVGltZXJGaW5pc2hlZExpc3RlbmVyKFxyXG4gICAgICB7XHJcbiAgICAgICAgb25UaW1lckZpbmlzaGVkKHBhcmFtMCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3RpbWVyIGZpbmlzaGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gICAgdGhpcy5hbmRyb2lkLnNldE9uVGltZXJGaW5pc2hlZExpc3RlbmVyKHRpbWVyRmluaXNoZWRMaXN0ZW5lcik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzcG9zZU5hdGl2ZVZpZXcoKSB7XHJcbiAgICBzdXBlci5kaXNwb3NlTmF0aXZlVmlldygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXJ0VGltZXIoKSB7XHJcbiAgICB0aGlzLmFuZHJvaWQuc3RhcnRUaW1lcigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0b3BUaW1lcigpIHtcclxuICAgIHRoaXMuYW5kcm9pZC5zdG9wVGltZXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkxvYWRlZCgpOiB2b2lkIHtcclxuICAgIHN1cGVyLm9uTG9hZGVkKCk7XHJcbiAgICB0aGlzLl9jaGlsZFZpZXdzLmZvckVhY2godmFsdWUgPT4ge1xyXG4gICAgICB0aGlzLl9hZGRWaWV3KHZhbHVlKTtcclxuICAgICAgdGhpcy5faG9sZGVyLmFkZFZpZXcodmFsdWUubmF0aXZlVmlldyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIF9hZGRDaGlsZEZyb21CdWlsZGVyKG5hbWU6IHN0cmluZywgdmFsdWU6IFZpZXcpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5fY2hpbGRWaWV3cykge1xyXG4gICAgICB0aGlzLl9jaGlsZFZpZXdzID0gbmV3IE1hcDxudW1iZXIsIFZpZXc+KCk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXZhbHVlLnBhcmVudCkge1xyXG4gICAgICB0aGlzLl9jaGlsZFZpZXdzLnNldCh2YWx1ZS5fZG9tSWQsIHZhbHVlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19