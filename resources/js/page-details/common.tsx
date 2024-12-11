import React from "react";

export default {
  register: {
    head: "Register",
    title: () => null,
    description: () => null,
    getRoute: () => ({
      name: "Register",
      url: "register",
    }),
    canAccess: () => true,
  },
  login: {
    head: "Login",
    title: () => null,
    description: () => null,
    getRoute: () => ({
      name: "Login",
      url: "login",
    }),
    canAccess: () => true,
  },
} as { [key: string]: Page.PageDetailsBuilder };
