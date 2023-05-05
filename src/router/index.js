import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

import userService from "../services/UserService";

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, _, next) => {
    const pathUnAuth = [
      "/",
      "/sign-up",
      "/sign-up/",
      "/sign-in",
      "/sign-in/",
      "/forgot-password",
      "/forgot-password/",
      "/recovery/recovery-password",
      "/recovery/recovery-password/",
      "recovery/e-recovery-password",
      "recovery/e-recovery-password/",
      "/notify/s-verify-email",
      "/notify/s-verify-email/",
      "/notify/e-verify-email",
      "/notify/e-verify-email/",
      "/notify/a-verify-email",
      "/notify/a-verify-email/",
    ];
    const pathIsAdmin = [
      "/home/users",
      "/home/users/",
      "/home/confirm",
      "/home/confirm/",
      "/home/settings-bot",
      "/home/settings-bot/",
    ];
    if (
      pathUnAuth.includes(to.path) === true ||
      to.path === `/recovery/recovery-password/${to.params.id}` ||
      to.path === `/verify/verify-email/${to.params.id}`
    ) {
      const tokenUser = localStorage.getItem("token");
      if (tokenUser !== null) {
        Router.push("/home");
      }
    } else {
      const tokenUser = localStorage.getItem("token");
      if (pathIsAdmin.includes(to.path) === true) {
        if (tokenUser === null) {
          Router.push("/");
        } else {
          const response = await userService.checkIsAdmin();
          console.log("response.data -->", response.data);
          if (response.data.status === 200) {
            if (response.data.result === false) {
              Router.push("/home/chats");
            }
          }
        }
      } else {
        if (tokenUser === null) {
          Router.push("/");
        }
      }
      // Нужно будет сделать проверку потом на запрос для проверки валидности токена
      // console.log("tokenUser -->", tokenUser);
      // const response = await axios.get(
      //   "http://localhost:8080/api-v1/validate-token",
      //   {
      //     headers: {
      //       Authorization: `Bearer ${tokenUser}`,
      //     },
      //   }
      // );
      // console.log("response -->", response);
    }
    next();
  });

  return Router;
});
