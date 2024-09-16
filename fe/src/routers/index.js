import page from "../pages";

var routerAdmin = [
  {
    path: "",
    element: page.admin.Home,
    state: "index",
  },
];
var routerUser = [
  {
    path: "",
    element: page.user.Home,
    state: "index",
  },
];

var router = {
  admin: routerAdmin,
  user: routerUser,
};

export default router;
