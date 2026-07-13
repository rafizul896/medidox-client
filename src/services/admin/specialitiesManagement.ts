/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/serverFatch";
import z from "zod";

const createSpecialityZodSchema = z.object({
  title: z.string({
    error: "Title is required!",
  }),
});

export const createSpeciality = async (_prevState: any, formData: FormData) => {
  try {
    const payload = {
      title: formData.get("title"),
    };

    const validatedPayload = createSpecialityZodSchema.safeParse(payload);

    if (!validatedPayload.success) {
      return {
        success: false,
        errors: validatedPayload.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedPayload));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const res = await serverFetch.post("/specialties", { body: newFormData });
    const result = await res.json();

    return result;
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    };
  }
};

export const getSpeciality = async () => {
  try {
    const res = await serverFetch.get("/specialties");
    const result = await res.json();

    return result;
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    };
  }
};

export const deleteSpeciality = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/specialties/${id}`);
    const result = await res.json();

    return result;
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    };
  }
};
