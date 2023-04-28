import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

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
      if (tokenUser === null) {
        Router.push("/");
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
