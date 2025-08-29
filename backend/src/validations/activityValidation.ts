import * as yup from "yup";

const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;

export const createActivitySchema = yup.object({
  body: yup.object({
    type: yup
      .string()
      .oneOf(["productive", "distraction"], "Invalid activity type")
      .required("Type is required"),

    category: yup
      .string()
      .required("Category is required")
      .when("type", {
        is: (val: string) => val === "productive",
        then: (schema: yup.StringSchema) =>
          schema.oneOf(
            ["exercise", "learning", "work", "reading", "others"],
            "Invalid productive category"
          ),
        otherwise: (schema: yup.StringSchema) =>
          schema.oneOf(
            ["tiktok", "instagram", "facebook", "youtube", "game", "others"],
            "Invalid distraction category"
          ),
      }),

    title: yup.string().required("Title is required").max(100),
    description: yup.string().required("Description is required"),
    tags: yup.array().of(yup.string().max(30)),

    startTime: yup
      .string()
      .required("Start time is required")
      .matches(timeRegex, "Invalid time format (HH:mm)"),

    endTime: yup
      .string()
      .required("End time is required")
      .matches(timeRegex, "Invalid time format (HH:mm)"),
  }),
});

export const updateActivitySchema = yup.object({
  body: yup.object({
    type: yup
      .string()
      .oneOf(["productive", "distraction"], "Invalid activity type")
      .optional(),

    category: yup
      .string()
      .optional()
      .when("type", {
        is: (val: string) => val === "productive",
        then: (schema: yup.StringSchema) =>
          schema.oneOf(
            ["exercise", "learning", "work", "reading", "others"],
            "Invalid productive category"
          ),
        otherwise: (schema: yup.StringSchema) =>
          schema.oneOf(
            ["tiktok", "instagram", "facebook", "youtube", "game", "others"],
            "Invalid distraction category"
          ),
      }),

    title: yup.string().max(100),
    description: yup.string(),
    tags: yup.array().of(yup.string().max(30)),

    startTime: yup
      .string()
      .matches(timeRegex, "Invalid time format (HH:mm)")
      .optional(),

    endTime: yup
      .string()
      .matches(timeRegex, "Invalid time format (HH:mm)")
      .optional(),
  }),
});


export const deleteActivitySchema = yup.object({
  params: yup.object({
    id: yup.string().required("Activity ID is required"),
  }),
});