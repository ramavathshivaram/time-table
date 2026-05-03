import * as z from "zod";

const darkModeSchema = z.object({
  darkMode: z.boolean(),
});

export default { darkModeSchema };
