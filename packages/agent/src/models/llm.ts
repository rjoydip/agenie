import { DEFAULT_SYSTEM_PROMPT } from "../prompts";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import {
  generateText,
  streamText,
  LanguageModel,
  ToolSet,
  stepCountIs,
  Output,
  FlexibleSchema,
} from "ai";
import { getDefaultModelForProvider, getProviders } from ".";

const PROVIDERS = getProviders();

const _defaultProvider = "openai";
export const DEFAULT_PROVIDER =
  getDefaultModelForProvider(_defaultProvider, PROVIDERS) !== undefined
    ? _defaultProvider
    : "openai";
export const DEFAULT_MODEL = "gpt-5.2";

export function getChatModel(modelName: string): LanguageModel {
  if (modelName.startsWith("claude-")) {
    return anthropic(modelName);
  }

  if (modelName.startsWith("gemini-")) {
    return google(modelName);
  }

  // Default to OpenAI
  return openai(modelName);
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
