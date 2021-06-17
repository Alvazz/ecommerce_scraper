import { AuthRoutes } from "./Auth";

const authRoutes: Object | any = new AuthRoutes().getRoutes();

export const routes = [
  authRoutes,
];
