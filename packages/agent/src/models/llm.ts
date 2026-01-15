import { DEFAULT_SYSTEM_PROMPT } from "../prompts";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { xai } from "@ai-sdk/xai";
import { groq } from "@ai-sdk/groq";
import { deepseek } from "@ai-sdk/deepseek";
import { mistral } from "@ai-sdk/mistral";
import { createOllama } from "ollama-ai-provider-v2";
import {
  generateText,
  streamText,
  ToolSet,
  stepCountIs,
  Output,
  FlexibleSchema,
} from "ai";
import type { LanguageModel } from "ai";
import { getDefaultModelForProvider, getProviders } from ".";

const PROVIDERS = getProviders();

const _defaultProvider = "openai";
export const DEFAULT_PROVIDER =
  getDefaultModelForProvider(_defaultProvider, PROVIDERS) !== undefined
    ? _defaultProvider
    : "openai";
export const DEFAULT_MODEL = "gpt-5.2";

// Model prefix to provider mapping
const MODEL_PREFIX_MAP: Record<string, string> = {
  "gpt-": "openai",
  "claude-": "anthropic",
  "gemini-": "google",
  "grok-": "xai",
  "llama-": "groq",
  "deepseek-": "deepseek",
  "mixtral-": "groq",
  gemma: "groq",
  "mistral-": "mistral",
  "pixtral-": "mistral",
};

// Provider factory functions
const PROVIDER_FACTORIES: Record<string, (modelName: string) => LanguageModel> =
  {
    openai: (modelName: string) => openai(modelName),
    anthropic: (modelName: string) => anthropic(modelName),
    google: (modelName: string) => google(modelName),
    xai: (modelName: string) => xai(modelName),
    groq: (modelName: string) => groq(modelName),
    deepseek: (modelName: string) => deepseek(modelName),
    mistral: (modelName: string) => mistral(modelName),
    ollama: (modelName: string) => {
      const ollama = createOllama({
        baseURL: process.env.OLLAMA_BASE_URL || "http://localhost:11434/api",
      });
      return ollama(modelName);
    },
  };

/**
 * Dynamically get the chat model based on model name
 * Supports all AI SDK providers
 */
export function getChatModel(modelName: string): LanguageModel {
  // Check if model name contains provider prefix (e.g., "openai:gpt-5")
  if (modelName.includes(":")) {
    const [providerId, actualModelName] = modelName.split(":");
    const factory = PROVIDER_FACTORIES[providerId];

    if (factory) {
      return factory(actualModelName);
    }

    throw new Error(`Unknown provider: ${providerId}`);
  }

  // Try to match by model prefix
  for (const [prefix, providerId] of Object.entries(MODEL_PREFIX_MAP)) {
    if (modelName.startsWith(prefix) || modelName.includes(prefix)) {
      const factory = PROVIDER_FACTORIES[providerId];
      if (factory) {
        return factory(modelName);
      }
    }
  }

  // Default to OpenAI if no match found
  return openai(modelName);
}

/**
 * Get provider ID from model name
 */
export function getProviderIdFromModel(modelName: string): string {
  if (modelName.includes(":")) {
    return modelName.split(":")[0];
  }

  for (const [prefix, providerId] of Object.entries(MODEL_PREFIX_MAP)) {
    if (modelName.startsWith(prefix) || modelName.includes(prefix)) {
      return providerId;
    }
  }

  return "openai"; // default
}

/**
 * Get all available models for a provider
 */
export function getModelsForProvider(providerId: string): string[] {
  const provider = PROVIDERS.find((p) => p.providerId === providerId);
  return provider?.models || [];
}

/**
 * Get all providers
 */
export function getAllProviders() {
  return PROVIDERS;
}

interface CallLlmOptions {
  model?: string;
  systemPrompt?: string;
  schema?: FlexibleSchema<unknown>;
  tools?: ToolSet;
}

export async function callLlm(
  prompt: string,
  options: CallLlmOptions = {},
): Promise<unknown> {
  const { model = DEFAULT_MODEL, systemPrompt, schema, tools } = options;
  const finalSystemPrompt = systemPrompt || DEFAULT_SYSTEM_PROMPT;

  const result = await generateText({
    model: getChatModel(model),
    system: finalSystemPrompt,
    prompt,
    tools,
    maxRetries: 3,
    stopWhen: stepCountIs(10),
    output: schema ? Output.object({ schema }) : undefined,
  });

  for (const part of result.content) {
    if (part.type === "tool-approval-request") {
      console.log(part.toolCall); // Contains toolName, input, etc.
    }
  }

  if (
    !schema &&
    !tools &&
    result &&
    typeof result === "object" &&
    "content" in result
  ) {
    return result.content;
  }

  return result;
}

export async function* callLlmStream(
  prompt: string,
  options: { model?: string; systemPrompt?: string } = {},
): AsyncGenerator<string> {
  const { model = DEFAULT_MODEL, systemPrompt } = options;
  const finalSystemPrompt = systemPrompt || DEFAULT_SYSTEM_PROMPT;

  const { textStream } = await streamText({
    model: getChatModel(model),
    system: finalSystemPrompt,
    prompt,
    stopWhen: stepCountIs(10),
    maxRetries: 3,
  });

  for await (const textPart of textStream) {
    yield textPart;
  }

  return;
}
