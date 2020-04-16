function DeleteDashboardExtension(dashboardControl) {
    this._dashboardControl = dashboardControl;
    this.name = "dxdde-delete-dashboard";
    this._menuItem = {
        id: this.name,
        title: "Delete",
        click: this.deleteDashboard.bind(this),
        selected: ko.observable(false),
        disabled: ko.computed(function () { return !this._dashboardControl.dashboard(); }, this),
        index: 113,
        hasSeparator: true,
        data: this
    };
}
DeleteDashboardExtension.prototype.deleteDashboard = function () {
    if (this._toolbox) {
        if (confirm("Delete this Dashboard?")) {
            var dashboardid = this._dashboardControl.dashboardContainer().id;
            this._toolbox.menuVisible(false);
            $.ajax({
                url: 'Home/DeleteDashboard',
                data: { DashboardID: dashboardid },
                type: 'POST',
                success: (function() { this._dashboardControl.unloadDashboard(); }).bind(this)
            });
        }
    }
}
DeleteDashboardExtension.prototype.start = function () {
    this._toolbox = this._dashboardControl.findExtension('toolbox');
    this._toolbox && this._toolbox.menuItems.push(this._menuItem);
};
DeleteDashboardExtension.prototype.stop = function () {
    this._toolbox && this._toolbox.menuItems.remove(this._menuItem);
};