/**
 * Application state for the CLI
 */
export type AppState =
  | "idle"
  | "running"
  | "provider_select" // Selecting LLM provider
  | "model_select" // Selecting model for the chosen provider
  | "api_key_confirm"
  | "api_key_input";
