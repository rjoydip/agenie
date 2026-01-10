export { loadConfig, saveConfig, getSetting, setSetting } from "./config";
export {
  getApiKeyNameForProvider,
  getProviderDisplayName,
  checkApiKeyExists,
  checkApiKeyExistsForProvider,
  saveApiKeyToEnv,
  saveApiKeyForProvider,
} from "./env";
export { ToolContextManager } from "./context";
export { MessageHistory } from "./message-history";

export const delay = (ms: number, fn?: Function) =>
  new Promise((resolve) => {
    if (fn) {
      if (typeof fn == "function") {
        return setTimeout(() => resolve(fn()), ms);
      }
      return setTimeout(resolve, ms, fn);
    } else {
      return setTimeout(resolve, ms);
    }
  });

/**
 * Generate a unique ID for turns
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
