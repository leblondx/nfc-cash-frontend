const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/SignInPage.vue") },
      // { path: "/home", component: () => import("pages/IndexPage.vue") },
      { path: "/sign-up", component: () => import("pages/SignUpPage.vue") },
      { path: "/sign-in", component: () => import("pages/SignInPage.vue") },
      {
        path: "/forgot-password",
        component: () => import("pages/ForgotPassword.vue"),
      },
      {
        path: "/recovery/recovery-password/:id",
        component: () => import("pages/RecoveryPassword.vue"),
      },
      {
        path: "/recovery/e-recovery-password",
        component: () => import("pages/ExpLinkRecoveryPassword.vue"),
      },
      {
        path: "/verify/verify-email/:id",
        component: () => import("pages/VerifyEmail.vue"),
      },
      {
        path: "/notify/s-verify-email",
        component: () => import("pages/SuccessVerifyEmail.vue"),
      },
      {
        path: "/notify/e-verify-email",
        component: () => import("pages/ErrorVerifyEmail.vue"),
      },
      {
        path: "/notify/a-verify-email",
        component: () => import("pages/AlreadyVerifyEmail.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
