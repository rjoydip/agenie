export const PROVIDERS = [
  {
    displayName: "OpenAI",
    providerId: "openai",
    models: [
      "gpt-5",
      "gpt-5-mini",
      "gpt-5-nano",
      "gpt-5-codex",
      "gpt-5.1",
      "gpt-5.1-codex",
      "gpt-5.1-codex-mini",
    ],
  },
  {
    displayName: "Anthropic",
    providerId: "anthropic",
    models: [
      "claude-opus-4-5",
      "claude-opus-4-1",
      "claude-opus-4-0",
      "claude-sonnet-4-0",
      "claude-3-7-sonnet-latest",
      "claude-3-5-haiku-latest",
    ],
  },
  {
    displayName: "Google",
    providerId: "google",
    models: ["gemini-2.0-flash-exp", "gemini-1.5-flash", "gemini-1.5-pro"],
  },
  {
    displayName: "xAI",
    providerId: "xai",
    models: [
      "grok-4",
      "grok-3",
      "grok-3-fast",
      "grok-3-mini",
      "grok-3-mini-fast",
      "grok-2-1212",
      "grok-2-vision-1212",
    ],
  },
  {
    displayName: "Groq",
    providerId: "groq",
    models: [
      "llama-3.3-70b-versatile",
      "llama-3.1-8b-instant",
      "deepseek-r1-distill-llama-70b",
      "mixtral-8x7b-32768",
      "gemma2-9b-it",
    ],
  },
  {
    displayName: "DeepSeek",
    providerId: "deepseek",
    models: ["deepseek-chat", "deepseek-reasoner"],
  },
  {
    displayName: "Mistral",
    providerId: "mistral",
    models: [
      "pixtral-large-latest",
      "mistral-large-latest",
      "mistral-medium-latest",
      "mistral-small-latest",
    ],
  },
  {
    displayName: "Ollama",
    providerId: "ollama",
    models: [],
  },
];
