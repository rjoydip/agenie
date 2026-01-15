// ============================================================================
// Agent - Planning with just-in-time tool selection
// ============================================================================

// Main orchestrator
export { Agent } from "./orchestrator";
export type { AgentOptions, AgentCallbacks } from "./orchestrator";

// State types
export type {
  Phase,
  TaskStatus,
  TaskType,
  EntityType,
  Entity,
  UnderstandInput,
  Understanding,
  ToolCalls,
  PlanInput,
  Task,
  Plan,
  ExecuteInput,
  TaskResult,
  ToolSummary,
  AgentState,
} from "./state";

export { createInitialState } from "./state";

// Schemas
export {
  EntitySchema,
  UnderstandingSchema,
  PlanTaskSchema,
  PlanSchema,
  SelectedContextsSchema,
} from "./schemas";

export type {
  UnderstandingOutput,
  PlanOutput,
  SelectedContextsOutput,
} from "./schemas";

// Phases
export { UnderstandPhase, PlanPhase, ExecutePhase } from "./phases/index";

export type {
  UnderstandPhaseOptions,
  PlanPhaseOptions,
  ExecutePhaseOptions,
} from "./phases/index";

// Tools
export { searchTools, toolSet } from "./tools";
export type { ToolSet, ToolResult } from "./tools";

// Hooks
export {
  useAgentExecution,
  ToolError,
  CurrentTurn,
  useQueryQueue,
} from "./hooks";

// Models
export {
  callLlm,
  DEFAULT_MODEL,
  DEFAULT_PROVIDER,
  Provider,
  callLlmStream,
  getChatModel,
  getDefaultModelForProvider,
  getModelsForProvider,
  getProviderIdForModel,
  getProviders,
} from "./models";

// Prompts
export {
  getCurrentDate,
  getUnderstandSystemPrompt,
  getPlanSystemPrompt,
  getToolSelectionSystemPrompt,
  getExecuteSystemPrompt,
  getFinalAnswerSystemPrompt,
  buildUnderstandUserPrompt,
  buildPlanUserPrompt,
  buildToolSelectionPrompt,
  buildExecuteUserPrompt,
  buildFinalAnswerUserPrompt,
} from "./prompts";
