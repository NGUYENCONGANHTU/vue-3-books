export const AUTH_ROUTES = [
  {
    path: "/login",
    name: "LoginForm",
    component: () => import("@/pages/LoginForm.vue"),
  },
  {
    path: "/signup",
    name: "SignupForm",
    component: () => import("@/pages/SignupForm.vue"),
  },
];
export const NOTE_APP = [
  {
    path: "/",
    component: () => import("../layout/index.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "/listnote",
        name: "home",
        component: () => import("../components/ListNote.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/notes",
        name: "home",
        component: () => import("../pages/ListNoteAdmin.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/profile",
        name: "ProfileForm",
        component: () => import("@/pages/ProfileForm.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/dashboard",
        name: "Dashboard_View",
        component: () => import("@/pages/Dashboard_View.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
];
