"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/auth/loginUser";
import { useActionState, useEffect } from "react";
import { IErrInputField } from "../../../../types";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  console.log("state", state);

  const getFieldError = (fieldName: string) => {
    if (state && state?.errors) {
      const error =
        state?.errors.find((err: IErrInputField) => err?.field === fieldName)
          ?.message || "";

      return error;
    }
  };

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message)
    }

    if (state && state.success && state.message) {
      toast.success(state.message)
    }
  }, [state]);

  return (
    <form action={formAction}>
      {redirect && <Input name="redirect" type="hidden" value={redirect} />}
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="user@example.com"
            />
            {getFieldError("email") && (
              <FieldDescription className="text-red-600">
                {getFieldError("email")}
              </FieldDescription>
            )}
          </Field>

          {/* Password */}
          <Field>
            <div className="flex  justify-between">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <a
                href="/forget-password"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />

            {getFieldError("password") && (
              <FieldDescription className="text-red-600">
                {getFieldError("password")}
              </FieldDescription>
            )}
          </Field>
        </div>
        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader className="animate-spin"/>: "Login"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
