/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { loginUser } from "./loginUser";
import { serverFetch } from "@/lib/serverFatch";
import { zodValidator } from "@/lib/zodValidator";
import { registerValidationZodSchema } from "@/zod/auth.validation";

export const registerPatient = async (
  _currentState: any,
  formData: any,
): Promise<any> => {
  try {
    const payload = {
      name: formData.get("name"),
      address: formData.get("address"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (zodValidator(payload, registerValidationZodSchema).success === false) {
      return zodValidator(payload, registerValidationZodSchema);
    }

    const validatedPayload: any = zodValidator(
      payload,
      registerValidationZodSchema,
    ).data;

    const registerData = {
      password: validatedPayload.password,
      patient: {
        name: validatedPayload.name,
        address: validatedPayload.address,
        email: validatedPayload.email,
      },
    };

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerData));

    const res = await serverFetch
      .post(`/user/create-patient`, {
        body: newFormData,
      })
      .then((res) => res.json());

    if (res.success) {
      await loginUser(_currentState, formData);
    }

    return res;
  } catch (err: any) {
    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    console.log(err.message);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Registration Failed. Please try again!",
    };
  }
};
