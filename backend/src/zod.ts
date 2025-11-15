import z from "zod";

export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters long")
  .max(10, "Username cannot exceed 10 characters");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 6 characters long")
  .max(20, "Password cannot exceed 20 characters");

export const signupSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const signinSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const title = z.string();
export const link = z.string();

export const contentSchema = z.object({
    title: title,
    link: link,
})