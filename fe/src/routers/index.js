import page from "../pages";

var routerAdmin = [];
var routerUser = [];
var routerStatus = [];
let listKeyAdmin = Object.keys(page.admin);
let listKeyUser = Object.keys(page.user);
let listKeyStatus = Object.keys(page.status);

listKeyAdmin.forEach((element) => {
  if (typeof page.admin[element] === "function") {
  } else {
    routerAdmin.push({
      path: "/" + element,
      element: page.admin[element],
      state: element,
    });
  }
});

listKeyUser.forEach((element) => {
  if (
    typeof page.user[element] === "object" &&
    page.user[element].params &&
    page.user[element].params.length > 0
  ) {
    let str = "";
    page.user[element].params.forEach((item) => {
      str += "/:" + item;
    });

    routerUser.push({
      path: "/" + element + str,
      element: page.user[element].call,
      state: element,
    });
  } else {
    routerUser.push({
      path: "/" + element,
      element: page.user[element], // Assuming you want `.call` here too
      state: element,
    });
  }
});

listKeyStatus.forEach((element) => {
  routerStatus.push({
    path: "/" + element,
    element: page.status[element],
  });
});

var router = {
  admin: routerAdmin,
  user: routerUser,
  status: routerStatus,
};

export default router;
