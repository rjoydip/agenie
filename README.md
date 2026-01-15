# Agenie 🤖

An autonomous research agent with task planning, self-reflection, and multi-provider AI support built with AI-SDK

> 🚧 Work In Progress: This project is currently under active development. Current phase: Early development / Architecture design / Feature implementation

## Overview

Agenie takes complex questions and turns them into clear, step-by-step plans. It runs those tasks using data, checks its own work, and refines the results until it has a confident, data-backed answer.

**Key Capabilities:**

- **Intelligent Task Planning**: Automatically decomposes complex queries into structured steps
- **Autonomous Execution**: Selects and executes the right tools to gather data
- **Self-Validation**: Checks its own work and iterates until tasks are complete
- **Safety Features**: Built-in loop detection and step limits to prevent runaway execution

[![Twitter Follow](https://img.shields.io/twitter/follow/rjoydip11?style=social)](https://twitter.com/rjoydip11)

### Prerequisites

- [Bun](https://bun.com) runtime (v1.0 or higher)
- OpenAI API key (get [here](https://platform.openai.com/api-keys))

#### Installing Bun

If you don't have Bun installed, you can install it using curl:

**macOS/Linux:**

```bash
curl -fsSL https://bun.com/install | bash
```

**Windows:**

```bash
powershell -c "irm bun.sh/install.ps1|iex"
```

After installation, restart your terminal and verify Bun is installed:

```bash
bun --version
```

### Installing Agenie

- Clone the repository:

```bash
git clone https://github.com/rjoydip/agenie.git
cd agenie
```

- Install dependencies with Bun:

```bash
bun install
```

- Set up your environment variables:

```bash
# Copy the example environment file (from parent directory)
cp env.example .env
```

```bash
# Edit .env and add your API keys (if using cloud providers)
# OpenAI
OPENAI_API_KEY=sk-...

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Google Generative AI
GOOGLE_GENERATIVE_AI_API_KEY=...
# or
GOOGLE_API_KEY=...

# xAI
XAI_API_KEY=...

# Groq
GROQ_API_KEY=...

# DeepSeek
DEEPSEEK_API_KEY=...

# Mistral
MISTRAL_API_KEY=...

# Ollama (optional, uses local endpoint)
OLLAMA_BASE_URL=http://localhost:11434/api
```

### Usage

Run Agenie in iAgenienteractive mode:

```bash
bun start:cli
```

Or with watch mode for development:

```bash
bun dev:cli
```

### Example Queries

Try asking Agenie questions like:

TODO

**Agenie will automatically:**

1. Break down your question into tasks
2. Fetch the necessary data
3. Perform analysis
4. Provide a comprehensive, data-rich answer

## Architecture

Agenie uses a multi-agent architecture with specialized components:

- **Planning Agent**: Analyzes queries and creates structured task lists
- **Action Agent**: Selects appropriate tools and executes steps
- **Validation Agent**: Verifies task completion and data sufficiency
- **Answer Agent**: Synthesizes findings into comprehensive responses

## Tech Stack

- **Runtime**: [Bun](https://bun.sh)
- **UI Framework**: [React](https://react.dev) + [Ink](https://github.com/vadimdemedes/ink) (terminal UI)
- **LLM Integration**: [AI SDK](https://ai-sdk.dev/) with multi-provider support (OpenAI, Anthropic, Google)
- **Schema Validation**: [Zod](https://zod.dev)
- **Language**: TypeScript

### Changing Models

Type `/model` in the CLI to switch between:

- GPT 4.1 (OpenAI)
- Claude Sonnet 4.5 (Anthropic)
- Gemini 3 (Google)

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Important**: Please keep your pull requests small and focused. This will make it easier to review and merge.

## License

Released under [MIT](./LICENSE) by [@rjoydip](https://github.com/rjoydip).
