/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as commits from "../commits.js";
import type * as debug from "../debug.js";
import type * as githubTokens from "../githubTokens.js";
import type * as http from "../http.js";
import type * as manualUserSetup from "../manualUserSetup.js";
import type * as paymentAttemptTypes from "../paymentAttemptTypes.js";
import type * as paymentAttempts from "../paymentAttempts.js";
import type * as repositories from "../repositories.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  commits: typeof commits;
  debug: typeof debug;
  githubTokens: typeof githubTokens;
  http: typeof http;
  manualUserSetup: typeof manualUserSetup;
  paymentAttemptTypes: typeof paymentAttemptTypes;
  paymentAttempts: typeof paymentAttempts;
  repositories: typeof repositories;
  users: typeof users;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
