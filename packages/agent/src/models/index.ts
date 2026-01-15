import { readFileSync } from "fs";

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
  const providers = readFileSync("./models.json");
  return JSON.parse(providers.toString()) as Provider[];
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
