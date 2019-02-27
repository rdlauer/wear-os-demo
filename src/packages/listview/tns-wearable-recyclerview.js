"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TNS_WearableRecyclerView = (function (_super) {
    __extends(TNS_WearableRecyclerView, _super);
    function TNS_WearableRecyclerView(context, owner) {
        var _this = _super.call(this, context) || this;
        _this.owner = owner;
        return global.__native(_this);
    }
    TNS_WearableRecyclerView.prototype.onLayout = function (changed, l, t, r, b) {
        if (changed) {
            var owner = this.owner.get();
            owner.onLayout(l, t, r, b);
        }
        _super.prototype.onLayout.call(this, changed, l, t, r, b);
    };
    return TNS_WearableRecyclerView;
}(android.support.wear.widget
    .WearableRecyclerView));
exports.TNS_WearableRecyclerView = TNS_WearableRecyclerView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG5zLXdlYXJhYmxlLXJlY3ljbGVydmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRucy13ZWFyYWJsZS1yZWN5Y2xlcnZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTtJQUE4Qyw0Q0FDdkI7SUFDckIsa0NBQ0UsT0FBZ0MsRUFDeEIsS0FBOEI7UUFGeEMsWUFJRSxrQkFBTSxPQUFPLENBQUMsU0FFZjtRQUpTLFdBQUssR0FBTCxLQUFLLENBQXlCO1FBR3RDLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRU0sMkNBQVEsR0FBZixVQUNFLE9BQWdCLEVBQ2hCLENBQVMsRUFDVCxDQUFTLEVBQ1QsQ0FBUyxFQUNULENBQVM7UUFFVCxJQUFJLE9BQU8sRUFBRTtZQUNYLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDL0IsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM1QjtRQUNELGlCQUFNLFFBQVEsWUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUNILCtCQUFDO0FBQUQsQ0FBQyxBQXZCRCxDQUE4QyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNO0tBQ3RFLG9CQUFvQixHQXNCdEI7QUF2QlksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgV2Vhck9zTGlzdFZpZXcgfSBmcm9tICcuL3dlYXItb3MtbGlzdHZpZXcuYW5kcm9pZCc7XG5cbmV4cG9ydCBjbGFzcyBUTlNfV2VhcmFibGVSZWN5Y2xlclZpZXcgZXh0ZW5kcyBhbmRyb2lkLnN1cHBvcnQud2Vhci53aWRnZXRcbiAgLldlYXJhYmxlUmVjeWNsZXJWaWV3IHtcbiAgY29uc3RydWN0b3IoXG4gICAgY29udGV4dDogYW5kcm9pZC5jb250ZW50LkNvbnRleHQsXG4gICAgcHJpdmF0ZSBvd25lcjogV2Vha1JlZjxXZWFyT3NMaXN0Vmlldz5cbiAgKSB7XG4gICAgc3VwZXIoY29udGV4dCk7XG4gICAgcmV0dXJuIGdsb2JhbC5fX25hdGl2ZSh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkxheW91dChcbiAgICBjaGFuZ2VkOiBib29sZWFuLFxuICAgIGw6IG51bWJlcixcbiAgICB0OiBudW1iZXIsXG4gICAgcjogbnVtYmVyLFxuICAgIGI6IG51bWJlclxuICApIHtcbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgY29uc3Qgb3duZXIgPSB0aGlzLm93bmVyLmdldCgpO1xuICAgICAgb3duZXIub25MYXlvdXQobCwgdCwgciwgYik7XG4gICAgfVxuICAgIHN1cGVyLm9uTGF5b3V0KGNoYW5nZWQsIGwsIHQsIHIsIGIpO1xuICB9XG59XG4iXX0=