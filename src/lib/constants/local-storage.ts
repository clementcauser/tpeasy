import { APP_NAME } from "./app";

const buildLocalStorageKey = (key: string) =>
  `@${APP_NAME.replace(" ", "_")}-${key}`;

export const ENTERPRISE_KEY = buildLocalStorageKey("ENTERPRISE");
