//link.schema.js
import z from "zod"

export const LinkSchema = z.object({
    origin_link: z.url({ error: 'Inalid URL!' }),
    code: z.string().optional()
})