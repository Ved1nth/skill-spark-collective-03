import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_skills",
  title: "List skills",
  description: "List skill listings offered by students, newest first. Optionally filter by category.",
  inputSchema: {
    category: z.string().trim().optional().describe("Category to filter by, e.g. 'Web Development'."),
    limit: z.number().int().optional().describe("Max number of listings to return (default 20)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ category, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("skills")
      .select("id, title, category, description, experience, hourly_rate, availability, created_at, user_id")
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);
    if (category) query = query.ilike("category", `%${category}%`);

    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };

    const userIds = [...new Set((data ?? []).map((s) => s.user_id))];
    let profileMap = new Map<string, { full_name: string; department: string | null }>();
    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name, department")
        .in("user_id", userIds);
      profileMap = new Map((profiles ?? []).map((p) => [p.user_id, p]));
    }

    const skills = (data ?? []).map((s) => ({
      ...s,
      owner: profileMap.get(s.user_id) ?? null,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(skills) }],
      structuredContent: { skills },
    };
  },
});
