import type { Phase, Task } from "@agenie/agent/state";

/**
 * State for the agent progress view.
 */
export interface AgentProgressState {
  currentPhase: Phase;
  understandComplete: boolean;
  planComplete: boolean;
  reflectComplete: boolean;
  tasks: Task[];
  isAnswering: boolean;
}
