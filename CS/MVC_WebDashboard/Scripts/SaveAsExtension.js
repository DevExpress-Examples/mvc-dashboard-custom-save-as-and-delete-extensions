function SaveAsDashboardExtension(_designerWrapper) {
    var _this = this;
    this._designerWrapper = _designerWrapper;
    this._designer = _designerWrapper.getDesigner();
    this.name = "dxdde-save-as";
    this._menuItem = {
        id: this.name,
        title: "Save As...",
        template: "dx-dshd-form-save-as",
        selected: ko.observable(false),
        disabled: ko.computed(function () { return !_this._designer.dashboard(); }),
        index: 112
    };
    this.saveAs = function () {
        _this._designer.menuVisible(false);
        var newExtension = _this._designer.findExtension("new");
        newExtension.performCreateDashboard(_this.newName(), _this._designer.dashboard().getJSON());
    };

    this.newName = ko.observable("New Name");
}
SaveAsDashboardExtension.prototype.start = function () {
    this._designer.menuItems.push(this._menuItem);
};
SaveAsDashboardExtension.prototype.stop = function () {
    this._designer.menuItems.remove(this._menuItem);
};