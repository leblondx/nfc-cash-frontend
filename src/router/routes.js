const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "/home", component: () => import("pages/IndexPage.vue") },
      { path: "/sign-up", component: () => import("pages/SignUpPage.vue") },
      { path: "/sign-in", component: () => import("pages/SignInPage.vue") },
      {
        path: "/notify/s-verify-email",
        component: () => import("pages/SuccessVerifyEmail.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
