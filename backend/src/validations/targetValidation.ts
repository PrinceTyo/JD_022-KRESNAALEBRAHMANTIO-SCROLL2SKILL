import * as yup from "yup";

export const createTargetSchema = yup.object({
  body: yup.object({
    title: yup.string().required("Title is required").max(100),
    description: yup.string().required("Description is required"),
    sourceType: yup
      .string()
      .oneOf(["youtube", "course", "others"], "Invalid source type")
      .required("Source type is required"),
    sourceLink: yup.string().url("Invalid URL format").optional(),
    progress: yup.number().min(0).max(100).default(0).optional(),
    isPinned: yup.boolean().default(false).optional(),
    targetDone: yup
      .date()
      .typeError("targetDone must be a valid date")
      .required("targetDone is required"),
  }),
});

export const updateTargetSchema = yup.object({
  params: yup.object({
    id: yup.string().required("Target ID is required"),
  }),
  body: yup.object({
    title: yup.string().max(100).optional(),
    description: yup.string().optional(),
    sourceType: yup
      .string()
      .oneOf(["youtube", "course", "others"], "Invalid source type")
      .optional(),
    sourceLink: yup.string().url("Invalid URL format").optional(),
    progress: yup.number().min(0).max(100).optional(),
    isPinned: yup.boolean().optional(),
    targetDone: yup
      .date()
      .typeError("targetDone must be a valid date")
      .optional(),
  }),
});


export const updatePinnedSchema = yup.object({
  params: yup.object({
    id: yup.string().required("Target ID is required"),
  }),
  body: yup.object({
    isPinned: yup.boolean().required("isPinned is required"),
  }),
});

export const deleteTargetSchema = yup.object({
  params: yup.object({
    id: yup.string().required("Target ID is required"),
  }),
});