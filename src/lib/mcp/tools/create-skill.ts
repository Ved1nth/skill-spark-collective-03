import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "create_skill",
  title: "Create skill listing",
  description: "Create a new skill listing offered by the signed-in user.",
  inputSchema: {
    title: z.string().trim().min(1).describe("Skill title, e.g. 'React tutoring'."),
    category: z.string().trim().min(1).describe("Skill category, e.g. 'Web Development'."),
    description: z.string().trim().optional().describe("What the user offers and for whom."),
    experience: z.string().trim().optional().describe("Experience level, e.g. 'Intermediate'."),
    hourly_rate: z.string().trim().optional().describe("Hourly rate as text, e.g. '200' for ₹200/hr."),
    availability: z.string().trim().optional().describe("Availability, e.g. 'Weekends'."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async ({ title, category, description, experience, hourly_rate, availability }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("skills")
      .insert({
        user_id: ctx.getUserId(),
        title,
        category,
        description: description ?? null,
        experience: experience ?? null,
        hourly_rate: hourly_rate ?? null,
        availability: availability ?? null,
      })
      .select();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { skill: data?.[0] ?? null },
    };
  },
});
