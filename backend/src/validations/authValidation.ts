import * as yup from "yup";

export const registerSchema = yup.object({
    body: yup.object({
        name: yup.string().required("Name is required").min(3).max(50),
        email: yup.string().required("Email is required").email("Invalid email format"),
        password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    }),
});

export const loginSchema = yup.object({
    body: yup.object({
        email: yup.string().required("Email is required").email("Invalid email format"),
        password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    }),
});