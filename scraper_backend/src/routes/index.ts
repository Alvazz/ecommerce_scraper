import { AuthRoutes } from "./auth";

const authRoutes: Object | any = new AuthRoutes().getRoutes();

export const routes = [
  authRoutes,
];
