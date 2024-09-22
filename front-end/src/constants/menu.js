// TODO: If the menu has a role of 10, it will be displayed only if the user logs in
// TODO: If the menu has a role of 30, that means admin has the right to display that menu
export const MENU_APP = [
  {
    key: 1,
    name: "List Notes",
    icon: "",
    path: "/",
    role: 10,
  },
  {
    key: 2,
    name: "List Notes user",
    icon: "",
    path: "/admins",
    role: 30,
  },
  {
    key: 1,
    name: "List user",
    icon: "",
    path: "/admins/users",
    role: 30,
  },
];
