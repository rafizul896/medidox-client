/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/serverFatch";
import { zodValidator } from "@/lib/zodValidator";
import { createSpecialityZodSchema } from "@/zod/specialities.validation";

export const createSpeciality = async (_prevState: any, formData: FormData) => {
  try {
    const payload = {
      title: formData.get("title"),
    };

    if (zodValidator(payload, createSpecialityZodSchema).success === false) {
      return zodValidator(payload, createSpecialityZodSchema);
    }

    const validatedPayload = zodValidator(
      payload,
      createSpecialityZodSchema,
    ).data;

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedPayload));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const res = await serverFetch.post("/specialties", {
      body: newFormData,
    });
    const result = await res.json();

    console.log(res);

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
