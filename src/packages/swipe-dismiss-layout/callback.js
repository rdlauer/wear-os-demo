"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var TNS_SwipeDismissFrameLayoutCallback = (function (_super) {
    __extends(TNS_SwipeDismissFrameLayoutCallback, _super);
    function TNS_SwipeDismissFrameLayoutCallback(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        return global.__native(_this);
    }
    TNS_SwipeDismissFrameLayoutCallback.prototype.onDismissed = function (layout) {
        var owner = this.owner.get();
        owner.notify({
            eventName: index_1.SwipeDismissLayout.dimissedEvent,
            object: owner
        });
    };
    TNS_SwipeDismissFrameLayoutCallback.prototype.onSwipeCanceled = function (layout) {
        var owner = this.owner.get();
        owner.notify({
            eventName: index_1.SwipeDismissLayout.swipeCanceledEvent,
            object: owner
        });
    };
    TNS_SwipeDismissFrameLayoutCallback.prototype.onSwipeStarted = function (layout) {
        var owner = this.owner.get();
        owner.notify({
            eventName: index_1.SwipeDismissLayout.swipeStartedEvent,
            object: owner
        });
    };
    return TNS_SwipeDismissFrameLayoutCallback;
}(android.support.wear
    .widget.SwipeDismissFrameLayout.Callback));
exports.TNS_SwipeDismissFrameLayoutCallback = TNS_SwipeDismissFrameLayoutCallback;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbGJhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjYWxsYmFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUE2QztBQUc3QztJQUF5RCx1REFDZjtJQUN4Qyw2Q0FBb0IsS0FBa0M7UUFBdEQsWUFDRSxpQkFBTyxTQUVSO1FBSG1CLFdBQUssR0FBTCxLQUFLLENBQTZCO1FBRXBELE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQseURBQVcsR0FBWCxVQUFZLE1BQTJEO1FBRXJFLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDL0IsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNYLFNBQVMsRUFBRSwwQkFBa0IsQ0FBQyxhQUFhO1lBQzNDLE1BQU0sRUFBRSxLQUFLO1NBQ2QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDZEQUFlLEdBQWYsVUFBZ0IsTUFBMkQ7UUFFekUsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMvQixLQUFLLENBQUMsTUFBTSxDQUFDO1lBQ1gsU0FBUyxFQUFFLDBCQUFrQixDQUFDLGtCQUFrQjtZQUNoRCxNQUFNLEVBQUUsS0FBSztTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw0REFBYyxHQUFkLFVBQWUsTUFBMkQ7UUFFeEUsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMvQixLQUFLLENBQUMsTUFBTSxDQUFDO1lBQ1gsU0FBUyxFQUFFLDBCQUFrQixDQUFDLGlCQUFpQjtZQUMvQyxNQUFNLEVBQUUsS0FBSztTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCwwQ0FBQztBQUFELENBQUMsQUFqQ0QsQ0FBeUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJO0tBQzFFLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLEdBZ0N6QztBQWpDWSxrRkFBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTd2lwZURpc21pc3NMYXlvdXQgfSBmcm9tICcuL2luZGV4JztcblxuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNsYXNzLW5hbWVcbmV4cG9ydCBjbGFzcyBUTlNfU3dpcGVEaXNtaXNzRnJhbWVMYXlvdXRDYWxsYmFjayBleHRlbmRzIGFuZHJvaWQuc3VwcG9ydC53ZWFyXG4gIC53aWRnZXQuU3dpcGVEaXNtaXNzRnJhbWVMYXlvdXQuQ2FsbGJhY2sge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG93bmVyOiBXZWFrUmVmPFN3aXBlRGlzbWlzc0xheW91dD4pIHtcbiAgICBzdXBlcigpO1xuICAgIHJldHVybiBnbG9iYWwuX19uYXRpdmUodGhpcyk7XG4gIH1cblxuICBvbkRpc21pc3NlZChsYXlvdXQ6IGFuZHJvaWQuc3VwcG9ydC53ZWFyLndpZGdldC5Td2lwZURpc21pc3NGcmFtZUxheW91dCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdvbkRpc21pc3NlZCcsIGxheW91dCk7XG4gICAgY29uc3Qgb3duZXIgPSB0aGlzLm93bmVyLmdldCgpO1xuICAgIG93bmVyLm5vdGlmeSh7XG4gICAgICBldmVudE5hbWU6IFN3aXBlRGlzbWlzc0xheW91dC5kaW1pc3NlZEV2ZW50LFxuICAgICAgb2JqZWN0OiBvd25lclxuICAgIH0pO1xuICB9XG5cbiAgb25Td2lwZUNhbmNlbGVkKGxheW91dDogYW5kcm9pZC5zdXBwb3J0LndlYXIud2lkZ2V0LlN3aXBlRGlzbWlzc0ZyYW1lTGF5b3V0KSB7XG4gICAgLy8gY29uc29sZS5sb2coJ3N3aXBlIGNhbmNlbGVkJywgbGF5b3V0KTtcbiAgICBjb25zdCBvd25lciA9IHRoaXMub3duZXIuZ2V0KCk7XG4gICAgb3duZXIubm90aWZ5KHtcbiAgICAgIGV2ZW50TmFtZTogU3dpcGVEaXNtaXNzTGF5b3V0LnN3aXBlQ2FuY2VsZWRFdmVudCxcbiAgICAgIG9iamVjdDogb3duZXJcbiAgICB9KTtcbiAgfVxuXG4gIG9uU3dpcGVTdGFydGVkKGxheW91dDogYW5kcm9pZC5zdXBwb3J0LndlYXIud2lkZ2V0LlN3aXBlRGlzbWlzc0ZyYW1lTGF5b3V0KSB7XG4gICAgLy8gY29uc29sZS5sb2coJ3N3aXBlIHN0YXJ0ZWQnLCBsYXlvdXQpO1xuICAgIGNvbnN0IG93bmVyID0gdGhpcy5vd25lci5nZXQoKTtcbiAgICBvd25lci5ub3RpZnkoe1xuICAgICAgZXZlbnROYW1lOiBTd2lwZURpc21pc3NMYXlvdXQuc3dpcGVTdGFydGVkRXZlbnQsXG4gICAgICBvYmplY3Q6IG93bmVyXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==