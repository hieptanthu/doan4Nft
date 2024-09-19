import { pageUser } from "./user";
import { pageAdmin } from "./admin";
import statusPage from "./status/index.js";

var page = {
  user: pageUser,
  admin: pageAdmin,
  status: statusPage,
};

export default page;
