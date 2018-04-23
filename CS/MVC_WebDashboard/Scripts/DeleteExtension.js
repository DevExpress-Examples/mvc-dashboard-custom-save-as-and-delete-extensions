function DeleteDashboardExtension(_designerWrapper) {
    var _this = this;
    this._designerWrapper = _designerWrapper;
    this._designer = _designerWrapper.getDesigner();
    this.name = "dxdde-delete-dashboard";
    this.deleteDashboard = function () {
        var dashboardid = _this._designer.dashboardContainer().id;
        $.ajax({
            url: 'Home/DeleteDashboard',
            data: { DashboardID: dashboardid},
            type: 'POST',
        }).success(function () {
            _this._designer.close();
        });        
    }
    this._menuItem = {
        id: this.name,
        title: "Delete",
        click: this.deleteDashboard,
        selected: ko.observable(false),
        disabled: ko.computed(function () { return !_this._designer.dashboard(); }),
        index: 113,
        hasSeparator: true
    };
}
DeleteDashboardExtension.prototype.start = function () {
    this._designer.menuItems.push(this._menuItem);
};
DeleteDashboardExtension.prototype.stop = function () {
    this._designer.menuItems.remove(this._menuItem);
};
