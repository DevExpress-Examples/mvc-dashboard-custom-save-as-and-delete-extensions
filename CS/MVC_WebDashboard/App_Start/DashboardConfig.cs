using DevExpress.DashboardWeb.Mvc;
using System.Web.Routing;

namespace MVC_WebDashboard {
    public static class DashboardConfig {
        public static void RegisterService(RouteCollection routes) {
            routes.MapDashboardRoute("dashboardControl", "DefaultDashboard");
        }
    }
}