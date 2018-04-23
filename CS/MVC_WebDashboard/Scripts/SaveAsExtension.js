// Creates and implements a custom SaveAsDashboardExtension class.

function SaveAsDashboardExtension(dashboardControl) {
    var _this = this;
    this._control = dashboardControl;
    this._toolbox = this._control.findExtension("toolbox");
    this._newDashboardExtension = this._control.findExtension("create-dashboard");
    this._menuItem = {
        id: "dashboard-save-as",
        title: "Save As...",
        template: "dx-save-as-form",
        selected: ko.observable(true),
        disabled: ko.computed(function () { return !dashboardControl.dashboard(); }),
        index: 112,
        data: _this
    };
    this.saveAs = function () {
        if (this.isExtensionAvailable()) {
            this._toolbox.menuVisible(false);
            this._newDashboardExtension.performCreateDashboard(this.newName(), this._control.dashboard().getJSON());
        }
    };
    this.newName = ko.observable("New Dashboard Name");
}
SaveAsDashboardExtension.prototype.isExtensionAvailable = function () {
    return this._toolbox !== undefined && this._newDashboardExtension !== undefined;
}
SaveAsDashboardExtension.prototype.start = function () {
    if (this.isExtensionAvailable())
        this._toolbox.menuItems.push(this._menuItem);
};
SaveAsDashboardExtension.prototype.stop = function () {
    if (this.isExtensionAvailable())
        this._toolbox.menuItems.remove(this._menuItem);
}