/**
 * Public routes (no auth required)
 */
export const publicRoutes = ["/", "/auth/new-verification"];

/**
 * Auth routes (redirect logged users)
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * API auth prefix
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect after login
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
