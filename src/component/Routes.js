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
  },
  {
    path: "/todo",
    name: "Tasks",
    icon: "tim-icons icon-pencil",
    component: Todo,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },

];
export default routes;
