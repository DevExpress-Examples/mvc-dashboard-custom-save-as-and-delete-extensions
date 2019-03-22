// Creates and implements a custom DeleteDashboardExtension class.

function DeleteDashboardExtension(_control) {
    var _this = this;    
    this._control = _control;
    this._toolbox = this._control.findExtension('toolbox');
    this.name = "dxdde-delete-dashboard";
    this.deleteDashboard = function () {
        if (_this.isExtensionAvailable()) {
            if (confirm("Delete this Dashboard?")) {
                var dashboardid = _this._control.dashboardContainer().id;
                var param = JSON.stringify({ DashboardID: dashboardid, ExtensionName: _this.name });
                _this._toolbox.menuVisible(false);
                $.ajax({
                    url: 'DeleteDashboard',
                    data: { DashboardID: dashboardid },
                    type: 'POST',
                }).success(function () {
                    _this._control.close();
                });
            }
        }
    }
    this._menuItem = {
        id: this.name,
        title: "Delete",
        click: this.deleteDashboard,
        selected: ko.observable(false),
        disabled: ko.computed(function () { return !_this._control.dashboard(); }),
        index: 113,
        hasSeparator: true,
        data: _this
    };
}
DeleteDashboardExtension.prototype.isExtensionAvailable = function () {
    return this._toolbox !== undefined;
}
DeleteDashboardExtension.prototype.start = function () {
    if (this.isExtensionAvailable())
        this._toolbox.menuItems.push(this._menuItem);
};
DeleteDashboardExtension.prototype.stop = function () {
    if (this.isExtensionAvailable())
        this._toolbox.menuItems.remove(this._menuItem);
};