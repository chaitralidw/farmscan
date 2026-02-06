import { TablesInsert } from "./src/integrations/supabase/types";

type Test = TablesInsert<"profiles">;
const x: Test = {
    device_id: "test",
    full_name: "test"
};
