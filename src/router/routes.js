const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/SignInPage.vue") },
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
      {
        path: "/home",
        component: () => import("pages/HomeChatsPage.vue"),
      },
      {
        path: "/home/chats",
        component: () => import("pages/HomeChatsPage.vue"),
      },
      {
        path: "/home/chats/:id",
        component: () => import("pages/HomeChatPage.vue"),
      },
      {
        path: "/home/users",
        component: () => import("pages/HomeUsersPage.vue"),
      },
      {
        path: "/home/confirm",
        component: () => import("pages/HomeConfirmPage.vue"),
      },
      {
        path: "/home/settings-bot",
        component: () => import("pages/HomeSettingsBotPage.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
