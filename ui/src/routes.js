/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import TableList from "views/TableList.js";
import UserProfile from "views/UserProfile.js";
import AddUser from "views/AddUser";

var routes = [
  {
    path: "/user-profile",
    name: "Tahlil Analizi",
    icon: "tim-icons icon-notes",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Tahlil Grafikleri",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Kayıtlı Hasta Listesi",
    icon: "tim-icons icon-single-copy-04",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/user-add",
    name: "Yeni Hasta Ekle",
    icon: "tim-icons icon-simple-add",
    component: AddUser,
    layout: "/admin"
  }
];
export default routes;
