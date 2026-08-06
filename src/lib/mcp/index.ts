import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listSkillsTool from "./tools/list-skills";
import searchSkillsTool from "./tools/search-skills";
import getSkillTool from "./tools/get-skill";
import listActivitiesTool from "./tools/list-activities";
import getMyProfileTool from "./tools/get-my-profile";
import createSkillTool from "./tools/create-skill";

// The OAuth issuer MUST be the direct Supabase host, built from the project
// ref (inlined by Vite at build time) — never from SUPABASE_URL.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "skill-spark-collective-03",
  title: "skill-spark-collective-03",
  version: "0.1.0",
  instructions:
    "Tools for GTA, the RNSIT campus skill-sharing app. Use list_skills/search_skills/get_skill to browse student skill listings, list_activities for campus events, get_my_profile for the signed-in user, and create_skill to publish a new listing.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    listSkillsTool,
    searchSkillsTool,
    getSkillTool,
    listActivitiesTool,
    getMyProfileTool,
    createSkillTool,
  ],
});
