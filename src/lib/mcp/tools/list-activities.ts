import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_activities",
  title: "List activities",
  description: "List campus activities and events, newest first. Optionally filter by category.",
  inputSchema: {
    category: z.string().trim().optional().describe("Category to filter by, e.g. 'Workshop'."),
    limit: z.number().int().optional().describe("Max number of activities to return (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ category, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("activities")
      .select("id, title, category, description, date, time, venue, max_participants, requirements, created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);
    if (category) query = query.ilike("category", `%${category}%`);

    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { activities: data ?? [] },
    };
  },
});
