<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/128579361/16.2.6%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T504201)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->
<!-- default file list -->
*Files to look at*:

* [HomeController.cs](./CS/MVC_WebDashboard/Controllers/HomeController.cs)
* [Global.asax.cs](./CS/MVC_WebDashboard/Global.asax.cs)
* [CustomDashbboardStorage.cs](./CS/MVC_WebDashboard/Models/CustomDashbboardStorage.cs)
* [DeleteExtension.js](./CS/MVC_WebDashboard/Scripts/DeleteExtension.js)
* [SaveAsExtension.js](./CS/MVC_WebDashboard/Scripts/SaveAsExtension.js)
* [Index.cshtml](./CS/MVC_WebDashboard/Views/Home/Index.cshtml)
* [_Layout.cshtml](./CS/MVC_WebDashboard/Views/Shared/_Layout.cshtml)
<!-- default file list end -->
# MVC Dashboard - How to define extensions providing the Save As and Delete functionality


<p>This example demonstrates how to add the "Save As" and "Delete" options to the MVC Dashboard control.<br>It requires only a few changes to utilize the solution described in the <a href="https://www.devexpress.com/Support/Center/p/T466716">T466716: Web Dashboard - How to work with extensions</a> article in MVC:<br><br>1. Use the <a href="https://documentation.devexpress.com/Dashboard/DevExpressDashboardWebDashboardConfigurator_SetDashboardStoragetopic.aspx">SetDashboardStorage</a> method to define the default storage:</p>


```cs
protected void Application_Start() {
    //...
    DashboardConfigurator.Default.SetDashboardStorage(new DashboardFileStorage(Server.MapPath("~/App_Data/Dashboards")));
    //...
}
```


<p> </p>
<p>2. Handle the client-side <a href="https://documentation.devexpress.com/#Dashboard/DevExpressDashboardWebScriptsASPxClientDashboard_BeforeRendertopic">BeforeRender</a> event using the <a href="https://documentation.devexpress.com/#Dashboard/DevExpressDashboardWebMvcDashboardExtensionSettings_ClientSideEventstopic">DashboardExtensionSettings.ClientSideEvents</a> property:</p>


```cs
@Html.DevExpress().Dashboard(settings => {
    settings.Name = "Dashboard";
    settings.ClientSideEvents.BeforeRender = "onBeforeRender";
}).GetHtml()

```


<p> </p>
<p>3. Define a controller action that should be used to delete dashboards:</p>


```cs
public ActionResult DeleteDashboard(string DashboardID) {
    CustomDashboardFileStorage newDashboardStorage = new CustomDashboardFileStorage(@"~/App_Data/Dashboards");
    newDashboardStorage.DeleteDashboard(DashboardID);
    return new EmptyResult();
}

```


<p><br>4. Customize the DeleteDashboardExtension.deleteDashboard function to call the server-side DeleteDashboard action using AJAX:</p>


```js
    this.deleteDashboard = function () {
        if (_this.isExtensionAvailable()) {
            if (confirm("Delete this Dashboard?")) {
                var dashboardid = _this._control.dashboardContainer().id;
                var param = JSON.stringify({ DashboardID: dashboardid, ExtensionName: _this.name });
                _this._toolbox.menuVisible(false);
                $.ajax({
                    url: 'Home/DeleteDashboard',
                    data: { DashboardID: dashboardid },
                    type: 'POST',
                }).success(function () {
                    _this._control.close();
                });
            }
        }
    }

```


<p> <br><strong>See also:</strong><br><a href="https://www.devexpress.com/Support/Center/p/T466761">T466761: Web Dashboard - How to implement the Save As and Delete functionality by creating custom extensions</a><br><a href="https://www.devexpress.com/Support/Center/p/T601084">T601084: ASP.NET Core Dashboard - How to implement the Save As and Delete functionality by creating custom extensions</a></p>

<br/>


