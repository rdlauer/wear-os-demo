"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wear_os_listview_base_1 = require("./wear-os-listview-base");
var TNS_WearOsListViewHolder = (function (_super) {
    __extends(TNS_WearOsListViewHolder, _super);
    function TNS_WearOsListViewHolder(owner, list) {
        var _this = _super.call(this, owner.get().nativeViewProtected) || this;
        _this.owner = owner;
        _this.list = list;
        _this._selected = false;
        var that = global.__native(_this);
        owner.get().nativeViewProtected.setOnClickListener(that);
        owner.get().nativeViewProtected.setOnLongClickListener(that);
        return that;
    }
    TNS_WearOsListViewHolder.prototype.isSelected = function () {
        return this._selected;
    };
    TNS_WearOsListViewHolder.prototype.setIsSelected = function (selected) {
        this._selected = selected;
    };
    Object.defineProperty(TNS_WearOsListViewHolder.prototype, "view", {
        get: function () {
            return this.owner ? this.owner.get() : null;
        },
        enumerable: true,
        configurable: true
    });
    TNS_WearOsListViewHolder.prototype.onClick = function (v) {
        var listView = this.list.get();
        var index = this.getAdapterPosition();
        listView.notify({
            eventName: wear_os_listview_base_1.ITEMTAP,
            object: listView,
            index: index,
            view: this.view,
            android: v,
            ios: undefined
        });
        if (listView.selectionBehavior !== 'Press')
            return;
        var items = listView.items;
        var item = items.getItem ? items.getItem(index) : items[index];
        if (listView.multipleSelection) {
            if (this.isSelected()) {
                listView._itemsSelected = listView._itemsSelected.filter(function (selected) {
                    if (selected !== item) {
                        return selected;
                    }
                });
                this.setIsSelected(false);
                listView.notify({
                    eventName: wear_os_listview_base_1.ITEMDESELECTED,
                    object: listView,
                    index: index,
                    view: this.view,
                    android: v,
                    ios: undefined
                });
            }
            else {
                this.setIsSelected(true);
                listView._itemsSelected.push(item);
                listView.notify({
                    eventName: wear_os_listview_base_1.ITEMSELECTED,
                    object: listView,
                    index: index,
                    view: this.view,
                    android: v,
                    ios: undefined
                });
            }
        }
        else {
            if (this.isSelected()) {
                listView._itemsSelected.pop();
                this.setIsSelected(false);
                listView.notify({
                    eventName: wear_os_listview_base_1.ITEMDESELECTED,
                    object: listView,
                    index: index,
                    view: this.view,
                    android: v,
                    ios: undefined
                });
            }
            else {
                this.setIsSelected(true);
                listView._itemsSelected.push(item);
                listView.notify({
                    eventName: wear_os_listview_base_1.ITEMSELECTED,
                    object: listView,
                    index: index,
                    view: this.view,
                    android: v,
                    ios: undefined
                });
            }
        }
    };
    TNS_WearOsListViewHolder.prototype.onLongClick = function (v) {
        var listView = this.list.get();
        var index = this.getAdapterPosition();
        if (listView.selectionBehavior === 'LongPress') {
            var items = listView.items;
            var item_1 = items.getItem ? items.getItem(index) : items[index];
            if (listView.multipleSelection) {
                if (this.isSelected()) {
                    listView._itemsSelected = listView._itemsSelected.filter(function (selected) {
                        if (selected !== item_1) {
                            return selected;
                        }
                    });
                    this.setIsSelected(false);
                    listView.notify({
                        eventName: wear_os_listview_base_1.ITEMDESELECTED,
                        object: listView,
                        index: index,
                        view: this.view,
                        android: v,
                        ios: undefined
                    });
                }
                else {
                    this.setIsSelected(true);
                    listView._itemsSelected.push(item_1);
                    listView.notify({
                        eventName: wear_os_listview_base_1.ITEMSELECTED,
                        object: listView,
                        index: index,
                        view: this.view,
                        android: v,
                        ios: undefined
                    });
                }
            }
            else {
                if (this.isSelected()) {
                    listView._itemsSelected.pop();
                    this.setIsSelected(false);
                    listView.notify({
                        eventName: wear_os_listview_base_1.ITEMDESELECTED,
                        object: listView,
                        index: index,
                        view: this.view,
                        android: v,
                        ios: undefined
                    });
                }
                else {
                    this.setIsSelected(true);
                    listView._itemsSelected.push(item_1);
                    listView.notify({
                        eventName: wear_os_listview_base_1.ITEMSELECTED,
                        object: listView,
                        index: index,
                        view: this.view,
                        android: v,
                        ios: undefined
                    });
                }
            }
        }
        return true;
    };
    TNS_WearOsListViewHolder = __decorate([
        Interfaces([
            android.view.View.OnClickListener,
            android.view.View.OnLongClickListener
        ]),
        __metadata("design:paramtypes", [WeakRef,
            WeakRef])
    ], TNS_WearOsListViewHolder);
    return TNS_WearOsListViewHolder;
}(android.support.v7.widget.RecyclerView.ViewHolder));
exports.TNS_WearOsListViewHolder = TNS_WearOsListViewHolder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG5zLXdlYXItb3MtbGlzdHZpZXctaG9sZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG5zLXdlYXItb3MtbGlzdHZpZXctaG9sZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsaUVBQStGO0FBTy9GO0lBQ1UsNENBQWlEO0lBTXpELGtDQUNVLEtBQW9CLEVBQ3BCLElBQTZCO1FBRnZDLFlBSUUsa0JBQU0sS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDLFNBS3ZDO1FBUlMsV0FBSyxHQUFMLEtBQUssQ0FBZTtRQUNwQixVQUFJLEdBQUosSUFBSSxDQUF5QjtRQUp2QyxlQUFTLEdBQVksS0FBSyxDQUFDO1FBT3pCLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLENBQUM7UUFDbkMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCw2Q0FBVSxHQUFWO1FBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxnREFBYSxHQUFiLFVBQWMsUUFBaUI7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDNUIsQ0FBQztJQUVELHNCQUFJLDBDQUFJO2FBQVI7WUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUM5QyxDQUFDOzs7T0FBQTtJQUVNLDBDQUFPLEdBQWQsVUFBZSxDQUFvQjtRQUNqQyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdB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QUNqQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUI7U0FDdEMsQ0FBQzt5Q0FTaUIsT0FBTztZQUNSLE9BQU87T0FUWix3QkFBd0IsQ0FtS3BDO0lBQUQsK0JBQUM7Q0FBQSxBQW5LRCxDQUNVLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxHQWtLMUQ7QUFuS1ksNERBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlldyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3JztcbmltcG9ydCB7IElURU1ERVNFTEVDVEVELCBJdGVtRXZlbnREYXRhLCBJVEVNU0VMRUNURUQsIElURU1UQVAgfSBmcm9tICcuL3dlYXItb3MtbGlzdHZpZXctYmFzZSc7XG5pbXBvcnQgeyBXZWFyT3NMaXN0VmlldyB9IGZyb20gJy4vd2Vhci1vcy1saXN0dmlldy5hbmRyb2lkJztcblxuQEludGVyZmFjZXMoW1xuICBhbmRyb2lkLnZpZXcuVmlldy5PbkNsaWNrTGlzdGVuZXIsXG4gIGFuZHJvaWQudmlldy5WaWV3Lk9uTG9uZ0NsaWNrTGlzdGVuZXJcbl0pXG5leHBvcnQgY2xhc3MgVE5TX1dlYXJPc0xpc3RWaWV3SG9sZGVyXG4gIGV4dGVuZHMgYW5kcm9pZC5zdXBwb3J0LnY3LndpZGdldC5SZWN5Y2xlclZpZXcuVmlld0hvbGRlclxuICBpbXBsZW1lbnRzXG4gICAgYW5kcm9pZC52aWV3LlZpZXcuT25DbGlja0xpc3RlbmVyLFxuICAgIGFuZHJvaWQudmlldy5WaWV3Lk9uTG9uZ0NsaWNrTGlzdGVuZXIge1xuICBfc2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG93bmVyOiBXZWFrUmVmPFZpZXc+LFxuICAgIHByaXZhdGUgbGlzdDogV2Vha1JlZjxXZWFyT3NMaXN0Vmlldz5cbiAgKSB7XG4gICAgc3VwZXIob3duZXIuZ2V0KCkubmF0aXZlVmlld1Byb3RlY3RlZCk7XG4gICAgY29uc3QgdGhhdCA9IGdsb2JhbC5fX25hdGl2ZSh0aGlzKTtcbiAgICBvd25lci5nZXQoKS5uYXRpdmVWaWV3UHJvdGVjdGVkLnNldE9uQ2xpY2tMaXN0ZW5lcih0aGF0KTtcbiAgICBvd25lci5nZXQoKS5uYXRpdmVWaWV3UHJvdGVjdGVkLnNldE9uTG9uZ0NsaWNrTGlzdGVuZXIodGhhdCk7XG4gICAgcmV0dXJuIHRoYXQ7XG4gIH1cblxuICBpc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxuXG4gIHNldElzU2VsZWN0ZWQoc2VsZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHNlbGVjdGVkO1xuICB9XG5cbiAgZ2V0IHZpZXcoKTogVmlldyB7XG4gICAgcmV0dXJuIHRoaXMub3duZXIgPyB0aGlzLm93bmVyLmdldCgpIDogbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBvbkNsaWNrKHY6IGFuZHJvaWQudmlldy5WaWV3KSB7XG4gICAgY29uc3QgbGlzdFZpZXcgPSB0aGlzLmxpc3QuZ2V0KCk7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmdldEFkYXB0ZXJQb3NpdGlvbigpO1xuICAgIGxpc3RWaWV3Lm5vdGlmeTxJdGVtRXZlbnREYXRhPih7XG4gICAgICBldmVudE5hbWU6IElURU1UQVAsXG4gICAgICBvYmplY3Q6IGxpc3RWaWV3LFxuICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgdmlldzogdGhpcy52aWV3LFxuICAgICAgYW5kcm9pZDogdixcbiAgICAgIGlvczogdW5kZWZpbmVkXG4gICAgfSk7XG5cbiAgICBpZiAobGlzdFZpZXcuc2VsZWN0aW9uQmVoYXZpb3IgIT09ICdQcmVzcycpIHJldHVybjtcbiAgICBjb25zdCBpdGVtcyA9IGxpc3RWaWV3Lml0ZW1zIGFzIGFueTtcbiAgICBjb25zdCBpdGVtID0gaXRlbXMuZ2V0SXRlbSA/IGl0ZW1zLmdldEl0ZW0oaW5kZXgpIDogaXRlbXNbaW5kZXhdO1xuICAgIGlmIChsaXN0Vmlldy5tdWx0aXBsZVNlbGVjdGlvbikge1xuICAgICAgaWYgKHRoaXMuaXNTZWxlY3RlZCgpKSB7XG4gICAgICAgIGxpc3RWaWV3Ll9pdGVtc1NlbGVjdGVkID0gbGlzdFZpZXcuX2l0ZW1zU2VsZWN0ZWQuZmlsdGVyKHNlbGVjdGVkID0+IHtcbiAgICAgICAgICBpZiAoc2VsZWN0ZWQgIT09IGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNldElzU2VsZWN0ZWQoZmFsc2UpO1xuICAgICAgICBsaXN0Vmlldy5ub3RpZnk8SXRlbUV2ZW50RGF0YT4oe1xuICAgICAgICAgIGV2ZW50TmFtZTogSVRFTURFU0VMRUNURUQsXG4gICAgICAgICAgb2JqZWN0OiBsaXN0VmlldyxcbiAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgdmlldzogdGhpcy52aWV3LFxuICAgICAgICAgIGFuZHJvaWQ6IHYsXG4gICAgICAgICAgaW9zOiB1bmRlZmluZWRcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldElzU2VsZWN0ZWQodHJ1ZSk7XG4gICAgICAgIGxpc3RWaWV3Ll9pdGVtc1NlbGVjdGVkLnB1c2goaXRlbSk7XG4gICAgICAgIGxpc3RWaWV3Lm5vdGlmeTxJdGVtRXZlbnREYXRhPih7XG4gICAgICAgICAgZXZlbnROYW1lOiBJVEVNU0VMRUNURUQsXG4gICAgICAgICAgb2JqZWN0OiBsaXN0VmlldyxcbiAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgdmlldzogdGhpcy52aWV3LFxuICAgICAgICAgIGFuZHJvaWQ6IHYsXG4gICAgICAgICAgaW9zOiB1bmRlZmluZWRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmlzU2VsZWN0ZWQoKSkge1xuICAgICAgICBsaXN0Vmlldy5faXRlbXNTZWxlY3RlZC5wb3AoKTtcbiAgICAgICAgdGhpcy5zZXRJc1NlbGVjdGVkKGZhbHNlKTtcbiAgICAgICAgbGlzdFZpZXcubm90aWZ5PEl0ZW1FdmVudERhdGE+KHtcbiAgICAgICAgICBldmVudE5hbWU6IElURU1ERVNFTEVDVEVELFxuICAgICAgICAgIG9iamVjdDogbGlzdFZpZXcsXG4gICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgIHZpZXc6IHRoaXMudmlldyxcbiAgICAgICAgICBhbmRyb2lkOiB2LFxuICAgICAgICAgIGlvczogdW5kZWZpbmVkXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRJc1NlbGVjdGVkKHRydWUpO1xuICAgICAgICBsaXN0Vmlldy5faXRlbXNTZWxlY3RlZC5wdXNoKGl0ZW0pO1xuICAgICAgICBsaXN0Vmlldy5ub3RpZnk8SXRlbUV2ZW50RGF0YT4oe1xuICAgICAgICAgIGV2ZW50TmFtZTogSVRFTVNFTEVDVEVELFxuICAgICAgICAgIG9iamVjdDogbGlzdFZpZXcsXG4gICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgIHZpZXc6IHRoaXMudmlldyxcbiAgICAgICAgICBhbmRyb2lkOiB2LFxuICAgICAgICAgIGlvczogdW5kZWZpbmVkXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkxvbmdDbGljayh2OiBhbmRyb2lkLnZpZXcuVmlldykge1xuICAgIGNvbnN0IGxpc3RWaWV3ID0gdGhpcy5saXN0LmdldCgpO1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRBZGFwdGVyUG9zaXRpb24oKTtcbiAgICBpZiAobGlzdFZpZXcuc2VsZWN0aW9uQmVoYXZpb3IgPT09ICdMb25nUHJlc3MnKSB7XG4gICAgICBjb25zdCBpdGVtcyA9IGxpc3RWaWV3Lml0ZW1zIGFzIGFueTtcbiAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtcy5nZXRJdGVtID8gaXRlbXMuZ2V0SXRlbShpbmRleCkgOiBpdGVtc1tpbmRleF07XG4gICAgICBpZiAobGlzdFZpZXcubXVsdGlwbGVTZWxlY3Rpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RlZCgpKSB7XG4gICAgICAgICAgbGlzdFZpZXcuX2l0ZW1zU2VsZWN0ZWQgPSBsaXN0Vmlldy5faXRlbXNTZWxlY3RlZC5maWx0ZXIoc2VsZWN0ZWQgPT4ge1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkICE9PSBpdGVtKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnNldElzU2VsZWN0ZWQoZmFsc2UpO1xuXG4gICAgICAgICAgbGlzdFZpZXcubm90aWZ5PEl0ZW1FdmVudERhdGE+KHtcbiAgICAgICAgICAgIGV2ZW50TmFtZTogSVRFTURFU0VMRUNURUQsXG4gICAgICAgICAgICBvYmplY3Q6IGxpc3RWaWV3LFxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgdmlldzogdGhpcy52aWV3LFxuICAgICAgICAgICAgYW5kcm9pZDogdixcbiAgICAgICAgICAgIGlvczogdW5kZWZpbmVkXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZXRJc1NlbGVjdGVkKHRydWUpO1xuICAgICAgICAgIGxpc3RWaWV3Ll9pdGVtc1NlbGVjdGVkLnB1c2goaXRlbSk7XG4gICAgICAgICAgbGlzdFZpZXcubm90aWZ5PEl0ZW1FdmVudERhdGE+KHtcbiAgICAgICAgICAgIGV2ZW50TmFtZTogSVRFTVNFTEVDVEVELFxuICAgICAgICAgICAgb2JqZWN0OiBsaXN0VmlldyxcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHZpZXc6IHRoaXMudmlldyxcbiAgICAgICAgICAgIGFuZHJvaWQ6IHYsXG4gICAgICAgICAgICBpb3M6IHVuZGVmaW5lZFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5pc1NlbGVjdGVkKCkpIHtcbiAgICAgICAgICBsaXN0Vmlldy5faXRlbXNTZWxlY3RlZC5wb3AoKTtcbiAgICAgICAgICB0aGlzLnNldElzU2VsZWN0ZWQoZmFsc2UpO1xuICAgICAgICAgIGxpc3RWaWV3Lm5vdGlmeTxJdGVtRXZlbnREYXRhPih7XG4gICAgICAgICAgICBldmVudE5hbWU6IElURU1ERVNFTEVDVEVELFxuICAgICAgICAgICAgb2JqZWN0OiBsaXN0VmlldyxcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIHZpZXc6IHRoaXMudmlldyxcbiAgICAgICAgICAgIGFuZHJvaWQ6IHYsXG4gICAgICAgICAgICBpb3M6IHVuZGVmaW5lZFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc2V0SXNTZWxlY3RlZCh0cnVlKTtcbiAgICAgICAgICBsaXN0Vmlldy5faXRlbXNTZWxlY3RlZC5wdXNoKGl0ZW0pO1xuICAgICAgICAgIGxpc3RWaWV3Lm5vdGlmeTxJdGVtRXZlbnREYXRhPih7XG4gICAgICAgICAgICBldmVudE5hbWU6IElURU1TRUxFQ1RFRCxcbiAgICAgICAgICAgIG9iamVjdDogbGlzdFZpZXcsXG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICB2aWV3OiB0aGlzLnZpZXcsXG4gICAgICAgICAgICBhbmRyb2lkOiB2LFxuICAgICAgICAgICAgaW9zOiB1bmRlZmluZWRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl19