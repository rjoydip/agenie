export {
  DEFAULT_MODEL,
  DEFAULT_PROVIDER,
  callLlm,
  callLlmStream,
  getChatModel,
} from "./llm";

interface Provider {
  displayName: string;
  providerId: string;
  models: string[];
}

export function getProviders(): Provider[] {
  const PROVIDERS = [
    {
      displayName: "OpenAI",
      providerId: "openai",
      models: ["gpt-5.2", "gpt-4.1"],
    },
    {
      displayName: "Anthropic",
      providerId: "anthropic",
      models: ["claude-sonnet-4-5", "claude-opus-4-5"],
    },
    {
      displayName: "Google",
      providerId: "google",
      models: ["gemini-3-flash-preview", "gemini-3-pro-preview"],
    },
    {
      displayName: "Ollama",
      providerId: "ollama",
      models: [], // Populated dynamically from local Ollama API
    },
  ];
  return PROVIDERS;
}

export function getModelsForProvider(
  providerId: string,
  PROVIDERS: Provider[],
): string[] {
  const provider = PROVIDERS.find((p) => p.providerId === providerId);
  return provider?.models ?? [];
}

export function getDefaultModelForProvider(
  providerId: string,
  PROVIDERS: Provider[],
): string | undefined {
  const models = getModelsForProvider(providerId, PROVIDERS);
  return models[0];
}

export function getProviderIdForModel(modelId: string): string | undefined {
  const PROVIDERS = getProviders();
  // For ollama models, they're prefixed with "ollama:"
  if (modelId.startsWith("ollama:")) {
    return "ollama";
  }
  for (const provider of PROVIDERS) {
    if (provider.models.includes(modelId)) {
      return provider.providerId;
    }
  }
  return undefined;
}

export { Provider };
