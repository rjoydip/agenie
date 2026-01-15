import { TypedToolResult } from "ai";
import { searchTools } from "./search";

export const toolSet = {
  searchTools,
};
export type ToolSet = typeof toolSet;
export type ToolResult = TypedToolResult<typeof toolSet>;

export { searchTools } from "./search";
