import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "get_skill",
  title: "Get skill details",
  description: "Get a single skill listing by ID, including the owner's profile and its reviews.",
  inputSchema: {
    id: z.string().trim().min(1).describe("The skill listing ID (UUID)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ id }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data: skill, error } = await supabase
      .from("skills")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!skill) throw new ToolError(`No skill found with id ${id}`);

    const [{ data: owner }, { data: reviews }] = await Promise.all([
      supabase
        .from("profiles")
        .select("user_id, full_name, department, academic_year, avatar_url, bio")
        .eq("user_id", skill.user_id)
        .maybeSingle(),
      supabase
        .from("reviews")
        .select("id, rating, comment, created_at, user_id")
        .eq("target_id", id)
        .eq("target_type", "skill")
        .order("created_at", { ascending: false }),
    ]);

    const result = { skill, owner: owner ?? null, reviews: reviews ?? [] };
    return {
      content: [{ type: "text", text: JSON.stringify(result) }],
      structuredContent: result,
    };
  },
});
