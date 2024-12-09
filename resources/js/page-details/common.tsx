import React from "react";

export default {
  register: {
    head: "Register",
    title: () => null,
    description: () => null,
    route: {
      name: "Register",
      routeName: "register",
    },
    canAccess: () => true,
  },
  login: {
    head: "Login",
    title: () => null,
    description: () => null,
    route: {
      name: "Login",
      routeName: "login",
    },
    canAccess: () => true,
  },
} as { [key: string]: Page.PageDetailsBuilder };
