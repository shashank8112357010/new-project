import Dashboard from "./Dashboard.js";
import UserProfile from "./UserProfile.js";
import Todo from './Todo';

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  }

];
export default routes;
