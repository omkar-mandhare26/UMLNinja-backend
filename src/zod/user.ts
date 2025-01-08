import { z } from "zod";

const userSchemaZod = z.object({
    userId: z
        .string()
        .min(1, { message: "User ID is required" })
        .regex(/^[a-zA-Z0-9]+$/, { message: "User ID must be alphanumeric" }),
    firstName: z
        .string()
        .min(1, { message: "First name is required" })
        .regex(/^[a-zA-Z\s]+$/, {
            message: "First name must contain only letters",
        }),

    lastName: z
        .string()
        .min(1, { message: "Last name is required" })
        .regex(/^[a-zA-Z\s]+$/, {
            message: "Last name must contain only letters",
        }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[a-z]/, {
            message: "Password must contain at least one lowercase letter",
        })
        .regex(/[A-Z]/, {
            message: "Password must contain at least one uppercase letter",
        })
        .regex(/\d/, { message: "Password must contain at least one number" })
        .regex(/[\W_]/, {
            message: "Password must contain at least one special character",
        }),
});

export default userSchemaZod;
