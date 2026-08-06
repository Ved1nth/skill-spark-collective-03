import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "search_skills",
  title: "Search skills",
  description: "Search skill listings by keyword across title, description, and category.",
  inputSchema: {
    query: z.string().trim().min(1).describe("Keyword to search for, e.g. 'react' or 'photography'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ query }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const escaped = query.replace(/[%,()]/g, " ");
    const { data, error } = await supabase
      .from("skills")
      .select("id, title, category, description, experience, hourly_rate, availability, user_id")
      .or(`title.ilike.%${escaped}%,description.ilike.%${escaped}%,category.ilike.%${escaped}%`)
      .order("created_at", { ascending: false })
      .limit(20);
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { skills: data ?? [] },
    };
  },
});
