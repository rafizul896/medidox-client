import { IErrInputField } from "../../types";

export const getInputFieldError = (
  fieldName: string,
  state: { errors: IErrInputField[] },
) => {
  if (state && state?.errors) {
    const error =
      state?.errors.find((err: IErrInputField) => err?.field === fieldName)
        ?.message || "";

    return error;
  } else {
    return null;
  }
};
